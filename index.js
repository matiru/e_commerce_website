const category_url ="https://fakestoreapi.com/products/categories";
const product_url ="https://fakestoreapi.com/products";
const specific_category = "https://fakestoreapi.com/products/category";

const container = document.querySelector(".products");
const menu = document.querySelector(".select_menu");



// fetching categories
async function getCategories(){

let categories = await fetch(category_url)
.then((res) => res.json());
console.log(categories);
return categories;

}
getCategories()

// onchange of menu if selected category is all then mount all products else display specific category products

menu.addEventListener("change", (e) => {
if (e.target.value === "All Products") {
container.innerHTML = "";
mountProducts();
} else {
getSpecificCategory(e.target.value).then((products) =>
displayProducts(products, container)
);
}
});





// creating the categories menu
async  function createMenu(){
let categories = await getCategories();
categories.forEach((category) => {
const option = document.createElement("option");
option.value = category;
option.textContent = category;
menu.appendChild(option);
});
}
createMenu();

// specific category

async function getSpecificCategory(text){
    let specific_category = await fetch(`https://fakestoreapi.com/products/category/${ text}`)
    .then((res) => res.json());
    console.log(specific_category);
    return specific_category;
    }



// mounting products

async function mountProducts(){

    let all_products = await fetch(product_url)
    .then((res) => res.json());
    console.log(all_products);
    all_products.map((product) =>create_product(product,container));
    }

mountProducts();

// create product card

function create_product(product,container){

    let product_ele = document.createElement("div");
    product_ele.classList.add("product");
    product_ele.innerHTML = `<img src="${product.image}" alt="">
    <div class="pro_details">
    <h6>${product.title}</h6>
    <p>category: ${product.category}</p>
    <p>Price:<span> ${product.price} </span></p>
    <button id=${product.id}>     
    <i class="far fa-cart-plus "></i>
    Add to cart</button>
    </div>`;
    container.appendChild(product_ele);

}


function displayProducts(products,container){
    console.log(products);
    container.innerHTML = "";
    products.forEach((product) => create_product(product,container));
}










