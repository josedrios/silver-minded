export default function Overlay({ children, overlayToggle, setOverlayToggle }) {

  return (
    <div
      className="overlay-page"
      onClick={() => setOverlayToggle(false)}
      style={{ display: overlayToggle ? "flex" : "none" }}
    >
      {children}
    </div>
  );
}
