const url = "http://localhost:3000/api";

export async function fetchBowlCardNames() {
  const res = await fetch(`${url}/bowl`);

  if (!res.ok) return;

  const data = await res.json();
  return data;
}

export async function fetchShotCardNames() {
  const res = await fetch(`${url}/shot`);

  if (!res.ok) return;

  const data = await res.json();
  return data;
}

export async function fetchShotTimingNames() {
  const res = await fetch(`${url}/timing`);

  if (!res.ok) return;

  const data = await res.json();
  return data;
}

export async function fetchPredictions() {
  const res = await fetch(`${url}/prediction`);

  if (!res.ok) return;

  const data = await res.json();
  return data;
}

export async function createPrediction(
  bowl_card_name,
  shot_card_name,
  shot_timing
) {
  const res = await fetch(`${url}/prediction`, {
    method: "POST",
    headers: { "Content-type": "Application/json" },
    body: JSON.stringify({ bowl_card_name, shot_card_name, shot_timing }),
  });

  if (!res.ok) return;

  const data = await res.json();
  return data;
}
