import { Metadata, Value } from "./types"

const createTemplate = ({ metadata, accountsAndTagsTemplateString, tagsAndAccountsPreview }: { metadata: Metadata, accountsAndTagsTemplateString: string, tagsAndAccountsPreview: Record<string, Value> }) => {
  let output = ''

  output += '\n\n\n------PREVIEW-----\n'
  for (let [tag, { tags, accounts }] of Object.entries(tagsAndAccountsPreview)) {
    output += `${tag} - ${[...tags.map(t => `#${t}`), ...accounts.map(a => `#${a}`)].join(', ')}\n`
  }
  output += '------END PREVIEW-----\n'

  output += '-----PHOTO DETAILS-----\n\n\n'

  output += `${metadata.title.trim()} (${metadata.dateTaken})\n`
  output += `\n`
  output += `${metadata.description.trim()}\n`
  output += `\n`
  output += `The Gear - ${metadata.camera}, ${metadata.lens}\n`
  output += `The Setup - ${metadata.shutterSpeed}, ${metadata.aperture}, ${metadata.focalLength} focal length\n`
  output += `\n`
  output += `${accountsAndTagsTemplateString}\n`

  output += '\n\n\n------END PHOTO DETAILS-----\n\n\n'

  return output
}

export default createTemplate