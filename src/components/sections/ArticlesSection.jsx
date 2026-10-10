import React, { useState } from "react";
import { Clock, Tag } from "lucide-react";
import { Button } from "../ui/Button";
import { SectionHeading } from "../ui/SectionHeading";
import { Dialog } from "../ui/Dialog";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import { PageContainer } from "../layout/PageContainer";
import { articles } from "../../data/articles";
import { images } from "../../data/images";

/**
 * Calculates estimated read time based on an average reading speed of 200 words per minute.
 */
function getReadTime(bodyArray = []) {
  const totalWords = bodyArray.join(" ").trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(totalWords / 200));
  return `${minutes} min read`;
}

export function ArticlesSection({ selectedArticle, onSelectArticle, onCloseArticle }) {
  const [internalArticle, setInternalArticle] = useState(null);

  const activeArticle = selectedArticle || internalArticle;

  const handleOpen = (article) => {
    if (onSelectArticle) {
      onSelectArticle(article);
    } else {
      setInternalArticle(article);
    }
  };

  const handleClose = () => {
    if (onCloseArticle) {
      onCloseArticle();
    } else {
      setInternalArticle(null);
    }
  };

  return (
    <section
      id="blog"
      aria-labelledby="blog-heading"
      className="py-16 sm:py-20 lg:py-24 bg-white overflow-hidden"
    >
      <PageContainer>
        {/* Section Heading */}
        <div className="mb-14 sm:mb-20">
          <SectionHeading
            eyebrow="Insights"
            title="Practical electrical safety and maintenance guidance"
            align="center"
            maxWidth="max-w-[760px]"
          />
        </div>

        {/* 3 Alternating Rows */}
        <div className="space-y-16 sm:space-y-20">
          {articles.map((article, idx) => {
            const isEven = idx % 2 === 1; // row 2: text-left / image-right on desktop
            const articleImage = images[article.imageSlot] || images.article1;
            const readTime = getReadTime(article.body);

            return (
              <article
                key={article.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
              >
                {/* Image Col */}
                <div
                  className={`lg:col-span-6 ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  } rounded-[8px] overflow-hidden border border-[#E1E5EB] shadow-[0_8px_24px_rgba(20,41,92,0.06)] aspect-[3/2] bg-slate-100`}
                >
                  <ImageWithFallback
                    src={articleImage.src}
                    srcSet={articleImage.srcSet}
                    sizes={articleImage.sizes}
                    alt={articleImage.alt}
                    width={articleImage.width}
                    height={articleImage.height}
                    aspectRatio="3/2"
                    objectPosition={articleImage.objectPosition}
                    slotKey={article.imageSlot}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-102"
                  />
                </div>

                {/* Content Col */}
                <div
                  className={`lg:col-span-6 ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  } flex flex-col items-start gap-4`}
                >
                  {/* Category chip and auto-computed read time */}
                  <div className="flex items-center gap-3 text-[12px] sm:text-[13px] text-[#5B6475]">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-[4px] bg-[#F4F5F7] border border-[#E1E5EB] text-[#14295C] font-semibold text-[11px] uppercase tracking-wider">
                      <Tag className="w-3 h-3 text-[#1858DE]" />
                      <span>{article.category}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#1858DE]" />
                      <span>{readTime}</span>
                    </span>
                  </div>

                  <h3 className="font-display text-[#14295C] text-[clamp(1.5rem,1.2rem+1vw,2.15rem)] leading-tight uppercase">
                    {article.title}
                  </h3>

                  <p className="text-[#303746] text-[15px] leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="pt-2">
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => handleOpen(article)}
                    >
                      {article.ctaLabel || "Read Guide"}
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Article Reader Modal */}
        <Dialog
          isOpen={Boolean(activeArticle)}
          onClose={handleClose}
          title={activeArticle?.title || "Article Reader"}
          maxWidth="max-w-3xl"
        >
          {activeArticle && (
            <div className="space-y-6">
              {/* Category & Read time metadata */}
              <div className="flex items-center gap-3 text-[13px] text-[#5B6475] pb-4 border-b border-[#E1E5EB]">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-[4px] bg-[#F4F5F7] text-[#14295C] font-semibold text-[11px] uppercase tracking-wider">
                  <Tag className="w-3 h-3 text-[#1858DE]" />
                  <span>{activeArticle.category}</span>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#1858DE]" />
                  <span>{getReadTime(activeArticle.body)}</span>
                </span>
              </div>

              {/* Full Article Body Paragraphs */}
              <div className="space-y-4 text-[#303746] text-[15px] leading-relaxed">
                {activeArticle.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="pt-4 border-t border-[#E1E5EB] flex justify-end">
                <Button variant="outline" size="sm" onClick={handleClose}>
                  Close Guide
                </Button>
              </div>
            </div>
          )}
        </Dialog>
      </PageContainer>
    </section>
  );
}
