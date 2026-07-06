import ts from "/Volumes/coding/inocan/inferred-types/node_modules/typescript/lib/typescript.js";
import { resolve } from "node:path";
const configPath = process.argv[2];
const target = process.argv[3];
const parsed = ts.getParsedCommandLineOfConfigFile(configPath, {}, {
  ...ts.sys,
  onUnRecoverableConfigFileDiagnostic: d => { throw new Error(ts.flattenDiagnosticMessageText(d.messageText, "\n")); }
});
const t0 = performance.now();
const program = ts.createProgram({ rootNames: parsed.fileNames, options: parsed.options });
const t1 = performance.now();
const file = program.getSourceFile(resolve(target));
const checker = program.getTypeChecker();
const diags = [...program.getSyntacticDiagnostics(file), ...program.getSemanticDiagnostics(file)];
const t2 = performance.now();
console.log(JSON.stringify({
  target: target.split("/").pop(),
  programMs: Math.round(t1-t0), checkMs: Math.round(t2-t1),
  instantiations: checker.getInstantiationCount?.() ?? -1,
  typeCount: checker.getTypeCount?.() ?? -1,
  heapMB: Math.round(process.memoryUsage().heapUsed/1048576),
  rssMB: Math.round(process.memoryUsage().rss/1048576),
  errors: diags.length,
  firstError: diags[0] ? ts.flattenDiagnosticMessageText(diags[0].messageText," ").slice(0,150) : null
}));
