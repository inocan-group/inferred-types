import * as Get from "./Get";
import * as Keys from "./Keys";
import * as AsArray from "./AsArray";
import * as Pluralize from "./Pluralize";
import * as First from "./First";
import * as AfterFirst from "./AfterFirst";
import * as LessThan from "./LessThan";
import * as GreaterThan from "./GreaterThan";
import chalk from "chalk";

const tests = {
  First, AfterFirst, Get,Keys,AsArray,Pluralize, LessThan, GreaterThan
};

// function t(name: string, target: number) {
//   return <F extends (() => unknown)>(fn: F) => {
//     console.log(`\n- 🏃 testing benchmark for ${chalk.bold.blue(name)} utility  [target: ${target}]\n`);
//     bench(name, fn).types([target, "instantiations"]);
//   }
// } 

// const fn = () =>{ return {} as AfterFirst<["foo","bar","baz"]> };

// t(`AfterFirst<["foo","bar","baz"]>`, 500)(() =>{ return {} as AfterFirst<["foo","bar","baz"]> })


for (const key in tests) {
  if(tests[key].test) {
    if(tests[key].TARGET) {
      console.log(`\n- 🏃 Testing ${chalk.bold.blue(key)} [${chalk.italic("target:")} ${tests[key].TARGET}]\n`);
    } else {
      console.log(`\n- 🏃 Testing "${chalk.bold.blue(key)}"\n`);
    }
    tests[key].test();
  } else {
    console.error(`- no test function found in ${chalk.bold.red(key)}`);
  }
}
