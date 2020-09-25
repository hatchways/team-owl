import axios from 'axios';
const server_url = process.env.REACT_APP_SERVER_URL || 'http://localhost:3001';

// helper for verifying token
//
const verifyToken = async (token) => {
  const user = await axios
    .post(`${server_url}/api/user/verifytoken/`, null, {
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
    .post(`${server_url}/api/user/login`, {
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
    .post(`${server_url}/api/user/`, {
      name,
      email,
      password,
    })
    .catch((error) => {
      return error.response;
    });
  return user.data;
};

const getContest = async () => {
  const contests = await axios
    .get(`${server_url}/api/contest`)
    .catch((error) => {
      return error.response;
    });
  return contests.data;
};

export { verifyToken, login, signUp, getContest };
