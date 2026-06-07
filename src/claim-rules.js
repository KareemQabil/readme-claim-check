export const claimRules = [
  {
    id: 'production-ready',
    expression: /\bproduction[- ]ready\b/i,
  },
  {
    id: 'compliance',
    expression: /\b(fully\s+)?(?:vat|tax|zatca|gdpr|iso|soc ?2|pci)[- ]?(?:compliant|ready|certified)?\b/i,
  },
  {
    id: 'enterprise-grade',
    expression: /\benterprise[- ]grade\b/i,
  },
  {
    id: 'battle-tested',
    expression: /\bbattle[- ]tested\b/i,
  },
  {
    id: 'secure-by-default',
    expression: /\bsecure by default\b/i,
  },
  {
    id: 'zero-bugs',
    expression: /\bzero bugs?\b/i,
  },
  {
    id: 'best-in-class',
    expression: /\bbest[- ]in[- ]class\b/i,
  },
];
