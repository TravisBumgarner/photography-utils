import { Box, Newline, Text } from "ink";
import TextInput from 'ink-text-input';
import React, { useContext, useState } from "react";


import { context } from "../context.js";
import { Menu } from "../shared/index.js";
import { AppPage, BasePageProps } from "../types.js";
import { verifyDirectoryExists } from "../utils.js";

enum ActiveItem {
  DirectoryInput = 0,
  Submit = 1
}

type PageProps = {

}

const PageComputeMissingSetup = ({ navigatePage }: PageProps & BasePageProps) => {
  const { dispatch } = useContext(context)

  const [directory, setDirectory] = useState<string>("/Users/travisbumgarner/Programming/backup-sync/algorithm_exploration/testing_dir_backup");
  const [activeItem, setActiveItem] = useState<ActiveItem>(ActiveItem.DirectoryInput);

  const onTextInputSubmit = () => {
    setActiveItem(ActiveItem.Submit)
  }

  const menuCallback = (value: ActiveItem) => {
    dispatch({
      type: 'SET_ERROR_MESSAGE',
      payload: {
        errorMessage: ""
      }
    })

    if (value === ActiveItem.DirectoryInput) {
      setDirectory("")
    }

    if (value === ActiveItem.Submit) {
      const directoryExists = verifyDirectoryExists(directory)


      if (!directoryExists) {
        const newErrorMessage = "Directory does not exist."

        dispatch(
          {
            type: 'SET_ERROR_MESSAGE',
            payload: {
              errorMessage: newErrorMessage
            }
          }
        )

        setDirectory("")
        setActiveItem(ActiveItem.DirectoryInput)
        return
      }

      dispatch({
        type: 'SET_DIRECTORY',
        payload: {
          directory,
        }
      })
      navigatePage(AppPage.TagPhotos)
    }
    setActiveItem(value)
  }

  return (
    <Box flexDirection="column">
      <Box>
        <Text>Directory: </Text>
        {activeItem === ActiveItem.DirectoryInput
          ? <TextInput value={directory} onChange={setDirectory} onSubmit={onTextInputSubmit} />
          : <Text>{directory}</Text>
        }
      </Box>
      <Newline />
      <Menu
        options={[
          { label: "Submit", value: ActiveItem.Submit },
          { label: "Restart Input", value: ActiveItem.DirectoryInput },
        ]}
        callback={menuCallback}
        isFocused={activeItem === ActiveItem.Submit}
      />
    </Box>
  );
}

export default PageComputeMissingSetup;