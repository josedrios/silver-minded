import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <Link to="/designsystem">DESIGN</Link>
      <Link to="/dash">DASH</Link>
      <Link to="/mind">MIND</Link>
      <Link to="/time">TIME</Link>
      <Link to="/bank">BANK</Link>
    </nav>
  );
}