import axios from 'axios';

const server_Url = 'http://localhost:3001';

const verifyToken = async (token) => {
  const user = await axios
    .post(`${server_Url}/api/user/verifytoken/`, null, {
      headers: {
        auth_token: `Bearer ${token}`,
      },
    })
    .catch((error) => {
      return error.message;
    });
  return user;
};

const login = async (email, password) => {
  const user = await axios.post(`${server_Url}/api/user/login`, {
    email,
    password,
  });
  return user.data;
};

const signUp = async (name, email, password) => {
  const user = await axios.post(`${server_Url}/api/user/`, {
    name,
    email,
    password,
  });
  return user.data;
};

export { verifyToken, login, signUp };
