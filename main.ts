import fs from 'fs';
import path from 'path';
import processPhoto from "./src/metadata";
import lightroomTagsToInstragramTemplateString from "./src/tags";
import createTemplate from './src/template';

const main = async (directoryPath: string) => {

  const errorsByFile: Record<string, string[]> = {}

  let templates = "";

  fs.readdir(directoryPath, async (err, files) => {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }

    console.log('Gathering tags...')
    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      console.log('\t', filePath)
      const metadata = await processPhoto(filePath);

      if ('errors' in metadata) {
        errorsByFile[file] = metadata.errors;
        continue;
      }

      const accountsAndTags = await lightroomTagsToInstragramTemplateString(metadata.tags);
      if ('errors' in accountsAndTags) {
        errorsByFile[file] = accountsAndTags.errors;
        continue;
      }

      templates += createTemplate({ metadata, accountsAndTagsTemplateString: accountsAndTags.templateString, tagsAndAccountsPreview: accountsAndTags.tagsAndAccountsPreview });
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

main('C:\\Users\\Travi\\Desktop\\cameracoffeewander_template_ingest');