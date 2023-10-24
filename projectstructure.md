## Proposed Project Structure

### Core

- Single Domain project so all reliant code looks at one collection of domain models and enums
- Common project that serves as base for app-specific projects
- Separate application project for each application

### Infrastructure

- Single Migrations project to relate to the single database
  - The SchemaVersions table in the database will need to be updated so script namespaces match and prevent scripts running a second time
- Single Persistence project to relate to the single database and Domain project
- Common infrastructure project for APIs that can make use of more generic ipmlementations (e.g. SMTP)
- Infrastructure project specifically for proposal tracker due to its robust PDF and Excel export functionality
- LandManager-specific Infrastructure projects can be set up in the future when warranted

### API

I believe it makes sense for each API to have its own project. This allows each application to have their own Program and Startup files, authorization policies, IDServer config, and parameters for depencency injection (e.g. file paths or email subject prefix).

### UI

We have multiple options for structuring UI code. Below are a couple of the more obvious choices.

#### Option 1: Separate UI projects

Each project will be in its own directory, with its own package.json and webpack config. Ideally we'd be able to share common components between apps but how that will be implemented is yet to be determined.

#### Option 2: Single UI project with multiple entry points

All the UIs will live in a single project with a single package.json, and multiple entry points (i.e. index.tsx). This should make it easier to update dependencies and share components among the applications. Unnecessarily bloating bundle size will be something to watch out for with this approach. This is Ross' preferred method if we can make it work.

## Debugging

Each API and UI (either project or package build task, TBD) will have its own item in launch.json. Compound launch tasks will be set up for each application.

## Build Tasks

One potential problem with a single repository is building and deploying.

Bitbucket Pipelines is set up to only have a single yml file in the root of the repository. Ideally, we'd be able to only build relevant code for each application but that may be difficult to detect given how much code we are hoping to reuse for each application. I believe the biggest downside to having all the code build and deploy is unnecessarily eating up build minutes and slowing down the overall deployment speed.

## Other Questions/Considerations

- Does this restructure change the difficulty of making more granular IdentityServer permissions?
