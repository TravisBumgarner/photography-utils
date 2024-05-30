
/** Take in a filename and filesize and generate a unique hash identifying a photo. 
 * Theoretically this should be sufficient information to identify a photo uniquely 
 * */



const findMissingFiles = async ({ backupHashList, activeHashList }: { backupHashList: Record<string, string>, activeHashList: Record<string, string> }): Promise<string[]> => {
  const missingFiles: Record<string, string> = {};

  // Find missing files
  for (const [hash, filename] of Object.entries(backupHashList)) {
    if (!activeHashList[hash]) {
      missingFiles[hash] = filename;
    }
  }

  return Object.values(missingFiles);
}

export default findMissingFiles