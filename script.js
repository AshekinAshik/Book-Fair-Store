// Create a <link> element for the external CSS file
const link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'style.css';
document.head.appendChild(link);

const booksPerPage = 60;
let currentPage = parseInt(localStorage.getItem("currentPage")) || 1;
const books = [
    { "id": 1, "name": "পথের পাঁচালি", "price": "1600" },
    { "id": 2, "name": "The Whispering Pines", "price": "1100" },
    { "id": 3, "name": "নীল আকাশের নিচে", "price": "1400" },
    { "id": 4, "name": "The Secret Garden", "price": "1200" },
    { "id": 5, "name": "হারানো স্বপ্ন", "price": "1800" },
    { "id": 6, "name": "Beyond the Stars", "price": "1600" },
    { "id": 7, "name": "সূর্যের দেশে", "price": "1000" },
    { "id": 8, "name": "A Journey of Hope", "price": "1500" },
    { "id": 9, "name": "রাতের আকাশ", "price": "1300" },
    { "id": 10, "name": "The Lost City", "price": "1700" },
    { "id": 11, "name": "সবুজ বনানী", "price": "1900" },
    { "id": 12, "name": "Shadow of the Wolf", "price": "1100" },
    { "id": 13, "name": "নদীর কূলে", "price": "1600" },
    { "id": 14, "name": "Dance of the Dragons", "price": "1400" },
    { "id": 15, "name": "হাজার তারার রাত", "price": "1800" },
    { "id": 16, "name": "The Silent Symphony", "price": "1200" },
    { "id": 17, "name": "বৃষ্টির গান", "price": "1000" },
    { "id": 18, "name": "The Raven's Curse", "price": "1500" },
    { "id": 19, "name": "মেঘের আড়ালে", "price": "1300" },
    { "id": 20, "name": "Beneath the Moonlit Sea", "price": "1700" },
    { "id": 21, "name": "সোনালী দিন", "price": "1900" },
    { "id": 22, "name": "The Alchemist's Secret", "price": "1100" },
    { "id": 23, "name": "চাঁদের আলোয়", "price": "1600" },
    { "id": 24, "name": "A Tale of Two Worlds", "price": "1400" },
    { "id": 25, "name": "রুপোর নদী", "price": "1800" },
    { "id": 26, "name": "The King's Gambit", "price": "1200" },
    { "id": 27, "name": "স্বপ্নের রাজ্যে", "price": "1000" },
    { "id": 28, "name": "The Wandering Soul", "price": "1500" },
    { "id": 29, "name": "আকাশের ঠিকানা", "price": "1300" },
    { "id": 30, "name": "The Forgotten Prophecy", "price": "1700" },
    { "id": 31, "name": "হারানো দ্বীপ", "price": "1900" },
    { "id": 32, "name": "The Serpent's Kiss", "price": "1100" },
    { "id": 33, "name": "বালির কণা", "price": "1600" },
    { "id": 34, "name": "The Last Unicorn", "price": "1400" },
    { "id": 35, "name": "নীল সাগর", "price": "1800" },
    { "id": 36, "name": "The City of Gold", "price": "1200" },
    { "id": 37, "name": "সবুজ পাতা", "price": "1000" },
    { "id": 38, "name": "The Warrior's Path", "price": "1500" },
    { "id": 39, "name": "রাতের তারা", "price": "1300" },
    { "id": 40, "name": "The Enchanted Forest", "price": "1700" },
    { "id": 41, "name": "সোনালী পাখি", "price": "1900" },
    { "id": 42, "name": "The Time Traveler's Clock", "price": "1100" },
    { "id": 43, "name": "রুপোর মেঘ", "price": "1600" },
    { "id": 44, "name": "The Dragon's Egg", "price": "1400" },
    { "id": 45, "name": "নীল আকাশ", "price": "1800" },
    { "id": 46, "name": "The Pirate's Treasure", "price": "1200" },
    { "id": 47, "name": "সবুজ মাঠ", "price": "1000" },
    { "id": 48, "name": "The Mystery of the Missing Heir", "price": "1500" },
    { "id": 49, "name": "রাতের বৃষ্টি", "price": "1300" },
    { "id": 50, "name": "The Ghost of Blackwood Manor", "price": "1700" },
    { "id": 51, "name": "হারানো স্মৃতি", "price": "1900" },
    { "id": 52, "name": "The Legend of the Crystal Skull", "price": "1100" },
    { "id": 53, "name": "সূর্যের আলো", "price": "1600" },
    { "id": 54, "name": "The Return of the King", "price": "1400" },
    { "id": 55, "name": "নীল নদী", "price": "1800" },
    { "id": 56, "name": "The Rise of the Fallen", "price": "1200" },
    { "id": 57, "name": "সবুজ পাহাড়", "price": "1000" },
    { "id": 58, "name": "The Fall of an Empire", "price": "1500" },
    { "id": 59, "name": "রাতের পাখি", "price": "1300" },
    { "id": 60, "name": "The Dawn of a New Era", "price": "1700" },
    { "id": 61, "name": "হারানো সোনা", "price": "1900" },
    { "id": 62, "name": "The Chronicles of Narnia", "price": "1100" },
    { "id": 63, "name": "চাঁদের হাসি", "price": "1600" },
    { "id": 64, "name": "The Lord of the Rings", "price": "1400" },
    { "id": 65, "name": "রুপোর তারা", "price": "1800" },
    { "id": 66, "name": "Harry Potter and the Sorcerer's Stone", "price": "1200" },
    { "id": 67, "name": "সোনালী সূর্য", "price": "1000" },
    { "id": 68, "name": "Pride and Prejudice", "price": "1500" },
    { "id": 69, "name": "নীল সমুদ্র", "price": "1300" },
    { "id": 70, "name": "To Kill a Mockingbird", "price": "1700" },
    { "id": 71, "name": "হারানো প্রেম", "price": "1900" },
    { "id": 72, "name": "The Great Gatsby", "price": "1100" },
    { "id": 73, "name": "সূর্যের ডাক", "price": "1600" },
    { "id": 74, "name": "1984", "price": "1400" },
    { "id": 75, "name": "নীল আকাশের তারা", "price": "1800" },
    { "id": 76, "name": "Animal Farm", "price": "1200" },
    { "id": 77, "name": "সবুজ বন", "price": "1000" },
    { "id": 78, "name": "Brave New World", "price": "1500" },
    { "id": 79, "name": "রাতের ফুল", "price": "1300" },
    { "id": 80, "name": "Fahrenheit 451", "price": "1700" },
    { "id": 81, "name": "হারানো স্বর্গ", "price": "1900" },
    { "id": 82, "name": "The Catcher in the Rye", "price": "1100" },
    { "id": 83, "name": "চাঁদের কণা", "price": "1600" },
    { "id": 84, "name": "The Hobbit", "price": "1400" },
    { "id": 85, "name": "রুপোর পাখি", "price": "1800" },
    { "id": 86, "name": "And Then There Were None", "price": "1200" },
    { "id": 87, "name": "সোনালী নদী", "price": "1000" },
    { "id": 88, "name": "The Da Vinci Code", "price": "1500" },
    { "id": 89, "name": "নীল পাহাড়", "price": "1300" },
    { "id": 90, "name": "The Girl with the Dragon Tattoo", "price": "1700" },
    { "id": 91, "name": "হারানো রাজ্য", "price": "1900" },
    { "id": 92, "name": "The Hunger Games", "price": "1100" },
    { "id": 93, "name": "সূর্যের গান", "price": "1600" },
    { "id": 94, "name": "The Book Thief", "price": "1400" },
    { "id": 95, "name": "নীল মেঘ", "price": "1800" },
    { "id": 96, "name": "Gone with the Wind", "price": "1200" },
    { "id": 97, "name": "সবুজ সাগর", "price": "1000" },
    { "id": 98, "name": "Moby Dick", "price": "1500" },
    { "id": 99, "name": "রাতের আলো", "price": "1300" },
    { "id": 100, "name": "Little Women", "price": "1700" },
    { "id": 101, "name": "হারানো সময়", "price": "1900" },
    { "id": 102, "name": "Jane Eyre", "price": "1100" },
    { "id": 103, "name": "চাঁদের দেশে", "price": "1600" },
    { "id": 104, "name": "Wuthering Heights", "price": "1400" },
    { "id": 105, "name": "রুপোর বৃষ্টি", "price": "1800" },
    { "id": 106, "name": "The Shadow of the Moon", "price": "1200" },
    { "id": 107, "name": "সোনালী মাঠ", "price": "1000" },
    { "id": 108, "name": "The Dragon's Hoard", "price": "1500" },
    { "id": 109, "name": "নীল পাতা", "price": "1300" },
    { "id": 110, "name": "The Secret of the Sphinx", "price": "1700" },
    { "id": 111, "name": "হারানো স্বপ্নের সন্ধানে", "price": "1900" },
    { "id": 112, "name": "The Wizard's Tower", "price": "1100" },
    { "id": 113, "name": "সূর্যের ফুল", "price": "1600" },
    { "id": 114, "name": "The Queen's Necklace", "price": "1400" },
    { "id": 115, "name": "নীল আকাশের পাখি", "price": "1800" },
    { "id": 116, "name": "The Knight's Quest", "price": "1200" },
    { "id": 117, "name": "সবুজ বনের রহস্য", "price": "1000" },
    { "id": 118, "name": "The Pirate's Map", "price": "1500" },
    { "id": 119, "name": "রাতের রানী", "price": "1300" },
    { "id": 120, "name": "The Lost Treasure", "price": "1700" },
    { "id": 121, "name": "হারানো ভালোবাসা", "price": "1900" },
    { "id": 122, "name": "The Hidden Door", "price": "1100" },
    { "id": 123, "name": "চাঁদের আলোয় রাত", "price": "1600" },
    { "id": 124, "name": "The Forgotten City", "price": "1400" },
    { "id": 125, "name": "রুপোর নৌকা", "price": "1800" },
    { "id": 126, "name": "The Mysterious Island", "price": "1200" },
    { "id": 127, "name": "সোনালী সমুদ্র", "price": "1000" },
    { "id": 128, "name": "The Journey to the Center of the Earth", "price": "1500" },
    { "id": 129, "name": "নীল ঝড়", "price": "1300" },
    { "id": 130, "name": "The Time Machine", "price": "1700" },
    { "id": 131, "name": "হারানো স্মৃতির খোঁজে", "price": "1900" },
    { "id": 132, "name": "The War of the Worlds", "price": "1100" },
    { "id": 133, "name": "সূর্যের পাখি", "price": "1600" },
    { "id": 134, "name": "The Invisible Man", "price": "1400" },
    { "id": 135, "name": "নীল রাত", "price": "1800" },
    { "id": 136, "name": "The Island of Dr. Moreau", "price": "1200" },
    { "id": 137, "name": "সবুজ দ্বীপ", "price": "1000" },
    { "id": 138, "name": "The Strange Case of Dr. Jekyll and Mr. Hyde", "price": "1500" },
    { "id": 139, "name": "রাতের স্বপ্ন", "price": "1300" },
    { "id": 140, "name": "Frankenstein", "price": "1700" },
    { "id": 141, "name": "হারানো রহস্য", "price": "1900" },
    { "id": 142, "name": "Dracula", "price": "1100" },
    { "id": 143, "name": "চাঁদের আলো", "price": "1600" },
    { "id": 144, "name": "The Hound of the Baskervilles", "price": "1400" },
    { "id": 145, "name": "রুপোর ফুল", "price": "1800" },
    { "id": 146, "name": "A Study in Scarlet", "price": "1200" },
    { "id": 147, "name": "সোনালী পাথর", "price": "1000" },
    { "id": 148, "name": "The Sign of Four", "price": "1500" },
    { "id": 149, "name": "নীল সময়", "price": "1300" },
    { "id": 150, "name": "The Adventures of Sherlock Holmes", "price": "1700" },
    { "id": 151, "name": "হারানো সন্ধান", "price": "1900" },
    { "id": 152, "name": "The Memoirs of Sherlock Holmes", "price": "1100" },
    { "id": 153, "name": "সূর্যের রশ্মি", "price": "1600" },
    { "id": 154, "name": "The Return of Sherlock Holmes", "price": "1400" },
    { "id": 155, "name": "নীল তারা", "price": "1800" },
    { "id": 156, "name": "The Valley of Fear", "price": "1200" },
    { "id": 157, "name": "সবুজ আকাশ", "price": "1000" },
    { "id": 158, "name": "His Last Bow", "price": "1500" },
    { "id": 159, "name": "রাতের বাজপাখি", "price": "1300" },
    { "id": 160, "name": "The Case-Book of Sherlock Holmes", "price": "1700" },
    { "id": 161, "name": "হারানো জগৎ", "price": "1900" },
    { "id": 162, "name": "The Adventures of Tom Sawyer", "price": "1100" },
    { "id": 163, "name": "চাঁদের রহস্য", "price": "1600" },
    { "id": 164, "name": "The Adventures of Huckleberry Finn", "price": "1400" },
    { "id": 165, "name": "রুপোর পাহাড়", "price": "1800" },
];

