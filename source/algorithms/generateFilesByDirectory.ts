import path from 'path';
import { FilesByDirectory } from "../types.js";

const generateFilesByDirectory = (files: string[]): FilesByDirectory => {
  const filesByDirectory: FilesByDirectory = [];

  for (const file of files) {
    const parts = path.normalize(file).split(path.sep).filter(part => part !== '');
    let currentDirectory = '';

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      currentDirectory = path.join(currentDirectory, part!);

      if (i === parts.length - 1) {
        // If it's a file
        let directory = filesByDirectory.find(dir => dir.directory === path.join(path.sep, currentDirectory.substring(0, currentDirectory.lastIndexOf(path.sep))));
        if (directory) {
          directory.files.push(part!);
        } else {
          filesByDirectory.push({ directory: path.join(path.sep, currentDirectory.substring(0, currentDirectory.lastIndexOf(path.sep))), files: [part!] });
        }
      }
    }
  }

  return filesByDirectory;
}

export default generateFilesByDirectory;