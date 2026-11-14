// Runs Vitest from a working directory with an upper-case drive letter.
//
// On Windows, a terminal opened as "d:\project" instead of "D:\project" makes
// Vitest load two copies of itself, and every test file then fails with
// "Cannot read properties of undefined (reading 'config')".
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const upperDrive = (path) => path.replace(/^[a-z](?=:)/, (drive) => drive.toUpperCase());

const cwd = upperDrive(process.cwd());
const cli = upperDrive(fileURLToPath(new URL('../node_modules/vitest/vitest.mjs', import.meta.url)));

const result = spawnSync(process.execPath, [cli, ...process.argv.slice(2)], { cwd, stdio: 'inherit' });
process.exit(result.status ?? 1);
