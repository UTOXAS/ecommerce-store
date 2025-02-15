// document.addEventListener("DOMContentLoaded", async () => {
//     const res = await fetch("http://localhost:5000/api/products");
//     const products = await res.json();

//     const productContainer = document.getElementById("products");
//     products.forEach(product => {
//         productContainer.innerHTML += `
//         <div class="col-md-4">
//             <div class="card mb-4">
//                 <img src="${product.image}" class="card-img-top">
//                 <div class="card-body">
//                     <h5 class="card-title">${product.name}</h5>
//                     <p class="card-text">${product.description}</p>
//                     <p class="card-text">${product.price}</p>
//                     <button class="btn btn-primary" onclick="addToCart('${product._id}')">Add to Cart</button>
//                 </div>
//             </div>
//         </div>
//         `;
//     });
// });

async function addToCart(productId) {
    // console.log(`addToCart(productId:${productId})`)
    await fetch(`${BASE_URL}/api/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId })
    });
    // alert("Product added to cart!");
    updateCartCount();
}

async function removeFromCart(productId) {
        console.log(`removerFromCart(productId:${productId})`)

    try {
    const response = await fetch(`${BASE_URL}/api/cart/remove`, {        
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId })
    });

    const data = await response.json();

    if (response.ok) {
        location.reload();
    }
    // alert("Product removed from cart!");
    updateCartCount();
    } catch (error) {
        console.error("Error removing item:", error);
    }
}

async function updateCartCount() {
    try {
        const response = await fetch(`${BASE_URL}/api/cart/count`);
        const countData = await response.json();

        document.getElementById("cart-count").textContent = countData.count;
    } catch(error) {
        console.error("Error updating cart count:", error);
    }
}

document.addEventListener("DOMContentLoaded", updateCartCount);