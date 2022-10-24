import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'
import Header from 'src/components/Header/Header'
import Navigation from 'src/components/Navigation/Navigation'

type LayoutProps = {
  title: string
  titleTo: string
  buttonLabel: string
  buttonTo: string
  children: React.ReactNode
}

const ScaffoldLayout = ({
  title,
  titleTo,
  buttonLabel,
  buttonTo,
  children,
}: LayoutProps) => {
  const { isAuthenticated, logOut, hasRole } = useAuth()
  return (
    <>
      <Header />
      <Navigation buttonLabel={buttonLabel} buttonTo={buttonTo}/>
      <main className='flex items-center justify-center px-5'>{children}</main>
    </>
  )
}

export default ScaffoldLayout
