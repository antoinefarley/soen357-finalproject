import Image from "next/image";
import dmoaLogo from "../assets/dmoa-logo.png";

import { ActionBarExhibition } from "@components/action-bar";
import { ArtworkExhibition } from "@components/artwork";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useContext, useState } from "react";
import { ArtworkData } from "types/types";
import { useBoolean } from "usehooks-ts";
import { AppContext } from "./_app";

export enum FeaturedContentViewModes {
  CAROUSEL,
  GRID,
  LIST,
}

export default function CurrentExhibition() {
  const { artworks } = useContext(AppContext);

  const { value: showFullScreen, toggle: toggleFullScreen } = useBoolean();

  const filteredArtworks = Object.values(artworks).filter(
    (elem) => elem.artwork_type_title === "Photograph" && !elem.artist_id
  );

  const [artwork, setArtwork] = useState(
    filteredArtworks ? filteredArtworks[0] : null
  );

  const onIntersectionScroll = (artwork: ArtworkData) => {
    setArtwork(artwork);
  };

  return (
    <div className="font-['Helvetica'] w-full h-full flex flex-col bg-white">
      <div className={`w-full h-20 min-h-[80px]`}>
        <div className="h-full flex justify-between items-center p-4 max-w-screen-2xl mx-auto">
          <div className="h-full flex justify-start items-center gap-4">
            {!showFullScreen && (
              <>
                <div className="flex items-center">
                  <Link href="/">
                    <Image
                      className="w-10 object-contain"
                      src={dmoaLogo}
                      alt="Picture of the author"
                    />
                  </Link>
                </div>
                <span className="text-2xl text-black font-bold">
                  Unknown Artist Photography
                </span>
              </>
            )}
          </div>

          {showFullScreen ? (
            <button
              className="p-6 fixed top-0 right-0"
              onClick={toggleFullScreen}
            >
              <XMarkIcon className="h-12 w-12 fill-black hover:opacity-70" />
            </button>
          ) : (
            artwork && (
              <ActionBarExhibition
                artwork={artwork}
                onMagnifyClick={toggleFullScreen}
              />
            )
          )}
        </div>
      </div>
      <div className="grow overflow-hidden">
        <div className="h-full overflow-y-scroll grid grid-flow-row auto-rows-[calc(100vh-80px)] gap-8 snap-y snap-mandatory p-4">
          {filteredArtworks.map((elem, index) => (
            <ArtworkExhibition
              key={`artwork-grid-view-element-${index}`}
              onIntersectionScroll={onIntersectionScroll}
              artwork={elem}
              fullScreen={showFullScreen}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
