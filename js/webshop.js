const element = document.getElementById("products");

fetch("https://dummyjson.com/products")
  .then(res => res.json())
  .then(data => {
    for (let product of data.products) {
      let card = `
  <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-4">
<div class="card h-100">
  <img src="${product.thumbnail}" class="card-img-top">

  <div class="card-body d-flex flex-column">
    <h5 class="card-title">${product.title}</h5>
    <p class="card-text">${product.price} kr</p>

    <a href="order.html?id=${product.id}" class="btn btn-primary mt-auto">Buy</a>
  </div>
</div>
`;

      element.innerHTML += card;
    }
  })
  .catch(error => {
    console.error("Kunde inte hämta produkter:", error);
  });
