import { IModel, Model } from "../src/Model";
import * as t from "io-ts";
import { isLeft, isRight } from "fp-ts/Either";
import {
  Equal,
  NotEqual,
  Expect,
  ExpectExtends,
  ExpectFalse,
  ExpectTrue,
} from "@type-challenges/utils";

export const mySong = {
  artist: "Billy Idol",
  song: "Whiplash Smile",
};

const SongMeta = t.partial({ year: t.number, genre: t.string });
const req = { name: t.string, artist: t.string };
const optional = { album: t.string, meta: SongMeta };

const Song = Model("Song", req, optional);
type SongType = t.TypeOf<typeof Song>;
const goodSong = { name: "My Song", artist: "Elton John" };
const badSong = { name: "Tom Fuckery" };

const playReq = { name: t.string, owner: t.string };
/** note that `Playlist` only has required props */
const Playlist = Model("Playlist", playReq);
type PlaylistType = t.TypeOf<typeof Playlist>;
const goodPlaylist = { name: "a jumble of songs", owner: "Kris Kross" };
const extraPlaylist = { name: "if only", owner: "fake dude", badProp: true };
const badPlaylist = { name: "if only", owner: 42 };

describe("Model configurator => ", () => {
  it("Model function returns a model which can be converted to a type with t.TypeOf", () => {
    // manual creation of a model
    const model = t.intersection([t.type(req), t.partial(optional)], "Song");
    type M = t.TypeOf<typeof model>;
    type cases = [
      Expect<Equal<SongType["name"], M["name"]>>,
      Expect<Equal<SongType["album"], M["album"]>>,
      Expect<Equal<SongType["artist"], M["artist"]>>
    ];
    const typeTests: cases = [true, true, true];
    expect(typeTests).toBe(typeTests);
  });

  it("Model's name is a literal type, not a string", () => {
    type cases = [
      Expect<NotEqual<typeof Song["name"], "string">>,
      Expect<Equal<typeof Song["name"], "Song">>,
      Expect<NotEqual<typeof Playlist["name"], "string">>,
      Expect<Equal<typeof Playlist["name"], "Playlist">>
    ];
    const typeTests: cases = [true, true, true, true];
    expect(typeTests).toBe(typeTests);
  });

  it("Model function returns a model who's type guard works as expected", () => {
    expect(Song.is(goodSong)).toBe(true);
    expect(Song.is(badSong)).toBe(false);
    expect(Playlist.is(goodPlaylist)).toBe(true);
    expect(Playlist.is(badPlaylist)).toBe(false);
  });

  it("extra model properties pass the type guard but extra prop is not part of type", () => {
    expect(Playlist.is(extraPlaylist)).toBe(true);
    if (Playlist.is(extraPlaylist)) {
      type E = typeof extraPlaylist;
      type cases = [
        Expect<ExpectExtends<keyof E, keyof PlaylistType>>,
        Expect<NotEqual<E, PlaylistType>>,
        Expect<Equal<keyof E, "name" | "owner" | "badProp">>,
        Expect<NotEqual<keyof PlaylistType, "name" | "owner" | "badProp">>,
        Expect<Equal<keyof PlaylistType, "name" | "owner">>
      ];
      const typeTests: cases = [true, true, true, true, true];
      expect(typeTests).toBe(typeTests);
    } else {
      throw new Error("extra params in object should still pass the type guard!");
    }
  });

  it("Model function returns a decoder which works as expected", () => {
    // basics
    expect(Song.decode(goodSong)._tag).toBe("Right");
    expect(Song.decode(badSong)._tag).toBe("Left");
    expect(Playlist.decode(goodPlaylist)._tag).toBe("Right");
    expect(Playlist.decode(extraPlaylist)._tag).toBe("Right");
    expect(Playlist.decode(badPlaylist)._tag).toBe("Left");

    // addressing extra properties
    const extra = Playlist.decode(extraPlaylist);
    if (isRight(extra)) {
      // model props represented and correct
      expect(extra.right.name).toBe(extraPlaylist.name);
      expect(extra.right.owner).toBe(extraPlaylist.owner);
      // extra props are still there at run time
      expect(Object.keys(extra.right)).toContain("badProp");
      // but they are not available to the type system
      type cases = [ExpectFalse<ExpectExtends<keyof typeof extra, "badProp">>];
      const typeTests: cases = [false];
      expect(typeTests).toBe(typeTests);
    } else {
      throw new Error("decoder asserted a playlist with extra props as being invalid!");
    }

    const invalid = Playlist.decode(badPlaylist);
    if (isLeft(invalid)) {
      type cases = [Expect<ExpectExtends<typeof invalid["left"], t.Errors>>];
      const typeTests: cases = [true];
      expect(typeTests).toBe(typeTests);
    } else {
      throw new Error("decoder asserted a invalid playlist was valid!");
    }

    const valid = Playlist.decode(goodPlaylist);
    if (isRight(valid)) {
      type cases = [Expect<ExpectExtends<typeof valid["right"], PlaylistType>>];
      const typeTests: cases = [true];
      expect(typeTests).toBe(typeTests);
    } else {
      throw new Error("decoder asserted an valid playlist was invalid!");
    }
  });

  it("if model is given non PascalCase name it will be converted to PascalCase", () => {
    const simple = Model("simple", { name: t.string });
    const camel = Model("camelCase", { name: t.string });
    const snake = Model("snake_case", { name: t.string });
    const dash = Model("dash-case", { name: t.string });

    expect(simple.name).toBe("Simple");
    expect(camel.name).toBe("CamelCase");
    expect(snake.name).toBe("SnakeCase");
    expect(dash.name).toBe("DashCase");

    type cases = [
      ExpectTrue<Equal<typeof simple["name"], "Simple">>,
      ExpectTrue<Equal<typeof camel["name"], "CamelCase">>,
      ExpectTrue<Equal<typeof snake["name"], "SnakeCase">>,
      ExpectTrue<Equal<typeof dash["name"], "DashCase">>
    ];
    const typeTests: cases = [true, true, true, true];
    expect(typeTests).toBe(typeTests);
  });

  it("Models put into an array can be retrieved in full fidelity", () => {
    const arr = [Song, Playlist];

    // this will resolve to a union of Song and Playlist model structures
    type Union = SongType | PlaylistType;

    arr.forEach((m) => {
      // run-time has a string for name
      expect(typeof m.name).toBe("string");

      // I naive assumption would be that this would be a distinctly typed
      // type structure for the underlying model but each element of the array
      // is -- in fact -- still just a union of SongType and PlaylistType
      type NaiveUnion = t.TypeOf<typeof m>;

      // @ts-ignore
      type cases = [
        // type system extends from "string"
        Expect<ExpectExtends<string, typeof m.name>>,
        // but is a string literal (aka, narrower than a string in definition)
        Expect<NotEqual<typeof m.name, string>>,
        // the overall data structure extends from IModel
        Expect<ExpectExtends<IModel<any, any>, typeof m>>,
        // adding in the literal name should cause no harm
        Expect<ExpectExtends<IModel<any, typeof m.name>, typeof m>>,
        // unfortunately, since we still don't know which of the models
        // we're dealing with, we can't test the fidelity of the underlying
        // model's TS typing
        Expect<Equal<NaiveUnion, Union>>
      ];

      // Because the `name` property is a literal type (versus just a string),
      // however, the Union types we've been dealing with are still _distinct_
      // for each model is not lost. This allows us to use a simple conditional
      // logic and get full type fidelity
      if (m.name === "Song") {
        type SpecificModel = t.TypeOf<typeof m>;

        // @ts-ignore
        type cases = [
          // the specific model will extend the union
          Expect<ExpectExtends<Union, SpecificModel>>,
          // but is no longer equal as it's type has been narrowed by inference
          Expect<NotEqual<SpecificModel, Union>>
        ];
      }

      if (m.name === "Playlist") {
        type SpecificModel = t.TypeOf<typeof m>;

        // @ts-ignore
        type cases = [
          // the specific model will extend the union
          Expect<ExpectExtends<Union, SpecificModel>>,
          // but is no longer equal as it's type has been narrowed by inference
          Expect<NotEqual<SpecificModel, Union>>
        ];
      }
    });
  });
});
