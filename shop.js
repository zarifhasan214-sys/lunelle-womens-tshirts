/* ==========================================
   LUNELLE SHOP PRODUCTS
========================================== */


const shopProducts = [

    {
        id: 1,
        name: "The Soft Rib Tee",
        price: 32,
        category: "Essential",
        sizes: ["XS", "S", "M", "L"],
        color: "Cream",
        tag: "New",
        date: 12,
        shirt: "shop-shirt-cream"
    },


    {
        id: 2,
        name: "The Essential Tee",
        price: 29,
        category: "Essential",
        sizes: ["XS", "S", "M", "L", "XL"],
        color: "Black",
        tag: "Best Seller",
        date: 11,
        shirt: "shop-shirt-black"
    },


    {
        id: 3,
        name: "The Everyday Tee",
        price: 34,
        category: "Essential",
        sizes: ["S", "M", "L"],
        color: "Rose",
        tag: "New",
        date: 10,
        shirt: "shop-shirt-rose"
    },


    {
        id: 4,
        name: "The Relaxed Tee",
        price: 36,
        category: "Relaxed",
        sizes: ["XS", "S", "M", "L", "XL"],
        color: "Cream",
        tag: "New",
        date: 9,
        shirt: "shop-shirt-cream"
    },


    {
        id: 5,
        name: "The Studio Tee",
        price: 38,
        category: "Relaxed",
        sizes: ["S", "M", "L"],
        color: "Sage",
        tag: "Best Seller",
        date: 8,
        shirt: "shop-shirt-sage"
    },


    {
        id: 6,
        name: "The Weekend Tee",
        price: 31,
        category: "Relaxed",
        sizes: ["XS", "S", "M", "L"],
        color: "Brown",
        tag: "Best Seller",
        date: 7,
        shirt: "shop-shirt-brown"
    },


    {
        id: 7,
        name: "The Muse Tee",
        price: 35,
        category: "Statement",
        sizes: ["S", "M", "L", "XL"],
        color: "Rose",
        tag: "Best Seller",
        date: 6,
        shirt: "shop-shirt-rose"
    },


    {
        id: 8,
        name: "The Classic Tee",
        price: 30,
        category: "Essential",
        sizes: ["XS", "S", "M", "L", "XL"],
        color: "Black",
        tag: "Best Seller",
        date: 5,
        shirt: "shop-shirt-black"
    },


    {
        id: 9,
        name: "The Pure Cotton Tee",
        price: 28,
        category: "Essential",
        sizes: ["XS", "S", "M"],
        color: "Cream",
        tag: "New",
        date: 4,
        shirt: "shop-shirt-cream"
    },


    {
        id: 10,
        name: "The Modern Fit Tee",
        price: 37,
        category: "Statement",
        sizes: ["S", "M", "L"],
        color: "Sage",
        tag: "New",
        date: 3,
        shirt: "shop-shirt-sage"
    },


    {
        id: 11,
        name: "The Signature Tee",
        price: 42,
        category: "Statement",
        sizes: ["S", "M", "L", "XL"],
        color: "Brown",
        tag: "Limited",
        date: 2,
        shirt: "shop-shirt-brown"
    },


    {
        id: 12,
        name: "The Minimal Tee",
        price: 33,
        category: "Essential",
        sizes: ["XS", "S", "M", "L"],
        color: "Rose",
        tag: "New",
        date: 1,
        shirt: "shop-shirt-rose"
    }

];



/* ==========================================
   SHOP CART
========================================== */

let shopCart = [];



/* ==========================================
   PRODUCT CARD
========================================== */

function createShopCard(product) {

    return `

        <article
            class="shop-product-card"
            data-name="${product.name.toLowerCase()}">

            <div
                class="shop-product-image
                ${product.shirt}">

                <span class="shop-tag">
                    ${product.tag}
                </span>


                <button
                    class="shop-wishlist"
                    onclick="shopWishlist(this)">

                    ♡

                </button>

            </div>


            <div class="shop-product-info">

                <h3>
                    ${product.name}
                </h3>

                <p class="details">

                    ${product.color}
                    ·
                    ${product.category} Fit

                </p>


                <p class="price">

                    $${product.price.toFixed(2)}

                </p>


                <button
                    class="shop-add"
                    onclick="addShopCart(${product.id})">

                    Add to bag

                </button>

            </div>

        </article>

    `;

}



