
export async function functionName(_params: number | string){

    const res = await fetch(import.meta.env.VITE_API_URL + "/fetch/route", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            param: _params,
        }),
        });
    let data = await res.json();
    
    return data;
}