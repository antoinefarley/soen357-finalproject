import { Layout } from "@components/layout";
import { HeaderContentFlexLayout } from "@components/utils";

import { ActionBarViewMode } from "@components/action-bar";
import { ArtworkViewGrid, ArtworkViewList } from "@components/artwork-views";
import { useContext, useState } from "react";
import { FeaturedContentViewModes } from ".";
import { artworks } from "../data/artworks/artworks";
import { AppContext } from "./_app";

export default function Saved() {
  const { useSavedArtworks } = useContext(AppContext);

  const [savedArtworks] = useSavedArtworks;
  const [selectedViewMode, setSelectedViewMode] = useState(
    FeaturedContentViewModes.GRID
  );
  const savedArtworksArtworks = artworks.filter((elem) =>
    savedArtworks.includes(elem.id)
  );

  return (
    <Layout>
      <div className="h-full p-8 bg-gray-60">
        <HeaderContentFlexLayout>
          <span className="flex justify-between items-center">
            <span className="pl-2 text-2xl font-bold">Saved Artworks</span>
            <ActionBarViewMode
              selectedViewMode={selectedViewMode}
              setSelectedViewMode={setSelectedViewMode}
            />
          </span>
          <div className="grow">
            {savedArtworks.length == 0 ? (
              <>
                Add elements to your saved collection by clicking the heart icon
                on an artwork.
              </>
            ) : (
              <>
                {selectedViewMode === FeaturedContentViewModes.GRID && (
                  <ArtworkViewGrid artworks={savedArtworksArtworks} />
                )}
                {selectedViewMode === FeaturedContentViewModes.LIST && (
                  <ArtworkViewList artworks={savedArtworksArtworks} />
                )}
              </>
            )}
          </div>
        </HeaderContentFlexLayout>
      </div>
    </Layout>
  );
}
