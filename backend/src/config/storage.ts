import fs from 'fs';
import path from 'path';

const storageRoot = path.resolve(process.env.STORAGE_DIR ?? path.join(process.cwd(), 'storage'));
const screenshotDir = path.join(storageRoot, 'screenshots');
const mockupDir = path.join(storageRoot, 'mockups');

export const storagePaths = {
  root: storageRoot,
  screenshots: screenshotDir,
  mockups: mockupDir,
};

export function ensureStorageStructure(): void {
  fs.mkdirSync(storageRoot, { recursive: true });
  fs.mkdirSync(screenshotDir, { recursive: true });
  fs.mkdirSync(mockupDir, { recursive: true });
}
