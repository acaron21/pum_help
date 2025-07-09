import RegardSelecter from "./RegardSelecter"

export default function ICContentOptions(props: {ic:number}){


    return(
        <>
            {
                props.ic === 843 && <RegardSelecter></RegardSelecter>
            }
        
        </>
    )
}