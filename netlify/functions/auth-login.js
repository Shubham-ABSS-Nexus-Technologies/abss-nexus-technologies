const crypto = require("crypto");

const json = (statusCode, body) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
  },
  body: JSON.stringify(body),
});

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  let body = {};
  try {
    body = JSON.parse(event.body || "{}");
  } catch (error) {
    return json(400, { error: "Invalid JSON" });
  }

  const adminUsername = process.env.ADMIN_USERNAME || "admin";
  const adminPassword = process.env.ADMIN_PASSWORD || "abss2026";
  const authSecret = process.env.AUTH_SECRET || "abss-netlify-dev-secret";
  const allowDevAdmin = process.env.ABSS_ALLOW_DEV_ADMIN === "true";
  const hasSecureAdminConfig = Boolean(process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD && process.env.AUTH_SECRET);

  if (!hasSecureAdminConfig && !allowDevAdmin) {
    return json(503, { error: "Admin authentication is development-only until secure production credentials are configured." });
  }

  if (body.username !== adminUsername || body.password !== adminPassword) {
    return json(401, { error: "Invalid credentials" });
  }

  const payload = JSON.stringify({ exp: Date.now() + 1000 * 60 * 60 * 8 });
  const signature = crypto.createHmac("sha256", authSecret).update(payload).digest("hex");
  const token = `${Buffer.from(payload).toString("base64url")}.${signature}`;

  return json(200, { token });
};
