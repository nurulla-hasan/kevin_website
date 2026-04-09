import { baseApi } from "@/redux/api/baseApi";

const interiorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCmsInteriorData: builder.query({
      query: () => ({
        url: `/cms/interior?t=${new Date().getTime()}`,
        method: "GET",
      }),
      providesTags: ["interior"],
    }),
  }),
});

export const { useGetCmsInteriorDataQuery } = interiorApi;
