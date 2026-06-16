import { createContext, useContext, useState, useCallback } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [toastMsg, setToastMsg] = useState('')
  const [toastVisible, setToastVisible] = useState(false)

  const showToast = useCallback((msg) => {
    setToastMsg(msg)
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 3000)
  }, [])

  const addToCart = useCallback((flavor, count, price) => {
    setCart(prev => {
      const existing = prev.find(i => i.flavor === flavor && i.count === count)
      if (existing) {
        return prev.map(i =>
          i.flavor === flavor && i.count === count
            ? { ...i, qty: i.qty + 1 }
            : i
        )
      }
      return [...prev, { flavor, count, price, qty: 1 }]
    })
    showToast(`✓  ${count}-pack ${flavor} added to cart`)
  }, [showToast])

  const updateQty = useCallback((flavor, count, delta) => {
    setCart(prev =>
      prev
        .map(i => i.flavor === flavor && i.count === count
          ? { ...i, qty: i.qty + delta }
          : i
        )
        .filter(i => i.qty > 0)
    )
  }, [])

  const removeItem = useCallback((flavor, count) => {
    setCart(prev => prev.filter(i => !(i.flavor === flavor && i.count === count)))
  }, [])

  const cartCount = cart.reduce((a, i) => a + i.qty, 0)
  const cartTotal = cart.reduce((a, i) => a + i.price * i.qty, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQty, removeItem, cartCount, cartTotal }}>
      {children}
      <div className={`toast${toastVisible ? ' show' : ''}`}>{toastMsg}</div>
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
