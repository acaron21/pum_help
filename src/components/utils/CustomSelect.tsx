import React, { useState, useRef, useEffect } from 'react';

type Option = {
  label: string;
  value: string | number;
  icon?: string;
};

type CustomSelectProps = {
  options: Option[];
  value: Option | null;
  onChange: (option: Option) => void;
  placeholder?: string;
  label?: string;
};

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState<number | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: Option) => {
    onChange(option);
    setIsOpen(false);
  };

  // Ferme le dropdown si clic en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Calcule la hauteur disponible en dessous du select
  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom - 10; // 10px de marge
      setMaxHeight(spaceBelow);
    }
  }, [isOpen]);

  return (
    <div className="relative w-full" ref={containerRef}>
      {label && <label className="block text-center text-md mb-1 font-medium text-gray-700 ">{label}</label>}
      <div
        className="flex justify-between gap-2 items-center border border-gray-300 rounded-lg px-3 py-2 bg-white cursor-pointer shadow-sm hover:border-gray-400"
        onClick={toggleOpen}
      >
        <div className="flex items-center space-x-2 text-xl">
          {value?.icon && <img src={value.icon} alt="" className="h-5 w-5" />}
          <span className={`${!value ? 'text-gray-400' : ''}`}>
            {value ? value.label : placeholder}
          </span>
        </div>
        <svg
          className={`w-4 h-4 transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {isOpen && (
        <div
          className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg border border-gray-200"
          style={{ maxHeight: maxHeight ? `${maxHeight}px` : undefined, overflowY: 'auto' }}
        >
          <ul className="py-1 text-sm">
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleOptionClick(option)}
                className="flex items-center space-x-2 px-3 py-2 cursor-pointer hover:bg-blue-100"
              >
                {option.icon && <img src={option.icon} alt="" className="object-contain w-[35px] h-[35px] md:w-[60px] md:h-[60px]" />}
                <span className='text-xl'>{option.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
