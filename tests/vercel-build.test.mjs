import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

void test('Vercel build emits a Next.js production bundle', () => {
  rmSync('.next', { recursive: true, force: true });

  const result = spawnSync('npm run build:vercel', {
    encoding: 'utf8',
    shell: true,
    env: { ...process.env },
  });

  assert.equal(
    result.status,
    0,
    `${result.stdout}\n${result.stderr}`,
  );
  assert.ok(existsSync('.next/server'), 'missing Next.js server output');
  assert.ok(existsSync('.next/static'), 'missing Next.js static output');
});
