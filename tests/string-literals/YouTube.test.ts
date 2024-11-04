import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { GetYouTubePageType} from "@inferred-types/types";
import { getYouTubePageType, isYouTubeFeedUrl, youtubeMeta } from "src/runtime/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

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
      Expect<Equal<Home, "home">>,
      Expect<Equal<Home2, "home">>,

      Expect<Equal<Playlists, "feed::playlists">>,
      Expect<Equal<History, "feed::history">>,

      Expect<Equal<Featured, "creator::featured">>,
      Expect<Equal<Featured2, "creator::featured">>,
      Expect<Equal<Videos, "creator::videos">>,
      Expect<Equal<CreatorPlaylists, "creator::playlists">>,

      Expect<Equal<WatchVideo, "play::video::solo">>,
      Expect<Equal<WatchVideoWithShareLink, "play::video::solo::share-link">>,
      Expect<Equal<WatchVideo, "play::video::solo">>,
      Expect<Equal<ShareLinkWithTimestamp, "play::video::solo::share-link::with-timestamp">>,

      Expect<Equal<ShowVideosInPlaylist, "playlist::show">>
    ];
    const cases: cases = [
      true, true,
      true, true,
      true, true,true,true,
      true, true,true,true,
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
      Expect<Equal<typeof playlists, "feed::playlists">>,
      Expect<Equal<typeof showVideosInPlaylist, "playlist::show">>,
      Expect<Equal<typeof featured, "creator::featured">>,
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
