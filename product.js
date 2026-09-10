/* =========================================
   LUNELLE PRODUCT PAGE JAVASCRIPT
========================================= */


/* =========================================
   PRODUCT STATE
========================================= */

let selectedSize = "S";
let selectedColor = "Cream";
let quantity = 1;

const product = {
  id: 1,
  name: "The Soft Rib Tee",
  price: 32,
  originalPrice: 42,
  color: "Cream",
  size: "S"
};


/* =========================================
   MOBILE MENU
========================================= */

function toggleProductMenu() {

  const nav = document.getElementById("productNav");

  if (!nav) return;

  nav.classList.toggle("mobile-open");

}


/* =========================================
   SEARCH
========================================= */

function toggleSearch() {

  const searchBox = document.getElementById("searchBox");

  if (!searchBox) return;

  searchBox.classList.toggle("open");

  if (searchBox.classList.contains("open")) {

    const input = document.getElementById("productSearch");

    if (input) {
      setTimeout(() => input.focus(), 100);
    }

  }

}


function searchProduct() {

  const input = document.getElementById("productSearch");

  if (!input) return;

  const query = input.value.trim();

  if (!query) {

    window.location.href = "shop.html";

    return;
  }

  window.location.href =
    "shop.html?search=" + encodeURIComponent(query);

}


/* =========================================
   PRODUCT IMAGE
========================================= */

function changeProductImage(imageNumber) {

  const mainImage = document.getElementById("mainProductImage");

  const thumbnails = document.querySelectorAll(".thumbnail");

  if (!mainImage) return;


  thumbnails.forEach((thumbnail) => {
    thumbnail.classList.remove("active");
  });


  if (thumbnails[imageNumber - 1]) {
    thumbnails[imageNumber - 1].classList.add("active");
  }


  const colors = [
    "cream",
    "rose",
    "sage",
    "black"
  ];

  const selectedVisual = colors[imageNumber - 1] || "cream";


  mainImage.innerHTML = `

    <div class="product-visual ${selectedVisual} large">

      <div class="tshirt-shape">
        <span></span>
      </div>

    </div>

    <div class="image-label">
      LUNELLE
    </div>

  `;

}


/* =========================================
   COLOR SELECTION
========================================= */

function selectColor(button) {

  const colorButtons =
    document.querySelectorAll(".color-option");

  colorButtons.forEach((item) => {
    item.classList.remove("active");
  });


  button.classList.add("active");


  selectedColor =
    button.getAttribute("data-color") || "Cream";


  const colorText =
    document.getElementById("selectedColor");

  if (colorText) {
    colorText.textContent = selectedColor;
  }

}


/* =========================================
   SIZE SELECTION
========================================= */

function selectSize(button) {

  const sizeButtons =
    document.querySelectorAll(".size-option");

  sizeButtons.forEach((item) => {
    item.classList.remove("active");
  });


  button.classList.add("active");


  selectedSize =
    button.textContent.trim();

}


/* =========================================
   QUANTITY
========================================= */

function updateQuantity() {

  const quantityElement =
    document.getElementById("quantity");

  if (quantityElement) {
    quantityElement.textContent = quantity;
  }

}


function increaseQuantity() {

  if (quantity >= 10) return;

  quantity++;

  updateQuantity();

}


function decreaseQuantity() {

  if (quantity <= 1) return;

  quantity--;

  updateQuantity();

}


/* =========================================
   CART STORAGE
========================================= */

function getCart() {

  try {

    return JSON.parse(
      localStorage.getItem("lunelleCart")
    ) || [];

  } catch (error) {

    return [];

  }

}


function saveCart(cart) {

  localStorage.setItem(
    "lunelleCart",
    JSON.stringify(cart)
  );

}


/* =========================================
   ADD TO CART
========================================= */

function addProductToCart() {

  const cart = getCart();


  const existingItem = cart.find(
    (item) =>
      item.id === product.id &&
      item.size === selectedSize &&
      item.color === selectedColor
  );


  if (existingItem) {

    existingItem.quantity += quantity;

  } else {

    cart.push({

      id: product.id,

      name: product.name,

      price: product.price,

      originalPrice: product.originalPrice,

      size: selectedSize,

      color: selectedColor,

      quantity: quantity

    });

  }


  saveCart(cart);

  renderProductCart();

  openProductCart();

  updateBagCount();

}


/* =========================================
   BUY NOW
========================================= */

function buyProductNow() {

  addProductToCart();

  setTimeout(() => {

    alert(
      "Buy Now is currently in demo mode. Checkout/payment will be connected later."
    );

  }, 250);

}


/* =========================================
   CART DRAWER
========================================= */

