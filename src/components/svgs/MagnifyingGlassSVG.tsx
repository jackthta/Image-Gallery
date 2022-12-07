import SVGProps from "./SVGProps";

function MagnifyingGlassSVG({ className }: SVGProps) {
  return (
    <svg
      className={`${className}`}
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color="currentColor"
    >
      <path
        d="M15.5 15.5 19 19M5 11a6 6 0 1 0 12 0 6 6 0 0 0-12 0z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default MagnifyingGlassSVG;
