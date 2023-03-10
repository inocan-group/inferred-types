import { 
  Container, 
  KeyFor, 
  ContainerKeyGuarantee,
} from "src/types";

/**
 * **ensureKey**(container) => (key, [type]) => <container w/ key>
 * 
 * Runtime utility which ensures that a particular key is available on
 * a _container_ type. It is a higher-order utility which is applied as:
 * 
 * 1. Provide the **container** to work on
 * 2. Provide the **key** which will be allows on this container; you may optionally also specify a _type_ but by default this is just set as `unknown`
 * - note that _if_ `TContainer` does have this property
 */
export const ensureKey = <
  TContainer extends Container
>(container: TContainer) => <
  TKey extends KeyFor<TContainer>
// eslint-disable-next-line @typescript-eslint/no-unused-vars
>(key: TKey) => container as ContainerKeyGuarantee<TContainer, TKey>;


