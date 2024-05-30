import * as exifr from 'exifr';

type Sidecar = {
  lr: {
    hierarchicalSubject: string[]
  },
  dc: {
    title: {
      value: string
    },
    description: {
      value: string
    }
  }
}


const collapsedcRecord = (dc: Sidecar['dc']) => {
  return {
    title: dc.title.value,
    description: dc.description.value
  }
}


const processPhoto = async (file: string) => {

  const sidecar = await exifr.sidecar(file) as unknown as Sidecar
  console.log('sidecar', sidecar)
  const collapsedDc = collapsedcRecord(sidecar.dc)
  const collapsed = { tags: sidecar.lr.hierarchicalSubject, ...collapsedDc }
  console.log(collapsed)

  const data = await exifr.parse(file)
  console.log('data', data)

  // processHierarchicalSubject(sidecar.lr.hierarchicalSubject)

}

const main = async () => {
  const result = await processPhoto('./j.jpg')
  console.log(result)
}

main()