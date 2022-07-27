
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

const addProductsToPage = (products)=>{
    const ProductListContainer = document.querySelector('.js-product-list');
    products.forEach( product => {
        const productFragment = createProductFragment(product);
        ProductListContainer.appendChild(productFragment);
    })
    console.log('Products On Page', products.length)
}

const filterProducts = (products,value)=>{
    const Items = [...products];
    return Items.filter( item => item.category == value);
}
const sortProductsLTH = (products)=> {
    const Items = [...products];
    return Items.sort( (a,b) => +a.price - +b.price);
}
const sortProductsHTL = (products)=> {
    const Items = [...products];
    return Items.sort( (a,b) => +a.price + +b.price);
}

const changeCategory = (ev)=> {
    if(!ev) return;
    ev.preventDefault();
    const ProductListContainer = document.querySelector('.js-product-list');
    const CategorySelected = ev.target.value;
    const FilterSelectorValue = document.getElementById('FilterSelect').value;

    removeAllChildElement(ProductListContainer);

    if(CategorySelected == "All"){
        addProductsToPage(Products);
    }else{
        if(FilterSelectorValue != "None"){
            const FilteredCategory = filterProducts(Products,CategorySelected);
            if(FilterSelectorValue == "Price: low-to-high"){
                addProductsToPage(sortProductsLTH(FilteredCategory))
            }else if(FilterSelectorValue == "Price: high-to-low"){
                addProductsToPage(sortProductsHTL(FilteredCategory))
            }
        }else{
            addProductsToPage(filterProducts(Products, CategorySelected));
        }
        
    }
    
}
const setFilter = (ev)=>{
    if(!ev) return;
    ev.preventDefault();
    const ProductListContainer = document.querySelector('.js-product-list');
    const FilterSelectedValue = ev.target.value;
    const CategorySelectorValue = document.getElementById('CategorySelect').value;

    removeAllChildElement(ProductListContainer);

    if(FilterSelectedValue == "None"){
        if(CategorySelectorValue == "All"){
            addProductsToPage(Products);
        }else{
            addProductsToPage(filterProducts(Products, CategorySelectorValue));
        }
    }

    if(FilterSelectedValue == "Price: low-to-high"){
        const FilteredCategory = filterProducts(Products,CategorySelectorValue);
        addProductsToPage(sortProductsLTH(FilteredCategory))
    }
    if(FilterSelectedValue == "Price: high-to-low"){
        const FilteredCategory = filterProducts(Products,CategorySelectorValue);
        addProductsToPage(sortProductsHTL(FilteredCategory))
    }

    
}

function init(){

    CategorySelector.addEventListener('input', changeCategory);
    FilterSelector.addEventListener('input', setFilter);

    addProductsToPage(Products);
}
window.addEventListener('load', init)
