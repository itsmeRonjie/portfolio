import { computed } from 'vue'
import { dinkBoardSite } from '~/data/dinkBoardSite'

export const useDinkBoardSiteContent = () => {
  const content = computed(() => dinkBoardSite)

  return {
    content
  }
}
