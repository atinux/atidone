<script setup>
const { loggedIn, user } = useUserSession()

const colorMode = useColorMode()
function toggleColorMode() {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}

useHead({
  htmlAttrs: { lang: 'en' },
  link: [
    { rel: 'icon', href: '/icon.png' }
  ]
})

useSeoMeta({
  title: () => user.value ? `${user.value.login} Todos` : 'Nuxt Todos Edge',
  description: 'A Nuxt demo hosted on CloudFlare Pages with server-side rendering on the edge, authentication and queyring a SQLite database',
  ogImage: '/social-image.png',
  twitterImage: '/social-image.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UContainer class="min-h-screen flex flex-col justify-center">
    <div class="mb-2 text-right">
      <UButton square variant="ghost" color="black" :icon="$colorMode.preference === 'dark' ? 'i-heroicons-moon' : 'i-heroicons-sun'" @click="toggleColorMode" />
    </div>
    <TodoList v-if="loggedIn" />
    <LoginForm v-else />
    <footer class="text-center mt-2">
      <NuxtLink href="https://github.com/atinux/nuxt-todos-edge" target="_blank" class="text-sm text-gray-500 hover:text-gray-700">
        GitHub
      </NuxtLink>
      ·
      <NuxtLink href="https://twitter.com/Atinux" target="_blank" class="text-sm text-gray-500 hover:text-gray-700">
        Twitter
      </NuxtLink>
    </footer>
  </UContainer>
</template>

<style lang="postcss">
body {
  @apply antialiased font-sans text-gray-950 bg-gray-50 dark:bg-gray-950 dark:text-gray-50;
}
</style>
