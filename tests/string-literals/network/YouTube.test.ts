import { describe, expect, it } from "vitest";
import { Expect, GetYouTubePageType, Test } from "inferred-types/types";
import { getYouTubePageType, isYouTubeFeedUrl, youtubeMeta } from "inferred-types/runtime";



describe("YouTube utilities", () => {

  it("GetYouTubePageType<T>", () => {
    type Home = GetYouTubePageType<"https://www.youtube.com">;
    type Home2 = GetYouTubePageType<"https://www.youtube.com?v=adfa&m=erwer">;

    type Playlists = GetYouTubePageType<"https://www.youtube.com/feed/playlists">;
    type History = GetYouTubePageType<"https://www.youtube.com/feed/history">;

    type Featured = GetYouTubePageType<"https://www.youtube.com/@yankee-in-london/featured">;
    type Featured2 = GetYouTubePageType<"https://www.youtube.com/@DarkoAudio">;
    type Videos = GetYouTubePageType<"https://www.youtube.com/@DarkoAudio/videos">;
    type CreatorPlaylists = GetYouTubePageType<"https://www.youtube.com/@DarkoAudio/playlists">;

    type WatchVideo = GetYouTubePageType<`https://www.youtube.com/watch?v=M6hHvI6IinM`>;
    type WatchVideoWithShareLink = GetYouTubePageType<`https://youtu.be/M6hHvI6IinM`>;
    type ShareLinkWithTimestamp = GetYouTubePageType<`https://youtu.be/M6hHvI6IinM?si=aVRJ2-cIevM-jXZh&t=22`>;

    type ShowVideosInPlaylist = GetYouTubePageType<`https://www.youtube.com/playlist?list=PLYuw9x8TuK9u3s8qnucWs7M2q9vf7OZ-X`>;


    type cases = [
      Expect<Test<Home, "equals",  "home">>,
      Expect<Test<Home2, "equals",  "home">>,

      Expect<Test<Playlists, "equals",  "feed::playlists">>,
      Expect<Test<History, "equals",  "feed::history">>,

      Expect<Test<Featured, "equals",  "creator::featured">>,
      Expect<Test<Featured2, "equals",  "creator::featured">>,
      Expect<Test<Videos, "equals",  "creator::videos">>,
      Expect<Test<CreatorPlaylists, "equals",  "creator::playlists">>,

      Expect<Test<WatchVideo, "equals",  "play::video::solo">>,
      Expect<Test<WatchVideoWithShareLink, "equals",  "play::video::solo::share-link">>,
      Expect<Test<WatchVideo, "equals",  "play::video::solo">>,
      Expect<Test<ShareLinkWithTimestamp, "equals",  "play::video::solo::share-link::with-timestamp">>,

      Expect<Test<ShowVideosInPlaylist, "equals",  "playlist::show">>
    ];
    const cases: cases = [
      true, true,
      true, true,
      true, true, true, true,
      true, true, true, true,
      true
    ];
  });


  it("isYouTubeFeedUrl(val)", () => {
    const history = isYouTubeFeedUrl("https://www.youtube.com/feed/history");
    const history2 = isYouTubeFeedUrl("https://www.youtube.com/feed/history", "history");
    const history3 = isYouTubeFeedUrl("https://www.youtube.com/feed/history", "playlists");

    expect(history).toBe(true);
    expect(history2).toBe(true);
    expect(history3).toBe(false);

  });

  it("getYouTubePageType(url)", () => {
    const playlists = getYouTubePageType("https://www.youtube.com/feed/playlists");
    const showVideosInPlaylist = getYouTubePageType(`https://www.youtube.com/playlist?list=PLYuw9x8TuK9u3s8qnucWs7M2q9vf7OZ-X`);
    const featured = getYouTubePageType("https://www.youtube.com/@yankee-in-london/featured");

    expect(playlists).toBe("feed::playlists");
    expect(showVideosInPlaylist).toBe("playlist::show");
    expect(featured).toBe("creator::featured")

    type cases = [
      Expect<Test<typeof playlists, "equals",  "feed::playlists">>,
      Expect<Test<typeof showVideosInPlaylist, "equals",  "playlist::show">>,
      Expect<Test<typeof featured, "equals",  "creator::featured">>,
    ];
    const cases: cases = [
      true, true, true,
    ];
  });


  it("youTubeMeta()", () => {
    const m1 = youtubeMeta("https://www.youtube.com/feed/playlists");
    expect(m1.isYouTubeUrl).toBe(true);
    expect(m1.pageType).toBe("feed::playlists");
    expect(m1.isShareUrl).toBe(false);

  });


});
