// Define classes for Product, ShoppingCartItem, and ShoppingCart
class Product {
    constructor(id, image, title, price) {
        this.id = id;
        this.image = image;
        this.title = title;
        this.price = price;
    }
}

class ShoppingCartItem {
    constructor(product, quantity = 1) {
        this.product = product;
        this.quantity = quantity;
    }

    getTotalPrice() {
        return this.product.price * this.quantity;
    }
}

class ShoppingCart {
    constructor() {
        this.cart = [];
    }

    getTotalItems() {
        return this.cart.length;
    }

    addItem(product) {
        let existingItem = this.cart.find(item => item.product.id === product.id);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.cart.push(new ShoppingCartItem(product));
        }

        this.displayCart();
    }

    removeItem(index) {
        this.cart.splice(index, 1);
        this.displayCart();
    }

    displayCart() {
        let cartContainer = document.getElementById('cartItem');
        let totalContainer = document.getElementById('total');
        let countContainer = document.getElementById('count');

        let cartItemsHTML = '';
        let total = 0;

        if (this.cart.length === 0) {
            cartItemsHTML = 'Your cart is empty';
            totalContainer.textContent = 'Total: $ 0.00';
        } else {
            this.cart.forEach((item, index) => {
                let totalPrice = item.getTotalPrice();
                total += totalPrice;

                cartItemsHTML += `
                    <div class='cart-item'>
                        <div class='row-img'>
                            <img class='rowimg' src=${item.product.image}>
                        </div>
                        <p style='font-size:12px;'>${item.product.title}</p>
                        <h2 style='font-size: 15px;'>$ ${item.product.price}.00</h2>
                        <i class='fa-solid fa-trash' onclick='cart.removeItem(${index})'></i>
                    </div>`;
            });

            totalContainer.textContent = `Total: $ ${total.toFixed(2)}`;
        }

        countContainer.textContent = `${this.getTotalItems()}`;
        cartContainer.innerHTML = cartItemsHTML;
    }
}

// Sample products
const products = [
    new Product(0, 'image/blacksunnys.jpeg', 'blacksunnys', 220),
    new Product(1, 'image/chicglass.jpeg', 'chic glass', 260),
    new Product(2, 'image/lightweight.jpeg', 'lighty glass', 230),
    new Product(3, 'image/pinksunnys.jpeg', 'pink sunnys', 150)
];

// Initialize shopping cart
const cart = new ShoppingCart();

// Display products
document.getElementById('robot').innerHTML = products.map((product, index) => `
    <div class='box'>
        <div class='img-box'>
            <img class='images' src=${product.image}></img>
        </div>
        <div class='bottom'>
            <p>${product.title}</p>
            <h2>$ ${product.price}.00</h2>
            <button onclick='cart.addItem(products[${index}])'>Add to cart</button>
        </div>
    </div>`
).join('');
