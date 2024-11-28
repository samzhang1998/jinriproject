const Backend_url = 'http://localhost:8080';
// const Backend_url = '/api';

export default async function FetchFunc(path, method, body) {
  return await fetch(`${Backend_url}` + path, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
    credentials:'include',
  })
    .catch(err => console.warn(err));
}

export const GetData = async () => {
  try {
    const response = await fetch(`${Backend_url}/data`, {
      method: 'GET',
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
      },
      body: JSON.stringify(payload),
      credentials: 'include',
    });
    if (!response.ok) {
      console.log(response.text());
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error posting data:', error.message);
    throw error;
  }
};