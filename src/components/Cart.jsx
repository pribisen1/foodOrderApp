import { useContext } from "react";
import Modal from "./Modal";
import CartContext from "./store/CartContext";
import { currencyFormatter } from "../utils/formatting";
import Button from "./UI/Button";
import UserProgressContext from "./store/UserProgressContext";
import CartItem from "./CartItem";

function Cart(){
    const cartCtx = useContext(CartContext);
    const userCtx = useContext(UserProgressContext);
    const cartTotal = cartCtx.items.reduce(
        (totalPrice,item)=> { return (totalPrice + (item.quantity*item.price))},0
    );
    function handleCloseCart(){
        userCtx.hideCart();
    }
    function handleGoToCheckout(){
        userCtx.showCheckout();
    }
    return <Modal className="cart" open={userCtx.progress === 'cart'} onClose={userCtx.progress === 'cart' ? handleCloseCart : null}>
        <h2>Your Cart</h2>
        <ul>
            {cartCtx.items.map((item)=>{
                return <CartItem key={item.id} name={item.name} price={item.price} quantity={item.quantity} onDecrease={() => cartCtx.removeItem(id)} onIncrease={()=> cartCtx.addItem(item)}/>
            })}
        </ul>
        <p className="cart-total">
            {currencyFormatter.format(cartTotal)}
        </p>
        <p className="modal-actions">
            <Button onClick={handleCloseCart} textOnly>Close</Button>
            {cartCtx.items.length > 0 && (<Button onClick={handleGoToCheckout}>Go to Checkout</Button>)}
        </p>
    </Modal>
}
export default Cart;