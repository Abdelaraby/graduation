interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  mode?: "primary" | "secondary" | "danger" | "brown"; // أضفنا brown
}

const modeClasses = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-gray-300 text-gray-800 hover:bg-gray-400",
  danger: "bg-red-600 text-white hover:bg-red-700",
  brown: "bg-amber-800 text-white hover:bg-amber-900", // لون بني
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
