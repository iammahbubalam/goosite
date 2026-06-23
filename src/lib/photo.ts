import photos from "./photos.generated.json";

export type PhotoMeta = {
  src: string;
  alt: string;
  width: number;
  height: number;
  lqip: string;
};

const map = photos as Record<string, PhotoMeta>;

/** Returns generated photo metadata for a slot id, or undefined if not yet generated. */
export function getPhoto(id: string): PhotoMeta | undefined {
  return map[id];
}
