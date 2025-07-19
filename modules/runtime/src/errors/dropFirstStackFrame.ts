/**
 * Drops the first stack frame line from `err.stack` in-place (if possible).
 * Returns the same error for chaining.
 *
 * Definition of “first frame”: the first line that *starts* with whitespace
 * then 'at ' (V8 / Node / most Chromium) OR matches Firefox style like
 * `functionName@file:line:col`.
 */
export function dropFirstStackFrame<T extends Error>(err: T): T {
    if (!err || typeof err.stack !== "string") {
        return err;
    }

    const lines = err.stack.split(/\r?\n/);

    if (lines.length <= 1) {
        return err; // nothing to trim
    }

    // Usually line[0] = "Error: message"
    // Starting from line[1], find the *first* frame and remove exactly one.
    // But be defensive: sometimes extra blank lines appear.
    const frameIdx = lines.findIndex((l, i) => {
        if (i === 0) return false;
        // V8 style: "    at func (file:line:col)" or "    at file:line:col"
        if (/^\s*at\s+/.test(l)) return true;
        // Firefox style: "func@file:line:col" or "@file:line:col"
        if (/^[^\s]*@.+:\d+:\d+$/.test(l)) return true;
        return false;
    });

    if (frameIdx > 0) {
        lines.splice(frameIdx, 1);
        err.stack = lines.join("\n");
    }

    return err;
}
