import path from 'path';
import fs from 'fs';

export interface AppConfig {
  context_path: string;
  server_port: number;
  log_dir: string;
  jwt_secret_key: string;
  jwt_max_age: number;
}

export default JSON.parse(fs.readFileSync(path.resolve(__dirname, 'app.config.json'), 'utf-8')) as AppConfig;
