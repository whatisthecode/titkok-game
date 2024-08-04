export const Loading = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      width="32"
      height="32"
      style={{ shapeRendering: 'auto', display: 'block', background: 'rgb(255, 255, 255, 0)' }}
    >
      <g>
        <circle
          stroke-linecap="round"
          fill="none"
          stroke-dasharray="50.26548245743669 50.26548245743669"
          stroke="#fe718d"
          stroke-width="8"
          r="32"
          cy="50"
          cx="50"
        >
          <animateTransform
            values="0 50 50;360 50 50"
            keyTimes="0;1"
            dur="1s"
            repeatCount="indefinite"
            type="rotate"
            attributeName="transform"
          />
        </circle>
        <g />
      </g>
    </svg>
  );
};
