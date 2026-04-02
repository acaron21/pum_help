
import CopyLabel from "../utils/CopyLabel";
import ScannableBarcode from "../utils/ScannableBarcode";

export default function BetonSelecter(){
    return(
        <div className="flex justify-around text-xl">
            <div className="bg-blue-light mt-3 flex flex-col items-center gap-3 pb-2">
                <p className="bg-blue-primary text-white font-bold text-center w-full px-10">Sac Béton 25kg</p>
                <CopyLabel  text={"71724"}></CopyLabel>
                <ScannableBarcode value={"71724"} />
            </div>
            <div className="bg-blue-light mt-3 flex flex-col items-center gap-3 pb-2">
                <p className="bg-blue-primary text-white font-bold text-center w-full px-10">Sac Mortier 25kg</p>
                <CopyLabel  text={"71725"}></CopyLabel>
                <ScannableBarcode value={"71725"} />
            </div>
            <div className="bg-blue-light mt-3 flex flex-col items-center gap-3 pb-2">
                <p className="bg-blue-primary text-white font-bold text-center w-full px-10">Mortier Chrono 25kg</p>
                <CopyLabel  text={"66133"}></CopyLabel>
                <ScannableBarcode value={"66133"} />
            </div>
        </div>
        
    )
}