import React, { createContext, useState } from "react";

export const AppContext = createContext({
  openModal: false,
});

const AppProvider = ({ children }) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <AppContext.Provider
      value={{
        openModal,
        setOpenModal
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
