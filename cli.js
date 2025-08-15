import path from "path";
import chalk from "chalk";
import { scanFolder } from "./scanner/scan.js";

function pad(n) { return n.toString().padStart(2, "0"); }

async function main() {
  const target = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();
  console.log(chalk.cyan(`🔎 CodeGuard scanning: ${target}\n`));

  const { score, counts, results } = await scanFolder(target);

  for (const r of results) {
    console.log(chalk.bold(`\n📄 ${r.file}`));
    for (const f of r.findings.slice(0, 50)) {
      const color = f.severity === "high" ? chalk.red
                  : f.severity === "medium" ? chalk.yellow
                  : chalk.gray;
      console.log(
        `  ${color(`[${f.severity.toUpperCase()}]`)} ${chalk.white(f.title)} (L${f.line})`
      );
      console.log(`     ${chalk.dim(f.message)}`);
      console.log(`     ${chalk.gray(f.excerpt)}`);
    }
  }

  console.log(chalk.bold(`\n🧮 Aggregate risk score: ${score}/100`));
  console.log(`   High: ${counts.high}  Medium: ${counts.medium}  Low: ${counts.low}\n`);
  process.exit(0);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
