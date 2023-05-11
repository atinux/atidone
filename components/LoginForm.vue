<script setup>
const isTurso = useState('isTurso', () => Boolean(useRuntimeConfig().turso?.url))
</script>

<template>
  <UCard>
    <template #header>
      <h3 class="text-lg font-semibold leading-6">
        Todo List
      </h3>
      <UButton
        to="/api/auth/github"
        icon="i-simple-icons-github"
        label="Login with GitHub"
        color="black"
        external
      />
    </template>
    <p>
      Welcome to Nuxt Todos Edge. A demo hosted on CloudFlare Pages with server-side rendering on the edge and using the <NuxtLink
        :href="isTurso ? 'https://turso.tech' : 'https://developers.cloudflare.com/d1/'"
        target="_blank"
        class="text-primary-500"
      >
        {{ isTurso ? 'Turso' : 'D1' }} database
      </NuxtLink>.
    </p>
    <hr class="dark:border-gray-700">
    <p class="text-sm text-gray-700 dark:text-gray-300 italic">
      No personal informations regarding your GitHub account are stored in database.<br>
      We store only the todos created linked with your GitHub ID.
    </p>
  </UCard>
</template>