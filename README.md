# Delivery App 🍔🚚

Test assignment / Educational project for **ElifTech School** to create a full-fledged food and goods delivery web service.

## 🛠 Tech Stack

*   **Frontend:** React, TypeScript, Vite, CSS Modules
*   **Backend:** Node.js, Express, TypeScript
*   **Database:** MongoDB (Atlas) + Mongoose
*   **Architecture:** Monorepo (`packages/frontend` and `packages/backend` folders)

---

## 🚀 Implemented Features (according to requirements)

The project is divided into three difficulty levels:

### 🥉 Base Level
*   **Backend:** Custom REST API implemented (Express + MongoDB).
*   **"Shops" Page:**
    *   Sidebar with a list of available shops.
    *   Selecting a shop loads the product list specifically for that shop.
    *   "Add to Cart" button on product cards.
*   **"Shopping Cart" Page:**
    *   Checkout form (Name, Email, Phone, Delivery Address).
    *   List of selected products with the ability to change quantity (inputs) or remove an item.
    *   Calculation of total sum (Total Price).
    *   Saving the order to the database upon submission.

### 🥈 Middle Level
*   **Responsive Design:** Interface adaptation for mobile devices. The menu and product cards rearrange for comfortable smartphone use.
*   **Sorting:** Ability to sort the menu by price (Price) and alphabetically (A-z/Z-a).
*   **Filtering:** Filtering products within a shop by unique categories (Drinks, Burgers, Consoles, etc.) instead of a general list.

### 🥇 Advanced Level (*In Development*)
*   *Pagination / Infinite scroll for the product list.*
*   *Order History page with search by Email / Phone.*
*   *"Reorder" feature — quickly adding a past order to the cart.*
*   *Coupons and promo codes page.*
