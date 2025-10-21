'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function BookDemo() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    companyName: '',
    companyHeadcount: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/book-demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setIsSubmitted(true);
      } else {
        alert('Error submitting form. Please try again.');
      }
    } catch (error) {
      alert('Error submitting form. Please try again.');
    }
  };

  return (
    <>
      <style jsx global>{`
        @font-face {
          font-family: 'CustomFont';
          src: url('/fonts/_Xms-HUzqDCFdgfMm4S9DQ.woff2') format('woff2');
          font-weight: 400;
          font-style: normal;
        }
        @font-face {
          font-family: 'CustomFont';
          src: url('/fonts/vQyevYAyHtARFwPqUzQGpnDs.woff2') format('woff2');
          font-weight: 600;
          font-style: normal;
        }
        @font-face {
          font-family: 'CustomFont';
          src: url('/fonts/7AHDUZ4A7LFLVFUIFSARGIWCRQJHISQP.woff2') format('woff2');
          font-weight: 900;
          font-style: normal;
        }
        body {
          font-family: 'CustomFont', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        h1, h2, h3, h4, h5, h6 {
          font-weight: 900 !important;
          line-height: 1.15 !important;
          letter-spacing: -0.02em !important;
        }
        a, button {
          outline: none !important;
        }
        a:focus, button:focus {
          outline: none !important;
          box-shadow: none !important;
        }
        
        /* Mobile First Media Queries */
        @media (max-width: 768px) {
          .mobile-nav {
            position: fixed;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100vh;
            background: rgba(0, 0, 0, 0.95);
            backdrop-filter: blur(10px);
            transition: left 0.3s ease;
            z-index: 50;
          }
          .mobile-nav.open {
            left: 0;
          }
        }
        
        @media (max-width: 640px) {
          .hero-title {
            font-size: 2rem;
            line-height: 1.2;
          }
          .section-title {
            font-size: 1.75rem;
            line-height: 1.3;
          }
          .feature-grid {
            display: flex;
            flex-direction: column;
            gap: 2rem;
          }
        }
      `}</style>
      
      <div className="min-h-screen bg-black text-white w-full overflow-x-hidden" style={{ fontFamily: 'CustomFont, sans-serif', margin: 0, padding: 0 }}>
        {/* Navbar */}
        <nav className="relative z-10 flex items-center justify-between px-4 sm:px-8 lg:px-20 py-6 w-full">
          <div className="flex items-center gap-3">
            <Image src="/Images/F2.png" alt="Logo" width={32} height={32} className="rounded-md" />
            <div className="text-xl sm:text-2xl font-extrabold">Feeta AI</div>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <button onClick={() => router.push('/modernhome')} className="hover:text-[#4C3BCF] transition-colors text-sm lg:text-base focus:outline-none">Home</button>
            <a href="#" className="hover:text-[#4C3BCF] transition-colors text-sm lg:text-base focus:outline-none">About</a>
            <a href="#" className="hover:text-[#4C3BCF] transition-colors text-sm lg:text-base focus:outline-none">Blog</a>
            <a href="#" className="hover:text-[#4C3BCF] transition-colors text-sm lg:text-base focus:outline-none">Contact</a>
            <button onClick={() => router.push('/book-demo')} className="bg-[#4C3BCF] hover:bg-[#4C3BCF]/80 px-4 lg:px-6 py-2 rounded-lg transition-colors text-sm lg:text-base focus:outline-none">
              Book a call
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 focus:outline-none" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
        
        {/* Mobile Menu */}
        <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''} md:hidden`}>
          <div className="flex flex-col items-center justify-center h-full gap-8">
            <button onClick={() => { router.push('/modernhome'); setMobileMenuOpen(false); }} className="text-xl hover:text-[#4C3BCF] transition-colors">Home</button>
            <a href="#" className="text-xl hover:text-[#4C3BCF] transition-colors">About</a>
            <a href="#" className="text-xl hover:text-[#4C3BCF] transition-colors">Blog</a>
            <a href="#" className="text-xl hover:text-[#4C3BCF] transition-colors">Contact</a>
            <button onClick={() => { router.push('/book-demo'); setMobileMenuOpen(false); }} className="bg-[#4C3BCF] hover:bg-[#4C3BCF]/80 px-8 py-3 rounded-lg transition-colors text-lg">
              Book a call
            </button>
          </div>
        </div>

        {/* Main Content */}
        <main className="relative flex flex-col items-center justify-center px-4 sm:px-8 py-10 sm:py-20 w-full">
          {/* Purple Glow Effect */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[150px]" style={{ backgroundColor: 'rgba(0, 11, 88, 0.3)' }} />
          
          <div className="relative z-10 w-full max-w-md">
            {/* Back Button */}
            <button
              onClick={() => router.push('/modernhome')}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 focus:outline-none"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to Home</span>
            </button>
            
            {/* Form Container */}
            <div className="bg-gradient-to-br from-[#4C3BCF]/10 via-black/50 to-black/50 border border-gray-800/30 rounded-2xl p-4 sm:p-8 pb-8 sm:pb-12 backdrop-blur-sm">
              {!isSubmitted ? (
                <>
                  <h1 className="text-2xl sm:text-4xl font-bold text-center mb-8">Book a Demo</h1>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#4C3BCF] focus:ring-1 focus:ring-[#4C3BCF] transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#4C3BCF] focus:ring-1 focus:ring-[#4C3BCF] transition-colors"
                    placeholder="Enter your email address"
                  />
                </div>

                {/* Company Name Field */}
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-300 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#4C3BCF] focus:ring-1 focus:ring-[#4C3BCF] transition-colors"
                    placeholder="Enter your company name"
                  />
                </div>

                {/* Company Headcount Field */}
                <div>
                  <label htmlFor="companyHeadcount" className="block text-sm font-medium text-gray-300 mb-2">
                    Company Headcount
                  </label>
                  <select
                    id="companyHeadcount"
                    name="companyHeadcount"
                    value={formData.companyHeadcount}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#4C3BCF] focus:ring-1 focus:ring-[#4C3BCF] transition-colors"
                  >
                    <option value="">Select company size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="500+">500+ employees</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#4C3BCF] hover:bg-[#4C3BCF]/80 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#4C3BCF]/30"
                >
                  Confirm
                </button>
                  </form>
                </>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-bold mb-4">Demo Booked Successfully!</h1>
                  <p className="text-gray-400 text-base sm:text-lg mb-6">We will contact you shortly.</p>
                  <button
                    onClick={() => router.push('/modernhome')}
                    className="bg-[#4C3BCF] hover:bg-[#4C3BCF]/80 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                  >
                    Back to Home
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
        
        {/* Bottom Black Section */}
        <div className="bg-black h-32 w-full"></div>
      </div>
    </>
  );
}
