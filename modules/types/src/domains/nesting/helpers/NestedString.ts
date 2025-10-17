/**
 * **NestedString**
 *
 * A hierarchical representation of a string which uses
 * a `Nesting` configuration to determine when to move up
 * and down the hierarchy.
 *
 * - a root node will be level 0
 * - root nodes will always have `null` for both _enter_ and _exit_
 * characters
 * - only the origin node in a `NestedString` will be at level 0
 * - child nodes which have an `enter` character but no `exit`
 * character are considered "unbalanced"
 * - you can test if a node or any of their children are _unbalanced_
 * with the `IsBalanced<T>` utility.
 */
export type NestedString = {
    content: string;
    enterChar: string | null;
    exitChar: string | null;
    children: NestedString[];
    level: number;
};
