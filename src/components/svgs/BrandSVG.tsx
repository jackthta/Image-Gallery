import SVGProps from "./SVGProps";

function BrandSVG({ className }: SVGProps) {
  return (
    <svg
      className={`${className}`}
      width="24"
      height="24"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      aria-label="Minimalistic camera aperture"
    >
      <circle
        cx="128"
        cy="128"
        r="96"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="9"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="9"
        d="m128 32 36.677 102.696M44.862 80l107.275 19.585M44.862 176l70.598-83.111M128 224 91.323 121.304M211.138 176l-107.275-19.585M211.138 80l-70.598 83.111"
      />
    </svg>
  );
}

export default BrandSVG;
