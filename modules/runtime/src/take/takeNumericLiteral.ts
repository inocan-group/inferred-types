import { createTakeFunction } from "runtime/take/create/createTakeFunction";

export const takeStringToken = createTakeFunction("start-end")
    .startEndMarkers({
        "`": "`",
        "'": "'",
        '"': '"'
    })
