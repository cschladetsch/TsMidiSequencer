import fs from 'node:fs/promises';
import path from 'node:path';
import Ajv from 'ajv';

const root = process.cwd();

const pairs = [
  {
    schema: 'schema/pattern.schema.json',
    example: 'examples/pattern-example.json'
  },
  {
    schema: 'schema/state.schema.json',
    example: 'examples/state-example.json'
  }
];

async function loadJson(relPath) {
  const fullPath = path.join(root, relPath);
  const raw = await fs.readFile(fullPath, 'utf8');
  return JSON.parse(raw);
}

async function main() {
  const ajv = new Ajv({ allErrors: true, strict: false });
  let ok = true;

  for (const { schema, example } of pairs) {
    const schemaJson = await loadJson(schema);
    const exampleJson = await loadJson(example);
    const validate = ajv.compile(schemaJson);
    const valid = validate(exampleJson);

    if (!valid) {
      ok = false;
      console.error(`FAIL ${example} against ${schema}`);
      console.error(validate.errors);
    } else {
      console.log(`OK   ${example} against ${schema}`);
    }
  }

  if (!ok) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
