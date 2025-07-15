import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Landing from './page/Landing';
import Admin from './page/Admin';
import { ProtectedRoute, PublicRoute } from './component/ProtectedRoute';
import LoginPage from './page/LoginPage';
import AdHearoSection from './page/AdminPages/AdHearoSection';
import AdHearoSlider from './page/AdminPages/AdHearoSlider';
import AdWalletSection from './page/AdminPages/AdWalletSection';
import AdAboutSection from './page/AdminPages/AdAboutSection';
import AdListedOn from './page/AdminPages/AdListedOn';
import AdEcosystem from './page/AdminPages/AdEcosystem';
import AdOurProducts from './page/AdminPages/AdOurProducts';
import AdRoadmap from './page/AdminPages/AdRoadmap';
import AdTokenomics from './page/AdminPages/AdTokenomics';
import AdEvents from './page/AdminPages/AdEvents';
import AdFaqs from './page/AdminPages/AdFaqs';
import AdNews from './page/AdminPages/AdNews';
import AdImportToken from './page/AdminPages/AdImportToken';
import ContectUs from './component/ContectUs';
import AdminFooter from './page/AdminPages/AdminFooter';
import TermsOfUse from './component/TermsOfUse ';
import AdminTermsAndConditions from './page/AdminPages/AdminTermsAndConditions';
import AdminPrivacyPolicy from './page/AdminPages/AdminPrivacyPolicy';
import AdminCookiePolicy from './page/AdminPages/AdminCookiePolicy';
import PrivacyPolicy from './component/PrivacyPolicy';
import CookiePolicy from './component/CookiePolicy';
import AllBlogs from './component/Blog/AllBlogs';
import Blog from './component/Blog/Blog';
import AdBlogs from './page/AdminPages/AdBlogs';
import AdminContact from './page/AdminPages/AdminContact';

const AppRoutes = () => {
  return (

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>

        } />
         <Route path="/contact-us" element={
          <PublicRoute>
            <ContectUs />
          </PublicRoute>
          
        } />
        <Route path="/terms-of-use" element={
          <PublicRoute>
            <TermsOfUse />
          </PublicRoute>
        } />
        <Route path="/privacy-policy" element={
          <PublicRoute>
            <PrivacyPolicy />
          </PublicRoute>
        } />
        <Route path="/cookie-policy" element={
          <PublicRoute>
            <CookiePolicy />
          </PublicRoute>
        } />
        <Route path="/blogs" element={
          <PublicRoute>
            <AllBlogs />
          </PublicRoute>
        } />
        <Route path="/blog/:id" element={
          <PublicRoute>
            <Blog />
          </PublicRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/admin/HeroSection" replace />} />
          <Route path="/admin/HeroSection" element={
            <ProtectedRoute>
              <AdHearoSection />
            </ProtectedRoute>
          } />
          <Route path="/admin/HeroSlider" element={
            <ProtectedRoute>
              <AdHearoSlider />
            </ProtectedRoute>
          } />
          <Route path="/admin/HeroWallet" element={
            <ProtectedRoute>
              <AdWalletSection />
            </ProtectedRoute>
          } />
          <Route path="/admin/HeroOverview" element={
            <ProtectedRoute>
              <AdAboutSection />
            </ProtectedRoute>
          } />
          <Route path="/admin/HeroListedOn" element={
            <ProtectedRoute>
              <AdListedOn />
            </ProtectedRoute>
          } />
          <Route path="/admin/HeroEcosystem" element={
            <ProtectedRoute>
              <AdEcosystem />
            </ProtectedRoute>
          } />
          <Route path="/admin/HeroOurProducts" element={
            <ProtectedRoute>
              <AdOurProducts />
            </ProtectedRoute>
          } />
            <Route path="/admin/HeroRoadmap" element={
            <ProtectedRoute>
              <AdRoadmap />
            </ProtectedRoute>
          } />
            <Route path="/admin/HeroTokenomics" element={
            <ProtectedRoute>
              <AdTokenomics />
            </ProtectedRoute>
          } />
          <Route path="/admin/HeroEvents" element={
            <ProtectedRoute>
              <AdEvents />
            </ProtectedRoute>
          } />
          <Route path="/admin/HeroFaqs" element={
            <ProtectedRoute>
              <AdFaqs />
            </ProtectedRoute>
          } />
          <Route path="/admin/HeroNews" element={
            <ProtectedRoute>
              <AdNews />
            </ProtectedRoute>
          } />
          <Route path="/admin/HeroImportToken" element={
            <ProtectedRoute>
              <AdImportToken />
            </ProtectedRoute>
          } />
<Route path="/admin/HeroFooter" element={
            <ProtectedRoute>
              <AdminFooter />
            </ProtectedRoute>
          } />
          <Route path="/admin/Contact" element={
            <ProtectedRoute>
              <AdminContact />
            </ProtectedRoute>
          } />
<Route path="/admin/TermsAndConditions" element={
            <ProtectedRoute>
              <AdminTermsAndConditions />
            </ProtectedRoute>
          } />
          <Route path="/admin/PrivacyPolicy" element={
            <ProtectedRoute>
              <AdminPrivacyPolicy />
            </ProtectedRoute>
          } />
          <Route path="/admin/CookiePolicy" element={ 
            <ProtectedRoute>
              <AdminCookiePolicy />
            </ProtectedRoute>
          } />
          <Route path="/admin/Blogs" element={
            <ProtectedRoute>
              <AdBlogs />
            </ProtectedRoute>
          } />
              {/* <Route path="/privacy-policyy" element={
          <ProtectedRoute>
            <PrivacyPolicy />
          </ProtectedRoute>
        } /> */}
    
          {/* <Route path="*" element={<AdHearoSection />} /> */}
        </Route>
      </Routes>

  );
};

export default AppRoutes;
