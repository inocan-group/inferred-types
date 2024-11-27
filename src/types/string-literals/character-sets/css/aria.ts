/**
* [**Document Structure Aria Roles**]([**Aria Role**](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles#1._document_structure_roles)
*/
export type AriaDocStructureRoles ="alert"
  | "toolbar"
  | "tooltip"
  | "feed"
  | "math"
  | "presentation"
  | "none"
  | "note";

export type AriaWidgetRoles = "scrollbar"
  | "searchbox"
  | "separator"
  | "slider"
  | "spinbutton"
  | "switch"
  | "tab"
  | "tabpanel"
  | "treeitem"
  | "combobox"
  | "grid"
  | "menu"
  | "menubar"
  | "tablist"
  | "tree"
  | "treegrid";

export type AriaLandmarkRoles = "banner"
  | "complementary"
  | "contentinfo"
  | "form"
  | "main"
  | "navigation"
  | "region"
  | "search";

export type AriaLiveRegionRoles = "alert"
| "log"
| "marquee"
| "status"
| "timer";

export type AriaWindowRoles = "alertdialog"
  | "dialog";


/**
* [**Aria Role**](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles)
* Includes roles from:
*   - `AriaDocStructureRoles`
*   - `AriaWidgetRoles`
*   - `AriaLandmarkRoles`
*   - `AriaLiveRegionRoles`
*
* > [Role definitions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles#roles_defined_on_mdn).
*/
export type AriaRole =
| AriaDocStructureRoles
| AriaWidgetRoles
| AriaLandmarkRoles
| AriaLiveRegionRoles
| AriaWindowRoles;
