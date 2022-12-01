// Note: cherry-picked specific properties thought would be needed
export type PhotoType = {
  id: string;
  description: string;
  created_at: string;
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
  user: {
    username: string;
    name: string;
    instagram_username: string;
    twitter_username: string;
    links: {
      html: string;
    };
    profile_image: {
      small: string;
      medium: string;
      large: string;
    };
  };
};
