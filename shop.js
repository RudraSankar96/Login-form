
  // ✅ Load cart from localStorage if exists
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const cartCount = document.getElementById('cart-count');
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');

  // ✅ Add to cart button logic
  const addToCartBtns = document.querySelectorAll('.add-to-cart');
  addToCartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.product-card');
      const name = card.dataset.name;
      const price = parseInt(card.dataset.price);
      const image = card.dataset.image; // ✅ get image

      const existing = cart.find(item => item.name === name);
      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({ name, price, image, qty: 1 });
      }

      updateCartUI();
    });
  });

  // ✅ Update cart UI and localStorage
function updateCartUI() {
  localStorage.setItem('cart', JSON.stringify(cart));

  cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCount.classList.add('animate');
  setTimeout(() => cartCount.classList.remove('animate'), 400);

  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;">
      <div style="flex: 1;">
        <strong>${item.name}</strong><br>
        <span>₹${item.price * item.qty}</span>
      </div>
      <div class="qty-controls">
        <button onclick="decreaseQty(${index})">−</button>
        <span>${item.qty}</span>
        <button onclick="increaseQty(${index})">+</button>
      </div>
    `;

    li.style.display = 'flex';
    li.style.alignItems = 'center';
    li.style.justifyContent = 'space-between';
    li.style.gap = '10px';
    li.style.marginBottom = '10px';
    cartItems.appendChild(li);
    total += item.price * item.qty;
  });

  cartTotal.textContent = total;
}


  // ✅ Remove item from cart
  function removeItem(index) {
    if (cart[index].qty > 1) {
      cart[index].qty -= 1;
    } else {
      cart.splice(index, 1);
    }
    updateCartUI();
  }

  // ✅ Cart modal open/close
  const cartModal = document.getElementById('cart-modal');
  const openCart = document.getElementById('open-cart');
  const closeCart = document.getElementById('close-cart');

  openCart.onclick = () => cartModal.style.display = 'block';
  closeCart.onclick = () => cartModal.style.display = 'none';

  window.onclick = (e) => {
    if (e.target == cartModal) {
      cartModal.style.display = 'none';
    }
  };

  // ✅ Initial render
  updateCartUI();

function increaseQty(index) {
  cart[index].qty += 1;
  updateCartUI();
}

function decreaseQty(index) {
  if (cart[index].qty > 1) {
    cart[index].qty -= 1;
  } else {
    cart.splice(index, 1);
  }
  updateCartUI();
}
