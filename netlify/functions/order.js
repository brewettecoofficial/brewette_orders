export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { customer, items, totalAmount } = JSON.parse(event.body || "{}");

  const SHEET_WEBHOOK_URL =
    "https://script.google.com/macros/s/AKfycbx7wGkwEjAqOtNb-bhXa2PahXbjWLG1oJMUL6uFAZ5oNeB1vt0Sx4ZmiXYNKut0-ZjIdg/exec";

  await fetch(SHEET_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customer, items, totalAmount })
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ status: "saved" })
  };
}

