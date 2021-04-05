import * as t from "io-ts";

export const PlaylistRequired = t.type({
  /** name of the playlist */
  name: t.string,
  /** description of the playlist */
  description: t.string,
});
export const PlaylistOptional = t.partial({
  /** artists included in the playlist */
  artists: t.array(t.string),
});

export const Playlist = t.intersection([PlaylistRequired, PlaylistOptional], "Playlist");
