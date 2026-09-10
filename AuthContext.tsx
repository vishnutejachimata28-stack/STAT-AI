import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, StudyMode, DifficultyLevel } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  loginWithPin: (phone: string, pin: string) => { success: boolean; message: string };
  sendOtp: (phone: string) => { success: boolean; otp: string; message: string };
  verifyOtpAndLogin: (phone: string, otp: string) => { success: boolean; message: string };
  registerUser: (userData: Omit<UserProfile, 'id' | 'registeredAt' | 'baselineDifficulty' | 'totalScore' | 'normalizedScore' | 'allIndiaRank' | 'percentile'>) => { success: boolean; message: string };
  updateStudyMode: (newMode: StudyMode) => void;
  updateUserBaseline: (newDifficulty: DifficultyLevel) => void;
  updateUserScores: (newNormalizedScore: number, allIndiaRank: number, percentile: number) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER: UserProfile = {
  id: 'user-ioss-001',
  aadhaarName: 'Dr. Rajesh Kumar Sharma',
  dob: '1992-08-15',
  phone: '9876543210',
  email: 'rajesh.sharma@gov.in',
  govtId: 'IOSS-2024-ISS-089',
  organization: 'Central Statistics Office, MoSPI (New Delhi)',
  modeOfStudy: 'moderate',
  pin: '1234',
  registeredAt: '2024-01-10T10:00:00.000Z',
  baselineDifficulty: 'moderate',
  totalScore: 780,
  normalizedScore: 84.5,
  allIndiaRank: 412,
  percentile: 98.4,
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('igot_user_pro');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed parsing stored user', e);
      }
    }
    // Default demo profile for seamless experience
    return DEMO_USER;
  });

  const [activeOtps, setActiveOtps] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user) {
      localStorage.setItem('igot_user_profile', JSON.stringify(user));
    } else {
      localStorage.removeItem('igot_user_profile');
    }
  }, [user]);

  const sendOtp = (phone: string) => {
    // Generate a clean 6-digit mock OTP
    const cleanPhone = phone.replace(/\D/g, '');
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setActiveOtps((prev) => ({ ...prev, [cleanPhone]: generatedOtp }));
    return {
      success: true,
      otp: generatedOtp,
      message: `OTP sent to +91 ${cleanPhone}. (Verification Code: ${generatedOtp})`,
    };
  };

  const verifyOtpAndLogin = (phone: string, enteredOtp: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    const validOtp = activeOtps[cleanPhone] || '123456'; // fallback default for testing
    if (enteredOtp === validOtp || enteredOtp === '123456') {
      // If user exists, log in
      if (user && user.phone === cleanPhone) {
        return { success: true, message: 'OTP verified successfully.' };
      }
      return { success: true, message: 'OTP verified. Please complete registration.' };
    }
    return { success: false, message: 'Invalid OTP. Please check the code and retry.' };
  };

  const loginWithPin = (phone: string, enteredPin: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    if (!user) {
      // If demo phone matches
      if (cleanPhone === DEMO_USER.phone && enteredPin === DEMO_USER.pin) {
        setUser(DEMO_USER);
        return { success: true, message: 'Login successful' };
      }
      return { success: false, message: 'No registered user found with this mobile number. Please register.' };
    }
    if (user.phone === cleanPhone && user.pin === enteredPin) {
      return { success: true, message: 'Login successful' };
    }
    return { success: false, message: 'Incorrect mobile number or 4-digit PIN.' };
  };

  const registerUser = (userData: Omit<UserProfile, 'id' | 'registeredAt' | 'baselineDifficulty' | 'totalScore' | 'normalizedScore' | 'allIndiaRank' | 'percentile'>) => {
    const newUser: UserProfile = {
      ...userData,
      id: `user-ioss-${Date.now()}`,
      registeredAt: new Date().toISOString(),
      baselineDifficulty: userData.modeOfStudy === 'expert' ? 'hard' : userData.modeOfStudy === 'beginner' ? 'easy' : 'moderate',
      totalScore: 100,
      normalizedScore: 50.0,
      allIndiaRank: 12450,
      percentile: 65.0,
    };
    setUser(newUser);
    return { success: true, message: 'Registration completed successfully! Welcome to iGOT Karmayogi.' };
  };

  const updateStudyMode = (newMode: StudyMode) => {
    if (!user) return;
    const updated = { ...user, modeOfStudy: newMode };
    setUser(updated);
  };

  const updateUserBaseline = (newDifficulty: DifficultyLevel) => {
    if (!user) return;
    const updated = { ...user, baselineDifficulty: newDifficulty };
    setUser(updated);
  };

  const updateUserScores = (newNormalizedScore: number, allIndiaRank: number, percentile: number) => {
    if (!user) return;
    const updated = {
      ...user,
      normalizedScore: newNormalizedScore,
      allIndiaRank,
      percentile,
    };
    setUser(updated);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loginWithPin,
        sendOtp,
        verifyOtpAndLogin,
        registerUser,
        updateStudyMode,
        updateUserBaseline,
        updateUserScores,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
