/**
 * Which of the given in-page sections is currently "read" (crosses a line a third of the way
 * down the viewport). Null above the first one. Client-only; always null during SSR.
 */
export const useSectionSpy = (ids: string[]) => {
  const active = ref<string | null>(null)
  let observer: IntersectionObserver | null = null
  const visible = new Set<string>()

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.add(entry.target.id)
          } else {
            visible.delete(entry.target.id)
          }
        }
        // Several can straddle the line at once on short sections: the last in page order wins.
        active.value = [...ids].reverse().find((id) => visible.has(id)) ?? null
      },
      { rootMargin: '-33% 0px -66% 0px' }
    )

    for (const id of ids) {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    }
  })

  onBeforeUnmount(() => observer?.disconnect())

  return active
}
