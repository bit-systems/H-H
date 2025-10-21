const BASE_URL = process.env.DELHIVERY_API_BASE_URL;

const options = {
  headers: { Authorization: `Token ${process.env.DELHIVERY_API_TOKEN}` },
};

export const delhiveryGet = async (endpoint: string) => {
  try {
    const res = await fetch(BASE_URL + endpoint, {
      ...options,
      method: "GET",
    });

    return res.json();
  } catch (e) {
    console.log(e);
    throw new Error("Error occurred while executing API");
  }
};
export const delhiveryPost = async (
  endpoint: string,
  payload: Record<string, unknown>
) => {
  try {
    console.log(`format=json&data=${JSON.stringify(payload)}`, "payload");
    const res = await fetch(BASE_URL + endpoint, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...options.headers,
      },
      method: "POST",
      body: `format=json&data=${JSON.stringify(payload)}`,
    });

    return res.json();
  } catch (e) {
    console.log(e);
    throw new Error("Error occurred while executing API");
  }
};
