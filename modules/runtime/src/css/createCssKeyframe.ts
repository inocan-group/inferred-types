import type {
    CssDefinition,
    CssKeyframeTimestamp,
    HandleDoneFn,
} from "inferred-types/types";

import {
    isDictionary,
} from "inferred-types/runtime";

export interface KeyframeApi<
    TState extends readonly [CssKeyframeTimestamp, CssDefinition][] | [],
> {
    state: Readonly<TState>;
    add: <
        TStage extends CssKeyframeTimestamp,
        TDefn extends CssDefinition,
    >(
        stage: TStage,
        defn: TDefn
    ) => KeyframeApi<[...TState, [TStage, TDefn]]>;
    done: () => Readonly<TState>;
}

function api<
    TState extends readonly [CssKeyframeTimestamp, CssDefinition][] | [],
>(state: TState = [] as TState): KeyframeApi<TState> {
    return {
        state,

        add: <
            TStage extends CssKeyframeTimestamp,
            TDefn extends CssDefinition,
        >(stage: TStage,
            defn: TDefn,
        ) => {
            return api(
                [...state, [stage, defn]],
            );
        },
        done() {
            return state;
        },
    };
}

// Simple local CSS conversion to avoid complex type recursion
type SimpleCssProps<T> = T extends { opacity: infer O; transform: infer Tr }
    ? `opacity: ${O extends string ? O : never}; transform: ${Tr extends string ? Tr : never}`
    : T extends Record<string, string>
        ? string
        : never;

type FrameToCSSString<T extends readonly [CssKeyframeTimestamp, CssDefinition][], TName extends string>
    = T extends readonly [
        [infer Stage1 extends CssKeyframeTimestamp, infer Defn1 extends CssDefinition],
        [infer Stage2 extends CssKeyframeTimestamp, infer Defn2 extends CssDefinition]
    ]
        ? `@keyframes ${TName} {\n  ${Stage1} { ${SimpleCssProps<Defn1>} }\n  ${Stage2} { ${SimpleCssProps<Defn2>} }\n}`
        : string;

export type CssKeyframeCallback = (cb: KeyframeApi<[]>) => unknown;

function hasDone<T>(val: T): val is KeyframeApi<any[]> & T {
    return isDictionary(val) && "done" in val && typeof val.done === "function";
}

function frameToCss<T extends readonly [CssKeyframeTimestamp, CssDefinition][]>(
    frames: T,
) {
    const tuples: [CssKeyframeTimestamp, string][] = frames.map(([ts, defn]) => [
        ts,
        Object.keys(defn).reduce(
            (acc, i) => [
                ...acc,
                `${i}: ${String(defn[i as keyof typeof defn])}`,
            ],
            [] as string[],
        ).join("; "),
    ]);

    return tuples.map(([ts, defn]) => `  ${ts} { ${defn} }`).join("\n");
}

export function createCssKeyframe<
    TName extends string,
    TKeyframes extends CssKeyframeCallback,
>(
    name: TName,
    keyframes: TKeyframes
) {
    /** api surface */
    const surface = api([]);
    /** return from user callback */
    const rtn = keyframes(surface);

    const frames = (
        hasDone(rtn) ? rtn.done() : rtn
    ) as unknown as HandleDoneFn<ReturnType<TKeyframes>>;

    type Frames = typeof frames;

    return {
        name,
        keyframes: frames,
        css: `@keyframes ${name} {\n${frameToCss(frames)}\n}`,
    } as {
        name: TName;
        keyframes: typeof frames;
        css: FrameToCSSString<typeof frames, TName>;
    };
}
