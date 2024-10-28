import { products } from './products.js';

//HOME PAGE
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

//PRODUCT PAGE
const productExist = document.querySelector('.products');

if (productExist) {
  function createProductCard(product) {
    const productDiv = document.createElement('div');
    productDiv.classList.add(`product-cards`);

    productDiv.innerHTML = `
    <img loading="lazy" src="${product.image}" alt="${product.name}"> 
    <h3>${product.name} ${product.tagalog === 'none' ? '' : `(${product.tagalog})`}</h3>
    <p>${product.description}</p> 
    <span>Price: ₱${product.onSale === true ? `${product.price.toFixed(2) * 0.9} <del>${product.price.toFixed(2)}</del>` : `${product.price.toFixed(2)}`} <em>${product.quantity}</em></span> 
    <div class="button"> 
    <button data-name="${product.name}"}">Add to Cart</button>
    </div>
  `;
    return productDiv;
  }

  function displayFilteredProducts(filteredProducts) {
    const productSection = document.querySelector('.products');
    productSection.innerHTML = '';

    filteredProducts.forEach((product) => {
      productSection.appendChild(createProductCard(product));
    });
  }

  function displayProducts() {
    displayFilteredProducts(products);
  }

  displayProducts();

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

  function searchProducts(query) {
    const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase()) || product.tagalog.toLowerCase().includes(query.toLowerCase()));
    displayFilteredProducts(filteredProducts);
  }

  const searchBar = document.querySelector('.searchBar');
  searchBar.addEventListener('input', () => {
    const query = searchBar.value;
    searchProducts(query);
  });
}

document.querySelectorAll('button[data-name]').forEach((button) => {
  button.addEventListener('click', (event) => {
    alert(`🎉 Item Added to Cart! 🛒`);
  });
});

//ABOUT US
const container = document.querySelector('.container');

if (container) {
  container.addEventListener('click', (event) => {
    const panel = event.target.closest('.panel');
    if (panel) {
      removeActiveClasses();
      panel.classList.add('active');
    }
  });
}

function removeActiveClasses() {
  const panels = document.querySelectorAll('.panel');
  panels.forEach((panel) => panel.classList.remove('active'));
}
