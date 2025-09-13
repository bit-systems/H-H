


export const postApi = async (url, data, headers = {}) => {
    try {



  const response = await fetch(url, {
    method: 'POST',
body: data,
    headers: {
      ...headers,
    }});
  return response.json();
    }
    catch (error) {
      console.error('Error in postApi:', error);
      return { isError: true, error: error.message || 'An error occurred' };
    }
  }