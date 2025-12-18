

export async function getPathBeton(start_article_id: number | string, end_article_id: number | string, target_height: number){

    const res = await fetch(import.meta.env.VITE_API_URL + "/astar/beton", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            start_article_id: start_article_id,
            end_article_id: end_article_id,
            target_height: target_height
        }),
        });
    let data = await res.json();
    console.log(data)
    return data;
}