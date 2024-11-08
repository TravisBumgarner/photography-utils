import * as exifr from 'exifr'

import { format } from 'date-fns'
import { v5 as uuidv5 } from 'uuid'
import metadataOverride from './metadataOverride'
import { Metadata, ParsedData, Sidecar, SupportedCameras } from './types'

const formatShutterSpeed = (shutterSpeed: number) => {
    if (shutterSpeed < 1) {
        return `1/${1 / shutterSpeed}s`
    } else {
        return `${shutterSpeed}s`
    }
}

const generatePhotoId = (filename: string, date_taken: string) => {
    const PHOTOS_NAMESPACE = 'deadbeef-beef-491e-99b0-da01ff1f3341'

    return uuidv5(`${filename} ${date_taken}`, PHOTOS_NAMESPACE)
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

const processPhoto = async (
    file: string
): Promise<Metadata | { errors: string[] }> => {
    const extension = file.split('.').slice(-1)[0]
    if (!extension || !VALID_EXTENSIONS.includes(extension)) {
        throw Error('invalid file type')
    }

    const data = (await exifr.parse(file)) as ParsedData
    const sidecar = (await exifr.sidecar(file)) as unknown as Sidecar

    // For when generating the metadata isn't the same as all the other image types.

    const camera = `${data.Make} - ${data.Model}` as string as SupportedCameras

    const metadataOverrides = metadataOverride(camera, data)

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

    const tags = Array.isArray(sidecar.lr.hierarchicalSubject)
        ? sidecar.lr.hierarchicalSubject
        : [sidecar.lr.hierarchicalSubject]

    if (!sidecar.dc.title) errors.push('Title')
    if (!sidecar.dc.description) console.log('\t\tNo Description')
    if (tags.length === 0) errors.push('Tags')

    if (!sidecar.dc.title || tags.length === 0) {
        return { errors }
    }

    return {
        camera: `${data.Make} - ${data.Model}`,
        lens: formatLens([data.Lens, data.LensModel]),
        iso: data.ISO ? `ISO ${data.ISO}` : '',
        shutterSpeed: data.ExposureTime
            ? formatShutterSpeed(data.ExposureTime)
            : '',
        aperture: data.FNumber ? formatAperture(data.FNumber) : '',
        focalLength: data.FocalLength ? `${data.FocalLength}mm` : '',
        dateTaken: data.DateTimeOriginal
            ? format(data.DateTimeOriginal, 'MMMM yyyy')
            : 'REPLACE',
        title: sidecar.dc.title.value,
        description: sidecar.dc.description?.value || '',
        tags,
        ...metadataOverrides,
        id: generatePhotoId(data.RawFileName, data.DateTimeOriginal),
    }
}

export default processPhoto
