"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

// export const getCurrentUser = async () => {
//     const userCookie = (await cookies().get("user"))?.value;
  
//     if (!userCookie) return null;
  
//     const userInfo = JSON.parse(userCookie);
             
  
//     return userInfo;
//   };
export const getCurrentUser = async () => {
    const accessToken = (await cookies()).get("user")?.value;
    if (!accessToken) return null;
    let decodedData = null;
  
    if (accessToken) {
      decodedData = await jwtDecode(accessToken);
      return decodedData;
    } else {
      return null;
    }
  };
