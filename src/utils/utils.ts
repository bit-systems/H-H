import { APP_CONFIG } from "./constants";

export const getCloudfrontUrl = (path: string) => {
  return `${APP_CONFIG.CLOUDFRONT_URL}${path}`;
};
