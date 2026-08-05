import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useAuth } from '../../auth/AuthContext';

interface CartContextValue {
  serviceIds: string[];
  addToCart: (serviceId: string) => void;
  removeFromCart: (serviceId: string) => void;
  clearCart: () => void;
  isInCart: (serviceId: string) => boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

function storageKey(schoolId: string, uid: string) {
  return `oriesup:cart:${schoolId}:${uid}`;
}

/** Client-side cart, scoped per school+student and persisted in localStorage — no backend entity needed. */
export function CartProvider({ children }: { children: ReactNode }) {
  const { schoolId, user } = useAuth();
  const [serviceIds, setServiceIds] = useState<string[]>([]);

  useEffect(() => {
    if (!schoolId || !user) {
      setServiceIds([]);
      return;
    }
    const stored = localStorage.getItem(storageKey(schoolId, user.uid));
    setServiceIds(stored ? JSON.parse(stored) : []);
  }, [schoolId, user]);

  function persist(next: string[]) {
    setServiceIds(next);
    if (schoolId && user) {
      localStorage.setItem(storageKey(schoolId, user.uid), JSON.stringify(next));
    }
  }

  const value: CartContextValue = {
    serviceIds,
    addToCart: (serviceId) => {
      if (!serviceIds.includes(serviceId)) persist([...serviceIds, serviceId]);
    },
    removeFromCart: (serviceId) => persist(serviceIds.filter((id) => id !== serviceId)),
    clearCart: () => persist([]),
    isInCart: (serviceId) => serviceIds.includes(serviceId),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
