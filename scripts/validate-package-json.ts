import {validate} from "package-json-validator";
import rootPackage from "../package.json";
import typesPackage from "../modules/types/package.json";
import runtimePackage from "../modules/runtime/package.json"
import constantsPackage from "../modules/constants/package.json"
import inferredPackage from "../modules/inferred-types/package.json"

type Validation = ReturnType<typeof validate>;

function showErrors(err: Validation["errors"]) {
    if(!err) {
        return;
    }

    for (const e of err) {
        console.log(`\t${e.field}: ${e.message}`)
    }

}

const root = validate(rootPackage);
const typesModule = validate(typesPackage);
const runtimeModule = validate(runtimePackage);
const constantsModule = validate(constantsPackage);
const inferredModule = validate(inferredPackage);
console.log();

let failed: boolean = false;

if(root.valid) {
    console.log("./package.json\t\t\t\t✅");
} else {
    console.log("./package.json\t\t\t\t❌");
    failed = true;
    showErrors(root.errors);
}

if(constantsModule.valid) {
    console.log("./modules/constants/package.json\t✅");
} else {
    console.log("./modules/constants/package.json\t❌");
    failed = true;
    showErrors(constantsModule.errors);
}

if(typesModule.valid) {
    console.log("./modules/types/package.json\t\t✅");
} else {
    console.log("./modules/types/package.json\t\t❌");
    failed = true;
    showErrors(typesModule.errors);
}

if(runtimeModule.valid) {
    console.log("./modules/runtime/package.json\t\t✅");
} else {
    console.log("./modules/runtime/package.json\t\t❌");
    failed = true;
    showErrors(runtimeModule.errors);
}

if(inferredModule.valid) {
    console.log("./modules/inferred-types/package.json\t✅");
} else {
    console.log("./modules/inferred-types/package.json\t❌");
    failed = true;
    showErrors(inferredModule.errors);
}
console.log()

if (failed) {
    process.exit(1);
} else {
    process.exit(0);
}
