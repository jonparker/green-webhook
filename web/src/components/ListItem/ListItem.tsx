import React from 'react'

interface ListItemProps {
  styles?: string
}

const ListItem: React.FC<ListItemProps> = ({styles, children}) => {
  return (
    <li className={`w-full px-10 py-2 text-lg font-bold tracking-wider text-center md:duration-300 md:ease-in-out md:transition md:rounded-md md:hover:-translate-y-1 md:hover:scale-110  hover:cursor-pointer ${styles ?  styles : "text-bole bg-white hover:bg-bole hover:text-white"}`}>
    {children}
  </li>
  )
}

export default ListItem