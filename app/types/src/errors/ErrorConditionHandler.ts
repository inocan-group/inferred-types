
import {ErrorCondition} from "@inferred-types/types";

/**
 * **ErrorConditionHandler**
 *
 * A callback function which will receive an ErrorCondition and return an appropriate
 * response.
 */
export type ErrorConditionHandler = <T extends ErrorCondition<any>>(err: T) => any;
