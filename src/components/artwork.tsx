import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { FunctionComponent, useEffect, useRef } from "react";
import { ArtworkData } from "types/types";
import { useIntersectionObserver } from "usehooks-ts";

export enum ArtworkVariant {
  PICTURE_ONLY,
  INFO_FLEX,
  LIST_ELEM,
  INFO,
}

const getInfoSection = {
  exhibition: (artwork: ArtworkData) => ({
    Title: artwork.title,
    Artist: artwork.artist_title,
    "Place of Origin": artwork.place_of_origin,
    Year: artwork.date_display,
    Medium: artwork.medium_display,
    Dimensions: artwork.dimensions,
    Type: artwork.artwork_type_title,
    "Credit Line": artwork.credit_line,
  }),
  full: (artwork: ArtworkData) => ({
    Artist: artwork.artist_title,
    "Place of Origin": artwork.place_of_origin,
    Year: artwork.date_display,
    Medium: artwork.medium_display,
    Dimensions: artwork.dimensions,
    Type: artwork.artwork_type_title,
    "Credit Line": artwork.credit_line,
  }),
  small: (artwork: ArtworkData) => ({
    Title: artwork.title,
    Artist: artwork.artist_title,
    Medium: artwork.medium_display,
    Year: artwork.date_display,
  }),
};

export const ArtworkExhibition: FunctionComponent<{
  artwork: ArtworkData;
  onIntersectionScroll: (artwork: ArtworkData) => void;
  fullScreen: boolean;
}> = ({ artwork, onIntersectionScroll, fullScreen }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {
    threshold: 0.9,
    root: null,
    rootMargin: "0%",
    freezeOnceVisible: false,
  });
  const isVisible = !!entry?.isIntersecting;

  useEffect(() => {
    onIntersectionScroll(artwork);
  }, [isVisible, artwork]);

  return (
    <div
      ref={ref}
      className="snap-start w-full h-full flex flex-wrap-reverse overflow-hidden py-4"
    >
      {!fullScreen && (
        <div className="h-full flex-1 overflow-y-scroll">
          <AnimatePresence>
            {isVisible && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full space-y-4 pr-4 "
              >
                {Object.entries(getInfoSection.exhibition(artwork)).map(
                  ([title, content]) => (
                    <InfoTitleContent
                      key={`artwork-info-section-${artwork.id}-${title}`}
                    >
                      {{
                        title,
                        content: content ?? `Unknown ${title}`,
                      }}
                    </InfoTitleContent>
                  )
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <div
        className={`${
          fullScreen ? "justify-center" : "justify-end"
        } grow flex h-full basis-[300px]`}
      >
        <img
          className="object-contain max-w-[100%] max-h-[100%]"
          src={getArtworkImage(artwork)}
          alt={`artwork-image-${artwork.title}`}
          loading="lazy"
        />
      </div>
    </div>
  );
};

export const Artwork: FunctionComponent<{
  artwork: ArtworkData;
  variant?: ArtworkVariant;
}> = ({ artwork, variant = ArtworkVariant.PICTURE_ONLY }) => {
  return (
    <>
      {variant === ArtworkVariant.INFO_FLEX && (
        <div className="w-full h-full flex flex-wrap-reverse overflow-hidden">
          <div className="h-full flex-1 space-y-4 pr-4 overflow-y-scroll">
            {Object.entries(getInfoSection.full(artwork)).map(
              ([title, content]) => (
                <InfoTitleContent
                  key={`artwork-info-section-${artwork.id}-${title}`}
                >
                  {{
                    title,
                    content,
                  }}
                </InfoTitleContent>
              )
            )}
          </div>

          <div className="grow flex h-full justify-end basis-[300px]">
            <img
              className="object-contain max-w-[100%]  max-h-[100%]"
              src={getArtworkImage(artwork)}
              alt={`artwork-image-${artwork.title}`}
              loading="lazy"
            />
          </div>
        </div>
      )}
      {variant === ArtworkVariant.PICTURE_ONLY && (
        <Link
          href={`/artwork/${artwork.id}`}
          className="w-full h-full relative flex flex-wrap-reverse bg-gray-100 shadow-sm border-gray-100 border-2 rounded-xl overflow-hidden"
        >
          <div className="flex-1 basis-[300px]">
            <img
              className="h-full object-cover hover:scale-[1.01]"
              src={getArtworkImage(artwork)}
              alt={`artwork-image-${artwork.title}`}
              loading="lazy"
            />
          </div>
        </Link>
      )}
      {variant === ArtworkVariant.LIST_ELEM && (
        <Link
          href={`/artwork/${artwork.id}`}
          className="w-full h-[200px] flex bg-gray-100 shadow-sm border-gray-100 border-2 rounded-xl"
        >
          <div className="w-full h-full flex bg-gray-100 shadow-sm rounded-xl overflow-hidden">
            <div className="flex items-center w-[200px]">
              <img
                className="w-full object-cover "
                src={getArtworkImage(artwork)}
                alt={`artwork-image-${artwork.title}`}
                loading="lazy"
              />
            </div>

            <div className="px-8 py-4 grow grid grid-cols-2 auto-rows-fr">
              {Object.entries(getInfoSection.small(artwork)).map(
                ([title, content]) => (
                  <InfoTitleContent
                    key={`artwork-info-section-${artwork.id}-${title}`}
                  >
                    {{
                      title,
                      content,
                    }}
                  </InfoTitleContent>
                )
              )}
            </div>
          </div>
        </Link>
      )}
      {variant === ArtworkVariant.INFO && (
        <div className="grow grid grid-cols-2 auto-rows-fr">
          {Object.entries(getInfoSection.small(artwork)).map(
            ([title, content]) => (
              <InfoTitleContent
                key={`artwork-info-section-${artwork.id}-${title}`}
              >
                {{
                  title,
                  content,
                }}
              </InfoTitleContent>
            )
          )}
        </div>
      )}
    </>
  );
};

const InfoTitleContent: FunctionComponent<any> = ({ children }) => (
  <div className="flex flex-col gap-1">
    <span className="text-black font-regular font-bold">{children.title}</span>
    <span className="text-gray-800 font-sm font-regular">
      {children.content}
    </span>
  </div>
);

export const getArtworkImage = (artwork: any) =>
  `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`;
