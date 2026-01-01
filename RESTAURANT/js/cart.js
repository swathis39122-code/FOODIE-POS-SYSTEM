/* ============================================
   SWATHI RESTAURANT - Cart Management System
   Handles cart operations: add, remove, update, clear
   ============================================ */

// Cart data structure stored in localStorage
let cart = JSON.parse(localStorage.getItem('restaurantCart')) || [];

// ===== Initialize Cart on Page Load =====
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    if (document.getElementById('cart-items')) {
        displayCart();
    }
});

// ===== Add Item to Cart =====
function addToCart(itemId, itemName, itemPrice) {
    // Check if item already exists in cart
    const existingItem = cart.find(item => item.id === itemId);
    
    if (existingItem) {
        // If item exists, increase quantity
        existingItem.quantity += 1;
    } else {
        // If item doesn't exist, add new item
        cart.push({
            id: itemId,
            name: itemName,
            price: parseFloat(itemPrice),
            quantity: 1
        });
    }
    
    // Save to localStorage
    saveCart();
    
    // Update cart count in navigation
    updateCartCount();
    
    // Show success message
    showNotification(`${itemName} added to cart!`, 'success');
}

// ===== Remove Item from Cart =====
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCart();
    updateCartCount();
    displayCart();
    showNotification('Item removed from cart', 'info');
}

// ===== Update Item Quantity =====
function updateQuantity(itemId, change) {
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            saveCart();
            displayCart();
            updateCartCount();
        }
    }
}

// ===== Clear Entire Cart =====
function clearCart() {
    if (cart.length === 0) {
        showNotification('Cart is already empty', 'info');
        return;
    }
    
    if (confirm('Are you sure you want to clear all items from your cart?')) {
        cart = [];
        saveCart();
        updateCartCount();
        displayCart();
        showNotification('Cart cleared successfully', 'success');
    }
}

// ===== Save Cart to LocalStorage =====
function saveCart() {
    localStorage.setItem('restaurantCart', JSON.stringify(cart));
}

// ===== Update Cart Count in Navigation =====
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
        if (totalItems > 0) {
            element.style.display = 'inline-block';
        } else {
            element.style.display = 'none';
        }
    });
}

// ===== Calculate Total Price =====
function calculateTotal() {
    return cart.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);
}

// ===== Calculate Tax (5% GST) =====
function calculateTax(subtotal) {
    return subtotal * 0.05; // 5% GST
}

// ===== Display Cart Items =====
function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSummary = document.getElementById('cart-summary');
    
    if (!cartItemsContainer) return;
    
    // Clear previous content
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart" style="font-size: 4rem; color: #ccc; margin-bottom: 1rem;"></i>
                <h3>Your cart is empty</h3>
                <p>Add some delicious items from our menu!</p>
                <a href="menu.html" class="btn" style="margin-top: 1rem;">Browse Menu</a>
            </div>
        `;
        if (cartSummary) {
            cartSummary.innerHTML = '';
        }
        return;
    }
    
    // Display cart items
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p class="cart-item-price">₹${item.price.toFixed(2)} each</p>
            </div>
            <div class="cart-item-controls">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">
                    <i class="fas fa-minus"></i>
                </button>
                <span class="quantity-display">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">
                    <i class="fas fa-plus"></i>
                </button>
                <button class="remove-btn" onclick="removeFromCart(${item.id})" title="Remove item">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div class="cart-item-total">
                <strong>₹${(item.price * item.quantity).toFixed(2)}</strong>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    
    // Display cart summary
    if (cartSummary) {
        const subtotal = calculateTotal();
        const tax = calculateTax(subtotal);
        const total = subtotal + tax;
        
        cartSummary.innerHTML = `
            <div class="bill-summary">
                <div class="bill-row">
                    <span>Subtotal:</span>
                    <span>₹${subtotal.toFixed(2)}</span>
                </div>
                <div class="bill-row">
                    <span>GST (5%):</span>
                    <span>₹${tax.toFixed(2)}</span>
                </div>
                <div class="bill-row bill-total">
                    <span><strong>Total:</strong></span>
                    <span><strong>₹${total.toFixed(2)}</strong></span>
                </div>
            </div>
            <div class="cart-actions">
                <button class="btn btn-clear" onclick="clearCart()">
                    <i class="fas fa-trash-alt"></i> Clear Cart
                </button>
                <button class="btn btn-primary" onclick="proceedToPayment()">
                    <i class="fas fa-credit-card"></i> Pay Now
                </button>
            </div>
        `;
    }
}

// ===== Proceed to Payment =====
function proceedToPayment() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    // Show payment options modal
    showPaymentModal();
}

// ===== Show Payment Modal =====
function showPaymentModal() {
    const subtotal = calculateTotal();
    const tax = calculateTax(subtotal);
    const total = subtotal + tax;
    
    const modal = document.createElement('div');
    modal.className = 'payment-modal';
    modal.innerHTML = `
        <div class="payment-modal-content">
            <span class="close-modal" onclick="closePaymentModal()">&times;</span>
            <h2><i class="fas fa-credit-card"></i> Payment Options</h2>
            <div class="payment-summary">
                <p><strong>Total Amount: ₹${total.toFixed(2)}</strong></p>
            </div>
            <div class="payment-methods">
                <button class="payment-option" onclick="processPayment('cash')">
                    <i class="fas fa-money-bill-wave"></i>
                    <span>Cash on Delivery</span>
                </button>
                <button class="payment-option" onclick="processPayment('card')">
                    <i class="fas fa-credit-card"></i>
                    <span>Card Payment</span>
                </button>
                <button class="payment-option" onclick="processPayment('upi')">
                    <i class="fas fa-mobile-alt"></i>
                    <span>UPI Payment</span>
                </button>
                <button class="payment-option" onclick="processPayment('online')">
                    <i class="fas fa-globe"></i>
                    <span>Online Payment</span>
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// ===== Close Payment Modal =====
function closePaymentModal() {
    const modal = document.querySelector('.payment-modal');
    if (modal) {
        modal.remove();
    }
}

