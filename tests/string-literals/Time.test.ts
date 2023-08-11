import { Equal, Expect, ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { 
  CivilianTime,
  DoesExtend, 
  HoursMinutes, 
  HoursMinutes12, 
  HoursMinutesSeconds, 
  HoursMinutesSeconds12, 
  MilitaryTime, 
  Mutable, 
  Time, 
  TimeInMinutes, 
  TimeInSeconds 
} from "src/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Time types", () => {

  it("HoursMinutes", () => {
    // valid times
    type V0 = DoesExtend<"09:45", HoursMinutes>;
    type V1 = DoesExtend<"9:45", HoursMinutes>;
    type V2 = DoesExtend<"10:45", HoursMinutes>;
    type V3 = DoesExtend<"12:45", HoursMinutes>;
    type V4 = DoesExtend<"13:45", HoursMinutes>;
    type V5 = DoesExtend<"23:45", HoursMinutes>;
    
    // invalid times
    type IV0 = DoesExtend<"13:45pm", HoursMinutes>;
    type IV1 = DoesExtend<"24:45", HoursMinutes>;
    type IV2 = DoesExtend<"9:85", HoursMinutes>;
    
    type cases = [
      ExpectTrue<V0>,
      ExpectTrue<V1>,
      ExpectTrue<V2>,
      ExpectTrue<V3>,
      ExpectTrue<V4>,
      ExpectTrue<V5>,

      ExpectFalse<IV0>,
      ExpectFalse<IV1>,
      ExpectFalse<IV2>
    ];
    const cases: cases = [ 
      true, true, true, true, true, true,
      false, false, false, 
    ];
  });

  
  it("HoursMinutes12", () => {
    // valid times
    type V0 = DoesExtend<"09:45am", HoursMinutes12>;
    type V1 = DoesExtend<"9:45am", HoursMinutes12>;
    type V2 = DoesExtend<"10:45am", HoursMinutes12>;
    type V3 = DoesExtend<"12:45pm", HoursMinutes12>;
    // invalid times
    type IV0 = DoesExtend<"13:45pm", HoursMinutes12>;
    type IV1 = DoesExtend<"0:45pm", HoursMinutes12>;
    type IV2 = DoesExtend<"9:85pm", HoursMinutes12>;
    type IV3 = DoesExtend<"21:45pm", HoursMinutes12>;
    type IV4 = DoesExtend<"21:45", HoursMinutes12>;
    
    
    type cases = [
      ExpectTrue<V0>,
      ExpectTrue<V1>,
      ExpectTrue<V2>,
      ExpectTrue<V3>,

      ExpectFalse<IV0>,
      ExpectFalse<IV1>,
      ExpectFalse<IV2>,
      ExpectFalse<IV3>,
      ExpectFalse<IV4>,
    ];
    const cases: cases = [ 
      true, true, true, true,
      false, false, false, false, false
    ];
  });

  it("HoursMinutes12<upper>", () => {
    // valid times
    type V0 = DoesExtend<"09:45AM", HoursMinutes12<"upper">>;
    type V1 = DoesExtend<"9:45AM", HoursMinutes12<"upper">>;
    type V2 = DoesExtend<"10:45AM", HoursMinutes12<"upper">>;
    type V3 = DoesExtend<"12:45PM", HoursMinutes12<"upper">>;
    // invalid times
    type IV0 = DoesExtend<"13:45PM", HoursMinutes12<"upper">>;
    type IV1 = DoesExtend<"0:45PM", HoursMinutes12<"upper">>;
    type IV2 = DoesExtend<"9:85PM", HoursMinutes12<"upper">>;
    type IV3 = DoesExtend<"21:45PM", HoursMinutes12<"upper">>;
    type IV4 = DoesExtend<"21:45", HoursMinutes12<"upper">>;
    
    type cases = [
      ExpectTrue<V0>,
      ExpectTrue<V1>,
      ExpectTrue<V2>,
      ExpectTrue<V3>,

      ExpectFalse<IV0>,
      ExpectFalse<IV1>,
      ExpectFalse<IV2>,
      ExpectFalse<IV3>,
      ExpectFalse<IV4>,
    ];
    const cases: cases = [ 
      true, true, true, true,
      false, false, false, false, false
    ];
  });

  it("HoursMinutes12<bare>", () => {
    // valid times
    type V0 = DoesExtend<"09:45", HoursMinutes12<"bare">>;
    type V1 = DoesExtend<"9:45", HoursMinutes12<"bare">>;
    type V2 = DoesExtend<"10:45", HoursMinutes12<"bare">>;
    type V3 = DoesExtend<"12:45", HoursMinutes12<"bare">>;
    // invalid times
    type IV0 = DoesExtend<"13:45", HoursMinutes12<"bare">>;
    type IV1 = DoesExtend<"0:45", HoursMinutes12<"bare">>;
    type IV2 = DoesExtend<"9:85", HoursMinutes12<"bare">>;
    type IV3 = DoesExtend<"21:45", HoursMinutes12<"bare">>;
    type IV4 = DoesExtend<"21:45pm", HoursMinutes12<"bare">>;
    
    
    type cases = [
      ExpectTrue<V0>,
      ExpectTrue<V1>,
      ExpectTrue<V2>,
      ExpectTrue<V3>,

      ExpectFalse<IV0>,
      ExpectFalse<IV1>,
      ExpectFalse<IV2>,
      ExpectFalse<IV3>,
      ExpectFalse<IV4>,
    ];
    const cases: cases = [ 
      true, true, true, true,
      false, false, false, false, false
    ];
  });
  

  it("TimeInMinutes", () => {
    // military: valid
    type MV0 = DoesExtend<"09:45", TimeInMinutes>;
    type MV1 = DoesExtend<"9:45", TimeInMinutes>;
    type MV2 = DoesExtend<"10:45", TimeInMinutes>;
    type MV3 = DoesExtend<"12:45", TimeInMinutes>;
    type MV4 = DoesExtend<"13:45", TimeInMinutes>;
    type MV5 = DoesExtend<"23:45", TimeInMinutes>;
    // military: invalid
    type MIV0 = DoesExtend<"13:45pm", TimeInMinutes>;
    type MIV1 = DoesExtend<"24:45", TimeInMinutes>;
    type MIV2 = DoesExtend<"9:85", TimeInMinutes>;

    // civilian: valid
    type CV0 = DoesExtend<"09:45am", TimeInMinutes>;
    type CV1 = DoesExtend<"9:45am", TimeInMinutes>;
    type CV2 = DoesExtend<"10:45am", TimeInMinutes>;
    type CV3 = DoesExtend<"12:45pm", TimeInMinutes>;
    // civilian: invalid
    type CIV0 = DoesExtend<"13:45pm", TimeInMinutes>;
    type CIV1 = DoesExtend<"0:45pm", TimeInMinutes>;
    type CIV2 = DoesExtend<"9:85pm", TimeInMinutes>;
    type CIV3 = DoesExtend<"21:45pm", TimeInMinutes>;
    
    type cases = [
      ExpectTrue<MV0>,
      ExpectTrue<MV1>,
      ExpectTrue<MV2>,
      ExpectTrue<MV3>,
      ExpectTrue<MV4>,
      ExpectTrue<MV5>,

      ExpectFalse<MIV0>,
      ExpectFalse<MIV1>,
      ExpectFalse<MIV2>,

      ExpectTrue<CV0>,
      ExpectTrue<CV1>,
      ExpectTrue<CV2>,
      ExpectTrue<CV3>,

      ExpectFalse<CIV0>,
      ExpectFalse<CIV1>,
      ExpectFalse<CIV2>,
      ExpectFalse<CIV3>,
    ];
    const cases: cases = [ 
      true, true, true, true, true, true,
      false, false, false,
      true, true, true, true,
      false, false, false, false
    ];
  });

  
  it("TimeInMinutes<military> and TimeInMinutes<civilian> equivalency", () => {
    type cases = [
      Expect<Equal<TimeInMinutes<"military">, HoursMinutes>>,
      Expect<Equal<TimeInMinutes<"military">, MilitaryTime<"HH:MM">>>,
      Expect<Equal<TimeInMinutes<"civilian">, HoursMinutes12>>,
      Expect<Equal<TimeInMinutes<"civilian">, CivilianTime<"HH:MM">>>,
    ];
    const cases: cases = [ true, true, true, true ];
  });
  

  it("TimeInSeconds<military> and TimeInSeconds<civilian> equivalency", () => {
    type cases = [
      Expect<Equal<TimeInSeconds<"military">, HoursMinutesSeconds>>,
      Expect<Equal<TimeInSeconds<"military">, MilitaryTime<"HH:MM:SS">>>,
      Expect<Equal<TimeInSeconds<"civilian">, HoursMinutesSeconds12>>,
      Expect<Equal<TimeInSeconds<"civilian">, CivilianTime<"HH:MM:SS">>>,
    ];
    const cases: cases = [ true, true, true, true ];
  });

  it("TimeInMilliseconds<military> and TimeInMilliseconds<civilian> equivalency", () => {
    type cases = [
      Expect<Equal<TimeInMilliseconds<"military">, HoursMinutesSecondsMilliseconds>>,
      Expect<Equal<TimeInMilliseconds<"military">, MilitaryTime<"HH:MM:SS.ms">>>,
      Expect<Equal<TimeInMilliseconds<"civilian">, HoursMinutesSecondsMilliseconds12>>,
      Expect<Equal<TimeInMilliseconds<"civilian">, CivilianTime<"HH:MM:SS.ms">>>,
    ];
    const cases: cases = [ true, true, true, true ];
  });

  // this allows that we can define a type with stronger typing
  // but then roll it into a more simply typed form for performance
  // later
  it("TimeInSeconds<military>: defined as strong, maps to simple", () => {
    type Simple = TimeInSeconds<"military", "simple">;
    // type C = TimeInSeconds<"civilian">;
    // type CS = TimeInSeconds<"civilian", "simple">;
    const getTime = <T extends TimeInSeconds<"military">>(time: T) => time; 
    const t1 = getTime("10:15:45");
    const t2 = getTime("21:15:33");
    const times = [ t1, t2 ] as const;

    type cases = [
      Expect<DoesExtend<Mutable<typeof times>, Simple[]>>,
    ];
    
    const cases: cases = [ true ];
    
  });
  



  
  it("All time types can be represented by the simplified Time", () => {
    type cases = [
      ExpectTrue<DoesExtend<TimeInSeconds, Time>>,

    ];
  });
  




});
