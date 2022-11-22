import axios from "./axios";

import type { Photo } from "../types/unsplash";

export async function fetchPhotos(): Promise<Photo[]> {
  const { data } = await axios.get("photos");
  
  return data;
}
