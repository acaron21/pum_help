

function normalizeId(id: any) {
  if (typeof id === "object" && "low" in id) {
    return `${id.low}`;
  }
  return id;
}

export async function getConnexions(code: number){

    const res = await fetch(import.meta.env.VITE_API_URL + "/products/get-connexions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            codeArticle: code,
        }),
        });
    let data = await res.json();
    
    return data;
}