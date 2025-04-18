interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  mode?: "primary" | "secondary" | "danger" | "brown" | "gradient";
}

const modeClasses = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-gray-300 text-gray-800 hover:bg-gray-400",
  danger: "bg-red-600 text-white hover:bg-red-700",
  brown: "bg-amber-800 text-white hover:bg-amber-900",
  gradient: "bg-gradient-to-r from-[#8B0000] to-[#FF4500] text-white hover:from-[#FF4500] hover:to-[#8B0000]",
};

const Button = ({ text, mode = "primary", className = "", ...props }: ButtonProps) => {
  return (
    <button
      className={`px-4 py-2 rounded ${modeClasses[mode]} ${className}`}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
