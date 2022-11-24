import { FunctionComponent } from "react";
import { Artwork, ArtworkVariant } from "./artwork";

export const ArtworkViewGrid: FunctionComponent<{ artworks: Artwork[] }> = ({
  artworks,
}) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
      {artworks.map((elem) => (
        <Artwork key={elem.title} artwork={elem} />
      ))}
    </div>
  );
};

export const ArtworkViewList: FunctionComponent<{ artworks: Artwork[] }> = ({
  artworks,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {artworks.map((elem) => (
        <Artwork
          key={elem.title}
          artwork={elem}
          variant={ArtworkVariant.LIST_ELEM}
        />
      ))}
    </div>
  );
};
