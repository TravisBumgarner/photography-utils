import BigText from 'ink-big-text';
import Gradient from 'ink-gradient';
import React, { useContext } from 'react';

import { context } from './context.js';
import PageExit from './pages/Exit.js';
import { MainMenu, TagPhotos, TagPhotosSetup } from './pages/index.js';
import Error from './shared/Error.js';
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
    [AppPage.TagPhotosSetup]: 'Setup',
    [AppPage.TagPhotos]: 'Tagging',
    [AppPage.Exit]: 'Farewell',
  }[activePage]

  let content: JSX.Element | null = null
  switch (activePage) {
    case AppPage.MainMenu: {
      content = <MainMenu {...sharedPageProps} />;
      break
    }
    case AppPage.TagPhotosSetup: {
      content = <TagPhotosSetup {...sharedPageProps} />;
      break
    }
    case AppPage.TagPhotos: {
      content = <TagPhotos {...sharedPageProps} />
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
      <Error />
      {content}
    </>
  )
}
