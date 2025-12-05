<script setup lang="ts">
import type { DropdownMenuItem } from '#ui/types'

const { loggedIn, user, clear } = useUserSession()
const colorMode = useColorMode()

watch(loggedIn, () => {
  if (!loggedIn.value) {
    navigateTo('/')
  }
})

const isDarkMode = computed({
  get: () => colorMode.preference === 'dark',
  set: () =>
    (colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark')
})

useHead({
  htmlAttrs: { lang: 'en' },
  link: [{ rel: 'icon', href: '/icon.png' }]
})

useSeoMeta({
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  title: 'Atidone',
  description:
    'A Nuxt demo hosted with edge-side rendering, authentication and queyring a Cloudflare D1 database',
  ogImage: '/social-image.png',
  twitterImage: '/social-image.png',
  twitterCard: 'summary_large_image'
})

const items = [
  [
    {
      label: 'Logout',
      icon: 'i-lucide-log-out',
      onSelect: clear
    }
  ]
] satisfies DropdownMenuItem[][]
</script>

<template>
  <UApp>
    <UContainer class="min-h-screen flex flex-col my-4">
      <div class="mb-2 text-right">
        <UButton
          square
          variant="ghost"
          color="neutral"
          :icon="
            $colorMode.preference === 'dark' || $colorMode.preference === 'system'
              ? 'i-lucide-moon'
              : 'i-lucide-sun'
          "
          @click="isDarkMode = !isDarkMode"
        />
      </div>

      <UCard variant="subtle">
        <template #header>
          <h3 class="text-lg font-semibold leading-6">
            <NuxtLink to="/">
              Atidone
            </NuxtLink>
          </h3>
          <UButton
            v-if="!loggedIn"
            to="/api/auth/github"
            icon="i-simple-icons-github"
            label="Login with GitHub"
            color="neutral"
            size="xs"
            external
          />
          <div
            v-else
            class="flex flex-wrap -mx-2 sm:mx-0"
          >
            <UButton
              to="/todos"
              icon="i-lucide-list"
              label="Todos"
              :color="$route.path === '/todos' ? 'primary' : 'neutral'"
              variant="ghost"
            />
            <UButton
              to="/optimistic-todos"
              icon="i-lucide-sparkles"
              label="Optimistic Todos"
              :color="$route.path === '/optimistic-todos' ? 'primary' : 'neutral'"
              variant="ghost"
            />
            <UDropdownMenu
              v-if="user"
              :items="items"
            >
              <UButton
                color="neutral"
                variant="ghost"
                trailing-icon="i-lucide-chevron-down"
              >
                <UAvatar
                  :src="`https://github.com/${user.login}.png`"
                  :alt="user.login"
                  size="3xs"
                />
                {{ user.login }}
              </UButton>
            </UDropdownMenu>
          </div>
        </template>
        <NuxtPage />
      </UCard>

      <footer class="flex items-center justify-center gap-2 mt-4">
        <UButton
          href="https://github.com/atinux/atidone"
          target="_blank"
          color="neutral"
          variant="ghost"
          size="sm"
          icon="i-simple-icons-github"
        />
        <UButton
          href="https://x.com/atinux"
          target="_blank"
          color="neutral"
          variant="ghost"
          size="sm"
          icon="i-simple-icons-x"
        />
      </footer>
    </UContainer>
  </UApp>
</template>

<style lang="postcss">
body {
  @apply font-sans text-neutral-950 bg-neutral-50 dark:bg-neutral-950 dark:text-neutral-50;
}
</style>
