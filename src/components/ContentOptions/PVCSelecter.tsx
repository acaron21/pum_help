
import ColorSelector, { type Color } from "../utils/ColorSelector";
import { useEffect, useState } from "react";
import CustomSelect from "../utils/CustomSelect";
import type { Option } from "../utils/CustomSelect";
import CopyLabel from "../utils/CopyLabel";
import ScannableBarcode from "../utils/ScannableBarcode";

const colors: Color[] = [
  { id: "gray", hex: "#a2a2a2", img: "tubes_pvc/117_tube_pvc.webp" },
  { id: "white", hex: "#ffffff", img: "tubes_pvc/117_tube_pvc_blanc.webp" },
];

type Tube = {
  diam: number;
  color: Color;
  codePum: number;
};

const tubes: Tube[] = [
  // Tubes gris
  { diam: 32, color: colors[0], codePum: 64764 },
  { diam: 40, color: colors[0], codePum: 64765 },
  { diam: 50, color: colors[0], codePum: 64766 },
  { diam: 63, color: colors[0], codePum: 64767 },
  { diam: 75, color: colors[0], codePum: 64768 },
  { diam: 80, color: colors[0], codePum: 64769 },
  { diam: 100, color: colors[0], codePum: 64770 },
  { diam: 110, color: colors[0], codePum: 64771 },
  { diam: 125, color: colors[0], codePum: 64772 },
  { diam: 140, color: colors[0], codePum: 64773 },
  { diam: 160, color: colors[0], codePum: 64774 },
  { diam: 200, color: colors[0], codePum: 64775 },
  { diam: 250, color: colors[0], codePum: 64776 },
  { diam: 315, color: colors[0], codePum: 64777 },

  // tubes blanc
  { diam: 32, color: colors[1], codePum: 52470 },
  { diam: 40, color: colors[1], codePum: 52469 },
  { diam: 50, color: colors[1], codePum: 59921 },
  { diam: 100, color: colors[1], codePum: 65003 },
];

const firstOption: Option = { value: 100, label: "⌀100" };

export default function PVCSelecter() {
  const [colorSelected, setColorSelected] = useState<Color | undefined>(colors[0]);
  const [diamSelected, setDiamSelected] = useState<Option | null>(firstOption);
  const [diamsOptions, setDiamOptions] = useState<Option[]>([]);

  useEffect(() => {
    // Récupérer les diamètres disponibles pour la couleur sélectionnée
    const filteredTubes = tubes.filter((t) => t.color.id === colorSelected?.id);
    const options = filteredTubes.map((t) => ({
      label: `⌀${t.diam}`,
      value: t.diam,
    }));
    setDiamOptions(options);

    // Vérifier si le diamètre sélectionné est dispo, sinon prendre le premier dispo
    if (!filteredTubes.find((t) => t.diam === diamSelected?.value)) {
      setDiamSelected(options[0] || null);
    }
  }, [colorSelected]);

  // Récupération sécurisée du code PUM
  const selectedTube = tubes.find(
    (t) => t.diam === diamSelected?.value && t.color.id === colorSelected?.id
  );

  return (
    <div className="flex flex-col items-start">

        <p className="w-full bg-blue-primary text-white font-bold text-center">Sélection tube PVC</p>
        <div className="w-full bg-blue-light flex flex-row items-center gap-5">

        <img
            src={`${import.meta.env.BASE_URL}/${colorSelected?.img}`}
            alt=""
            className="object-contain w-[35px] h-[35px] md:w-[80px] md:h-[80px] p-2"
        />
        <div className="w-px h-8 bg-gray-300"></div>

        <ColorSelector
            colors={colors}
            selectedColor={colorSelected}
            onSelect={setColorSelected}
        ></ColorSelector>
        <div className="w-px h-8 bg-gray-300"></div>

        <div className="w-[100px]">
            <CustomSelect
            options={diamsOptions}
            value={diamSelected}
            onChange={setDiamSelected}
            placeholder="---"
            />
        </div>
        <div className="w-px h-8 bg-gray-300"></div>

            <div className="flex items-center flex-1 justify-center">
            {selectedTube && <CopyLabel  text={selectedTube.codePum + ""}></CopyLabel>}
            {selectedTube && <ScannableBarcode value={selectedTube.codePum + ""} /> }
            </div>

        </div>

        <div className="bg-blue-light mt-3 flex flex-col items-center gap-3 pb-2">
            <p className="bg-blue-primary text-white font-bold text-center px-3">Tube d'étage (⌀100) 2,6m</p>
            <CopyLabel  text={"64778"}></CopyLabel>
            <ScannableBarcode value={"64778"} />
        </div>
    </div>
  );
}
