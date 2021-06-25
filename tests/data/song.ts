import * as t from "io-ts";
import { IoModel } from "~/utility";

export const SongMeta = t.partial({ year: t.number, genre: t.string });
export const Song_RequiredProps = {
  song: t.string,
  artist: t.string,
};
export const Song_OptionalProps = {
  /** the album which the song is featured in */
  album: t.string,
  /** the four digit year -- YYYY -- the song was released */
  meta: SongMeta,
};

export const Song = IoModel("Song", Song_RequiredProps, Song_OptionalProps);
export type ISong = t.TypeOf<typeof Song>;
export const mySong: ISong = {
  artist: "Billy Idol",
  song: "Whiplash Smile",
};

export const Songs = t.array(Song);
