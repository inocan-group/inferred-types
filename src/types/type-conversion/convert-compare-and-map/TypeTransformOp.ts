import { 
  TYPE_CONVERSION_CROSS_TYPE, 
  TYPE_CONVERSION_NUMERIC, 
  TYPE_CONVERSION_STRING 
} from "src/constants";
import { TupleToUnion } from "src/types";

/**
 * **TypeTransformOp_Atomic**
 * 
 * The **atomic** types of type transformation operations available in `MapType`,
 * `ConvertType`, and `TypeMapRule`.
 */
export type TypeTransformOp_CrossType = TupleToUnion<typeof TYPE_CONVERSION_CROSS_TYPE>;

/**
 * **TypeTransformOp_Atomic**
 * 
 * The **atomic** types of type transformation operations available in `MapType`,
 * `ConvertType`, and `TypeMapRule`.
 */
export type TypeTransformOp_String = TupleToUnion<typeof TYPE_CONVERSION_STRING>;
export type TypeTransformOp_Numeric = TupleToUnion<typeof TYPE_CONVERSION_NUMERIC>;

/**
 * **TypeTransformOp**
 * 
 * The types of type transformation operations available in `MapType`, `ConvertType`,
 * and `TypeMapRule`.
 */
export type TypeTransformOp = 
| TypeTransformOp_CrossType
| TypeTransformOp_Numeric
| TypeTransformOp_String;
