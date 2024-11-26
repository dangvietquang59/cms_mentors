import React from "react";

const BlankLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
      {children}
    </div>
  );
};

export default BlankLayout;