/* ==========================================
   FILTER PRODUCTS
========================================== */

function filterProducts() {

    let filtered =
        [...shopProducts];


    /* SEARCH */

    const search =
        document
            .getElementById("shopSearchInput")
            .value
            .toLowerCase()
            .trim();


    if (search) {

        filtered =
            filtered.filter(
                product =>
                    product.name
                        .toLowerCase()
                        .includes(search)
            );

    }



    /* CATEGORY */

    const categories =
        [
            ...document
                .querySelectorAll(
                    ".category-filter:checked"
                )
        ]
        .map(input => input.value);


    if (categories.length > 0) {

        filtered =
            filtered.filter(
                product =>
                    categories.includes(
                        product.category
                    )
            );

    }



    /* PRICE */

    const priceFilter =
        document
            .querySelector(
                'input[name="price"]:checked'
            )
            .value;


    if (priceFilter === "under30") {

        filtered =
            filtered.filter(
                product => product.price < 30
            );

    }


    if (priceFilter === "30to35") {

        filtered =
            filtered.filter(
                product =>
                    product.price >= 30 &&
                    product.price <= 35
            );

    }


    if (priceFilter === "35to40") {

        filtered =
            filtered.filter(
                product =>
                    product.price > 35 &&
                    product.price <= 40
            );

    }


    if (priceFilter === "over40") {

        filtered =
            filtered.filter(
                product =>
                    product.price > 40
            );

    }



    /* SIZE */

    const sizes =
        [
            ...document
                .querySelectorAll(
                    ".size-filter:checked"
                )
        ]
        .map(input => input.value);


    if (sizes.length > 0) {

        filtered =
            filtered.filter(
                product =>
                    sizes.some(
                        size =>
                            product.sizes.includes(size)
                    )
            );

    }



    /* COLOR */

    const colors =
        [
            ...document
                .querySelectorAll(
                    ".color-filter:checked"
                )
        ]
        .map(input => input.value);


    if (colors.length > 0) {

        filtered =
            filtered.filter(
                product =>
                    colors.includes(
                        product.color
                    )
            );

    }



    /* SORT */

    const sort =
        document
            .getElementById("sortProducts")
            .value;


    if (sort === "low") {

        filtered.sort(
            (a, b) =>
                a.price - b.price
        );

    }


    if (sort === "high") {

        filtered.sort(
            (a, b) =>
                b.price - a.price
        );

    }


    if (sort === "newest") {

        filtered.sort(
            (a, b) =>
                b.date - a.date
        );

    }



    /* RENDER */

    const container =
        document
            .getElementById(
                "shopProductGrid"
            );


    const noProducts =
        document
            .getElementById(
                "noProducts"
            );


    const productCount =
        document
            .getElementById(
                "productCount"
            );


    productCount.textContent =
        `${filtered.length} Products`;


    if (filtered.length === 0) {

        container.innerHTML = "";

        noProducts.classList.add(
            "show"
        );

        return;

    }


    noProducts.classList.remove(
        "show"
    );


    container.innerHTML =
        filtered
            .map(createShopCard)
            .join("");

}



/* ==========================================
   RESET FILTERS
========================================== */

function resetFilters() {


    document
        .querySelectorAll(
            ".category-filter, .size-filter, .color-filter"
        )
        .forEach(
            checkbox =>
                checkbox.checked = false
        );


    document
        .querySelector(
            'input[name="price"][value="all"]'
        )
        .checked = true;


    document
        .getElementById(
            "sortProducts"
        )
        .value = "newest";


    document
        .getElementById(
            "shopSearchInput"
        )
        .value = "";


    filterProducts();

}



/* ==========================================
   FILTER ACCORDION
========================================== */

