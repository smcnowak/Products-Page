const productDOM = document.querySelector('.product');
const url = `https://course-api.com/javascript-store-single-product`;


const fetchProduct = async() =>{
  try{
    productDOM.innerHTML = '<h4 class="product-loading">Loading...</h4>';
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const response = await fetch(`${url}?id=${id}`);
    const data = await response.json();
    return data
  } catch (error){
    productDOM.innerHTML = '<p class="error">Error...</p>';
  }
};

const displayProduct = (product) => {
  const {company, colors, description, name:title, price, image} = product.fields;
  const {url:img} = image[0];
  document.title = title.toUpperCase();
  const colorsList = colors.map((color) =>{
    return `<span class="product-color" style="background: ${color}"></span>`;
  }).join('');
  productDOM.innerHTML = `<div class="product-wrapper">
    <img src="${img}" class="img" alt="${title}">
    <div class="product-info">
      <h3>${title}</h3>
      <h5>${company}</h5>
      <span>${price/100}</span>
      <div class="colors">
        ${colorsList}
      </div>
      <p>${description}</p>
      <button class="btn btn-cart">add to cart</button>
      <span class="alert"></span>
    </div>
  </div>`;
  const cartBtn = document.querySelector('.btn-cart');
  cartBtn.addEventListener("click", displayAlert);
};

function displayAlert(){
  const alert = document.querySelector('.alert');
  alert.textContent = "Out of Stock";
  alert.classList.add(`alert-red`);
  setTimeout(function(){
    alert.textContent = "";
    alert.classList.remove(`alert-red`);
  }, 2000);
};

const start = async() =>{
  const data = await fetchProduct();
  displayProduct(data);
};

start();
