import { baseApi } from "@/redux/api/baseApi";
import { TAG_TYPES } from "./tagTypes";

export const noticeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotice: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          Object.entries(args).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== "") {
              params.append(key, value as string);
            }
          });
        }

        return {
          url: "/user",
          method: "GET",
          params,
        };
      },
      providesTags: [TAG_TYPES.NOTICE],
    }),

    // getSingleUserById: builder.query({
    //   query: (id) => ({
    //     url: `/user/${id}`,
    //     method: "GET",
    //   }),
    //   providesTags: ["Single-User"],
    // }),

    // createUser: builder.mutation({
    //   query: (data) => ({
    //     url: "/user",
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["User", "Single-User"],
    // }),
  }),
});

export const { useGetAllNoticeQuery } = noticeApi;
