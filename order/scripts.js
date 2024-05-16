const menuData = [
    { id: 1, name: 'Delicious Spring Roll', category: 'Roll Food', price: 100, popularity: 4, totalQuantity: 1 },
    { id: 2, name: 'Cheese Toast', category: 'Break Fast', price: 200, popularity: 5, totalQuantity: 1 },
    { id: 3, name: 'Strawberry cakes', category: 'Dessert', price: 150, popularity: 3, totalQuantity: 1},
    { id: 4, name: 'Veggie Burger', category: 'Meal', price: 300, popularity: 2, totalQuantity: 1 },
    // Add more menu items as needed
];

const orderList = document.getElementById('order-list');
var totalAmount = 0;

function getImageUrl(itemid) {
    if (itemid == 1){
        return 'https://cdn.pixabay.com/photo/2021/11/01/15/52/spring-roll-6760871_640.jpg';
    }
    else if (itemid == 2){
        return 'https://cdn.pixabay.com/photo/2016/11/06/23/31/breakfast-1804457_640.jpg';
    }
    else if (itemid == 3){
        return 'https://cdn.pixabay.com/photo/2014/05/23/23/17/dessert-352475_1280.jpg';
    }
    return 'https://cdn.pixabay.com/photo/2014/10/19/20/59/hamburger-494706_640.jpg';
}


// Function to render menu items
function renderMenuItems(items) {
    const menuContainer = document.getElementById('menu_container');
    menuContainer.innerHTML = '';
    var i = 1;
    items.forEach(item => {
        const menuItem = document.createElement('tr');
        menuItem.className = 'menu-item';
        menuItem.innerHTML = `<td>
            <img src='${getImageUrl(item.id)}'></td>
            <td>
            <h3>${item.name}</h3>
            <p>Category: ${item.category}</p><br>
            <p>Price: $${item.price}</p>
            </td>
            <td>
            <div>
                <button onclick="addToOrder(${item.id})">Add to Cart</button>
            </div>
            </td>
        `;
        menuContainer.appendChild(menuItem);
        i = i + 1;
    });
}

// Initial rendering of menu
renderMenuItems(menuData);

// Event listener for search input
document.getElementById('search').addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    const filteredItems = menuData.filter(item =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm)
    );
    renderMenuItems(filteredItems);
});

// Event listener for sorting select
document.getElementById('sort').addEventListener('change', function () {
    const sortBy = this.value;
    const sortedItems = [...menuData].sort((a, b) => a[sortBy] - b[sortBy]);
    renderMenuItems(sortedItems);
});

// Function to add items to the order
function addToOrder(itemId) {
    const menuItem = menuData.find(item => item.id === itemId);
    if (menuItem) {
        // Check if the item is already in the order
        const existingItem = [...orderList.children].find(item => item.dataset.itemId === `${itemId}`);
        
        if (existingItem) {
            // If the item is already in the order, update the totalQuantity
            menuItem.totalQuantity += 1;
            existingItem.querySelector('.quantity').textContent = menuItem.totalQuantity;
        } else {
            // If the item is not in the order, create a new row
            const listItem = document.createElement('tr');
            listItem.dataset.itemId = `${itemId}`;
            listItem.innerHTML = `
                <td><strong>${menuItem.name}</strong></td>
                <td><span class="quantity">${menuItem.totalQuantity}</span> x $${menuItem.price}</td>
                <td><button onclick="removeFromOrder(${itemId})">Remove</button></td>
            `;
            orderList.appendChild(listItem);
        }
        totalAmount += menuItem.price;
        document.getElementById('total-amount').innerHTML = `<h4>Total Amount: $ ${totalAmount}</h4>`;
    }
}

// Function to remove items from the order
function removeFromOrder(itemId) {
    const menuItem = menuData.find(item => item.id === itemId);
    const listItemToRemove = [...orderList.children].find(item => item.dataset.itemId === `${itemId}`);
    
    if (menuItem.totalQuantity > 1) {
        // If the total quantity is greater than 1, decrement the quantity
        menuItem.totalQuantity -= 1;
        listItemToRemove.querySelector('.quantity').textContent = menuItem.totalQuantity;
    } else if (menuItem.totalQuantity === 1) {
        // If the total quantity is 1, remove the item from the order list
        orderList.removeChild(listItemToRemove);
    }

    // Update the total amount
    totalAmount -= menuItem.price;
    document.getElementById('total-amount').innerHTML = `<h4>Total Amount: $ ${totalAmount}</h4>`;
}
function placeOrder() {

    location.replace("shipping.html");
}