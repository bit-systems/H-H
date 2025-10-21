export const postApi = async (url, data, headers = {}) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: data,
      headers: {
        ...headers,
      },
    });
    return response.json();
  } catch (error) {
    console.error("Error in postApi:", error);
    throw error;
  }
};

export const getApi = async (url, query, headers = {}) => {
  try {
    const queryString = new URLSearchParams(query).toString();
    url = queryString ? `${url}?${queryString}` : url;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        ...headers,
      },
    });
    return response.json();
  } catch (error) {
    console.error("Error in postApi:", error);
    throw error;
  }
};
