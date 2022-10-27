import React from 'react'

import { useAuth } from '@redwoodjs/auth'
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
      <ul className="mt-12 flex w-full flex-col justify-center divide-y-2 divide-green border-y-2 border-green md:items-center md:bg-green md:p-10 lg:flex-row xl:gap-14">
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
            <button onClick={logOut}>
              <ListItem>Logout</ListItem>
            </button>
            {buttonLabel ? (
              <Link to={routes[`${buttonTo}`]()}>
                <ListItem styles="bg-emerald-800 text-white">
                  + {buttonLabel}
                </ListItem>
              </Link>
            ) : null}
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
