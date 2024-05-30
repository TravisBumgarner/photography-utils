import { Null, Record, Static, String } from 'runtypes';

// Pages should share the same name as what's in this list, minus the `Page` prefix.
export enum AppPage {
  MainMenu = 'main-menu',
  TagPhotos = 'tag-photos',
  TagPhotosSetup = 'tag-photos-setup',
  Exit = 'exit',
}

export type BasePageProps = {
  navigatePage: (page: AppPage) => void
}

export const CacheRunType = Record({
  directory: String.Or(Null),
})

export type FilesByDirectory = {
  directory: string;
  files: string[];
}[];



export type Cache = Static<typeof CacheRunType>