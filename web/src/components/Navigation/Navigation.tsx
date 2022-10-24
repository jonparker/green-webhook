import { useAuth } from '@redwoodjs/auth'

import React from 'react'
import { Link, routes } from '@redwoodjs/router'
import ListItem from '../ListItem/ListItem'

interface NavProps {
  buttonLabel?: string
  buttonTo?: string
}

const Navigation: React.FC<NavProps> = ({ buttonLabel, buttonTo }) => {
  const { isAuthenticated, hasRole, logOut } = useAuth()

  return (
    <nav>
      <ul className='flex flex-col justify-center w-full mt-12 divide-y-2 md:items-center lg:flex-row border-y-2 md:p-10 xl:gap-14 md:bg-green divide-green border-green'>
        <Link to={routes.home()}>
          <ListItem>Home</ListItem>
        </Link>
        <Link to={routes.about()}>
          <ListItem>About</ListItem>
        </Link>
        {hasRole('admin') && (
        <Link to={routes.users()}>
          <ListItem>Admin</ListItem>
        </Link>
        )}
        {isAuthenticated ? (
          <>
            <Link to={routes.webhooks()}>
              <ListItem>Webhooks</ListItem>
            </Link>
              <a href="#" onClick={logOut}>
              <ListItem>Logout</ListItem>
            </a>
            <Link to={buttonTo}>
              <ListItem styles="bg-emerald-800 text-white">+ {buttonLabel}</ListItem>
            </Link>
          </>
        ) : (
          <Link to={routes.login()}>
            <ListItem>Login</ListItem>
          </Link>
        )}
      </ul>
    </nav>
  )
}

export default Navigation