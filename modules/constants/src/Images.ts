type Url = `http${string}`;

interface Format {
    ext: string;
    webFormat: boolean;
    name?: string;
    info?: Url;
    other_ext: string[];
}

export const IMAGE_FORMAT_LOOKUP = [
    { ext: "jpg", webFormat: true, other_ext: ["jpeg"] },
    { ext: "png", webFormat: true, other_ext: [] },
    { ext: "gif", webFormat: true, other_ext: [] },
    { ext: "heif", webFormat: true, other_ext: [] },
    { ext: "svg", webFormat: true, other_ext: [] },
    { ext: "raw", webFormat: false, other_ext: [] },
    { ext: "dng", webFormat: false, other_ext: [] },
    { ext: "avif", webFormat: true, other_ext: [] },
    { ext: "webp", webFormat: true, other_ext: [] },
    { ext: "tiff", webFormat: false, other_ext: ["tif"] },
] as const satisfies Format[];
