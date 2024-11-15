let totalPrice = 0;
let cartItemCount = 0;
let cartItems = [];

// Reference elements for cart display and cart controls
const cartImage = document.querySelector('.empty-cart');
const cartInfo = document.querySelector('.cart-info');
const cartHeader = document.querySelector('.cart-header');
const startNewOrder = document.querySelector('.start-new-order');

// Show the empty cart image and info by default
cartImage.style.display = 'block';
cartInfo.style.display = 'block';

// Attach click event to all 'Add to Cart' buttons
document.querySelectorAll('.btn').forEach((button) => {
    button.addEventListener('click', function () {
        const productCard = this.closest('.card');
        const productName = productCard.querySelector('.name').textContent;
        const productDescription = productCard.querySelector('.description').textContent;
        const productImage = productCard.querySelector('.images').src;
        const productPrice = productCard.querySelector('.price').textContent;

        const formattedPrice = parseFloat(productPrice.replace(/[^0-9.-]+/g, ""));
        cartItems.push({ name: productName, price: formattedPrice, description: productDescription });

        console.log("Item Added:", productName, productDescription, productImage, formattedPrice);

        updateCartItem(productName, formattedPrice, productImage, productDescription);
        
        cartItemCount += 1;
        showCartCount();
        
        totalPrice += formattedPrice;
        totalPriceDisplay();

        if (cartItemCount === 1) {
            cartImage.style.display = 'none';
            cartInfo.style.display = 'none';
        }
    });
});

function updateCartItem(productName, productPrice, productImage, productDescription) {
    const cartContent = document.createElement('li');
    cartContent.className = 'list-items';
    cartContent.innerHTML = `<span>${productDescription} - ₦${productPrice.toFixed(2)}</span>`;
    
    const cartContainer = document.querySelector('.cart-holder');
    cartContainer.appendChild(cartContent);
}

function totalPriceDisplay() {
    const total = document.querySelector('.total');
    total.innerHTML = "Order Total: ₦" + totalPrice.toFixed(2) + 
                      "<button class='neutral-btn'><img class='carbon-neutral' src='./assets/icon-carbon-neutral.svg' alt=''/> This is a <b>carbon-neutral</b> delivery </button>" +
                      "<button class='confirm-order-btn'>Confirm Order</button>";
    attachConfirmOrderListener();
}

function attachConfirmOrderListener() {
    const confirmOrderBtn = document.querySelector('.confirm-order-btn');
    if (confirmOrderBtn) {
        confirmOrderBtn.addEventListener('click', () => confirmOrderModal());
    }
}

function clearCartImage() {
    if (cartItemCount === 0) {
        cartImage.style.display = 'block';
        cartInfo.style.display = 'block';
    }
}

function showCartCount() {
    cartHeader.textContent = `Your cart (${cartItemCount})`;
}

function confirmOrderModal() {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class='modal-content'>
            <button class='close-modal-btn'>x</button>
            <img class='confirmed-logo' src='./assets/icon-order-confirmed.svg' alt='confirmed-logo'/>
            <h2>Order Confirmed</h2>
            <p>We hope you enjoy your food!</p>
            <ul class="order-summary"></ul>
            <button class='start-order-btn'>Start New Order</button>
        </div>`;
    document.body.appendChild(modal);

    const orderSummaryList = modal.querySelector('.order-summary');
    cartItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.description} - ₦${item.price.toFixed(2)}`;
        orderSummaryList.appendChild(listItem);
    });

    document.querySelector('.close-modal-btn').addEventListener('click', () => modal.remove());

    document.querySelector('.start-order-btn').addEventListener('click', () => {
        location.reload();
    });
}
