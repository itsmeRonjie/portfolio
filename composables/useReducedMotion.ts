/**
 * Reactive `prefers-reduced-motion`. False during SSR and until mounted, so markup
 * that depends on it must be safe to hydrate in the "motion allowed" state.
 */
export const useReducedMotion = () => {
  const reduced = ref(false)
  let query: MediaQueryList | null = null

  const update = () => {
    reduced.value = query?.matches ?? false
  }

  onMounted(() => {
    query = window.matchMedia('(prefers-reduced-motion: reduce)')
    update()
    query.addEventListener('change', update)
  })

  onBeforeUnmount(() => {
    query?.removeEventListener('change', update)
  })

  return reduced
}
