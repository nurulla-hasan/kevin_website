import { baseApi } from "@/redux/api/baseApi";

const vipContractorApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCmsVipContractorData: builder.query({
            query: () => ({
                url: `/cms/vip-contractor?t=${new Date().getTime()}`,
                method: "GET",
            }),
            providesTags: ["vip-contractor"],
        }),
    }),
});

export const {
    useGetCmsVipContractorDataQuery,
} = vipContractorApi;
