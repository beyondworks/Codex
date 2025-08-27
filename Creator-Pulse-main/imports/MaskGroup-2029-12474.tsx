export default function MaskGroup() {
  return (
    <div className="relative size-full" data-name="Mask group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 51 51">
        <g clipPath="url(#clip0_2021_12077)" id="Mask group">
          <rect fill="url(#paint0_linear_2021_12077)" height="51" id="Container" rx="10" width="51" />
          <mask
            height="45"
            id="mask0_2021_12077"
            maskUnits="userSpaceOnUse"
            style={{ maskType: "alpha" }}
            width="45"
            x="3"
            y="3"
          >
            <rect fill="var(--fill-0, #D9D9D9)" height="43.35" id="Button" rx="10" width="43.35" x="3.825" y="3.825" />
          </mask>
          <g mask="url(#mask0_2021_12077)">
            <circle
              cx="25.5"
              cy="25.5"
              id="Ellipse 1"
              r="8.925"
              stroke="var(--stroke-0, white)"
              strokeOpacity="0.9"
              strokeWidth="2"
            />
            <circle
              cx="25.5"
              cy="25.5"
              id="Ellipse 2"
              r="14.025"
              stroke="var(--stroke-0, white)"
              strokeOpacity="0.7"
              strokeWidth="2"
            />
            <circle
              cx="25.5"
              cy="25.5"
              id="Ellipse 3"
              r="19.125"
              stroke="var(--stroke-0, white)"
              strokeOpacity="0.5"
              strokeWidth="2"
            />
            <circle
              cx="25.5"
              cy="25.5"
              id="Ellipse 4"
              r="24.225"
              stroke="var(--stroke-0, white)"
              strokeOpacity="0.3"
              strokeWidth="2"
            />
          </g>
        </g>
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="paint0_linear_2021_12077"
            x1="0"
            x2="51"
            y1="25.5"
            y2="25.5"
          >
            <stop stopColor="#FF5368" />
            <stop offset="1" stopColor="#FF8541" />
          </linearGradient>
          <clipPath id="clip0_2021_12077">
            <rect fill="white" height="51" width="51" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}