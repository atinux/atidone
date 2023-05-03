<script setup>
const { loggedIn, user } = useUserSession()

useSeoMeta({
  title: () => user.value ? `${user.value.login} Todos` : 'Nuxt Todos Edge',
  description: 'A Nuxt demo hosted on CloudFlare Pages with server-side rendering on the edge and using the D1 database'
})
</script>

<template>
  <div class="container mx-auto min-h-screen flex items-center justify-center">
    <main>
      <div class="p-8 border rounded bg-gray-50 shadow-sm">
        <h1 class="text-3xl pb-4">
          Todo List
        </h1>
        <TodoList v-if="loggedIn" />
        <div v-else>
          <p class="text-sm text-gray-500 max-w-sm mb-4">
            Welcome to Nuxt Todos Edge. A demo hosted on CloudFlare Pages with server-side rendering on the edge and using the <NuxtLink
              href="https://developers.cloudflare.com/d1/"
              target="_blank"
            >
              D1 database
            </NuxtLink>.
          </p>
          <a
            href="/api/auth/github"
            class="inline-block bg-black text-white p-3 py-1 rounded hover:bg-gray-800"
          >Login with GitHub</a>
          <p class="text-sm text-gray-500 italic max-w-sm mt-4">
            No personal informations regarding your GitHub account are stored in database.<br>
            We store only the todos created linked with your GitHub ID.
          </p>
        </div>
      </div>
      <footer class="text-center mt-2">
        <NuxtLink
          href="https://github.com/atinux/nuxt-todos-edge"
          target="_blank"
          class="text-sm text-gray-500 hover:text-gray-700"
        >
          Source code on GitHub
        </NuxtLink>
      </footer>
    </main>
  </div>
</template>
