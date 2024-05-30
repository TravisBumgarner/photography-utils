import { Box, Text } from "ink";
import React, { useContext, useMemo, useState } from "react";

import TextInput from "ink-text-input";
import { context } from "../context.js";
import ScrollableWindow from "../shared/ScrollableWindow.js";
import { Menu } from "../shared/index.js";
import { AppPage, BasePageProps } from "../types.js";
import { createDirectory, verifyDirectoryExists, verifyDirectoryIsEmpty } from "../utils.js";

enum ActiveItem {
  FileSelection = 0,
  RestoreDirectoryInput = 1,
  MenuSelection = 2
}

type PageProps = {

}

const PageComputeMissingSetup = ({ navigatePage }: PageProps & BasePageProps) => {
  const { dispatch, state: { missingFilesByDirectory } } = useContext(context)
  const [activeItem, setActiveItem] = useState<ActiveItem>(ActiveItem.FileSelection);
  const [restoreDirectory, setrestoreDirectory] = useState<string>("/Users/travisbumgarner/Programming/backup-sync/algorithm_exploration/testing_dir_restore");

  const menuCallback = (appPage: AppPage) => navigatePage(appPage)

  const prepareRestoreDirectory = (restoreDirectory: string) => {
    const restoreDirectoryExists = verifyDirectoryExists(restoreDirectory)

    if (!restoreDirectoryExists) {
      createDirectory(restoreDirectory)
    }

    const isDirectoryEmpty = verifyDirectoryIsEmpty(restoreDirectory)
    if (!isDirectoryEmpty) {
      dispatch(
        {
          type: 'SET_ERROR_MESSAGE',
          payload: {
            errorMessage: "Restore directory has contents, please empty and try again."
          }
        }
      )
      return false
    }
    return true
  }

  const onTextInputSubmit = () => {
    const isPrepared = prepareRestoreDirectory(restoreDirectory)
    if (!isPrepared) return

    dispatch({
      type: 'SET_DIRECTORIES',
      payload: {
        restoreDirectory: restoreDirectory
      }
    })
    setActiveItem(ActiveItem.MenuSelection)
  }

  const items = useMemo(() => {
    return missingFilesByDirectory?.map(({ directory, files }) => `${directory} - ${files.length}`)
  }, [missingFilesByDirectory])

  const fileSelectionCallback = (items: boolean[]) => {
    const itemsToRestore = missingFilesByDirectory?.filter((_, index) => items[index])

    if (itemsToRestore === undefined) {
      dispatch({
        type: 'SET_ERROR_MESSAGE',
        payload: {
          errorMessage: "No items selected."
        }
      })
    } else {
      dispatch({
        type: 'SET_FILES_BY_DIRECTORY_TO_RESTORE',
        payload: {
          filesByDirectoryToRestore: itemsToRestore
        }
      })
    }
    setActiveItem(ActiveItem.RestoreDirectoryInput)
  }

  return (
    <Box flexDirection="column">
      <Text>Hi?</Text>
      {items !== undefined
        ? <ScrollableWindow
          isActive={activeItem === ActiveItem.FileSelection}
          items={items}
          windowSize={9}
          submitCallback={fileSelectionCallback}
        />
        : <Text>No items missing.</Text>
      }
      <Box>
        <Text>Active Directory: </Text>
        {activeItem === ActiveItem.RestoreDirectoryInput
          ? <TextInput value={restoreDirectory} onChange={setrestoreDirectory} onSubmit={onTextInputSubmit} />
          : <Text>{restoreDirectory}</Text>
        }
      </Box>
      <Menu
        options={[
          { label: "Restore!", value: AppPage.ComputeRestore },
          { label: "Main Menu", value: AppPage.MainMenu },
          { label: "Exit", value: AppPage.Exit },
        ]}
        isFocused={activeItem === ActiveItem.MenuSelection}
        callback={menuCallback}
      />
    </Box>
  );
}

export default PageComputeMissingSetup;