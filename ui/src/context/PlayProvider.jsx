import React, { useState } from "react";

export const PlayContext = React.createContext();

const PlayProvider = ({ children }) => {
  const [mapname, setmapname] = useState("");
  const [rounds, setrounds] = useState("");

  const playdatas = {
    mapname: mapname,
    rounds: rounds,
    setmapname: setmapname,
    setrounds: setrounds,
  };

  return (
    <PlayContext.Provider value={playdatas}>{children}</PlayContext.Provider>
  );
};

export default PlayProvider;
