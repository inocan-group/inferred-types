import { Configurator, IConfigurator } from "../src/Configurator";
import { mySong, Playlist, SimpleTable, Song } from "./data";

describe("Configurator => ", () => {
  it("adding basic types to config works", () => {
    const c: IConfigurator = Configurator();
    c.set("foo", 5);
    c.set("bar", 10);
    c.set("baz", "no sir, didn't like it");

    const t = c.done();

    expect(t).toHaveProperty("foo", 5);
    expect(t).toHaveProperty("bar", 10);
    expect(t).toHaveProperty("baz", "no sir, didn't like it");
  });

  it("Fluent API is not exposed; set returns name/value pair instead", () => {
    const c: IConfigurator = Configurator();
    const v1 = c.set("foo", 5);

    expect(v1).not.toHaveProperty("set");
    expect(v1).not.toHaveProperty("done");
    expect(v1).toStrictEqual({ foo: 5 });
  });

  it("set() function is able to set a simple value and have type retained", () => {
    const c: IConfigurator = Configurator();
    c.set("songs", SimpleTable(Song));
    c.set("playlists", SimpleTable(Playlist));
    c.set("foo", 15);
    c.set("bar", 1);
    const t = c.done();
    expect(t.songs.is(mySong)).toBe(true);
    expect(t.songs.is({ foo: false })).toBe(false);
    expect(typeof t.songs).toBe("object");
    expect(typeof t.playlists).toBe("object");
    expect(typeof t.foo).toBe("number");
    expect(typeof t.bar).toBe("number");
  });

  it("initializing with an interface ensures base types", () => {
    type ITest = { foo: number; bar: string };
    const c: IConfigurator<ITest> = Configurator<ITest>();
    c.set("foo", 55);
    const config = c.done();
    expect(config).toHaveProperty("foo", 55);
    expect(config).not.toHaveProperty("bar");
    expect(config.bar).toBe(undefined);
  });

  it("initializing with an interface works with more complex types", () => {
    type ITest = Record<string, any> & { bar: number };
    const c: IConfigurator<ITest> = Configurator<ITest>();
    c.set("foo", 55);
    c.set("songs", SimpleTable(Song));
    const config = c.done();
    expect(config.foo).toBe(55);
    expect(config).not.toHaveProperty("bar");
    expect(config.songs).toHaveProperty("is");
    expect(config.songs.select("artist")).toBe("You did it");
  });

  it("Passing the configurator object to another function preserves typing", () => {
    const receiver = <T extends Record<string, any>>(obj: T) => {
      expect(obj).toHaveProperty("songs");
      expect(obj.songs).toHaveProperty("is");
      if (obj.songs.is(mySong)) {
        expect(mySong.artist).toBe("Billy Idol");
      }
      expect(obj.songs.select(""));
    };

    const c: IConfigurator = Configurator();
    c.set("songs", SimpleTable(Song));
    const config = c.done();

    receiver(config);
  });
});
