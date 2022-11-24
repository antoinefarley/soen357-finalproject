import { getArtworkImage } from "@components/artwork";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useContext, useState } from "react";
import { useBoolean } from "usehooks-ts";
import { ActionBarActions } from "../components/action-bar";
import { ArtworkViewCarousel } from "../components/artwork-views";
import { Layout } from "../components/layout";
import { HeaderContentFlexLayout } from "../components/utils";
import { AppContext } from "./_app";

export enum FeaturedContentViewModes {
  CAROUSEL,
  GRID,
  LIST,
}

export default function Home() {
  const { artworks } = useContext(AppContext);

  const [selectedCarouselIndex, setSelectedCarouselIndex] = useState(0);
  const carouselArtworks = artworks ? Object.values(artworks).slice(0, 5) : [];
  const { value: showFullScreen, toggle: toggleFullScreen } = useBoolean();

  return (
    <Layout>
      <div className="h-full p-8 pb-8 bg-gray-60">
        <HeaderContentFlexLayout>
          <span className="flex justify-between items-center">
            <span className="text-2xl font-bold">
              Welcome to the Digital Museum of Arts
            </span>
            <span className="flex gap-2">
              {carouselArtworks.length > 0 && (
                <ActionBarActions
                  artwork={carouselArtworks[selectedCarouselIndex]}
                  onMagnifyClick={toggleFullScreen}
                />
              )}
            </span>
          </span>
          <ArtworkViewCarousel
            artworks={carouselArtworks}
            selectedIndex={selectedCarouselIndex}
            setSelectedIndex={setSelectedCarouselIndex}
          />
        </HeaderContentFlexLayout>
      </div>
      {carouselArtworks.length > 0 && showFullScreen && (
        <div className="w-full h-full flex justify-center items-center fixed top-0 left-0 bg-gray-100/95">
          <img
            className="h-full object-contain pointer-event-none"
            src={getArtworkImage(carouselArtworks[selectedCarouselIndex])}
            alt={`artwork-image-${carouselArtworks[selectedCarouselIndex].title}`}
          />
          <button
            className="p-6 fixed top-0 right-0"
            onClick={toggleFullScreen}
          >
            <XMarkIcon className="h-12 w-12 fill-black hover:opacity-70" />
          </button>
        </div>
      )}
    </Layout>
  );
}
