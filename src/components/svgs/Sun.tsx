import SVGProps from "./SVGProps";

function SunSVG({ className }: SVGProps) {
  return (
    <svg
      className={`${className}`}
      width="24"
      height="24"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12zm10-6h1M12 2V1m0 22v-1m8-2-1-1m1-15-1 1M4 20l1-1M4 4l1 1m-4 7h1"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SunSVG;
