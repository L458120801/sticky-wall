import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { StickyNote, Plus, Archive, Info } from 'lucide-react';
import './Navbar.css';

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          <div className="logo-icon">
            <StickyNote size={24} />
          </div>
          <span>CloudWall</span>
        </Link>

        <div className="nav-links">
          <NavLink to="/" icon={<StickyNote size={18} />} label="留言墙" active={location.pathname === '/'} />
          <NavLink to="/create" icon={<Plus size={18} />} label="发布灵感" active={location.pathname === '/create'} />
          <NavLink to="/archive" icon={<Archive size={18} />} label="归档" active={location.pathname === '/archive'} />
          <NavLink to="/about" icon={<Info size={18} />} label="关于" active={location.pathname === '/about'} />
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, icon, label, active }: { to: string, icon: React.ReactNode, label: string, active: boolean }) => (
  <Link
    to={to}
    className={`nav-item ${active ? 'active' : ''}`}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

export default Navbar;
