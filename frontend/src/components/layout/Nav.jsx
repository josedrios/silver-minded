import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <Link to="/todo">TODO</Link>
      <Link to="/calendar">CALENDAR</Link>
      <Link to="/finances">FINANCES</Link>
      <Link to="/other">OTHER</Link>
    </nav>
  );
}