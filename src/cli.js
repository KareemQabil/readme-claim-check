import fs from 'node:fs';
import path from 'node:path';
import { scanText } from './scan.js';

function printHelp(stream) {
  stream.write(
    [
      'Usage: readme-claim-check <path> [--json] [--fail-on-findings]',
      '',
      'If <path> is a directory, README.md inside that directory is scanned.',
    ].join('\n') + '\n'
  );
}

function parseArgs(args) {
  const options = {
    target: 'README.md',
    asJson: false,
    failOnFindings: false,
    help: false,
  };

  for (const arg of args) {
    if (arg === '--json') {
      options.asJson = true;
      continue;
    }

    if (arg === '--fail-on-findings') {
      options.failOnFindings = true;
      continue;
    }

    if (arg === '--help' || arg === '-h') {
      options.help = true;
      continue;
    }

    options.target = arg;
  }

  return options;
}

function resolveTarget(cwd, target) {
  const candidate = path.resolve(cwd, target);

  if (!fs.existsSync(candidate)) {
    throw new Error(`Target not found: ${candidate}`);
  }

  const stats = fs.statSync(candidate);
  if (stats.isDirectory()) {
    const readmePath = path.join(candidate, 'README.md');
    if (!fs.existsSync(readmePath)) {
      throw new Error(`README.md not found in directory: ${candidate}`);
    }
    return readmePath;
  }

  return candidate;
}

export async function runCli(args, cwd, stdout, stderr) {
  const options = parseArgs(args);

  if (options.help) {
    printHelp(stdout);
    return 0;
  }

  try {
    const targetPath = resolveTarget(cwd, options.target);
    const text = fs.readFileSync(targetPath, 'utf8');
    const findings = scanText(text);

    if (options.asJson) {
      stdout.write(
        JSON.stringify(
          {
            file: targetPath,
            findings,
          },
          null,
          2
        ) + '\n'
      );
    } else if (findings.length === 0) {
      stdout.write(`No risky claims found in ${path.basename(targetPath)}\n`);
    } else {
      stdout.write(`Found ${findings.length} risky claim(s) in ${path.basename(targetPath)}\n\n`);
      for (const finding of findings) {
        stdout.write(`[${finding.ruleId}] line ${finding.line}\n`);
        stdout.write(`  ${finding.text}\n\n`);
      }
    }

    return findings.length > 0 && options.failOnFindings ? 1 : 0;
  } catch (error) {
    stderr.write(`${error.message}\n`);
    return 1;
  }
}
