import { useEffect, useState } from "react";
import CustomSelect, { type Option } from "../utils/CustomSelect";
import CopyLabel from "../utils/CopyLabel";
import ScannableBarcode from "../utils/ScannableBarcode";

type PVCU = {
  diam: number;
  PN: number;
  codePum: number;
};

const PVCUs: PVCU[] = [
  { diam: 16, PN: 25, codePum: 130 },
  { diam: 20, PN: 25, codePum: 131 },
  { diam: 25, PN: 25, codePum: 133 },
  { diam: 32, PN: 16, codePum: 134 },
  { diam: 40, PN: 16, codePum: 136 },
  { diam: 50, PN: 16, codePum: 138 },
  { diam: 63, PN: 16, codePum: 140 },
  { diam: 75, PN: 16, codePum: 141 },
  { diam: 90, PN: 16, codePum: 143 },
  { diam: 110, PN: 16, codePum: 145 },
  { diam: 90, PN: 10, codePum: 142 },
  { diam: 110, PN: 10, codePum: 144 },
];

export default function PVCUPressionSelecter() {
  const [diamSelected, setDiamSelected] = useState<Option | null>(null);
  const [pnSelected, setPnSelected] = useState<Option | null>(null);
  const [diamsOptions, setDiamsOptions] = useState<Option[]>([]);
  const [pnOptions, setPnOptions] = useState<Option[]>([]);

  // Initialiser les diamètres disponibles
  useEffect(() => {
    const uniqueDiams = Array.from(new Set(PVCUs.map((p) => p.diam)));
    const options = uniqueDiams.map((d) => ({
      label: `⌀${d}`,
      value: d,
    }));
    setDiamsOptions(options);
    setDiamSelected(options[0] || null);
  }, []);

  // Met à jour les PN disponibles selon le diamètre sélectionné
  useEffect(() => {
    if (!diamSelected) return;
    const filtered = PVCUs.filter((p) => p.diam === diamSelected.value);
    const options = filtered.map((p) => ({
      label: `PN${p.PN}`,
      value: p.PN,
    }));
    setPnOptions(options);
    setPnSelected(options[0] || null);
  }, [diamSelected]);

  const selectedPVCU = PVCUs.find(
    (p) => p.diam === diamSelected?.value && p.PN === pnSelected?.value
  );

  return (
    <div className="flex flex-col items-start text-xl">
      <p className="w-full bg-blue-primary text-white font-bold text-center">
        Sélection PVC Pression
      </p>
      <div className="w-full bg-blue-light flex flex-row items-center gap-5">
        <img
          src={`${import.meta.env.BASE_URL}/ic/0_pvc_pression.webp`}
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

        <div className="w-[100px]">
          <CustomSelect
            options={pnOptions}
            value={pnSelected}
            onChange={setPnSelected}
            placeholder="PN"
          />
        </div>

        <div className="w-px h-8 bg-gray-300"></div>

        <div className="flex items-center flex-1 justify-center">
          {selectedPVCU && <CopyLabel text={selectedPVCU.codePum + ""} />}
          {selectedPVCU && (
            <div className="flex justify-center px-2">
              <ScannableBarcode
                value={selectedPVCU.codePum + ""}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
