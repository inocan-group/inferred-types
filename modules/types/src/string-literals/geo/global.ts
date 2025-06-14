import { CONTINENTS, HEMISPHERE } from "inferred-types/constants";

/**
 * Whether a given focus is in the northern or souther hemisphere
 */
export type Hemisphere = typeof HEMISPHERE[number];

/**
 * A continent on planet earth
 */
export type Continent = typeof CONTINENTS[number];

