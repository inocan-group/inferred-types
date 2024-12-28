import { } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { createEndpointsFrom } from "../../modules/runtime/src/api/createEndpoint";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("createEndpointFrom()", () => {

  it("happy path", () => {
    const build = createEndpointsFrom("https://api.openai.com/v1");
    const end = build
      .delete("/models/<model>", "remove shit")
      .get("")


    // @ts-ignore
    type cases = [
      /** type tests */
    ];
  });

});
