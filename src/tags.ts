import { error } from "console";
import TAGS from "./tags/index";
import { TagOrAccount } from "./types";

function lightroomTagToInstagramTags(hierarchyTagParts: string[], TAGS: any): TagOrAccount[] | null {
  if (hierarchyTagParts.length === 0) {
    return TAGS ? TAGS : null;
  }

  const [first, ...rest] = hierarchyTagParts;
  if (!TAGS[first]) {
    return null;
  }

  return lightroomTagToInstagramTags(rest, TAGS[first]);
}

const lightroomTagsToInstragramTemplateString = (lightroomTags: string[]): { errors: string[] } | { templateString: string, tagsAndAccountsPreview: Record<string, TagOrAccount[]> } => {
  const errors = []

  const instagramTags: TagOrAccount[] = []
  const tagsAndAccountsPreview: Record<string, TagOrAccount[]> = {}

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

    if (result.length === 0) {
      errors.push(`No tags or accounts found for hierarchy tag: ${lightroomTag}`)
      continue
    }

    if (result.some(tag => (tag as unknown as string).includes(' '))) errors.push(`Tag contains space: "${lightroomTag}"`)

    instagramTags.push(...result);
    tagsAndAccountsPreview[lightroomTag] = result
  }

  if (errors.length > 0) {
    return { errors }
  }

  const templateString = instagramTags.join(' ')
  if ("##" in instagramTags || "@@" in instagramTags || "#@" in instagramTags || "@#" in instagramTags) {
    return { errors: ["Invalid tag or account name with ##, @@, #@, or @#"] }
  }

  return { templateString, tagsAndAccountsPreview }
}

export default lightroomTagsToInstragramTemplateString