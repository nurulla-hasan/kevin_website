import { baseApi } from "@/redux/api/baseApi";

const membershipApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCmsMembershipData: builder.query({
            query: () => ({
                url: `/cms/membership?t=${new Date().getTime()}`,
                method: "GET",
            }),
            providesTags: ["membership"],
        }),
    }),
});

export const {
    useGetCmsMembershipDataQuery,
} = membershipApi;
