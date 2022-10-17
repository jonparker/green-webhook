import { Link, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'

type DefaultLayoutProps = {
  children?: React.ReactNode
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const { isAuthenticated } = useAuth()
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
            {isAuthenticated ? (
              <li>
                <Link to={routes.webhooks()}>Webhooks</Link>
              </li>
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
