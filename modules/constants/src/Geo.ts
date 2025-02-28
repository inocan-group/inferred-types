/**
 * The 50 US states: `[name, abbrev, true]`
 */
export const US_STATE_LOOKUP_STRICT = [
    { name: "Alabama", abbrev: "AL" },
    { name: "Alaska", abbrev: "AK" },
    { name: "Arizona", abbrev: "AZ" },
    { name: "Arkansas", abbrev: "AR" },
    { name: "California", abbrev: "CA" },
    { name: "Colorado", abbrev: "CO" },
    { name: "Connecticut", abbrev: "CT" },
    { name: "Delaware", abbrev: "DE" },
    { name: "Florida", abbrev: "FL" },
    { name: "Georgia", abbrev: "GA" },
    { name: "Hawaii", abbrev: "HI" },
    { name: "Idaho", abbrev: "ID" },
    { name: "Illinois", abbrev: "IL" },
    { name: "Indiana", abbrev: "IN" },
    { name: "Iowa", abbrev: "IA" },
    { name: "Kansas", abbrev: "KS" },
    { name: "Kentucky", abbrev: "KY" },
    { name: "Louisiana", abbrev: "LA" },
    { name: "Maine", abbrev: "ME" },
    { name: "Maryland", abbrev: "MD" },
    { name: "Massachusetts", abbrev: "MA" },
    { name: "Michigan", abbrev: "MI" },
    { name: "Minnesota", abbrev: "MN" },
    { name: "Mississippi", abbrev: "MS" },
    { name: "Missouri", abbrev: "MO" },
    { name: "Montana", abbrev: "MT" },
    { name: "Nebraska", abbrev: "NE" },
    { name: "Nevada", abbrev: "NV" },
    { name: "New Hampshire", abbrev: "NH" },
    { name: "New Jersey", abbrev: "NJ" },
    { name: "New Mexico", abbrev: "NM" },
    { name: "New York", abbrev: "NY" },
    { name: "North Carolina", abbrev: "NC" },
    { name: "North Dakota", abbrev: "ND" },
    { name: "Ohio", abbrev: "OH" },
    { name: "Oklahoma", abbrev: "OK" },
    { name: "Oregon", abbrev: "OR" },
    { name: "Pennsylvania", abbrev: "PA" },
    { name: "Rhode Island", abbrev: "RI" },
    { name: "South Carolina", abbrev: "SC" },
    { name: "South Dakota", abbrev: "SD" },
    { name: "Tennessee", abbrev: "TN" },
    { name: "Texas", abbrev: "TX" },
    { name: "Utah", abbrev: "UT" },
    { name: "Vermont", abbrev: "VT" },
    { name: "Virginia", abbrev: "VA" },
    { name: "Washington", abbrev: "WA" },
    { name: "West Virginia", abbrev: "WV" },
    { name: "Wisconsin", abbrev: "WI" },
    { name: "Wyoming", abbrev: "WY" },
] as const;

/**
 * The 9 provinces to the US which are granted State codes.
 */
export const US_STATE_LOOKUP_PROVINCES = [
    { name: "Puerto Rico", abbrev: "PR" },
    { name: "Virgin Islands", abbrev: "VI" },
    { name: "Palau", abbrev: "PW" },
    { name: "Federated States of Micronesia", abbrev: "FM" },
    { name: "Northern Mariana Islands", abbrev: "MP" },
    { name: "District of Columbia", abbrev: "DC" },
    { name: "Marshall Islands", abbrev: "MH" },
    { name: "American Samoa", abbrev: "AS" },
    { name: "Guam", abbrev: "GU" },
] as const;

/**
 * All 50 states and 9 provinces which have State abbreviations.
 *
 * Data format is: `[name, abbrev, flag]` where the boolean flag
 * indicates whether the line item is one of the 50 true states.
 */
export const US_STATE_LOOKUP = [
    ...US_STATE_LOOKUP_STRICT,
    ...US_STATE_LOOKUP_PROVINCES,
] as const;

/**
 * A lookup which provides a list of state abbreviations associated
 * with the first digit of the zip code.
 */
export const ZIP_TO_STATE = {
    0: ["CT", "MA", "ME", "NH", "NJ", "NY", "PR", "RI", "VT", "VI"],
    1: ["DE", "NY", "PA"],
    2: ["DC", "MD", "NC", "SC", "VA", "WV"],
    3: ["AL", "FL", "GA", "MS", "TN"],
    4: ["IN", "KY", "MI", "OH"],
    5: ["IA", "MN", "MT", "ND", "SD", "WI"],
    6: ["IL", "KS", "MO", "NE"],
    7: ["AR", "LA", "OK", "TX"],
    8: ["AZ", "CO", "ID", "NM", "NV", "UT", "WY"],
    9: ["AK", "AS", "CA", "GU", "HI", "MH", "FM", "MP", "OR", "PW", "WA"],
} as const;
