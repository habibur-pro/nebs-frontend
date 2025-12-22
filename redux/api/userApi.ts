import { baseApi } from "@/redux/api/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
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
      providesTags: ["User"],
    }),

    getSingleUserById: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      providesTags: ["Single-User"],
    }),

    createUser: builder.mutation({
      query: (data) => ({
        url: "/user",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User", "Single-User"],
    }),
    softDeleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      
      }),
      invalidatesTags: ["User", "Single-User"],
    }),
     updateMyProfile: builder.mutation({
      query: (data) => ({
        url: "/user/update-me",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User", "Single-User"],
    }),
  }),
  
});

export const {
  useGetAllUsersQuery,
  useGetSingleUserByIdQuery,
  useCreateUserMutation, 
  useSoftDeleteUserMutation,
  useUpdateMyProfileMutation
} = userApi;
