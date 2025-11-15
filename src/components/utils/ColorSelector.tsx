import React from 'react';

// ==== UTILS : Color selector
// 
//  This component aims to select a color.
// 

export type Color = {
  id: string;
  hex: string;
  img?:string;
};

type ColorSelectorProps = {
  colors: Color[];
  selectedColor?: Color;
  onSelect: (color: Color) => void;
};

const ColorSelector: React.FC<ColorSelectorProps> = ({ colors, selectedColor, onSelect }) => {
  return (
    <div className="flex space-x-3">
      {colors.map((color) => (
        <button
          key={color.id}
          onClick={() => onSelect(color)}
          className={`
            w-8 h-8 rounded-full
            border-2
            ${selectedColor?.id === color.id ? 'border-gray-800 ring-2 ring-gray-300' : 'border-gray-300'}
            transition transform hover:scale-110 hover:shadow-lg
          `}
          style={{ backgroundColor: color.hex }}
        />
      ))}
    </div>
  );
};

export default ColorSelector;
