/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
  Container, 
  ContainerBlockKey, 
  IfContains, 
  IndexOf, 
  Key, 
  Keys, 
  Narrowable
} from "src/types";

export const ifHasKey = <
  TContainer extends Container,
  TKey extends Key,
  IF extends Narrowable,
  ELSE extends Narrowable
>(
  container: TContainer, 
  key: TKey,
  hasKey: (val: IndexOf<TContainer, TKey>) => IF,
  doesNotHaveKey: <N extends ContainerBlockKey<TContainer, TKey>>(nonArr: N) => ELSE
): IfContains<Keys<TContainer>, TKey, IF, ELSE> => ifHasKey(
  container, key,
  hasKey(indexOf(container, key)),
  doesNotHaveKey(container as ContainerBlockKey<TContainer, TKey>)
);

