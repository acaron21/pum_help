import { div } from "framer-motion/client";
import React from "react";

interface ToggleOuiNonProps {
  value: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToggleOuiNon: React.FC<ToggleOuiNonProps> = ({ value, setValue }) => {
  return (
    <div className=" flex items-center justify-center">
        <button
            onClick={() => setValue((prev) => !prev)}
            className={`px-4 py-2 rounded-full font-semibold shadow 
                transition-all duration-300 
                ${value 
                ? "bg-blue-primary text-white" 
                : "bg-blue-light text-blue-dark hover:bg-blue-semi-light"
                }`}
            >
            {value ? "avec" : "sans"}
        </button>
    </div>
    
  );
};

export default ToggleOuiNon;
