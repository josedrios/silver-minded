import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <Link to="/dash">DASH</Link>
      <Link to="/time">TIME</Link>
      <Link to="/bank">BANK</Link>
      <Link to="/mind">MIND</Link>
      <Link to="/designsystem">DESIGN</Link>
    </nav>
  );
}