function toggleFilter(button) {

    const content =
        button.nextElementSibling;


    if (
        content.style.display === "none"
    ) {

        content.style.display = "block";

        button
            .querySelector("span")
            .textContent = "−";

    } else {

        content.style.display = "none";

        button
            .querySelector("span")
            .textContent = "+";

    }

}



/* ==========================================
   MOBILE FILTER
========================================== */

function toggleFilters() {

    document
        .getElementById(
            "filterSidebar"
        )
        .classList.toggle("open");


    document
        .getElementById(
            "filterOverlay"
        )
        .classList.toggle("open");

}



/* ==========================================
   SEARCH
========================================== */

function toggleShopSearch() {

    document
        .getElementById(
            "shopSearch"
        )
        .classList.toggle("open");


    if (
        document
            .getElementById(
                "shopSearch"
            )
            .classList.contains("open")
    ) {

        document
            .getElementById(
                "shopSearchInput"
            )
            .focus();

    }

}



/* ==========================================
   MOBILE MENU
========================================== */

function toggleShopMenu() {

    const navigation =
        document.querySelector(
            ".navigation"
        );


    if (
        navigation.style.display === "flex"
    ) {

        navigation.style.display = "";

        return;

    }


    navigation.style.display = "flex";

    navigation.style.position = "absolute";

    navigation.style.top = "76px";

    navigation.style.left = "0";

    navigation.style.right = "0";

    navigation.style.padding = "25px";

    navigation.style.background =
        "#fbfaf7";

    navigation.style.flexDirection =
        "column";

    navigation.style.gap = "20px";

}



/* ==========================================
   WISHLIST
========================================== */

function shopWishlist(button) {

    if (
        button.textContent.trim() === "♡"
    ) {

        button.textContent = "♥";

    } else {

        button.textContent = "♡";

    }

}



/* ==========================================
   ADD TO CART
========================================== */

function addShopCart(productId) {

    const product =
        shopProducts.find(
            product =>
                product.id === productId
        );


    if (!product) return;


    shopCart.push(product);


    updateShopCart();


    document
        .getElementById(
            "shopCart"
        )
        .classList.add("open");


    document
        .getElementById(
            "shopCartOverlay"
        )
        .classList.add("open");

}



/* ==========================================
   UPDATE CART
========================================== */

function updateShopCart() {

    const count =
        document.getElementById(
            "shopCartCount"
        );


    const items =
        document.getElementById(
            "shopCartItems"
        );


    const subtotal =
        document.getElementById(
            "shopSubtotal"
        );


    count.textContent =
        shopCart.length;


    if (shopCart.length === 0) {

        items.innerHTML = `

            <p class="empty-cart">

                Your bag is empty.

            </p>

        `;

    } else {

        items.innerHTML =
            shopCart
                .map(
                    (product, index) => `

                    <div class="cart-item">

                        <div
                            class="cart-thumb
                            ${product.shirt}">
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
                                onclick="
                                    removeShopCart(
                                        ${index}
                                    )
                                ">

                                Remove

                            </button>

                        </div>

                    </div>

                `
                )
                .join("");

    }


    const total =
        shopCart.reduce(
            (sum, product) =>
                sum + product.price,
            0
        );


    subtotal.textContent =
        "$" + total.toFixed(2);

}



/* ==========================================
   REMOVE CART
========================================== */

function removeShopCart(index) {

    shopCart.splice(index, 1);

    updateShopCart();

}



/* ==========================================
   TOGGLE CART
========================================== */

function toggleShopCart() {

    document
        .getElementById(
            "shopCart"
        )
        .classList.toggle("open");


    document
        .getElementById(
            "shopCartOverlay"
        )
        .classList.toggle("open");

}



/* ==========================================
   CHECKOUT
========================================== */

function shopCheckout() {

    if (shopCart.length === 0) {

        alert(
            "Your shopping bag is empty."
        );

        return;

    }


    alert(
        "Demo checkout.\n\n" +
        "Payment and order system " +
        "will be connected here."
    );

}



/* ==========================================
   INITIAL LOAD
========================================== */

filterProducts();
