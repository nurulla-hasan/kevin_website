'use client';

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
} from 'react-icons/fa';
import hero from '@/assests/hero.png';
import jesi from '@/assests/jesi.jpg';
import Image from 'next/image';
import RecentArticle from '@/Component/Home/RecentArticle';
import { useGetSingleArticleQuery } from '@/redux/features/others/otherApi';
import LoadingSpinner from '@/Component/Loading';
import dayjs from 'dayjs';

const ArticleDetailsPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const { data: article, isLoading: isSingleLoading } =
    useGetSingleArticleQuery(id);

  if (isSingleLoading) return <LoadingSpinner />;

  return (
    <div className="w-full bg-background">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Article Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4">
            {article?.data?.title}
          </h1>

          {/* Author Info */}
          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-">
            <div className="flex items-center space-x-2">
              <div className="">
                <Image
                  src={jesi}
                  alt=""
                  height={500}
                  width={500}
                  className="h-8 w-8 rounded-full"
                />
              </div>
              <span className="text-foreground">
                {article?.data?.user.firstName} {article?.data?.user.lastName}
              </span>
            </div>
            <span className="text-foreground">
              {dayjs(article?.data?.updatedAt).format('DD MMMM YYYY')}
            </span>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mb-8">
          <div className="w-full aspect-[16/9] sm:aspect-[2/1] overflow-hidden rounded-xl border border-border">
            <Image
              src={article?.data?.image || hero}
              alt="Contractor working with wood"
              className="h-full w-full object-cover py-5"
              width={500}
              height={500}
            />
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-gray whitespace-pre-line prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground">
          {article?.data?.content}

          {/* Social Media Share */}
          {/* Social Media Share */}
          <div className="border-t border-border pt-8 mt-12">
            <div className="flex justify-center space-x-4">
              {/* Facebook */}
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  window.location.href
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary text-primary-foreground rounded-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
                aria-label="Share on Facebook"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>

              {/* Twitter / X */}
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  window.location.href
                )}&text=${encodeURIComponent(article?.data?.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-foreground text-background rounded-lg flex items-center justify-center hover:bg-foreground/90 transition-colors"
                aria-label="Share on Twitter"
              >
                <FaTwitter className="w-4 h-4" />
              </a>

              {/* Instagram - ❌ no direct share URL */}
              {/* You usually just link to your Instagram profile */}
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-colors"
                aria-label="Share on Ijstagram"
              >
                <FaInstagram className="w-4 h-4" />
              </a>

              {/* Pinterest */}
              <a
                href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
                  window.location.href
                )}&media=${encodeURIComponent(
                  article?.data?.image || hero
                )}&description=${encodeURIComponent(article?.data?.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-foreground text-background rounded-lg flex items-center justify-center hover:bg-foreground/90 transition-colors"
                aria-label="Share on Pinterest"
              >
                <FaPinterestP className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <RecentArticle />
    </div>
  );
};

export default ArticleDetailsPage;
