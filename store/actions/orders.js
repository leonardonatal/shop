import Order from "../../models/order";

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const fetchOrders = () => {
    return async dispatch => {
        try {
            const response = await fetch('https://rn-shopp-c97a0-default-rtdb.firebaseio.com/orders/u1.json');
    
            if (!response.ok) {
            throw new Error('Something went wrong!');
            }
    
            const resData = await response.json();
            const loadedOrders = [];
    
            for (const key in resData) {
                loadedOrders.push(
                    new Order(
                        key,
                        resData[key].cartItems,
                        resData[key].totalAmount,
                        new Date(resData[key].date)
                    )
                );
            }
    
        dispatch({type: SET_ORDERS, orders: loadedOrders});
        } catch (err) {
            throw err;
        }
    };
};

export const addOrder = (cartItems, totalAmount) => {
    const date = new Date();
    return async dispatch => {
        const response = await fetch('https://rn-shopp-c97a0-default-rtdb.firebaseio.com/orders/u1.json', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            cartItems,
            totalAmount,
            date: date.toISOString()
        })
        });

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        const resData = await response.json();

        dispatch({
            type: ADD_ORDER, orderData: { id: resData.name, items: cartItems, amount: totalAmount, date: date }
        })
    }
};