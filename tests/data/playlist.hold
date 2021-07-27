import * as t from "io-ts";
import * as D from "io-ts/Decoder";
import { IoModel } from "~/utility";

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

export const PlaylistIoTs = t.intersection([t.type(PlaylistRequired), t.partial(PlaylistOptional)]);
export type IPlaylistIoTs = t.TypeOf<typeof PlaylistIoTs>;

export const Playlist = IoModel("Playlist", PlaylistRequired, PlaylistOptional);

export const Person = D.struct({
  /** a person's name */
  name: D.string,
  age: D.number,
});
