import { baseApi } from "@/redux/api/baseApi";

const exteriorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCmsExteriorData: builder.query({
      query: () => ({
        url: `/cms/exterior?t=${new Date().getTime()}`,
        method: "GET",
      }),
      providesTags: ["exterior"],
    }),
  }),
});

export const { useGetCmsExteriorDataQuery } = exteriorApi;
