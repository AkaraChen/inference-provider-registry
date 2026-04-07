import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const providersDir = path.join(__dirname, 'providers');
const outputFile = path.join(__dirname, 'registry.json');

const result = {};

fs.readdirSync(providersDir)
  .filter(file => file.endsWith('.json') && file !== 'schema.json')
  .forEach(file => {
    const filePath = path.join(providersDir, file);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const key = file.replace('.json', '');

    if (content.$schema) {
      delete content.$schema;
    }

    result[key] = content;
  });

fs.writeFileSync(outputFile, JSON.stringify(result, null, 2));
console.log(`Generated ${outputFile}`);
