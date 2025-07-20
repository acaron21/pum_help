import { useEffect, useState } from "react";
import CustomSelect, { type Option } from "../utils/CustomSelect";
import CopyLabel from "../utils/CopyLabel";
import ScannableBarcode from "../utils/ScannableBarcode";

type ECOPAL = {
  diam: number;
  codePum: number;
};

const ECOPALs: ECOPAL[] = [
  { diam: 250, codePum: 63654 },
  { diam: 300, codePum: 63647 },
  { diam: 400, codePum: 63648 },
  { diam: 500, codePum: 63649 },
  { diam: 600, codePum: 63650 },
  { diam: 800, codePum: 63651 },
  { diam: 1030, codePum: 64423 },
  { diam: 1200, codePum: 71639 },
];

export default function EcopalSelecter() {
  const [diamSelected, setDiamSelected] = useState<Option | null>(null);
  const [diamsOptions, setDiamsOptions] = useState<Option[]>([]);

  useEffect(() => {
    const options = ECOPALs.map((e) => ({
      label: `⌀${e.diam}`,
      value: e.diam,
    }));
    setDiamsOptions(options);
    setDiamSelected(options[0] || null);
  }, []);

  const selectedEcopal = ECOPALs.find((e) => e.diam === diamSelected?.value);

  return (
    <div className="flex flex-col items-start text-xl">
      <p className="w-full bg-blue-primary text-white font-bold text-center">Sélection tube annelé ECOPAL</p>
      <div className="w-full bg-blue-light flex flex-row items-center gap-5">
        <img
          src={`${import.meta.env.BASE_URL}/ic/312_tube_ecopal.webp`}
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
          {selectedEcopal && <CopyLabel text={selectedEcopal.codePum + ""} />}
          {selectedEcopal && (
            <div className="flex justify-center px-2">
              <ScannableBarcode
                value={selectedEcopal.codePum + ""}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
