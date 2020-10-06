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

// get all contest
const fetchAllContest = async () => {
  const contests = await axios
    .get(`${server_url}/api/contest`)
    .catch((error) => {
      return error.response;
    });
  return contests.data;
};

// GET all contests or submissions by UserId
const fetchAllContestByUserId = async (userId, token) => {
  const promise1 = () => {
    return axios.get(`${server_url}/api/user/${userId}/contests`, {
      headers: {
        auth_token: `Bearer ${token}`,
      },
    });
  };
  const promise2 = () => {
    return axios.get(`${server_url}/api/user/${userId}/submissions`, {
      headers: {
        auth_token: `Bearer ${token}`,
      },
    });
  };
  const contests = await Promise.all([promise1(), promise2()])
    .then((response) => {
      const results = {};
      results.created = response[0].data;
      results.submitted = response[1].data;
      return results;
    })
    .then((results) => {
      return results;
    })
    .catch((error) => {
      return error.response;
    });
  return contests;
};

// uploadAvatar
const uploadAvatar = async (form, token, userId) => {
  const user = await axios.put(`${server_url}/api/user/${userId}`, form, {
    headers: {
      auth_token: `Bearer ${token}`,
    },
  });
  return user.data;
};

export {
  verifyToken,
  login,
  signUp,
  uploadAvatar,
  fetchAllContestByUserId,
  fetchAllContest,
};
