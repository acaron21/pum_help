
import RegardSelecter from "./ContentOptions/RegardSelecter"
import PVCSelecter from "./ContentOptions/PVCSelecter"
import TPCSelecter from "./ContentOptions/TPCSelecter"
import PESelecter from "./ContentOptions/PESelecter"

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
        
        </>
    )
}