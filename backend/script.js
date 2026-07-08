// ================================
// Glow Beauty Store JavaScript
// ================================

// Cart Counter

let cartCount = 0;

const cartButtons = document.querySelectorAll(".cart-btn");
const cartCounter = document.getElementById("cart-count");

cartButtons.forEach(button => {

    button.addEventListener("click", function () {

        cartCount++;

        if(cartCounter){
            cartCounter.innerHTML = cartCount;
        }

    });

});

// ================================
// Wishlist
// ================================

const wishlistButtons = document.querySelectorAll(".wishlist");

wishlistButtons.forEach(icon=>{

    icon.addEventListener("click",function(){

        this.classList.toggle("fa-solid");
        this.classList.toggle("fa-regular");

        if(this.classList.contains("fa-solid")){

            this.style.color="red";

        }

        else{

            this.style.color="#999";

        }

    });

});

// ================================
// Search Products
// ================================

const searchBox=document.querySelector(".search input");

if(searchBox){

searchBox.addEventListener("keyup",function(){

let value=this.value.toLowerCase();

let cards=document.querySelectorAll(".product-card");

cards.forEach(card=>{

let name=card.querySelector("h3").innerText.toLowerCase();

if(name.includes(value)){

card.style.display="block";

}

else{

card.style.display="none";

}

});

});

}

// ================================
// Shop Now Button
// ================================

const shopButton=document.querySelector(".banner button");

if(shopButton){

shopButton.addEventListener("click",()=>{

document.querySelector(".products").scrollIntoView({

behavior:"smooth"

});

});

}

// ================================
// Product Hover Animation
// ================================

const cards=document.querySelectorAll(".product-card");

cards.forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.transform="translateY(-8px)";

});

card.addEventListener("mouseleave",()=>{

card.style.transform="translateY(0px)";

});

});

// ================================
// Welcome Message
// ================================

window.onload=function(){

console.log("Glow Beauty Store Loaded Successfully ❤️");

}