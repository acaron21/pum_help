
export async function getMaterialOptions(){

    const res = await fetch(import.meta.env.VITE_API_URL + "/path/get-material-options", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        });
    let data = await res.json();
    
    return data;
}