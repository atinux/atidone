# Manage your Todos with Atidone ☑️

A demonstration using [Nuxt](https://nuxt.com) with server-side rendering, authentication and database querying using [Turso](https://turso.tech) with [Drizzle ORM](https://orm.drizzle.team/).



[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fatinux%2Fatidone%2Ftree%2Fnuxthub-v1&env=NUXT_OAUTH_GITHUB_CLIENT_ID,NUXT_OAUTH_GITHUB_CLIENT_SECRET,NUXT_SESSION_PASSWORD&envDescription=GitHub%20OAuth%20App%20client%20ID%20and%20secret.%20Generate%20a%20random%20session%20password%20min%2032%20chars%20using%20%60openssl%20rand%20-hex%2032%60.&project-name=todos&repository-name=todos&demo-title=Atidone&demo-description=A%20demonstration%20using%20Nuxt%20with%20server-side%20rendering%2C%20authentication%20and%20database%20querying%20using%20Turso%20with%20Drizzle%20ORM&demo-url=https%3A%2F%2Ftodos.nuxt.dev%2F&demo-image=https%3A%2F%2Ftodos.nuxt.dev%2Fsocial-image.png&products=%255B%257B%2522type%2522%253A%2522integration%2522%252C%2522protocol%2522%253A%2522storage%2522%252C%2522productSlug%2522%253A%2522database%2522%252C%2522integrationSlug%2522%253A%2522tursocloud%2522%257D%255D)

## Features

- Authentication backed-in using [nuxt-auth-utils](https://github.com/atinux/nuxt-auth-utils)
- Leverage [Turso](https://turso.tech) as database with [drizzle ORM](https://orm.drizzle.team/) using [NuxtHub DB](https://hub.nuxt.com/docs/storage/database)
- [Automatic database migrations](https://hub.nuxt.com/docs/features/database#database-migrations) in development & when deploying
- User interface made with [Nuxt UI](https://ui.nuxt.com)
- Embed [Drizzle Studio](https://orm.drizzle.team/drizzle-studio/overview/) in the [Nuxt DevTools](https://devtools.nuxt.com)
- Cache invalidation and Optimistic UI with [Pinia Colada](https://pinia-colada.esm.dev)

## Live demo

https://todos.nuxt.dev

https://github.com/atinux/atidone/assets/904724/5f3bee55-dbae-4329-8057-7d0e16e92f81

To see an example using Passkeys (WebAuthn) for authentication, checkout [todo-passkeys](https://github.com/atinux/todo-passkeys).

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

To create sealed sessions, you also need to add `NUXT_SESSION_PASSWORD` in the `.env` with at least 32 characters:

```bash
NUXT_SESSION_PASSWORD="your-super-long-secret-for-session-encryption"
```

## Development

Start the development server on http://localhost:3000

```bash
npm run dev
```

In the Nuxt DevTools, you can see your tables by clicking on the Hub Database tab:

https://github.com/atinux/atidone/assets/904724/7ece3f10-aa6f-43d8-a941-7ca549bc208b

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
