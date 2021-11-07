import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { userRequest } from '../requestMethods';


const Success = () => {

    const location = useLocation();
    console.log( location )

    const data = location.state.stripeData;     // Recuperamos del estado del pathname los datos de facturación de stripe
    const cart = location.state.cart;           // También los datos del carrito, productosm cantidad y total a pagar
    
    const currentUser = useSelector((state) => state.user.currentUser); // De la store buscamos el usuario que esta logueado
    const [orderId, setOrderId] = useState(null);                       // Estado para la orderId

    useEffect(() => {
    const createOrder = async () => {                       // Crearemos una pedido a la tienda cada vez que el carrito o los datos de stripe cambien
      try {
        const res = await userRequest.post("/orders", {     // Petición al backend para hacer un pedido
          userId: currentUser._id,                          // Id del usuario
          products: cart.products.map((item) => ({          // Mapeado de los productos del carrito
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: cart.total,                               // Total a pagar
          address: data.billing_details.address,            // Dirección de facturación
        });
        setOrderId(res.data._id);                           // Establecemos el estado de la orden
      } catch {}
    };
    data && createOrder();                                  // Si hay data de stripe se ejecute el useEffect
  }, [cart, data, currentUser]);

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}>
            {orderId
                ? `Order has been created successfully. Your order number is ${orderId}`
                : `Successfull. Your order is being prepared...`}
            <Link to={'/'}>
                <button 
                    style={{ padding: 10, marginTop: 20 }}
                >
                    Go to Homepage
                </button>
            </Link>
        </div>
    );
};

export default Success
