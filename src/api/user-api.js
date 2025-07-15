import axios from "axios";
import { backendConfig } from "../content/MainContent";

const apiURL = backendConfig.base + "/users";
const token = localStorage.getItem("token");

export async function raiseSupportRequest(payload) {
  const response = await axios.post(`${apiURL}/support/create`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}
export async function getComplainHistory() {
  const response = await axios.get(`${apiURL}/support/messages`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}
export async function getUserTreeData() {
  const response = await axios.get(`${apiURL}/get-binary`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function sendOtpValidateEmail(payload) {
  const response = await axios.post(`${apiURL}/forgot-password`, payload);
  return response?.data;
}

export async function resetPasswordApi(payload) {
  const response = await axios.post(`${apiURL}/reset-password`, payload);
  return response?.data;
}

export async function buyPlanPackage(payload) {
  const response = await axios.post(`${apiURL}/buy-package`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}


export async function getCustomPlanList() {
  const response = await axios.get(`${apiURL}/all-packages`);
  return response?.data;
}

export async function getBannerListUser() {
  const response = await axios.get(`${apiURL}/get-banners`);
  return response?.data;
}
export async function getReferralIncomeHistory() {
  const response = await axios.get(`${apiURL}/getreferal-history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  return response?.data;
}
export async function RoiIncomeAPi() {
  const response = await axios.get(`${apiURL}/getRoi-history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  return response?.data;
}
export async function LevelIncomeApi() {
  const response = await axios.get(`${apiURL}/getLevelIncome-history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  return response?.data;
}

export async function getLevelUsersDetails() {
  const response = await axios.get(`${apiURL}/getLevelUsers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}


export async function getAllFooterLinks() {
  const response = await axios.get(`${apiURL}/getAllFooterLinks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}
