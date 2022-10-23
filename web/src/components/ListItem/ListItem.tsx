import React from 'react'

const ListItem = ({children}) => {
  return (
    <li className='w-screen px-10 py-2 my-2 mr-0 text-lg font-bold tracking-wider text-center bg-white md:duration-300 md:ease-in-out md:transition md:w-fit md:rounded-md text-bole md:hover:-translate-y-1 md:hover:scale-110 hover:bg-bole hover:text-white hover:cursor-pointer'>
      {children}
    </li>
  )
}

export default ListItem