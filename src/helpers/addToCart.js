import {NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
//import { useSession } from  'react-use-session';


export function addToCart(e)
{
    let myCart = (localStorage.getItem('items_in_cart') !== 'undefined') && JSON.parse(localStorage.getItem('items_in_cart'));
    let isExist = myCart && myCart.findIndex(prod => prod._id === e._id);

    if (isExist === parseInt(-1)) {
        let stateCart = myCart && myCart;
        e = Object.assign({ 'quantity': 1 }, e)
        stateCart.push(e);
        // this.setState({
        //     cart_Array: stateCart
        // }, () => {
            createNotification('success', `Product ${e.name} is added in cart successfully.`);
            localStorage.setItem('items_in_cart', JSON.stringify(stateCart));
            return stateCart;
        // });
    } else {
        createNotification('info', 'This item is already added in cart.');
        return "This item is already added in cart.";
    }
    
}