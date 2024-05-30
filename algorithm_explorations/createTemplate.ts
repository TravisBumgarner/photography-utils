import { Metadata } from "./processPhoto"

const createTemplate = ({ metadata, accountsAndTags }: { metadata: Metadata, accountsAndTags: string }) => {
  let output = ''
  output += `${metadata.title} ${metadata.dateTaken}\n`
  output += `\n`
  output += `${metadata.description}\n`
  output += `\n`
  output += `The Gear - ${metadata.camera}, ${metadata.lens}\n`
  output += `The Setup - ${metadata.shutterSpeed}, ${metadata.aperture}, ${metadata.aperture}, ${metadata.focalLength} focal length\n`
  output += `\n`
  output += `${accountsAndTags}\n`

  return output
}

export default createTemplate