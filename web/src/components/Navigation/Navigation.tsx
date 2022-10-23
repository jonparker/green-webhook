import { useAuth } from '@redwoodjs/auth'

import React from 'react'
import { Link, routes } from '@redwoodjs/router'
import ListItem from '../ListItem/ListItem'

const Navigation = () => {
  const { isAuthenticated, hasRole, logOut } = useAuth()

  return (
    <nav>
        <ul className='flex flex-col items-center justify-center w-full mt-12 md:p-10 md:flex-row md:gap-14 bg-green'>
          <Link to={routes.home()} className="">
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
            </>
          ) : (
            <Link to={routes.login()}>
              <ListItem>Login </ListItem>
            </Link>
          )}
        </ul>
      </nav>
  )
}

export default Navigation