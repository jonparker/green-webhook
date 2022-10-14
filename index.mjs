import fetch from "node-fetch";

async function GetData() {
  const res = await fetch(
    "https://carbon-aware-api.azurewebsites.net/emissions/bylocations/best?location=eastus&location=westus&time=2022-03-01T15%3A30%3A00Z&toTime=2022-03-01T18%3A30%3A00Z"
  );
  const data = await res.json();
  console.log(data);
}

await GetData();
