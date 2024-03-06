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

  const predictions = await res.json();
  return { predictions: predictions, status: res.status };
}

export async function createPrediction(bowlCardName, shotCardName, shotTiming) {
  const res = await fetch(`${url}/prediction`, {
    method: "POST",
    headers: { "Content-type": "Application/json" },
    body: JSON.stringify({ bowlCardName, shotCardName, shotTiming }),
  });

  if (!res.ok) return;

  const data = await res.json();
  return data;
}
