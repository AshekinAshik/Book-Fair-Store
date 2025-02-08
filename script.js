const booksPerPage = 60;
let currentPage = parseInt(localStorage.getItem("currentPage")) || 1;
let books = [
    { "id": 1, "name": "The Whispering Pines", "price": "1100" },
    { "id": 2, "name": "Echoes of the Past", "price": "৳1800" },
    { "id": 3, "name": "Crimson Skies", "price": "৳1400" },
    { "id": 4, "name": "The Secret Garden", "price": "৳1200" },
    { "id": 5, "name": "Beyond the Stars", "price": "৳1600" },
    { "id": 6, "name": "A Journey of Hope", "price": "৳1000" },
    { "id": 7, "name": "The Lost City", "price": "৳1500" },
    { "id": 8, "name": "Shadow of the Wolf", "price": "৳1300" },
    { "id": 9, "name": "Dance of the Dragons", "price": "৳1700" },
    { "id": 10, "name": "The Silent Symphony", "price": "৳1900" },
    { "id": 11, "name": "The Raven's Curse", "price": "৳1200" },
    { "id": 12, "name": "Beneath the Moonlit Sea", "price": "৳1600" },
    { "id": 13, "name": "The Alchemist's Secret", "price": "৳1400" },
    { "id": 14, "name": "A Tale of Two Worlds", "price": "৳1800" },
    { "id": 15, "name": "The King's Gambit", "price": "৳1100" },
    { "id": 16, "name": "The Wandering Soul", "price": "৳1500" },
    { "id": 17, "name": "The Forgotten Prophecy", "price": "৳1300" },
    { "id": 18, "name": "The Serpent's Kiss", "price": "৳1700" },
    { "id": 19, "name": "The Last Unicorn", "price": "৳1900" },
    { "id": 20, "name": "The City of Gold", "price": "৳1000" },
    { "id": 21, "name": "The Warrior's Path", "price": "৳1200" },
    { "id": 22, "name": "The Enchanted Forest", "price": "৳1600" },
    { "id": 23, "name": "The Time Traveler's Clock", "price": "৳1400" },
    { "id": 24, "name": "The Dragon's Egg", "price": "৳1800" },
    { "id": 25, "name": "The Pirate's Treasure", "price": "৳1100" },
    { "id": 26, "name": "The Mystery of the Missing Heir", "price": "৳1500" },
    { "id": 27, "name": "The Ghost of Blackwood Manor", "price": "৳1300" },
    { "id": 28, "name": "The Legend of the Crystal Skull", "price": "৳1700" },
    { "id": 29, "name": "The Return of the King", "price": "৳1900" },
    { "id": 30, "name": "The Rise of the Fallen", "price": "৳1000" },
    { "id": 31, "name": "The Fall of an Empire", "price": "৳1200" },
    { "id": 32, "name": "The Dawn of a New Era", "price": "৳1600" },
    { "id": 33, "name": "The Chronicles of Narnia", "price": "৳1400" },
    { "id": 34, "name": "The Lord of the Rings", "price": "৳1800" },
    { "id": 35, "name": "Harry Potter and the Sorcerer's Stone", "price": "৳1100" },
    { "id": 36, "name": "Pride and Prejudice", "price": "৳1500" },
    { "id": 37, "name": "To Kill a Mockingbird", "price": "৳1300" },
    { "id": 38, "name": "The Great Gatsby", "price": "৳1700" },
    { "id": 39, "name": "1984", "price": "৳1900" },
    { "id": 40, "name": "Animal Farm", "price": "৳1000" },
    { "id": 41, "name": "Brave New World", "price": "৳1200" },
    { "id": 42, "name": "পথের পাঁচালি", "price": "৳1600" },
    { "id": 43, "name": "The Catcher in the Rye", "price": "৳1400" },
    { "id": 44, "name": "The Hobbit", "price": "৳1800" },
    { "id": 45, "name": "পাহাড়", "price": "৳1100" },
    { "id": 46, "name": "The Da Vinci Code", "price": "৳1500" },
    { "id": 47, "name": "The Girl with the Dragon Tattoo", "price": "৳1300" },
    { "id": 48, "name": "The Hunger Games", "price": "৳1700" },
    { "id": 49, "name": "The Book Thief", "price": "৳1900" },
    { "id": 50, "name": "Gone with the Wind", "price": "৳1000" },
    { "id": 51, "name": "Moby Dick", "price": "৳1200" },
    { "id": 52, "name": "Little Women", "price": "৳1600" },
    { "id": 53, "name": "Jane Eyre", "price": "৳1400" },
    { "id": 54, "name": "Wuthering Heights", "price": "৳1800" },
    { "id": 55, "name": "The Shadow of the Moon", "price": "৳1700" },
    { "id": 56, "name": "The Dragon's Hoard", "price": "৳1300" },
    { "id": 57, "name": "The Secret of the Sphinx", "price": "৳1100" },
    { "id": 58, "name": "The Wizard's Tower", "price": "৳1500" },
    { "id": 59, "name": "The Queen's Necklace", "price": "৳1900" },
    { "id": 60, "name": "The Knight's Quest", "price": "৳1200" },
    { "id": 61, "name": "The Pirate's Map", "price": "৳1600" },
    { "id": 62, "name": "The Lost Treasure", "price": "৳1400" },
    { "id": 63, "name": "The Hidden Door", "price": "৳1800" },
    { "id": 64, "name": "The Forgotten City", "price": "৳1000" },
    { "id": 65, "name": "The Mysterious Island", "price": "৳1700" },
    { "id": 66, "name": "The Journey to the Center of the Earth", "price": "৳1300" },
    { "id": 67, "name": "The Time Machine", "price": "৳1100" },
    { "id": 68, "name": "The War of the Worlds", "price": "৳1500" },
    { "id": 69, "name": "The Invisible Man", "price": "৳1900" },
    { "id": 70, "name": "The Island of Dr. Moreau", "price": "৳1200" },
    { "id": 71, "name": "The Strange Case of Dr. Jekyll and Mr. Hyde", "price": "৳1600" },
    { "id": 72, "name": "Frankenstein", "price": "৳1400" },
    { "id": 73, "name": "Dracula", "price": "৳1800" },
    { "id": 74, "name": "The Hound of the Baskervilles", "price": "৳1000" },
    { "id": 75, "name": "A Study in Scarlet", "price": "৳1700" },
    { "id": 76, "name": "The Sign of Four", "price": "৳1300" },
    { "id": 77, "name": "The Adventures of Sherlock Holmes", "price": "৳1100" },
    { "id": 78, "name": "The Memoirs of Sherlock Holmes", "price": "৳1500" },
    { "id": 79, "name": "The Return of Sherlock Holmes", "price": "৳1900" },
    { "id": 80, "name": "The Valley of Fear", "price": "৳1200" },
    { "id": 81, "name": "His Last Bow", "price": "৳1600" },
    { "id": 82, "name": "The Case-Book of Sherlock Holmes", "price": "৳1400" },
    { "id": 83, "name": "The Adventures of Tom Sawyer", "price": "৳1800" },
    { "id": 84, "name": "The Adventures of Huckleberry Finn", "price": "৳1000" },
    { "id": 85, "name": "The Prince and the Pauper", "price": "৳1700" },
    { "id": 86, "name": "A Connecticut Yankee in King Arthur's Court", "price": "৳1300" },
    { "id": 87, "name": "Life on the Mississippi", "price": "৳1100" },
    { "id": 88, "name": "The Silent Symphony", "price": "৳1900" },
    { "id": 89, "name": "The Raven's Curse", "price": "৳1200" },
    { "id": 90, "name": "Beneath the Moonlit Sea", "price": "৳1600" },
    { "id": 91, "name": "The Alchemist's Secret", "price": "৳1400" },
    { "id": 92, "name": "A Tale of Two Worlds", "price": "৳1800" },
    { "id": 93, "name": "The King's Gambit", "price": "৳1100" },
    { "id": 94, "name": "The Wandering Soul", "price": "৳1500" },
    { "id": 95, "name": "The Forgotten Prophecy", "price": "৳1300" },
    { "id": 96, "name": "The Serpent's Kiss", "price": "৳1700" },
    { "id": 97, "name": "The Last Unicorn", "price": "৳1900" },
    { "id": 98, "name": "The City of Gold", "price": "৳1000" },
    { "id": 99, "name": "The Warrior's Path", "price": "৳1200" },
    { "id": 100, "name": "The Enchanted Forest", "price": "৳1600" },
    { "id": 101, "name": "The Time Traveler's Clock", "price": "৳1400" },
    { "id": 102, "name": "The Dragon's Egg", "price": "৳1800" },
    { "id": 103, "name": "The Pirate's Treasure", "price": "৳1100" },
    { "id": 104, "name": "The Mystery of the Missing Heir", "price": "৳1500" },
    { "id": 105, "name": "The Ghost of Blackwood Manor", "price": "৳1300" },
    { "id": 106, "name": "The Legend of the Crystal Skull", "price": "৳1700" },
    { "id": 107, "name": "The Return of the King", "price": "৳1900" },
    { "id": 108, "name": "The Rise of the Fallen", "price": "৳1000" },
    { "id": 109, "name": "The Fall of an Empire", "price": "৳1200" },
    { "id": 110, "name": "The Dawn of a New Era", "price": "৳1600" },
    { "id": 111, "name": "The Chronicles of Narnia", "price": "৳1400" },
    { "id": 112, "name": "The Lord of the Rings", "price": "৳1800" },
    { "id": 113, "name": "Harry Potter and the Sorcerer's Stone", "price": "৳1100" },
    { "id": 114, "name": "Pride and Prejudice", "price": "৳1500" },
    { "id": 115, "name": "To Kill a Mockingbird", "price": "৳1300" },
    { "id": 116, "name": "The Great Gatsby", "price": "৳1700" },
    { "id": 117, "name": "1984", "price": "৳1900" },
    { "id": 118, "name": "Animal Farm", "price": "৳1000" },
    { "id": 119, "name": "Brave New World", "price": "৳1200" },
    { "id": 120, "name": "Fahrenheit 451", "price": "৳1600" }
];

