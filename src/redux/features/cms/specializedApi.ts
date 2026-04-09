import { baseApi } from "@/redux/api/baseApi";

const specializedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCmsSpecializedData: builder.query({
      query: () => ({
        url: `/cms/specialized?t=${new Date().getTime()}`,
        method: "GET",
      }),
      providesTags: ["specialized"],
    }),
  }),
});

export const { useGetCmsSpecializedDataQuery } = specializedApi;
