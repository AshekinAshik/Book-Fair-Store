// Create a <link> element for the external CSS file
const link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'style.css';
document.head.appendChild(link);

// Cart Page Functionality
function renderCartPage() {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || {};
    console.log(cart);
    const cartTableBody = document.getElementById("cartTableBody");
    const totalAmount = document.getElementById("totalAmount");

    if (!cartTableBody || !totalAmount) {
        console.error("Cart elements not found in cart.html");
        return;
    }

    cartTableBody.innerHTML = "";
    let total = 0;

    if (Object.keys(cart).length === 0) {
        cartTableBody.innerHTML = "<tr><td colspan='4' class='text-center'>Your cart is empty.</td></tr>";
        totalAmount.innerText = "Total: ৳0.00";
        return;
    }

    Object.entries(cart).forEach(([bookId, item]) => {
        let itemTotal = (parseFloat(item.price) * item.quantity).toFixed(2);
        total += parseFloat(itemTotal);

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>৳${item.price}</td>
            <td>${item.quantity}</td>
            <td>
                <button class="btn btn-sm remove-btn" onclick="removeFromCart(${bookId})">Remove</button>
            </td>
        `;
        cartTableBody.appendChild(row);
    });

    totalAmount.innerText = `Total: ৳${total.toFixed(2)}`;
}

// Function to remove an item from the cart
function removeFromCart(bookId) {
    let cart = JSON.parse(sessionStorage.getItem("cart")) || {};

    if (cart[bookId]) {
        delete cart[bookId];
        sessionStorage.setItem("cart", JSON.stringify(cart));
        renderCartPage(); // Refresh the cart after removal
        updateCartCount(); // Update cart count in header
    }
}

// Run renderCartPage only on cart.html
document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.includes("cart.html")) {
        renderCartPage();
    }
});