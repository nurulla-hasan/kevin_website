"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetSpecefiqUserQuery } from "@/redux/features/user/userApi";
import { resetContractorData } from "@/redux/features/contractor/contractorSlice";
import { setCookie } from "nookies";
import { message } from "antd";
import { protectedRoutes } from "@/constants";

// Define user and contractor routes
const userItems = [
  { label: "Profile", href: "/myProfile" },
  { label: "Password", href: "/password" },
  // { label: "Notification", href: "/notification" },
  { label: "Referal", href: "/referal" },
  // { label: "Billing Info", href: "/billing" },
  // { label: "Project Status", href: "/status" },
  { label: "Account Balance", href: "/accountBalance" },
  // { label: "Transactions", href: "/transactions" },
  { label: "Ask a Pro", href: "/proConstractor" },
  { label: "VIP Member", href: "/pricing" },
  { label: "Delete Account", href: "/delete" },
];

const contractorItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Your Service", href: "/yourServices" },
  // { label: 'Profile', href: '/constractorProfile' },
  { label: "Profile", href: "/myProfile" },
  // { label: "Notification", href: "/notification" },
  { label: "Refferal", href: "/referal" },
  { label: "Document Verification", href: "/documentVerification" },
  { label: "Project Management", href: "/projectManagement" },
  { label: "Billings", href: "/billings" },
  { label: "VIP Contractor", href: "/vipContractor" },
  // { label: "Ask a Pro", href: "/askAPro" },
  { label: "Ask a Pro", href: "/proConstractor" },
  { label: "Delete Account", href: "/delete" },
];

const Sidebar = () => {
  const pathname = usePathname();
  const user = useAppSelector(selectCurrentUser);
  const { data: specUser } = useGetSpecefiqUserQuery(user?.user?.userId);
  const role = specUser?.data?.role;
  const isPremiumUser = specUser?.data?.subscription?.status ==='active';  
  const dispatch = useAppDispatch();
  const router = useRouter();
  // const items = role === "contractor" ? contractorItems : userItems;
  const items = (role === "contractor" || role === "vipContractor") ? contractorItems : userItems;


  // logout
  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetContractorData());
    // Delete cookie manually
    router.push("/");
    setCookie(null, "user", "", { path: "/", maxAge: -1 });
    message.success("Logout Success");
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  return (
    <aside className="w-full pb-4 rounded-md">
      <nav className="flex flex-col space-y-1">
        {items.map((item) => {
          const isYourServiceActive =
            item.href === "/yourServices" &&
            (pathname === "/yourServices" || pathname === "/createService");

          const isDocumentVerificationActive =
            item.href === "/documentVerification" &&
            (pathname === "/documentVerification" ||
              pathname === "/doneVerification");
          const isQuoteActive =
            item.href === "/projectManagement" &&
            (pathname === "/projectManagement" || pathname === "/sendQuote");
          const isStatusActive =
            item.href === "/status" && pathname.startsWith("/status");
          const isProjectDetailsActive =
            item.href === "/projectManagement" &&
            pathname.startsWith("/projectManagement");

          const isActive =
            isYourServiceActive ||
            isDocumentVerificationActive ||
            isStatusActive ||
            isProjectDetailsActive ||
            isQuoteActive ||
            pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "text-sm font-bold px-3 py-3 rounded-md transition-colors",
                isActive
                  ? "bg-blue-100 text-blue-600 border-l-2 border-blue-600"
                  : "text-gray-800 hover:bg-gray-100"
              )}
            >
              {item.label}
            </Link>
          );
        })}
        {/* {role === 'contractor' && ( */}
        <div className="ml-3">
          {/* Logout Button */}
          <button
            onClick={() => handleLogout()}
            className="w-[50%] bg-red-500 text-white py-3 rounded hover:bg-red-600 transition mt-4"
          >
            Logout
          </button>
        </div>
        {/* )} */}
      </nav>
    </aside>
  );
};

export default Sidebar;
