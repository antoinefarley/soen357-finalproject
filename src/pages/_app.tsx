import type { AppProps } from "next/app";
import Head from "next/head";
import { createContext } from "react";
import useSWR from "swr";
import { ArtworksRecord } from "types/types";
import { useLocalStorage } from "usehooks-ts";

import "../styles/globals.css";

export type AppContext = {
  artworks: ArtworksRecord;
  useSavedArtworks: [ArtworksRecord, (id: number) => void];
};
export const AppContext = createContext({} as AppContext);

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function App({ Component, pageProps }: AppProps) {
  const { data, error } = useSWR("/api/staticdata", fetcher);
  const artworks = data ?? {};

  const [savedArtworks, setSavedArtworks] = useLocalStorage<ArtworksRecord>(
    "savedArtworks",
    {}
  );

  const updateSavedArtworks = (id: number) => {
    if (artworks) {
      const savedArtworksCopy = { ...savedArtworks };

      if (savedArtworksCopy.hasOwnProperty(id)) {
        delete savedArtworksCopy[id];
      } else {
        savedArtworksCopy[id] = artworks[id];
      }

      setSavedArtworks(savedArtworksCopy);
    }
  };

  return (
    <AppContext.Provider
      value={{
        artworks,
        useSavedArtworks: [savedArtworks, updateSavedArtworks],
      }}
    >
      <Head>
        <title>DMOA - Digital Museum of Arts</title>
        <meta name="description" content="DMOA - Digital Museum of Arts" />
        <link rel="icon" href="images/favicon.ico" />
      </Head>
      <Component {...pageProps} />;
    </AppContext.Provider>
  );
}
