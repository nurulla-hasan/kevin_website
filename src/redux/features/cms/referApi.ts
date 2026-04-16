import { baseApi } from "@/redux/api/baseApi";

const referApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCmsReferData: builder.query({
            query: () => ({
                url: `/cms/referral?t=${new Date().getTime()}`,
                method: "GET",
            }),
            providesTags: ["referral"],
        }),
    }),
});

export const {
    useGetCmsReferDataQuery,
} = referApi;
