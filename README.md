# 🛒 Webshop Project

A responsive webshop built with HTML, CSS (Bootstrap), and JavaScript.  
The application fetches products from an external API and allows users to place an order through a validated form.

---

## 📌 Features

- Fetch and display products from an API
- Responsive layout using Bootstrap
- View and select a product
- Order form with JavaScript validation
- Redirect to confirmation page after successful order

---

## ⚙️ Technologies Used

- HTML5
- CSS3
- Bootstrap 5
- JavaScript (Vanilla)
- API: https://dummyjson.com/products

---

## 📦 Functionality

### 🛍 Product Listing
- Products are fetched dynamically from the API
- Displayed in a responsive grid layout
- Each product includes:
  - Image
  - Title
  - Price
  - "Buy" button

---

### 🧾 Order Form
Users must fill in the following:

- Name
- Email
- Phone number
- Street address
- City
- Zip code

---

### ✅ Validation Rules

All validation is handled using JavaScript:

- Name: 2–50 characters  
- Email: Must include @ and max 50 characters  
- Phone: Numbers, hyphens, parentheses only (max 20 characters)  
- Street: 2–50 characters  
- City: 2–20 characters  
- Zip Code: Exactly 5 digits  

---

### 🔁 Order Flow

1. User selects a product
2. User fills in the order form
3. Form is validated
4. On success → redirected to Thank You page

---

## 📁 Project Structure

project/
│
├── index.html
├── css/
│   └── style.css
├── js/
│   └── webshop.js
└── pages/
    ├── order.html
    ├── contactUs.html
    ├── aboutUs.html
    └── thankyou.html

---

## 🚀 How to Run

1. Clone the repository:

git clone https://github.com/your-username/your-repo-name.git

2. Open index.html in your browser

---

## 📚 Assignment Info

This project was created as part of a frontend/web development assignment.

---

## 👨‍💻 Authors

- Raul  
- Mads  

---

## 📄 License

This project is for educational purposes.
