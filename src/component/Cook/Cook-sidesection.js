import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './Cook-items';
import './Cook-sidesection.css';
import { IconContext } from 'react-icons';
import { Scrollbars } from 'react-custom-scrollbars';


function CookSidesection() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
      <div className='navbar-cook'>
          <div className="managerbar-alldata">
            <div className="navItem-title">
              <Link to='#' className='menu-bar'>
                <FaIcons.FaBars onClick={showSidebar} />
              </Link>
              <div className="Fonts">Cook</div>
            </div>
            <div className="navbar-end">
              <Link to='/'>
                <button className="manager-logoutbtn">Logout</button>
              </Link>
            </div>
          </div>
        </div>

        {/* <div className='navbar2'>
          <Link to='#' className='menu-bar'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <div className="Fonts">Cook</div>
          <div className="cook-navend">
            <div></div>
          </div>
        </div> */}
        <nav className={sidebar ? 'nav-menus active' : 'nav-menus'}>
        <Scrollbars style={{ width: "100%", height: "100%" }}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bar'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          </Scrollbars>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default CookSidesection; 