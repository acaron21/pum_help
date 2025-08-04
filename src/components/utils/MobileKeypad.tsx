import React from "react";
import clsx from "clsx";

interface MobileKeypadProps {
    searchInput: string;
    setSearchInput: React.Dispatch<React.SetStateAction<string>>;

    setArtEditing: React.Dispatch<React.SetStateAction<boolean>>;

    searchCode: () => void;
}

const digitRows = [
  ["7", "8", "9"],
  ["4", "5", "6"],
  ["1", "2", "3"],
];

const letterRow = ["T", "D", "R", "F", "J", "K", "L", "M"];

const MobileKeypad: React.FC<MobileKeypadProps> = ({
  searchInput,
  setSearchInput,
  setArtEditing,
  searchCode
}) => {
  const handleClick = (value: string) => {
    setSearchInput((prev) => prev + value);
  };

  const handleBackspace = () => {
    setSearchInput((prev) => prev.slice(0, -1));
  };

  const handleValidate = () => {
    console.log("Validate input:", searchInput);
    setArtEditing(false);
    searchCode();
  };

  return (
    <div className="w-full max-w-sm mx-auto p-4 touch-manipulation select-none  flex flex-col justify-end">
      <div className="w-full flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-2">
          {digitRows.flat().map((key, index) => (
            <button
              key={index}
              onClick={() => handleClick(key)}
              className={clsx(
                "w-full py-5 rounded-md text-base font-medium",
                "bg-blue-semi-light text-blue-dark border border-blue-light",
                "transition-transform active:scale-95"
              )}
            >
              {key}
            </button>
          ))}


        </div>

        <div className="flex gap-2 items-start">
                    {/* Supprimer */}
          <button
            onClick={handleBackspace}
            className={clsx(
              "w-full py-5 rounded-md flex items-center justify-center",
              "border-2 border-blue-primary bg-blue-semi-light/20",
              "transition-transform active:scale-95"
            )}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="#f20031" d="M7.378 5.531a2.75 2.75 0 0 1 1.92-.781h10.297c.598 0 1.294.166 1.863.519c.579.358 1.11.974 1.11 1.856v9.75c0 .882-.531 1.497-1.11 1.856a3.65 3.65 0 0 1-1.863.519H9.298a2.75 2.75 0 0 1-1.92-.781l-5.35-5.216a1.75 1.75 0 0 1 0-2.506zM14.03 9.47a.75.75 0 1 0-1.06 1.06L14.44 12l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47l1.47 1.47a.75.75 0 1 0 1.06-1.06L16.56 12l1.47-1.47a.75.75 0 1 0-1.06-1.06l-1.47 1.47z"/></svg>
          </button>

          {/* 0 */}
          <button
            onClick={() => handleClick("0")}
            className={clsx(
              "w-full py-5 rounded-md text-base font-medium",
              "bg-blue-semi-light text-blue-dark border border-blue-light",
              "transition-transform active:scale-95"
            )}
          >
            0
          </button>

          {/* Valider */}
          <button
            onClick={handleValidate}
            className={clsx(
              "w-full py-5 rounded-md flex items-center justify-center",
              "border-2 border-blue-primary bg-blue-semi-light/20",
              "transition-transform active:scale-95"
            )}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="#009EE3" fill-rule="evenodd" d="M11 2a9 9 0 1 0 5.618 16.032l3.675 3.675a1 1 0 0 0 1.414-1.414l-3.675-3.675A9 9 0 0 0 11 2m-6 9a6 6 0 1 1 12 0a6 6 0 0 1-12 0" clip-rule="evenodd"/></svg>
            </button>
        </div>

        {/* Lettres */}
        <div className="grid grid-cols-4 gap-2">
          {letterRow.map((letter, index) => (
            <button
              key={index}
              onClick={() => handleClick(letter)}
              className={clsx(
                "w-full py-3 rounded-sm text-sm font-medium",
                "bg-blue-light text-blue-dark border border-blue-semi-light",
                "transition-transform active:scale-95"
              )}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileKeypad;
