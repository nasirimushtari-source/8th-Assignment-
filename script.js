let cart = JSON.parse(localStorage.getItem("cart")) || [];
//Dark mode
function toggleDrk(){
  document.body.classList.toggle("dark");
}

/* =========================
   ADD TO CART
========================= */
function addToCart(name, price) {

  let existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1
    });
  }

  saveCart();
  updateCart();
}

/* =========================
   SAVE CART
========================= */
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* =========================
   UPDATE CART UI
========================= */
function updateCart() {

  let cartItems = document.getElementById("cart-items");
  let totalEl = document.getElementById("total");
  let countEl = document.getElementById("cart-count");

  cartItems.innerHTML = "";

  let total = 0;
  let totalQty = 0;

  cart.forEach((item, index) => {

    total += item.price * item.quantity;
    totalQty += item.quantity;

    cartItems.innerHTML += `
      <div class="border p-2 mb-2">

        <h5>${item.name}</h5>

        <p>$${item.price} × ${item.quantity}</p>

        <p><b>Subtotal:</b> $${item.price * item.quantity}</p>

        <button class="btn btn-success btn-sm" onclick="increaseQty(${index})">+</button>

        <button class="btn btn-warning btn-sm" onclick="decreaseQty(${index})">-</button>

        <button class="btn btn-danger btn-sm" onclick="removeItem(${index})">Remove</button>

      </div>
    `;
  });

  countEl.textContent = totalQty;
  totalEl.textContent = total;

  saveCart();
}

/* =========================
   INCREASE QTY
========================= */
function increaseQty(index) {
  cart[index].quantity++;
  updateCart();
}

/* =========================
   DECREASE QTY
========================= */
function decreaseQty(index) {

  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1);
  }

  updateCart();
}

/* =========================
   REMOVE ITEM
========================= */
function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

/* =========================
   CLEAR CART
========================= */
function clearCart() {
  cart = [];
  updateCart();
}

/* =========================
   CATEGORY FILTER
========================= */
document.querySelectorAll(".filter-btn").forEach(btn => {

  btn.addEventListener("click", function () {

    let category = this.getAttribute("data-category");

    let products = document.querySelectorAll("[data-category]");

    products.forEach(product => {

      if (category === "all") {
        product.style.display = "block";
      } else {
        if (product.getAttribute("data-category") === category) {
          product.style.display = "block";
        } else {
          product.style.display = "none";
        }
      }

    });

  });

});

/* =========================
   SEARCH PRODUCT
========================= */
let searchInput = document.getElementById("search");

if (searchInput) {
  searchInput.addEventListener("keyup", function () {

    let value = this.value.toLowerCase();
    let products = document.querySelectorAll(".product-card");

    products.forEach(card => {

      let title = card.querySelector("h5").textContent.toLowerCase();

      if (title.includes(value)) {
        card.parentElement.style.display = "block";
      } else {
        card.parentElement.style.display = "none";
      }

    });

  });
}

/* =========================
   CHECKOUT FORM VALIDATION
========================= */
let form = document.getElementById("checkoutForm");

if (form) {
  form.addEventListener("submit", function (e) {

    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let address = document.getElementById("address").value.trim();

    let valid = true;

    document.getElementById("nameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("addressError").textContent = "";

    if (name === "") {
      document.getElementById("nameError").textContent = "Name is required";
      valid = false;
    }

    if (email === "" || !email.includes("@")) {
      document.getElementById("emailError").textContent = "Valid email required";
      valid = false;
    }

    if (address === "") {
      document.getElementById("addressError").textContent = "Address is required";
      valid = false;
    }

    if (valid) {

      alert("🎉 Order placed successfully!");

      cart = [];
      saveCart();
      updateCart();

      form.reset();
    }

  });
}

/* =========================
   INIT
========================= */
updateCart();