<template>
  <main class="mx-auto max-w-2xl px-6 py-16 text-center text-slate-300">
    Redirecting to privacy policy...
  </main>
</template>

<script setup lang="ts">
const route = useRoute()
const requestUrl = useRequestURL()

const queryHost = computed(() => {
  const value = route.query.host
  if (typeof value === 'string') {
    return value
  }

  if (Array.isArray(value) && typeof value[0] === 'string') {
    return value[0]
  }

  return ''
})

const host = computed(() => {
  const source = queryHost.value || requestUrl.hostname || ''
  return source.toLowerCase()
})

const targetPath = computed(() => {
  if (host.value === 'alarmclock.ronjiemanon.com') {
    return '/alarm-clock/privacy-policy'
  }

  if (host.value === 'moneymanager.ronjiemanon.com') {
    return '/money-manager/privacy-policy'
  }

  return '/about'
})

await navigateTo(targetPath.value, {
  replace: true,
  redirectCode: 307
})
</script>
