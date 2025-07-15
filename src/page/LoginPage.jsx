import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAllHeaderContent, loginWithEmailAdminApi } from '../api/admin-api';
import bg3 from "../assets/coinbg3.png";
import Swal from 'sweetalert2';

export default function LoginPage() {
  const [payload, setPayload] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const navigate = useNavigate();


 const [logoUrl, setLogoUrl] = useState("");
  const fetchData = async () => {
    try {
      const res = await getAllHeaderContent();
      if (res?.data?.navLogo) {
        setLogoUrl(res.data.navLogo); 
      }
    } catch (err) {
      console.error("Error fetching logo:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const validate = () => {
    let formErrors = {};
    let isValid = true;
    const emailError = payload.email ? '' : 'Email is required';
    const passwordError = payload.password ? '' : 'Password is required';
    if (emailError) {
      formErrors.email = emailError;
      isValid = false;
    }
    if (passwordError) {
      formErrors.password = passwordError;
      isValid = false;
    }
    setErrors(formErrors);
    return isValid;
  };

  const handleAdminLogin = async () => {
    if (!validate()) return;
    if (loading) return;
    setLoading(true);
    try {
      // Call the real API
      const response = await loginWithEmailAdminApi({
        email: payload.email,
        password: payload.password,
      });
      // You can adjust the following lines as needed for your backend response
      localStorage.setItem('token', response.token);
      localStorage.setItem('role', 'Admin');
      await Swal.fire('Success!', 'Login Success!', 'success');
      navigate('/admin');
      window.location.reload();
    } catch (error) {
      await Swal.fire('Error!', error?.response?.data?.message || error.message || 'Login failed!', 'error');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#120540] via-[#4A088C] to-[#AEA7D9] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating orbs */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-[#4A088C]/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-[#120540]/30 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute bottom-32 left-40 w-40 h-40 bg-[#727FA6]/20 rounded-full blur-2xl animate-pulse"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234A088C' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`, opacity: 0.3}}></div>
        
        {/* Mouse-following gradient */}
        <div 
          className="absolute w-96 h-96 bg-gradient-radial from-[#AEA7D9]/30 to-transparent rounded-full blur-3xl pointer-events-none"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transition: 'all 0.3s ease-out'
          }}
        ></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Logo/Brand Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#4A088C] to-[#120540] rounded-2xl mb-4 shadow-2xl">
                <img src={logoUrl} alt="" />
            
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#ddbcfe] via-[#b2a6ff] to-[#AEA7D9] bg-clip-text text-transparent mb-2">
              XIOCOIN
            </h1>
            <p className="text-[#727FA6] text-sm">
              Your Digital Sandbox in the Web 3.0 Cosmos
            </p>
          </div>

          {/* Login Form */}
          <div className="backdrop-blur-xl bg-[#AEA7D9]/20 rounded-3xl p-8 shadow-2xl border border-[#433C73]/20 relative overflow-hidden">
            {/* Glassmorphism overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#4A088C]/10 via-transparent to-[#AEA7D9]/10 rounded-3xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl font-semibold text-[#ffffff] mb-6 text-center">
                Welcome Back
              </h2>

              <div className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <div className="text-sm font-medium text-[#ffffff] block">
                    Email Address
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#f9faff] w-5 h-5" />
                    <input
                      type="email"
                      value={payload.email}
                      onChange={e => setPayload({ ...payload, email: e.target.value })}
                      className={`w-full pl-12 pr-4 py-4 bg-[#AEA7D9]/20 border border-[#433C73]/20 rounded-2xl text-[#ffffff] placeholder-[#727FA6] focus:outline-none focus:border-[#4A088C] focus:ring-2 focus:ring-[#4A088C]/20 transition-all duration-300 backdrop-blur-sm ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="Enter your email"
                    />
                    {errors.email && <span className="text-red-400 text-xs absolute left-0 -bottom-5">{errors.email}</span>}
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <div className="text-sm font-medium text-[#ffffff] block">
                    Password
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#ffffff] w-5 h-5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={payload.password}
                      onChange={e => setPayload({ ...payload, password: e.target.value })}
                      className={`w-full pl-12 pr-12 py-4 bg-[#AEA7D9]/20 border border-[#433C73]/20 rounded-2xl text-[#ffffff] placeholder-[#727FA6] focus:outline-none focus:border-[#4A088C] focus:ring-2 focus:ring-[#4A088C]/20 transition-all duration-300 backdrop-blur-sm ${errors.password ? 'border-red-500' : ''}`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#727FA6] hover:text-[#4A088C] transition-colors duration-200"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                    {errors.password && <span className="text-red-400 text-xs absolute left-0 -bottom-5">{errors.password}</span>}
                  </div>
                </div>

                {/* Remember & Forgot */}
                {/* <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-[#433C73]">
                    <input
                      type="checkbox"
                      className="mr-2 rounded border-[#727FA6] bg-[#AEA7D9]/20 text-[#4A088C] focus:ring-[#4A088C] focus:ring-offset-0"
                    />
                    Remember me
                  </div>
                  <button className="text-[#4A088C] hover:text-[#433C73] transition-colors duration-200">
                    Forgot password?
                  </button>
                </div> */}

                {/* Submit Button */}
                <button
                  onClick={handleAdminLogin}
                  disabled={loading}
                  className="w-full py-4 px-6 bg-gradient-to-r from-[#4A088C] to-[#120540] hover:from-[#433C73] hover:to-[#727FA6] disabled:from-[#4A088C]/50 disabled:to-[#120540]/50 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl shadow-lg disabled:scale-100 flex items-center justify-center space-x-2 group"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-2 border-[#727FA6]/30 border-t-[#4A088C] rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </>
                  )}
                </button>
            
              </div>

            </div>
          </div>

        
        </div>
      </div>
    </div>
  );
}