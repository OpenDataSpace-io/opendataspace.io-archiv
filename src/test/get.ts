async function logJSONData() {
    const response = await fetch("https://opendataspace.sos-ch-dk-2.exo.io/test/index.json");
    const jsonData = await response.json();
    console.log(jsonData);
}

logJSONData();
  