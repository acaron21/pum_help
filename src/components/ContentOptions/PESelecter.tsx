import { useEffect, useState } from "react";
import CustomSelect, { type Option } from "../utils/CustomSelect";
import CopyLabel from "../utils/CopyLabel";
import ScannableBarcode from "../utils/ScannableBarcode";

type PE = {
  diam: number;
  length: number;
  codePum: number;
};

const PEs: PE[] = [
  { diam: 20, length: 25, codePum: 67610 },
  { diam: 20, length: 50, codePum: 67613 },
  { diam: 20, length: 100, codePum: 67620 },
  { diam: 25, length: 25, codePum: 67611 },
  { diam: 25, length: 50, codePum: 67614 },
  { diam: 25, length: 100, codePum: 67621 },
  { diam: 32, length: 25, codePum: 67612 },
  { diam: 32, length: 50, codePum: 67615 },
  { diam: 32, length: 100, codePum: 67622 },
  { diam: 40, length: 25, codePum: 79402 },
  { diam: 40, length: 50, codePum: 67616 },
  { diam: 40, length: 100, codePum: 67623 },
  { diam: 50, length: 50, codePum: 67617 },
  { diam: 50, length: 100, codePum: 67624 },
  { diam: 63, length: 50, codePum: 67618 },
  { diam: 75, length: 50, codePum: 67619 },
];

export default function PESelecter() {
  const [diamSelected, setDiamSelected] = useState<Option | null>(null);
  const [lengthSelected, setLengthSelected] = useState<Option | null>(null);
  const [diamsOptions, setDiamsOptions] = useState<Option[]>([]);
  const [lengthsOptions, setLengthsOptions] = useState<Option[]>([]);

  // Initialisation des diamètres
  useEffect(() => {
    const options = Array.from(new Set(PEs.map((p) => p.diam))).map((d) => ({
      label: `⌀${d}`,
      value: d,
    }));
    setDiamsOptions(options);

    // Sélectionner ⌀25 par défaut si dispo, sinon premier
    const defaultOption = options.find((o) => o.value === 25) || options[0] || null;
    setDiamSelected(defaultOption);
  }, []);

  // Met à jour les longueurs selon le diamètre
  useEffect(() => {
    if (!diamSelected) return;
    const filteredPEs = PEs.filter((p) => p.diam === diamSelected.value);
    const options = filteredPEs.map((p) => ({
      label: `${p.length}m`,
      value: p.length,
    }));
    setLengthsOptions(options);

    // Sélectionner 25m par défaut si dispo, sinon premier
    const defaultLength = options.find((o) => o.value === 25) || options[0] || null;
    setLengthSelected(defaultLength);
  }, [diamSelected]);

  const selectedPE = PEs.find(
    (p) => p.diam === diamSelected?.value && p.length === lengthSelected?.value
  );

  return (
    <div className="flex flex-col items-start">
      <p className="w-full bg-blue-primary text-white font-bold text-center">Sélection couronne PE</p>
      <div className="w-full bg-blue-light flex flex-row items-center gap-5">
        <img
          src={`${import.meta.env.BASE_URL}ic/116_cour_pe.webp`}
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
            options={lengthsOptions}
            value={lengthSelected}
            onChange={setLengthSelected}
            placeholder="Longueur"
          />
        </div>

        <div className="w-px h-8 bg-gray-300"></div>

        <div className="flex items-center flex-1 justify-center">
          {selectedPE && <CopyLabel text={selectedPE.codePum + ""} />}
          {selectedPE && (
            <div className="flex justify-center px-2">
              <ScannableBarcode value={selectedPE.codePum + ""} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
