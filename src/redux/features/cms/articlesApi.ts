import { baseApi } from "@/redux/api/baseApi";

const articlesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCmsArticlesData: builder.query({
      query: () => ({
        url: `/cms/articles?t=${new Date().getTime()}`,
        method: "GET",
      }),
      providesTags: ["articles"],
    }),
  }),
});

export const { useGetCmsArticlesDataQuery } = articlesApi;
