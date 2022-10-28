import path from 'path';
import fs from 'fs';

export default fs.readFileSync(path.resolve(__dirname, 'schema.graphql'), 'utf-8').toString();