import React from "react";

const Dummy = () => {
    return <div>{import.meta.env.VITE_APP_URL}</div>;
};

export default Dummy;
