<template>
  <UCard>
    <template #header>
      <h3 class="text-lg font-semibold leading-6 ">
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

    <p class="text-sm text-gray-500">
      Welcome to Nuxt Todos Edge. A demo hosted on CloudFlare Pages with server-side rendering on the edge and using the <NuxtLink
        href="https://developers.cloudflare.com/d1/"
        target="_blank"
        class="text-primary-500"
      >D1 database</NuxtLink>.
    </p>

    <hr>

    <p class="text-sm text-gray-500 italic">
      No personal informations regarding your GitHub account are stored in database.<br>
      We store only the todos created linked with your GitHub ID.
    </p>
  </UCard>
</template>