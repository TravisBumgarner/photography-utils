import { Box, Newline, Text } from "ink";
import Spinner from 'ink-spinner';
import React, { useContext, useMemo, useRef, useState } from "react";

import { useAsyncEffect } from "use-async-effect";
import findMissingFiles from "../algorithms/findMissingFiles.js";
import generateFilesByDirectory from "../algorithms/generateFilesByDirectory.js";
import { walkDirectoryRecursivelyAndHash } from "../algorithms/index.js";
import { context } from "../context.js";
import Menu from "../shared/Menu.js";
import { AppPage, BasePageProps } from "../types.js";


type PageProps = {

}

enum Status {
  Idle = "idle",
  WalkingBackupDirectory = "calculating-active-directory",
  WalkingActiveDirectory = "calculating-backup-directory",
  CalculatingMissingFiles = "calculating-missing-files",
  NothingMissing = "nothing-missing",
  MoveToRestoreStep = "move-to-restore-step"
}

const PageComputeMissing = ({ navigatePage }: PageProps & BasePageProps) => {
  const { dispatch, state: { activeDirectory, backupDirectory } } = useContext(context)
  const [status, setStatus] = useState<Status>(Status.Idle)
  const [missingFileCount, setMissingFileCount] = useState<number | null>(null)
  // Passing in a ref because we're only going to update the count every N files. 
  // Need to also trigger a rerender when function is done.
  const [rerender, triggerRerender] = useState(false)
  const activeFileCount = useRef<number>(0)
  const backupFileCount = useRef<number>(0)

  const rerenderHandler = () => triggerRerender(prev => !prev)

  const calculateactiveDirectory = async () => {
    const backupHashList: Record<string, string> = {};
    const activeHashList: Record<string, string> = {};

    setStatus(Status.WalkingBackupDirectory);
    await walkDirectoryRecursivelyAndHash(backupDirectory, backupHashList, rerenderHandler, activeFileCount);
    rerenderHandler()

    setStatus(Status.WalkingActiveDirectory);
    await walkDirectoryRecursivelyAndHash(activeDirectory, activeHashList, rerenderHandler, backupFileCount);

    setStatus(Status.CalculatingMissingFiles);
    const missingFiles = await findMissingFiles({ backupHashList, activeHashList })
    setMissingFileCount(missingFiles.length)

    const missingFilesByDirectory = generateFilesByDirectory(missingFiles)

    console.log('missing', missingFilesByDirectory)

    if (missingFiles.length === 0) {
      setStatus(Status.NothingMissing)
    } else {
      // Horribly not performant? probably.
      dispatch({
        type: 'SET_MISSING_FILES_BY_DIRECTORY',
        payload: { missingFilesByDirectory }
      })
    }
    setStatus(Status.MoveToRestoreStep)
  }

  useAsyncEffect(async () => await calculateactiveDirectory(), [])

  const statusDisplay = useMemo(() => {
    switch (status) {
      case Status.WalkingBackupDirectory:
        return (
          <Box>
            <Text color="green">
              <Spinner type="dots" />
            </Text>
            <Text>Calculating Active Directory</Text>
          </Box>
        )
      case Status.WalkingActiveDirectory:
        return (
          <Box>
            <Text color="green">
              <Spinner type="dots" />
            </Text>
            <Text>Calculating Backup Directory</Text>
          </Box>
        )
      case Status.Idle:
        return (
          <Box>
            <Text>Idle</Text>
          </Box>
        )
      case Status.CalculatingMissingFiles:
        return (
          <Box>
            <Text color="green">
              <Spinner type="dots" />
            </Text>
            <Text>Calculating Missing Files</Text>
          </Box>
        )
      case Status.NothingMissing:
        return (
          <Menu
            label="Nothing is Missing"
            options={[
              { label: "Exit", value: AppPage.Exit },
              { label: "Main Menu", value: AppPage.MainMenu },
            ]}
            callback={navigatePage}
          />
        )
      case Status.MoveToRestoreStep:
        return (
          <Box flexDirection="column">
            <Text>{missingFileCount} files are missing. </Text>
            <Newline />
            <Menu
              options={[
                { label: "Continue", value: AppPage.ComputeRestoreSetup },
                { label: "Main Menu", value: AppPage.MainMenu },
                { label: "Exit", value: AppPage.Exit },
              ]}
              callback={navigatePage}
            />
          </Box>
        )
    }
  }, [status, rerender])

  return (
    <Box flexDirection="column">
      {statusDisplay}
    </Box>
  );
}

export default PageComputeMissing;