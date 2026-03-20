// API URL (CHANGE when deployed)
const API = "https://fancy-store.onrender.com/api/products";

let products = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = [];
let recent = [];

const productsContainer = document.getElementById("products");

/* ===================== LOAD PRODUCTS FROM BACKEND ===================== */

async function loadProducts(){
try{

const res = await fetch(API);
products = await res.json();

renderProducts();

}catch(err){
console.error("Error loading products:",err);
}
}

/* ===================== RENDER PRODUCTS ===================== */

function renderProducts(){

productsContainer.innerHTML="";

products.forEach(p=>{

productsContainer.innerHTML+=`

<div class="product">

<div class="wishlist" onclick="addWishlist('${p._id}')">❤️</div>

<img src="${p.image}" onclick="viewProduct('${p._id}')">

<h3>${p.name}</h3>

<div class="rating">⭐ ${p.rating || 4}</div>

<p>$${p.price}</p>

<button onclick="addToCart('${p._id}')">
Add to Cart
</button>

</div>

`;

});

}

function renderFilteredProducts(list){

productsContainer.innerHTML="";

list.forEach(p=>{

productsContainer.innerHTML+=`

<div class="product">

<div class="wishlist" onclick="addWishlist('${p._id}')">❤️</div>

<img src="${p.image}" onclick="viewProduct('${p._id}')">

<h3>${p.name}</h3>

<div class="rating">⭐ ${p.rating || 4}</div>

<p>$${p.price}</p>

<button onclick="addToCart('${p._id}')">
Add to Cart
</button>

</div>

`;

});

}

/* ===================== CART ===================== */
function toggleCart(){

const modal = document.getElementById("cart-modal");

if(modal.style.display === "flex"){
modal.style.display = "none";
}else{
modal.style.display = "flex";
}

}

function addToCart(id){

const product = products.find(p=>p._id===id);

cart.push(product);

localStorage.setItem("cart",JSON.stringify(cart));

updateCart();
showToast();

}

function updateCart(){

const cartItems = document.getElementById("cart-items");

cartItems.innerHTML="";

let total = 0;

cart.forEach((item,index)=>{

total += item.price;

cartItems.innerHTML += `

<div class="cart-item">

<span>${item.name}</span>

<div>
<button class="qty-btn" onclick="removeItem(${index})">❌</button>
</div>

</div>

`;

});

document.getElementById("cart-total").innerText = "Total: $" + total;
document.getElementById("cart-count").innerText = cart.length;

}

function removeItem(index){

cart.splice(index,1);

localStorage.setItem("cart",JSON.stringify(cart));

updateCart();

}

/* ===================== TOAST ===================== */

function showToast(){

const toast = document.getElementById("toast");

toast.style.display="block";

setTimeout(()=>{
toast.style.display="none";
},2000);

}

/* ===================== SEARCH ===================== */

document.getElementById("search").addEventListener("input",function(){

const value = this.value.toLowerCase();

const filtered = products.filter(p =>
p.name.toLowerCase().includes(value)
);

renderFilteredProducts(filtered);

});

/* ===================== MENU ===================== */

function toggleMenu(){
document.getElementById("nav").classList.toggle("show");
}

/* ===================== THEME ===================== */

function toggleTheme(){
document.body.classList.toggle("light-mode");
}

/* ===================== SCROLL ===================== */

function scrollProducts(){

window.scrollTo({
top:600,
behavior:"smooth"
});

}

/* ===================== FILTER ===================== */

document.getElementById("categoryFilter").addEventListener("change",function(){

const category = this.value;

let filtered = products;

if(category !== "all"){
filtered = products.filter(p => p.category === category);
}

renderFilteredProducts(filtered);

});

/* ===================== SORT ===================== */

document.getElementById("sortPrice").addEventListener("change",function(){

let sorted = [...products];

if(this.value === "low"){
sorted.sort((a,b)=>a.price-b.price);
}

if(this.value === "high"){
sorted.sort((a,b)=>b.price-a.price);
}

renderFilteredProducts(sorted);

});

/* ===================== RECENT ===================== */

function viewProduct(id){

const product = products.find(p=>p._id===id);

recent.unshift(product);

recent = recent.slice(0,4);

renderRecent();

}

function renderRecent(){

const container = document.getElementById("recent-products");

container.innerHTML="";

recent.forEach(p=>{

container.innerHTML+=`

<div class="product">

<img src="${p.image}" width="120">

<p>${p.name}</p>

</div>

`;

});

}

/* ===================== WISHLIST ===================== */

function addWishlist(id){

const product = products.find(p=>p._id===id);

wishlist.push(product);

alert(product.name + " added to wishlist");

}

function logout(){

localStorage.clear();

alert("Logged out");

window.location.href="login.html";

}
/* ===================== INIT ===================== */

loadProducts();   // 🔥 important
updateCart();