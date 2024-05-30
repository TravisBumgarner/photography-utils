import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import * as exifr from 'exifr'
import { ParsedData } from './types';

/** Take in a filename and date and generate a unique hash identifying a photo. 
 * Theoretically this should be sufficient information to identify a photo uniquely 
 * */
export const generateUniqueHash = ({ filename, date }: { filename: string, date: string }): string => {
  const data: string = filename + date;
  const hashedData: string = crypto.createHash('sha256').update(data).digest('hex');

  return hashedData;
}

export const walkDirectoryRecursivelyAndHash = async (dir: string, fileLookup: Record<string, string>): Promise<void> => {
  const files = fs.readdirSync(dir);
  for (const filename of files) {
    const filePath = path.join(dir, filename);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      await walkDirectoryRecursivelyAndHash(filePath, fileLookup);
    } else {
      const data = await exifr.parse(filePath) as ParsedData;

      const hash = generateUniqueHash({ filename, date: data.DateTimeOriginal });
      fileLookup[hash] = filePath; // Add to lookup
    }
  }
}