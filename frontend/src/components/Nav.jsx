import { Link, useNavigate } from 'react-router-dom';


export default function Nav() {
  const navigate = useNavigate();

  // const handleMindClick = (e) => {
  //   e.preventDefault(); // prevent default Link behavior
  //   const lastMindPath = localStorage.getItem('lastMindPath') || '/mind';
  //   navigate(lastMindPath);
  // };

  return (
    <nav>
      <Link to="/dash">DASH</Link>
      <Link to="/time">TIME</Link>
      <Link to="/bank">BANK</Link>
      <Link to="/mind">MIND</Link>
      {/* <a href="/mind" onClick={handleMindClick}>
        MIND
      </a>{' '} */}
      {/* <Link to="/designsystem">DESIGN</Link> */}
    </nav>
  );
}
