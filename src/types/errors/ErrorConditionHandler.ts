
import {ErrorCondition} from "inferred-types/dist/types/index";

/**
 * **ErrorConditionHandler**
 *
 * A callback function which will receive an ErrorCondition and return an appropriate
 * response.
 */
export type ErrorConditionHandler = <T extends ErrorCondition<any>>(err: T) => any;
