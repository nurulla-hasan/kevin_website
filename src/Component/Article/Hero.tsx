/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import Image from 'next/image'
import Link from 'next/link'
import dayjs from 'dayjs'
import { useEffect, useRef, useState } from 'react'

export default function BlogHero({ allArticles, cmsData = undefined }) {
  // eslint-disable-next-line no-unused-vars
  const meta = allArticles?.data?.meta

  const [scrollPosition, setScrollPosition] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)

  const popularArticles =
    allArticles?.data?.result?.filter(article => article.isPopular) || []

  const featuredArticle = allArticles?.data?.result?.find(
    article => article.isFeatured
  )

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        scrollContainerRef.current
      const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100
      setScrollPosition(scrollPercentage)
    }
  }

  const scrollToPosition = percentage => {
    if (scrollContainerRef.current) {
      const { scrollHeight, clientHeight } = scrollContainerRef.current
      const scrollTop = (percentage / 100) * (scrollHeight - clientHeight)
      scrollContainerRef.current.scrollTo({
        top: scrollTop,
        behavior: 'smooth',
      })
    }
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (!featuredArticle) {
    return null
  }

  const featuredCms = cmsData?.featured
  const popularCms = cmsData?.popular

  return (
    <div className="w-full bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Grid layout corrected */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* --- FEATURED SECTION --- */}
          {featuredCms?.isVisible !== false && (
            <div className="lg:col-span-2">
              <div className="mb-6 flex items-center">
                <span className="inline-flex items-center rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white">
                  {featuredCms?.title || "Featured"}
                </span>
                <span className="ml-2 text-sm text-gray-600">
                  {featuredCms?.content || "This month"}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Text side */}
                <div className="order-2 md:order-1">
                  <h1 className="mb-4 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
                    {featuredArticle?.title}
                  </h1>

                  <div className="mb-4 flex items-center space-x-3 text-sm text-gray-600">
                    <Image
                      src={featuredArticle?.user?.image}
                      alt="Author"
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-full"
                    />
                    <span>
                      {featuredArticle?.user?.firstName}{" "}
                      {featuredArticle?.user?.lastName}
                    </span>
                    <span>|</span>
                    <span>
                      {dayjs(featuredArticle?.updatedAt).format("DD MMMM YYYY")}
                    </span>
                  </div>

                  <p className="text-gray-700 leading-relaxed">
                    {featuredArticle?.content?.slice(0, 120)}{" "}
                    <Link
                      href={`/article/${featuredArticle?._id}`}
                      className="text-blue-600 underline"
                    >
                      Read More...
                    </Link>
                  </p>
                </div>

                {/* Image side */}
                <div className="order-1 md:order-2">
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-lg">
                    <Image
                      src={featuredArticle?.image}
                      alt="Featured article image"
                      width={600}
                      height={400}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --- POPULAR SECTION --- */}
          {popularCms?.isVisible !== false && (
            <div className="lg:col-span-1">
              {popularArticles.length > 0 && (
                <div>
                  <div className="mb-6 flex items-center">
                    <span className="inline-flex items-center rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white">
                      {popularCms?.title || "Popular"}
                    </span>
                    <span className="ml-2 text-sm text-gray-600">
                      {popularCms?.content || "This month"}
                    </span>
                  </div>

                <div className="relative">
                  <div
                    ref={scrollContainerRef}
                    className="h-96 overflow-y-auto pl-5 pr-3"
                    style={{
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none',
                    }}
                  >
                    <div className="space-y-6">
                      {popularArticles.map((article, index) => (
                        <article
                          key={article._id}
                          className={`${
                            index < popularArticles.length - 1
                              ? 'border-b border-gray-200 pb-6'
                              : 'pb-6'
                          } cursor-pointer hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors`}
                        >
                          <h3 className="mb-2 text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                            {article.title}
                          </h3>
                          <div className="mb-3 flex items-center space-x-2 text-sm text-gray-600">
                            <Image
                              src={article?.user?.image}
                              alt="Author"
                              width={32}
                              height={32}
                              className="h-8 w-8 rounded-full"
                            />
                            <span>
                              {article?.user?.firstName}{' '}
                              {article?.user?.lastName}
                            </span>
                            <span>|</span>
                            <span>
                              {dayjs(article?.updatedAt).format('DD MMMM YYYY')}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
                            {article?.content}
                          </p>
                        </article>
                      ))}
                    </div>
                  </div>

                  {/* Scroll progress bar */}
                  <div className="absolute left-0 top-0 h-full w-1 bg-gray-200 rounded-full">
                    <div
                      className="bg-blue-600 rounded-full transition-all duration-200 w-full"
                      style={{
                        height: `${Math.max(
                          20,
                          ((scrollContainerRef.current?.clientHeight || 0) /
                            (scrollContainerRef.current?.scrollHeight || 1)) *
                            100
                        )}%`,
                        transform: `translateY(${
                          (scrollPosition *
                            ((scrollContainerRef.current?.clientHeight || 0) -
                              (Math.max(
                                20,
                                ((scrollContainerRef.current?.clientHeight ||
                                  0) /
                                  (scrollContainerRef.current?.scrollHeight ||
                                    1)) *
                                  100
                              ) *
                                (scrollContainerRef.current?.clientHeight ||
                                  0)) /
                              100)) /
                          100
                        }px)`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Pagination dots */}
                <div className="mt-6 flex justify-center space-x-2">
                  {[0, 25, 50, 75].map((position, index) => (
                    <button
                      key={index}
                      onClick={() => scrollToPosition(position)}
                      className={`h-2 w-2 rounded-full transition-colors duration-200 ${
                        scrollPosition >= position &&
                        scrollPosition < (index === 3 ? 100 : position + 25)
                          ? "bg-blue-600"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`Scroll to section ${index + 1}`}
                    ></button>
                  ))}
                </div>
              </div>
            )}
          </div>
          )}
        </div>
      </div>
    </div>
  )
}
