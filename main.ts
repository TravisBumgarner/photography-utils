import fs from 'fs';
import path from 'path';
import processPhoto from "./metadata";
import getTags from "./tags";
import createTemplate from './template';

const main = async () => {
  const directoryPath = './photos'; // specify the directory containing photos
  const errorsByFile: Record<string, string[]> = {}

  let templates = "";

  fs.readdir(directoryPath, async (err, files) => {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }

    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const metadata = await processPhoto(filePath);

      if ('errors' in metadata) {
        errorsByFile[file] = metadata.errors;
        continue;
      }

      const accountsAndTags = await getTags(metadata.tags);
      if ('errors' in accountsAndTags) {
        errorsByFile[file] = accountsAndTags.errors;
        continue;
      }

      templates += createTemplate({ metadata, accountsAndTags: accountsAndTags.tags });
      templates += '\n\n\n\n\n\n\n\n\n\n';
    }

    if (Object.keys(errorsByFile).length > 0) {
      console.log('Errors by file:');
      console.log(errorsByFile);
    } else {
      console.log(templates);
    }


  });
}

main();