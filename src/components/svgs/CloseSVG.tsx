import SVGProps from "./SVGProps";

function CloseSVG({ className }: SVGProps) {
  return (
    <svg
      className={`${className}`}
      width="24"
      height="24"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="'x' icon"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  );
}

export default CloseSVG;
