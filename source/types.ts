import { Null, Record, Static, String } from 'runtypes';

// Pages should share the same name as what's in this list, minus the `Page` prefix.
export enum AppPage {
  MainMenu = 'main-menu',
  ComputeMissingSetup = 'compute-missing-setup',
  ComputeMissing = 'compute-missing',
  ComputeRestoreSetup = 'compute-restore-setup',
  ComputeRestore = 'compute-restore',
  Exit = 'exit',
}

export type BasePageProps = {
  navigatePage: (page: AppPage) => void
}

export const CacheRunType = Record({
  activeDirectory: String.Or(Null),
  backupDirectory: String.Or(Null),
  restoreDirectory: String.Or(Null),
})

export type FilesByDirectory = {
  directory: string;
  files: string[];
}[];



export type Cache = Static<typeof CacheRunType>