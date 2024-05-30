import React, { createContext, useReducer, useState, type Dispatch } from 'react';
import { useAsyncEffect } from 'use-async-effect';

import { Text } from 'ink';
import { AppPage, FilesByDirectory } from './types.js';
import { readCache } from './utils.js';

interface State {
  activeDirectory: string,
  backupDirectory: string,
  restoreDirectory: string,
  activePage: AppPage,
  errorMessage: string,
  missingFilesByDirectory: FilesByDirectory | null
  filesByDirectoryToRestore: FilesByDirectory | null
}

const EMPTY_STATE: State = {
  activeDirectory: "",
  backupDirectory: "",
  restoreDirectory: "",
  activePage: AppPage.MainMenu,
  errorMessage: "",
  missingFilesByDirectory: null,
  filesByDirectoryToRestore: null
}

interface SetMissingFilesByDirectory {
  type: 'SET_MISSING_FILES_BY_DIRECTORY'
  payload: {
    missingFilesByDirectory: FilesByDirectory
  }
}

interface FilesByDirectoryToRestore {
  type: 'SET_FILES_BY_DIRECTORY_TO_RESTORE'
  payload: {
    filesByDirectoryToRestore: FilesByDirectory
  }

}

interface SetActivePage {
  type: 'SET_ACTIVE_PAGE'
  payload: {
    activePage: AppPage
  }
}

interface SetDirectories {
  type: 'SET_DIRECTORIES'
  payload: {
    activeDirectory?: string,
    backupDirectory?: string,
    restoreDirectory?: string
  }
}

interface HydrateFromCache {
  type: 'HYDRATE_FROM_CACHE'
  payload: {
    activeDirectory: string,
    backupDirectory: string,
    restoreDirectory: string
  }
}

interface SetErrorMessage {
  type: 'SET_ERROR_MESSAGE'
  payload: {
    errorMessage: string
  }

}

export type Action =
  | HydrateFromCache
  | SetActivePage
  | SetDirectories
  | SetErrorMessage
  | SetMissingFilesByDirectory
  | FilesByDirectoryToRestore

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'HYDRATE_FROM_CACHE': {
      return {
        ...state,
        ...action.payload
      }
    }
    case 'SET_ACTIVE_PAGE': {
      return {
        ...state,
        ...action.payload
      }
    }
    case 'SET_DIRECTORIES': {
      return {
        ...state,
        ...action.payload

      }
    }
    case 'SET_ERROR_MESSAGE': {
      return {
        ...state,
        ...action.payload
      }
    }
    case 'SET_MISSING_FILES_BY_DIRECTORY': {
      return {
        ...state,
        ...action.payload
      }
    }
    case 'SET_FILES_BY_DIRECTORY_TO_RESTORE': {
      return {
        ...state,
        ...action.payload,
      }
    }
  }
}

const context = createContext(
  {
    state: EMPTY_STATE,
    dispatch: () => { }
  } as {
    state: State
    dispatch: Dispatch<Action>
  }
)

const ResultsContext = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(reducer, EMPTY_STATE)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useAsyncEffect(async () => {
    const { backupDirectory, activeDirectory, restoreDirectory } = await readCache()
    dispatch({
      type: 'HYDRATE_FROM_CACHE',
      payload: {
        activeDirectory: activeDirectory || '',
        backupDirectory: backupDirectory || '',
        restoreDirectory: restoreDirectory || '',
      }
    })
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return <Text>Loading...</Text>
  }

  return (
    <context.Provider value={{ state, dispatch }}>{children}</context.Provider>
  )
}

export default ResultsContext
export {
  context
};

