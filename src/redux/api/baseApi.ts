import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_HOST_API,
  prepareHeaders: (headers, { getState }) => {
    headers.set("Accept", "application/json");

    // Get token from Redux store
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
  // credentials: 'include', // Optional, if you want to send cookies
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: [
    "user",
    "services",
    "payments",
    "messages",
    "notifications",
    "notificationsCount",
    "document",
    "home",
    "global",
    "interior",
    "exterior",
    "lawn-garden",
    "specialized",
    "articles",
    "referral",
    "membership",
    "vip-contractor",
  ],
  endpoints: () => ({}),
});
