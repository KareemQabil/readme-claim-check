import { claimRules } from './claim-rules.js';

export function scanText(text) {
  const findings = [];
  const lines = text.split(/\r?\n/);

  for (const [index, line] of lines.entries()) {
    for (const rule of claimRules) {
      if (rule.expression.test(line)) {
        findings.push({
          ruleId: rule.id,
          line: index + 1,
          text: line.trim(),
        });
      }
    }
  }

  return findings;
}
