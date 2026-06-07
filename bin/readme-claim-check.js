#!/usr/bin/env node

import process from 'node:process';
import { runCli } from '../src/cli.js';

const exitCode = await runCli(process.argv.slice(2), process.cwd(), process.stdout, process.stderr);
process.exit(exitCode);
