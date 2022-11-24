import { ListBulletIcon, Squares2X2Icon } from "@heroicons/react/24/solid";

import { useRouter } from "next/router";
import { useState } from "react";
import { FeaturedContentViewModes } from "..";
import { ActionBar } from "../../components/action-bar";
import { Artwork } from "../../components/artwork";
import {
  ArtworkViewGrid,
  ArtworkViewList,
} from "../../components/artwork-views";
import { Layout } from "../../components/layout";
import { HeaderContentFlexLayout } from "../../components/utils";
import { artworks } from "../../data/artworks/artworks";

const getArtworksFromSearch = (searchTerm: string) =>
  artworks.filter((elem) =>
    elem.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

const ArtworkPage = () => {
  const [selectedViewMode, setSelectedViewMode] = useState(
    FeaturedContentViewModes.GRID
  );

  const router = useRouter();
  const { search_term } = router.query;

  const filteredArtworks = getArtworksFromSearch(
    search_term !== undefined
      ? typeof search_term === "string"
        ? search_term
        : search_term.join(" ")
      : ""
  ) as Artwork[];

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
        {filteredArtworks ? (
          <HeaderContentFlexLayout>
            <span className="flex justify-between items-center">
              <span className="pl-2 text-2xl font-bold">Search Results</span>
              <ActionBar title="Actions" iconButtons={actionBarButtons} />
            </span>
            <div className="grow">
              {filteredArtworks.length == 0 ? (
                <>"{search_term}" did not return any result.</>
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
          "Artwork not found..."
        )}
      </div>
    </Layout>
  );
};

export default ArtworkPage;
