import { FluentConfigurator } from "../src";
import { mySong, Playlist, Song } from "./data/index";
import { SimpleTable } from "./data/SimpleTable";

describe("Configurator => ", () => {
  it("Call to configurator returns API", () => {
    const c = FluentConfigurator();
    expect(typeof c.done).toBe("function");
    expect(typeof c.done()).toBe("object");
    expect(Object.keys(c.done())).toHaveLength(0);
  });

  it("Configurator with empty initial state, can have props added using set() and fluent API style", () => {
    const c = FluentConfigurator().set("a", 5).set("b", "foobar").done();
    expect(c).toHaveProperty("a");
    expect(typeof c.a).toBe("number");
    expect(c).toHaveProperty("b");
    expect(typeof c.b).toBe("string");
  });

  it("Configurator with starting state, can have props added using fluent API style", () => {
    const start = { foo: "bar", bar: "baz" };
    const c = FluentConfigurator(start).set("b", "foobar").set("a", 5).done();

    // added state
    expect(c).toHaveProperty("a", 5);
    expect(typeof c.a).toBe("number");
    expect(c).toHaveProperty("b", "foobar");
    expect(typeof c.b).toBe("string");

    // starting state
    expect(c).toHaveProperty("foo");
    // TODO: need to ensure initial state is available to type system
    // expect(typeof c.foo).toBe("string");
    // expect(c.foo).toBe(start.foo);
    expect(c).toHaveProperty("bar");
    // expect(typeof c.bar).toBe("string");
    // expect(c.bar).toBe(start.bar);
  });

  it("Configurator stores Table objects and keeps the typing", () => {
    const c = FluentConfigurator()
      .set("songs", SimpleTable(Song))
      .set("playlists", SimpleTable(Playlist))
      .done();
    // structure
    expect(c).toHaveProperty("songs");
    expect(c.songs).toHaveProperty("is");
    expect(c.songs).toHaveProperty("select");
    expect(c).toHaveProperty("playlists");
    expect(c.playlists).toHaveProperty("is");
    expect(c.playlists).toHaveProperty("select");
    // type guards
    expect(c.songs.is(mySong)).toBe(true);
    expect(c.songs.is({ foo: false })).toBe(false);
  });

  it("set() function is able to set a simple value and have type retained", () => {
    const c = FluentConfigurator()
      .set("songs", SimpleTable(Song))
      .set("playlists", SimpleTable(Playlist))
      .set("foo", 15)
      .set("bar", 1);
    const t = c.done();
    expect(t.songs.is(mySong)).toBe(true);
    expect(t.songs.is({ foo: false })).toBe(false);
    expect(typeof t.songs).toBe("object");
    expect(typeof t.playlists).toBe("object");
    expect(typeof t.foo).toBe("number");
    expect(typeof t.bar).toBe("number");
  });

  it("a partially typed configurator can be configured with set()", () => {
    const c = FluentConfigurator<{ songs: object; playlists: object }>()
      .set("songs", SimpleTable(Song))
      .set("playlists", SimpleTable(Playlist))
      .set("foobar", true)
      .done();

    expect(c.songs.name).toBe("Song");
    expect(c.playlists.name).toBe("Playlist");
    expect(c.foobar).toBe(true);
  });
});
