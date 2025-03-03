// Create a <link> element for the external CSS file
const link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'style.css';
document.head.appendChild(link);

let paymentAmount = 0;

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
    paymentAmount = total.toFixed(2);
    console.log(paymentAmount);
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


// AUTHENTICATE
async function authentication() {
    const clientId = "1103472d3be149ecb0b62020059e7fd8";
    const clientSecret = "876e2b94b18e2219";

    const authHeader = btoa(`${clientId}:${clientSecret}`);

    try {
        const response = await fetch('https://api-UAT.dgepay.net/dipon/v3/payment_gateway/authenticate', {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${authHeader}`
            }
        });

        const data = await response.text();  // Get the response as text (XML format)
        console.log(data)

        if (response.ok) {
            // Parse the XML response
            // const parser = new DOMParser();
            // const xmlDoc = parser.parseFromString(data, 'application/xml');
            // const statusCode = xmlDoc.getElementsByTagName('status_code')[0].textContent;
            const parseData = JSON.parse(data)
            console.log("res", parseData)
            // const data = response.data
            if (parseData?.status_code === 200) {
                // const accessToken = xmlDoc.getElementsByTagName('access_token')[0].textContent;
                // Save access token to sessionStorage
                const accessToken = parseData?.data?.access_token;
                sessionStorage.setItem('access_token', accessToken);
                // Redirect to transaction page
                // window.location.href = 'transaction.html';
                transaction();
            } else {
                throw new Error('Authentication failed');
            }
        } else {
            throw new Error('Request failed');
        }
    } catch (error) {
        console.log(error.message);
    }
}

// new code for signature
function createCheckSum(payload) {
    let checkSumString = '';
    let stringPayload;

    try {
        stringPayload = JSON.stringify(payload)
        // console.log("stringPayload", stringPayload)
        checkSumString = stringPayload.replace(/[{}\[\]=\s,"":]/g, "")

        console.log("\n checkSumString", checkSumString)
        return checkSumString;
    } catch (e) {
        console.error(e?.stack);
        return;
    }
}

function encryptPayload(body, SECRET_KEY) {
    const key = CryptoJS.enc.Utf8.parse(SECRET_KEY); // Assuming password is 16 bytes or less
    // Ensure key is 16 bytes (similar to Java's `Arrays.copyOf(secretKey.getBytes("UTF-8"), 16);`)
    const key16 = key.clone(); // Ensure we are not modifying the original key object
    key16.words = key16.words.slice(0, 4);  // slice the array to ensure it is exactly 16 bytes long
    // Encrypt the data using AES in ECB mode with PKCS7 padding
    const encrypted = CryptoJS.AES.encrypt(body, key16, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7  // Ensure the padding is PKCS7, like Java default
    });
    // Convert the result (CipherParams) to Base64 and return
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}

function sanitizeString(input) {
    input = JSON.stringify(input);
    console.log("Original String:", input);
    // Use a regular expression to remove unwanted characters
    const sanitizedString = input.replace(/[{\"}:, ]/g, '');
    console.log("Sanitized String:", sanitizedString);
    return sanitizedString;
}

function formatParams(params) {
    let formatted = "";
    const sortedKeys = Object.keys(params).sort(); // Sort the keys alphabetically
    for (const key of sortedKeys) {
        const value = params[key];
        if (typeof value === 'object' && value !== null) {
            formatted += key + formatParams(value); // Handle nested objects with sorted keys
        } else {
            formatted += key + value;
        }
    }
    return formatted;
}

function generateUDID() {
    // Generate a random unique identifier
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0; // Generate a random number
        const v = c === 'x' ? r : (r & 0x3) | 0x8; // Apply RFC 4122 rules for UUID
        return v.toString(16); // Convert to hexadecimal
    });
}

async function transaction() {
    let amount = paymentAmount;
    const accessToken = sessionStorage.getItem('access_token');
    console.log(accessToken);

    if (!accessToken) {
        console.log("no accessToken");
        errorMessage.textContent = 'Authentication failed. Please log in again.';
        return;
    }

    amount = parseFloat(amount);
    // Prepare transaction data
    const params = {
        // amount: amount + .21,
        amount: amount + 0.01,
        customer_token: null,
        note: "Purchasing Test E Ticket",
        payee_information: {
            dial_code: '+88',
            phone_number: '01711111111'
        },
        payment_method: null,
        redirect_url: 'https://www.google.com/',
        unique_txn_id: generateUDID()
        //unique_txn_id: 'XYZ_002'
    };
    console.log(params.amount);

    // Format the parameters into a single string and sanitize
    const formattedParams = sanitizeString(formatParams(params));


    // Generate HMAC Signature
    const apiKey = "b4ecb09a87bd4c38bec5e35337e5e2d0";

    // New Code for signature
    requestPayload = Object.keys(params).sort().reduce(function (result, key) {
        result[key] = params[key];
        return result;
    }, {});
    let payloadStr = this.createCheckSum(requestPayload);
    const hmac = CryptoJS.HmacSHA256(payloadStr, apiKey);
    const signature = CryptoJS.enc.Base64.stringify(hmac);
    //End

    // Encrypt payload
    const secretKey = "876e2b94b18e2219";
    const jsonString = JSON.stringify(params);
    var encryptedPayload = await encryptPayload(jsonString, secretKey);

    // Send the request to initiate payment
    try {
        const response = await fetch('https://api-UAT.dgepay.net/dipon/v3/payment_gateway/initiate_payment', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'signature': signature
            },
            body: encryptedPayload
        });

        // const data = await response.json();
        // successMessage.textContent = response.text()

        const data = await response.text();
        console.log(data);
        if (response.ok) {
            // Get the XML string from the response
            // const xmlString = await response.text();

            // // Parse the XML string into a DOM object
            // const parser = new DOMParser();
            // const xmlDoc = parser.parseFromString(xmlString, "application/xml");

            // // Extract values from the XML
            // const status_code = xmlDoc.getElementsByTagName("status_code")[0].textContent;
            // const webview_url = xmlDoc.getElementsByTagName("webview_url")[0].textContent;
            // const unique_txn_id = xmlDoc.getElementsByTagName("unique_txn_id")[0].textContent;

            // // Create a JSON object
            // const jsonResponse = {
            //     status_code: status_code,
            //     data: {
            //         webview_url: webview_url,
            //         unique_txn_id: unique_txn_id
            //     }
            // };

            // Log the resulting JSON object
            const parseData = JSON.parse(data)
            const gateway_url = parseData.data.webview_url;

            window.open(gateway_url);
            // window.location.replace(gateway_url);
        } else {
            throw new Error('Failed to initiate payment');
        }
    } catch (error) {
        console.log(error.message);
    }
}