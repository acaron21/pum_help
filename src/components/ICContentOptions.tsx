
import RegardSelecter from "./ContentOptions/RegardSelecter"
import PVCSelecter from "./ContentOptions/PVCSelecter"
import TPCSelecter from "./ContentOptions/TPCSelecter"
import PESelecter from "./ContentOptions/PESelecter"
import CR8_4Selecter from "./ContentOptions/CR8_4Selecter"
import ChambreTelecomSelecter from "./ContentOptions/ChambreTelecomSelecter"
import PVCUSelecter from "./ContentOptions/PVCUSelecter"
import EcopalSelecter from "./ContentOptions/ECOPALSelecter"
import CR8Selecter from "./ContentOptions/CR8Selecter"

export default function ICContentOptions(props: {ic:number}){


    return(
        <>
            {
                props.ic === 843 &&
                <div className="flex flex-col">
                    <p className="italic">Sélection Regard Béton</p>
                    <RegardSelecter></RegardSelecter>
                </div>
            }

            {
                props.ic === 117 &&
                <div className="flex flex-col">
                    <PVCSelecter></PVCSelecter>
                </div>
            }

            {
                props.ic === 67 &&
                <div className="flex flex-col">
                    <TPCSelecter></TPCSelecter>
                </div>
            }

            {
                props.ic === 116 &&
                <div className="flex flex-col">
                    <PESelecter></PESelecter>
                </div>
            }

             {
                props.ic === 2766 &&
                <div className="flex flex-col">
                    <CR8_4Selecter></CR8_4Selecter>
                </div>
            }
            {
                props.ic === 842 &&
                <div className="flex flex-col">
                    <ChambreTelecomSelecter></ChambreTelecomSelecter>
                </div>
            }
            {
                props.ic === 1 &&
                <div className="flex flex-col">
                    <PVCUSelecter></PVCUSelecter>
                </div>
            }
            {
                props.ic === 312 &&
                <div className="flex flex-col">
                    <EcopalSelecter></EcopalSelecter>
                </div>
            }
            {
                props.ic === 0 &&
                <div className="flex flex-col">
                    <CR8Selecter></CR8Selecter>
                </div>
            }
        
        </>
    )
}