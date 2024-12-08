
/**
 * **Thenable**`<T>`
 *
 * An object which resembles a promise and is guarenteed to provide a `.then` and `.catch`
 * callback hook.
 */
export type Thenable =  {
  then: (...args: any[]) => any;
  finally?: (...args: any[]) => any
}
