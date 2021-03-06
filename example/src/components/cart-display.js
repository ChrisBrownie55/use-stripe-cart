/**@jsx jsx */
import { jsx, Box, Flex, Image, Button } from 'theme-ui';
import { useStripeCart } from 'use-stripe-cart';

const CartDisplay = () => {
  const {
    cartDetails,
    cartItems,
    handleQuantityChange,
    cartCount,
    addItem,
    removeCartItem,
    totalPrice,
    redirectToCheckout,
  } = useStripeCart();

  if (Object.keys(cartDetails).length === 0) {
    return (
      <Box sx={{ textAlign: 'center' }}>
        <h2>Shopping Cart Display Panel</h2>
        <h3>No items in cart</h3>
      </Box>
    );
  } else {
    return (
      <Flex
        sx={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h2>Shopping Cart Display Panel</h2>
        {Object.keys(cartDetails).map(item => {
          const cartItem = cartDetails[item];
          const { name, sku, formattedPrice, quantity } = cartItem;
          return (
            <Flex
              key={cartItem.sku}
              sx={{
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Flex sx={{ flexDirection: 'column', alignItems: 'center' }}>
                <Image sx={{ width: 100 }} src={cartItem.image} />
                <p>{name}</p>
              </Flex>
              <Box>
                <span sx={{ display: 'block' }}>Price: {formattedPrice}</span>
                <span sx={{ display: 'block' }}>qty: {quantity}</span>
                <Button
                  backgroundColor={'black'}
                  onClick={() => addItem(cartItem)}
                >
                  +
                </Button>
                <Button
                  backgroundColor={'black'}
                  onClick={() => removeCartItem(sku)}
                >
                  -
                </Button>
              </Box>
            </Flex>
          );
        })}
        <h3>Total Items in Cart: {cartCount}</h3>
        <h3>Total Price: {totalPrice()}</h3>
        <Button sx={{ backgroundColor: 'black' }} onClick={redirectToCheckout}>
          Checkout
        </Button>
      </Flex>
    );
  }
};

export default CartDisplay;
