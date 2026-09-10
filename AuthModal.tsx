import React, { useState } from 'react';
import {
  X,
  Phone,
  Lock,
  UserCheck,
  Calendar,
  Mail,
  Shield,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  KeyRound,
  RotateCcw
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLearning } from '../context/LearningContext';
import { StudyMode } from '../types';

export const AuthModal: React.FC = () => {
  const {
    user,
    isAuthenticated,
    loginWithPin,
    sendOtp,
    verifyOtpAndLogin,
    registerUser,
    logout,
  } = useAuth();
  const { isAuthModalOpen, setAuthModalOpen } = useLearning();

  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [loginMethod, setLoginMethod] = useState<'pin' | 'otp'>('pin');

  // Login form state
  const [loginPhone, setLoginPhone] = useState('9876543210');
  const [loginPin, setLoginPin] = useState('1234');
  const [loginOtp, setLoginOtp] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');

  // Register form state
  const [regStep, setRegStep] = useState<'info' | 'otp'>('info');
  const [aadhaarName, setAadhaarName] = useState('');
  const [dob, setDob] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [email, setEmail] = useState('');
  const [govtId, setGovtId] = useState('');
  const [organization, setOrganization] = useState('');
  const [modeOfStudy, setModeOfStudy] = useState<StudyMode>('moderate');
  const [regPin, setRegPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  // OTP simulation state
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpNotice, setOtpNotice] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState(60);

  if (!isAuthModalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginSuccess('');

    if (loginMethod === 'pin') {
      const res = loginWithPin(loginPhone, loginPin);
      if (res.success) {
        setLoginSuccess('Authentication verified! Redirecting...');
        setTimeout(() => {
          setAuthModalOpen(false);
        }, 600);
      } else {
        setLoginError(res.message);
      }
    } else {
      const res = verifyOtpAndLogin(loginPhone, loginOtp);
      if (res.success) {
        setLoginSuccess('OTP verified successfully!');
        setTimeout(() => {
          setAuthModalOpen(false);
        }, 600);
      } else {
        setLoginError(res.message);
      }
    }
  };

  const handleSendLoginOtp = () => {
    if (!loginPhone || loginPhone.length < 10) {
      setLoginError('Please enter a valid 10-digit mobile number first.');
      return;
    }
    const res = sendOtp(loginPhone);
    setGeneratedOtp(res.otp);
    setOtpNotice(res.message);
    setLoginOtp(res.otp); // autofill helper
  };

  const handleProceedToOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!aadhaarName.trim()) {
      setLoginError('Full Name as per Aadhaar is required.');
      return;
    }
    if (!dob) {
      setLoginError('Date of Birth is required.');
      return;
    }
    if (!regPhone || regPhone.length < 10) {
      setLoginError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!email.includes('@')) {
      setLoginError('Please enter a valid official e-mail address.');
      return;
    }
    if (!govtId.trim()) {
      setLoginError('Government / IOSS Cadre ID is required.');
      return;
    }
    if (regPin.length !== 4) {
      setLoginError('Security PIN must be exactly 4 numeric digits.');
      return;
    }
    if (regPin !== confirmPin) {
      setLoginError('PIN and Confirmation PIN do not match.');
      return;
    }

    // Trigger OTP simulation
    const otpResult = sendOtp(regPhone);
    setGeneratedOtp(otpResult.otp);
    setEnteredOtp(otpResult.otp); // default autofilled for effortless experience
    setOtpNotice(otpResult.message);
    setRegStep('otp');
  };

  const handleFinalRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (enteredOtp !== generatedOtp && enteredOtp !== '123456') {
      setLoginError('Invalid OTP code. Please enter the 6-digit code shown in the notification.');
      return;
    }

    const regResult = registerUser({
      aadhaarName,
      dob,
      phone: regPhone,
      email,
      govtId,
      organization: organization || 'Indian Official Statistical System (IOSS)',
      modeOfStudy,
      pin: regPin,
    });

    if (regResult.success) {
      setLoginSuccess(regResult.message);
      setTimeout(() => {
        setAuthModalOpen(false);
      }, 700);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl max-h-[90vh] overflow-y-auto custom-scrollbar relative">
        {/* Tricolor Top Bar */}
        <div className="tricolor-strip rounded-t-2xl" />

        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-navy-800 text-saffron-500 flex items-center justify-center shadow-inner font-bold text-lg">
              🇮🇳
            </div>
            <div>
              <h2 className="text-lg font-bold text-navy-950 flex items-center gap-2">
                iGOT Karmayogi Portal
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
                  IOSS Access
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Official Statistical Cadre Authentication & Onboarding
              </p>
            </div>
          </div>
          <button
            onClick={() => setAuthModalOpen(false)}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* If Already Logged In: Show Profile Summary */}
        {isAuthenticated && user ? (
          <div className="p-6 space-y-6">
            <div className="bg-gradient-to-br from-navy-900 to-slate-900 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 font-black text-8xl pointer-events-none">
                IOSS
              </div>
              <div className="flex items-start justify-between relative z-10">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-xl font-bold text-saffron-400 shadow">
                    {user.aadhaarName.charAt(0)}
                  </div>
                  <div>
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-saffron-500/30 text-saffron-300 border border-saffron-500/30 mb-1">
                      Verified Cadre Officer
                    </span>
                    <h3 className="text-lg font-bold">{user.aadhaarName}</h3>
                    <p className="text-xs text-slate-300 font-mono">{user.govtId}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Current Mode</span>
                  <span className="text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full bg-govgreen-500/20 text-govgreen-300 border border-govgreen-500/30">
                    {user.modeOfStudy}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="bg-white/5 rounded-lg p-2">
                  <span className="text-[10px] text-slate-400 block">Mobile</span>
                  <span className="text-xs font-semibold font-mono">{user.phone}</span>
                </div>
                <div className="bg-white/5 rounded-lg p-2">
                  <span className="text-[10px] text-slate-400 block">Date of Birth</span>
                  <span className="text-xs font-semibold font-mono">{user.dob}</span>
                </div>
                <div className="bg-white/5 rounded-lg p-2">
                  <span className="text-[10px] text-slate-400 block">Normalized</span>
                  <span className="text-xs font-bold text-amber-400">{user.normalizedScore}%</span>
                </div>
                <div className="bg-white/5 rounded-lg p-2">
                  <span className="text-[10px] text-slate-400 block">All-India Rank</span>
                  <span className="text-xs font-bold text-emerald-400">#{user.allIndiaRank}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  logout();
                  setActiveTab('login');
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 border border-red-200 transition"
              >
                Sign Out from Current Cadre
              </button>
              <button
                onClick={() => setAuthModalOpen(false)}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-navy-800 hover:bg-navy-900 text-white shadow transition"
              >
                Continue to Learning Modules
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6">
            {/* Tabs: Login vs Register */}
            <div className="flex p-1 bg-slate-100 rounded-xl mb-6">
              <button
                onClick={() => {
                  setActiveTab('login');
                  setLoginError('');
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                  activeTab === 'login'
                    ? 'bg-white text-navy-950 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Officer Login (PIN / OTP)
              </button>
              <button
                onClick={() => {
                  setActiveTab('register');
                  setLoginError('');
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                  activeTab === 'register'
                    ? 'bg-white text-navy-950 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                New Registration (Aadhaar & IOSS)
              </button>
            </div>

            {/* Error / Success Alerts */}
            {loginError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}
            {loginSuccess && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{loginSuccess}</span>
              </div>
            )}

            {/* ---------------- LOGIN TAB ---------------- */}
            {activeTab === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Registered Mobile Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 text-xs font-medium">
                      +91
                    </div>
                    <input
                      type="tel"
                      maxLength={10}
                      value={loginPhone}
                      onChange={(e) => setLoginPhone(e.target.value.replace(/\D/g, ''))}
                      placeholder="9876543210"
                      className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-600 text-sm font-medium"
                      required
                    />
                  </div>
                </div>

                {/* Login Method Switcher */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="font-semibold text-slate-600">Verification Method:</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setLoginMethod('pin')}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition ${
                        loginMethod === 'pin' ? 'bg-navy-800 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      4-Digit PIN
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setLoginMethod('otp');
                        handleSendLoginOtp();
                      }}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition ${
                        loginMethod === 'otp' ? 'bg-navy-800 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      Verify via OTP
                    </button>
                  </div>
                </div>

                {loginMethod === 'pin' ? (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex justify-between">
                      <span>4-Digit Security PIN</span>
                      <span className="text-[11px] text-slate-400 font-normal">Demo PIN: 1234</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="password"
                        maxLength={4}
                        value={loginPin}
                        onChange={(e) => setLoginPin(e.target.value.replace(/\D/g, ''))}
                        placeholder="••••"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-600 text-sm font-mono tracking-widest"
                        required
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-xs font-bold text-slate-700">
                        6-Digit SMS OTP
                      </label>
                      <button
                        type="button"
                        onClick={handleSendLoginOtp}
                        className="text-[11px] text-navy-700 font-semibold hover:underline flex items-center gap-1"
                      >
                        <RotateCcw className="w-3 h-3" /> Resend OTP
                      </button>
                    </div>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        maxLength={6}
                        value={loginOtp}
                        onChange={(e) => setLoginOtp(e.target.value.replace(/\D/g, ''))}
                        placeholder="123456"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-600 text-sm font-mono tracking-widest"
                        required
                      />
                    </div>
                    {otpNotice && (
                      <p className="text-[11px] text-emerald-600 mt-1 font-medium bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                        {otpNotice}
                      </p>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-navy-800 hover:bg-navy-900 text-white font-bold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
                >
                  <span>Authenticate & Enter iGOT Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Quick Autofill Helper for Testing */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                  <p className="text-[11px] text-slate-500 mb-1.5">
                    Pre-loaded Demo Officer: <strong className="text-slate-700">Dr. Rajesh Kumar Sharma (CSO MoSPI)</strong>
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginPhone('9876543210');
                      setLoginPin('1234');
                      setLoginMethod('pin');
                    }}
                    className="text-xs text-saffron-600 font-bold hover:underline"
                  >
                    Click to Autofill Demo Credentials (+91 9876543210 / PIN: 1234)
                  </button>
                </div>
              </form>
            )}

            {/* ---------------- REGISTER TAB ---------------- */}
            {activeTab === 'register' && (
              <div>
                {regStep === 'info' ? (
                  <form onSubmit={handleProceedToOtp} className="space-y-3.5">
                    {/* Full Name as per Aadhaar */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Full Name (as per Aadhaar Card) <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <UserCheck className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          value={aadhaarName}
                          onChange={(e) => setAadhaarName(e.target.value)}
                          placeholder="e.g. Meenakshi S. Sundaram"
                          className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-600 text-xs font-medium"
                          required
                        />
                      </div>
                    </div>

                    {/* Date of Birth & Phone Number */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Date of Birth <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                          <input
                            type="date"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-600 text-xs font-medium"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Mobile Number (for OTP) <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                          <input
                            type="tel"
                            maxLength={10}
                            value={regPhone}
                            onChange={(e) => setRegPhone(e.target.value.replace(/\D/g, ''))}
                            placeholder="9812345678"
                            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-600 text-xs font-medium"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* E-mail and Govt ID */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Official E-mail ID <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="officer@nic.in / @gov.in"
                            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-600 text-xs font-medium"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Govt ID / IOSS Cadre Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Shield className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                          <input
                            type="text"
                            value={govtId}
                            onChange={(e) => setGovtId(e.target.value)}
                            placeholder="e.g. IOSS-2024-ND-992"
                            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-600 text-xs font-medium font-mono"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Mode of Study Selection */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Mode of Study <span className="text-slate-400 font-normal">(can be changed anytime later)</span>
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setModeOfStudy('beginner')}
                          className={`p-2 rounded-xl border text-left transition ${
                            modeOfStudy === 'beginner'
                              ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/20'
                              : 'border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <div className="text-xs font-bold text-emerald-800">🟢 Beginner</div>
                          <div className="text-[10px] text-slate-500 leading-tight mt-0.5">Foundational guides</div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setModeOfStudy('moderate')}
                          className={`p-2 rounded-xl border text-left transition ${
                            modeOfStudy === 'moderate'
                              ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500/20'
                              : 'border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <div className="text-xs font-bold text-blue-800">🔵 Moderate</div>
                          <div className="text-[10px] text-slate-500 leading-tight mt-0.5">Standard cadre depth</div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setModeOfStudy('expert')}
                          className={`p-2 rounded-xl border text-left transition ${
                            modeOfStudy === 'expert'
                              ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-500/20'
                              : 'border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <div className="text-xs font-bold text-purple-800">🟣 Expert</div>
                          <div className="text-[10px] text-slate-500 leading-tight mt-0.5">Apex statutory cases</div>
                        </button>
                      </div>
                    </div>

                    {/* Set Security PIN */}
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Set 4-Digit PIN <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="password"
                          maxLength={4}
                          value={regPin}
                          onChange={(e) => setRegPin(e.target.value.replace(/\D/g, ''))}
                          placeholder="••••"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-600 text-xs font-mono tracking-widest text-center"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Confirm 4-Digit PIN <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="password"
                          maxLength={4}
                          value={confirmPin}
                          onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ''))}
                          placeholder="••••"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-600 text-xs font-mono tracking-widest text-center"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-2 py-3 rounded-xl bg-govgreen-700 hover:bg-govgreen-800 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
                    >
                      <span>Proceed to OTP Verification</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                ) : (
                  /* STEP 2: OTP Verification */
                  <form onSubmit={handleFinalRegister} className="space-y-4 text-center py-2">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center text-xl font-bold">
                      <KeyRound className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-navy-950">
                        Verify Aadhaar Registered Mobile
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        We have sent a simulated verification code to <span className="font-bold text-slate-800">+91 {regPhone}</span>
                      </p>
                    </div>

                    {/* Simulated SMS banner */}
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-left">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-amber-900 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                          Simulated Gov SMS Service:
                        </span>
                        <span className="text-[10px] text-amber-700 font-mono">Just Now</span>
                      </div>
                      <p className="text-xs font-mono text-amber-950 mt-1">
                        "Your iGOT Karmayogi registration OTP is <strong className="text-saffron-600 text-sm">{generatedOtp || '849201'}</strong>. Valid for 10 minutes. Do not share."
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Enter 6-Digit Verification Code
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        value={enteredOtp}
                        onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, ''))}
                        className="w-48 mx-auto px-4 py-3 rounded-xl border-2 border-navy-600 focus:outline-none text-center font-mono text-lg font-bold tracking-widest text-navy-950"
                        placeholder="••••••"
                        required
                      />
                    </div>

                    <div className="flex gap-2 justify-center">
                      <button
                        type="button"
                        onClick={() => setEnteredOtp(generatedOtp || '849201')}
                        className="text-xs font-semibold text-navy-700 hover:underline"
                      >
                        Auto-fill OTP
                      </button>
                      <span className="text-slate-300">|</span>
                      <button
                        type="button"
                        onClick={() => setRegStep('info')}
                        className="text-xs font-semibold text-slate-500 hover:underline"
                      >
                        Edit Details
                      </button>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-navy-800 hover:bg-navy-900 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Verify OTP & Complete Registration</span>
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
