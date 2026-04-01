const element = document.getElementById("products");

fetch("https://api.escuelajs.co/api/v1/products")
  .then(res => res.json())
  .then(data => {
    for (let product of data) {
      let card = `
  <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-4">
    <div class="card h-100">
      <img src="${product.image}">
      <h4>${product.title}</h4>
      <p>${product.price}</p>
      <button class="btn btn-primary" onclick = ">Buy</button>
    </div>
  </div>
`;

      element.innerHTML += card;
    }
  })
  .catch(error => {
    console.error("Kunde inte hämta produkter:", error);
  });
