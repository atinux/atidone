<script setup>
const { loggedIn, user } = useUserSession()

useHead({
  htmlAttrs: { lang: 'en' },
  link: [
    { rel: 'icon', href: '/icon.png' }
  ]
})

useSeoMeta({
  title: () => user.value ? `${user.value.login} Todos` : 'Nuxt Todos Edge',
  description: 'A Nuxt demo hosted on CloudFlare Pages with server-side rendering on the edge and using the D1 database',
  ogImage: '/social-image.png',
  twitterImage: '/social-image.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UContainer class="min-h-screen flex flex-col justify-center">
    <TodoList v-if="loggedIn" />
    <LoginForm v-else />
    <footer class="text-center mt-2">
      <NuxtLink
        href="https://github.com/atinux/nuxt-todos-edge"
        target="_blank"
        class="text-sm text-gray-500 hover:text-gray-700"
      >
        Source code on GitHub
      </NuxtLink>
    </footer>
  </UContainer>
</template>

<style lang="postcss">
body {
  @apply antialiased font-sans text-gray-500 bg-gray-50;
}
</style>
