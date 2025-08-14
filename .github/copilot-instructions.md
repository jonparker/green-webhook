# Green Webhook Development Instructions

Green Webhook is a carbon-aware webhook proxy built on RedwoodJS that dynamically routes webhook events to endpoints with the lowest carbon intensity. It intelligently chooses which endpoint to invoke based on real-time carbon intensity data from the Carbon Aware SDK.

**Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Environment Requirements
- **CRITICAL**: This project requires Node.js >=14.19 <=16.x according to package.json, but runs with Node 20+ in development
- Uses Yarn 3.2.3 as package manager
- Built with React 17, TypeScript, GraphQL, Prisma, and PostgreSQL (or SQLite for development)
- **NETWORK LIMITATION**: In restricted network environments, Prisma engines cannot be downloaded from binaries.prisma.sh

### Bootstrap and Install Dependencies
```bash
yarn install
```
- **Timing**: Takes ~5 minutes with network delays
- **Expected**: Shows peer dependency warnings (normal for RedwoodJS)
- **Network Issues**: May show Prisma engine download failures (can be worked around)

### Development Setup
1. **Create Environment File**:
```bash
# Create .env file with minimal required variables
SESSION_SECRET=super-secret-development-session-key
DATABASE_URL="file:./dev.db"  # Use SQLite for development
CARBON_AWARE_API_BASE_URI="https://carbon-aware-api.azurewebsites.net"
SCHEDULED_WEBHOOKS_API_KEY=another-super-secret-development-key
DEPLOY_URL=http://localhost:8910
```

2. **Database Setup** (if network allows):
```bash
yarn rw prisma migrate dev
```
- **CRITICAL**: This requires Prisma engines to download
- **Workaround**: If this fails due to network restrictions, frontend development still works

### Build Process
```bash
yarn rw build
```
- **NEVER CANCEL**: Build attempts may take 2-5 minutes due to Prisma engine downloads
- **Timing**: Set timeout to 10+ minutes for full build
- **Network Issues**: Will fail if Prisma engines cannot be downloaded
- **Workaround**: Web-only development works without full build

### Development Server
```bash
# Full-stack development (requires database)
yarn rw dev
```
- **Timing**: Web side builds in ~7-8 seconds, API depends on Prisma success
- **Network Issues**: API will fail if Prisma engines unavailable, but web still builds
- **Prisma Error**: Shows "Error: request to https://binaries.prisma.sh..." but web compilation succeeds
- **Alternative**: Use `yarn rw dev web` for frontend-only development

```bash
# Frontend-only development (always works)
yarn rw dev web
```
- **Timing**: ~7-8 seconds to build, serves on http://localhost:8910
- **Always Works**: Independent of database/Prisma issues
- **Expected Error**: Generator fails with Prisma errors, but webpack compilation succeeds
- **Limitation**: No API calls will work, but UI development is fully functional

### Component Development
```bash
yarn rw storybook
```
- **Timing**: ~14 seconds to start
- **Always Works**: Independent of database/Prisma issues
- **URL**: http://localhost:7910
- **NEVER CANCEL**: Wait for full initialization

### Testing
```bash
# Run tests (requires database setup)
yarn rw test --no-watch
```
- **Network Issues**: Will fail if Prisma engines cannot be downloaded
- **Timing**: Would normally take 30+ seconds, set timeout to 2+ minutes
- **Alternative**: Individual component tests may work if database isn't needed

### Code Quality
```bash
# Lint code
yarn rw lint
```
- **Timing**: ~10 seconds
- **Always Works**: Independent of database issues
- **Auto-fix**: Use `yarn rw lint --fix` to automatically resolve formatting issues

```bash
# Fix linting issues automatically
yarn rw lint --fix
```
- **Timing**: ~10 seconds
- **Reduces Problems**: Typically reduces errors from 1300+ to under 30

## Validation Scenarios

### Quick Validation Test (Always run this first)
Run these commands to verify your development environment:

```bash
# 1. Test linting (10 seconds, should work)
yarn rw lint --fix

# 2. Test Storybook (14 seconds, should work)
yarn rw storybook
# Verify: http://localhost:7910 loads with component library

# 3. Test web development (7-8 seconds, should work)  
yarn rw dev web
# Verify: http://localhost:8910 loads with Green Webhook homepage
# Expected: Generator errors in console, but webpack compilation succeeds
```

### Web Application Testing
**ALWAYS** test these scenarios after making changes to the web application:

1. **Component Development**:
   - Run `yarn rw storybook`
   - Navigate to http://localhost:7910
   - Verify your component renders correctly
   - Test different component states and props
   - **Validation**: Components should render without errors

2. **UI Development**:
   - Run `yarn rw dev web`
   - Navigate to http://localhost:8910
   - **Verify Home Page**: Loads with "GREEN WEBHOOK" branding and green color scheme
   - **Verify Navigation**: Test links between pages (About, Login, Signup)
   - **Verify Responsive Design**: Test by resizing browser window
   - **Expected Behavior**: Page should load despite API/Prisma errors in console

