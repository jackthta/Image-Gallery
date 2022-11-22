// Note: cherry-picked specific properties I think would be needed
export type PhotoType = {
  id: string;
  description: string;
  blur_hash: string;
  width: number;
  height: number;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
};
