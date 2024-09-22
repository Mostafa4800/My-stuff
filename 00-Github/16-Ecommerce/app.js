const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');
const navLogo = document.querySelector('#navbar__logo');

// Display Mobile Menu
const mobileMenu = () => {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
};

menu.addEventListener('click', mobileMenu);

// Show active menu when scrolling
const highlightMenu = () => {
    const elem = document.querySelector('.highlight');
    const aboutMenu = document.querySelector('#about-page');
    const productsMenu = document.querySelector('#products-page');
    const shopMenu = document.querySelector('#shop-page');
    const contactMenu = document.querySelector('#contact-page');

    let scrollPos = window.scrollY;
console.log(scrollPos);

    // adds 'highlight' class to my menu items
    if (window.innerWidth > 960 && scrollPos < 899) {
        aboutMenu.classList.remove('highlight');
        productsMenu.classList.remove('highlight');
        shopMenu.classList.remove('highlight');
                contactMenu.classList.remove('highlight');
        return;
    } else if (window.innerWidth > 960 && scrollPos < 1743) {
        aboutMenu.classList.add('highlight');
        productsMenu.classList.remove('highlight');
        shopMenu.classList.remove('highlight');
        contactMenu.classList.remove('highlight');
        return;
    } else if (window.innerWidth > 960 && scrollPos < 2971) {
        productsMenu.classList.add('highlight');
        aboutMenu.classList.remove('highlight');
        shopMenu.classList.remove('highlight');
        contactMenu.classList.remove('highlight');
        return;
    } else if (window.innerWidth > 960 && scrollPos < 3815) {
        shopMenu.classList.add('highlight');
        productsMenu.classList.remove('highlight');
        aboutMenu.classList.remove('highlight');
        contactMenu.classList.remove('highlight');
        return;
    } else if (window.innerWidth > 960 && scrollPos < 5000) {
        contactMenu.classList.add('highlight');
        shopMenu.classList.remove('highlight');
        productsMenu.classList.remove('highlight');
        aboutMenu.classList.remove('highlight');
        console.log(1);
        return;
    }

    if ((elem && window.innerWIdth < 960 && scrollPos < 600) || elem) {
        elem.classList.remove('highlight');
    }
};

window.addEventListener('scroll', highlightMenu);
window.addEventListener('click', highlightMenu);

//  Close mobile Menu when clicking on a menu item
const hideMobileMenu = () => {
    const menuBars = document.querySelector('.is-active');
    if (window.innerWidth <= 768 && menuBars) {
        menu.classList.toggle('is-active');
        menuLinks.classList.remove('active');
    }
};

menuLinks.addEventListener('click', hideMobileMenu);
navLogo.addEventListener('click', hideMobileMenu);

//api

const apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic";
const apiUrl2 = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic";


// Make a GET request
fetch(apiUrl2)
  .then(response => {
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Data not found');
      } else if (response.status === 500) {
        throw new Error('Server error');
      } else {
        throw new Error('Network response was not ok');
      }
    }
    return response.json();
  })
  .then(data => {
    console.log("Data received:", data); // Logging the data structure
    const product = document.getElementById('products2');
  
    // Access the 'drinks' array from the 'data' object
    const drinks = data.drinks;

    // Check if 'drinks' is an array
    if (Array.isArray(drinks)) {
      drinks.forEach(item => {
        const div = document.createElement('div');
        
        // Customize this to display specific properties of the item
        const name = document.createElement('h2');
        name.textContent = item.strDrink; // Assuming 'strDrink' is a property of the item
        div.appendChild(name);
        
        const image = document.createElement('img');
        image.src = item.strDrinkThumb; // Assuming 'strDrinkThumb' is a property of the item
        image.alt = item.strDrink; // Set alt text to the name of the item
        div.appendChild(image);
        
        const description = document.createElement('p');
        description.textContent = item.strInstructions || 'No description available'; // Assuming 'strInstructions' is a property of the item
        div.appendChild(description);
        
        product.appendChild(div);
      });
    } else {
      console.error("Data is not an array:", drinks);
    }
  })
    

   /* data.forEach(item => {
      const div = document.createElement('div');
      div.textContent = JSON.stringify(item); // Customize this to display the data as needed
      product.appendChild(div);
    });
    */
  

  .catch(error => {
    console.error('Error:', error);
  });

  fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Data not found');
      } else if (response.status === 500) {
        throw new Error('Server error');
      } else {
        throw new Error('Network response was not ok');
      }
    }
    return response.json();
  })
  .then(data => {
    console.log("Data received:", data); // Logging the data structure
    const product = document.getElementById('products2');
  
    // Access the 'drinks' array from the 'data' object
    const drinks = data.drinks;

    // Check if 'drinks' is an array
    if (Array.isArray(drinks)) {
      drinks.forEach(item => {
        const div = document.createElement('div');
        
        // Customize this to display specific properties of the item
        const name = document.createElement('h2');
        name.textContent = item.strDrink; // Assuming 'strDrink' is a property of the item
        div.appendChild(name);
        
        const image = document.createElement('img');
        image.src = item.strDrinkThumb; // Assuming 'strDrinkThumb' is a property of the item
        image.alt = item.strDrink; // Set alt text to the name of the item
        div.appendChild(image);
        
        const description = document.createElement('p');
        description.textContent = item.strInstructions || 'No description available'; // Assuming 'strInstructions' is a property of the item
        div.appendChild(description);
        
        product.appendChild(div);
      });
    } else {
      console.error("Data is not an array:", drinks);
    }
  })
    

   /* data.forEach(item => {
      const div = document.createElement('div');
      div.textContent = JSON.stringify(item); // Customize this to display the data as needed
      product.appendChild(div);
    });
    */
  

  .catch(error => {
    console.error('Error:', error);
  });