<template>
  <component :is="policyComponent" v-if="policyComponent" />
  <main v-else class="mx-auto max-w-2xl px-6 py-16 text-center text-slate-300">
    <h1 class="text-2xl font-semibold text-white">Privacy Policy</h1>
    <p class="mt-3">
      Open this page from one of the app subdomains:
      <a class="ui-link" href="https://alarmclock.ronjiemanon.com/privacy-policy">alarmclock.ronjiemanon.com</a>
      or
      <a class="ui-link" href="https://moneymanager.ronjiemanon.com/privacy-policy">moneymanager.ronjiemanon.com</a>
      or
      <a class="ui-link" href="https://dinkboard.ronjiemanon.com/privacy-policy">dinkboard.ronjiemanon.com</a>
      or
      <a class="ui-link" href="https://picklequeue.ronjiemanon.com/privacy-policy">picklequeue.ronjiemanon.com</a>.
    </p>
  </main>
</template>

<script setup lang="ts">
import AlarmClockPrivacyPolicyPage from '~/pages/alarm-clock/privacy-policy.vue'
import MoneyManagerPrivacyPolicyPage from '~/pages/money-manager/privacy-policy.vue'
import DinkBoardPrivacyPolicyPage from '~/pages/dinkboard/privacy-policy.vue'
import PickleQueuePrivacyPolicyPage from '~/pages/pickle-queue/privacy-policy.vue'

const route = useRoute()
const requestUrl = useRequestURL()

const queryHost = computed(() => {
  const value = route.query.host
  if (typeof value === 'string') {
    return value.toLowerCase()
  }

  if (Array.isArray(value) && typeof value[0] === 'string') {
    return value[0].toLowerCase()
  }

  return ''
})

const requestHost = computed(() => requestUrl.hostname.toLowerCase())
const host = computed(() => queryHost.value || requestHost.value)

const policyComponent = computed(() => {
  if (host.value === 'alarmclock.ronjiemanon.com') {
    return AlarmClockPrivacyPolicyPage
  }

  if (host.value === 'moneymanager.ronjiemanon.com') {
    return MoneyManagerPrivacyPolicyPage
  }

  if (host.value === 'dinkboard.ronjiemanon.com') {
    return DinkBoardPrivacyPolicyPage
  }

  if (host.value === 'picklequeue.ronjiemanon.com') {
    return PickleQueuePrivacyPolicyPage
  }

  return null
})
</script>
