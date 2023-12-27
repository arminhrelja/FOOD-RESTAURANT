//Deklarisanje varijabli
let menu = document.querySelector('#menu-bars');
let navBar = document.querySelector('.navbar');
let carts = document.querySelectorAll('.add-cart');
let products = [
  {
    name:"Ćevapi",
    tag:"ćevapi",
    price:10.00,
    inCart:0
  },
  {
    name: "Chicken nuggets",
    tag:"nuggets",
    price: 11.00,
    inCart: 0
  },
  {
    name: "Pasta",
    tag: "pasta",
    price: 9.00,
    inCart: 0
  },
  {
    name: "Fish",
    tag: "riba",
    price: 15.00,
    inCart: 0
  },
  {
    name: "Soup",
    tag: "supa",
    price: 6.00,
    inCart: 0
  },
  {
    name: "Hamburger",
    tag: "burger",
    price: 8.00,
    inCart: 0
  },
  {
    name: "Chicken file",
    tag: "filete",
    price: 10.00,
    inCart: 0
  },
  {
    name: "Sandwich",
    tag: "sandwich",
    price: 4.00,
    inCart: 0
  },
  {
    name: "Lemonade",
    tag: "lemonade",
    price: 3.00,
    inCart: 0
  },
  {
    name: "Pancakes",
    tag: "palacinci",
    price: 6.00,
    inCart: 0
  },
  {
    name: "Apple Pie",
    tag: "pie",
    price: 15.00,
    inCart: 0
  },
  {
    name: "Pizza",
    tag: "pizza",
    price: 10.00,
    inCart: 0
  },
  {
    name: "Kebab",
    tag: "kebab",
    price: 10.00,
    inCart: 0
  }
]

//Funkcija za očitavanje broja proizvoda u cart-u pri ponovnom učitavanju stranice
function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem('cartNumbers');

  if(productNumbers) {
    document.querySelector('.bar a span').textContent = productNumbers;
  }
}

//Funkcija za povećanje vrijednosti broja proizvoda u cart-u
function cartNumbers(product) {
  let productNumbers = localStorage.getItem('cartNumbers');
  
  productNumbers = parseInt(productNumbers);
  
  if(productNumbers) {
    localStorage.setItem('cartNumbers',productNumbers + 1);
    document.querySelector('.bar span').textContent = productNumbers + 1;
  } else {
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.bar a span').textContent = 1;
  }

  setItems(product);
}

//Funkcija za postavljanje vrijednosti u cart-u
function setItems(product) {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  if(cartItems != null) {

    if(cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems, //dohvaćanje svih ostalih elemenata u cart-u
        [product.tag]: product
      }
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product
    }
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

//Funkcija koja računa ukupnu cijenu u cart-u
function totalCost(product) {
  let cartCost = localStorage.getItem('totalCost');

  if(cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem('totalCost', cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}

//Funkcija za prikaz proizvoda u cart-u pri dodavanju
function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  let productContainer = document.querySelector(".products");
  let cartCost = localStorage.getItem('totalCost');
  if(cartItems && productContainer) {
    productContainer.innerHTML = '';
    Object.values(cartItems).map(item => {
      productContainer.innerHTML += `
      <div class="product-container">
        <div class="product">
          <div class="product-info">
            <i class="fa-solid fa-circle-xmark" onclick="removeFromCart('${item.tag}');"></i>
            <img src="./images/${item.tag}.jpg" alt="${item.name}">
            <span>${item.name}</span>
          </div>
          <div class="price">$${item.price},00</div>
          <div class="quantity">
            <i class="fa-solid fa-circle-left" onclick="decreaseQuantity('${item.tag}')"></i>
            <span>${item.inCart}</span>
            <i class="fa-solid fa-circle-right" onclick="increaseQuantity('${item.tag}')""></i>
          </div>
          <div class="total">$${item.inCart * item.price},00</div>
        </div>
      </div>
      
      `;
    });

    productContainer.innerHTML += `
      <div class="basketTotalContainer">
        <h4 class="basketTotalTitle">Basket Total</h4>
        <h4 class="basketTotal">$${cartCost},00</h4>
      </div>
    `;
    
  }
}

//Funkcija za uklanjanje proizvoda iz cart-a
function removeFromCart(productTag) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if(cartItems && cartItems[productTag]) {
    //Smanjenje ukupnog broja proizvoda
    let productNumbers = localStorage.getItem("cartNumbers");
    productNumbers = parseInt(productNumbers);
    localStorage.setItem("cartNumbers", productNumbers - cartItems[productTag].inCart);

    //Smanjenje ukupne cijene
    let cartCost = localStorage.getItem("totalCost");
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost - (cartItems[productTag].price * cartItems[productTag].inCart));

    //Uklanjanje proizvoda
    delete cartItems[productTag];
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));

    //Ponovni prikaz cart-a
    displayCart();
    onLoadCartNumbers();
  }
}

function decreaseQuantity(productTag) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if(cartItems && cartItems[productTag] && cartItems[productTag].inCart > 1) {
    cartItems[productTag].inCart--;

    let productNumbers = localStorage.getItem("cartNumbers");
    productNumbers = parseInt(productNumbers);
    localStorage.setItem("cartNumbers", productNumbers - 1);

    let cartCost = localStorage.getItem("totalCost");
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost - cartItems[productTag].price);

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));

    displayCart();
    onLoadCartNumbers();
  }
}

function increaseQuantity(productTag) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems && cartItems[productTag]) {
    cartItems[productTag].inCart++;

    let productNumbers = localStorage.getItem("cartNumbers");
    productNumbers = parseInt(productNumbers);
    localStorage.setItem("cartNumbers", productNumbers + 1);

    let cartCost = localStorage.getItem("totalCost");
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + cartItems[productTag].price);    

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));

    displayCart();
    onLoadCartNumbers();
  }
}

//Main dio programa
for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener('click', () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  });
}

onLoadCartNumbers(); //Pozivanje prethodno kreiranih metoda
displayCart(); //Pozivanje prethodno kreiranih metoda

//Funkcija za menu button
menu.onclick = () => {
  menu.classList.toggle('fa-times');
  navBar.classList.toggle('active');
}

//Swiper JS kod
var swiper = new Swiper(".container-home", {
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
        delay: 7500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      loop:true
    });