import { TagOrAccount } from "../types"

const _FilmPhotography: TagOrAccount[] = [
  "#filmphotography",
  "#filmisnotdead",
  "#analogphotography",
  "#analogsunrise",
  "@analogsunrise"
]

const _35mmFilmPhotography: TagOrAccount[] = [
  ..._FilmPhotography,
  "#35mm",
  "#thedaily35mm",
  "#35mmfilm",
]

const _120mmFilmPhotography: TagOrAccount[] = [
  ..._FilmPhotography,
  "#120",
  "#120film",
]

const _iPhonePhotography: TagOrAccount[] = [
  "#iphonephotography",
  "#shotoniphone",
  "#mobilephotography"

]

const NikonZ5: TagOrAccount[] = [
  "#nikon",
  "#nikonz5",
  "#nikonphotography",
  "#nikonphotographer",
]

const NikonSLR: TagOrAccount[] = [
  ..._FilmPhotography,
  ..._35mmFilmPhotography,
  "#nikon",
  "#nikonphotography"
]

const NikonD5300: TagOrAccount[] = [
  "#nikon",
  "#nikond5300",
  "#nikonphotography",
  "#nikonphotographer",
]

const Pixel3: TagOrAccount[] = [
  "#shotonpixel",
  "#pixel3",
  "#googlepixel3",
  "#googlepixel",
  "#pixelartist"
]

const iPhone13: TagOrAccount[] = [
  ..._iPhonePhotography,
  "#iphone13",
]

const iPhone15: TagOrAccount[] = [
  ..._iPhonePhotography,
  "#iphone15"
]

const YashicaC: TagOrAccount[] = [
  ..._120mmFilmPhotography,
  "#yashicac",
  "#yashica",
]

const DJIMini3Pro: TagOrAccount[] = [
  "#dji",
  "#djiphotography",
  "#djidrone",
  "#djicreator",
  "#djimini3pro"
]

const UnknownFilmCamera: TagOrAccount[] = [
  ..._FilmPhotography,
  ..._35mmFilmPhotography,
]

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
}
export default Camera;