let filteredBooks = [...books];

function renderBooks() {
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = ""; // Clear existing books

    let start = (currentPage - 1) * booksPerPage;
    let end = start + booksPerPage;
    let paginatedBooks = filteredBooks.slice(start, end);

    paginatedBooks.forEach(book => {
        bookList.innerHTML += `
            <div class="col-md-2 book-card">
                <h5>${book.name}</h5>
                <p>Price: ৳ ${book.price}</p>
                <button class="btn btn-primary" onclick="addToCart(${book.id})">Add to Cart</button>
            </div>
        `;
    });
}

function setupPagination() {
    const pageNumbers = document.getElementById("pageNumbers");
    pageNumbers.innerHTML = "";

    let totalPages = Math.ceil(filteredBooks.length / booksPerPage);
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.innerHTML += `<button class="btn ${i === currentPage ? "btn-primary active" : "btn-light"}" onclick="changePage(${i})">${i}</button>`;
    }

    // Disable Prev/Next buttons when needed
    document.getElementById("prevPage").disabled = currentPage === 1;
    document.getElementById("nextPage").disabled = currentPage === totalPages;
}

function changePage(page) {
    currentPage = page;
    localStorage.setItem("currentPage", currentPage); // Update page in localStorage
    renderBooks();
    setupPagination();
}

document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) changePage(currentPage - 1);
});

document.getElementById("nextPage").addEventListener("click", () => {
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
    if (currentPage < totalPages) changePage(currentPage + 1);
});

function addToCart(bookId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    let book = books.find(b => b.id === bookId);
    if (!book) return;

    let bookPrice = parseFloat(book.price.replace(/[^\d.]/g, "")); // Price as number

    // Add or update the book in the cart
    cart[bookId] = cart[bookId] || { id: book.id, name: book.name, price: bookPrice, quantity: 0 };
    cart[bookId].quantity += 1;

    localStorage.setItem("cart", JSON.stringify(cart)); // Save updated cart
    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cartCount").innerText = totalItems;
}

function searchBooks() {
    const query = document.getElementById("searchBox").value.toLowerCase();
    filteredBooks = books.filter(book => book.name.toLowerCase().includes(query));
    currentPage = 1; // Reset to the first page on search
    localStorage.setItem("currentPage", currentPage); // Update page in localStorage
    renderBooks();
    setupPagination();
}

document.getElementById("searchBox").addEventListener("input", searchBooks);
document.getElementById("cartButton").addEventListener("click", () => {
    window.location.href = "cart.html";
});

updateCartCount();
renderBooks();
setupPagination();
