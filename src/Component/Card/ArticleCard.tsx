import dayjs from 'dayjs';
import Link from 'next/link';
import ImageWithFallback, { PLACEHOLDERS } from '@/Component/shared/ImageWithFallback';

export default function ArticleCard({ cardData }) {
  return (
    <div className="bg-card border border-border rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden">
        <ImageWithFallback
          src={cardData?.image}
          alt={cardData?.alt || 'Article Image'}
          fallback={PLACEHOLDERS.ARTICLE}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="px-5 sm:px-6 md:px-8 py-6">
        <div className="inline-block bg-primary/10 rounded-full px-4 py-1.5 mb-4">
          <p className="text-xs sm:text-sm text-primary font-medium">
            {cardData?.user?.firstName} {cardData?.user?.lastName} •{' '}
            {dayjs(cardData?.updatedAt).format('DD MMM YYYY')}
          </p>
        </div>
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {cardData?.title}
        </h2>
        <p className="text-muted-foreground text-xs sm:text-sm md:text-base leading-relaxed mb-6 line-clamp-3">
          {cardData?.content?.slice(0, 120)}...
        </p>
        <Link href={`/article/${cardData?._id}`}>
          <button className="w-full px-6 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg">
            Read More
          </button>
        </Link>
      </div>
    </div>
  );
}
