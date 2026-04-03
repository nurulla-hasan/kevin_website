import { baseApi } from "@/redux/api/baseApi";

const globalApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGlobalData: builder.query({
      query: () => ({
        url: "/cms/global",
        method: "GET",
      }),
      providesTags: ["global"],
    }),
  }),
});

export const { useGetGlobalDataQuery } = globalApi;
