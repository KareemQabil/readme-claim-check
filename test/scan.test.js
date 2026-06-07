import test from 'node:test';
import assert from 'node:assert/strict';
import { scanText } from '../src/scan.js';

test('scanText returns findings for risky claims', () => {
  const findings = scanText([
    '# Example',
    'Production-ready ERP platform',
    'Best-in-class reporting engine',
  ].join('\n'));

  assert.equal(findings.length, 2);
  assert.equal(findings[0].ruleId, 'production-ready');
  assert.equal(findings[1].ruleId, 'best-in-class');
});

test('scanText returns empty array for neutral wording', () => {
  const findings = scanText('Internal dashboard for inventory workflows');
  assert.deepEqual(findings, []);
});
