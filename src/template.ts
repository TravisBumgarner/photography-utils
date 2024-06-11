import { Metadata, TagOrAccount } from "./types"

const createTemplate = ({ metadata, accountsAndTagsTemplateString, tagsAndAccountsPreview }: { metadata: Metadata, accountsAndTagsTemplateString: string, tagsAndAccountsPreview: Record<string, TagOrAccount[]> }) => {
  let output = ''

  output += '\n\n\n------PREVIEW-----\n'
  for (let [tag, tags] of Object.entries(tagsAndAccountsPreview)) {
    output += `${tag} - ${tags.join(', ')}\n`
  }
  output += '------END PREVIEW-----\n'

  output += '-----PHOTO DETAILS-----\n\n\n'

  output += `${metadata.title.trim()} (${metadata.dateTaken})\n`
  output += `\n`
  if (metadata.description) output += `${metadata.description.trim()}\n`
  if (metadata.description) output += `\n`
  output += `The Gear - ${metadata.camera}, ${metadata.lens}\n`
  output += `The Setup - ${metadata.shutterSpeed}, ${metadata.aperture}, ${metadata.focalLength} focal length\n`
  output += `\n`
  output += `${accountsAndTagsTemplateString}\n`

  output += '\n\n\n------END PHOTO DETAILS-----\n\n\n'

  return output
}

export default createTemplate