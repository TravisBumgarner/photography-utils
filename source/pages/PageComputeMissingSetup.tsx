import { Box, Newline, Text } from "ink";
import TextInput from 'ink-text-input';
import React, { useContext, useState } from "react";


import { context } from "../context.js";
import { Menu } from "../shared/index.js";
import { AppPage, BasePageProps } from "../types.js";
import { verifyDirectoryExists } from "../utils.js";

enum ActiveItem {
  BackupDirectoryInput = 0,
  ActiveDirectoryInput = 1,
  ConfirmSubmit = 2,
  Submit = 3
}

type PageProps = {

}

const PageComputeMissingSetup = ({ navigatePage }: PageProps & BasePageProps) => {
  const { dispatch } = useContext(context)

  const [backupDirectory, setBackupDirectory] = useState<string>("/Users/travisbumgarner/Programming/backup-sync/algorithm_exploration/testing_dir_backup");
  const [activeDirectory, setActiveDirectory] = useState<string>("/Users/travisbumgarner/Programming/backup-sync/algorithm_exploration/testing_dir_active");
  const [activeItem, setActiveItem] = useState<ActiveItem>(ActiveItem.BackupDirectoryInput);

  const onTextInputSubmit = () => {
    setActiveItem(prev => prev + 1)
  }

  const menuCallback = (value: ActiveItem) => {
    dispatch({
      type: 'SET_ERROR_MESSAGE',
      payload: {
        errorMessage: ""
      }
    })

    if (value === ActiveItem.BackupDirectoryInput) {
      setBackupDirectory("")
      setActiveDirectory("")
    }

    if (value === ActiveItem.Submit) {
      const backupDirectoryExists = verifyDirectoryExists(backupDirectory)
      const activeDirectoryExists = verifyDirectoryExists(activeDirectory)

      if (!backupDirectoryExists || !activeDirectoryExists) {
        let newErrorMessage = ""
        backupDirectoryExists || (newErrorMessage += "Backup directory does not exist.")
        activeDirectoryExists || (newErrorMessage += "Active directory does not exist.")

        dispatch(
          {
            type: 'SET_ERROR_MESSAGE',
            payload: {
              errorMessage: newErrorMessage
            }
          }
        )

        setBackupDirectory("")
        setActiveDirectory("")
        setActiveItem(ActiveItem.BackupDirectoryInput)
        return
      }

      dispatch({
        type: 'SET_DIRECTORIES',
        payload: {
          activeDirectory,
          backupDirectory,
        }
      })
      navigatePage(AppPage.ComputeMissing)
    }
    setActiveItem(value)
  }

  return (
    <Box flexDirection="column">
      <Box>
        <Text>Backup Directory: </Text>
        {activeItem === ActiveItem.BackupDirectoryInput
          ? <TextInput value={backupDirectory} onChange={setBackupDirectory} onSubmit={onTextInputSubmit} />
          : <Text>{backupDirectory}</Text>
        }
      </Box>
      <Box>
        <Text>Active Directory: </Text>
        {activeItem === ActiveItem.ActiveDirectoryInput
          ? <TextInput value={activeDirectory} onChange={setActiveDirectory} onSubmit={onTextInputSubmit} />
          : <Text>{activeDirectory}</Text>
        }
      </Box>
      <Newline />
      <Menu
        options={[
          { label: "Submit", value: ActiveItem.Submit },
          { label: "Restart Input", value: ActiveItem.BackupDirectoryInput },
        ]}
        callback={menuCallback}
        isFocused={activeItem === ActiveItem.ConfirmSubmit}
      />
    </Box>
  );
}

export default PageComputeMissingSetup;