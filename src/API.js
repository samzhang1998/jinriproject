const Backend_url = 'http://192.168.1.108:8080';

export default async function FetchFunc(path, method, body) {
  return await fetch(`${Backend_url}` + path, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer ' + token,
    },
    credentials: "include",
    body: body,
  })
    .catch(err => console.warn(err));
}

export const GetData = async () => {
  try {
    const response = await fetch(`${Backend_url}/data`, {
      method: 'GET',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const PostData = async (url,payload) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer' + token,
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};