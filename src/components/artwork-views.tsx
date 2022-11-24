import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Dispatch, FunctionComponent, SetStateAction } from "react";
import { ArtworkData } from "types/types";
import { getCircularArrayIndex } from "utils/getCircularArrayIndex";
import { Artwork, ArtworkVariant, getArtworkImage } from "./artwork";

export const ArtworkViewCarousel: FunctionComponent<{
  artworks: ArtworkData[];
  selectedIndex: number;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
}> = ({ artworks, selectedIndex, setSelectedIndex }) => {
  return (
    <div className="w-full h-full flex flex-col gap-y-4 overflow-hidden">
      <div
        id="carouselExampleIndicators"
        className="w-full h-full carousel slide relative grid grid-rows-[auto,140px] gap-y-4 grid-cols-[64px,auto,64px]"
        data-bs-ride="carousel"
      >
        <button
          type="button"
          className="w-16 flex items-center justify-start p-0 text-center border-0 opacity-50 hover:opacity-100 hover:outline-none hover:no-underline"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
          onClick={() => {
            setSelectedIndex(
              getCircularArrayIndex(artworks.length, selectedIndex - 1)
            );
          }}
        >
          <ChevronLeftIcon className={`h-8 w-8 fill-black`} />
        </button>

        <div className="w-full h-full grow relative overflow-hidden rounded-lg">
          {artworks.map((elem, index) => (
            <div
              key={`carousel-image-${index}`}
              className={`carousel-item float-left w-full h-full ${
                selectedIndex === index ? "active" : ""
              }`}
              data-carousel-item="active"
            >
              <img
                src={getArtworkImage(elem)}
                alt={`artwork-image-${elem.title}`}
                className="block mx-auto h-full object-contain drop-shadow-xl"
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          className="w-16 flex items-center justify-end p-0 text-center border-0 opacity-50 hover:opacity-100 hover:outline-none hover:no-underline"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
          onClick={() => {
            setSelectedIndex(
              getCircularArrayIndex(artworks.length, selectedIndex + 1)
            );
          }}
        >
          <ChevronRightIcon className={`h-8 w-8 fill-black`} />
        </button>

        <div className="row-start-2 col-start-2">
          {artworks[selectedIndex] && (
            <Artwork
              variant={ArtworkVariant.INFO}
              artwork={artworks[selectedIndex]}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export const ArtworkViewGrid: FunctionComponent<{
  artworks: ArtworkData[];
}> = ({ artworks }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
      {artworks.map((elem, index) => (
        <Artwork key={`artwork-grid-view-element-${index}`} artwork={elem} />
      ))}
    </div>
  );
};

export const ArtworkViewList: FunctionComponent<{
  artworks: ArtworkData[];
}> = ({ artworks }) => {
  return (
    <div className="flex flex-col gap-4">
      {artworks.map((elem, index) => (
        <Artwork
          key={`artwork-grid-view-element-${index}`}
          artwork={elem}
          variant={ArtworkVariant.LIST_ELEM}
        />
      ))}
    </div>
  );
};
