import React from 'react'

interface ListItemProps {
  styles?: string
}

const ListItem: React.FC<ListItemProps> = ({ styles, children }) => {
  return (
    <ul className="m-0 rounded-lg bg-transparent">
      <li
        className={`w-full px-10 py-2 text-center text-lg font-bold tracking-wider hover:cursor-pointer md:rounded-md md:transition md:duration-300 md:ease-in-out md:hover:-translate-y-1  md:hover:scale-110 ${
          styles ? styles : 'bg-white text-black hover:bg-bole hover:text-white'
        }`}
      >
        {children}
      </li>
    </ul>
  )
}

export default ListItem
