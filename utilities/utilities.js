
const removeAllChildElement = (parent) => {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
};

const formatPrice = (price)=> {
    return `$${(price / 100).toFixed(2)}`;
}



const createProductFragment = (product)=>{
    const fragment = new DocumentFragment();

    const Article = document.createElement('article');
    const ImageContainer = document.createElement('div');
    const ImageElement = document.createElement('img');
    const InfoContainer = document.createElement('div');
    const SizeElement = document.createElement('p');
    const CountElement = document.createElement('span');
    const NameElement = document.createElement('h3');
    const PriceElement = document.createElement('p');
    const ButtonElement = document.createElement('button');

    Article.setAttribute('class', 'product');
    ImageContainer.setAttribute('class', 'product-img-container');
    InfoContainer.setAttribute('class', 'product-info-container');
    SizeElement.setAttribute('class', 'product-size');
    CountElement.setAttribute('class', 'product-count');
    NameElement.setAttribute('class', 'product-name');
    PriceElement.setAttribute('class', 'product-price');
    ButtonElement.setAttribute('class','product-view-button');
    ButtonElement.type = 'button';
    ButtonElement.addEventListener('click', viewProduct);

    Article.dataset.id = product.id;
    Article.dataset.price = product.price
    //ImageElement.width = '100';
    ImageElement.src = product.image;
    ImageElement.alt = 'product';
    SizeElement.innerText = product.size;
    CountElement.innerText = product.count;
    NameElement.innerText = product.name;
    PriceElement.innerText = formatPrice(product.price);
    ButtonElement.dataset.id = product.id;
    ButtonElement.innerText = 'View';


    // For debugging
    // switch(product.category){
    //     case "One":
    //         Article.style.backgroundColor = 'hsl(0 100% 50% / 0.3)';
    //         break;
    //     case "Two":
    //         Article.style.backgroundColor = 'hsl(180 100% 50% / 0.3)';
    //         break;
    //     case "Three":
    //         Article.style.backgroundColor = 'hsl(220 100% 50% / 0.3)';
    //         break;
    //     case "Four":
    //         Article.style.backgroundColor = 'hsl(60 100% 50% / 0.3)';
    //     break;
    // }

    ImageContainer.appendChild(ImageElement);
    SizeElement.appendChild(CountElement);

    InfoContainer.appendChild(SizeElement);
    InfoContainer.appendChild(NameElement);
    InfoContainer.appendChild(PriceElement);

    Article.appendChild(ImageContainer);
    Article.appendChild(InfoContainer);
    Article.appendChild(ButtonElement);

    fragment.appendChild(Article);

    return fragment;
}