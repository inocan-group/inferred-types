import { 
  FinalizedMapConfig, 
  MapCardinalityIllustrated, 
  MapConfig 
} from "src/types/dictionary";
import { OptRequired } from "src/types/literals";

/**
 * utility function to take a fully-qualified _user_ config
 * and make it into a FinalizedMapConfig
 */
const toFinalizedConfig = <
  IR extends OptRequired,
  D extends MapCardinalityIllustrated,
  OR extends OptRequired
>(
  config: MapConfig<IR, D, OR>
) => {
  return { ...config, finalized: true } as FinalizedMapConfig<IR, D, OR>;
};

export const DEFAULT_ONE_TO_MANY_MAPPING = toFinalizedConfig({
  input: "req",
  output: "opt",
  cardinality: "I -> O[]",
});

export const DEFAULT_ONE_TO_ONE_MAPPING = toFinalizedConfig({
  input: "req",
  output: "req",
  cardinality: "I -> O",
});

export const DEFAULT_MANY_TO_ONE_MAPPING = toFinalizedConfig({
  input: "req",
  output: "req",
  cardinality: "I[] -> O",
});

/**
 * The _default_ One-to-Many mapping that the mapTo() utility provides
 */
export type DefaultOneToManyMapping = typeof DEFAULT_ONE_TO_MANY_MAPPING;

/**
 * The _default_ One-to-One mapping that the mapTo() utility provides
 */
export type DefaultOneToOneMapping = typeof DEFAULT_ONE_TO_ONE_MAPPING;

/**
 * The _default_ Many-to-One mapping that the mapTo() utility provides
 */
export type DefaultManyToOneMapping = typeof DEFAULT_MANY_TO_ONE_MAPPING;
