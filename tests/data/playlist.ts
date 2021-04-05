import * as t from "io-ts";
import { Model } from "~/Model";

export const PlaylistRequired = {
  /** name of the playlist */
  name: t.string,
  /** description of the playlist */
  description: t.string,
};
export const PlaylistOptional = {
  /** artists included in the playlist */
  artists: t.array(t.string),
};

export const Playlist = Model("Playlist", PlaylistRequired, PlaylistOptional);
