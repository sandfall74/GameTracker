import { readFileSync } from 'node:fs';
import test from 'node:test';
import assert from 'node:assert/strict';

test('the frontend does not expose a VITE_RAWG_API_KEY in the browser bundle', () => {
  const source = readFileSync(new URL('./src/lib/api-client.ts', import.meta.url), 'utf8');

  assert.doesNotMatch(source, /VITE_RAWG_API_KEY/);
  assert.match(source, /baseURL:\s*["']\/api\/rawg["']/);
});
