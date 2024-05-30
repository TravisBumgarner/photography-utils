import fs from "fs";
import os from 'os';
import path from 'path';
import { Cache, CacheRunType } from './types.js';

const FILENAME = 'cache.json';
const DIRECTORY = '.social-media-photo-tagging';

export const cacheData = (data: Cache) => {
  const cacheDir = path.join(os.homedir(), DIRECTORY);
  fs.mkdirSync(cacheDir, { recursive: true });
  const cacheFile = path.join(cacheDir, FILENAME);
  fs.writeFileSync(cacheFile, JSON.stringify(data));
}

const EMPTY_CACHE: Cache = {
  directory: null,
}

export const readCache = async (): Promise<Cache> => {
  const cacheFile = path.join(os.homedir(), DIRECTORY, FILENAME);
  try {
    const data = fs.readFileSync(cacheFile, 'utf-8');
    const parsedData = JSON.parse(data);

    try {
      return CacheRunType.check(parsedData)
    } catch (err) {
      return structuredClone(EMPTY_CACHE);
    }

  } catch (err) {
    return structuredClone(EMPTY_CACHE);
  }
}

export const copyFile = (
  { sourceDirectory, destinationDirectory, file }: { sourceDirectory: string, destinationDirectory: string, file: string }) => {
  fs.mkdirSync(path.dirname(destinationDirectory), { recursive: true });
  console.log('huh,', { sourceDirectory, destinationDirectory, file })
  fs.copyFileSync(path.join(sourceDirectory, file), path.join(destinationDirectory, file));
}

export function verifyDirectoryExists(directoryPath: string): boolean {
  return fs.existsSync(directoryPath);
}

export function createDirectory(directory: string): void {
  fs.mkdirSync(directory, { recursive: true });
}

export function verifyDirectoryIsEmpty(directory: string): boolean {
  return fs.readdirSync(directory, { withFileTypes: true }).length === 0;
}