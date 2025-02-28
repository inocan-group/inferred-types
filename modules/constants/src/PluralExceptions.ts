/**
 * **PLURAL_EXCEPTIONS**
 *
 * An array of tuples of the form `[singular, plural]`.
 */
export const PLURAL_EXCEPTIONS_OLD = [
    ["photo", "photos"],
    ["piano", "pianos"],
    ["halo", "halos"],
    ["foot", "feet"],
    ["man", "men"],
    ["woman", "women"],
    ["person", "people"],
    ["mouse", "mice"],
    ["series", "series"],
    ["sheep", "sheep"],
    ["money", "monies"],
    ["deer", "deer"],

] as const;

/**
 * **PluralExceptions**
 *
 * A dictionary of key/value pairs which map singular words to their
 * plural counterpart. This can be used in conjunction with the the
 * `pluralize()` and `Pluralize<T>` utilities to extend the known
 * irregular conversions.
 */
export type PluralExceptions = Record<string, string>;

/**
 * **PLURAL_EXCEPTIONS**
 *
 * A lookup table that maps singular words to their _plural_ counterpart.
 */
export const PLURAL_EXCEPTIONS = {
    photo: "photos",
    piano: "pianos",
    halo: "halos",
    foot: "feet",
    man: "men",
    woman: "women",
    person: "people",
    mouse: "mice",
    series: "series",
    sheep: "sheep",
    money: "monies",
    deer: "deer",
    goose: "geese",
    child: "children",
    tooth: "teeth",
    ox: "oxen",
    basis: "bases",
    radius: "radii",
    syllabus: "syllabi",
    ice: "ice",
    fish: "fish",
    means: "means",
    phenomenon: "phenomena",
    criterion: "criteria",
    datum: "data",
    memorandum: "memoranda",
    bacterium: "bacteria",
    stratum: "strata",
    curriculum: "curricula",
    index: "indices",
    appendix: "appendices",
    vortex: "vortices",
    bison: "bison",
    axis: "axes",
    antenna: "antennas",
    cactus: "cacti",
    corpus: "corpora",
    beau: "beaux",
    die: "dice",
    ellipsis: "ellipses",
    erratum: "errata",
    focus: "foci",
    formula: "formulas",
    fungus: "fungi",
    genus: "genera",
    graffito: "graffiti",
    grouse: "grouses",
    half: "halves",
    hoof: "hooves",
    hypothesis: "hypothesis",
    larva: "larvae",
    libretto: "libretti",
    loaf: "loaves",
    locus: "loci",
    medium: "mediums",
    minutia: "minutiae",
    nucleus: "nuclei",
    oasis: "oases",
    opus: "opuses",
    ovum: "ova",
    parenthesis: "parentheses",
    phylum: "phyla",
    quiz: "quizzes",
    referendum: "referendums",
    self: "selves",
    species: "species",
    stimulus: "stimuli",
    swine: "swine",
    synopsis: "synopses",
    thesis: "theses",
    thief: "thieves",
    vertex: "vertexes",
    wife: "wives",
    wolf: "wolves",
} as const;
