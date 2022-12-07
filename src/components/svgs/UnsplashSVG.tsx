import SVGProps from "./SVGProps";

function UnsplashSVG({ className }: SVGProps) {
  return (
    <svg
      className={`${className}`}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <path d="M7.5 6.75V0h9v6.75h-9zm9 3.75H24V24H0V10.5h7.5v6.75h9V10.5z" />
    </svg>
  );
}

export default UnsplashSVG;
