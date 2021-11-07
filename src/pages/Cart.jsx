import { Add, Remove } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { mobile } from '../responsive'
//yarn add react-stripe-checkout 
import StripeCheckout from 'react-stripe-checkout';
import { userRequest } from "../requestMethods";
import { useHistory } from "react-router";
import { v4 as uuidv4 } from 'uuid';

const KEY = process.env.REACT_APP_STRIPE; // Key pública del stripe

const Container = styled.div``
const Wrapper = styled.div`
    padding: 20px;
    ${mobile({ padding: "10px" })}
`
const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`
const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
`
const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${ props => props.type === "filled" && "none" };
    background-color: ${ props => props.type === "filled" ? "black" : "transparent" };
    color: ${ props => props.type === "filled" && "white" }
`
const TopTexts = styled.div`
    ${mobile({ display: "none" })}
`
const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0 10px;
`

const Bottom = styled.div`
    display: flex;
    justify-content: center;
    ${mobile({ flexDirection: "column" })}
`
const Info = styled.div`
    flex:3;
`
const Product = styled.div`
    display: flex;
    justify-content: center;
    ${mobile({ flexDirection: "column" })}
`
const ProductDetail = styled.div`
    flex:2;
    display: flex;
`
const Image = styled.img`
    width: 200px;
`
const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`
const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`
const ProductAmount = styled.div`
    font-size: 2px;
    margin: 5px;
    ${mobile({ margin: "5px 15px" })}
`
const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
    ${mobile({ marginBottom: "20px" })}
`
const ProductName = styled.span``
const ProductId = styled.span``
const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color:${ props => props.color }
`
const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
`
const ProductSize = styled.span``

const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius:10px;
    padding: 20px;
    height: 50vh;
`
const SummaryTitle = styled.h1`
    font-weight: 200;
`

const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${(props) => props.type === "total" && "500"};
    font-size: ${(props) => props.type === "total" && "24px"};
    
`
const SummaryItemText = styled.span`
    
`
const SummaryItemPrice = styled.span`
    
`
const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
`

const Cart = () => {

    const cart = useSelector((state) => state.cart);        // Seleccionamos el estado de "cart"

    const [stripeToken, setStripeToken] = useState( null ); // Estado para el token de stripe
    const onToken = ( token ) => {                          // Cuando rellenamos el formulario de stripe para pagar nos devuelve un token,
        setStripeToken( token )
    }

    const history = useHistory();

    useEffect(() => {
    const makeRequest = async () => {
      try {               
        const res = await userRequest.post("/checkout/payment", { // Petición al backend para que gestione el pago a stripe
          tokenId: stripeToken.id,                                // Como argumentos de esta petición el stripeToken.id y la cantidad
          amount: cart.total * 100,
        });
        history.push("/success", {  // Si hay respuesta satisfactoría usaremos el history.push para pasar de la página actual a otra. 
          stripeData: res.data,     // y enviaremos a esa página los datos de la respuesta del backend, esto último se considera el state
          cart: cart, });           // de la ruta que se envía con el history.
      } catch {}
    };
        stripeToken && makeRequest();
    }, [stripeToken, cart.total, cart, history]);

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <Title>YOUR BAG</Title>
                <Top>
                    <TopButton>CONTINUE SHOPPING</TopButton>
                    <TopTexts>
                        <TopText>
                            Shopping Bag(2)
                        </TopText>
                        <TopText>
                            Your wishlist (0)
                        </TopText>
                    </TopTexts>
                    <TopButton type="filled">CHECKOUT NOW</TopButton>
                </Top>
                <Bottom>
                    <Info>
                        { cart.products.map( (product) => (
                            <Product key={ uuidv4()}>
                                <ProductDetail>
                                    <Image src={ product.img }/>
                                    <Details>
                                        <ProductName><b>Product: </b>{ product.title }</ProductName>
                                        <ProductId><b>ID</b> { product._id }</ProductId>
                                        <ProductColor color={ product.color}/>
                                        <ProductSize>
                                            <b>Size </b>{ product.size}
                                        </ProductSize>
                                    </Details>
                                </ProductDetail>
                                <PriceDetail>
                                    <ProductAmountContainer>
                                        <Add />
                                            <ProductAmount>{ product.quantity }</ProductAmount>
                                        <Remove />
                                    </ProductAmountContainer>
                                    <ProductPrice>$ { product.price * product.quantity }</ProductPrice>
                                </PriceDetail>
                            </Product>
                        ))}
                      <Hr/>
                    </Info>
                    <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>$ { cart.total }</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Estimated Shiping</SummaryItemText>
                            <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>$ { cart.total }</SummaryItemPrice>
                        </SummaryItem>
                        <StripeCheckout name="Lama Shop" 
                            image="https://res.cloudinary.com/downe22q2/image/upload/v1616081918/l7j4860eixwtx112puwg.jpg"
                            billingAddress
                            shippingAddress
                            description={`Your total is $${cart.total}`}
                            amount={cart.total*100}
                            token={onToken}
                            stripeKey={KEY}
                        >
                            <Button>CHECKOUT NOW</Button>
                        </StripeCheckout>
                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default Cart
