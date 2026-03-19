import { createContext, useContext, useState } from 'react';
import { INITIAL_CLAIMS } from '../data/mockData';

const ClaimsContext = createContext();

export function ClaimsProvider({ children }) {
  const [claims, setClaims] = useState(INITIAL_CLAIMS);

  const addClaim = (claimData) => {
    const newClaim = {
      id: `CLM-${String(claims.length + 1).padStart(4, '0')}`,
      ...claimData,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      riskScore: Math.floor(Math.random() * 40) + 60,
      aiConfidence: Math.floor(Math.random() * 15) + 85,
    };
    setClaims((prev) => [newClaim, ...prev]);
    return newClaim;
  };

  const updateClaimStatus = (id, status) => {
    setClaims((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c))
    );
  };

  const getClaimById = (id) => claims.find((c) => c.id === id);

  const getUserClaims = (userId) => claims.filter((c) => c.userId === '1');

  return (
    <ClaimsContext.Provider value={{ claims, addClaim, updateClaimStatus, getClaimById, getUserClaims }}>
      {children}
    </ClaimsContext.Provider>
  );
}

export const useClaims = () => useContext(ClaimsContext);
