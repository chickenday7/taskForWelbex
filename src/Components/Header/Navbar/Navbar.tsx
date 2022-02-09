import React from "react";
import {CustomLink} from "../../SuperComponents/CustomLink";


export const Navbar = () => {
  return(
      <div className='navbar'>
          <CustomLink className='navbar__item' to={'/'}>Main Page</CustomLink>
          <CustomLink className='navbar__item' to={'/todo'}>Todo List</CustomLink>

      </div>
  )
}
