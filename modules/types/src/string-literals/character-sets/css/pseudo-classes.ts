// DISPLAY

/**
 * CSS Pseudo Classes for [Display State](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes#element_display_state_pseudo-classes).
 */
export type CssDisplayStatePseudoClasses
    = | ":fullscreen"
    | ":modal"
    | ":picture-in-picture";

// INPUT

/**
 * CSS Pseudo Classes for [Input Elements](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes#input_pseudo-classes).
 *
 * These pseudo-classes relate to form elements, and enable selecting elements based
 * on HTML attributes and the state that the field is in before and after interaction.
 */
export type CssInputPseudoClasses
    = | ":autofill"
    | ":enabled"
    | ":disabled"
    | ":readonly-only"
    | ":read-write"
    | ":placeholder-shown"
    | ":default"
    | ":checked"
    | ":indeterminate"
    | ":blank"
    | ":valid"
    | ":invalid"
    | ":in-range"
    | ":out-of-range"
    | ":required"
    | ":optional"
    | ":user-valid"
    | ":user-invalid";

/**
 * CSS Pseudo Classes for [Linguistic Elements](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes#linguistic_pseudo-classes).
 * These pseudo-classes reflect the document language and enable the selection of
 * elements based on language or script direction.
 */
export type CssLinguisticPseudoClasses
    = | ":dir"
    | ":lang";

/**
 * CSS Pseudo Classes for [Locational Elements](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes#location_pseudo-classes).
 *
 * These pseudo-classes relate to links, and to targeted elements within the
 * current document.
 */
export type CssLocationPseudoClasses
    = | ":any-link"
    | ":link"
    | ":visited"
    | ":local-link"
    | ":target"
    | ":target-within"
    | ":scope";

/**
 * CSS Pseudo Classes for [Resource State](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes#resource_state_pseudo-classes).
 *
 * These pseudo-classes apply to media that is capable of being in a state where it
 * would be described as playing, such as a video.
 */
export type CssResourceStatePseudoClasses
    = | ":playing"
    | ":paused";

/**
 * CSS Pseudo Classes for [Time Dimensional Elements](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes#input_pseudo-classes).
 *
 * These pseudo-classes apply when viewing something which has timing,
 * such as a [WebVTT](https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API) caption track.
 */
export type CssTimePseudoClasses
    = | ":current"
    | ":past"
    | ":future";

/**
 * CSS Pseudo Classes for [Tree Structural Elements](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes#tree-structural_pseudo-classes).
 *
 * These pseudo-classes relate to the location of an element within the
 * document tree.
 */
export type CssTreePseudoClasses
    = | ":root"
    | ":empty"
    | ":nth-child"
    | ":nth-last-child"
    | ":first-child"
    | ":last-child"
    | ":only-child"
    | ":nth-of-type"
    | ":nth-last-of-type"
    | ":first-of-type"
    | ":last-of-type"
    | ":only-of-type";

/**
 * CSS Pseudo Classes for [User Action Elements](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes#user_action_pseudo-classes).
 *
 * These pseudo-classes require some interaction by the user in order for them to
 * apply, such as holding a mouse pointer over an element.
 */
export type CssUserActionPseudoClasses
    = | ":hover"
    | ":active"
    | ":focus"
    | ":focus-visible"
    | ":focus-within";

/**
 * CSS Pseudo Classes for [Functional Elements](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes#functional_pseudo-classes).
 *
 * These pseudo-classes accept a [selector list](https://developer.mozilla.org/en-US/docs/Web/CSS/Selector_list)
 * or [forgiving selector list](https://developer.mozilla.org/en-US/docs/Web/CSS/Selector_list#forgiving_selector_list)
 * as a parameter.
 */
export type CssFunctionalPseudoClass
    = | ":is"
    | ":not"
    | ":where"
    | ":has";

/**
 * Any CSS [**Pseudo Class**](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes#functional_pseudo-classes).
 *
 * **Related:**
 * - `CssDisplayStatePseudoClasses`
 * - `CssFunctionalPseudoClass`
 * - `CssInputPseudoClasses`
 * - `CssLinguisticPseudoClasses`
 * - `CssLocationPseudoClasses`
 * - `CssResourceStatePseudoClasses`
 * - `CssTimePseudoClasses`
 * - `CssTreePseudoClasses`
 * - `CssUserActionPseudoClasses`
 */
export type CssPseudoClass
    = | CssDisplayStatePseudoClasses
    | CssFunctionalPseudoClass
    | CssInputPseudoClasses
    | CssLinguisticPseudoClasses
    | CssLocationPseudoClasses
    | CssResourceStatePseudoClasses
    | CssTimePseudoClasses
    | CssTreePseudoClasses
    | CssUserActionPseudoClasses;

/**
 * **CssPseudoClassDefn**
 *
 * A type which incorporates a definition of _all_ CSS pseudo classes.
 */
export type CssPseudoClassDefn<
    T extends CssPseudoClass = CssPseudoClass,
> = `${T}(${string})`;
