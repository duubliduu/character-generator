import React, { useState } from "react";

const Harm = () => {
  const [harms, setHarms] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ]);

  function toggleHarm(index: number) {
    const newHarms = harms.map((harm, i): boolean =>
      index === i ? !harm : harm
    );
    setHarms(newHarms);
  }

  return (
    <div>
      <input
        type="checkbox"
        checked={harms[0]}
        onChange={() => toggleHarm(0)}
        title="minor"
      />
      <input
        type="checkbox"
        onChange={() => toggleHarm(1)}
        checked={harms[1]}
        title="minor"
      />
      <input
        type="checkbox"
        onChange={() => (harms[0] && harms[1]) || toggleHarm(2)}
        checked={harms[2] || (harms[0] && harms[1])}
        title="severe"
      />
      <input
        type="checkbox"
        onChange={() => toggleHarm(3)}
        checked={harms[3]}
        title="severe"
      />
      <input
        type="checkbox"
        onChange={() =>
          ((harms[2] || (harms[0] && harms[1])) && harms[3]) || toggleHarm(4)
        }
        checked={harms[4] || ((harms[2] || (harms[0] && harms[1])) && harms[3])}
        title="critical"
      />
      <input
        type="checkbox"
        onChange={() => toggleHarm(5)}
        checked={harms[5]}
        title="critical"
      />
      <input
        type="checkbox"
        onChange={() =>
          ((harms[4] || (harms[0] && harms[1])) && harms[5]) || toggleHarm(6)
        }
        checked={harms[6] || ((harms[4] || (harms[0] && harms[1])) && harms[5])}
        title="fatal"
      />
    </div>
  );
};

export default Harm;
