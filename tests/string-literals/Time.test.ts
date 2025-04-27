import { describe, it } from "vitest";
import {
    Expect,
    CivilianTime,
    DoesExtend,
    DoesNotExtend,
    HoursMinutes,
    HoursMinutes12,
    HoursMinutesSeconds,
    HoursMinutesSeconds12,
    HoursMinutesSecondsMilliseconds,
    HoursMinutesSecondsMilliseconds12,
    MilitaryTime,
    Mutable,
    Test,
    Time,
    TimeInMilliseconds,
    TimeInMinutes,
    TimeInSeconds
} from "inferred-types/types";



describe("Time types", () => {

    it("Time<TResolution>", () => {
        type cases = [
            Expect<Test<"09:45pm", "extends", Time<"HH:MM", "civilian">>>,
            Expect<Test<"9:45pm", "extends", Time<"HH:MM", "civilian">>>,
            Expect<Test<"13:00", "extends", Time<"HH:MM", "military">>>,

            Expect<DoesNotExtend<"13:00pm", Time<"HH:MM", "military">>>,
            Expect<DoesNotExtend<"13:00pm", Time<"HH:MM", "civilian">>>,
            Expect<DoesNotExtend<"09:45", Time<"HH:MM", "civilian">>>,
            Expect<DoesNotExtend<"13:00pm", Time<"HH:MM">>>,
        ];
    });


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
            Expect<Test<V0, "equals", true>>,
            Expect<Test<V1, "equals", true>>,
            Expect<Test<V2, "equals", true>>,
            Expect<Test<V3, "equals", true>>,
            Expect<Test<V4, "equals", true>>,
            Expect<Test<V5, "equals", true>>,

            Expect<Test<IV0, "equals", false>>,
            Expect<Test<IV1, "equals", false>>,
            Expect<Test<IV2, "equals", false>>,
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
            Expect<Test<V0, "equals", true>>,
            Expect<Test<V1, "equals", true>>,
            Expect<Test<V2, "equals", true>>,
            Expect<Test<V3, "equals", true>>,

            Expect<Test<IV0, "equals", false>>,
            Expect<Test<IV1, "equals", false>>,
            Expect<Test<IV2, "equals", false>>,
            Expect<Test<IV3, "equals", false>>,
            Expect<Test<IV4, "equals", false>>,
        ];
    });

    it("HoursMinutes12<upper>", () => {
        // valid times
        type V0 = DoesExtend<"09:45AM", HoursMinutes12<{ amPmCase: "upper" }>>;
        type V1 = DoesExtend<"9:45AM", HoursMinutes12<{ amPmCase: "upper" }>>;
        type V2 = DoesExtend<"10:45AM", HoursMinutes12<{ amPmCase: "upper" }>>;
        type V3 = DoesExtend<"12:45PM", HoursMinutes12<{ amPmCase: "upper" }>>;
        // invalid times
        type IV0 = DoesExtend<"13:45PM", HoursMinutes12<{ amPmCase: "upper" }>>;
        type IV1 = DoesExtend<"0:45PM", HoursMinutes12<{ amPmCase: "upper" }>>;
        type IV2 = DoesExtend<"9:85PM", HoursMinutes12<{ amPmCase: "upper" }>>;
        type IV3 = DoesExtend<"21:45PM", HoursMinutes12<{ amPmCase: "upper" }>>;
        type IV4 = DoesExtend<"21:45", HoursMinutes12<{ amPmCase: "upper" }>>;

        type cases = [
            Expect<Test<V0, "equals", true>>,
            Expect<Test<V1, "equals", true>>,
            Expect<Test<V2, "equals", true>>,
            Expect<Test<V3, "equals", true>>,

            Expect<Test<IV0, "equals", false>>,
            Expect<Test<IV1, "equals", false>>,
            Expect<Test<IV2, "equals", false>>,
            Expect<Test<IV3, "equals", false>>,
            Expect<Test<IV4, "equals", false>>,
        ];
    });

    it("HoursMinutes12<bare>", () => {
        // valid times
        type V0 = DoesExtend<"09:45", HoursMinutes12<{ amPmCase: "bare" }>>;
        type V1 = DoesExtend<"9:45", HoursMinutes12<{ amPmCase: "bare" }>>;
        type V2 = DoesExtend<"10:45", HoursMinutes12<{ amPmCase: "bare" }>>;
        type V3 = DoesExtend<"12:45", HoursMinutes12<{ amPmCase: "bare" }>>;
        // invalid times
        type IV0 = DoesExtend<"13:45", HoursMinutes12<{ amPmCase: "bare" }>>;
        type IV1 = DoesExtend<"0:45", HoursMinutes12<{ amPmCase: "bare" }>>;
        type IV2 = DoesExtend<"9:85", HoursMinutes12<{ amPmCase: "bare" }>>;
        type IV3 = DoesExtend<"21:45", HoursMinutes12<{ amPmCase: "bare" }>>;
        type IV4 = DoesExtend<"21:45pm", HoursMinutes12<{ amPmCase: "bare" }>>;


        type cases = [
            Expect<Test<V0, "equals", true>>,
            Expect<Test<V1, "equals", true>>,
            Expect<Test<V2, "equals", true>>,
            Expect<Test<V3, "equals", true>>,

            Expect<Test<IV0, "equals", false>>,
            Expect<Test<IV1, "equals", false>>,
            Expect<Test<IV2, "equals", false>>,
            Expect<Test<IV3, "equals", false>>,
            Expect<Test<IV4, "equals", false>>,
        ];
    });


    it("TimeInMinutes", () => {
        // military: valid
        type MV0 = DoesExtend<"09:45", MilitaryTime<"HH:MM">>;
        type MV1 = DoesExtend<"9:45", MilitaryTime<"HH:MM">>;
        type MV2 = DoesExtend<"10:45", MilitaryTime<"HH:MM">>;
        type MV3 = DoesExtend<"12:45", MilitaryTime<"HH:MM">>;
        type MV4 = DoesExtend<"13:45", MilitaryTime<"HH:MM">>;
        type MV5 = DoesExtend<"23:45", MilitaryTime<"HH:MM">>;
        // military: invalid
        type MIV0 = DoesExtend<"13:45pm", MilitaryTime<"HH:MM">>;
        type MIV1 = DoesExtend<"24:45", MilitaryTime<"HH:MM">>;
        type MIV2 = DoesExtend<"9:85", MilitaryTime<"HH:MM">>;
        type MIV3 = DoesExtend<"9:45", MilitaryTime<"HH:MM", { fixedLengthHours: true }>>;


        // civilian: valid
        type CV0 = DoesExtend<"09:45am", CivilianTime<"HH:MM">>;
        type CV1 = DoesExtend<"9:45am", CivilianTime<"HH:MM">>;
        type CV2 = DoesExtend<"10:45am", CivilianTime<"HH:MM">>;
        type CV3 = DoesExtend<"12:45pm", CivilianTime<"HH:MM">>;
        // civilian: invalid
        type CIV0 = DoesExtend<"13:45pm", CivilianTime<"HH:MM">>;
        type CIV1 = DoesExtend<"0:45pm", CivilianTime<"HH:MM">>;
        type CIV2 = DoesExtend<"9:85pm", CivilianTime<"HH:MM">>;
        type CIV3 = DoesExtend<"21:45pm", CivilianTime<"HH:MM">>;

        type cases = [
            Expect<Test<MV0, "equals", true>>,
            Expect<Test<MV1, "equals", true>>,
            Expect<Test<MV2, "equals", true>>,
            Expect<Test<MV3, "equals", true>>,
            Expect<Test<MV4, "equals", true>>,
            Expect<Test<MV5, "equals", true>>,

            Expect<Test<MIV0, "equals", false>>,
            Expect<Test<MIV1, "equals", false>>,
            Expect<Test<MIV2, "equals", false>>,
            Expect<Test<MIV3, "equals", false>>,

            Expect<Test<CV0, "equals", true>>,
            Expect<Test<CV1, "equals", true>>,
            Expect<Test<CV2, "equals", true>>,
            Expect<Test<CV3, "equals", true>>,

            Expect<Test<CIV0, "equals", false>>,
            Expect<Test<CIV1, "equals", false>>,
            Expect<Test<CIV2, "equals", false>>,
            Expect<Test<CIV3, "equals", false>>,
        ];
    });


    it("TimeInMinutes<military> and TimeInMinutes<civilian> equivalency", () => {
        type cases = [
            Expect<Test<TimeInMinutes<"military">, "equals",  HoursMinutes>>,
            Expect<Test<TimeInMinutes<"military">, "equals",  MilitaryTime<"HH:MM">>>,
            Expect<Test<TimeInMinutes<"civilian">, "equals",  HoursMinutes12>>,
            Expect<Test<TimeInMinutes<"civilian">, "equals",  CivilianTime<"HH:MM">>>,
        ];
    });


    it("TimeInSeconds<military> and TimeInSeconds<civilian> equivalency", () => {
        type cases = [
            Expect<Test<TimeInSeconds<"military">, "equals",  HoursMinutesSeconds>>,
            Expect<Test<TimeInSeconds<"military">, "equals",  MilitaryTime<"HH:MM:SS">>>,
            Expect<Test<TimeInSeconds<"civilian">, "equals",  HoursMinutesSeconds12>>,
            Expect<Test<TimeInSeconds<"civilian">, "equals",  CivilianTime<"HH:MM:SS">>>,
        ];
    });

    it("TimeInMilliseconds<military> and TimeInMilliseconds<civilian> equivalency", () => {
        type cases = [
            Expect<Test<TimeInMilliseconds<"military">, "equals",  HoursMinutesSecondsMilliseconds>>,
            Expect<Test<TimeInMilliseconds<"military">, "equals",  MilitaryTime<"HH:MM:SS.ms">>>,
            Expect<Test<TimeInMilliseconds<"civilian">, "equals",  HoursMinutesSecondsMilliseconds12>>,
            Expect<Test<TimeInMilliseconds<"civilian">, "equals",  CivilianTime<"HH:MM:SS.ms">>>,
        ];
    });

    // this allows that we can define a type with stronger typing
    // but then roll it into a more simply typed form for performance
    // later
    it("TimeInSeconds<military>: defined as strong, maps to simple", () => {
        type Simple = TimeInSeconds<"military", { strength: "simple" }>;
        // type C = TimeInSeconds<"civilian">;
        // type CS = TimeInSeconds<"civilian", "simple">;
        const getTime = <T extends TimeInSeconds<"military">>(time: T) => time;
        const t1 = getTime("10:15:45");
        const t2 = getTime("21:15:33");
        const times = [t1, t2] as const;

        type cases = [
            Expect<DoesExtend<Mutable<typeof times>, Simple[]>>,
        ];
    });


});
