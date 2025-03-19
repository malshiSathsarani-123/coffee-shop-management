import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cart } = useCart();

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.length > 0 ? (
        cart.map((item, index) => (
          <div key={index} className="cart-item">
            <img src={`http://localhost:5000/${item.image}`} alt={item.name} width="100" />
            <h4>{item.name}</h4>
            <p>RS. {item.price.toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default CartPage;
