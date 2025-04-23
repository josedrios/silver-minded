import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <Link to="/designsystem">DESIGN</Link>
      <Link to="/todo">DASH</Link>
      <Link to="/mind">MIND</Link>
      <Link to="/calendar">TIME</Link>
      <Link to="/finances">BANK</Link>
    </nav>
  );
}