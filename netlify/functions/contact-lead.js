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

const normalizeLead = (input = {}) => ({
  id: input.id || `lead-${Date.now()}`,
  client: String(input.client || "Website Inquiry").trim(),
  service: String(input.service || "Website Inquiry").trim(),
  budget: Number(input.budget || 0),
  status: String(input.status || "New").trim(),
  contact: String(input.contact || "").trim(),
  submittedAt: input.submittedAt || new Date().toISOString(),
});

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
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  try {
    const lead = normalizeLead(JSON.parse(event.body || "{}"));
    const state = await readState();
    const existingIds = new Set(state.leads.map((item) => item.id));

    if (!existingIds.has(lead.id)) {
      state.leads.unshift(lead);
      state.activity.unshift(`${lead.client} submitted website inquiry`);
      state.activity = state.activity.slice(0, 20);
      await writeState(state);
    }

    return json(201, { ok: true, lead });
  } catch (error) {
    return json(400, { error: "Invalid JSON" });
  }
};
