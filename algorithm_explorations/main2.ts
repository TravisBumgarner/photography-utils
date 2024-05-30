import createTemplate from './createTemplate'
import processPhoto from "./processPhoto"
import getTags from "./tags"


const main = async () => {
  const metadata = await processPhoto('./ff.jpg')
  if ('errorMessage' in metadata) {
    console.error(metadata.errorMessage)
    return
  }
  const accountsAndTags = await getTags(metadata.tags)
  const template = createTemplate({ metadata, accountsAndTags })

  console.log('template', template)
}

main()