function openProductCart() {

  const cart =
    document.getElementById("productCart");

  const overlay =
    document.getElementById("productCartOverlay");

  if (cart) {
    cart.classList.add("open");
  }

  if (overlay) {
    overlay.classList.add("open");
  }

  renderProductCart();

}


function closeProductCart() {

  const cart =
    document.getElementById("productCart");

  const overlay =
    document.getElementById("productCartOverlay");

  if (cart) {
    cart.classList.remove("open");
  }

  if (overlay) {
    overlay.classList.remove("open");
  }

}


/* =========================================
   RENDER CART
========================================= */

function renderProductCart() {

  const cart = getCart();

  const cartItems =
    document.getElementById("productCartItems");

  const totalElement =
    document.getElementById("productCartTotal");


  if (!cartItems || !totalElement) return;


  if (cart.length === 0) {

    cartItems.innerHTML = `

      <div class="empty-cart">

        <p>
          Your bag is currently empty.
        </p>

        <a href="shop.html">
          Continue Shopping
        </a>

      </div>

    `;

    totalElement.textContent = "$0.00";

    updateBagCount();

    return;

  }


  let total = 0;


  cartItems.innerHTML = cart.map((item, index) => {

    const itemTotal =
      item.price * item.quantity;

    total += itemTotal;


    return `

      <div
        style="
          display:flex;
          gap:14px;
          padding:15px 0;
          border-bottom:1px solid #ded8cf;
        "
      >

        <div
          style="
            width:75px;
            height:90px;
            background:#e9dfd2;
            display:flex;
            align-items:center;
            justify-content:center;
          "
        >

          <div
            style="
              width:45px;
              height:55px;
              background:#f4eee5;
              clip-path:polygon(
                25% 0%,
                40% 0%,
                50% 10%,
                60% 0%,
                75% 0%,
                100% 22%,
                82% 36%,
                72% 28%,
                72% 100%,
                28% 100%,
                28% 28%,
                18% 36%,
                0% 22%
              );
            "
          ></div>

        </div>


        <div style="flex:1;">

          <strong
            style="
              display:block;
              font-size:13px;
              margin-bottom:6px;
            "
          >
            ${item.name}
          </strong>


          <span
            style="
              display:block;
              color:#77736d;
              font-size:11px;
              margin-bottom:5px;
            "
          >
            ${item.color} · ${item.size}
          </span>


          <span
            style="
              display:block;
              font-size:13px;
              margin-bottom:10px;
            "
          >
            $${item.price.toFixed(2)} × ${item.quantity}
          </span>


          <button
            onclick="removeProductCartItem(${index})"
            style="
              border:none;
              background:none;
              padding:0;
              color:#77736d;
              text-decoration:underline;
              cursor:pointer;
              font-size:11px;
            "
          >
            Remove
          </button>

        </div>

      </div>

    `;

  }).join("");


  totalElement.textContent =
    "$" + total.toFixed(2);


  updateBagCount();

}


/* =========================================
   REMOVE CART ITEM
========================================= */

function removeProductCartItem(index) {

  const cart = getCart();

  cart.splice(index, 1);

  saveCart(cart);

  renderProductCart();

}


/* =========================================
   BAG COUNT
========================================= */

function updateBagCount() {

  const cart = getCart();

  const count =
    cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );


  const bagCount =
    document.getElementById("productBagCount");

  if (bagCount) {
    bagCount.textContent = count;
  }

}


/* =========================================
   PRODUCT TABS
========================================= */

function showProductTab(tabId, button) {

  const tabs =
    document.querySelectorAll(".tab-content");

  const buttons =
    document.querySelectorAll(".content-tab");


  tabs.forEach((tab) => {
    tab.classList.remove("active");
  });


  buttons.forEach((item) => {
    item.classList.remove("active");
  });


  const selectedTab =
    document.getElementById(tabId);

  if (selectedTab) {
    selectedTab.classList.add("active");
  }


  if (button) {
    button.classList.add("active");
  }

}


/* =========================================
   CHECKOUT
========================================= */

function productCheckout() {

  const cart = getCart();

  if (cart.length === 0) {

    alert("Your bag is empty.");

    return;

  }


  alert(
    "Checkout is currently in demo mode. Payment and order processing will be connected in the next stage."
  );

}


/* =========================================
   INITIALIZE
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    updateQuantity();

    updateBagCount();

    renderProductCart();


    /* Close cart with Escape */

    document.addEventListener(
      "keydown",
      function (event) {

        if (event.key === "Escape") {

          closeProductCart();

        }

      }
    );


    /* Search with Enter */

    const searchInput =
      document.getElementById("productSearch");

    if (searchInput) {

      searchInput.addEventListener(
        "keydown",
        function (event) {

          if (event.key === "Enter") {

            searchProduct();

          }

        }
      );

    }

  }
);
