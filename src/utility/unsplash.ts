import axios from "./axios";

import type { PhotoType } from "../types/unsplash";

export async function fetchPhotos(page: number): Promise<PhotoType[]> {
  const { data } = await axios.get("photos", {
    params: {
      page,
    },
  });

  return data;
}

export async function fetchSearchedPhotos(
  query: string,
  page: number
): Promise<PhotoType[]> {
  const {
    data: { results },
  } = await axios.get("/search/photos", {
    params: {
      query,
      page,
    },
  });

  return results;
}