let cart = {};

// Sample books data (Replace with actual JSON data)
// for (let i = 1; i <= 300; i++) {
//     books.push({ id: i, name: `Book ${i}`, price: (Math.random() * 50 + 10).toFixed(2) });
// }

let filteredBooks = [...books];

function renderBooks() {
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = "";
    let start = (currentPage - 1) * booksPerPage;
    let end = start + booksPerPage;
    let paginatedBooks = filteredBooks.slice(start, end);

    paginatedBooks.forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.className = "col-md-2 book-card";
        bookCard.innerHTML = `
            <h5>${book.name}</h5>
            <p>Price: ${book.price}</p>
            <button class="btn btn-primary" onclick="addToCart(${book.id})">Add to Cart</button>
        `;
        bookList.appendChild(bookCard);
    });
}

function setupPagination() {
    const pageNumbers = document.getElementById("pageNumbers");
    pageNumbers.innerHTML = "";
    let totalPages = Math.ceil(filteredBooks.length / booksPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.innerText = i;
        pageButton.className = `btn ${i === currentPage ? "btn-primary active" : "btn-light"}`;
        pageButton.onclick = () => changePage(i);
        pageNumbers.appendChild(pageButton);
    }
}

function changePage(page) {
    currentPage = page;
    localStorage.setItem("currentPage", currentPage);
    renderBooks();
    setupPagination();
}

