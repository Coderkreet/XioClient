import axios from "axios";
import { backendConfig } from "../content/MainContent";

const apiURL = backendConfig.base + "/admin";
const LendingApiURL = backendConfig.base ;

console.log(apiURL);
const token = localStorage.getItem("token");

export async function getPendingComplainHistory() {
  const response = await axios.get(`${apiURL}/support-in-process`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function approveComplainRequest(id, responsePayload) {
  const res = await axios.post(
    `${apiURL}/support/status/approve/${id}`,
    { status: "accept", ...responsePayload },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return res;
}

export async function rejectComplainRequest(id,responsePayload) {
  const response = await axios.post(
    `${apiURL}/support/status/reject/${id}`,
    { status: "reject",...responsePayload },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response;
}

export async function getAllUserList() {
  const response = await axios.get(`${apiURL}/all-users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function userStatusToggle(id) {
  const response = await axios.get(`${apiURL}/user-block/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response;
}
export async function deleteUserAdminEnd(id) {
  const response = await axios.get(`${apiURL}/delete-user/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response;
}
export async function getDirectReferralIncome() {
  const response = await axios.get(`${apiURL}/directreferralincome-reports`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}
export async function getSelfIncomeHistory() {
  const response = await axios.get(`${apiURL}/selfincome-reports`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}
export async function getMatchingIncomeHistory() {
  const response = await axios.get(`${apiURL}/matchingincome-reports`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}
export async function getLevelIncomeHistory() {
  const response = await axios.get(`${apiURL}/getAllLevelIncome-history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}
export async function getAllPlanPurchaseList() {
  const response = await axios.get(`${apiURL}/getAllInvestedUsers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function createOrUpdateBanner(payload) {
  const response = await axios.post(`${apiURL}/upload-banner`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function getBannerList() {
  const response = await axios.get(`${apiURL}/get-banner`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function adminWithdrawalUpdate(payload) {
  const response = await axios.post(`${apiURL}/withdrawal-update`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function loginWithEmailAdminApi(payload) {
  const response = await axios.post(`${apiURL}/login`, payload, {
    withCredentials: true,
  });
  return response?.data;
}

export async function getAdminInfo() {
  const response = await axios.get(`${apiURL}/getProfile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}
export async function getTotalIncomeInfo() {
  const response = await axios.get(`${apiURL}/getAllIncomes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}
export async function getUsers() {
  const response = await axios.get(`${apiURL}/getAllUsers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}
export async function getROiHistory() {
  const response = await axios.get(`${apiURL}/get-roi-history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function getAllBanners() {
  const response = await axios.get(`${apiURL}/get-banners`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function deleteBanner(id) {
  const response = await axios.get(`${apiURL}/delete-banner/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}


export async function RefferralIncomeAPi() {
  const response = await axios.get(`${apiURL}/getAllReferalBonus-history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function createEvent(payload) {
  const response = await axios.post(`${LendingApiURL}/landingpage/events`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function getAllEvents() {
  const response = await axios.get(`${LendingApiURL}/landingpage/events`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function getEventsByType(type) {
  const response = await axios.get(`${LendingApiURL}/landingpage/events/type/${type}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function getEventById(id) {
  const response = await axios.get(`${LendingApiURL}/landingpage/events/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function updateEvent(id, payload) {
  const response = await axios.put(`${LendingApiURL}/landingpage/events/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function deleteEvent(id) {
  const response = await axios.delete(`${LendingApiURL}/landingpage/events/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}


export async function createFAQ(payload) {
  const response = await axios.post(`${LendingApiURL}/landingpage/faqs`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function getAllFAQs() {
  const response = await axios.get(`${LendingApiURL}/landingpage/faqs`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function getFAQById(id) {
  const response = await axios.get(`${LendingApiURL}/landingpage/faqs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function updateFAQ(id, payload) {
  const response = await axios.put(`${LendingApiURL}/landingpage/faqs/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function deleteFAQ(id) {
  const response = await axios.delete(`${LendingApiURL}/landingpage/faqs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}


export async function createOverview(payload) {
  const response = await axios.post(`${LendingApiURL}/landingpage/overviews`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function getAllOverviews() {
  const response = await axios.get(`${LendingApiURL}/landingpage/overviews`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function getOverviewById(id) {
  const response = await axios.get(`${LendingApiURL}/landingpage/overviews/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function updateOverview(id, payload) {
  const response = await axios.put(`${LendingApiURL}/landingpage/overviews/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function deleteOverview(id) {
  const response = await axios.delete(`${LendingApiURL}/landingpage/overviews/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}


export async function createProduct(payload) {
  const response = await axios.post(`${LendingApiURL}/landingpage/create-products`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function getAllProducts() {
  const response = await axios.get(`${LendingApiURL}/landingpage/get-products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function getProductById(id) {
  const response = await axios.get(`${LendingApiURL}/landingpage/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function updateProduct(id, payload) {
  const response = await axios.put(`${LendingApiURL}/landingpage/update-products/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function deleteProduct(id) {
  const response = await axios.delete(`${LendingApiURL}/landingpage/delete-products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function createWhyChooseUs(payload) {
  const response = await axios.post(`${LendingApiURL}/landingpage/why-choose-us/create`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function getAllWhyChooseUs() {
  const response = await axios.get(`${LendingApiURL}/landingpage/why-choose-us/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function getWhyChooseUsById(id) {
  const response = await axios.get(`${LendingApiURL}/landingpage/why-choose-us/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function updateWhyChooseUs(id, payload) {
  const response = await axios.put(`${LendingApiURL}/landingpage/why-choose-us/update/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function deleteWhyChooseUs(id) {
  const response = await axios.delete(`${LendingApiURL}/landingpage/why-choose-us/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}


export async function uploadLogo(payload) {
  const response = await axios.post(`${LendingApiURL}/landingpage/logos`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function getLatestLogo() {
  const response = await axios.get(`${LendingApiURL}/landingpage/logos/latest`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function deleteLogo(id) {
  const response = await axios.delete(`${LendingApiURL}/landingpage/logos/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}


export async function createTokenomics(payload) {
  const response = await axios.post(`${LendingApiURL}/landingpage/createTokenomics`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function getTokenomics() {
  const response = await axios.get(`${LendingApiURL}/landingpage/getTokenomics`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}


export async function updateTokenomics(id, payload) {
  const response = await axios.put(`${LendingApiURL}/landingpage/updateTokenomics/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function deleteTokenomics(id) {
  const response = await axios.delete(`${LendingApiURL}/landingpage/deleteTokenomics/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}



export async function createRoadMap(payload) {
  const response = await axios.post(`${LendingApiURL}/landingpage/roadmap/create`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function getAllRoadMaps() {
  const response = await axios.get(`${LendingApiURL}/landingpage/roadmap/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function getRoadMapById(id) {
  const response = await axios.get(`${LendingApiURL}/landingpage/roadmap/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function updateRoadMap(id, payload) {
  const response = await axios.put(`${LendingApiURL}/landingpage/roadmap/update/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function deleteRoadMap(id) {
  const response = await axios.delete(`${LendingApiURL}/landingpage/roadmap/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}


export async function createToken(payload) {
  const response = await axios.post(`${LendingApiURL}/landingpage/token/create`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function getAllTokens() {
  const response = await axios.get(`${LendingApiURL}/landingpage/token/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function getTokenById(id) {
  const response = await axios.get(`${LendingApiURL}/landingpage/token/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function updateToken(id, payload) {
  const response = await axios.put(`${LendingApiURL}/landingpage/token/update/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function deleteToken(id) {
  const response = await axios.delete(`${LendingApiURL}/landingpage/token/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}



// router.post('/createMarketStats', contentController.createMarketStats);               // Create
// router.get('/getMarketStats', contentController.getMarketStats);                   // Read all
// router.get('/getMarketStatsById/:id', contentController.getMarketStatsById);            // Read one
// router.put('/updateMarketStats/:id', contentController.updateMarketStats);             // Update
// router.delete('/deleteMarketStats/:id', contentController.deleteMarketStats);

// router.post('/createTokenTracker', contentController.createTokenTracker);             // Create
// router.get('/getTokenTrackers', contentController.getTokenTrackers);                // Read all
// router.get('/getTokenTrackerById/:id', contentController.getTokenTrackerById);          // Read one
// router.put('/updateTokenTracker/:id', contentController.updateTokenTracker);           // Update
// router.delete('/deleteTokenTracker/:id', contentController.deleteTokenTracker); 

export async function createTokenTracker(payload) {
  const response = await axios.post(`${LendingApiURL}/landingpage/createTokenTracker`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function getAllTokenTrackers() {
  const response = await axios.get(`${LendingApiURL}/landingpage/getTokenTrackers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function getTokenTrackerById(id) {
  const response = await axios.get(`${LendingApiURL}/landingpage/getTokenTrackerById/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function updateTokenTracker(id, payload) {
  const response = await axios.put(`${LendingApiURL}/landingpage/updateTokenTracker/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function deleteTokenTracker(id) {
  const response = await axios.delete(`${LendingApiURL}/landingpage/deleteTokenTracker/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function createMarketStats(payload) {
  const response = await axios.post(`${LendingApiURL}/landingpage/createMarketStats`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}


export async function getAllMarketStats() {
  const response = await axios.get(`${LendingApiURL}/landingpage/getMarketStats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function getMarketStatsById(id) {
  const response = await axios.get(`${LendingApiURL}/landingpage/getTokenTrackerById/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function updateMarketStats(id, payload) {
  const response = await axios.put(`${LendingApiURL}/landingpage/updateMarketStats/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function deleteMarketStats(id) {
  const response = await axios.delete(`${LendingApiURL}/landingpage/deleteMarketStats/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}



export async function createEcosystem(payload) {
  const response = await axios.post(`${LendingApiURL}/landingpage/createEcosystem`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function getAllEcosystems() {
  const response = await axios.get(`${LendingApiURL}/landingpage/getAllEcosystems`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function getEcosystemById(id) {
  const response = await axios.get(`${LendingApiURL}/landingpage/getEcosystemById/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function updateEcosystem(id, payload) {
  const response = await axios.put(`${LendingApiURL}/landingpage/updateEcosystem/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function deleteEcosystem(id) {
  const response = await axios.delete(`${LendingApiURL}/landingpage/deleteEcosystem/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}



export async function createFooterLink(payload) {
  const response = await axios.post(
    `${LendingApiURL}/landingpage/createFooterLink`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function getAllFooterLinks() {
  const response = await axios.get(
    `${LendingApiURL}/landingpage/getAllFooterLinks`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function updateFooterLink(id, payload) {
  const response = await axios.put(
    `${LendingApiURL}/landingpage/updateFooterLink/${id}`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function deleteFooterLink(id) {
  const response = await axios.delete(
    `${LendingApiURL}/landingpage/deleteFooterLink/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}


export async function createHeaderContent(payload) {
  const response = await axios.post(
    `${LendingApiURL}/landingpage/create-header`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function getAllHeaderContent() {
  const response = await axios.get(
    `${LendingApiURL}/landingpage/get-header`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function updateHeaderContent(id, payload) {
  const response = await axios.put(
    `${LendingApiURL}/landingpage/update-header/${id}`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function deleteHeaderContent(id) {
  const response = await axios.delete(
    `${LendingApiURL}/landingpage/delete-header/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}


export async function createHeaderSlider(payload) {
  const response = await axios.post(
    `${LendingApiURL}/landingpage/create-header-slider`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function getAllHeaderSliders() {
  const response = await axios.get(
    `${LendingApiURL}/landingpage/get-header-slider`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function updateHeaderSlider(id, payload) {
  const response = await axios.put(
    `${LendingApiURL}/landingpage/update-header-slider/${id}`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function deleteHeaderSlider(id) {
  const response = await axios.delete(
    `${LendingApiURL}/landingpage/delete-header-slider/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function createTokenV2(payload) {
  const response = await axios.post(
    `${LendingApiURL}/landingpage/create-token-details`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function getAllTokensV2() {
  const response = await axios.get(
    `${LendingApiURL}/landingpage/get-token-details`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function updateTokenV2(id, payload) {
  const response = await axios.put(
    `${LendingApiURL}/landingpage/update-token-details/${id}`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function deleteTokenV2(id) {
  const response = await axios.delete(
    `${LendingApiURL}/landingpage/delete-token-details/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}


export async function createListedPlatform(payload) {
  const response = await axios.post(
    `${LendingApiURL}/landingpage/create-platforms`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function getAllListedPlatforms() {
  const response = await axios.get(
    `${LendingApiURL}/landingpage/get-platforms`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function updateListedPlatform(id, payload) {
  const response = await axios.put(
    `${LendingApiURL}/landingpage/update/${id}`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function deleteListedPlatform(id) {
  const response = await axios.delete(
    `${LendingApiURL}/landingpage/delete/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function createConnectWallet(payload) {
  const response = await axios.post(
    `${LendingApiURL}/landingpage/create-wallet`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function getAllConnectWallets() {
  const response = await axios.get(
    `${LendingApiURL}/landingpage/get-wallets`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function getConnectWalletById(id) {
  const response = await axios.get(
    `${LendingApiURL}/landingpage/get-wallet/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function updateConnectWallet(id, payload) {
  const response = await axios.put(
    `${LendingApiURL}/landingpage/update-wallet/${id}`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function deleteConnectWallet(id) {
  const response = await axios.delete(
    `${LendingApiURL}/landingpage/delete-wallet/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function createNews(payload) {
  const response = await axios.post(
    `${LendingApiURL}/landingpage/create-news`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function getAllNews() {
  const response = await axios.get(
    `${LendingApiURL}/landingpage/get-news`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function getNewsById(id) {
  const response = await axios.get(
    `${LendingApiURL}/landingpage/get-news/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function updateNews(id, payload) {
  const response = await axios.put(
    `${LendingApiURL}/landingpage/update-news/${id}`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function deleteNews(id) {
  const response = await axios.delete(
    `${LendingApiURL}/landingpage/delete-news/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}


export async function createTermAndCondition(payload) {
  const response = await axios.post(
    `${LendingApiURL}/landingpage/create-terms`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function getAllTermsAndConditions() {
  const response = await axios.get(
    `${LendingApiURL}/landingpage/get-terms`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function getTermAndConditionById(id) {
  const response = await axios.get(
    `${LendingApiURL}/landingpage/get-particular-term/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function updateTermAndCondition(id, payload) {
  const response = await axios.put(
    `${LendingApiURL}/landingpage/update-terms/${id}`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function deleteTermAndCondition(id) {
  const response = await axios.delete(
    `${LendingApiURL}/landingpage/delete-terms/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function createPrivacyPolicy(payload) {
  const response = await axios.post(
    `${LendingApiURL}/landingpage/create-policy`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function getAllPrivacyPolicies() {
  const response = await axios.get(
    `${LendingApiURL}/landingpage/get-policy`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function getPrivacyPolicyById(id) {
  const response = await axios.get(
    `${LendingApiURL}/landingpage/get-policy/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function updatePrivacyPolicy(id, payload) {
  const response = await axios.put(
    `${LendingApiURL}/landingpage/update-policy/${id}`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function deletePrivacyPolicy(id) {
  const response = await axios.delete(
    `${LendingApiURL}/landingpage/delete-policy/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function createCookiePolicy(payload) {
  const response = await axios.post(
    `${LendingApiURL}/landingpage/create-cookiee`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function getAllCookiePolicies() {
  const response = await axios.get(
    `${LendingApiURL}/landingpage/get-cookiee`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function getCookiePolicyById(id) {
  const response = await axios.get(
    `${LendingApiURL}/landingpage/get-cookiee/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function updateCookiePolicy(id, payload) {
  const response = await axios.put(
    `${LendingApiURL}/landingpage/update-cookiee/${id}`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function deleteCookiePolicy(id) {
  const response = await axios.delete(
    `${LendingApiURL}/landingpage/delete-cookiee/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function createBlog(payload) {
  const response = await axios.post(
    `${LendingApiURL}/landingpage/create-blog`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function getAllBlogs() {
  const response = await axios.get(
    `${LendingApiURL}/landingpage/get-blogs`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function getBlogById(id) {
  const response = await axios.get(
    `${LendingApiURL}/landingpage/get-blogs/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function updateBlog(id, payload) {
  const response = await axios.put(
    `${LendingApiURL}/landingpage/update-blogs/${id}`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function deleteBlog(id) {
  const response = await axios.delete(
    `${LendingApiURL}/landingpage/delete-blogs/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}
export async function createCopyWrite(payload) {
  const response = await axios.post(
    `${LendingApiURL}/landingpage/create-copywrite`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function getAllCopyWrites() {
  const response = await axios.get(
    `${LendingApiURL}/landingpage/get-copywrite`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function getCopyWriteById(id) {
  const response = await axios.get(
    `${LendingApiURL}/landingpage/get-copywrite/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function updateCopyWrite(id, payload) {
  const response = await axios.put(
    `${LendingApiURL}/landingpage/update-copywrite/${id}`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function deleteCopyWrite(id) {
  const response = await axios.delete(
    `${LendingApiURL}/landingpage/delete-copywrite/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function createDescription(payload) {
  const response = await axios.post(
    `${LendingApiURL}/landingpage/create-description`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function getAllDescriptions() {
  const response = await axios.get(
    `${LendingApiURL}/landingpage/get-description`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function getDescriptionById(id) {
  const response = await axios.get(
    `${LendingApiURL}/landingpage/get-description/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function updateDescription(id, payload) {
  const response = await axios.put(
    `${LendingApiURL}/landingpage/update-description/${id}`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function deleteDescription(id) {
  const response = await axios.delete(
    `${LendingApiURL}/landingpage/delete-description/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}


export async function createContact(payload) {
  const response = await axios.post(
    `${LendingApiURL}/landingpage/create-contact`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function getAllContacts() {
  const response = await axios.get(
    `${LendingApiURL}/landingpage/get-contact`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}
