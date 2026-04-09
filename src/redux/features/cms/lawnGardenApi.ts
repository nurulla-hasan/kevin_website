import { baseApi } from "@/redux/api/baseApi";

const lawnGardenApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCmsLawnGardenData: builder.query({
      query: () => ({
        url: `/cms/lawn-garden?t=${new Date().getTime()}`,
        method: "GET",
      }),
      providesTags: ["lawn-garden"],
    }),
  }),
});

export const { useGetCmsLawnGardenDataQuery } = lawnGardenApi;
