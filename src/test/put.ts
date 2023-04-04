async function postJSON(data: { username: string; }) {
    try {
        const response = await fetch("https://opendataspace.sos-ch-dk-2.exo.io/test/user.json", {
            method: "PUT", // or 'PUT'
            headers: {
                "Access-Control-Allow-Origin": "https://opendataspace.sos-ch-dk-2.exo.io",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log("Success:", result);
    } catch (error) {
        console.error("Error:", error);
    }
}

const data = { username: "example" };
postJSON(data);
