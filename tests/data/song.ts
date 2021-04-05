import * as t from "io-ts";

export const SongMeta = t.partial({ year: t.number, genre: t.string });
export const Song_RequiredProps = t.type({
  song: t.string,
  artist: t.string,
});
export const Song_OptionalProps = t.partial({
  /** the album which the song is featured in */
  album: t.string,
  /** the four digit year -- YYYY -- the song was released */
  meta: SongMeta,
});

export const Foo = t.type({ id: t.string, name: t.string }, "Foo");
export const Song = t.intersection([Song_RequiredProps, Song_OptionalProps], "Song");
export type ISong = t.TypeOf<typeof Song>;
export const mySong: ISong = {
  artist: "Billy Idol",
  song: "Whiplash Smile",
};

export const Songs = t.array(Song);
export const MixedSong: t.Mixed = Song;
