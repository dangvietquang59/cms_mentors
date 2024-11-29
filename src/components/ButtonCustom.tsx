import { Button } from "antd";

interface ButtonCustomProps {
  children: React.ReactNode;
  htmlType?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
  disabled?: boolean; // Add disabled prop
}

function ButtonCustom({
  children,
  htmlType = "button",
  className,
  onClick,
  disabled = false, // Default disabled to false
}: ButtonCustomProps) {
  return (
    <Button
      className={`h-[40px] bg-[#718255] text-white hover:!bg-[#718255] ${className}`}
      type="primary"
      htmlType={htmlType}
      onClick={onClick}
      disabled={disabled} // Apply disabled prop to the Button component
    >
      {children}
    </Button>
  );
}

export default ButtonCustom;
