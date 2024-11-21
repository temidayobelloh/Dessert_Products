
let totalPrice = 0;
let cartItemCount = 0;

//storing the cart items to be displayed  in the order summary
let cartItems = [];

// Referencing the elements for cart display and cart controls
const cartImage = document.querySelector('.empty-cart');
const cartInfo = document.querySelector('.cart-info');
const cartHeader = document.querySelector('.cart-header');
const startNewOrder = document.querySelector('.start-new-order');

// Show the empty cart image and info by default when the user logs in
cartImage.style.display = 'block';
cartInfo.style.display = 'block';

// Attach click event to all 'Add to Cart' buttons so that when the user selects on an item it executes the function
document.querySelectorAll('.btn').forEach((button) => {
    button.addEventListener('click', function () {
        const productCard = this.closest('.card');
        const productName = productCard.querySelector('.name').textContent;
        const productDescription = productCard.querySelector('.description').textContent;
        const productImage = productCard.querySelector('.images').src;
        const productPrice = productCard.querySelector('.price').textContent;

        //Here i am making the  Product price to be able to be used to perform mathematical operations
        const formattedPrice = parseFloat(productPrice.replace(/[^0-9.-]+/g, ""));

        //this is used to add items to the cart items section of the UI
        cartItems.push({ name: productName, price: formattedPrice, description: productDescription });

        //here i am invoking the update Cart Items function and passing the elements of the Cart Items as parameter
        updateCartItem(productName, formattedPrice, productImage, productDescription);
        
        //This keeps track of the cartItemCount header that will be dynamically updated as the user interracts with cart items
        cartItemCount += 1;
        //Invoking the showCartCount function here as well
        showCartCount();
        
        //this helps to increment the formattedPrice based on the total cart items of the user then the function is executed to display the totalPrice
        totalPrice += formattedPrice;
        totalPriceDisplay();

        //ensures that the cartItemCount reflects the content as contained in the cart
        if (cartItemCount === 1) {
            cartImage.style.display = 'none';
            cartInfo.style.display = 'none';
        }
    });
});

function updateCartItem(productName, productPrice, productImage, productDescription) {
    const cartContent = document.createElement('li');
    cartContent.className = 'list-items';
    cartContent.innerHTML = `<span>${productDescription} - ₦${productPrice.toFixed(2)}</span> <button class="close-list">x</button>`;
    
    //here i am attaching/appending the list item to its parent container being the UI
    const cartContainer = document.querySelector('.cart-holder');
    cartContainer.appendChild(cartContent);

    // Attach event listener for removing the list items
    const closeBtn = cartContent.querySelector('.close-list');
    closeBtn.addEventListener('click', () => {
        // Remove the list item from the DOM, i ensured i attched the event to the li item
        cartContent.remove();

        // Update the total price and cart count as the user deselects an item
        totalPrice -= productPrice;
        cartItemCount -= 1;
        showCartCount();

        // Update cartItems array: Remove the first matching item
        const index = cartItems.findIndex(item => item.name === productName && item.price === productPrice);
        if (index !== -1) cartItems.splice(index, 1);

        // Update the total price display and check for empty cart
        totalPriceDisplay();
        
        // Show the empty cart image and info if cart is empty
        if (cartItemCount === 0) {
            clearCartImage();
        }
    });
}

function totalPriceDisplay() {
    const total = document.querySelector('.total');
    if (cartItemCount > 0) {
        total.innerHTML = "Order Total: ₦" + totalPrice.toFixed(2) + 
                          "<button class='neutral-btn'><img class='carbon-neutral' src='./assets/icon-carbon-neutral.svg' alt=''/> This is a <b>carbon-neutral</b> delivery </button>" +
                          "<button class='confirm-order-btn'>Confirm Order</button>";
        attachConfirmOrderListener();
    } else {
        // Clear the total display when cart is empty
        total.innerHTML = "";
    }
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
            <h3 class="total-order-price"></h3>
            <button class='start-order-btn'>Start New Order</button>
        </div>`;
    document.body.appendChild(modal);

    const orderSummaryList = modal.querySelector('.order-summary');
    cartItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.classList.add('order-item');
        listItem.innerHTML = `${item.description} - ₦${item.price.toFixed(2)}`;
        orderSummaryList.appendChild(listItem);
    });
    //Add the total order price to the order summary beneath it
    const totalOrderPrice = modal.querySelector('.total-order-price');
    totalOrderPrice.textContent =  `Total Order Price: ₦${totalPrice.toFixed(2)}`; // Display total price here

    document.querySelector('.close-modal-btn').addEventListener('click', () => modal.remove());

    document.querySelector('.start-order-btn').addEventListener('click', () => {
        location.reload();
    });
}
