import {
  ArrowsPointingOutIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
  ListBulletIcon,
  Square2StackIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { FeaturedContentViewModes } from "pages";
import { AppContext } from "pages/_app";
import { Dispatch, FunctionComponent, SetStateAction, useContext } from "react";
import { ArtworkData } from "types/types";

export type ActionBarIconButton = {
  icon: any;
  onClick: (() => void) | undefined;
};
export type ActionBarProps = {
  title: string;
  iconButtons: Array<ActionBarIconButton>;
};

export const ActionBar: FunctionComponent<ActionBarProps> = ({
  title,
  iconButtons,
}) => {
  return (
    <div className="w-fit h-[46px] flex items-center bg-gray-200 rounded-xl overflow-hidden ">
      <h3 className="font-medium text-sm p-3">{title}</h3>

      <div className="flex w-[1px] h-full py-3">
        <span className="w-full h-full bg-gray-500" />
      </div>

      <div className="h-full flex items-center gap-2 px-3">
        {iconButtons.map(({ icon, onClick }, index) => (
          <button
            key={`action-bar-${title}-${index}`}
            className="py-3 hover:scale-[1.01] hover:opacity-30 disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={onClick ?? undefined}
            disabled={!!!onClick}
          >
            {icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export type ActionBarActionsProps = {
  artwork: ArtworkData;
  onMagnifyClick: () => void;
};
export const ActionBarActions: FunctionComponent<ActionBarActionsProps> = ({
  artwork,
  onMagnifyClick,
}) => {
  const { useSavedArtworks } = useContext(AppContext);
  const [savedArtworks, setSavedArtworks] = useSavedArtworks;

  const isSaved = Object.keys(savedArtworks).includes(artwork.id.toString());

  const actionBarButtons = [
    {
      icon: (
        <ArrowsPointingOutIcon
          className={`h-4 w-4 stroke-black hover:opacity-70`}
        />
      ),
      onClick: onMagnifyClick,
    },
    {
      icon: (
        <HeartIcon
          className={
            "h-4 w-4 hover:opacity-70 " +
            (isSaved
              ? `stroke-pink-500 fill-pink-500`
              : `stroke-black fill-transparent`)
          }
        />
      ),
      onClick: () => {
        setSavedArtworks(artwork.id);
      },
    },
  ];

  return <ActionBar title="Actions" iconButtons={actionBarButtons} />;
};

export type ActionBarExhibitionProps = {
  artwork: ArtworkData;
  onMagnifyClick: () => void;
};
export const ActionBarExhibition: FunctionComponent<
  ActionBarExhibitionProps
> = ({ artwork, onMagnifyClick }) => {
  const { useSavedArtworks } = useContext(AppContext);
  const [savedArtworks, setSavedArtworks] = useSavedArtworks;

  const isSaved = Object.keys(savedArtworks).includes(artwork.id.toString());

  const actionBarButtons = [
    {
      icon: (
        <ArrowsPointingOutIcon
          className={`h-4 w-4 stroke-black hover:opacity-70`}
        />
      ),
      onClick: onMagnifyClick,
    },
    {
      icon: (
        <HeartIcon
          className={
            "h-4 w-4 hover:opacity-70 " +
            (isSaved
              ? `stroke-pink-500 fill-pink-500`
              : `stroke-black fill-transparent`)
          }
        />
      ),
      onClick: () => {
        setSavedArtworks(artwork.id);
      },
    },
  ];

  return <ActionBar title="Actions" iconButtons={actionBarButtons} />;
};

export type ActionBarNavigateProps = {
  currentId: string;
  artworkIds: string[];
};
export const ActionBarNavigate: FunctionComponent<ActionBarNavigateProps> = ({
  currentId,
  artworkIds,
}) => {
  const router = useRouter();

  const currentIndex = artworkIds.findIndex((elem) => elem === currentId);
  const hasPrevious = currentIndex !== 0;
  const hasNext = currentIndex !== artworkIds.length - 1;

  const onPrevious = () => {
    router.push(`/artwork/${artworkIds[currentIndex - 1]}`);
  };
  const onNext = () => {
    router.push(`/artwork/${artworkIds[currentIndex + 1]}`);
  };

  const actionBarButtons = [
    {
      icon: (
        <ChevronLeftIcon
          className={
            `h-5 w-5 stroke-black hover:opacity-70` +
            (!hasPrevious ? " opacity-30" : "")
          }
        />
      ),
      onClick: hasPrevious ? onPrevious : undefined,
    },
    {
      icon: (
        <ChevronRightIcon
          className={
            `h-5 w-5 stroke-black hover:opacity-70` +
            (!hasNext ? " opacity-30" : "")
          }
        />
      ),
      onClick: hasNext ? onNext : undefined,
    },
  ];

  return <ActionBar title="Navigate" iconButtons={actionBarButtons} />;
};

export type ActionBarViewModeProps = {
  selectedViewMode: FeaturedContentViewModes;
  setSelectedViewMode: Dispatch<SetStateAction<FeaturedContentViewModes>>;
};
export const ActionBarViewMode: FunctionComponent<ActionBarViewModeProps> = ({
  selectedViewMode,
  setSelectedViewMode,
}) => {
  const actionBarButtons = [
    {
      icon: (
        <Square2StackIcon
          className={`h-5 w-5 stroke-black hover:opacity-70 fill-${
            selectedViewMode === FeaturedContentViewModes.CAROUSEL
              ? "black"
              : "transparent"
          }`}
        />
      ),
      onClick: () => setSelectedViewMode(FeaturedContentViewModes.CAROUSEL),
    },
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

  return <ActionBar title="View Mode" iconButtons={actionBarButtons} />;
};

export type ActionBarSorting = {
  selectedViewMode: FeaturedContentViewModes;
  setSelectedViewMode: Dispatch<SetStateAction<FeaturedContentViewModes>>;
};
export const ActionBarSorting: FunctionComponent<ActionBarViewModeProps> = ({
  selectedViewMode,
  setSelectedViewMode,
}) => {
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

  return <ActionBar title="View Mode" iconButtons={actionBarButtons} />;
};
