import { promises as fs } from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { ArtworkData, ArtworksRecord } from "types/types";

export const getArtworks = (files: string[]): ArtworksRecord => {
  const record: ArtworksRecord = {};

  files.slice(0, 100).forEach((content: string, index: number) => {
    try {
      const json: ArtworkData = JSON.parse(content);
      if (json.image_id) {
        record[json.id] = json;
      }
    } catch (e) {
      console.warn(`Couldn't parse file at index ${index}`);
    }
  });
  return record;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ArtworksRecord>
) {
  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), "json");

  //Read the json data file data.json
  const fileNames = await fs.readdir(jsonDirectory);

  const files = await Promise.all(
    fileNames.map((name: string) =>
      fs.readFile(jsonDirectory + `/${name}`, "utf8")
    )
  );

  const artworks = getArtworks(files);

  //Return the content of the data file in json format
  res.status(200).json(artworks);
}
