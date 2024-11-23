/* eslint-disable @typescript-eslint/ban-ts-comment */
import { describe, it } from "vitest";
import {  Expect, ExpectTrue } from "@type-challenges/utils";

import { Extends, MomentJs } from "inferred-types";
import moment from "moment";


describe("MomentJS", () => {

  it("type should extends the instantiated library's API surface", () => {
    type MomentInstance = ReturnType<typeof moment>;

    // @ts-ignore
    type _cases = [
      ExpectTrue<IsMomentJs<MomentInstance>>,
    ];

  });

})
