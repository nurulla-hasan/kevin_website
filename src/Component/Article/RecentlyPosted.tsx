import ArticleCard from "../Card/ArticleCard";
import { Pagination } from "antd";

const RecentlyPosted = ({ allArticles, setPage, page, cmsData = undefined }) => {
  const meta = allArticles?.data?.meta;
  console.log("all article---->", allArticles);

  // Ensure meta and limit are defined
  const limit = meta?.limit || 10;
  const totalItems = meta?.total || 0;

  // Check if there are enough items to slice
  const currentItems = allArticles?.data?.result;

  console.log("items-------->", currentItems);
  const onPageChange = (page: number) => {
    setPage(page);
  };

  if (cmsData?.isVisible === false) return null;

  // Split title if it exists, otherwise use default
  const title = cmsData?.title || "Recently Posted";
  const titleWords = title.split(" ");
  const firstWord = titleWords[0];
  const restOfTitle = titleWords.slice(1).join(" ");

  return (
    <div className={`container my-10 mx-auto font-inter`}>
      <div className="my-6">
        <span className="inline-flex items-center rounded bg-blue-600 px-3 py-1 text-3xl font-medium text-white">
          {firstWord}
        </span>
        {restOfTitle && (
          <span className="ml-2 text-3xl text-gray-600">{restOfTitle}</span>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 px-3 mb-8">
        {currentItems?.map((cardData, idx) => (
          <ArticleCard key={idx} cardData={cardData} />
        ))}
      </div>

      <Pagination
        current={page}
        pageSize={limit} 
        total={totalItems} 
        onChange={onPageChange}
        showSizeChanger={false}
        className="flex justify-center"
        // Show the total number of pages (meta.totalPage)
        pageSizeOptions={[limit.toString()]}

      />
    </div>
  );
};

export default RecentlyPosted;
