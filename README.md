# Web Application Template

This is an opinionated template for building a web application. It is designed primarily for internal and colleague facing applications within Sainsbury's, but can be extended to other domains.

It provides a sensible starting place with support for:

- Building a component based React application.
- Design System provided from [Fable](https://sainsburys-tech.github.io/design-systems/).
- Server-side and client-side rendering through [Next.js](https://nextjs.org/).
- Environment deployment through [Bosun](https://bosun-docs-user.int.dev.jspaas.uk/).
- Application configuration, including support for environment variables.
- Content security policies and headers to mitigate common web application attacks.
- Support for unit and component testing with [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

You can see the deployed template here [https://luna-boilerplate.int.dev.jspaas.uk/](https://luna-boilerplate.int.dev.jspaas.uk/). You will need to be on the VPN to do so.

## Getting Started

### Quick Start

```sh
# Setup Node version and install dependencies
nvm use
npm install

npm run dev
```

Open [localhost:3000](http://localhost:3000) in your browser.

### Installing Dependencies

This is a [Node](https://nodejs.org) application, and you will require `node v20` available on your machine to build and run it. We recommend [`nvm`](https://github.com/nvm-sh/nvm) to manage multiple versions of Node on one machine.

This application requires dependencies to run. To begin, clone this repository to your development machine. You can then install it's dependencies with [`npm`](https://www.npmjs.com), as below.

```sh
npm install
```

While [`yarn`](https://yarnpkg.com) should also work, we would recommend that you use `npm` to be consistent with others working from this boilerplate, and to benefit from deterministic dependency installation through `package-lock.json`.

### Building the Code

We require a compilation step with [Next.js](https://nextjs.org/) before the application can be run in production mode.

```sh
npm run build
npm run start
```

## Developing from this template

### Component library and styling

The application is setup to be able to use all the Fable components as well as the Tailwind configuration from the `/style` package. You can find more information about the use of these components from [Storybook](https://sainsburys-tech.github.io/design-systems/) and the [Tailwind docs](https://tailwindcss.com/docs).

### Testing, Linting & Formatting

All code in this repository is expected be tested, to give confidence in behaviour and prevent regressions, and is expected to be linted and meet our formatting standards. To help automate this, we use a number of tools, detailed below.

- [TypeScript](https://www.typescriptlang.org/) is used to strict typing and catch type bugs in code. This compiles down to valid JavaScript.

- [ESLint](https://eslint.org/) is used to keep our JavaScript "lint free", and catch mistakes and smells before they become runtime bugs. This also checks things like React best practices and accessibility!

  You can run the ESLint checks manually with `npm run lint`.

- [Prettier](https://prettier.io/) is used to enforce a consistent formatting style across the JavaScript code, to reduce surprise and cognitive load when moving between files in the repository.

  You can run the Prettier checks manually with `npm run prettier`. These are also run by the above linter, as a plugin.

In order to get the best experience of Prettier and ESLint it's highly recommended that you make use of an editor plugin to apply the formatting automatically (e.g. [Prettier - Code formatter](https://github.com/prettier/prettier-vscode) for VS Code).

### Editor Support

We recommend using Microsoft's [Visual Studio Code (VSCode)](https://code.visualstudio.com/) when working on this repository, and provide workspace editor settings and recommended extensions to make your experience better.

However, any text editor is sufficient to work on this code, so please use whatever editor you're most comfortable and productive with.

### Branching & Committing

To make a change to the code in this repository, first create a branch from `main`. Add your changes to this branch, and then raise a pull request against `main` on GitHub. Your changes will be automatically tested, and if approved by one of the maintainers, may be merged. Once merged, they will be automatically deployed to the `dev` environment.

No convention is enforced on branch names or commit messages, but we would encourage authors to think about how understandable things will be for future readers when choosing names or writing messages.

### Docker & Containerisation

This application is setup in a way that supports running the application within a [Docker container](https://www.docker.com). The container is defined in the `Dockerfile` in the root of the repository, and uses a [multistage build](https://docs.docker.com/develop/develop-images/multistage-build) for smaller containers and to reduce information disclosure risks.

You can build and run it locally with with:

```sh
docker build --secret id=GITHUB_PACKAGES_AUTH_TOKEN -t fable-react-boilerplate .
docker run --rm -it -p 3000:80 fable-react-boilerplate
```

### Single Sign On (SSO)

This application template is designed for use on colleague applications, and as such, has support for single sign on (SSO). It uses [`next-auth` and an Entra ID provider](https://authjs.dev/reference/core/providers/microsoft-entra-id) for modern, supported authentication flows, and uses [the auth code with PKCE flow](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow) by default.

Set your application's client ID in the relevant config files.

### Environment Variables & App Configuration

If your application requires different configuration between environments, such as different API URLs for `dev` and `prd` environments, then you must configure these with Bosun environment variables in the appropriate `yaml` files (under `/config/dev|prod/bosun.yaml`).

For **local development**, you can define environment variables in a `.env.development`. This file should **not be committed into source control**. You can find an example local env file named `.env.example` for reference. More information can be found on [Next.js' docs](https://nextjs.org/docs/basic-features/environment-variables#loading-environment-variables).

### Auth

Auth is provided via the `next-auth` package. This implements a server side session which can be retrieved at any time via `await auth()`.

In order to utilise our SSO via Microsoft Entra you will need to ensure that you have created your app registration on the [Azure Portal](https://portal.azure.com/) and added your redirect urls as `mobile and desktop applications` on the `Authentication` tab.

You will need a redirect url per environment, ie.

- `http://localhost:3000/api/auth/callback/entra-pkce`
- `https://<your application's URL>/api/auth/callback/entra-pkce`

> [!TIP]
> If you change the SSO provider `id` from `entra-pkce` to anything else, this will need to be reflected in your redirect url naming.

You need to set the `NEXTAUTH_URL` environment variable as your application's discoverable URL, which would be different per environment.  This is a Bosun limitation, so we need to be explicit. Normally, `next-auth` should work automatically without it, but with our setup, we need to be specific.

### Limit which users can access the application via an allowlist

**Enable User Assignment:**

> This only needs to be done once

- Go to the Enterprise applications section in Azure AD
- Find your application
- Go to Properties (under "Manage")
- Set User assignment required? to Yes
- Click Save

**Assign Specific Users:**

- Go to the Enterprise applications section in Azure AD
- Find your application
- Go to Users and groups (under "Manage")
- Click Add user/group
- Select the specific users or groups you want to allow access
- Click Assign
