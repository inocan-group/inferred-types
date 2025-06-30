import type {
    Take__StartEndOptions
} from "inferred-types/runtime";
import {
    createTakeStartEndFunction,
    createStaticTakeFunction,
    createTakeWhileFunction,
    err
} from "inferred-types/runtime";

type TakeFunctionKind = "static" | "start-end" | "while";

type StartEndOptions<TStartEnd extends Record<string, string>> = {
    options<TOpt extends Take__StartEndOptions>(options: TOpt): unknown;

};

type StartEndBuilder = {
    /** comments */
    startEndMarkers<
        const TStartEnd extends Record<string, string>
    >(markers: TStartEnd): StartEndOptions<TStartEnd>;
};

type Returns<K extends TakeFunctionKind> = K extends "start-end"
    ? StartEndBuilder
    : unknown;

export function createTakeFunction<K extends TakeFunctionKind>(kind: K): Returns<K> {
    switch (kind) {
        case "static":
            return createStaticTakeFunction as Returns<K>;
        case "start-end":
            return {
                startEndMarkers<const TStartEnd extends Record<string, S>, S extends string>(markers: TStartEnd) {
                    return {
                        options<const TOpt extends Take__StartEndOptions>(options: TOpt = {} as TOpt) {
                            return createTakeStartEndFunction(markers, options);
                        }
                    };
                }
            } as Returns<K>;
        case "while":
            return createTakeWhileFunction as Returns<K>;
        default:
            throw err;
    }
}
