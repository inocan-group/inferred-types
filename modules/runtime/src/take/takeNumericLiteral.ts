import { createTakeFunction } from "src/take/create";

export const takeStringToken = createTakeFunction("start-end")
    .startEndMarkers({
        "`": "`",
        "'": "'",
        '"': '"'
    }).options({
        handler(str) {
            return str
        }
    })
