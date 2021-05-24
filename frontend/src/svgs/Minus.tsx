import * as React from 'react';

type MinusSvgProps = {
  dimensions?: { x1: number; x2: number; y1: number; y2: number };
} & React.SVGAttributes<any>;

function SvgMinusIcon({ dimensions, ...props }: MinusSvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="minus-icon"
      height={15}
      width={15}
      fill="currentColor"
      {...props}
    >
      <line
        x1="0"
        y1="5.5"
        x2="10"
        y2="5.5"
        {...dimensions}
        style={{ stroke: '#dee3ea', strokeWidth: 1.5 }}
      />
    </svg>
  );
}

export default SvgMinusIcon;
