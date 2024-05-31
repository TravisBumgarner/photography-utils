import TAGS from "./tags/index";

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