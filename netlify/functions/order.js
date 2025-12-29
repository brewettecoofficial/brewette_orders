export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { customer, items, totalAmount } = JSON.parse(event.body || "{}");

  const SHEET_WEBHOOK_URL =
    "https://script.google.com/macros/s/AKfycbxykUBas8LgoAZZSgWTGV48zB0uQb3bid8gQYWYqIHcfIBL-G9tPBUr2Z68d0mvvtr0_A/exec";

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

