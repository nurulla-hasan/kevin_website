import { User } from "lucide-react";
import Link from "next/link";
import { IoIosStar } from "react-icons/io";
import ImageWithFallback, { PLACEHOLDERS } from "@/Component/shared/ImageWithFallback";

export default function ConstractorCard({ contractor }) {
  const avgRating =
    contractor?.review?.length
      ? (
          contractor.review.reduce(
            (sum: number, item: { rating: number }) => sum + item.rating,
            0,
          ) / contractor.review.length || 5
        ).toFixed(1)
      : 0;

  return (
    <div className="max-w-sm w-full bg-card border border-border rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden mx-auto flex flex-col group">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden flex">
        <ImageWithFallback
          src={contractor?.image}
          alt={contractor?.title}
          fallback={PLACEHOLDERS.CONTRACTOR}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 block"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
        <h2 className="absolute bottom-4 left-4 text-white font-bold text-lg sm:text-xl drop-shadow-lg z-20">
          {contractor?.title}
        </h2>
        <Link href={`/profile/${contractor?._id}`} className="z-20">
          <button className="absolute bottom-4 right-4 bg-primary/90 backdrop-blur-sm text-primary-foreground text-sm font-semibold py-2 px-4 rounded-full shadow-lg hover:bg-primary transition-all duration-300 hover:scale-105">
            View Profile
          </button>
        </Link>
      </div>

      {/* Content */}
      <div className="p-6 text-foreground flex flex-col gap-4 flex-1">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <span className="rounded-full w-8 h-8 flex items-center justify-center bg-primary/10 text-primary">
              <User size={16} />
            </span>
            <span className="font-medium text-muted-foreground">
              {contractor?.firstName} {contractor?.lastName}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <IoIosStar className="text-yellow-500 text-lg" />
            <span className="font-semibold text-foreground">{avgRating}</span>
            <span className="text-muted-foreground">({contractor?.review?.length} review{contractor?.review?.length > 1 ? "s" : ""})</span>
          </div>
        </div>

        <div>
          <p className="font-bold text-foreground mb-2">Expertise</p>
          <div className="flex flex-wrap gap-2">
            {contractor?.servicesYouProvide?.slice(0, 3).map((item, idx) => (
              <span key={idx} className="inline-block bg-muted text-muted-foreground text-xs px-3 py-1 rounded-full">
                {item}
              </span>
            ))}
            {contractor?.servicesYouProvide?.length > 3 && (
              <span className="inline-block text-muted-foreground text-xs px-2 py-1">
                +{contractor.servicesYouProvide.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <Link href={`/quote/${contractor?._id}`}>
        <button className="w-full bg-primary text-primary-foreground font-semibold py-3 hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg">
          Request Quote
        </button>
      </Link>
    </div>
  );
}
