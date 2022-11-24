import type { AppProps } from "next/app";
import Head from "next/head";
import { createContext } from "react";
import { useLocalStorage } from "usehooks-ts";

import "../styles/globals.css";

export type AppContext = {
  useSavedArtworks: [number[], (id: number) => void];
};
export const AppContext = createContext({} as AppContext);

export default function App({ Component, pageProps }: AppProps) {
  const [savedArtworks, setSavedArtworks] = useLocalStorage<number[]>(
    "savedArtworks",
    []
  );
  const updateSavedArtworks = (id: number) => {
    const savedArtworksCopy = [...savedArtworks];
    if (savedArtworks.includes(id)) {
      setSavedArtworks(savedArtworks.filter((elem) => elem != id));
    } else {
      savedArtworksCopy.push(id);
      setSavedArtworks(savedArtworksCopy);
    }
  };

  return (
    <AppContext.Provider
      value={{ useSavedArtworks: [savedArtworks, updateSavedArtworks] }}
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
