export const postApi = async (url, data, headers = {}) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: data,
      headers: {
        ...headers,
      },
    });

    if (response.ok) {
      return {
        isSuccess: true,
        status: response.status,
        data: await response.json(),
      };
    }
    return {
      isSuccess: false,
      status: response.status,
      message: "Error posting data",
    };
  } catch (error) {
    console.error("Error in postApi:", error);
    return {
      isSuccess: false,
      message: error.message,
    };
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

    if (response.ok) {
      return {
        isSuccess: true,
        status: response.status,
        data: await response.json(),
      };
    }
    return {
      isSuccess: false,
      status: response.status,
      message: "Error fetching data",
    };
  } catch (error) {
    console.error("Error in postApi:", error);
    return {
      isSuccess: false,
      message: error.message,
    };
  }
};
