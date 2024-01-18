import * as Get from "./Get";
import * as Keys from "./Keys";
import * as AsArray from "./AsArray";
import * as Pluralize from "./Pluralize";

const tests = {Get,Keys,AsArray,Pluralize};


for (const key in tests) {
  if(tests[key].test) {
    if(tests[key].TARGET) {
      console.log(`\n- 🏃 Testing "${key}" [target: ${tests[key].TARGET}]\n`);
    } else {
      console.log(`\n- 🏃 Testing "${key}"\n`);
    }
    tests[key].test();
  } else {
    console.error(`- no test function found in "${key}"`);
  }
}
