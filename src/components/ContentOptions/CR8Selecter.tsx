import { useEffect, useState } from "react";
import CustomSelect, { type Option } from "../utils/CustomSelect";
import CopyLabel from "../utils/CopyLabel";
import ScannableBarcode from "../utils/ScannableBarcode";

type CR8 = {
  diam: number;
  codePum: number;
};

const CR8s: CR8[] = [
  { diam: 110, codePum: 51563 },
  { diam: 125, codePum: 13232 },
  { diam: 160, codePum: 13109 },
  { diam: 200, codePum: 13110 },
  { diam: 250, codePum: 13111 },
  { diam: 315, codePum: 13112 },
  { diam: 400, codePum: 13113 },
  { diam: 500, codePum: 47102 },
];

export default function CR8Selecter() {
  const [diamSelected, setDiamSelected] = useState<Option | null>(null);
  const [diamsOptions, setDiamsOptions] = useState<Option[]>([]);

  useEffect(() => {
    const options = CR8s.map((t) => ({
      label: `⌀${t.diam}`,
      value: t.diam,
    }));
    setDiamsOptions(options);
    setDiamSelected(options[0] || null);
  }, []);

  const selectedCR8 = CR8s.find((t) => t.diam === diamSelected?.value);

  return (
    <div className="flex flex-col items-start text-xl">
      <p className="w-full bg-blue-primary text-white font-bold text-center">Sélection tube CR8</p>
      <div className="w-full bg-blue-light flex flex-row items-center gap-5">
        <img
          src={`${import.meta.env.BASE_URL}/ic/tube_pvc_cr8_joint.webp`}
          alt=""
          className="object-contain w-[35px] h-[35px] md:w-[80px] md:h-[80px] p-2"
        />

        <div className="w-px h-8 bg-gray-300"></div>

        <div className="w-[100px]">
          <CustomSelect
            options={diamsOptions}
            value={diamSelected}
            onChange={setDiamSelected}
            placeholder="⌀"
          />
        </div>

        <div className="w-px h-8 bg-gray-300"></div>

        <div className="flex items-center flex-1 justify-center">
          {selectedCR8 && <CopyLabel text={selectedCR8.codePum + ""} />}
          {selectedCR8 && (
            <div className="flex justify-center px-2">
              <ScannableBarcode
                value={selectedCR8.codePum + ""}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
