import clsx from "clsx";


type ZoneProps = {
    id: number;
    x: number;
    y: number;
    w: number;
    h: number;

    selected: boolean;
}

export default function Zone({id, x, y, w, h, selected}: ZoneProps){
    const handleclick = () =>{
        console.log(id)
    }
    return (
        <rect x={x} y={y} width={w} height={h}
        className={clsx(
            selected
            ? "fill-[#F95C67]"
            :"fill-blue-light hover:fill-blue-semi-light cursor-pointer"
            ,
        )}
        onClick={handleclick}
        />
    )
}