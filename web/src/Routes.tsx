// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={ScaffoldLayout} title="Webhooks" titleTo="webhooks" buttonLabel="New Green Webhook" buttonTo="newWebhook">
        <Route path="/webhooks/new" page={WebhookNewWebhookPage} name="newWebhook" />
        <Route path="/webhooks/{id}/edit" page={WebhookEditWebhookPage} name="editWebhook" />
        <Route path="/webhooks/{id}" page={WebhookWebhookPage} name="webhook" />
        <Route path="/webhooks" page={WebhookWebhooksPage} name="webhooks" />
      </Set>
      <Set wrap={DefaultLayout}>
        <Route path="/about" page={AboutPage} name="about" />
        <Route path="/" page={HomePage} name="home" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
