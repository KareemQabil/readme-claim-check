# readme-claim-check

CLI for flagging risky README claims before they end up on a public GitHub profile or repo.

This tool is meant for situations where a project README starts making statements like:

- `production-ready`
- `fully compliant`
- `enterprise-grade`
- `battle-tested`
- `secure by default`

Those statements may be true, but they should be intentional and backed by evidence. This CLI helps catch them before publishing.

## Why it exists

Public README files often become marketing copy by accident. `readme-claim-check` is a small safety pass for maintainers who want stricter public-facing language.

## Features

- Scans a target README or markdown file
- Reports risky claims with line numbers and matched text
- Supports human-readable and JSON output
- Can fail CI with `--fail-on-findings`
- Uses zero runtime dependencies

## Usage

```bash
node ./bin/readme-claim-check.js README.md
node ./bin/readme-claim-check.js ./docs/project-overview.md --json
node ./bin/readme-claim-check.js . --fail-on-findings
```

If the target is a directory, the tool looks for `README.md` inside it.

## Example output

```text
Found 2 risky claim(s) in README.md

[production-ready] line 8
  Production-ready ERP platform for all business sizes.

[compliance] line 14
  Full tax compliance with every local regulation.
```

## Flags

- `--json` Output structured JSON
- `--fail-on-findings` Exit with code `1` if any claims are found
- `--help` Show usage

## Development

```bash
npm test
```
