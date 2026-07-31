// THEME SWITCHER LOGIC (Dark / Light)
function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "dark";
  const toggleBtn = document.getElementById("theme-toggle");

  if (savedTheme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
    if (toggleBtn) toggleBtn.textContent = "Light";
  } else {
    document.documentElement.removeAttribute("data-theme");
    if (toggleBtn) toggleBtn.textContent = "Dark";
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const toggleBtn = document.getElementById("theme-toggle");

  if (currentTheme === "light") {
    document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("theme", "dark");
    if (toggleBtn) toggleBtn.textContent = "Dark";
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    if (toggleBtn) toggleBtn.textContent = "Light";
  }
}

initTheme();

window.addEventListener("load", () => {
  setTimeout(() => {
    const loader = document.getElementById("loader");
    if (loader) loader.classList.add("hidden");
  }, 400);
});

// Backup safety timer for loader
setTimeout(() => {
  const loader = document.getElementById("loader");
  if (loader) loader.classList.add("hidden");
}, 1200);

// SHOPPING CART LOGIC
let userCart = [];

function addToOrder(name, price) {
  const existingItem = userCart.find((item) => item.name === name);
  if (existingItem) {
    existingItem.qty += 1;
  } else {
    userCart.push({ name, price, qty: 1 });
  }
  renderCart();
  const badge = document.getElementById("cart-badge");
  if (badge) {
    badge.style.transform = "scale(1.4)";
    setTimeout(() => (badge.style.transform = "scale(1)"), 200);
  }
  if (window.innerWidth <= 768) {
    const drawer = document.getElementById("cart-drawer");
    if (drawer && !drawer.classList.contains("open")) {
      drawer.classList.add("open");
    }
  }
}

function renderCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartBadge = document.getElementById("cart-badge");
  const cartTotalDisplay = document.getElementById("cart-total");

  const totalQty = userCart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = userCart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );

  if (cartBadge) cartBadge.textContent = totalQty;
  if (cartTotalDisplay) cartTotalDisplay.textContent = `${totalPrice} ETB`;

  if (!cartItemsContainer) return;

  if (userCart.length === 0) {
    cartItemsContainer.innerHTML = `<p class="empty-msg">Your basket is currently empty.</p>`;
    return;
  }

  cartItemsContainer.innerHTML = userCart
    .map(
      (item) => `
    <div class="cart-item-row">
      <div>
        <strong>${item.name}</strong><br>
        <small>${item.price} ETB x ${item.qty}</small>
      </div>
      <div>
        <strong>${item.price * item.qty} ETB</strong>
      </div>
    </div>
  `,
    )
    .join("");
}

function toggleCart() {
  const drawer = document.getElementById("cart-drawer");
  if (drawer) drawer.classList.toggle("open");
}

function checkoutOrder() {
  if (userCart.length === 0) {
    alert("Your basket is empty!");
    return;
  }
  alert(
    "Thank you! Your order has been submitted successfully to Yishak Restaurant.",
  );
  userCart = [];
  renderCart();
  toggleCart();
}

// MENU CATEGORY FILTERING
function filterMenu(category, event) {
  const cards = document.querySelectorAll(".dish-card");
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach((btn) => btn.classList.remove("active"));
  if (event && event.target) {
    event.target.classList.add("active");
  }
  cards.forEach((card) => {
    if (category === "all" || card.getAttribute("data-category") === category) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}
