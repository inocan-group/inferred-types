export type OldSchoolHtmlElement =
| "b"
| "center"
| "u"
| "big"
| "small"
| "strong"
;

export type EsotericHtmlElement =
| OldSchoolHtmlElement
| "base"
| "bdi"
| "bdo"
| "datalist"
| "dd"
| "del"
| "dir"
| "dl"
| "dt"
| "fencedframe"
| "ins"
| "kbd"
| "nobr"
| "noembed"
| "rb"
| "rt"
| "rtc"
| "ruby"
| "s"
| "samp"
| "map"
| "marquee"
| "meter"
| "noframes"
| "object"
| "param"
| "portal"
| "q"
| "sub"
| "sup"
| "tt"
| "track"
| "var"
| "wbr"
| "xmp";


export type HtmlTableElement =
| "col"
| "colgroup"
| "hgroup"
| "table"
| "tbody"
| "td"
| "tfoot"
| "th"
| "thead"
| "time"
| "tr";


export type HtmlSymantecElement =
| "abbr"
| "acronym"
| "address"
| "area"
| "article"
| "aside"
| "blockquote"
| "caption"
| "cite"
| "details"
| "dfn"
| "dialog"
| "fieldset"
| "figure"
| "figcaption"
| "header"
| "footer"
| "legend"
| "nav"
| "menu"
| "search"
| "summary"
| "section"

;

export type HtmlInputElement =
| "button"
| "form"
| "label"
| "optgroup"
| "option"
| "select"
| "input"
| "textarea"
;

export type HtmlFunctionalElement =
| "a"
| "br"
| "canvas"
| "code"
| "data"
| "embed"
| "em"
| "font"
| "hr"
| "i"
| "iframe"
| "img"
| "mark"
| "strike"
| "progress"
| "p"
| "picture"
| "plaintext"
| "pre"
;

export type HtmlMediaElement =
| "audio"
| "video"
;

export type HtmlFrameworkElement =
| "template"
| "slot";


export type HtmlStructuralElement =
| "div"
| `h${"1" | "2" | "3" | "4" | "5" | "6"}`
| "frame"
| "frameset"
| "html"
| "head"
| "span"
;

export type HtmlListElement =
| "li"
| "ol"
| "ul"
;

export type HtmlHeaderElement =
| "meta"
| "link"
| "noscript"
| "script"
| "title"
| "style"
| "source"
;

export type HtmlBodyElement =
| "body"
| "main"
| HtmlListElement
| HtmlStructuralElement
| HtmlSymantecElement
| HtmlMediaElement
| HtmlInputElement
| HtmlFunctionalElement
| HtmlFrameworkElement
| HtmlTableElement;

/**
 * Combines all _common_ HTML tags for both
 * the header and body of an HTML page.
 *
 * **Related:**
 * - `HtmlElement` _(all including esoteric)_
 * - `HtmlHeaderElement`
 * - `HtmlBodyElement`
 */
export type CommonHtmlElement =
| HtmlHeaderElement
| HtmlBodyElement;


/**
 * All HTML elements.
 *
 * **Related:**
 * - `CommonHtmlElement` _(just the most common elements)_
 * - `HtmlHeaderElement`, `HeaderBodyElement`
 */
export type HtmlElement =
  | CommonHtmlElement
  | EsotericHtmlElement;

