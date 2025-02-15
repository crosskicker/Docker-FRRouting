const addr = "http://localhost:5000"

export default async function fetchElemToBoard(value,endpoint){
    try{
        const response = await fetch(addr + endpoint, {
            method: 'POST',
            body: JSON.stringify(value),
            headers: {
                "Content-Type": "application/json"
            },
        });
        if (response.ok){
            const resp = await response.json();
            return response.results;
        }
        else{
            const e = await response.json();
            return { error : "Server error : " + e.message }
        }
    }
    catch (e){
        return { error : "Server error : " + e.message }
    }
}
