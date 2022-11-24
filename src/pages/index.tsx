import { Layout } from "../components/layout";
import { HeaderContentFlexLayout } from "../components/utils";

import { useState } from "react";
import { ActionBarViewMode } from "../components/action-bar";
import { ArtworkViewGrid, ArtworkViewList } from "../components/artwork-views";
import { artworks } from "../data/artworks/artworks";

export enum FeaturedContentViewModes {
  GRID,
  LIST,
}

export default function Home() {
  const [selectedViewMode, setSelectedViewMode] = useState(
    FeaturedContentViewModes.GRID
  );

  return (
    <Layout>
      <div className="h-full p-8 pb-0 bg-gray-60">
        <HeaderContentFlexLayout>
          <span className="flex justify-between items-center">
            <span className="pl-2 text-2xl font-bold">Featured Content</span>
            <ActionBarViewMode
              selectedViewMode={selectedViewMode}
              setSelectedViewMode={setSelectedViewMode}
            />
          </span>
          <div className="grow pb-8">
            {selectedViewMode === FeaturedContentViewModes.GRID && (
              <ArtworkViewGrid artworks={artworks} />
            )}
            {selectedViewMode === FeaturedContentViewModes.LIST && (
              <ArtworkViewList artworks={artworks} />
            )}
          </div>
        </HeaderContentFlexLayout>
      </div>
    </Layout>
  );
}
