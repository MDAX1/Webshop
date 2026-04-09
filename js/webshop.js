    // ── HELPERS ──────────────────────────────────────────────────────────────
    function renderStars(rating) {
      if (!rating) return '';
      const full  = Math.round(rating);
      const empty = 5 - full;
      return `<div class="stars">${'&#9733;'.repeat(full)}<span style="opacity:.25">${'&#9733;'.repeat(empty)}</span></div>`;
    }
 
    function discountPct(product) {
      if (!product.discountPercentage) return 0;
      return Math.round(product.discountPercentage);
    }
 
    function originalPrice(product) {
      return (product.price / (1 - product.discountPercentage / 100)).toFixed(2);
    }
 
    function renderCard(product, index) {
      const onSale   = discountPct(product) >= 5;
      const saleBadge = onSale
        ? `<span class="sale-badge">-${discountPct(product)}%</span>` : '';
      const priceHTML = onSale
        ? `<span class="price-old">${originalPrice(product)} kr</span>
           <span class="price-sale">${product.price} kr</span>`
        : `${product.price} kr`;
 
      return `
        <div class="col mb-5" style="animation-delay:${index * 0.06}s">
          <div class="product-card card h-100">
            ${saleBadge}
            <div class="img-wrap">
              <img src="${product.thumbnail}" alt="${product.title}" loading="lazy" />
            </div>
            <div class="card-body text-center">
              <p class="product-category">${product.category}</p>
              <h5 class="product-name">${product.title}</h5>
              ${renderStars(product.rating)}
              <p class="product-desc">${product.description}</p>
              <p class="product-price">${priceHTML}</p>
              <p class="product-stock ${product.stock < 10 ? 'low-stock' : ''}">
                ${product.stock < 10 ? `⚠ Only ${product.stock} left` : `In stock: ${product.stock}`}
              </p>
            </div>
            <div class="card-footer text-center">
              <a class="btn-shop" href="pages/order.html?id=${product.id}">Buy now</a>
            </div>
          </div>
        </div>`;
    }
 
    // ── PRODUCT GRID ─────────────────────────────────────────────────────────
    const productContainer = document.getElementById("products");
 
    if (productContainer) {
      productContainer.innerHTML = `<div class="col-12 text-center py-5 text-muted">Loading products…</div>`;
 
      fetch("https://dummyjson.com/products")
        .then(res => res.json())
        .then(data => {
          productContainer.innerHTML = data.products
            .map((product, i) => renderCard(product, i))
            .join('');
        })
        .catch(() => {
          productContainer.innerHTML = `<div class="col-12 text-center py-5 text-muted">Could not load products. Please try again later.</div>`;
        });
    }
 
    // ── SINGLE PRODUCT (order page) ───────────────────────────────────────────
    const urlParams  = new URLSearchParams(window.location.search);
    const productId  = urlParams.get("id");
 
    if (productId) {
      fetch(`https://dummyjson.com/products/${productId}`)
        .then(res => res.json())
        .then(product => {
          const form = document.getElementById("order-form");
          if (form) {
            const title = document.createElement("h4");
            title.textContent = "Product: " + product.title;
            form.prepend(title);
          }
        });
    }
 
    // ── FORM VALIDATION ───────────────────────────────────────────────────────
    const form = document.getElementById("order-form");
 
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
 
        const fields = {
          name:    { min: 2,  max: 50,  msg: "Namnet måste vara 2–50 tecken." },
          email:   { min: 1,  max: 50,  msg: "Ogiltig e-post." },
          phone:   { regex: /^[0-9\-() ]{1,20}$/, msg: "Telefon får bara innehålla siffror, -, () och max 20 tecken." },
          street:  { min: 2,  max: 50,  msg: "Adress måste vara 2–50 tecken." },
          city:    { min: 2,  max: 20,  msg: "Ort måste vara 2–20 tecken." },
          zipcode: { regex: /^[0-9]{5}$/, msg: "Postnummer måste vara exakt 5 siffror." }
        };
 
        let isValid = true;
 
        for (const [id, rules] of Object.entries(fields)) {
          const value = document.getElementById(id).value.trim();
          const errorEl = document.getElementById(`${id}-error`);
          errorEl.textContent = "";
 
          let fieldOk = true;
          if (rules.regex)           fieldOk = rules.regex.test(value);
          else if (id === "email")   fieldOk = value.includes("@") && value.length <= rules.max;
          else                       fieldOk = value.length >= rules.min && value.length <= rules.max;
 
          if (!fieldOk) {
            errorEl.textContent = rules.msg;
            isValid = false;
          }
        }
 
        if (isValid) window.location.href = "/pages/thankyou.html";
      });
    }