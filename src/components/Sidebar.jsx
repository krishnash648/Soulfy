import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HiOutlineHashtag, HiOutlineHome, HiOutlineMenu, HiOutlinePhotograph, HiOutlineUserGroup, HiOutlineHeart, HiOutlineMusicNote } from 'react-icons/hi';
import { RiCloseLine } from 'react-icons/ri';

import logo from '../assets/spotifyyy.png';

const links = [
  { name: 'Discover', to: '/', icon: HiOutlineHome },
  { name: 'Around You', to: '/around-you', icon: HiOutlinePhotograph },
  { name: 'Top Artists', to: '/top-artists', icon: HiOutlineUserGroup },
  { name: 'Top Charts', to: '/top-charts', icon: HiOutlineHashtag },
  { name: 'Genres', to: '/genres', icon: HiOutlineMusicNote },
  { name: 'Favorites', to: '/favorites', icon: HiOutlineHeart },
];

const NavLinks = ({ handleClick }) => (
  <div className="mt-10">
    {links.map((item) => (
      <NavLink
        key={item.name}
        to={item.to}
        className={({ isActive }) =>
          `flex flex-row justify-start items-center my-8 text-sm font-semibold transition-colors duration-200 
          ${isActive ? 'text-accent bg-white/10 shadow-lg rounded-xl px-3 py-2 border-l-4 border-accent' : 'text-gray-400 hover:text-accent hover:bg-white/5 hover:shadow-md rounded-lg px-3 py-2'}`
        }
        onClick={() => handleClick && handleClick()}
      >
        <item.icon className="w-6 h-6 mr-2" />
        {item.name}
      </NavLink>
    ))}
  </div>
);

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="md:flex hidden flex-col w-[300px] py-10 px-4 bg-main text-main backdrop-blur-xl shadow-2xl shadow-md rounded-tr-none border-r-2 border-accent/60">
        <img src={logo} alt="logo" className="w-5/6 h-auto mx-auto mb-4 mt-2" />
        <NavLinks />
      </div>

      {/* Mobile Menu Button */}
      <div className="absolute md:hidden block top-6 right-3 z-30">
        {!mobileMenuOpen ? (
          <HiOutlineMenu
            className="w-8 h-8 text-white drop-shadow-lg cursor-pointer"
            onClick={() => setMobileMenuOpen(true)}
          />
        ) : (
          <RiCloseLine
            className="w-8 h-8 text-white drop-shadow-lg cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 left-0 h-screen w-2/3 bg-gradient-to-tl from-white/20 to-[#483D8B]/80 backdrop-blur-2xl shadow-2xl z-20 p-6 md:hidden transition-all duration-300 rounded-r-3xl border-r-2 border-accent/60 ${mobileMenuOpen ? 'left-0' : '-left-full'}`}>
        <img src={logo} alt="logo" className="w-5/6 h-auto mx-auto mb-4 mt-2" />
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  );
};

export default Sidebar;
