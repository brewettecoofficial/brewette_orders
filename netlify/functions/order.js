export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { items } = JSON.parse(event.body || "{}");

  if (!items || !items.length) {
    return { statusCode: 400, body: "Invalid order" };
  }

  // 🔁 PASTE YOUR GOOGLE SCRIPT URL HERE
  const SHEET_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbwn60HW0B_WzVpwYLmgaXB9Anacha-ym8EyCYrDIzHqejmmW0KCa9HOBJ5Ve9hRikBibA/exec";

  await fetch(SHEET_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items })
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ status: "saved" })
  };
}
