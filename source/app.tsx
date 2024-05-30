import BigText from 'ink-big-text';
import Gradient from 'ink-gradient';
import React, { useContext } from 'react';

import { Box, Newline, Text } from 'ink';
import { context } from './context.js';
import PageExit from './pages/Exit.js';
import { PageComputeMissing, PageComputeMissingSetup, PageComputeRestore, PageComputeRestoreSetup, PageMainMenu } from './pages/index.js';
import { Error } from './shared/index.js';
import { AppPage } from './types.js';

export default function App() {
  const { dispatch, state: { activePage } } = useContext(context)

  const navigatePage = (activePage: AppPage) => {
    dispatch({
      type: 'SET_ACTIVE_PAGE',
      payload: { activePage }
    })
  }

  const sharedPageProps = { navigatePage }

  const pageTitle = {
    [AppPage.MainMenu]: 'Main Menu',
    [AppPage.ComputeMissingSetup]: 'Setup',
    [AppPage.ComputeMissing]: 'Computing',
    [AppPage.ComputeRestoreSetup]: 'Restore Setup',
    [AppPage.ComputeRestore]: 'Restoring',
    [AppPage.Exit]: 'Farewell',
  }[activePage]

  const pageDescription = {
    [AppPage.MainMenu]: 'Select an option',
    [AppPage.ComputeMissingSetup]: "Enter the backup and active directories. Fields are pre-populated if you've run this before.",
    [AppPage.ComputeMissing]: 'Calculating missing files',
    [AppPage.ComputeRestoreSetup]: 'Select directories and files to restore.',
    [AppPage.ComputeRestore]: 'Restoring missing files',
    [AppPage.Exit]: 'Goodbye',
  }[activePage]

  let content: JSX.Element | null = null
  switch (activePage) {
    case AppPage.MainMenu: {
      content = <PageMainMenu {...sharedPageProps} />;
      break
    }
    case AppPage.ComputeMissingSetup: {
      content = <PageComputeMissingSetup {...sharedPageProps} />;
      break
    }
    case AppPage.ComputeMissing: {
      content = <PageComputeMissing {...sharedPageProps} />
      break
    }
    case AppPage.ComputeRestoreSetup: {
      content = <PageComputeRestoreSetup {...sharedPageProps} />
      break
    }
    case AppPage.ComputeRestore: {
      content = <PageComputeRestore {...sharedPageProps} />
      break
    }
    case AppPage.Exit: {
      content = <PageExit {...sharedPageProps} />
      break
    }
  }

  return (
    <>
      <Gradient name="rainbow">
        <BigText text={pageTitle} />
      </Gradient>
      <Box>
        <Text>{pageDescription}</Text>
        <Newline />
      </Box>
      <Error />
      {content}
    </>
  )
}
