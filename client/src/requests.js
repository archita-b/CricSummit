const url = "http://localhost:3000/api";

export async function fetchCardNames() {
  const res = await fetch(`${url}/cards`);

  if (!res.ok) return;

  const cardNames = await res.json();
  return { cardNames: cardNames, status: res.status };
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
