import { walkDirectoryRecursivelyAndHash } from "./utilities";

const DEBUG = false


const findMissingFiles = async (backupLibraryRoot: string, activeLibraryRoot: string): Promise<string[]> => {
  const backupHashList: Record<string, string> = {};
 const activeHashList: Record<string, string> = {};

  await walkDirectoryRecursivelyAndHash(backupLibraryRoot, backupHashList);
  await walkDirectoryRecursivelyAndHash(activeLibraryRoot, activeHashList);


  if (DEBUG) console.log('Backup Hash List:', backupHashList);
  if (DEBUG) console.log('Active Hash List:', activeHashList);
  const missingFiles: Record<string, string> = {};

  // Find missing files
  for (const [hash, filename] of Object.entries(backupHashList)) {
    if (!activeHashList[hash]) {
      missingFiles[hash] = filename;
    }
  }

  if (DEBUG) console.log('Missing Files:', missingFiles);

  return Object.values(missingFiles);
}
type FileTree = {
  [key: string]: FileTree | string[]
}

const generateFileTree = (files: string[]) => {
  // Copilot wrote this function. Don't @ me.
  const fileTree: FileTree = {};

  for (const file of files) {
    const parts = file.split('/').filter(part => part !== '');
    let current: FileTree | string[] = fileTree;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (i === parts.length - 1) {
        // If it's a file
        if (Array.isArray(current)) {
          current.push(file);
        } else {
          current[part] = [file];
        }
      } else {
        // If it's a directory
        if (!current[part]) {
          current[part] = i === parts.length - 2 ? [] : {};
        }
        current = current[part] as FileTree;
      }
    }
  }

  return fileTree;
}

const prettyPrintFileTree = (fileTree: FileTree, indent = '  '): void => {
  for (const [key, value] of Object.entries(fileTree)) {
    if (typeof value === 'string') {
      console.log(`${indent}${key}`);
    } else if (Array.isArray(value)) {
      console.log(`${indent}${key}`);
      value.forEach(file => console.log(`${indent}  ${file}`));
    } else {
      console.log(`${indent}${key}/`);
      prettyPrintFileTree(value, `${indent}  `);
    }
  }
};

const main = async ({ backupLibraryRoot, activeLibraryRoot }: { backupLibraryRoot: string, activeLibraryRoot: string }) => {
  const missingFiles = await findMissingFiles(backupLibraryRoot, activeLibraryRoot)
  const fileTree = generateFileTree(missingFiles);
  prettyPrintFileTree(fileTree);

}

const backupLibraryRoot = '/Users/travisbumgarner/Programming/photo-backup-sync/algorithm_exploration/testing_dir_backup';
const activeLibraryRoot = '/Users/travisbumgarner/Programming/photo-backup-sync/algorithm_exploration/testing_dir_active';

main({ backupLibraryRoot, activeLibraryRoot })

export { }