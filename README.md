# Ticketing

Ticketing application Sainsbury's and Argos stores.

## Our Mission

We ensure the ticketing process runs seamlessly across Sainsbury's and Argos stores while modernising the architecture behind it. We're focused on building a future-ready foundation that supports accurate pricing, operational efficiency, and customer trust.

## What We Do

Ticketing is critical for price accuracy and customer trust. We manage the creation and printing of Shelf Edge Labels (SELs) and Electronic Shelf Edge Labels (ESELs) that display essential information including prices, promotions, product details, and planogram information across stores.

## Technology Stack

This application provides:

- Building a component based React application.
- Design System provided from [Fable](https://sainsburys-tech.github.io/design-systems/).
- Server-side and client-side rendering through [Next.js](https://nextjs.org/).
- Environment deployment through [Bosun](https://bosun-docs-user.int.dev.jspaas.uk/).
- Application configuration, including support for environment variables.
- Content security policies and headers to mitigate common web application attacks.
- Support for unit and component testing with [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

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

You need to set the `NEXTAUTH_URL` environment variable as your application's discoverable URL, which would be different per environment. This is a Bosun limitation, so we need to be explicit. Normally, `next-auth` should work automatically without it, but with our setup, we need to be specific.

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

## Deployment

### Environments

The application is deployed across three environments:

- **Dev**: https://ticketing-app.int.dev.jspaas.uk (Auto-deploy from `develop` branch)
- **Staging**: https://ticketing-app.int.stg.jspaas.uk (Auto-deploy from `main` branch)
- **Production**: https://ticketing-app.prd.jspaas.uk (Auto-deploy from `main` branch after staging)

All environments require VPN access.

### Bosun Deployment

The application is deployed using Bosun platform. Deployment happens automatically via GitHub Actions:

- Pushing to `develop` branch deploys to **dev**
- Pushing to `main` branch deploys to **staging** and **production** (after staging succeeds)

#### Manual Deployment

If you need to deploy manually:

```bash
# Install Bosun CLI
npm install -g @sainsburys-tech/bosun-cli

# Login to Bosun
bosun login

# Deploy to dev
bosun deploy dev

# Deploy to staging
bosun deploy stg

# Deploy to production
bosun deploy prd
```

#### Managing Secrets

All secrets are stored in Bosun Vault. See [BOSUN_VAULT_SECRETS.md](BOSUN_VAULT_SECRETS.md) for detailed instructions on:

- Required secrets for each environment
- How to set secrets in Bosun Vault
- Azure AD App Registration configuration

**Quick setup:**

```bash
# Set AUTH_SECRET (generate with: openssl rand -base64 32)
bosun vault:set secret/data/team-nucleus/ticketing-app AUTH_SECRET "your-generated-secret"

# Set Azure AD configuration
bosun vault:set secret/data/team-nucleus/ticketing-app AUTH_MICROSOFT_ENTRA_ID_TENANT_ID "your-tenant-id"
bosun vault:set secret/data/team-nucleus/ticketing-app AUTH_MICROSOFT_ENTRA_ID_CLIENT_ID_DEV "dev-client-id"
bosun vault:set secret/data/team-nucleus/ticketing-app AUTH_MICROSOFT_ENTRA_ID_CLIENT_ID_STG "stg-client-id"
bosun vault:set secret/data/team-nucleus/ticketing-app AUTH_MICROSOFT_ENTRA_ID_CLIENT_ID_PRD "prd-client-id"
```

#### Monitoring Deployments

```bash
# Check application status
bosun app:info ticketing-app dev
bosun app:info ticketing-app stg
bosun app:info ticketing-app prd

# View application logs
bosun logs ticketing-app dev
bosun logs ticketing-app stg
bosun logs ticketing-app prd

# Follow logs in real-time
bosun logs ticketing-app dev --follow
```

#### Health Check

Each environment provides a health check endpoint:

```bash
# Check if the application is healthy
curl https://ticketing-app.int.dev.jspaas.uk/api/health
```

Expected response:

```json
{
  "status": "healthy",
  "timestamp": "2025-12-17T10:30:00.000Z",
  "service": "ticketing-app",
  "version": "1.0.0"
}
```

### Deployment Configuration

Environment-specific configuration is managed through Bosun YAML files:

- `bosun.yaml` - Main configuration
- `config/dev/bosun.yaml` - Dev environment overrides
- `config/stg/bosun.yaml` - Staging environment overrides
- `config/prd/bosun.yaml` - Production environment overrides

**Important**: Never commit secrets to these files. Use Bosun Vault references like:

```yaml
AUTH_SECRET: 'vault:secret/data/team-nucleus/ticketing-app#AUTH_SECRET'
```

### CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/deploy.yml`) handles:

1. **Testing**: Runs linting, tests, and builds
2. **Dev Deployment**: Auto-deploys when code is pushed to `develop`
3. **Staging Deployment**: Auto-deploys when code is pushed to `main`
4. **Production Deployment**: Auto-deploys to production after staging succeeds

To trigger a deployment:

- For dev: Push to `develop` branch
- For staging & production: Push to `main` branch

### Rollback

If you need to rollback a deployment:

```bash
# List recent deployments
bosun releases ticketing-app prd

# Rollback to a specific version
bosun rollback ticketing-app prd <version-number>
```

### Contact

For deployment issues or questions:

- Team: Team Nucleus
- Email: team_nucleus@sainsburys.co.uk
- Product Manager: Dan Ellicott
