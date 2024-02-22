type Props = {
  pause?: boolean;
};

const MusicWaveIcon = (props: Props) => {
  const { pause } = props;

  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 100 100"
      enableBackground="new 0 0 100 100"
      xmlSpace="preserve"
      style={{
        width: "inherit",
        height: "inherit",
        display: "inline-block",
      }}
    >
      {[...new Array(5).fill(0)].map((_i, index) => (
        <rect
          fill={`${pause ? "#999999" : "rgb(132, 204, 22)"}`}
          width={`${pause ? 2 : 6}`}
          height="100"
          key={index}
          transform={`translate(0) rotate(180 ${index * 20} 50)`}
          x={index * 20}
          y1={index * Math.random() * 20}
        >
          <animate
            attributeName="height"
            attributeType="XML"
            dur="1s"
            values="30; 100; 30"
            repeatCount="indefinite"
            begin={index * Math.random() * 20}
          />
        </rect>
      ))}
    </svg>
  );
};

export default MusicWaveIcon;
