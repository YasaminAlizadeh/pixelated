import React, { ReactNode } from "react";

interface SidePanelProps {
  children: ReactNode;
  side: "left" | "right";
  className?: string;
}

const SidePanel: React.FC<SidePanelProps> = ({ children, className }) => {
  return <aside className={`${className}`}>{children}</aside>;
};

export default SidePanel;
