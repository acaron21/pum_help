
import CopyLabel from "../utils/CopyLabel";
import ScannableBarcode from "../utils/ScannableBarcode";

export default function CR8_4Selecter(){
    return(
        <div className="flex justify-around text-xl">
            <div className="bg-blue-light mt-3 flex flex-col items-center gap-3 pb-2">
                <p className="bg-blue-primary text-white font-bold text-center px-3">PVC CR4 | ⌀100 | à coller | 4m</p>
                <CopyLabel  text={"60286"}></CopyLabel>
                <ScannableBarcode value={"60286"} />
            </div>
            <div className="bg-blue-light mt-3 flex flex-col items-center gap-3 pb-2">
                <p className="bg-blue-primary text-white font-bold text-center px-3">PVC CR8 | ⌀100 | à coller | 4m</p>
                <CopyLabel  text={"62347"}></CopyLabel>
                <ScannableBarcode value={"62347"} />
            </div>
            <div className="bg-blue-light mt-3 flex flex-col items-center gap-3 pb-2">
                <p className="bg-blue-primary text-white font-bold text-center px-3">PVC CR8 | ⌀100 | à joint | bleu | 4m</p>
                <CopyLabel  text={"77264"}></CopyLabel>
                <ScannableBarcode value={"77264"} />
            </div>
        </div>
        
    )
}