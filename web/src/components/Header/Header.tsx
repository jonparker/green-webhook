import React from 'react'
import { Link, routes } from '@redwoodjs/router'
import logo from './logo-no-background.png'

const Header = () => {
  return (
    <header>
      <div className="mt-8">
        <Link to={routes.home()}>
          <img src={logo} alt="Green Webhook" className="px-12 m-auto md:h-40" />
        </Link>
      </div>
    </header>
  )
}

export default Header
