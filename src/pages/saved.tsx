import { Layout } from "@components/layout";
import { HeaderContentFlexLayout } from "@components/utils";

import { ActionBarViewMode } from "@components/action-bar";
import { ArtworkViewGrid, ArtworkViewList } from "@components/artwork-views";
import { useContext, useState } from "react";
import { FeaturedContentViewModes } from ".";
import { AppContext } from "./_app";

export default function Saved() {
  const { useSavedArtworks } = useContext(AppContext);

  const [savedArtworks] = useSavedArtworks;
  const [selectedViewMode, setSelectedViewMode] = useState(
    FeaturedContentViewModes.GRID
  );

  const hasSavedArtworks = Object.keys(savedArtworks).length !== 0;

  return (
    <Layout>
      <div className="h-full p-8 bg-gray-60">
        <HeaderContentFlexLayout>
          <span className="flex justify-between items-center">
            <span className="text-2xl font-bold">Saved Artworks</span>
            {hasSavedArtworks && (
              <ActionBarViewMode
                selectedViewMode={selectedViewMode}
                setSelectedViewMode={setSelectedViewMode}
                showCarousel={false}
              />
            )}
          </span>
          <div className="grow">
            {!hasSavedArtworks ? (
              <>
                Add elements to your saved collection by clicking the heart icon
                on an artwork.
              </>
            ) : (
              <>
                {selectedViewMode === FeaturedContentViewModes.GRID && (
                  <ArtworkViewGrid artworks={Object.values(savedArtworks)} />
                )}
                {selectedViewMode === FeaturedContentViewModes.LIST && (
                  <ArtworkViewList artworks={Object.values(savedArtworks)} />
                )}
              </>
            )}
          </div>
        </HeaderContentFlexLayout>
      </div>
    </Layout>
  );
}
