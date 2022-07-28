
const DOCUMENT_INFORMATION = {
    title: "Elain's Family Snacks",
    tempWebsite: "https://altycon.github.io/ElainesFamilySnacks/",
    git: "https://github.com/Altycon/ElainesFamilySnacks.git",
    website: "",
    creator: "Clayton McDaniel",
    description: "Family Business in Malaysia"
}

/**
 *      VARIABLES
 */

const CategorySelector = document.getElementById('CategorySelect');
const FilterSelector = document.getElementById('FilterSelect');

const Products = createProductData(100);
let CurrentProducts;

const addProductsToPage = (products)=>{
    const ProductListContainer = document.querySelector('.js-product-list');
    document.querySelector('.js-items-total').innerText = `${products.length}`;
    products.forEach( product => {
        const productFragment = createProductFragment(product);
        ProductListContainer.appendChild(productFragment);
    })
    console.log('Products On Page', products.length) //remove
}

const filterProductCategories = (products,value)=>{
    if(!products || !value){
        throw new Error('1st arg is array of objects and 2nd arg is a string')
    }
    if(!products[0] || typeof products[0] != "object"){
        throw new Error('1st arg must be an array of objects')
    }
    if(!value || typeof value != "string"){
        throw new Error('2nd arg "value" must be a string')
    }
    if(value != "All"){
        const Items = [...products];
        return Items.filter( item => item.category == value);
    }else{
        return products;
    }
    
}

const SortProducts = (products, value)=>{
    if(!products || !value){
        throw new Error('1st arg is array of objects and 2nd arg is a string')
    }
    if(!products[0] || typeof products[0] != "object"){
        throw new Error('1st arg must be an array of objects')
    }
    if(!value || typeof value != "string"){
        throw new Error('2nd arg "value" must be a string')
    }
    switch(value){
        case "A-to-Z":
            return sortProductsATZ(products)
        case "Z-to-A":
            return sortProductsZTA(products)
        case "Price: low-to-high":
            return sortProductsLTH(products)
        case "Price: high-to-low":
            return sortProductsHTL(products)
    }
}
function sortProductsATZ(products){
    const Items = [...products];
    return Items.sort( (a,b) => a.name > b.name ? 1:-1);
}
function sortProductsZTA(products){
    const Items = [...products];
    return Items.sort( (a,b) => a.name < b.name ? 1:-1);
}
function sortProductsLTH(products){
    const Items = [...products];
    return Items.sort( (a,b) => +a.price - +b.price);
}
function sortProductsHTL(products){
    const Items = [...products];
    return Items.sort( (a,b) => +b.price - +a.price);
}


const changeCategory = (ev)=> {
    if(!ev) return;
    ev.preventDefault();
    const ProductListContainer = document.querySelector('.js-product-list');
    const CategoryValue = ev.target.value;
    const SortValue = document.getElementById('FilterSelect').value;

    removeAllChildElement(ProductListContainer);

    const FilteredProducts = filterProductCategories(Products,CategoryValue);
    const SortedProducts = SortProducts(FilteredProducts,SortValue);
    addProductsToPage(SortedProducts);
    CurrentProducts = SortedProducts;
}

const changeSort = (ev)=>{
    if(!ev) return;
    ev.preventDefault();
    const ProductListContainer = document.querySelector('.js-product-list');
    const SortValue = ev.target.value;
    const CategoryValue = document.getElementById('CategorySelect').value;

    removeAllChildElement(ProductListContainer);

    const FilterProducts = filterProductCategories(Products,CategoryValue);
    const SortedProducts = SortProducts(FilterProducts, SortValue);
    addProductsToPage(SortedProducts);
    CurrentProducts = SortedProducts;
}
function findProduct(currentProducts,id){
    return currentProducts.find( product => product.id === id);
}

function viewProduct(ev){
    ev.preventDefault();
    const DATA_ID = Number(ev.target.dataset.id);
    document.body.style.overflow = 'hidden';

    const foundProduct = findProduct(CurrentProducts,DATA_ID);
 
    const POPUP = document.querySelector('.p-popup');
    POPUP.classList.add('viewing');

    document.querySelector('.js-popup-img').src = foundProduct.image;
    document.querySelector('.js-popup-name').innerText = foundProduct.name;
    document.querySelector('.js-popup-size').innerText = foundProduct.size;
    document.querySelector('.js-popup-count').innerText = foundProduct.count;
    document.querySelector('.js-popup-price').innerText = formatPrice(foundProduct.price);
    document.querySelector('.js-popup-category').innerText = foundProduct.category;
    document.querySelector('.js-popup-description').innerText = foundProduct.description || "No description available";


    const PopupCloseButton = document.querySelector('.p-popup__close-btn');
    PopupCloseButton.addEventListener('click', (ev)=>{
        document.querySelector('.p-popup').classList.remove('viewing');
        document.body.style.overflow = 'auto';
    });
}

function init(){

    CategorySelector.addEventListener('input', changeCategory);
    FilterSelector.addEventListener('input', changeSort);

    const SORTED = sortProductsATZ(Products)
    addProductsToPage(SORTED);
    CurrentProducts = SORTED;
}
window.addEventListener('load', init)
