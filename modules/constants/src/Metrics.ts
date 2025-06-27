export const DISTANCE_METRICS_LOOKUP = [
    { abbrev: "km", name: "kilometer" },
    { abbrev: "mi", name: "mile" },
    { abbrev: "mm", name: "millimeter" },
    { abbrev: "cm", name: "centimeter" },
    { abbrev: "yd", name: "yard" },
    { abbrev: "ft", name: "foot" },
    { abbrev: "in", name: "inch" },
    { abbrev: "m", name: "meter" },
    { abbrev: "nm", name: "nautical mile" },
    { abbrev: "nmi", name: "nanometer" },
    { abbrev: "µm", name: "micrometer" },
    { abbrev: "dm", name: "decimeter" },
    { abbrev: "AU", name: "astronomical unit" },
    { abbrev: "ly", name: "light year" },
    { abbrev: "pc", name: "parsec" },
] as const;

export const MASS_METRICS_LOOKUP = [
    { abbrev: "g", name: "gram" },
    { abbrev: "kg", name: "kilogram" },
    { abbrev: "mg", name: "milligram" },
    { abbrev: "µg", name: "microgram" },
    { abbrev: "t", name: "tonne" },
    { abbrev: "lb", name: "pound" },
    { abbrev: "oz", name: "ounce" },
    { abbrev: "st", name: "stone" },
    { abbrev: "ct", name: "carat" },
    { abbrev: "Mt", name: "megatonne" },
    { abbrev: "gt", name: "gigatonne" },
    { abbrev: "slug", name: "slug" },
    { abbrev: "dr", name: "dram" },
    { abbrev: "gr", name: "grain" },
    { abbrev: "q", name: "quintal" },
] as const;

export const SPEED_METRICS_LOOKUP = [
    { abbrev: "m/s", name: "meters per second" },
    { abbrev: "km/h", name: "kilometers per hour" },
    { abbrev: "mph", name: "miles per hour" },
    { abbrev: "kn", name: "knot" },
    { abbrev: "ft/s", name: "feet per second" },
    { abbrev: "c", name: "speed of light" },
    { abbrev: "mach", name: "mach" },
    { abbrev: "cm/s", name: "centimeters per second" },
    { abbrev: "in/s", name: "inches per second" },
    { abbrev: "ly/y", name: "light years per year" },
] as const;

export const ACCELERATION_METRICS_LOOKUP = [
    { abbrev: "m/s²", name: "meters per second squared" },
    { abbrev: "ft/s²", name: "feet per second squared" },
    { abbrev: "g", name: "g-force" },
    { abbrev: "Gal", name: "galileo" },
    { abbrev: "cm/s²", name: "centimeters per second squared" },
    { abbrev: "km/h²", name: "kilometers per hour squared" },
    { abbrev: "in/s²", name: "inches per second squared" },
    { abbrev: "mi/h²", name: "miles per hour squared" },
    { abbrev: "kn/s²", name: "knots per second squared" },
] as const;

export const VOLUME_METRICS_LOOKUP = [
    { abbrev: "L", name: "liter" },
    { abbrev: "dL", name: "deciliter" },
    { abbrev: "mL", name: "milliliter" },
    { abbrev: "µL", name: "microliter" },
    { abbrev: "cm³", name: "cubic centimeter" },
    { abbrev: "m³", name: "cubic meter" },
    { abbrev: "ft³", name: "cubic foot" },
    { abbrev: "in³", name: "cubic inch" },
    { abbrev: "gallon", name: "gallon" },
    { abbrev: "qt", name: "quart" },
    { abbrev: "pt", name: "pint" },
    { abbrev: "fl oz", name: "fluid ounce" },
    { abbrev: "barrel", name: "barrel" },
    { abbrev: "tbsp", name: "tablespoon" },
    { abbrev: "tsp", name: "teaspoon" },
] as const;

export const TEMPERATURE_METRICS_LOOKUP = [
    { abbrev: "°C", name: "celsius" },
    { abbrev: "°F", name: "fahrenheit" },
    { abbrev: "K", name: "kelvin" },
] as const;

export const PRESSURE_METRICS_LOOKUP = [
    { abbrev: "Pa", name: "pascal" },
    { abbrev: "bar", name: "bar" },
    { abbrev: "atm", name: "atmosphere" },
    { abbrev: "mmHg", name: "millimeters of mercury" },
    { abbrev: "psi", name: "pounds per square inch" },
] as const;

export const ENERGY_METRICS_LOOKUP = [
    { abbrev: "J", name: "joule" },
    { abbrev: "cal", name: "calorie" },
    { abbrev: "kcal", name: "kilocalorie" },
    { abbrev: "kWh", name: "kilowatt-hour" },
    { abbrev: "BTU", name: "british thermal unit" },
    { abbrev: "eV", name: "electronvolt" },
] as const;

export const TIME_METRICS_LOOKUP = [
    { abbrev: "s", name: "second" },
    { abbrev: "m", name: "minute" },
    { abbrev: "h", name: "hour" },
    { abbrev: "day", name: "day" },
    { abbrev: "week", name: "week" },
    { abbrev: "mo", name: "month" },
    { abbrev: "ms", name: "millisecond" },
    { abbrev: "µs", name: "microsecond" },
    { abbrev: "ns", name: "nanosecond" },
] as const;

export const POWER_METRICS_LOOKUP = [
    { abbrev: "W", name: "Watt" },
    { abbrev: "kW", name: "kilowatt" },
    { abbrev: "MW", name: "megawatt" },
    { abbrev: "hp", name: "horsepower" },
    { abbrev: "GW", name: "gigawatt" },
] as const;

export const FREQUENCY_METRICS_LOOKUP = [
    { abbrev: "Hz", name: "hertz" },
    { abbrev: "kHz", name: "kilohertz" },
    { abbrev: "MHz", name: "megahertz" },
    { abbrev: "GHz", name: "gigahertz" },
    { abbrev: "THz", name: "terahertz" },
] as const;

export const VOLTAGE_METRICS_LOOKUP = [
    { abbrev: "V", name: "volt" },
    { abbrev: "kV", name: "kilovolt" },
    { abbrev: "mV", name: "millivolt" },
    { abbrev: "µV", name: "microvolt" },
] as const;

export const CURRENT_METRICS_LOOKUP = [
    { abbrev: "A", name: "ampere" },
    { abbrev: "mA", name: "milliampere" },
    { abbrev: "µA", name: "microampere" },
    { abbrev: "kA", name: "kiloampere" },
] as const;

export const RESISTANCE_METRICS_LOOKUP = [
    { abbrev: "Ω", name: "ohm" },
    { abbrev: "kΩ", name: "kiloohm" },
    { abbrev: "MΩ", name: "megaohm" },
] as const;

export const LUMINOSITY_METRICS_LOOKUP = [
    { abbrev: "cd", name: "candela" },
    { abbrev: "lm", name: "lumen" },
    { abbrev: "lx", name: "lux" },
] as const;

export const AREA_METRICS_LOOKUP = [
    { abbrev: "m²", name: "square meter" },
    { abbrev: "cm²", name: "square centimeter" },
    { abbrev: "mm²", name: "square millimeter" },
    { abbrev: "km²", name: "square kilometer" },
    { abbrev: "ft²", name: "square foot" },
    { abbrev: "in²", name: "square inch" },
    { abbrev: "acre", name: "acre" },
    { abbrev: "ha", name: "hectare" },
] as const;
