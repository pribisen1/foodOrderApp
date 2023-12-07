import logoImg from '../assets/logo.jpg';
import Button from './UI/Button';
import CartContext from './store/CartContext';
import { useContext } from 'react';
import UserProgressContext from './store/UserProgressContext';
function Header(){
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems,items)=>{
        return totalNumberOfItems + items.quantity;
    },0);

    function handleShowCart(){
        userProgressCtx.showCart();
    }
    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt='A restaurant'/>
                <h2>ReactFood</h2>
            </div>
            <nav>
                <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
            </nav>
        </header>
    );
}
export default Header;  