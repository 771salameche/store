import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext(null);

export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
export const CLEAR_CART = 'CLEAR_CART';

function cartReducer(state, action) {
  switch (action.type) {
    case ADD_ITEM: {
      const { productId, name, price, quantity = 1, imageUrl } = action.payload;
      const existing = state.find((i) => i.productId === productId);
      if (existing) {
        return state.map((i) =>
          i.productId === productId
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...state, { productId, name, price, quantity, imageUrl }];
    }
    case REMOVE_ITEM: {
      return state.filter((i) => i.productId !== action.payload.productId);
    }
    case UPDATE_QUANTITY: {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        return state.filter((i) => i.productId !== productId);
      }
      return state.map((i) =>
        i.productId === productId ? { ...i, quantity } : i
      );
    }
    case CLEAR_CART:
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, []);

  const addToCart = (product, quantity = 1) => {
    dispatch({
      type: ADD_ITEM,
      payload: {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity,
        imageUrl: product.imageUrl ?? null,
      },
    });
  };

  const removeItem = (productId) => {
    dispatch({ type: REMOVE_ITEM, payload: { productId } });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: UPDATE_QUANTITY, payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        totalPrice,
        addToCart,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
