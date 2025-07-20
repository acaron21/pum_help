// TelecomChamberSelector.tsx
import { useEffect, useState } from "react";
import CustomSelect, { type Option } from "../utils/CustomSelect";
import CopyLabel from "../utils/CopyLabel"
import ScannableBarcode from "../utils/ScannableBarcode";

// COmponents

type bottomSelecterProps = {
    setHasBottom: (b: Boolean) => void;
    hasBottom: Boolean;
    canChange: Boolean;
}

function BottomSelecter(props: bottomSelecterProps){

    const handleClick = () =>{
        if(props.canChange){
            props.setHasBottom(!props.hasBottom)
        }
    }
    return(
        <div onClick={handleClick} className="flex flex-col justify-center p-2 select-none cursor-pointer">
            {
                props.hasBottom 
                ?<div className="flex flex-col items-center">
                <svg width="100" height="60" viewBox="0 0 500 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="11" y="11" width="469" height="274" stroke="#BEAFAF" stroke-width="22"/>
                    <rect x="33" y="35" width="424" height="225" fill="#BEAFAF"/>
                </svg>
                Avec fond
                </div>


                :
                <div className="flex flex-col items-center"> 
                    <svg width="100" height="60" viewBox="0 0 500 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="11" y="11" width="469" height="274" stroke="#BEAFAF" stroke-width="22"/>
                    </svg>
                    Sans fond
                </div>
            }    
        </div>
    )
}



// --- Types ---
type TelecomType = "LXT" | "LXC" | "KXC";
type Marking = "sans_logo" | "telecom" | "3_feux" | "free";

type TelecomChamber = {
  id: string;
  type: TelecomType;
  hasBottom: boolean;
  codePum: number;
};

type LXTFrame = {
  chamberId: string;
  codePum: number;
};

type LXTTampon = {
  resistance: 125 | 250;
  marking: Marking;
  codePum: number;
};

type FrameAndCover = {
  chamberId: string;
  marking: "sans_logo" | "telecom";
  codePum: number;
};


// --- CHAMBRE ---
const telecomChambers: TelecomChamber[] = [
  { id: "L0T", type: "LXT", hasBottom: true, codePum: 46728 },
  { id: "L0T", type: "LXT", hasBottom: false, codePum: 50757 },
  { id: "L1T", type: "LXT", hasBottom: true, codePum: 46729 },
  { id: "L1T", type: "LXT", hasBottom: false, codePum: 46740 },
  { id: "L2T", type: "LXT", hasBottom: true, codePum: 46730 },
  { id: "L2T", type: "LXT", hasBottom: false, codePum: 46741 },
  { id: "L3T", type: "LXT", hasBottom: true, codePum: 46731},
  { id: "L3T", type: "LXT", hasBottom: false, codePum: 46742 },
  { id: "L4T", type: "LXT", hasBottom: true, codePum: 46732 },
  { id: "L4T", type: "LXT", hasBottom: false, codePum: 46743 },
  { id: "L5T", type: "LXT", hasBottom: true, codePum: 53294 },

  { id: "L1C", type: "LXC", hasBottom: true, codePum: 48566 },
  { id: "L1C", type: "LXC", hasBottom: false, codePum: 58347 },
  { id: "L2C", type: "LXC", hasBottom: true, codePum: 48567 },
  { id: "L2C", type: "LXC", hasBottom: false, codePum: 58348 },
  { id: "L3C", type: "LXC", hasBottom: true, codePum: 48568 },
  { id: "L3C", type: "LXC", hasBottom: false, codePum: 63774 },

  { id: "K1C", type: "KXC", hasBottom: true, codePum: 46733 },
  { id: "K1C", type: "KXC", hasBottom: false, codePum: 46744 },
  { id: "K2C", type: "KXC", hasBottom: true, codePum: 46734 },
  { id: "K2C", type: "KXC", hasBottom: false, codePum: 46745 },
  { id: "K3C", type: "KXC", hasBottom: true, codePum: 56366 },
];

// LXT CADRES (1->5)
const lxtFrames: LXTFrame[] = [
  { chamberId: "L1T", codePum: 46782 },
  { chamberId: "L2T", codePum: 46783 },
  { chamberId: "L3T", codePum: 46784 },
  { chamberId: "L4T", codePum: 46785 },
  { chamberId: "L5T", codePum: 46786 },
];

