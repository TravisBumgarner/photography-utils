import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';


export const generateUniqueHash = ({ filename, size }: { filename: string, size: string }): string => {
  const data: string = filename + size;
  const hashedData: string = crypto.createHash('sha256').update(data).digest('hex');

  return hashedData;
}


const walkDirectoryRecursivelyAndHash = async (
  dir: string,
  fileLookup: Record<string, string>,
  triggerRerender: () => void,
  activeCount: React.MutableRefObject<number>
): Promise<void> => {
  const files = fs.readdirSync(dir);
  for (const filename of files) {
    const filePath = path.join(dir, filename);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      await walkDirectoryRecursivelyAndHash(filePath, fileLookup, triggerRerender, activeCount);
    } else {
      const fileSizeInBytes = stat.size;
      const hash = generateUniqueHash({ filename, size: String(fileSizeInBytes) });
      fileLookup[hash] = filePath; // Add to lookup

      activeCount.current += 1
      if (activeCount.current % 500 === 0) {
        triggerRerender()
      }
    }
  }
}

export default walkDirectoryRecursivelyAndHash;