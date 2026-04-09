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
import { FaLock } from "react-icons/fa"; // Lock Icon
import { useGetGlobalDataQuery } from "@/redux/features/cms/globalApi";

// Define user and contractor routes
const userItems = [
  { label: "Profile", href: "/myProfile" },
  { label: "Password", href: "/password" },
  { label: "Referral", href: "/referal" },
  { label: "Account Balance", href: "/accountBalance" },
  { label: "Ask a Pro", href: "/proConstractor" },
  { label: "VIP Member", href: "/pricing" },
  { label: "Delete Account", href: "/delete" },
];

const contractorItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Your Service", href: "/yourServices" },
  { label: "Profile", href: "/myProfile" },
  { label: "Referral", href: "/referal" },
  { label: "Document Verification", href: "/documentVerification" },
  { label: "Project Management", href: "/projectManagement" },
  // { label: "Billings", href: "/billings" },
  { label: "VIP Contractor", href: "/vipContractor" },
  { label: "Ask a Pro", href: "/proConstractor" },
  { label: "Delete Account", href: "/delete" },
];

const Sidebar = () => {
  const { data: globalData } = useGetGlobalDataQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const pathname = usePathname();
  const user = useAppSelector(selectCurrentUser);
  const { data: specUser } = useGetSpecefiqUserQuery(user?.user?.userId);
  const role = specUser?.data?.role;
  const isPremiumUser = specUser?.data?.subscription?.status === "active";
  const dispatch = useAppDispatch();
  const router = useRouter();

  const cmsSidebar = globalData?.data?.sidebar || [];

  const sidebarMapping = {
    "Profile": 0,
    "Password": 1,
    "Referral": 2,
    "Account Balance": 3,
    "Ask a Pro": 4,
    "VIP Member": 5,
    "VIP Contractor": 5,
    "Delete Account": 6,
  };

  const mapItem = (item) => {
    const cmsIndex = sidebarMapping[item.label];
    if (cmsIndex !== undefined) {
      const cmsItem = cmsSidebar[cmsIndex];
      return {
        ...item,
        label: cmsItem?.label || item.label,
        isVisible: cmsItem ? cmsItem.isVisible : true,
      };
    }
    return { ...item, isVisible: true };
  };

  // Determine which items to show based on role
  const rawItems = (role === "contractor" || role === "vipContractor") ? contractorItems : userItems;
  const items = rawItems.map(mapItem).filter(i => i.isVisible);

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetContractorData());
    router.push("/");
    setCookie(null, "user", "", { path: "/", maxAge: -1 });
    message.success("Logout Success");
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  // Handle lock icon click based on the user role
  const handleLockClick = (e) => {
    e.preventDefault(); // Prevent navigation if the user is not premium
    if (role === "contractor" || role === "vipContractor") {
      router.push("/vipContractor"); // Redirect contractors to vipContractor page
    } else {
      router.push("/pricing"); // Redirect other users to pricing page
    }
  };

  return (
    <aside className="w-full pb-4 rounded-md">
      <nav className="flex flex-col space-y-3">
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
            <div key={item.href} className="flex items-center space-x-2">
              {/* Only show the lock icon for non-premium users */}
              {item.label === "Ask a Pro" && !isPremiumUser ? (
                <div
                  className="flex items-center cursor-pointer text-gray-400"
                  onClick={(e) => handleLockClick(e)}
                >
                  <FaLock className="mr-2 ml-4 text-gray-600" />
                  <span
                    className={clsx(
                      isActive ? "text-blue-600" : "text-gray-800"
                    )}
                  >
                    {item.label}
                  </span>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "text-sm font-bold px-4 py-3 w-full rounded-md transition-colors",
                    isActive
                      ? "bg-blue-100 text-blue-600 border-l-2 border-blue-600"
                      : "text-gray-800 hover:bg-gray-100"
                  )}
                >
                  {item.label}
                </Link>
              )}
            </div>
          );
        })}

        {/* Logout Button */}
        <div className="ml-3 mt-4">
          <button
            onClick={() => handleLogout()}
            className="w-[50%] bg-red-500 text-white py-3 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
