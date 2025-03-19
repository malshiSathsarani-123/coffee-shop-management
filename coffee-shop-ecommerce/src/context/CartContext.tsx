import { createContext, useContext, useState, ReactNode } from "react";

interface Product {
  [x: string]: any;
  id: number;
  name: string;
  price: number;
  image: string;
  quantity?: number;
}

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      // Check if product already exists in cart
      const existingProductIndex = prevCart.findIndex(item => item.id === product.id);
      
      if (existingProductIndex !== -1) {
        // If product exists, update quantity
        const updatedCart = [...prevCart];
        const existingProduct = updatedCart[existingProductIndex];
        updatedCart[existingProductIndex] = {
          ...existingProduct,
          quantity: (existingProduct.quantity || 1) + 1
        };
        return updatedCart;
      } else {
        // If product doesn't exist, add it with quantity 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCart((prevCart) => 
      prevCart.map(item => 
        item.id === productId ? { ...item, quantity: quantity } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};