type ShoppingCart = {
  id: string;
  name: string;
  price: number;
}[];

// 데이터
const shoppingCart: ShoppingCart = [];
const shoppingCartTotalPrice: number = 0;

// 액션
const updateDom = () => {
  // dom 조작, 부수효과, 전역변수를 읽음
  document.querySelector("#cartTotalPrice").innerHTML =
    shoppingCartTotalPrice.toLocaleString();
};

// 계산
const calcTax = (amount: number) => amount * 0.1;
const add = (a: number, b: ShoppingCart[0]) => a + b.price;
const isFreeShipping = (shoppingCart: ShoppingCart) =>
  shoppingCart.reduce(add, 0) >= 20;
const shippingPrice = (amount: number) =>
  amount + (isFreeShipping(shoppingCart) ? 0 : 8);
