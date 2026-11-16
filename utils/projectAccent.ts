const isAndroidTag = (tag: string) => tag.includes('android') || tag.includes('kotlin') || tag.includes('compose')
const isIosTag = (tag: string) => tag.includes('ios') || tag.includes('swift')

/** Chip colors by platform: Android green, iOS blue, everything else neutral. */
export const resolveTagAccent = (tag: string) => {
  const normalizedTag = tag.toLowerCase()
  if (isAndroidTag(normalizedTag)) {
    return 'border-accent/45 bg-accent/10 text-accent'
  }
  if (isIosTag(normalizedTag)) {
    return 'border-accent-2/45 bg-accent-2/10 text-accent-2'
  }
  return 'border-border/60 bg-surface-strong text-slate-200'
}

/** Card gradient for a project whose data does not set one. */
export const resolveProjectAccent = (tags: string[]) => {
  const normalizedTags = tags.map((tag) => tag.toLowerCase())
  const hasAndroid = normalizedTags.some(isAndroidTag)
  const hasIos = normalizedTags.some(isIosTag)

  if (hasAndroid && !hasIos) {
    return 'from-accent/30 via-accent/10 to-transparent'
  }
  if (hasIos && !hasAndroid) {
    return 'from-accent-2/30 via-accent-2/10 to-transparent'
  }
  return 'from-accent/20 via-accent-2/12 to-transparent'
}
