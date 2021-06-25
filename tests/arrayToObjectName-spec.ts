import * as t from "io-ts";
import { Equal, Expect, ExpectExtends, NotEqual } from "@type-challenges/utils";
import { SimpleTable } from "./data";
import { IoModel, IModel, arrayToObjectName } from "~/utility";

const SongMeta = t.partial({ year: t.number, genre: t.string });
const Song = IoModel(
  "Song",
  { name: t.string, artist: t.string },
  { album: t.string, meta: SongMeta }
);
type SongType = t.TypeOf<typeof Song>;
const goodSong: SongType = { name: "Highway to Hell", artist: "AC/DC" };
const Playlist = IoModel("Playlist", { name: t.string, owner: t.string });
// type PlaylistType = t.TypeOf<typeof Playlist>;

describe("arrayToObjectName => ", () => {

  it("array of relatively simple name/value objects with different types for 'value'", () => {
    const foo = { name: "foo", value: 123 } as const;
    const bar = { name: "bar", value: "bar" } as const;
    const baz = { name: "baz", value: new Date() } as const;

    const arr = [foo, bar, baz];
    const result = arrayToObjectName(arr);

    expect(typeof result).toBe("object");

    expect(typeof result.foo).toBe("object");
    expect(typeof result.foo.value).toBe("number");
    expect(result.foo.value.toFixed(2)).toBe(foo.value.toFixed(2));

    expect(typeof result.bar).toBe("object");
    expect(typeof result.bar.value).toBe("string");
    expect(result.bar.name).toBe("bar");
    expect(result.bar.value.toUpperCase()).toBe(bar.value.toUpperCase());
  });

  it("arr", () => {
    const foo = { name: "foo", age: 12, color: "red" } as const;
    const bar = { name: "bar", age: 46, color: "blue" } as const;
    const baz = { name: "baz", age: 52, color: "green" } as const;

    const arr = [foo, bar, baz];
    const result = arrayToObjectName(arr);
    type Result = typeof result;

    expect(typeof result).toBe("object");

    expect(typeof result.foo).toBe("object");
    expect(typeof result.foo.color).toBe("string");
    expect(result.foo.age).toBe(foo.age);

    expect(typeof result.bar).toBe("object");
    expect(typeof result.bar.color).toBe("string");
    expect(result.bar.name).toBe(bar.name);
    expect(result.bar.age).toBe(bar.age);

    type cases = [
      Expect<Equal<keyof Result, "foo" | "bar" | "baz">>,
      Expect<Equal<Result["foo"], typeof foo>>
    ];

    const cases: cases = [true, true];
  });


  it("array of Model's converted to dictionary without loss of type fidelity", () => {
    const arr = [Song, Playlist];
    const dict = arrayToObjectName(arr);
    type Dict = typeof dict;

    type cases = [
      // dictionary is recognized as an object
      Expect<ExpectExtends<object, Dict>>,
      // both Song and Playlist are properties on the object of type IModel
      Expect<ExpectExtends<IModel<any, any>, Dict["Song"]>>,
      Expect<ExpectExtends<IModel<any, any>, Dict["Playlist"]>>,
      // the "name" property of each model is retained as a literal type
      Expect<Equal<Dict["Song"]["name"], "Song">>,
      Expect<NotEqual<Dict["Song"]["name"], "string">>,
      Expect<Equal<Dict["Playlist"]["name"], "Playlist">>,
      Expect<NotEqual<Dict["Song"]["name"], "string">>
    ];
    const cases: cases = [true, true, true, true, true, true, true];
    expect(cases).toBe(cases);

    if (dict.Song.is(goodSong)) {
      type GoodSong = typeof goodSong;
      // @ts-ignore
      type cases = [Expect<Equal<SongType, GoodSong>>];
    }
  });

  it("array of SimpleTable objects -- which have literal types for name -- retain not only io-ts type info but also table structure", () => {
    const SongTable = SimpleTable(Song);
    const PlaylistTable = SimpleTable(Playlist);
    const arr = [SongTable, PlaylistTable];
    const dict = arrayToObjectName(arr);
    type Dict = typeof dict;

    expect(dict.Song.name).toBe("Song");
    // type guards of the given type are preserved
    // but this is less a test of the type system than
    // we'd ideally like as `io-ts` stores typing info
    // at run-time
    expect(dict.Song.is(goodSong)).toBe(true);
    expect(dict.Song.is({ id: "not-a-song" })).toBe(false);

    // @ts-ignore
    type cases = [
      // dictionary is recognized as an object
      Expect<ExpectExtends<object, Dict>>,
      // the "name" property should be extended from a string, but ...
      Expect<ExpectExtends<string, Dict["Song"]["name"]>>,
      Expect<ExpectExtends<string, Dict["Playlist"]["name"]>>,
      // needs to be a literal type so that typing resolution is preserved
      // this starts with the underlying model having a literal type:
      Expect<Equal<typeof Song["name"], "Song">>,
      // and with this established we need to be sure it still exists
      // as a literal type when passed through the SimpleTable function
      Expect<Equal<typeof SongTable["name"], "Song">>,
      // with that test passed, the final test is that after having been
      // put into an array and then converted to a dictionary, this literal
      // type is preserved
      Expect<Equal<Dict["Song"]["name"], "Song">>,
      Expect<Equal<Dict["Playlist"]["name"], "Playlist">>
    ];

    // type inference fails to provide non-io-ts properties
    expect(dict.Song.select("*")).toBe("You did it");
  });


});
