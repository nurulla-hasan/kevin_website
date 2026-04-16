import dayjs from 'dayjs';
import Link from 'next/link';
import ImageWithFallback, { PLACEHOLDERS } from '@/Component/shared/ImageWithFallback';

export default function ArticleCard({ cardData }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      <div className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden">
        <ImageWithFallback
          src={cardData?.image}
          alt={cardData?.alt || 'Article Image'}
          fallback={PLACEHOLDERS.ARTICLE}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="px-5 sm:px-6 md:px-8 py-6">
        <div className="inline-block bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full px-4 py-1.5 mb-4">
          <p className="text-xs sm:text-sm text-gray-700 font-medium">
            {cardData?.user?.firstName} {cardData?.user?.lastName} •{' '}
            {dayjs(cardData?.updatedAt).format('DD MMM YYYY')}
          </p>
        </div>
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {cardData?.title}
        </h2>
        <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed mb-6 line-clamp-3">
          {cardData?.content?.slice(0, 120)}...
        </p>
        <Link href={`/article/${cardData?._id}`}>
          <button className="w-full px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg">
            Read More
          </button>
        </Link>
      </div>
    </div>
  );
}
