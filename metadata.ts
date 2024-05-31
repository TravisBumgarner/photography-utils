import * as exifr from 'exifr';
import { Array as ArrayRunType, Record, Static, String } from 'runtypes';
const { format } = require('date-fns');

type Sidecar = {
  lr?: {
    hierarchicalSubject?: string[]
  },
  dc?: {
    title?: {
      value: string
    },
    description?: {
      value: string
    }
  }
}

const metadataRunType = Record({
  camera: String,
  lens: String,
  dateTaken: String,
  aperture: String,
  shutterSpeed: String,
  iso: String,
  focalLength: String,
  tags: ArrayRunType(String),
  title: String,
  description: String
})
export type Metadata = Static<typeof metadataRunType>

type ParsedData = {
  DateTimeOriginal: string
  Lens?: string
  LensModel?: string
  RawFileName: string
  Make: string
  Model: string
  ExposureTime?: number
  FNumber?: number
  ExposureProgram?: string
  ISO?: number
  FocalLength?: number
}

enum SupportedCameras {
  iPhone13 = 'Apple - iPhone 13 mini',
  CanonEOSRebel = 'Canon - Canon EOS DIGITAL REBEL XS',
  Pixel3 = 'Google - Pixel 3',
  MotoX4 = 'motorola - moto x4',
  NikonD3400 = 'NIKON CORPORATION - NIKON D3400',
  NikonD5300 = 'NIKON CORPORATION - NIKON D5300',
  NikonD7500 = 'NIKON CORPORATION - NIKON D7500',
  NikoNZ5 = 'NIKON CORPORATION - NIKON Z 5',
  Scanner1 = 'NORITSU KOKI - QSS-32_33',
  Scanner2 = 'NORITSU KOKI - EZ Controller',
  SonyRX100 = 'SONY - DSC-RX100',
  SonyA55 = 'SONY - SLT-A55V',
  SonyA290 = 'SONY - DSLR-A290',
  Unknown = 'undefined - undefined',
}

const formatShutterSpeed = (shutterSpeed: number) => {
  if (shutterSpeed < 1) {
    return `1/${1 / shutterSpeed}s`
  } else {
    return `${shutterSpeed}s`
  }
}

const formatAperture = (focalLength: number) => {
  return `\u0192/${focalLength.toFixed(1)}`
}

const formatLens = (possibleLenses: (undefined | string)[]) => {
  // Lens has different name depending ont he camera.

  const lens = possibleLenses.filter(l => l !== undefined)[0]

  return lens || ''
}

const VALID_EXTENSIONS = ['jpg']

const processPhoto = async (file: string): Promise<Metadata | { errors: string[] }> => {
  const extension = file.split('.').slice(-1)[0]
  if (!extension || !VALID_EXTENSIONS.includes(extension)) {
    throw Error('invalid file type')
  }


  const data = await exifr.parse(file) as ParsedData
  const sidecar = await exifr.sidecar(file) as unknown as Sidecar

  // For when generating the metadata isn't the same as all the other image types.
  let metadataOverrides: Partial<Metadata> = {}

  const camera = `${data.Make} - ${data.Model}` as string as SupportedCameras // Switch case default will catch if this errors. 

  switch (camera) {
    // Film Scanner
    case SupportedCameras.Scanner1:
    case SupportedCameras.Scanner2: {
      metadataOverrides = {
        camera: 'REPLACE',
        lens: 'REPLACE',
        iso: 'REPLACE',
        shutterSpeed: 'REPLACE',
        aperture: 'REPLACE',
        focalLength: 'REPLACE',
        dateTaken: 'REPLACE'
      }
      break
    }
    case SupportedCameras.SonyA290: {
      metadataOverrides = {
        camera: 'Sony A290'
      }
      break
    }
    case SupportedCameras.SonyA55: {
      metadataOverrides = {
        camera: 'Sony A55',
        lens: data.LensModel === '----' ? '' : data.LensModel // Some lens used resulted in this.
      }
      break
    }
    case SupportedCameras.SonyRX100: {
      metadataOverrides = {
        camera: 'Sony RX100'
      }
      break
    }
    case SupportedCameras.NikoNZ5:
    case SupportedCameras.NikonD3400:
    case SupportedCameras.NikonD5300:
    case SupportedCameras.NikonD7500: {
      const NIKON_LOOKUP = {
        'NIKON CORPORATION - NIKON D5300': "Nikon D5300",
        'NIKON CORPORATION - NIKON D3400': "Nikon D3400",
        'NIKON CORPORATION - NIKON Z 5': "Nikon Z5",
        'NIKON CORPORATION - NIKON D7500': "Nikon D7500",
      }

      metadataOverrides = {
        camera: NIKON_LOOKUP[camera]
      }

      break
    }
    case SupportedCameras.iPhone13: {
      metadataOverrides = {
        camera: 'iPhone 13',
        lens: ''
      }
      break
    }
    case SupportedCameras.Unknown: {
      // Unclear how these ended up in lightroom
      metadataOverrides = {
        camera: 'REPLACE',
        iso: 'REPLACE',
        shutterSpeed: 'REPLACE',
        aperture: 'REPLACE',
        focalLength: 'REPLACE',
        dateTaken: 'REPLACE'
      }
      break
    }
    case SupportedCameras.MotoX4: {
      metadataOverrides = {
        lens: ''
      }
      break
    }
    case SupportedCameras.CanonEOSRebel: {
      metadataOverrides = {
      }
      break
    }
    case SupportedCameras.Pixel3: {
      metadataOverrides = {
        lens: ''
      }
      break
    }
    default: {
      throw Error('unsupported camera' + camera)
    }
  }
  const errors = []

  if (!sidecar.dc) {
    errors.push('No Lightroom dc data for title and description')
    return { errors }
  }

  if (!sidecar.lr) {
    errors.push('No Lightroom lr data for hierarchicalSubject')
    return { errors }
  }

  if (!sidecar.lr.hierarchicalSubject) {
    errors.push('No Lightroom hierarchicalSubject')
    return { errors }
  }

  const tags = Array.isArray(sidecar.lr.hierarchicalSubject) ? sidecar.lr.hierarchicalSubject : [sidecar.lr.hierarchicalSubject]


  if (!sidecar.dc.title) errors.push('Title')
  if (!sidecar.dc.description) errors.push('Description')
  if (tags.length === 0) errors.push('Tags')

  if (!sidecar.dc.description || !sidecar.dc.title || tags.length === 0) {
    return { errors }
  }

  return {
    camera: `${data.Make} - ${data.Model}`,
    lens: formatLens([data.Lens, data.LensModel]),
    iso: data.ISO ? `ISO ${data.ISO}` : '',
    shutterSpeed: data.ExposureTime ? formatShutterSpeed(data.ExposureTime) : '',
    aperture: data.FNumber ? formatAperture(data.FNumber) : '',
    focalLength: data.FocalLength ? `${data.FocalLength}mm` : '',
    dateTaken: data.DateTimeOriginal ? format(data.DateTimeOriginal, 'MMMM yyyy') : "REPLACE",
    title: sidecar.dc.title.value,
    description: sidecar.dc.description.value,
    tags,
    ...metadataOverrides,
  }
}

export default processPhoto