import React, { useState } from 'react';

const ToggleSwitch = ({ component1, component2 }) => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Are you a Organization?
      </label>
      <input
        type="checkbox"
        checked={toggle}
        onChange={handleToggle}
        className="mr-2"
      />
      {toggle ? component1 : component2}
    </div>
  );
};

export default ToggleSwitch;