// ===== Process Payment =====
function processPayment(method) {
    const subtotal = calculateTotal();
    const tax = calculateTax(subtotal);
    const total = subtotal + tax;
    
    // Generate bill
    generateBill(method, total);
    
    // Close modal
    closePaymentModal();
    
    // Show success message
    showNotification('Payment processed successfully!', 'success');
}

// ===== Generate Bill =====
function generateBill(paymentMethod, total) {
    const subtotal = calculateTotal();
    const tax = calculateTax(subtotal);
    const billNumber = 'BILL-' + Date.now().toString().slice(-6);
    const date = new Date().toLocaleString('en-IN');
    
    // Create bill content
    let billContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Bill - Swathi Restaurant</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                .bill-header { text-align: center; margin-bottom: 20px; }
                .bill-details { margin-bottom: 20px; }
                .bill-items { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                .bill-items th, .bill-items td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
                .bill-items th { background-color: #f5f5f5; }
                .bill-total-section { text-align: right; margin-top: 20px; }
                .bill-footer { margin-top: 30px; text-align: center; font-size: 12px; color: #666; }
                @media print { .no-print { display: none; } }
            </style>
        </head>
        <body>
            <div class="bill-header">
                <h1>SWATHI RESTAURANT</h1>
                <p>123 Main Street, City Name, State 12345</p>
                <p>Phone: +91 123 456 7890</p>
            </div>
            <div class="bill-details">
                <p><strong>Bill Number:</strong> ${billNumber}</p>
                <p><strong>Date & Time:</strong> ${date}</p>
                <p><strong>Payment Method:</strong> ${paymentMethod.toUpperCase()}</p>
            </div>
            <table class="bill-items">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    cart.forEach(item => {
        billContent += `
            <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>₹${item.price.toFixed(2)}</td>
                <td>₹${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
        `;
    });
    
    billContent += `
                </tbody>
            </table>
            <div class="bill-total-section">
                <p>Subtotal: ₹${subtotal.toFixed(2)}</p>
                <p>GST (5%): ₹${tax.toFixed(2)}</p>
                <p><strong>Total: ₹${total.toFixed(2)}</strong></p>
            </div>
            <div class="bill-footer">
                <p>Thank you for dining with us!</p>
                <p>Visit us again soon!</p>
            </div>
            <div class="no-print" style="margin-top: 20px; text-align: center;">
                <button onclick="window.print()" style="padding: 10px 20px; font-size: 16px; cursor: pointer;">Print Bill</button>
                <button onclick="window.close()" style="padding: 10px 20px; font-size: 16px; cursor: pointer; margin-left: 10px;">Close</button>
            </div>
        </body>
        </html>
    `;
    
    // Open bill in new window
    const billWindow = window.open('', '_blank');
    billWindow.document.write(billContent);
    billWindow.document.close();
    
    // Auto print after a short delay
    setTimeout(() => {
        billWindow.print();
    }, 500);
    
    // Clear cart after generating bill
    setTimeout(() => {
        cart = [];
        saveCart();
        updateCartCount();
        if (document.getElementById('cart-items')) {
            displayCart();
        }
    }, 1000);
}

// ===== Print Bill (from cart page) =====
function printBill() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    const subtotal = calculateTotal();
    const tax = calculateTax(subtotal);
    const total = subtotal + tax;
    const billNumber = 'BILL-' + Date.now().toString().slice(-6);
    const date = new Date().toLocaleString('en-IN');
    
    // Create printable bill
    const printContent = document.createElement('div');
    printContent.innerHTML = `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 20px;">
                <h1>SWATHI RESTAURANT</h1>
                <p>123 Main Street, City Name, State 12345</p>
                <p>Phone: +91 123 456 7890</p>
            </div>
            <div style="margin-bottom: 20px;">
                <p><strong>Bill Number:</strong> ${billNumber}</p>
                <p><strong>Date & Time:</strong> ${date}</p>
            </div>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <thead>
                    <tr style="background-color: #f5f5f5;">
                        <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Item</th>
                        <th style="padding: 10px; text-align: center; border-bottom: 2px solid #ddd;">Qty</th>
                        <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Price</th>
                        <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${cart.map(item => `
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.name}</td>
                            <td style="padding: 10px; text-align: center; border-bottom: 1px solid #ddd;">${item.quantity}</td>
                            <td style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">₹${item.price.toFixed(2)}</td>
                            <td style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">₹${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <div style="text-align: right; margin-top: 20px;">
                <p>Subtotal: ₹${subtotal.toFixed(2)}</p>
                <p>GST (5%): ₹${tax.toFixed(2)}</p>
                <p style="font-size: 1.2em; font-weight: bold; margin-top: 10px;">Total: ₹${total.toFixed(2)}</p>
            </div>
            <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #666;">
                <p>Thank you for dining with us!</p>
                <p>Visit us again soon!</p>
            </div>
        </div>
    `;
    
    // Create new window for printing
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent.innerHTML);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
}

// ===== Show Notification =====
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Make functions globally available
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.clearCart = clearCart;
window.printBill = printBill;
window.proceedToPayment = proceedToPayment;
window.processPayment = processPayment;
window.closePaymentModal = closePaymentModal;





