import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const expectedWorkspaces = [
  'apps/web',
  'apps/api',
  'apps/worker',
  'packages/core',
  'packages/contracts',
  'packages/knowledge',
  'packages/db',
  'packages/ui',
  'packages/config',
];

async function readJson(relativePath) {
  return JSON.parse(await readFile(path.join(root, relativePath), 'utf8'));
}

test('root package declares the nine intended workspaces and required commands', async () => {
  const pkg = await readJson('package.json');
  assert.deepEqual(pkg.workspaces, ['apps/*', 'packages/*']);
  for (const script of ['test', 'typecheck', 'build', 'check']) {
    assert.equal(typeof pkg.scripts[script], 'string', `missing ${script} script`);
  }
  for (const workspace of expectedWorkspaces) {
    await assert.doesNotReject(access(path.join(root, workspace)), `missing ${workspace}`);
    await assert.doesNotReject(access(path.join(root, workspace, 'package.json')), `missing ${workspace}/package.json`);
    const member = await readJson(`${workspace}/package.json`);
    assert.ok(member.name, `${workspace} needs a package name`);
    assert.equal(member.private, true, `${workspace} should be private`);
  }
});

test('workspace entrypoints and package TypeScript configs are present', async () => {
  for (const workspace of expectedWorkspaces) {
    const pkg = await readJson(`${workspace}/package.json`);
    assert.ok(pkg.exports?.['.'], `${workspace} must export its root entrypoint`);
    const exportRoot = pkg.exports['.'];
    const source = typeof exportRoot === 'string'
      ? exportRoot
      : exportRoot.types ?? exportRoot.import ?? exportRoot.default;
    assert.ok(source, `${workspace} root export needs a source target`);
    const resolved = path.join(root, workspace, source);
    await assert.doesNotReject(access(resolved), `missing exported entrypoint ${workspace}/${source}`);
    await assert.doesNotReject(access(path.join(root, workspace, 'tsconfig.json')), `missing ${workspace}/tsconfig.json`);
  }
});

test('compiled workspace entrypoints are loadable modules', async () => {
  for (const workspace of expectedWorkspaces) {
    const entrypoint = path.join(root, 'dist', workspace, 'src', 'index.js');
    const module = await import(`${pathToFileURL(entrypoint).href}?workspace=${workspace}`);
    assert.ok(module && typeof module === 'object', `${workspace} did not load as an ES module`);
  }
});

test('runtime configuration fails closed on missing values and preserves supplied values', async () => {
  const { readRuntimeConfig } = await import(
    `${pathToFileURL(path.join(root, 'dist/packages/config/src/index.js')).href}?runtime-config`
  );
  assert.throws(() => readRuntimeConfig({}), /Missing required configuration: DATABASE_URL/);
  const env = {
    DATABASE_URL: 'postgres://db.example/monolith',
    ORIGINAL_STORAGE_ENDPOINT: 'https://storage.example',
    ORIGINAL_STORAGE_BUCKET: 'originals',
    EXTRACTOR_PROVIDER: 'configured-extractor',
    EMBEDDING_PROVIDER: 'configured-embeddings',
  };
  assert.deepEqual(readRuntimeConfig(env), {
    databaseUrl: env.DATABASE_URL,
    originalStorage: { endpoint: env.ORIGINAL_STORAGE_ENDPOINT, bucket: env.ORIGINAL_STORAGE_BUCKET },
    providers: { extractor: env.EXTRACTOR_PROVIDER, embeddings: env.EMBEDDING_PROVIDER },
  });
});

test('root TypeScript config typechecks all package sources and build config emits', async () => {
  const tsconfig = await readJson('tsconfig.json');
  assert.equal(tsconfig.compilerOptions.noEmit, true);
  assert.deepEqual(tsconfig.exclude, ['node_modules', 'apps/**/dist', 'packages/**/dist']);
  const build = await readJson('tsconfig.build.json');
  assert.notEqual(build.compilerOptions.noEmit, true);
  assert.notEqual(build.compilerOptions.composite, true);
  assert.deepEqual(build.include, ['apps/*/src/**/*', 'packages/*/src/**/*']);
});
