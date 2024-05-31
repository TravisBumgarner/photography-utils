type Value = {
  tags: string[],
  accounts: string[]
}

const Camera: Record<string, Value> = {
  NikonZ5: {
    tags: [],
    accounts: []
  },
  Pixel3: {
    tags: [],
    accounts: []
  },
  iPhone13: {
    tags: [],
    accounts: []
  },
  iPhone15: {
    tags: [],
    accounts: []
  },
  YashicaC: {
    tags: [],
    accounts: []
  },
}

const SocialEvent: Record<string, Value> = {
  DayOfTheDead: {
    tags: [],
    accounts: []
  },
  MexicoCityFireworksFestival: {
    tags: [],
    accounts: []
  },
}

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

const PhotoType = {
  Animals: {
    tags: [],
    accounts: []
  },
  Leaves: {
    tags: [],
    accounts: []
  },
  BlackAndWhite: {
    tags: [],
    accounts: []
  },
  Clouds: {
    tags: [],
    accounts: []
  },
  Stars: {
    tags: [],
    accounts: []
  },
  Storms: {
    tags: [],
    accounts: []
  },
  Sunsets: {
    tags: [],
    accounts: []
  }
}

const Special = {
  NatGeoYourShot: {
    tags: [],
    accounts: []
  },
  ShadowMagazine: {
    tags: [],
    accounts: []
  },
}

const TAGS = {
  Camera,
  SocialEvent,
  Place,
  PhotoType,
  Special
}

function getTagsAndAccounts(hierarchyTagParts: string[], TAGS: any): { tags: string[], accounts: string[] } | null {
  if (hierarchyTagParts.length === 0) {
    return TAGS.tags && TAGS.accounts ? { tags: TAGS.tags, accounts: TAGS.accounts } : null;
  }

  const [first, ...rest] = hierarchyTagParts;
  if (!TAGS[first]) {
    return null;
  }

  return getTagsAndAccounts(rest, TAGS[first]);
}


const getTags = (hierarchyTags: string[]): { errors: string[] } | { tags: string } => {
  const errors = []

  const tags = []
  const accounts = []

  for (const hierarchyTag of hierarchyTags) {
    const hierarchyTagParts = hierarchyTag.split('|');
    const result = getTagsAndAccounts(hierarchyTagParts, TAGS);
    if (!result) {
      errors.push(`Unknown hierarchy tag: ${hierarchyTag}`)
      continue
    }

    tags.push(...result.tags);
    accounts.push(...result.accounts);
  }

  if (errors.length > 0) {
    return { errors }
  }

  const parsedTags = tags.map(tag => `#${tag}`)
  const parsedAccounts = accounts.map(account => `@${account}`)
  return { tags: [...parsedAccounts, ...parsedTags].join(' ') }
}

export default getTags