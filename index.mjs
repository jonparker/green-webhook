import fetch from "node-fetch";

const baseUri = "https://carbon-aware-api.azurewebsites.net";

// Calculate the best emission data by list of locations for a specified time period.
async function BestEmissionData(locations, fromTime, toTime) {
  if (locations.length === 0) {
    return null;
  }
  const locationsQuery = locations
    .map((location) => `location=${location}`)
    .join("&");
  const res = await fetch(
    `${baseUri}/emissions/bylocations/best?${locationsQuery}&time=${fromTime}&toTime=${toTime}`
  );
  return await res.json();
}

async function CurrentForecast(locations, fromTime, toTime, windowSize) {
  if (locations.length === 0) {
    return null;
  }
  const locationsQuery = locations
    .map((location) => `location=${location}`)
    .join("&");
  const res = await fetch(
    `${baseUri}/emissions/forecasts/current?${locationsQuery}&dataStartAt=${fromTime}&dataEndAt=${toTime}&windowSize=${windowSize}`
  );
  return await res.json();
}

const test1 = await BestEmissionData(
  ["eastus", "westus"],
  "2022-03-01T15:30:00Z",
  "2022-03-01T18:30:00Z"
);
console.log(`Best emissions`, test1);

const test2 = await CurrentForecast(
  ["eastus", "westus"],
  "2022-10-14T06:00:00Z",
  "2022-10-14T07:00:00Z",
  30
);

console.log(`Current forecast`, test2);
