let totalPrice = 0;

document.querySelectorAll('.btn').forEach((button)=>{
    button.addEventListener('click', function (){
        const productCard = this.closest('.card') // allows one to get the parent container of the products so that one will be able to dynamically manipulate the siblings (being the product items details)
        const productName = productCard.querySelector('.name').textContent;
        const productDescription = productCard.querySelector('.description').textContent;
        const productImage = productCard.querySelector('.images').src;
        const productPrice = productCard.querySelector('.price').textContent;
        //Converting the price into a float for calculations
        const formattedPrice = parseFloat(productPrice.replace(/[^0-9.-]+/g, ""));
        //Here, since i have access to the parent container of the product items i will then be using it to acess the siblings one by one, i am adding textContent so that i will be able to retrieve the value that is attached to the element on the html side.
        console.log("Items Added:", productName, productDescription, productImage, productPrice);
        //Call the function to update the cart items with the product details selected by the user
        updateCartItem(productName, formattedPrice, productImage, productDescription);
        //call the total price display function here
        totalPrice += formattedPrice;
        totalPriceDisplay();
    });
});
//Next, i will create a list item that will dynamically display the details of the products in the cart section, this is created using a function

function updateCartItem(productName, productPrice, productImage, productDescription) {
    const cartContent = document.createElement('li');
    cartContent.className ='list-items';
    cartContent.innerHTML = `<span>${productDescription} - ₦${productPrice.toFixed(2)}</span>`;
    
    // Append the list items to the cart item container
    const cartContainer = document.querySelector('.cart-holder');
    cartContainer.appendChild(cartContent);
}

//create a function to calculate the total price

function totalPriceDisplay(){
    const total = document.querySelector('.total');
    total.textContent = 'Total:  ₦' + totalPrice.toFixed(2);
}