// 
const lxtTampons: LXTTampon[] = [
  { resistance: 125, marking: "sans_logo", codePum: 55717 },
  { resistance: 125, marking: "telecom", codePum: 59668 },
  { resistance: 250, marking: "sans_logo", codePum: 55719 },
  { resistance: 250, marking: "telecom", codePum: 59670 },
  { resistance: 250, marking: "3_feux", codePum: 64915 },
  { resistance: 250, marking: "free", codePum: 68766 },
];

const label_marketing = {
    "sans_logo": "Sans Logo",
    "telecom": "Télécom",
    "3_feux": "3 feux",
    "free": "Free"
}



const frameAndCovers: FrameAndCover[] = [
    { chamberId:"L0T", marking: "sans_logo", codePum: 69301 },
    { chamberId:"L0T", marking: "telecom", codePum: 69314 },

    { chamberId: "L1C", marking: "sans_logo", codePum: 55724 },
    { chamberId: "L1C", marking: "telecom", codePum: 59659 },
    { chamberId: "L2C", marking: "sans_logo", codePum: 55725 },
    { chamberId: "L2C", marking: "telecom", codePum: 59660 },
    { chamberId: "L3C", marking: "sans_logo", codePum: 55726 },
    { chamberId: "L3C", marking: "telecom", codePum: 59661 },

    { chamberId: "K1C",  marking: "sans_logo", codePum: 55721 },
    { chamberId: "K2C",  marking: "sans_logo", codePum: 55722 },
    { chamberId: "K3C",  marking: "sans_logo", codePum: 55723 },
]



