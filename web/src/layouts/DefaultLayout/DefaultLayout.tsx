import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'

type DefaultLayoutProps = {
  children?: React.ReactNode
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const { isAuthenticated, hasRole, logOut } = useAuth()
  return (
    <>
      <header>
        <h1>
          <Link to={routes.home()}>Green Webhook</Link>
        </h1>
        <nav>
          <ul>
            <li>
              <Link to={routes.home()}>Home</Link>
            </li>
            <li>
              <Link to={routes.about()}>About</Link>
            </li>
            {hasRole('admin') && (
              <li>
                <Link to={routes.users()}>Admin</Link>
              </li>
            )}
            {isAuthenticated ? (
              <>
                <li>
                  <Link to={routes.webhooks()}>Webhooks</Link>
                </li>
                <li>
                  <a href="#" onClick={logOut}>
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <li>
                <Link to={routes.login()}>Login</Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </>
  )
}

export default DefaultLayout
