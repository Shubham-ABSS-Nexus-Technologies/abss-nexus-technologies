const crypto = require("crypto");

const emptyState = {
  leads: [],
  projects: [],
  clients: [],
  tickets: [],
  pricing: [],
  activity: [],
};

let memoryState = { ...emptyState };

const json = (statusCode, body) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
  },
  body: JSON.stringify(body),
});

const normalizeState = (state = {}) => ({
  leads: Array.isArray(state.leads) ? state.leads : [],
  projects: Array.isArray(state.projects) ? state.projects : [],
  clients: Array.isArray(state.clients) ? state.clients : [],
  tickets: Array.isArray(state.tickets) ? state.tickets : [],
  pricing: Array.isArray(state.pricing) ? state.pricing : [],
  activity: Array.isArray(state.activity) ? state.activity : [],
});

const verifyToken = (token) => {
  if (!token || !token.includes(".")) return false;
  try {
    const [encodedPayload, signature] = token.split(".");
    const authSecret = process.env.AUTH_SECRET || "abss-netlify-dev-secret";
    const payloadText = Buffer.from(encodedPayload, "base64url").toString();
    const expected = crypto.createHmac("sha256", authSecret).update(payloadText).digest("hex");
    if (signature !== expected) return false;
    return JSON.parse(payloadText).exp > Date.now();
  } catch (error) {
    return false;
  }
};

const requireAuth = (event) => {
  const header = event.headers.authorization || event.headers.Authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  return verifyToken(token);
};

const getAdminStore = async () => {
  const { getStore } = await import("@netlify/blobs");
  return getStore("abss-admin");
};

const readState = async () => {
  try {
    const store = await getAdminStore();
    return normalizeState((await store.get("state", { type: "json" })) || emptyState);
  } catch (error) {
    return normalizeState(memoryState);
  }
};

const writeState = async (state) => {
  const normalizedState = normalizeState(state);
  memoryState = normalizedState;
  try {
    const store = await getAdminStore();
    await store.setJSON("state", normalizedState);
  } catch (error) {
    // Local fallback only. Netlify Functions use Blob storage in production.
  }
  return normalizedState;
};

exports.handler = async (event) => {
  if (!requireAuth(event)) {
    return json(401, { error: "Unauthorized" });
  }

  if (event.httpMethod === "GET") {
    return json(200, await readState());
  }

  if (event.httpMethod === "PUT") {
    try {
      return json(200, await writeState(JSON.parse(event.body || "{}")));
    } catch (error) {
      return json(400, { error: "Invalid JSON" });
    }
  }

  return json(405, { error: "Method not allowed" });
};
