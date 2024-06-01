import { TagsAndAccounts } from "../types"

const _FilmPhotography: TagsAndAccounts = {
  tags: [
    "filmphotography",
    "filmisnotdead",
    "analogphotography",
  ],
  accounts: [

  ]
}

const _35mmFilmPhotography: TagsAndAccounts = {
  tags: [
    ..._FilmPhotography.tags,
    "35mm",
    "thedaily35mm",
    "35mmfilm",
  ],
  accounts: [
    ..._FilmPhotography.accounts
  ]
}

const _120mmFilmPhotography: TagsAndAccounts = {
  tags: [
    ..._FilmPhotography.tags,
    "120",
    "120film",
  ],
  accounts: [
    ..._FilmPhotography.accounts
  ]
}

const _iPhonePhotography: TagsAndAccounts = {
  tags: [
    "iphonephotography",
    "shotoniphone",
    "mobilephotography"
  ],
  accounts: [

  ]
}

const NikonZ5: TagsAndAccounts = {
  tags: [
    "nikon",
    "nikonz5",
    "nikonphotography",
    "nikonphotographer",
  ],
  accounts: [

  ]
};

const NikonSLR: TagsAndAccounts = {
  tags: [
    ..._FilmPhotography.tags,
    ..._35mmFilmPhotography.tags,
    "nikon",
    "nikonphotography"

  ],
  accounts: [
    ..._FilmPhotography.accounts,
    ..._35mmFilmPhotography.accounts
  ]
}

const NikonD5300: TagsAndAccounts = {
  tags: [
    "nikon",
    "nikond5300",
    "nikonphotography",
    "nikonphotographer",
  ],
  accounts: [

  ]
};

const Pixel3: TagsAndAccounts = {
  tags: [
    "shotonpixel",
    "pixel3",
    "googlepixel3",
    "googlepixel",
    "pixelartist"
  ],
  accounts: [

  ]
};

const iPhone13: TagsAndAccounts = {
  tags: [
    ..._iPhonePhotography.tags,
    "iphone13",
  ],
  accounts: [
    ..._iPhonePhotography.accounts
  ]
};

const iPhone15: TagsAndAccounts = {
  tags: [
    ..._iPhonePhotography.tags,
    "iphone15"
  ],
  accounts: [
    ..._iPhonePhotography.accounts
  ]
};

const YashicaC: TagsAndAccounts = {
  tags: [
    ..._120mmFilmPhotography.tags,
  ],
  accounts: [
    ..._120mmFilmPhotography.accounts
  ]
};

const DJIMini3Pro: TagsAndAccounts = {
  tags: [

  ],
  accounts: [

  ]
};

const UnknownFilmCamera: TagsAndAccounts = {
  tags: [
    ..._FilmPhotography.tags,
    ..._35mmFilmPhotography.tags,
  ],
  accounts: [
    ..._FilmPhotography.accounts,
    ..._35mmFilmPhotography.accounts
  ]
};

const Camera = {
  DJIMini3Pro,
  iPhone13,
  iPhone15,
  NikonD5300,
  NikonSLR,
  NikonZ5,
  Pixel3,
  YashicaC,
  UnknownFilmCamera
};

export default Camera;