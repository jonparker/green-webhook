// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Private, Router, Route, Set } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout'

const Routes = () => {
  return (
    <Router>
      <Private unauthenticated="home" roles={['admin']}>
        <Set wrap={ScaffoldLayout} buttonLabel="New User" buttonTo="newUser">
          <Route path="/users/new" page={UserNewUserPage} name="newUser" />
          <Route path="/users/{id}/edit" page={UserEditUserPage} name="editUser" />
          <Route path="/users/{id}" page={UserUserPage} name="user" />
          <Route path="/users" page={UserUsersPage} name="users" />
        </Set>
      </Private>
      <Set wrap={ScaffoldLayout} buttonLabel="New Audit" buttonTo="newAudit">
        <Route path="/audits/new" page={AuditNewAuditPage} name="newAudit" />
        <Route path="/audits/{id}/edit" page={AuditEditAuditPage} name="editAudit" />
        <Route path="/audits/{id}" page={AuditAuditPage} name="audit" />
        <Route path="/audits" page={AuditAuditsPage} name="audits" />
      </Set>
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Private unauthenticated="home">
        <Set wrap={ScaffoldLayout} buttonLabel="Create Green Webhook" buttonTo="newWebhook">
          <Route path="/webhooks/new" page={WebhookNewWebhookPage} name="newWebhook" />
          <Route path="/webhooks/{id}/edit" page={WebhookEditWebhookPage} name="editWebhook" />
          <Route path="/webhooks/{id}" page={WebhookWebhookPage} name="webhook" />
          <Route path="/webhooks" page={WebhookWebhooksPage} name="webhooks" />
        </Set>
      </Private>
      <Set wrap={DefaultLayout} >
        <Route path="/about" page={AboutPage} name="about" />
        <Route path="/" page={HomePage} name="home" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
