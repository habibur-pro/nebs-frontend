/* eslint-disable @typescript-eslint/no-unused-vars */
import {

  createApi,

  fetchBaseQuery,

} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

if (!baseUrl) {
  throw new Error("Environment variable NEXT_PUBLIC_BASE_URL is not set");
}

const baseQueryWithAuth: ReturnType<typeof fetchBaseQuery> = async (
  args,
  api,
  extraOptions
) => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth?.accessToken;
      if (token) {
        headers.set("Authorization", `${token}`);
      }
      return headers;
    },
  });

  const result = await rawBaseQuery(args, api, extraOptions);


  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["User","Single-User","Hospitals","Single-Hospital","Patients","Single-Patient","Documents", "Single-Document","Clinics","Single-Clinic","Recent-Activity","Analysis"],
  endpoints: (builder) => ({}),
});


