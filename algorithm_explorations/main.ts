import processPhoto from "./metadata"
import getTags from "./tags"
import createTemplate from './template'


const main = async () => {
  const metadata = await processPhoto('./z.jpg')
  const accountsAndTags = await getTags(metadata.tags)
  const template = createTemplate({ metadata, accountsAndTags })

  console.log('template', template)
}

main()