import { createContext, useContext, useReducer, useEffect } from "react";

export const CartContext = createContext();

const initialState = {
  cart: [],
};

function cartReducer(state, action) {
  switch (action.type) {
    case "INIT_CART":
      return { ...state, cart: action.payload };

    case "ADD_TO_CART":
      const existing = state.cart.find((item) => item.id === action.payload.id);
      if (existing) {
        const updated = state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return { ...state, cart: updated };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case "CLEAR_CART":
      return { ...state, cart: [] };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // ✅ Initial load from localStorage
  useEffect(() => {
    const localData = localStorage.getItem("cart");
    if (localData) {
      dispatch({ type: "INIT_CART", payload: JSON.parse(localData) });
    }
  }, []);

  // ✅ Save to localStorage when cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  // ✅ Realtime sync between tabs
  useEffect(() => {
    const syncCart = (e) => {
      if (e.key === "cart") {
        dispatch({
          type: "INIT_CART",
          payload: JSON.parse(e.newValue) || [],
        });
      }
    };
    window.addEventListener("storage", syncCart);

    return () => {
      window.removeEventListener("storage", syncCart);
    };
  }, []);

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

