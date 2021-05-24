import * as React from 'react';

function SvgChevronLeft(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      fill="currentColor"
      className="chevron-left_svg__bi chevron-left_svg__bi-chevron-left"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M11.354 1.646a.5.5 0 010 .708L5.707 8l5.647 5.646a.5.5 0 01-.708.708l-6-6a.5.5 0 010-.708l6-6a.5.5 0 01.708 0z"
      />
    </svg>
  );
}

export default SvgChevronLeft;
