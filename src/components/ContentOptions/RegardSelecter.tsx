
type CouvercleType = {
    id:number;
    name: string;
    diams: number[];
    img: string;
}

const couvercleTypes: CouvercleType[] = [
    {id:0, name:"Béton", diams:[25,30,40,50,60, 70], img:"couvercles/beton.webp"},
    // {id:1, name:"Béton Opércules", diams:[25,30,40,50], img:"couvercles/beton.webp"},
    {id:2, name:"Fonte Trottoire B125", diams:[30,40,50,60,70], img:"couvercles/fonte_trottoire_125.webp"},
    {id:3, name:"Fonte Hydraulique B125", diams:[30,40,50,60,70], img:"couvercles/fonte_hydrolique_125.webp"},
    {id:4, name:"Fonte Hydraulique C250", diams:[40,50,60,70], img:"couvercles/fonte_hydrolique_250.webp"}, // rajouter 30 si je trouve
    {id:5, name:"Fonte Grille plate C250", diams:[30,40,50,60,70], img:"couvercles/fonte_grille_plate_250.webp"},
    {id:6, name:"Fonte Grille Concave C250", diams:[40, 50,60], img:"couvercles/fonte_grille_concave_250.webp"},
]


type Fond = {
    diam_int: number;
    diam_ext: number;
    code_pum: number;
    opercule: boolean;
}

const fonds: Fond[]= [
    {diam_int: 25, diam_ext: 30, code_pum:48082, opercule:false},
    {diam_int: 30, diam_ext: 40, code_pum:47221, opercule:false},
    {diam_int: 40, diam_ext: 50, code_pum:47226, opercule:false},
    {diam_int: 50, diam_ext: 60, code_pum:47231, opercule:false},
    {diam_int: 60, diam_ext: 70, code_pum:47236, opercule:false},

    {diam_int: 25, diam_ext: 30, code_pum:57792, opercule:true},
    {diam_int: 30, diam_ext: 40, code_pum:57881, opercule:true},
]



type Rehausse = {
    diam_int: number;
    diam_ext: number;
    code_pum: number;
    opercule: boolean;
}

const rehausses: Rehausse[]= [
    {diam_int: 25, diam_ext: 30, code_pum:48083, opercule:false},
    {diam_int: 30, diam_ext: 40, code_pum:47222, opercule:false},
    {diam_int: 40, diam_ext: 50, code_pum:47227, opercule:false},
    {diam_int: 50, diam_ext: 60, code_pum:47232, opercule:false},
    {diam_int: 60, diam_ext: 70, code_pum:47237, opercule:false},
]

type Couvercle = {
    couvercleTypeID: number;
    diam_ext:number;
    code_pum:number;
}

const couvercles:Couvercle[] =[

    // Couvercles bétons 
    {couvercleTypeID: 0, diam_ext:30, code_pum:48084},
    {couvercleTypeID: 0, diam_ext:40, code_pum:47225},
    {couvercleTypeID: 0, diam_ext:50, code_pum:47230},
    {couvercleTypeID: 0, diam_ext:60, code_pum:47235},
    {couvercleTypeID: 0, diam_ext:70, code_pum:47240},

    // Couvercles bétons opércule
    {couvercleTypeID: 1, diam_ext:25, code_pum:57806},
    {couvercleTypeID: 1, diam_ext:30, code_pum:57822},
    {couvercleTypeID: 1, diam_ext:40, code_pum:57807},
    {couvercleTypeID: 1, diam_ext:50, code_pum:58171},

    //Fonte Trottoire B125 
    { couvercleTypeID: 2, diam_ext: 30, code_pum: 46582 },
    { couvercleTypeID: 2, diam_ext: 40, code_pum: 13267 },
    { couvercleTypeID: 2, diam_ext: 50, code_pum: 16116 },
    { couvercleTypeID: 2, diam_ext: 60, code_pum: 16117 },
    { couvercleTypeID: 2, diam_ext: 70, code_pum: 46218 },

    //Fonte Hydrolique B125
    { couvercleTypeID: 3, diam_ext: 30, code_pum: 13268 },
    { couvercleTypeID: 3, diam_ext: 40, code_pum: 13269 },
    { couvercleTypeID: 3, diam_ext: 50, code_pum: 13270 },
    { couvercleTypeID: 3, diam_ext: 60, code_pum: 13271 },
    { couvercleTypeID: 3, diam_ext: 70, code_pum: 35031 },

    //Fonte Hydrolique C250
    { couvercleTypeID: 4, diam_ext: 40, code_pum: 47495 },
    { couvercleTypeID: 4, diam_ext: 50, code_pum: 47496 },
    { couvercleTypeID: 4, diam_ext: 60, code_pum: 47497 },
    { couvercleTypeID: 4, diam_ext: 70, code_pum: 60152 },

    //Fonte Grille plate C250
    { couvercleTypeID: 5, diam_ext: 30, code_pum: 70593 },
    { couvercleTypeID: 5, diam_ext: 40, code_pum: 70594 },
    { couvercleTypeID: 5, diam_ext: 50, code_pum: 70595 },
    { couvercleTypeID: 5, diam_ext: 60, code_pum: 70596 },
    { couvercleTypeID: 5, diam_ext: 70, code_pum: 70597 },

    //Fonte Grille Concave C250
    { couvercleTypeID: 6, diam_ext: 40, code_pum: 70589 },
    { couvercleTypeID: 6, diam_ext: 50, code_pum: 70590 },
    { couvercleTypeID: 6, diam_ext: 60, code_pum: 70591 },   
]

