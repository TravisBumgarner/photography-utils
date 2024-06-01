import { error } from "console";
import TAGS from "./tags/index";
import { TagsAndAccounts } from "./types";

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


const lightroomTagsToInstragramTemplateString = (lightroomTags: string[]): { errors: string[] } | { templateString: string, tagsAndAccountsPreview: Record<string, TagsAndAccounts> } => {
  const errors = []

  const instagramTags = []
  const instagramAccounts = []
  const tagsAndAccountsPreview: Record<string, TagsAndAccounts> = {}

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

    if (result.tags.length === 0 && result.accounts.length === 0) {
      errors.push(`No tags or accounts found for hierarchy tag: ${lightroomTag}`)
      continue
    }

    if (result.tags.some(tag => tag.includes(' '))) errors.push(`Tag contains space: ${lightroomTag}`)
    if (result.accounts.some(account => account.includes(' '))) errors.push(`Account contains space: ${lightroomTag}`)

    instagramTags.push(...result.tags);
    instagramAccounts.push(...result.accounts);
    tagsAndAccountsPreview[lightroomTag] = { tags: result.tags, accounts: result.accounts }
  }

  if (errors.length > 0) {
    return { errors }
  }

  const parsedTags = instagramTags.map(tag => `#${tag}`)
  const parsedAccounts = instagramAccounts.map(account => `@${account}`)
  const templateString = [...parsedAccounts, ...parsedTags].join(' ')
  if ("##" in instagramTags || "@@" in instagramTags || "#@" in instagramTags || "@#" in instagramTags) {
    return { errors: ["Invalid tag or account name with ##, @@, #@, or @#"] }
  }
  return { templateString, tagsAndAccountsPreview }
}

export default lightroomTagsToInstragramTemplateString