export default function TelecomChamberSelector() {
    const [selectedChamber, setSelectedChamber] = useState<Option | null>({label:"L1T", value:"L1T"});
    const [hasBottom, setHasBottom] = useState<Boolean>(true);
    const [resistance, setResistance] = useState<Option>({label:"125 kN", value:125});
    const [marketing, setMarketing] = useState<Option | null>({label:"Sans Logo", value:"sans_logo"});
    const [frameAndCoverSelected, setFrameAndCoverSelected] = useState<Option | null>({label:"Sans Logo", value:"sans_logo"});

    //Selection chambre
    const chamber = telecomChambers.find(
        (c) => `${c.id}` === selectedChamber?.value && c.hasBottom === hasBottom
    );

    // Selection tampon
    const tampon = lxtTampons.find(
        (t) => t.resistance === resistance.value && t.marking === marketing?.value
    );

    // Selection cadre+tampon
    const frameAndCover = frameAndCovers.find(
        (fc) => fc.chamberId === chamber?.id && fc.marking === frameAndCoverSelected?.value
    )

    // Bloquer si il n'existe pas le sans fond
    const chamberWithoutBottomExists = telecomChambers.filter((c)=>c.id===selectedChamber?.value && !c.hasBottom)[0];

    // Choisir l'affichage en fonction de "cadre+tampon" ou "cadre et tampon séparemment"
    const uniqueCode =  chamber?.type==="LXC" || chamber?.type==="KXC" || chamber?.id==="L0T";

    // Cadre pour les LXT (hors L0T)
    const LXTframe = chamber?.type==="LXT" && chamber.id!== "L0T" ? lxtFrames.filter((f) => f.chamberId===chamber.id)[0].codePum : "";



    // ---- OPTIONS -----
    // chambres
    const chamberOptions: Option[] = telecomChambers.filter(c => c.hasBottom).map((c) => (
        {
        label: `${c.id}`,
        value: `${c.id}`,
        }
        ));
    
    // Resistances
    const resistanceOptions: Option[] = [
        {label:"125 kN", value:125},
        {label:"250 kN", value:250},
    ]

    const LXTMarketingOption: Option[] = lxtTampons.filter(t => t.resistance === resistance.value).map((t)=>(
        {label:label_marketing[`${t.marking}`], value:t.marking}
    ))

    const LXC_LOT_KXC_marketingOptions: Option[] = frameAndCovers.filter(fc => fc.chamberId===chamber?.id).map((fc)=>(
        {label:label_marketing[`${fc.marking}`], value:fc.marking}
    ))

    useEffect(()=>{
        //reset hasBottom
        setHasBottom(true);

        //reset marketing
        setFrameAndCoverSelected({label:"Sans Logo", value:"sans_logo"})

    },[selectedChamber])

    useEffect(()=>{
        setMarketing(LXTMarketingOption[0])
    },[resistance])


  const getTamponQuantity = (id: string | undefined): number => {
    if(id !== undefined){
        const match = id.match(/L(\d)T/);
        return match ? parseInt(match[1], 10) : 1;
    }
    else{
        return 0
    }
    
  };


  return (
    <div className="flex flex-row gap-2 justify-stretch w-full text-center text-xl">
        {/* Chambre */}
        <div className="bg-blue-light pb-2 flex flex-col">
            <div className="p-2 bg-blue-primary text-white font-bold">Chambre</div>
            <p className="italic opacity-0">.</p>
            <div className="p-2">
                <CustomSelect
                    options={chamberOptions}
                    value={selectedChamber}
                    onChange={setSelectedChamber}
                    placeholder="Chambre"
                />
            </div>
            <div className="px-2 flex flex-col gap-2 items-center mt-auto pt-5">
                {chamber && <CopyLabel text={chamber.codePum + ""} />}
                {chamber && <ScannableBarcode value={chamber.codePum + ""}/>}
            </div>
        </div>

        {/* Avec/Sans fond */}
        <div className="bg-blue-light flex flex-col justify-start">
            <div className="p-2 bg-blue-primary text-white font-bold">Avec/Sans fond</div>
            <p className="italic opacity-0">.</p>
            <BottomSelecter canChange={!!chamberWithoutBottomExists} hasBottom={hasBottom} setHasBottom={setHasBottom}></BottomSelecter>
        </div>
        
        {
            uniqueCode 
            ?
            <>
                {/* Cadre + tampon */}
                <div className="bg-blue-light flex flex-col flex-1 items-center pb-2">
                    <div className="p-2 bg-blue-primary text-white font-bold w-full">Cadre + tampon</div>
                    <p className="italic">Marquage :</p>
                    <div className="p-2">
                        <CustomSelect
                            options={LXC_LOT_KXC_marketingOptions}
                            value={frameAndCoverSelected}
                            onChange={setFrameAndCoverSelected}
                            placeholder="Cadre+tampon"
                        />
                    </div>

                    <div className="px-2 flex flex-col gap-2 items-center mt-auto pt-5">
                        {chamber && <CopyLabel text={frameAndCover?.codePum + ""} />}
                        {chamber && <ScannableBarcode value={frameAndCover?.codePum + ""}/>}
                    </div>
                </div>
            </>
            :
            <>
                {/* Cadre */}
                <div className="bg-blue-light flex flex-col items-center pb-2 gap-2 ">
                    <div className="p-2 bg-blue-primary text-white font-bold w-full mb-auto">Cadre</div>
                    {chamber && <CopyLabel text={LXTframe + ""} />}
                    {chamber && <ScannableBarcode value={LXTframe + ""}/>}
                </div>
                {/* tampon */}
                <div className="bg-blue-light flex flex-col flex-1 pb-2">
                    <div className="p-2 bg-blue-primary text-white font-bold">Tampon(s)</div>
                    <div className="flex gap-2 p-2 items-center">
                        {/* resistance */}
                        <div className="flex-1/4 ">
                            <p className="italic">Résistance :</p>
                            <CustomSelect
                                options={resistanceOptions}
                                value={resistance}
                                onChange={setResistance}
                                placeholder="Résistance"
                            />
                        </div>
                        {/* Marquaque */}
                        <div className="flex-2/4">
                            <p className="italic">Marquage :</p>
                            <CustomSelect
                                options={LXTMarketingOption}
                                value={marketing}
                                onChange={setMarketing}
                                placeholder="Marquage"
                            />
                        </div>
                        <div className="flex-1/4">
                            <p className="italic">Qte :</p>
                            <p className="bg-green-400 text-2xl font-bold rounded-2xl">x {getTamponQuantity(chamber?.id)}</p>
                        </div>
                        
                    </div>
                    
                    <div className="mt-auto flex flex-col gap-2 items-center pt-10">
                        {chamber && <CopyLabel text={tampon?.codePum + ""} />}
                        {chamber && <ScannableBarcode value={tampon?.codePum + ""}/>}
                    </div>
                </div>
            </>
        }
        
    </div>
  );
}
