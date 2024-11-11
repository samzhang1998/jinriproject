const Backend_url = 'http://localhost:5000';

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

export const PostData = async (payload) => {
  try {
    const response = await fetch(`${Backend_url}/data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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

const customers = [
  { id: 'customer1', password: 'password1' },
  { id: 'customer2', password: 'password2' },
];
  
const agents = [
  { id: 'agent1', password: 'password1' },
  { id: 'agent2', password: 'password2' },
];

export const authenticateUser = (userId, password, userType) => {
  let users;

  if (userType === 'customer') {
    users = customers;
  } else if (userType === 'agent') {
    users = agents;
  } else {
    return false;
  }

  const user = users.find((user) => user.id === userId);

  if (user && user.password === password) {
    return true;
  } else {
    return false;
  }
};