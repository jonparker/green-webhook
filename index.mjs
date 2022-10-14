import fetch from "node-fetch";

// Calculate the best emission data by list of locations for a specified time period.
async function BestEmissionData(locations, fromTime, toTime) {
  if (locations.length === 0) {
    return [];
  }
  const baseUri = "https://carbon-aware-api.azurewebsites.net";
  const locationsQuery = locations
    .map((location) => `location=${location}`)
    .join("&");
  const res = await fetch(
    `${baseUri}/emissions/bylocations/best?${locationsQuery}&time=${fromTime}&toTime=${toTime}`
  );
  return await res.json();
}

const res = await BestEmissionData(
  ["eastus", "westus"],
  "2022-03-01T15:30:00Z",
  "2022-03-01T18:30:00Z"
);

console.log(res);
