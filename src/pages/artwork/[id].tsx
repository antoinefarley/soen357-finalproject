import { XMarkIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { AppContext } from "pages/_app";
import { useContext } from "react";
import { useBoolean } from "usehooks-ts";
import {
  ActionBarActions,
  ActionBarNavigate,
} from "../../components/action-bar";
import {
  Artwork,
  ArtworkVariant,
  getArtworkImage,
} from "../../components/artwork";
import { Layout } from "../../components/layout";
import { HeaderContentFlexLayout } from "../../components/utils";

const ArtworkPage = () => {
  const router = useRouter();
  const { artworks } = useContext(AppContext);

  const { id } = router.query;
  const { value: showFullScreen, toggle: toggleFullScreen } = useBoolean();

  const computedId = typeof id === "string" ? Number.parseInt(id) : null;
  const artwork = computedId ? artworks[computedId] : null;

  const actionBarNavigateArtworksIds = Object.keys(artworks);

  return (
    <Layout>
      <div className="h-full p-8 space-y-4 max-w-screen-xl mx-auto">
        {artwork ? (
          <HeaderContentFlexLayout>
            <span className="flex justify-between items-center gap-6">
              <span className="text-2xl font-bold">{artwork.title}</span>
              <span className="flex gap-2">
                <ActionBarNavigate
                  currentId={artwork.id.toString()}
                  artworkIds={actionBarNavigateArtworksIds}
                />
                <ActionBarActions
                  artwork={artwork}
                  onMagnifyClick={toggleFullScreen}
                />
              </span>
            </span>
            <Artwork artwork={artwork} variant={ArtworkVariant.INFO_FLEX} />
          </HeaderContentFlexLayout>
        ) : (
          "Artwork not found..."
        )}
      </div>
      {showFullScreen && artwork && (
        <div className="w-full h-full flex justify-center items-center fixed top-0 left-0 bg-gray-100/95">
          <img
            className="h-full object-contain pointer-event-none"
            src={getArtworkImage(artwork)}
            alt={`artwork-image-${artwork.title}`}
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
};

export default ArtworkPage;