document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) changePage(currentPage - 1);
});

document.getElementById("nextPage").addEventListener("click", () => {
    let totalPages = Math.ceil(filteredBooks.length / booksPerPage);
    if (currentPage < totalPages) changePage(currentPage + 1);
});

// function addToCart(bookId) {
//     cart[bookId] = (cart[bookId] || 0) + 1;
//     localStorage.setItem("cart", JSON.stringify(cart));
//     updateCartCount();
// }

// function updateCartCount() {
//     document.getElementById("cartCount").innerText = Object.values(cart).reduce((a, b) => a + b, 0);
// }

// function addToCart(bookId) {
//     let book = books.find(b => b.id == bookId);

//     if (!book) return;

//     if (!cart[bookId]) {
//         cart[bookId] = { name: book.name, price: book.price, quantity: 1 };
//     } else {
//         cart[bookId].quantity += 1;
//     }

//     localStorage.setItem("cart", JSON.stringify(cart));
//     updateCartCount();
// }

// function updateCartCount() {
//     let totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
//     document.getElementById("cartCount").innerText = totalItems;
// }

function addToCart(bookId) {
    let book = books.find(b => b.id === bookId);
    if (!book) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || {};

    // Ensure price is stored as a number (remove currency symbols)
    let bookPrice = parseFloat(book.price.replace(/[^\d.]/g, ""));

    if (cart[bookId]) {
        cart[bookId].quantity += 1;
    } else {
        cart[bookId] = {
            id: book.id,
            name: book.name,
            price: bookPrice, // Storing price as a number
            quantity: 1
        };
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

// Update cart count in the header
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    let totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cartCount").innerText = totalItems;
}

function searchBooks() {
    const query = document.getElementById("searchBox").value.toLowerCase();
    filteredBooks = books.filter(book => book.name.toLowerCase().includes(query));
    currentPage = 1;
    localStorage.setItem("currentPage", currentPage);
    renderBooks();
    setupPagination();
}

document.getElementById("searchBox").addEventListener("input", searchBooks);

document.getElementById("cartButton").addEventListener("click", () => {
    window.location.href = "cart.html";
});

// Cart Page Functionality
function renderCartPage() {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    const cartList = document.getElementById("cartList");
    const totalAmount = document.getElementById("totalAmount");

    if (!cartList || !totalAmount) return;

    cartList.innerHTML = "";
    let total = 0;

    if (Object.keys(cart).length === 0) {
        cartList.innerHTML = "<p>Your cart is empty.</p>";
        totalAmount.innerText = "Total: ৳0.00";
        return;
    }

    Object.keys(cart).forEach(bookId => {
        let item = cart[bookId];
        let itemTotal = (item.price * item.quantity).toFixed(2);
        total += parseFloat(itemTotal);

        const cartItem = document.createElement("div");
        cartItem.className = "cart-item p-2 border-bottom d-flex justify-content-between align-items-center";
        cartItem.innerHTML = `
            <div>
                <h5>${item.name}</h5>
                <p>Price: ৳${item.price} x ${item.quantity} = <strong>৳${itemTotal}</strong></p>
            </div>
            <div>
                <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
        cartList.appendChild(cartItem);
    });

    totalAmount.innerText = `Total: ৳${total.toFixed(2)}`;
}

// Remove item from cart
function removeFromCart(bookId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    if (!cart[bookId]) return;

    delete cart[bookId];

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartPage(); // Refresh cart
    updateCartCount(); // Update count in header
}

// Run only on cart page
window.onload = function () {
    if (window.location.pathname.includes("cart.html")) {
        renderCartPage();
    }
};


updateCartCount();
renderBooks();
setupPagination();
