import TAGS from "./tags/index";
import { Value } from "./types";

function lightroomTagToInstagramTags(hierarchyTagParts: string[], TAGS: any): { tags: string[], accounts: string[] } | null {
  if (hierarchyTagParts.length === 0) {
    return TAGS.tags && TAGS.accounts ? { tags: TAGS.tags, accounts: TAGS.accounts } : null;
  }

  const [first, ...rest] = hierarchyTagParts;
  if (!TAGS[first]) {
    return null;
  }

  return lightroomTagToInstagramTags(rest, TAGS[first]);
}


const lightroomTagsToInstragramTemplateString = (lightroomTags: string[]): { errors: string[] } | { templateString: string, tagsAndAccountsPreview: Record<string, Value> } => {
  const errors = []

  const instagramTags = []
  const instagramAccounts = []
  const tagsAndAccountsPreview: Record<string, Value> = {}

  for (let lightroomTag of lightroomTags) {
    if (!lightroomTag.includes('cameracoffeewander')) {
      console.log("\t\tSkipping tag that doesn't include cameracoffeewander: ", lightroomTag)
      continue
    }

    lightroomTag = lightroomTag.replace('cameracoffeewander|', '')


    const lightroomTagParts = [...lightroomTag.split('|')];
    const result = lightroomTagToInstagramTags(lightroomTagParts, TAGS);
    if (!result) {
      errors.push(`Unknown hierarchy tag: ${lightroomTag}`)
      continue
    }

    instagramTags.push(...result.tags);
    instagramAccounts.push(...result.accounts);
    tagsAndAccountsPreview[lightroomTag] = { tags: result.tags, accounts: result.accounts }
  }

  if (errors.length > 0) {
    return { errors }
  }

  const parsedTags = instagramTags.map(tag => `#${tag.trim()}`)
  const parsedAccounts = instagramAccounts.map(account => `@${account.trim()}`)
  const templateString = [...parsedAccounts, ...parsedTags].join(' ')
  if ("##" in instagramTags || "@@" in instagramTags || "#@" in instagramTags || "@#" in instagramTags) {
    return { errors: ["Invalid tag or account name with ##, @@, #@, or @#"] }
  }
  return { templateString, tagsAndAccountsPreview }
}

export default lightroomTagsToInstragramTemplateString