<script setup lang="ts">
const { loggedIn } = useUserSession()
</script>

<template>
  <UCard>
    <template #header>
      <h3 class="text-lg font-semibold leading-6 mr-4">
        Todo List
      </h3>
      <UButton
        v-if="!loggedIn"
        to="/api/auth/github"
        icon="i-simple-icons-github"
        label="Login with GitHub"
        color="black"
        external
      />
      <div
        v-else
        class="flex flex-wrap gap-x-2"
      >
        <UButton
          to="/todos"
          icon="i-heroicons-list-bullet"
          label="Go to Todos"
          color="black"
        />
        <UButton
          to="/optimistic-todos"
          icon="i-heroicons-sparkles"
          label="Go to Optimistic Todos"
          color="black"
        />
      </div>
    </template>
    <p class="font-medium">
      Welcome to Atidone.
    </p>
    <p>
      A <a
        href="https://nuxt.com"
        target="_blank"
        class="text-primary-500"
        rel="noopener"
      >Nuxt</a> demo hosted on <a
        href="https://pages.cloudflare.com"
        target="_blank"
        rel="noopener"
        class="text-primary-500"
      >Cloudflare Pages</a> with server-side rendering on the edge and using <NuxtLink
        href="https://developers.cloudflare.com/d1/"
        target="_blank"
        rel="noopener"
        class="text-primary-500"
      >
        Cloudflare D1 database
      </NuxtLink>.
    </p>
    <p>
      It is made using <a
        href="https://hub.nuxt.com"
        class="text-primary-500"
      >NuxtHub</a> for a zero-config development & deployment experience on Cloudflare.
    </p>
    <hr class="dark:border-gray-700">
    <p class="text-sm text-gray-700 dark:text-gray-300 italic">
      No personal information regarding your GitHub account are stored in database.<br>
      We store only the todos created linked with your GitHub ID.
    </p>
  </UCard>
</template>
