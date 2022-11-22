import axios from "axios";

export default axios.create({
  baseURL: "https://api.unsplash.com/",
  headers: {
    "Accept-Version": "v1",
    Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
  },
});

/**
 * Potential confusion point(s):
 * - "Accept-Version" header is recommended via:
 *   - https://unsplash.com/documentation#version
 */
