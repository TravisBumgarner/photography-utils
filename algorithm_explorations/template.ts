

const lrTags = {
  tags: [
    'Location|Mexico',
  ],
  title: 'caasd',
  description: 'ascascasc'
} as const

const photoDetails = {
  // src: './a.jpg',
  camera: 'Nikon Z5',
  lens: 'NIKKOR Z 24-120mm f/4 S',
  iso: 'ISO 3600',
  shutterSpeed: '1/80s',
  aperture: 'ƒ/4.0',
  focalLength: '120mm',
  dateTaken: 'October 2022'
} as const


enum ELocation {
  Mexico = 'Location|Mexico',
}

const ValidLrTag = {
  "Location": ELocation
}

const getTags = (lrTag: string) => {
  const lookup: Record<string, { tag: string[], account: string[] }> = {
    [ValidLrTag.Location.Mexico]: {
      tag: [
        "abc",
        "def",
        "hij",
      ],
      account: [
        "me",
        "you"
      ]
    }
  }

  if (!lookup[lrTag]) throw Error(`invalid tag: ${lrTag}`)

  const tags = lookup[lrTag]['tag'].map(tag => `#${tag}`)
  const accounts = lookup[lrTag]['account'].map(account => `@${account}`)
  return [...tags, ...accounts].join(' ')
}

let output = ''
output += `${lrTags.title} ${photoDetails.dateTaken}\n`
output += `\n`
output += `${lrTags.description}\n`
output += `\n`
output += `The Gear - ${photoDetails.camera}, ${photoDetails.lens}\n`
output += `The Setup - ${photoDetails.shutterSpeed}, ${photoDetails.aperture}, ${photoDetails.aperture}, ${photoDetails.focalLength} focal length\n`
output += `\n`
output += `${getTags(lrTags.tags[0])}\n`

console.log(output)