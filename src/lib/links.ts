// PR always resolves to the dedicated Cosmetic PR flagship page — never a
// competing /services/pr route (which only exists as a permanent redirect).
export function serviceHref(slug: string): string {
  return slug === 'pr' ? '/cosmetic-pr' : `/services/${slug}`
}
