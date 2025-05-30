import { NavLink } from 'react-router-dom';

export default function Nav() {
  return (
    <nav>
      <NavLink
        to="/dash"
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        DASH
      </NavLink>
      <NavLink
        to="/time"
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        TIME
      </NavLink>
      <NavLink
        to="/bank"
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        BANK
      </NavLink>
      <NavLink
        to="/mind"
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        MIND
      </NavLink>
    </nav>
  );
}
