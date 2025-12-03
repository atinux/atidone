<template>
  <div class="flex flex-col gap-4">
    <p class="font-medium">
      Welcome to Atidone.
    </p>
    <p>
      A <a
        href="https://nuxt.com"
        target="_blank"
        class="text-primary"
        rel="noopener"
      >Nuxt</a> demo hosted on <a
        href="https://vercel.com"
        target="_blank"
        rel="noopener"
        class="text-primary"
      >Vercel</a> with server-side rendering on the edge and using <NuxtLink
        href="https://turso.tech"
        target="_blank"
        rel="noopener"
        class="text-primary"
      >
        Turso database
      </NuxtLink>.
    </p>
    <p>
      It is made using <a
        href="https://hub.nuxt.com/docs/features/database"
        class="text-primary"
      >NuxtHub Database</a> and <a
        href="https://github.com/atinux/nuxt-auth-utils"
        target="_blank"
        rel="noopener"
        class="text-primary"
      >nuxt-auth-utils</a> for an almost zero-config development & deployment experience.
    </p>
    <USeparator />
    <p class="text-sm text-neutral-500 italic">
      No personal information regarding your GitHub account are stored in database.<br>
      We store only the todos created linked with your GitHub ID.
    </p>
  </div>
</template>
