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
    await fetch(`${BASE_URL}/api/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId })
    });
    alert("Product added to cart!");
}

async function removeFromCart(productId) {
    await fetch(`${BASE_URL}/api/cart`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId })
    });
    alert("Product removed from cart!");
}