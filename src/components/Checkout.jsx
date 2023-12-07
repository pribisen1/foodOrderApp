import { currencyFormatter } from "../utils/formatting";
import Modal from "./Modal";
import CartContext from "./store/CartContext";
import { useContext } from "react";
import Input from "./UI/Input";
import UserProgressContext from "./store/UserProgressContext";
import Button from "./UI/Button";
import useHttp from "./hooks/useHttp";
import Error from './UI/Error'

const requestConfig = {
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    }
}
function Checkout(){
    const cartCtx = useContext(CartContext);
    const userCtx = useContext(UserProgressContext);
    const {data,isLoading:isSending,error,sendRequest,clearData} =  useHttp('http://localhost:3000/orders',requestConfig);
    
    const cartTotal = cartCtx.items.reduce(
        (totalPrice,item)=> { return (totalPrice + (item.quantity*item.price))},0
    );
    function handleClose(){
        userCtx.hideCheckout();
    }
    function handleFinish(){
        userCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }
    function handleSubmit(event){
        event.preventDefault();
        const fd = new FormData(event.target);
        console.log(fd);
        console.log(fd.entries());
        const customerData = Object.fromEntries(fd.entries());

        sendRequest(
            JSON.stringify({
                order:{
                    items:cartCtx.items,
                    customer:customerData
                }
            })
        );
    }

    let actions = (
        <>
            <Button textOnly onClick={handleClose}>Close</Button>
            <Button>Submit Order</Button>
        </>
    );
    if(isSending){
        actions = <span>Sending order data...</span>;
    }
    if(data && !error){
        return (
            <Modal open={userCtx.progress === 'checkout' } onClose={handleFinish}>
                <h2>Success</h2>
                <p>Your order was submitted succesfully</p>
                <p>We will get back to you with more details via email within the next few minutes</p>
                <p className="modal-actions">
                    <Button onClick={handleFinish}>Okay</Button>
                </p>
            </Modal>
        );
    }
    return (
        <Modal open={userCtx.progress === 'checkout'}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
                <Input label='Full Name' type="text" id='name'  />
                <Input label='Email Address' type="email" id='email'  />
                <Input label='Street' type="text" id='street' />
                <div className="control-row">
                    <Input label='Postal Code' type="text" id='postal-code' />
                    <Input label='City' type="text" id='city' />
                </div>
                {error && <Error title='failed to submit order' message={error} />}
                <p className="modal-actions">
                    {actions}
                </p>
            </form>
        </Modal>
    );
}
export default Checkout;