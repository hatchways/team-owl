import axios from 'axios';
const server_Url = 'http://localhost:3001';

// helper for verifying token
//
const verifyToken = async (token) => {
  const user = await axios
    .post(`${server_Url}/api/user/verifytoken/`, null, {
      headers: {
        auth_token: `Bearer ${token}`,
      },
    })
    .catch((error) => {
      return error.response;
    });
  return user.data;
};

// helper for login
//
const login = async (email, password) => {
  const user = await axios
    .post(`${server_Url}/api/user/login`, {
      email,
      password,
    })
    .catch((error) => {
      return error.response;
    });
  return user.data;
};

// helper for signup
//
const signUp = async (name, email, password) => {
  const user = await axios
    .post(`${server_Url}/api/user/`, {
      name,
      email,
      password,
    })
    .catch((error) => {
      return error.response;
    });
  return user.data;
};

export { verifyToken, login, signUp };
