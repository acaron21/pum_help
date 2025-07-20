import { useEffect, useState } from "react";
import ColorSelector, { type Color } from "../utils/ColorSelector";
import CustomSelect, { type Option } from "../utils/CustomSelect";
import CopyLabel from "../utils/CopyLabel";
import ScannableBarcode from "../utils/ScannableBarcode";

const colors: Color[] = [
  { id: "red", hex: "#ff0000", img: "tpc/67_tpc_rouge.webp" },
  { id: "blue", hex: "#003af0", img: "tpc/67_tpc_bleu.webp" },
  { id: "green", hex: "#5fd219", img: "tpc/67_tpc_vert.webp" },
  { id: "yellow", hex: "#eee118", img: "tpc/67_tpc_jaune.webp" },
];

type TPC = {
  diam: number;
  color: Color;
  length: number;
  codePum: number;
};

const TPCs: TPC[] = [
  // Red
  { color: colors[0], diam: 40, length: 25, codePum: 55140 },
  { color: colors[0], diam: 40, length: 50, codePum: 55148 },
  { color: colors[0], diam: 50, length: 25, codePum: 55141 },
  { color: colors[0], diam: 50, length: 50, codePum: 55149 },
  { color: colors[0], diam: 63, length: 25, codePum: 55142 },
  { color: colors[0], diam: 63, length: 50, codePum: 55150 },
  { color: colors[0], diam: 75, length: 25, codePum: 55143 },
  { color: colors[0], diam: 75, length: 50, codePum: 55151 },
  { color: colors[0], diam: 90, length: 25, codePum: 55144 },
  { color: colors[0], diam: 90, length: 50, codePum: 55152 },
  { color: colors[0], diam: 110, length: 25, codePum: 55145 },
  { color: colors[0], diam: 110, length: 50, codePum: 55153 },
  { color: colors[0], diam: 160, length: 25, codePum: 55147 },
  { color: colors[0], diam: 200, length: 25, codePum: 72882 },

  // Blue
  { color: colors[1], diam: 40, length: 50, codePum: 55176 },
  { color: colors[1], diam: 50, length: 50, codePum: 55177 },
  { color: colors[1], diam: 63, length: 25, codePum: 55174 },
  { color: colors[1], diam: 63, length: 50, codePum: 55178 },
  { color: colors[1], diam: 75, length: 50, codePum: 55179 },
  { color: colors[1], diam: 90, length: 25, codePum: 55175 },
  { color: colors[1], diam: 90, length: 50, codePum: 55180 },

  // Green
  { color: colors[2], diam: 40, length: 25, codePum: 55154 },
  { color: colors[2], diam: 40, length: 50, codePum: 55157 },
  { color: colors[2], diam: 50, length: 25, codePum: 55155 },
  { color: colors[2], diam: 50, length: 50, codePum: 55158 },
  { color: colors[2], diam: 63, length: 25, codePum: 55156 },
  { color: colors[2], diam: 63, length: 50, codePum: 55159 },
  { color: colors[2], diam: 90, length: 50, codePum: 71656 },

  // Yellow
  { color: colors[3], diam: 40, length: 25, codePum: 55160 },
  { color: colors[3], diam: 40, length: 50, codePum: 55164 },
  { color: colors[3], diam: 50, length: 25, codePum: 55161 },
  { color: colors[3], diam: 50, length: 50, codePum: 55165 },
  { color: colors[3], diam: 63, length: 25, codePum: 55162 },
  { color: colors[3], diam: 63, length: 50, codePum: 55166 },
  { color: colors[3], diam: 75, length: 50, codePum: 55167 },
  { color: colors[3], diam: 90, length: 25, codePum: 55163 },
  { color: colors[3], diam: 90, length: 50, codePum: 55168 },
];

export default function TPCSelecter() {
  const [colorSelected, setColorSelected] = useState<Color>(colors[0]);
  const [diamSelected, setDiamSelected] = useState<Option | null>(null);
  const [lengthSelected, setLengthSelected] = useState<Option | null>(null);
  const [diamsOptions, setDiamsOptions] = useState<Option[]>([]);
  const [lengthsOptions, setLengthsOptions] = useState<Option[]>([]);

  // Met à jour les diamètres disponibles selon la couleur sélectionnée
  useEffect(() => {
    const filteredTPCs = TPCs.filter((t) => t.color.id === colorSelected?.id);
    const options = Array.from(new Set(filteredTPCs.map((t) => t.diam))).map((d) => ({
      label: `⌀${d}`,
      value: d,
    }));
    setDiamsOptions(options);
    setDiamSelected(options[0] || null);
  }, [colorSelected]);

  // Met à jour les longueurs disponibles selon la couleur et le diamètre sélectionnés
  useEffect(() => {
    if (!diamSelected) return;
    const filteredTPCs = TPCs.filter(
      (t) => t.color.id === colorSelected?.id && t.diam === diamSelected.value
    );
    const options = filteredTPCs.map((t) => ({
      label: `${t.length}m`,
      value: t.length,
    }));
    setLengthsOptions(options);
    setLengthSelected(options[0] || null);
  }, [colorSelected, diamSelected]);

  // Récupération sécurisée du code PUM
  const selectedTPC = TPCs.find(
    (t) =>
      t.color.id === colorSelected?.id &&
      t.diam === diamSelected?.value &&
      t.length === lengthSelected?.value
  );

  return (
    <div className="flex flex-col items-start text-xl">
      <p className="w-full bg-blue-primary text-white font-bold text-center">Sélection couronne TPC</p>
      <div className="w-full bg-blue-light flex flex-row items-center gap-5">
        <img
          src={`${import.meta.env.BASE_URL}/${colorSelected?.img}`}
          alt=""
          className="object-contain w-[35px] h-[35px] md:w-[80px] md:h-[80px] p-2"
        />
        <div className="w-px h-8 bg-gray-300"></div>

        <ColorSelector colors={colors} selectedColor={colorSelected} onSelect={setColorSelected} />
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
          {selectedTPC && <CopyLabel text={selectedTPC.codePum + ""} />}
          {selectedTPC && (
            <ScannableBarcode value={selectedTPC.codePum + ""} />
            
          )}
        </div>
      </div>
    </div>
  );
}
