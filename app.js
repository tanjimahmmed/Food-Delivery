// active role
let foodContainer = document.getElementById('food-main');
let triggerElement = document.getElementsByClassName('trigger-btn');

for(let i = 0; i < triggerElement.length; i++){
    triggerElement[i].addEventListener('click', function() {
        let current = document.getElementsByClassName('active-row');

        if(current.length > 0){
            current[0].className = current[0].className.replace(' active-row', '');
        }

        this.className += ' active-row';
    });

    
}

// cart system
const shop = document.getElementById('shop');

let listItem = document.getElementById('listItem');
let totalAmount = document.getElementById('totalAmount');

let checkOut = document.getElementById('checkOut');

let basket = JSON.parse(localStorage.getItem('data')) || [];


let calculation = () => {
    const cartIcon = document.getElementById('cartAmount');
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
}

calculation();

let TotalAmount = () => {
    if(basket.length !== 0){
        let amount = basket.map((x) => {
            let {item, id} = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return item * search.price;
        }).reduce((x, y) => x + y, 0);
        totalAmount.innerHTML = `
        <div>
        <h3 class="text-xl font-semibold text-topTxt uppercase">Total:</h3>
        </div>
        <div>
            <h3 class="text-lg font-bold text-topTxt">$${amount}</h3>
        </div>
        `
    }else return;
}

TotalAmount();




let generateShop = () => {
    return(shop.innerHTML = shopItemsData.map((x) => {
        let {id, name, price, desc, img, rating} = x;
        let search = basket.find((x) => x.id === id) || [];
        return `
        <div class="pt-6 custome-hover item" id=product-id-${id}>
            <div class="shadow-slate-100 shadow-lg relative rounded-xl overflow-hidden">
                <img class="xl:w-60 lg:w-60 md:w-60 sm:w-full w-full xl:h-32 lg:h-28 md:h-32 sm:h-52 h-48 object-cover " src=${img} alt="">
                <div class="flex items-center space-x-2 px-3 py-2 rounded-tr-xl rounded-bl-xl absolute bottom-0 bg-white">
                    <span><img class="w-4" src="./assets/img/icon-star.png" alt=""></span>
                    <span class="text-base font-semibold text-topTxt">${rating}</span>
                </div> 
                <!-- on hover -->
                <div class="price-quantity absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
                    <div class="button-inD flex items-center justify-center space-x-5 text-white text-2xl font-medium">
                        <span class="text-2xl cursor-pointer" onclick="decrement(${id})">-</span>
                        <div class="quantity" id=${id}>
                            ${search.item === undefined ? 0 : search.item}
                        </div>
                        <span class="text-2xl cursor-pointer" onclick="increment(${id})">+</span>
                    </div>
                </div>
            </div>

            <div class="mt-4">
                <h3 class="xl:text-xl lg:text-base md:text-xl sm:text-base text-base font-bold text-topTxt mb-1">${name}</h3>
                <div class="flex items-center justify-between">
                    <h4 class="text-placeHoldInner/90 text-xs font-semibold">${desc}</h4>
                    <h4 class="text-greencus text-sm font-semibold">$${price}</h4>
                </div>
            </div>
        </div>
        `
    }).join(''));
}

generateShop();



let generateCartItems = () => {
    if(basket.length !== 0){
        return (listItem.innerHTML = basket.map((x) => {
            let {id, item} = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            let {img, name, price} = search;
            return `
            <div class="flex justify-between items-center mb-5">
                <div class="flex justify-between items-center space-x-5">
                    <div class=""><img class="w-20 object-cover rounded-xl" src=${img} alt="" style="height: 50px;"></div>
                    <div><h3 class="xl:text-lg lg:text-lg md:text-lg sm:text-lg text-base font-bold text-topTxt mb-1"><span>${item}</span> x ${name}</h3></div>
                </div>
                <div><h3 class="text-placeHoldInner/90 xl:text-base lg:text-base md:text-base sm:text-base text-sm font-semibold">$${item * search.price}</h3></div>
            </div>
            `
        }).join(''));
    }else {
        listItem.innerHTML = ``
        totalAmount.innerHTML = `
        <div>
            <h2 class="text-xl font-semibold text-topTxt uppercase">Cart is Empty</h2>
        </div>
        `
    }
}
generateCartItems();



let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if(search === undefined){
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    }else {
        search.item += 1;
    }

    generateCartItems();

    update(selectedItem.id);

    localStorage.setItem('data', JSON.stringify(basket));
};

let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if(search === undefined) return; 
    else if(search.item === 0) return;
    else {
        search.item -= 1;
    }

    
    update(selectedItem.id);
    
    basket = basket.filter((x) => x.item !== 0);

    generateCartItems();

    localStorage.setItem('data', JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    TotalAmount();
}



let removeItem = (id) => {
    let selectedItem = id;
    basket = basket.filter((x) => x.id !== selectedItem.id);
    generateCartItems();
    TotalAmount();
    calculation();
    localStorage.setItem('data', JSON.stringify(basket));
}

let clearCart = () => {
    basket = [];
    generateShop();
    generateCartItems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
}


let clearCheckout = checkOut.addEventListener('click', clearCart);
