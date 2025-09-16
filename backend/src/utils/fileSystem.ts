import fs from 'fs';
import path from 'path';

export function ensureWithinDirectory(root: string, candidate: string): string {
  const normalizedRoot = path.resolve(root);
  const normalized = path.normalize(candidate).replace(/^([/\\])+/, '');
  const resolved = path.resolve(normalizedRoot, normalized);
  if (!(resolved === normalizedRoot || resolved.startsWith(`${normalizedRoot}${path.sep}`))) {
    throw new Error('Attempt to access file outside of storage directory.');
  }
  return resolved;
}

export async function readFileAsBase64(filePath: string): Promise<string> {
  const buffer = await fs.promises.readFile(filePath);
  return buffer.toString('base64');
}
