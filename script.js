/* =========================================
   LUNELLE PRODUCTS
========================================= */

const products = [

    {
        id: 1,
        name: "The Soft Rib Tee",
        price: 32,
        tag: "New",
        shirt: "shirt-one",
        section: "new"
    },

    {
        id: 2,
        name: "The Essential Tee",
        price: 29,
        tag: "Best Seller",
        shirt: "shirt-two",
        section: "new"
    },

    {
        id: 3,
        name: "The Everyday Tee",
        price: 34,
        tag: "New",
        shirt: "shirt-three",
        section: "new"
    },

    {
        id: 4,
        name: "The Relaxed Tee",
        price: 36,
        tag: "New",
        shirt: "shirt-four",
        section: "new"
    },

    {
        id: 5,
        name: "The Studio Tee",
        price: 38,
        tag: "Best Seller",
        shirt: "shirt-five",
        section: "best"
    },

    {
        id: 6,
        name: "The Weekend Tee",
        price: 31,
        tag: "Best Seller",
        shirt: "shirt-six",
        section: "best"
    },

    {
        id: 7,
        name: "The Muse Tee",
        price: 35,
        tag: "Best Seller",
        shirt: "shirt-seven",
        section: "best"
    },

    {
        id: 8,
        name: "The Classic Tee",
        price: 30,
        tag: "Best Seller",
        shirt: "shirt-eight",
        section: "best"
    }

];



/* =========================================
   CART
========================================= */

let cart = [];



/* =========================================
   PRODUCT CARD
========================================= */

function createProductCard(product) {

    return `

        <article
            class="product-card"
            data-name="${product.name.toLowerCase()}">

            <div
                class="product-image ${product.shirt}">

                <span class="product-tag">
                    ${product.tag}
                </span>

                <button
                    class="wishlist"
                    onclick="addWishlist(this)"
                    aria-label="Add to wishlist">

                    ♡

                </button>

            </div>


            <div class="product-info">

                <h3>
                    ${product.name}
                </h3>

                <p>
                    Premium cotton · Everyday fit
                </p>

                <p class="product-price">
                    $${product.price.toFixed(2)}
                </p>

                <button
                    class="add-button"
                    onclick="addToCart(${product.id})">

                    Add to bag

                </button>

            </div>

        </article>

    `;
}



/* =========================================
   RENDER PRODUCTS
========================================= */

function renderProducts(elementId, productList) {

    const container =
        document.getElementById(elementId);

    container.innerHTML =
        productList
            .map(createProductCard)
            .join("");

}


renderProducts(
    "newProducts",
    products.filter(
        product => product.section === "new"
    )
);


renderProducts(
    "bestProducts",
    products.filter(
        product => product.section === "best"
    )
);


renderProducts(
    "featuredProducts",
    products.slice(1, 7)
);



/* =========================================
   ADD TO CART
========================================= */

function addToCart(productId) {

    const product =
        products.find(
            product => product.id === productId
        );

    if (!product) return;

    cart.push(product);

    updateCart();

    document
        .getElementById("cart")
        .classList.add("open");

    document
        .getElementById("overlay")
        .classList.add("open");
}



/* =========================================
   UPDATE CART
========================================= */

function updateCart() {

    const cartCount =
        document.getElementById("cartCount");

    const cartItems =
        document.getElementById("cartItems");

    const subtotal =
        document.getElementById("subtotal");


    cartCount.textContent = cart.length;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your bag is empty.
            </p>
        `;

    } else {

        cartItems.innerHTML =
            cart.map(
                (product, index) => `

                <div class="cart-item">

                    <div
                        class="cart-thumb ${product.shirt}">
                    </div>

                    <div>

                        <strong>
                            ${product.name}
                        </strong>

                        <p>
                            $${product.price.toFixed(2)}
                        </p>

                        <button
                            class="add-button"
                            onclick="removeFromCart(${index})">

                            Remove

                        </button>

                    </div>

                </div>

            `
            ).join("");

    }


    const total =
        cart.reduce(
            (sum, product) =>
                sum + product.price,
            0
        );


    subtotal.textContent =
        "$" + total.toFixed(2);

}



/* =========================================
   REMOVE FROM CART
========================================= */

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}



/* =========================================
   OPEN / CLOSE CART
========================================= */

function toggleCart() {

    const cartElement =
        document.getElementById("cart");

    const overlay =
        document.getElementById("overlay");


    cartElement.classList.toggle("open");

    overlay.classList.toggle("open");

}



/* =========================================
   SEARCH
========================================= */

function toggleSearch() {

    const searchPanel =
        document.getElementById("searchPanel");


    searchPanel.classList.toggle("open");


    if (
        searchPanel.classList.contains("open")
    ) {

        document
            .getElementById("searchInput")
            .focus();

    }

}



/* =========================================
   SEARCH PRODUCTS
========================================= */

function searchProducts() {

    const query =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();


    const productCards =
        document.querySelectorAll(
            ".product-card"
        );


    productCards.forEach(card => {

        const name =
            card.dataset.name;


        if (name.includes(query)) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

}



/* =========================================
   MOBILE MENU
========================================= */

function toggleMenu() {

    const navigation =
        document.querySelector(".navigation");


    if (
        navigation.style.display === "flex"
    ) {

        navigation.style.display = "";

    } else {

        navigation.style.display = "flex";

        navigation.style.position = "absolute";

        navigation.style.top = "76px";

        navigation.style.left = "0";

        navigation.style.right = "0";

        navigation.style.padding = "25px";

        navigation.style.background = "#fbfaf7";

        navigation.style.flexDirection = "column";

        navigation.style.gap = "20px";

        navigation.style.borderBottom =
            "1px solid #dfdbd3";

    }

}



/* =========================================
   WISHLIST
========================================= */

function addWishlist(button) {

    if (button.textContent === "♡") {

        button.textContent = "♥";

    } else {

        button.textContent = "♡";

    }

}



/* =========================================
   NEWSLETTER
========================================= */

function subscribe(event) {

    event.preventDefault();


    const message =
        document.getElementById(
            "subscribeMessage"
        );


    message.textContent =
        "You're on the list. Thank you!";


    event.target.reset();

}



/* =========================================
   CHECKOUT DEMO
========================================= */

function checkout() {

    if (cart.length === 0) {

        alert(
            "Your shopping bag is empty."
        );

        return;

    }


    alert(
        "Demo checkout.\n\n" +
        "Your real payment and order system " +
        "can be connected here."
    );

}
