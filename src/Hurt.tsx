import React, { useState } from "react";

const Hurt = ({ onChange }: { onChange: (x: number) => void }) => {
  const [hurts, setHurts] = useState([false, false, false, false, false]);

  const handleChange = (index: number) => {
    setHurts(hurts.map((x, i) => (i === index ? !x : x)));
    onChange(hurts.reduce((sum, x) => sum + Number(x), 0) * 2);
  };

  return (
    <div>
      {hurts.map((item, index) => (
        <input
          key={index}
          type="checkbox"
          checked={item}
          onChange={() => handleChange(index)}
        />
      ))}
    </div>
  );
};

export default Hurt;
