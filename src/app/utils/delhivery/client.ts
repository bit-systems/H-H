const BASE_URL = process.env.DELHIVERY_API_BASE_URL;
const BASE_PATH = "/c/api";

const FULL_URL = BASE_URL + BASE_PATH;

const options = {
  headers: { Authorization: `Token ${process.env.DELHIVERY_API_TOKEN}` },
};

export const delhiveryGet = async (endpoint: string) => {
  try {
    const res = await fetch(FULL_URL + endpoint, {
      ...options,
      method: "GET",
    });

    return res.json();
  } catch (e) {
    console.log(e);
    throw new Error("Error occurred while executing API");
  }
};
