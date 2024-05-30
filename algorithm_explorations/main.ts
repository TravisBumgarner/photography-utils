import * as exifr from 'exifr';
import { Record, Static, String } from 'runtypes';
const { format } = require('date-fns');

const PHOTO_DIR = 'large'

const DEBUG = false // to get logs.

const photoRuntype = Record({
  src: String,
  camera: String,
  lens: String,
  dateTaken: String,
  aperture: String,
  shutterSpeed: String,
  iso: String,
  focalLength: String,
})
type Photo = Static<typeof photoRuntype>

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

// type Sidecar = {
//   lr: {
//     hierarchicalSubject: string[]
//   }
// }

enum SupportedCameras {
  'Apple - iPhone 13 mini' = 'Apple - iPhone 13 mini',
  'Canon - Canon EOS DIGITAL REBEL XS' = 'Canon - Canon EOS DIGITAL REBEL XS',
  'Google - Pixel 3' = 'Google - Pixel 3',
  'motorola - moto x4' = 'motorola - moto x4',
  'NIKON CORPORATION - NIKON D3400' = 'NIKON CORPORATION - NIKON D3400',
  'NIKON CORPORATION - NIKON D5300' = 'NIKON CORPORATION - NIKON D5300',
  'NIKON CORPORATION - NIKON D7500' = 'NIKON CORPORATION - NIKON D7500',
  'NIKON CORPORATION - NIKON Z 5' = 'NIKON CORPORATION - NIKON Z 5',
  'NORITSU KOKI - QSS-32_33' = 'NORITSU KOKI - QSS-32_33',
  'NORITSU KOKI - EZ Controller' = 'NORITSU KOKI - EZ Controller',
  'SONY - DSC-RX100' = 'SONY - DSC-RX100',
  'SONY - SLT-A55V' = 'SONY - SLT-A55V',
  'SONY - DSLR-A290' = 'SONY - DSLR-A290',
  'undefined - undefined' = 'undefined - undefined',
}



// type LightroomMetadata = {
//   Location: string,
// }

// const processHierarchicalSubject = (hierarchicalSubject: Sidecar['lr']['hierarchicalSubject'] | undefined): LightroomMetadata | null => {
//   // This function will cause failures further down the line with the lie of `as Record<LightroomKey, string>
//   // In that case need to update Lightroom's Metadata

//   if (!hierarchicalSubject) return null

//   const partialKeys = hierarchicalSubject
//     .reduce((accum, entry) => {
//       const [key, value] = entry.split('|') as [string, string] // gahhhh.
//       accum[key] = value
//       return accum
//     }, {} as Record<string, string>)

//   return {
//     ...partialKeys,
//   } as LightroomMetadata
// }

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
const processPhoto = async (file: string): Promise<Photo | { errorMessage: string }> => {
  const extension = file.split('.').slice(-1)[0]
  if (!extension || !VALID_EXTENSIONS.includes(extension)) {
    return { errorMessage: "Skipping for invalid file type" }
  }

  let data: ParsedData
  // const sidecar = await exifr.sidecar(file) as unknown as Sidecar

  try {
    data = await exifr.parse(file)
    if (DEBUG) console.log(data)
  } catch {
    return { errorMessage: "Failed to exifr parse" }
  }

  // const lightroomTags = processHierarchicalSubject(sidecar.lr.hierarchicalSubject)
  // if (!lightroomTags) {
  //   return { errorMessage: "Failed to process hierarchical subject" }
  // }

  // const { Location } = lightroomTags
  // For when generating the metadata isn't the same as all the other image types.
  let metadataOverrides: Partial<Photo> = {}

  const camera = `${data.Make} - ${data.Model}` as string as SupportedCameras // Switch case default will catch if this errors. 

  switch (camera) {
    // Film Scanner
    case SupportedCameras['NORITSU KOKI - QSS-32_33']:
    case SupportedCameras['NORITSU KOKI - EZ Controller']: {
      metadataOverrides = {
        camera: '',
        lens: '',
        iso: '',
        shutterSpeed: '',
        aperture: '',
        focalLength: '',
        dateTaken: ''
      }
      break
    }
    case SupportedCameras['SONY - DSLR-A290']: {
      metadataOverrides = {
        camera: 'Sony A290'
      }
      break
    }
    case SupportedCameras['SONY - SLT-A55V']: {
      metadataOverrides = {
        camera: 'Sony A55',
        lens: data.LensModel === '----' ? '' : data.LensModel // Some lens used resulted in this.
      }
      break
    }
    case SupportedCameras['SONY - DSC-RX100']: {
      metadataOverrides = {
        camera: 'Sony RX100'
      }
      break
    }
    case SupportedCameras['NIKON CORPORATION - NIKON D5300']:
    case SupportedCameras['NIKON CORPORATION - NIKON D3400']:
    case SupportedCameras['NIKON CORPORATION - NIKON Z 5']:
    case SupportedCameras['NIKON CORPORATION - NIKON D7500']: {
      break
    }
    case SupportedCameras['Apple - iPhone 13 mini']: {
      metadataOverrides = {
        camera: 'iPhone 13',
        lens: ''
      }
      break
    }
    case SupportedCameras['undefined - undefined']: {
      // Unclear how these ended up in lightroom
      metadataOverrides = {
        camera: '',
        iso: '',
        shutterSpeed: '',
        aperture: '',
        focalLength: '',
        dateTaken: ''
      }
      break
    }
    case SupportedCameras['motorola - moto x4']: {
      metadataOverrides = {
        lens: ''
      }
      break
    }
    case SupportedCameras['Canon - Canon EOS DIGITAL REBEL XS']: {
      metadataOverrides = {
      }
      break
    }
    case SupportedCameras['Google - Pixel 3']: {
      metadataOverrides = {
        lens: ''
      }
      break
    }
    default: {
      throw Error('unsupported camera' + camera)
    }
  }

  const results = {
    src: file.replace(`${PHOTO_DIR}/`, ''),
    // location: Location,
    camera: `${data.Make} - ${data.Model}`,
    lens: formatLens([data.Lens, data.LensModel]),
    iso: data.ISO ? `ISO ${data.ISO}` : '',
    shutterSpeed: data.ExposureTime ? formatShutterSpeed(data.ExposureTime) : '',
    aperture: data.FNumber ? formatAperture(data.FNumber) : '',
    focalLength: data.FocalLength ? `${data.FocalLength}mm` : '',
    dateTaken: format(data.DateTimeOriginal, 'MMMM yyyy'),
    ...metadataOverrides
  }

  try {
    return photoRuntype.check(results)
  } catch (e) {
    console.error(e)
    return { errorMessage: "Failed to validate" }
  }
}

const main = async () => {
  const result = await processPhoto('./a.jpg')
  console.log(result)
}

main()