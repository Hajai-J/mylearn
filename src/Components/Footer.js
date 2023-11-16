import React from 'react'

const Footer = ({length}) => {
    const year = new Date();
  return (
   <footer>Copyright  &copy; {year.getDate()} /{year.getFullYear()} {length} List {length === 1 ? "item" : "items"} </footer>
  )
}

export default Footer