import { useEffect, useState } from "react";
import CustomSelect from "../utils/CustomSelect";
import CopyLabel from "../utils/CopyLabel";
import ScannableBarcode from "../utils/ScannableBarcode";

type Option = {
  label: string;
  value: string | number;
  icon?: string;
};

export default function RegardSelecter(){

  const diamsOptions =  [
    { label: '25x25', value: 25},
    { label: '30x30', value: 30},
    { label: '40x40', value: 40},
    { label: '50x50', value: 50},
    { label: '60x60', value: 60},
  ];

  const [diamSelected, diamSetSelected] = useState<Option | null>(null);
  const [diamExt, setDiamExt] = useState<number | null>(null);
  const [couvercleSelected, setCouvercleSelected] = useState<Option | null>(null)
  const [couvercleCodePum, setCouvercleCodePum] = useState<number | null>(null)

  useEffect(()=>{
    if(diamSelected){
        setDiamExt(fonds.filter(f=>f.diam_int===diamSelected.value)[0].diam_ext)
        setCouvercleSelected(null)
        setCouvercleCodePum(null)
    }
  },[diamSelected])

  useEffect(()=>{

    const good_couvercle = couvercles.filter(c => (c.couvercleTypeID === couvercleSelected?.value) && (c.diam_ext === diamExt))

    if(good_couvercle[0]){
        setCouvercleCodePum(good_couvercle[0].code_pum)
    }
  }, [couvercleSelected])


    return(

        <div className="flex flex-row gap-2 justify-stretch w-full  text-center  text-xl ">
            {/* FOND */}
            <div className="bg-blue-light pb-2">
                <div className="p-2 bg-blue-primary text-white font-bold">Fond</div>
                    <div className="grid grid-cols-[1fr_1fr] items-center text-center pb-4">
                        <div className="p-2 pb-0 text-lg">D. Intérieur</div>
                        <div className="p-2 pb-0 text-lg" >D. Exterieur</div>

                        <div className="p-2 pt-0">
                            <CustomSelect
                            // label="Diamètre"
                            options={diamsOptions}
                            value={diamSelected}
                            onChange={diamSetSelected}
                            placeholder="---"
                            />
                        </div>
                        {diamExt && <p className="p-2 pt-0 ">{diamExt}x{diamExt}</p>}
                    </div>
                <div className="px-2 flex flex-col gap-2 items-center">
                    {diamSelected && <CopyLabel text={fonds.filter(f=>f.diam_int===diamSelected.value)[0].code_pum+""}></CopyLabel>}
                    {diamSelected && <ScannableBarcode value={fonds.filter(f=>f.diam_int===diamSelected.value)[0].code_pum+""} /> }
                </div>
                
            </div>
            

            {/* Rehausse */}
            <div className="flex flex-col justify-between bg-blue-light pb-2">
                <div className="p-2 bg-blue-primary text-white font-bold ">Réhausse</div>
                <div className="flex-1 opacity-0">.</div>
                <div className="px-2 flex flex-col gap-2 items-center">
                    {diamSelected && <CopyLabel text={rehausses.filter(r=>r.diam_int===diamSelected.value)[0].code_pum+""}></CopyLabel>}
                    {diamSelected && <ScannableBarcode value={rehausses.filter(r=>r.diam_int===diamSelected.value)[0].code_pum+""} /> }
                </div>
                
                
            </div>

            {/* Couvercle */}
            <div className=" flex-1 flex flex-col justify-between bg-blue-light pb-2">
                <div className="p-2 bg-blue-primary text-white font-bold">Couvercle/tampon</div>
                <div className="opacity-0 text-lg pt-2">.</div>
                <div className="p-2 pb-4 pt-0 mb-auto">
                    <CustomSelect
                        // label="Diamètre"
                        options={
                            diamExt
                            ? couvercleTypes
                            .filter(c=>c.diams.includes(diamExt))
                            .map(couvercleType=>({
                                label:couvercleType.name,
                                value:couvercleType.id,
                                icon: `${import.meta.env.BASE_URL}/${couvercleType.img}`
                            }))

                            : []
                        }
                        value={couvercleSelected}
                        onChange={setCouvercleSelected}
                        placeholder="Couvercle"
                    />
                </div>
                <div className="flex flex-col items-center gap-2">
                    {couvercleCodePum ? <CopyLabel text={couvercleCodePum+""}></CopyLabel> : <p className="opacity-0">.</p>}
                    {couvercleCodePum && <ScannableBarcode value={couvercleCodePum+""} /> }
                </div>
            </div>

        </div>
    )
}

