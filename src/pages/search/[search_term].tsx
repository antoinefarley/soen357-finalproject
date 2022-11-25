import { ListBulletIcon, Squares2X2Icon } from "@heroicons/react/24/solid";

import { useRouter } from "next/router";
import { AppContext } from "pages/_app";
import { useContext, useState } from "react";
import { ArtworkData, ArtworksRecord } from "types/types";
import { FeaturedContentViewModes } from "..";
import { ActionBarViewMode } from "../../components/action-bar";
import {
  ArtworkViewGrid,
  ArtworkViewList,
} from "../../components/artwork-views";
import { Layout } from "../../components/layout";
import { HeaderContentFlexLayout } from "../../components/utils";

const getArtworksFromSearch = (
  artworks: ArtworksRecord,
  searchTerm: string
): ArtworkData[] =>
  Object.values(artworks).filter((elem) =>
    elem.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

const ArtworkPage = () => {
  const { artworks } = useContext(AppContext);
  const [selectedViewMode, setSelectedViewMode] = useState(
    FeaturedContentViewModes.GRID
  );

  const router = useRouter();
  const { search_term } = router.query;
  const searchTerm =
    search_term !== undefined
      ? typeof search_term === "string"
        ? search_term
        : search_term.join(" ")
      : "";

  const filteredArtworks = getArtworksFromSearch(artworks, searchTerm);

  const actionBarButtons = [
    {
      icon: (
        <Squares2X2Icon
          className={`h-5 w-5 stroke-black hover:opacity-70 fill-${
            selectedViewMode === FeaturedContentViewModes.GRID
              ? "black"
              : "transparent"
          }`}
        />
      ),
      onClick: () => setSelectedViewMode(FeaturedContentViewModes.GRID),
    },
    {
      icon: (
        <ListBulletIcon
          className={`h-6 w-6 stroke-black hover:opacity-70 fill-${
            selectedViewMode === FeaturedContentViewModes.LIST
              ? "black"
              : "transparent"
          }`}
        />
      ),
      onClick: () => setSelectedViewMode(FeaturedContentViewModes.LIST),
    },
  ];

  return (
    <Layout>
      <div className="h-full p-8 space-y-4">
        {filteredArtworks.length > 0 ? (
          <HeaderContentFlexLayout>
            <span className="flex justify-between items-center">
              <span className="text-2xl font-bold">Search Results</span>
              <ActionBarViewMode
                selectedViewMode={selectedViewMode}
                setSelectedViewMode={setSelectedViewMode}
                showCarousel={false}
              />
            </span>
            <div className="grow">
              {Object.keys(artworks).length === 0 ? (
                <>&quot;{search_term}&quot; did not return any result.</>
              ) : (
                <>
                  {selectedViewMode === FeaturedContentViewModes.GRID && (
                    <ArtworkViewGrid artworks={filteredArtworks} />
                  )}
                  {selectedViewMode === FeaturedContentViewModes.LIST && (
                    <ArtworkViewList artworks={filteredArtworks} />
                  )}
                </>
              )}
            </div>
          </HeaderContentFlexLayout>
        ) : (
          <>Artwork not found...</>
        )}
      </div>
    </Layout>
  );
};

export default ArtworkPage;
