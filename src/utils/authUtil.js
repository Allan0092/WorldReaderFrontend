import axios from "axios";

function isTokenValid(token = getCurrentToken()) {
  // check if token is expired
  if (!token) return false;
  const payload = JSON.parse(atob(token.split(".")[1]));
  const expiry = payload.exp;
  const now = Math.floor(Date.now() / 1000);
  return now < expiry;
}

function storeUserToken(token) {
  localStorage.setItem("token", token);
}

function getCurrentToken() {
  return localStorage.getItem("token");
}

function getCurrentUserId() {
  const token = getCurrentToken();
  if (!isTokenValid(token)) return null;
  return JSON.parse(atob(token.split(".")[1])).id;
}

function getCurrentUserEmail() {
  const token = getCurrentToken();
  if (!isTokenValid(token)) return null;
  return JSON.parse(atob(token.split(".")[1])).email;
}

async function getCurrentUserDetails() {
  const email = getCurrentUserEmail();
  try {
    const res = await axios.post(
      "http://localhost:5000/api/user/findByEmail",
      { email: email },
      {
        headers: {
          Authorization: `Bearer ${getCurrentToken()}`,
        },
      }
    );

    if (res.status === 200) {
      return res.data;
    } else {
      return null;
    }
  } catch (e) {
    return e.toString();
  }
}

function storeAdminToken(token) {
  localStorage.setItem("admin-token", token);
}

function getAdminToken() {
  return localStorage.getItem("admin-token");
}

function removeAdminToken() {
  localStorage.removeItem("admin-token");
}

async function isAdmin() {
  const token = getAdminToken();
  if (!token) return false;
  const payload = JSON.parse(atob(token.split(".")[1]));
  const expiry = payload.exp;
  const now = Math.floor(Date.now() / 1000);
  return now < expiry && payload.role === "Admin";
}

export {
  getAdminToken,
  getCurrentToken,
  getCurrentUserDetails,
  getCurrentUserId,
  isAdmin,
  isTokenValid,
  removeAdminToken,
  storeAdminToken,
  storeUserToken,
};
