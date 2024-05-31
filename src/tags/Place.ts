import { Value } from "../types"

const Mexico: Record<string, Value> = {
  MexicoCity: {
    tags: [
      "cdmx",
      "mexicocity",
      "mexicodf",
    ],
    accounts: []
  },
  Country: {
    tags: [
      "mexico",
      "mexicomagico",
      "mexicotravel",
      "mexicolindo",
    ],
    accounts: []
  }
}

const USA: Record<string, Record<string, Value>> = {
  Arizona: {
    State: {
      tags: [
        "arizona",
        "az",
      ],
      accounts: []
    },
    ApacheJunction: {
      tags: [
        "myphx",
        "cactus",
        "cactuslover",
        "cactusgram",
        "apachejunction",
        "phoenix",
      ],
      accounts: []
    },
  },
  Colorado: {
    State: {
      tags: [
        "colorado",
        "coloradophotographer",
        "coloradophotography",
        "coloradolove",
      ],
      accounts: []
    },
  },
  Montana: {
    State: {
      tags: [
        "montana",
        "montanacolors",
        "montanalife",
        "montanaliving",
        "montanaphotographer",
      ],
      accounts: []
    },
  },
  Utah: {
    State: {
      tags: [
        "utah",
        "utahphotographer",
        "utahphotography",
        "utahisbeautiful",
        "utahtravels",
        "utah",
      ],
      accounts: []
    },
  },
}

const NationalPark: Record<string, Value> = {
  Arches: {
    tags: [
      "archesnationalpark",
      "archesnps",
    ],
    accounts: [
      "archesnps"
    ]
  },
  Banff: {
    tags: [
      "banff",
      "banffnationalpark",
      "banffcanada",
      "banffalberta ",
    ],
    accounts: [
      "banff.national.park"
    ]
  },
  Glacier: {
    tags: [
      "glaciernationalpark",
      "glaciernps ",
    ],
    accounts: [
      "glaciernps "
    ]
  },
}

const Place = {
  Mexico,
  USA,
  NationalPark
}

export default Place