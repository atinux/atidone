# Nuxt Todo List on the Edge

A demonstration using [Nuxt](https://nuxt.com) with server-side rendering on the edge, authentication and database querying using [Cloudflare D1](https://developers.cloudflare.com/d1/).

## Features

- [Server-Side Rendering on the Edge](https://nuxt.com/blog/nuxt-on-the-edge)
- Authentication backed-in using [nuxt-auth-utils](https://github.com/Atinux/nuxt-auth-utils)
- Leverage [Cloudflare D1](https://developers.cloudflare.com/d1/) as database and [drizzle ORM](https://orm.drizzle.team/)
- User interface made with [Nuxt UI](https://ui.nuxt.com)
- Embed [Drizzle Studio](https://orm.drizzle.team/drizzle-studio/overview/) in the [Nuxt DevTools](https://devtools.nuxt.com)

## Live demo

https://todos.nuxt.dev

https://github.com/Atinux/nuxt-todos-edge/assets/904724/5f3bee55-dbae-4329-8057-7d0e16e92f81

## Setup

Make sure to install the dependencies using [pnpm](https://pnpm.io/):

```bash
pnpm i
```

Create a [GitHub Oauth Application](https://github.com/settings/applications/new) with:
- Homepage url: `http://localhost:3000`
- Callback url: `http://localhost:3000/api/auth/github`

Add the variables in the `.env` file:

```bash
NUXT_OAUTH_GITHUB_CLIENT_ID="my-github-oauth-app-id"
NUXT_OAUTH_GITHUB_CLIENT_SECRET="my-github-oauth-app-secret"
```

To create sealed sessions, you also need to add `NUXT_SESSION_SECRET` in the `.env` with at least 32 characters:

```bash
NUXT_SESSION_SECRET="your-super-long-secret-for-session-encryption"
```

## Development

Start the development server on http://localhost:3000

```bash
npm run dev
```

In the Nuxt DevTools, you can see your tables by clicking on the Hub Database tab:

https://github.com/Atinux/nuxt-todos-edge/assets/904724/7ece3f10-aa6f-43d8-a941-7ca549bc208b

## Deploy

You can deploy this project on your Cloudflare account for free and with zero configuration using [NuxtHub](https://hub.nuxt.com).

```bash
npx nuxthub deploy
```

It's also possible to leverage Cloudflare Pages CI for deploying, learn more about the different options on https://hub.nuxt.com/docs/getting-started/deploy

## Remote Storage

Once you deployed your project, you can connect to your remote database locally running:
  
```bash
pnpm dev --remote
```

Learn more about remote storage on https://hub.nuxt.com/docs/getting-started/remote-storage

## License

[MIT License](./LICENSE)
