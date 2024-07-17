import { Tags } from '../types'

const _FilmPhotography: Tags = {
    general: ['#filmphotography', '#filmisnotdead', '#analogphotography'],
    priority: ['#analogsunrise', '@analogsunrise'],
}

const _35mmFilmPhotography: Tags = {
    general: [
        ..._FilmPhotography.general,
        '#35mm',
        '#thedaily35mm',
        '#35mmfilm',
    ],
    priority: [..._FilmPhotography.priority],
}

const _120mmFilmPhotography: Tags = {
    general: [..._FilmPhotography.general, '#120', '#120film'],
    priority: [..._FilmPhotography.priority],
}

const _iPhonePhotography: Tags = {
    general: ['#iphonephotography', '#shotoniphone', '#mobilephotography'],
    priority: [..._FilmPhotography.priority],
}

const NikonZ5: Tags = {
    general: ['#nikon', '#nikonz5', '#nikonphotography', '#nikonphotographer'],
    priority: [],
}

const NikonSLR: Tags = {
    general: [
        ..._FilmPhotography.general,
        ..._35mmFilmPhotography.general,
        '#nikon',
        '#nikonphotography',
    ],
    priority: [..._FilmPhotography.priority, ..._35mmFilmPhotography.priority],
}

const NikonD5300: Tags = {
    general: [
        '#nikon',
        '#nikond5300',
        '#nikonphotography',
        '#nikonphotographer',
    ],
    priority: [],
}

const Pixel3: Tags = {
    general: [
        '#shotonpixel',
        '#pixel3',
        '#googlepixel3',
        '#googlepixel',
        '#pixelartist',
    ],
    priority: [],
}

const iPhone13: Tags = {
    general: [..._iPhonePhotography.general, '#iphone13'],
    priority: [..._iPhonePhotography.priority],
}

const iPhone15: Tags = {
    general: [..._iPhonePhotography.general, '#iphone15'],
    priority: [..._iPhonePhotography.priority],
}

const YashicaC: Tags = {
    general: [..._120mmFilmPhotography.general, '#yashicac', '#yashica'],
    priority: [..._120mmFilmPhotography.priority],
}

const PentaxK1000: Tags = {
    general: [
        ..._35mmFilmPhotography.general,
        '#pentax',
        '#k1000',
        '#pentaxk1000',
    ],
    priority: [..._35mmFilmPhotography.priority],
}

const DJIMini3Pro: Tags = {
    general: [
        '#dji',
        '#djiphotography',
        '#djidrone',
        '#djicreator',
        '#djimini3pro',
    ],
    priority: [],
}

const OlympusPS: Tags = {
    general: [
        ..._35mmFilmPhotography.general,
        '#olympusphotography',
        '#olympuscamera',
    ],
    priority: [..._35mmFilmPhotography.priority],
}

const UnknownFilmCamera: Tags = {
    general: [..._FilmPhotography.general, ..._35mmFilmPhotography.general],
    priority: [..._FilmPhotography.priority, ..._35mmFilmPhotography.priority],
}

const Camera = {
    DJIMini3Pro,
    iPhone13,
    iPhone15,
    NikonD5300,
    NikonSLR,
    NikonZ5,
    OlympusPS,
    PentaxK1000,
    Pixel3,
    YashicaC,
    UnknownFilmCamera,
}
export default Camera