3. **Authentication Flow** (if database is working):
   - Test signup page functionality
   - Test login page functionality
   - Verify user can create webhooks
   - Test webhook management interface

### Full-Stack Testing (requires working database)
**ONLY** run these if you have network access and database connectivity:

1. **Database Setup**:
   ```bash
   yarn rw prisma migrate dev
   ```
   - Should create database tables
   - Should seed initial data if configured

2. **API Development**:
   ```bash
   yarn rw dev
   ```
   - Both web and API should start successfully
   - GraphQL playground should be accessible

3. **Webhook Creation**:
   - Create a new webhook with a test endpoint
   - Verify webhook appears in the list
   - Test webhook invocation via the provided URI

4. **Carbon Awareness**:
   - Verify webhook endpoints are evaluated for carbon intensity
   - Test multiple endpoint selection logic

## Common Tasks

### Repository Structure
```
├── api/                    # Backend GraphQL API
│   ├── src/
│   │   ├── functions/     # Serverless functions
│   │   ├── graphql/       # GraphQL schema and resolvers
│   │   ├── lib/           # Shared backend utilities
│   │   └── services/      # Business logic services
│   └── db/
│       └── schema.prisma  # Database schema
├── web/                   # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── layouts/       # Page layouts
│   │   ├── pages/         # Application pages
│   │   └── lib/           # Frontend utilities
│   └── config/            # Webpack and Tailwind config
├── scripts/               # Database seeding and utilities
└── .github/               # GitHub workflows and templates
```

### Key Files to Check After Changes
- **Always check** `api/src/services/` after modifying data models
- **Always check** `web/src/components/` after changing UI logic
- **Always check** GraphQL schema files after database changes
- **Always run** `yarn rw lint --fix` before committing changes

### Environment-Specific Instructions

### Environment-Specific Instructions

#### Network-Restricted Environments
If you encounter "Error: request to https://binaries.prisma.sh/...binaries.prisma.sh" errors:

**Expected Error Messages**:
```
Error: request to https://binaries.prisma.sh/all_commits/c875e43600dfe042452e0b868f7a48b817b9640b/debian-openssl-3.0.x/libquery_engine.so.node.gz.sha256 failed, reason: getaddrinfo ENOTFOUND binaries.prisma.sh
```

**What Still Works**:
1. **Frontend Development**: Use `yarn rw dev web` - webpack compilation succeeds even when Prisma fails
2. **Storybook**: Component development works perfectly (`yarn rw storybook`)
3. **Linting**: Code quality tools function normally (`yarn rw lint --fix`)
4. **UI Testing**: All React components and pages can be developed and tested

**Workarounds**:
1. **Focus on Frontend Development**:
   - Use `yarn rw dev web` instead of full `yarn rw dev`
   - Use Storybook for component development
   - All UI work will function normally despite backend errors

2. **Database Schema Changes**:
   - Edit `api/db/schema.prisma` manually
   - Document changes for later migration when network access is restored

3. **Mock Data Development**:
   - Create mock data for component development
   - Use Storybook's argument controls to test different data states

#### Normal Network Environment
Follow standard RedwoodJS development practices:

1. Use PostgreSQL for production-like development
2. Run full test suite with `yarn rw test`
3. Complete database migrations with `yarn rw prisma migrate dev`

### Timing Expectations
- **NEVER CANCEL**: Any command taking longer than expected - builds may take 10+ minutes
- **yarn install**: 5+ minutes (network dependent)
- **yarn rw storybook**: 14 seconds (11s manager + 14s preview)
- **yarn rw dev web**: 7-8 seconds for web build
- **yarn rw lint**: 10 seconds
- **yarn rw lint --fix**: 10 seconds (reduces ~1300 problems to ~30)  
- **yarn rw build**: 2-10 minutes (network dependent, often fails in restricted environments)
- **Prisma operations**: May timeout or fail entirely in network-restricted environments

### Command Reference
```bash
# Essential commands that always work
yarn rw lint --fix           # Fix code style issues
yarn rw storybook           # Component development
yarn rw dev web             # Frontend-only development

# Full-stack commands (require database)
yarn rw dev                 # Full development server
yarn rw build               # Production build
yarn rw test                # Run test suite
yarn rw prisma migrate dev  # Database migrations

# Information commands
yarn rw info                # System information
yarn rw --help              # Available commands
```

## Technology Stack
- **Frontend**: React 17, TypeScript, TailwindCSS
- **Backend**: GraphQL, Prisma ORM, Node.js
- **Database**: PostgreSQL (production), SQLite (development fallback)
- **Framework**: RedwoodJS 3.3.1
- **Build System**: Webpack (web), Babel (api)
- **Testing**: Jest, Storybook
- **Package Manager**: Yarn 3.2.3

## Integration Points
- **Carbon Aware SDK**: Real-time carbon intensity data
- **SendInBlue**: Email service for password resets (optional)
- **Netlify**: Deployment platform and serverless functions
- **Railway**: Database hosting service