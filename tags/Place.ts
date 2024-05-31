import { Value } from "../types"

const Mexico: Record<string, Value> = {
  MexicoCity: {
    tags: ['test2'],
    accounts: ['test3']
  },
  Country: {
    tags: ['test1'],
    accounts: ['test4']
  }
}

const USA: Record<string, Record<string, Value>> = {
  Arizona: {
    State: {
      tags: [],
      accounts: []
    },
  },
  Colorado: {
    State: {
      tags: [],
      accounts: []
    },
  },
  Montana: {
    State: {
      tags: [],
      accounts: []
    },
  },
  Utah: {
    State: {
      tags: [],
      accounts: []
    },
  },
}

const NationalPark: Record<string, Value> = {
  Arches: {
    tags: [],
    accounts: []
  },
  Banff: {
    tags: [],
    accounts: []
  },
  Glacier: {
    tags: [],
    accounts: []
  },
}

const Place = {
  Mexico,
  USA,
  NationalPark
}

export default Place