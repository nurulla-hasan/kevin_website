

"use client";
import Link from "next/link";
import { Briefcase, FileText, Star, BookOpen, User } from "lucide-react";

const Statics = ({ dashboardStats }) => {

  const stats = [
    {
      title: "Projects",
      value: dashboardStats?.data?.totalServices,
      subtitle: "Successful Projects",
      icon: <Briefcase className="w-8 h-8 text-indigo-600" />,
  
      color: "from-indigo-50 to-indigo-100",
    },
    {
      title: "Quotes",
      value: dashboardStats?.data?.totalQuotes,
      subtitle: "Quote Requests",
      icon: <FileText className="w-8 h-8 text-blue-600" />,
      color: "from-blue-50 to-blue-100",
    },
    {
      title: "Reviews",
      value: dashboardStats?.data?.averageRating,
      subtitle: `${dashboardStats?.data?.totalReviews} Reviews`,
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      color: "from-yellow-50 to-yellow-100",
      suffix: " rating",
    },
    {
      title: "My Blog",
      value: dashboardStats?.data?.totalArticles,
      icon: <BookOpen className="w-8 h-8 text-pink-600" />,
      link: "/specifiqUserArticle",
      linkText: "View All",
      color: "from-pink-50 to-pink-100",
    },
    {
      title: "My Profile",
      icon: <User className="w-8 h-8 text-green-600" />,
      link: "/changeContractorProfileMedia",
      linkText: "View",
      color: "from-green-50 to-green-100",
    },
  ];

  return (
    <div className="p-6">
      <div className="border border-gray-200 shadow-md rounded-xl p-6 bg-white">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Contractor Dashboard
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`bg-gradient-to-br ${stat.color} rounded-xl p-5 shadow-sm hover:shadow-lg transition`}
            >
              <div className="flex justify-between items-start">
                <div>{stat.icon}</div>
                {stat.link && (
                  <Link
                    href={stat.link}
                    className="text-sm text-indigo-600 hover:underline"
                  >
                    {stat.linkText}
                  </Link>
                )}
              </div>
              <div className="mt-4">
                {stat.value !== undefined && (
                  <p className="text-3xl font-extrabold text-gray-900">
                    {stat.value}
                    {stat.suffix && (
                      <span className="text-sm font-medium ml-2 text-gray-700">
                        {stat.suffix}
                      </span>
                    )}
                  </p>
                )}
                {stat.subtitle && (
                  <p className="text-sm text-gray-600 mt-1">{stat.subtitle}</p>
                )}
                {!stat.value && stat.title === "My Profile" && (
                  <p className="text-sm text-gray-600 mt-1">
                    Complete your profile
                  </p>
                )}
              </div>
              <p className="mt-3 text-lg font-semibold text-gray-800">
                {stat.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Statics;
