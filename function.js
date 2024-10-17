import { products } from './products.js';

let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');

menu.onclick = () => {
  menu.classList.toggle('bx-x');
  navlist.classList.toggle('open');
};

window.onscroll = () => {
  menu.classList.remove('bx-x');
  navlist.classList.remove('open');
};

//Filter Button function
const productExist = document.querySelector('.products');

if (productExist) {
  function createProductCard(product) {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product-cards');

    productDiv.innerHTML = `
    <img src="${product.image}" alt="${product.name}"> 
    <h3>${product.name} ${product.tagalog === 'none' ? '' : `(${product.tagalog})`}</h3>
    <p>${product.description}</p> 
    <span>Price: ₱${product.onSale === true ? `${product.price.toFixed(2) * 0.9} <del>${product.price.toFixed(2)}</del>` : `${product.price.toFixed(2)}`} <em>${product.quantity}</em></span> 
    <div class="button"> 
    <button>Add to Cart</button>
    <button>Buy Now</button>
    </div>
  `;
    return productDiv;
  }

  //Display Filtered  Products

  function displayFilteredProducts(filteredProducts) {
    const productSection = document.querySelector('.products');
    productSection.innerHTML = '';

    filteredProducts.forEach((product) => {
      productSection.appendChild(createProductCard(product));
    });
  }

  //Initial Display Function
  function displayProducts() {
    displayFilteredProducts(products);
  }

  displayProducts();

  //Event Listener  for Filter Button

  const filterButtons = document.querySelectorAll('.filter-button');

  filterButtons.forEach((button) => {
    button.addEventListener('change', () => {
      let filteredProducts;
      switch (button.id) {
        case 'Fruits':
          filteredProducts = products.filter((product) => product.category === 'Fruits');
          break;
        case 'Vegetables':
          filteredProducts = products.filter((product) => product.category === 'Vegetables');
          break;
        case 'Sale':
          filteredProducts = products.filter((product) => product.onSale === true);
          break;
        case 'All':
          displayProducts();
          return;
      }
      displayFilteredProducts(filteredProducts);
    });
  });

  //Search bar filtering
  function searchProducts(query) {
    const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase()) || product.tagalog.toLowerCase().includes(query.toLowerCase()));
    displayFilteredProducts(filteredProducts);
  }

  // Search bar functionality
  const searchBar = document.querySelector('.searchBar');
  searchBar.addEventListener('input', () => {
    const query = searchBar.value;
    searchProducts(query);
  });
}
