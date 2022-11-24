import Link from "next/link";
import { FunctionComponent } from "react";
import { artworks } from "../data/artworks/artworks";

export type Artwork = typeof artworks[0];

export enum ArtworkVariant {
  PICTURE_ONLY,
  INFO_FLEX,
  LIST_ELEM,
}

export const Artwork: FunctionComponent<{
  artwork: Artwork;
  variant?: ArtworkVariant;
}> = ({ artwork, variant = ArtworkVariant.PICTURE_ONLY }) => {
  const infoSectionsFull = {
    Artist: artwork.artist_title,
    "Place of Origin": artwork.place_of_origin,
    Year: artwork.date_display,
    Medium: artwork.medium_display,
    Dimensions: artwork.dimensions,
    Type: artwork.artwork_type_title,
    "Credit Line": artwork.credit_line,
  };

  const infoSectionsList = {
    Title: artwork.title,
    Artist: artwork.artist_title,
    Medium: artwork.medium_display,
    Year: artwork.date_display,
  };

  return (
    <>
      {variant === ArtworkVariant.INFO_FLEX && (
        <div className="w-full h-full flex flex-wrap-reverse overflow-hidden">
          <div className="h-full flex-1 space-y-4 pl-2 pr-4 overflow-y-scroll">
            {Object.entries(infoSectionsFull).map(([title, content]) => (
              <InfoTitleContent>
                {{
                  title,
                  content,
                }}
              </InfoTitleContent>
            ))}
          </div>

          <div className="grow flex h-full justify-end basis-[300px]">
            <img
              className="object-contain max-w-[100%]  max-h-[100%]"
              src={getArtworkImage(artwork)}
              alt="img"
            />
          </div>
        </div>
      )}
      {variant === ArtworkVariant.PICTURE_ONLY && (
        <Link
          href={`/artwork/${artwork.id}`}
          className="w-full h-full relative flex flex-wrap-reverse bg-gray-100 shadow-sm border-gray-100 border-2 rounded-xl overflow-hidden hover:scale-[1.01]"
        >
          <div className="flex-1 basis-[300px]">
            <img
              className="h-full object-cover"
              src={getArtworkImage(artwork)}
              alt="img"
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
                alt="img"
              />
            </div>

            <div className="px-8 py-4 grow grid grid-cols-2 auto-rows-fr">
              {Object.entries(infoSectionsList).map(([title, content]) => (
                <InfoTitleContent>
                  {{
                    title,
                    content,
                  }}
                </InfoTitleContent>
              ))}
            </div>
          </div>
        </Link>
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
