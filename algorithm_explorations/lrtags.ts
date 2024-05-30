import * as exifr from 'exifr';

type Sidecar = {
  lr: {
    hierarchicalSubject: string[]
  }
}

// const processHierarchicalSubject = (hierarchicalSubject: Sidecar['lr']['hierarchicalSubject'] | undefined): undefined => {
//   // This function will cause failures further down the line with the lie of `as Record<LightroomKey, string>
//   // In that case need to update Lightroom's Metadata

//   console.log(hierarchicalSubject)

//   // const partialKeys = hierarchicalSubject
//   //   .reduce((accum, entry) => {
//   //     const [key, value] = entry.split('|') as [string, string] // gahhhh.
//   //     accum[key] = value
//   //     return accum
//   //   }, {} as Record<string, string>)

//   // return {
//   //   ...partialKeys,
//   // } as LightroomMetadata
// }


function collapseToRecord(arr: string[]): Record<string, string[] | true> {
  return arr.reduce((acc: Record<string, string[]>, str: string) => {
    // Skip if not hierarchical
    if (!str.includes('|')) {
      console.log('skipping tag', str)
      return acc;
    }

    const [key, value] = str.split('|');

    if (!value) {
      acc[key] = acc[key] || [];
    } else {
      acc[key] = acc[key] ? [...acc[key], value] : [value];
    }
    return acc;
  }, {});
}


const processPhoto = async (file: string) => {

  const sidecar = await exifr.sidecar(file) as unknown as Sidecar
  console.log('sidecar', sidecar)
  const collapsed = collapseToRecord(sidecar.lr.hierarchicalSubject)
  console.log(collapsed)

  // const data = await exifr.parse(file)
  // console.log('data', data)

  // processHierarchicalSubject(sidecar.lr.hierarchicalSubject)

}

const main = async () => {
  const result = await processPhoto('./h.jpg')
  console.log(result)
}

main()