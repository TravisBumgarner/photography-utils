import { Box, Newline, Text } from "ink";
import React, { useContext, useEffect, useState } from "react";

import { context } from "../context.js";
import { Menu, TailWindow } from "../shared/index.js";
import { AppPage, BasePageProps } from "../types.js";
import { copyFile } from "../utils.js";


type PageProps = {

}

const PageComputeRestore = ({ navigatePage }: PageProps & BasePageProps) => {
  const { state: { filesByDirectoryToRestore, restoreDirectory } } = useContext(context)
  const [isRestoring, setIsRestoring] = useState<boolean>(true)
  const [restoredItems, setRestoredItems] = useState<string[]>([])
  console.log(filesByDirectoryToRestore)
  const menuCallback = (appPage: AppPage) => {
    navigatePage(appPage)
  }

  useEffect(() => {
    if (!filesByDirectoryToRestore) {
      setIsRestoring(false)
      return
    }

    if (isRestoring) {
      for (const { files, directory } of filesByDirectoryToRestore) {
        for (const file of files) {
          copyFile({ sourceDirectory: directory, destinationDirectory: restoreDirectory, file })
          setRestoredItems((prev) => [...prev, file])
        }
      }

      const restoredItems = filesByDirectoryToRestore.map(({ directory, files }) => `${directory} - ${files.length}`)
      setRestoredItems(restoredItems)
      setIsRestoring(false)
    }
  }, [isRestoring, filesByDirectoryToRestore])


  return (
    <Box flexDirection="column">
      <Text>Restoring {filesByDirectoryToRestore?.length} directories</Text>
      <Newline />
      <TailWindow items={restoredItems} windowSize={9} />
      <Menu
        options={[
          { label: "Restart", value: AppPage.Exit },
          { label: "Main Menu", value: AppPage.MainMenu },
        ]}
        isFocused={!isRestoring}
        callback={menuCallback}
      />
    </Box>
  );
}

export default PageComputeRestore;