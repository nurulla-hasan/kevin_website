import { baseApi } from "@/redux/api/baseApi";

const homeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // get home data
        getCmsHomeData: builder.query({
            query: () => ({
                url: `/cms/home?t=${new Date().getTime()}`,
                method: "GET",
            }),
            providesTags: ["home"],
        }),
    }),
});

export const {
    useGetCmsHomeDataQuery,
} = homeApi;
