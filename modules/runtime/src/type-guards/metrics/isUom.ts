import type {
    AccelerationUom,
    AreaUom,
    CurrentUom,
    DistanceUom,
    EnergyUom,
    FrequencyUom,
    LuminosityUom,
    MassUom,
    MetricCategory,
    PowerUom,
    PressureUom,
    ResistanceUom,
    SpeedUom,
    TemperatureUom,
    TimeUom,
    Uom,
    VoltageUom,
    VolumeUom,
} from "inferred-types/types";
import {
    ACCELERATION_METRICS_LOOKUP,
    AREA_METRICS_LOOKUP,
    CURRENT_METRICS_LOOKUP,
    ENERGY_METRICS_LOOKUP,
    FREQUENCY_METRICS_LOOKUP,
    LUMINOSITY_METRICS_LOOKUP,
    MASS_METRICS_LOOKUP,
    POWER_METRICS_LOOKUP,
    PRESSURE_METRICS_LOOKUP,
    RESISTANCE_METRICS_LOOKUP,
    SPEED_METRICS_LOOKUP,
    TEMPERATURE_METRICS_LOOKUP,
    TIME_METRICS_LOOKUP,
    VOLTAGE_METRICS_LOOKUP,
    VOLUME_METRICS_LOOKUP,
} from "inferred-types/constants";
import { createFnWithProps, isString } from "inferred-types/runtime";

export function isAreaUom(val: unknown): val is AreaUom {
    return isString(val) && AREA_METRICS_LOOKUP.map(i => i.abbrev).includes(val as any);
}

export function isLuminosityUom(val: unknown): val is LuminosityUom {
    return isString(val) && LUMINOSITY_METRICS_LOOKUP.map(i => i.abbrev).includes(val as any);
}

export function isResistanceUom(val: unknown): val is ResistanceUom {
    return isString(val) && RESISTANCE_METRICS_LOOKUP.map(i => i.abbrev).includes(val as any);
}

export function isCurrentUom(val: unknown): val is CurrentUom {
    return isString(val) && CURRENT_METRICS_LOOKUP.map(i => i.abbrev).includes(val as any);
}

export function isVoltageUom(val: unknown): val is VoltageUom {
    return isString(val) && VOLTAGE_METRICS_LOOKUP.map(i => i.abbrev).includes(val as any);
}

export function isFrequencyUom(val: unknown): val is FrequencyUom {
    return isString(val) && FREQUENCY_METRICS_LOOKUP.map(i => i.abbrev).includes(val as any);
}

export function isPowerUom(val: unknown): val is PowerUom {
    return isString(val) && POWER_METRICS_LOOKUP.map(i => i.abbrev).includes(val as any);
}

export function isTimeUom(val: unknown): val is TimeUom {
    return isString(val) && TIME_METRICS_LOOKUP.map(i => i.abbrev).includes(val as any);
}

export function isEnergyUom(val: unknown): val is EnergyUom {
    return isString(val) && ENERGY_METRICS_LOOKUP.map(i => i.abbrev).includes(val as any);
}

export function isPressureUom(val: unknown): val is PressureUom {
    return isString(val) && PRESSURE_METRICS_LOOKUP.map(i => i.abbrev).includes(val as any);
}

export function isTemperatureUom(val: unknown): val is TemperatureUom {
    return isString(val) && TEMPERATURE_METRICS_LOOKUP.map(i => i.abbrev).includes(val as any);
}

export function isVolumeUom(val: unknown): val is VolumeUom {
    return isString(val) && VOLUME_METRICS_LOOKUP.map(i => i.abbrev).includes(val as any);
}

export function isAccelerationUom(val: unknown): val is AccelerationUom {
    return isString(val) && ACCELERATION_METRICS_LOOKUP.map(i => i.abbrev).includes(val as any);
}

export function isSpeedUom(val: unknown): val is SpeedUom {
    return isString(val) && SPEED_METRICS_LOOKUP.map(i => i.abbrev).includes(val as any);
}

export function isMassUom(val: unknown): val is MassUom {
    return isString(val) && MASS_METRICS_LOOKUP.map(i => i.abbrev).includes(val as any);
}

export function isDistanceUom(val: unknown): val is DistanceUom {
    return isString(val) && ENERGY_METRICS_LOOKUP.map(i => i.abbrev).includes(val as any);
}

/**
 * Type guard which validates the passed in `val` is a `Uom` (unit
 * of measure).
 *
 * **Related:**
 * - `isUomCategory(c)(v)`
 * - `isSpeedUom(v)`, `isMassUom(v)`, ...
 */
export function isUom(val: unknown): val is Uom {
    return isDistanceUom(val)
        || isMassUom(val)
        || isSpeedUom(val)
        || isAccelerationUom(val)
        || isVoltageUom(val)
        || isTemperatureUom(val)
        || isPressureUom(val)
        || isEnergyUom(val)
        || isTimeUom(val)
        || isPowerUom(val)
        || isFrequencyUom(val)
        || isVoltageUom(val)
        || isCurrentUom(val)
        || isLuminosityUom(val)
        || isAreaUom(val);
}

function getCategories<T extends readonly MetricCategory[]>(
    c: T,
) {
    return c.map((i) => {
        switch (i) {
            case "Acceleration":
                return isAccelerationUom;
            case "Area":
                return isAreaUom;
            case "Current":
                return isCurrentUom;
            case "Distance":
                return isDistanceUom;
            case "Frequency":
                return isFrequencyUom;
            case "Luminosity":
                return isLuminosityUom;
            case "Mass":
                return isMassUom;
            case "Power":
                return isPowerUom;
            case "Pressure":
                return isPressureUom;
            case "Resistance":
                return isResistanceUom;
            case "Speed":
                return isSpeedUom;
            case "Temperature":
                return isTemperatureUom;
            case "Time":
                return isTimeUom;
            case "Voltage":
                return isVoltageUom;
            case "Volume":
                return isVoltageUom;
            default:
                throw new Error("Unknown UOM Category");
        }
    },
    );
}

export type UomTypeGuard<
    TCat extends readonly MetricCategory[],
> = ((val: unknown) => boolean) & {
    categories: TCat;
    kind: "UomTypeGuard";
};

/**
 * **isUomCategory**`(...categories) => (val) => val is Uom<T>`
 *
 * A higher order type guard which validates that a value is of
 * the specified metric category or categories.
 *
 * **Related:** `isUom()`, `isAreaUom()`, `isSpeedUom()`, ...
 */
export function isUomCategory<
    TCat extends readonly [MetricCategory, ...MetricCategory[]],
>(
    ...categories: TCat
): UomTypeGuard<TCat> {
    const fn = (val: unknown): val is Uom<TCat[number]> => {
        const tests = getCategories(categories);

        return tests.some(i => i(val));
    };
    const prop = { categories, kind: "UomTypeGuard" };
    return createFnWithProps(fn, prop) as unknown as UomTypeGuard<TCat>;
}
