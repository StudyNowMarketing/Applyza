import londonAsset from "../../public/videos/london-gen.mp4.asset.json";
import newyorkAsset from "../../public/videos/newyork.mp4.asset.json";
import berlinAsset from "../../public/videos/berlin.mp4.asset.json";
import parisAsset from "../../public/videos/paris.mp4.asset.json";
import dublinAsset from "../../public/videos/dublin.mp4.asset.json";

export type DestinationVideo = {
  slug: string;
  video: string;
  image: string;
};

export const destinationVideos: DestinationVideo[] = [
  {
    slug: "united-kingdom",
    video: londonAsset.url,
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",
  },
  {
    slug: "usa",
    video: newyorkAsset.url,
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80",
  },
  {
    slug: "canada",
    video: "/videos/toronto.mp4",
    image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&q=80",
  },
  {
    slug: "germany",
    video: berlinAsset.url,
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80",
  },
  {
    slug: "france",
    video: parisAsset.url,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
  },
  {
    slug: "ireland",
    video: dublinAsset.url,
    image: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?w=800&q=80",
  },
];

export function getVideoForSlug(slug: string): DestinationVideo | undefined {
  return destinationVideos.find((d) => d.slug === slug);
}
