import type { Ref } from "vue";


/**
 * Intended to be the same type as VueJS's `Ref<T>` but without the need
 * to include any of the VueJS framework in deps.
 */
export type VueRef<T = unknown> = Ref<T>;

