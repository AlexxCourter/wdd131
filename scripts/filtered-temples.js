class DateManager {
    lastModified;
    copyYear;

    constructor(){
        this.genCopyYear();
        this.genLastModified();
    }

    genCopyYear(){
        this.copyYear = new Date().getFullYear();
    }

    genLastModified(){
        this.lastModified = document.lastModified;
    }

    displayLastModified(){
        return this.lastModified.toString();
    }

    displayCopyYear(){
        return `${this.copyYear}`;
    }
}

/**
 * HamburgerMenu
 * class defines basic functionality for a hamburger menu on the page.
 * constructed using a reference to a button element either by getElementById or querySelector.
 * The class can then be used to assign functionality to that hamburger button.
 * The class also accepts the navigation menu that will be associated to the button,
 * and can be used to provide the proper classes to that menu.
 * NOTE: the CSS class "open" is associated with this function. Ensure it is properly
 * defined in the stylesheet.
 * @param buttonEl : HTMLButtonElement reference
 * @param navEl : HTMLNav reference
 */
class HamburgerMenu {
    btn;
    nav;

    constructor(buttonEl, navEl){
        this.btn = buttonEl;
        this.nav = navEl
    }

    setMenuListener(){
        //the .open class must be defined in the stylesheet.
        this.btn.addEventListener('click', () => {
            this.nav.classList.toggle('open');
            this.btn.classList.toggle('open');
        })
    }
}

function pageTitle(){
    const pageTitleEl = document.getElementById('page-title');
    const activePageEl = document.querySelector('.active');

    pageTitleEl.textContent = activePageEl.textContent;
}

/* 
DYNAMIC IMAGE LOADER
*/
//image data
const temples = [
    {
      templeName: "Aba Nigeria",
      location: "Aba, Nigeria",
      dedicated: "2005, August, 7",
      area: 11500,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
      templeName: "Manti Utah",
      location: "Manti, Utah, United States",
      dedicated: "1888, May, 21",
      area: 74792,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
      templeName: "Payson Utah",
      location: "Payson, Utah, United States",
      dedicated: "2015, June, 7",
      area: 96630,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
      templeName: "Yigo Guam",
      location: "Yigo, Guam",
      dedicated: "2020, May, 2",
      area: 6861,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
      templeName: "Washington D.C.",
      location: "Kensington, Maryland, United States",
      dedicated: "1974, November, 19",
      area: 156558,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
      templeName: "Lima Perú",
      location: "Lima, Perú",
      dedicated: "1986, January, 10",
      area: 9600,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
      templeName: "Mexico City Mexico",
      location: "Mexico City, Mexico",
      dedicated: "1983, December, 2",
      area: 116642,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    // Add more temple objects here...
    {
        templeName: "Philadelphia Pennsylvania",
        location: "Philadelphia, Pennsylvania",
        dedicated: "2016, September, 18",
        area: 61466,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/philadelphia-pennsylvania/400x250/philadelphia-pennsylvania-temple-exterior-1775822-wallpaper.jpg"
      },
      {
        templeName: "Toronto Ontario",
        location: "Ontario, Canada",
        dedicated: "1990, August, 25",
        area: 57982,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/toronto-ontario/400x250/toronto-temple-lds-854102-wallpaper.jpg"
      },
      {
        templeName: "Fukuoka Japan",
        location: "Fukuoka, Japan",
        dedicated: "2000, June, 11",
        area: 10700,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/fukuoka-japan/400x250/fukuoka-japan-temple-lds-306863-wallpaper.jpg"
      }
  ];

/**
 * templeCardGenerator
 * Takes an array of temple objects and displays the stats of each temple to the screen
 * by generating "card" objects in the DOM. The generated objects are placed at a specified location.
 * @param {Array} templeArray a list of temple objects that will be generated as temple cards.
 */
function templeCardGenerator(templeArray){
    const location = document.querySelector('main');
    //delete content to reload
    location.innerHTML = "";

    templeArray.forEach(temple => {
        let card = document.createElement('div');
        card.classList.add('card-container');
        card.innerHTML = `
            <h2 class="card-title">${temple.templeName}</h2>
            <p>Location: ${temple.location}</p>
            <p>Dedicated: ${temple.dedicated}</p>
            <p>Size: ${temple.area} sq. ft.</p>
            <img class="card-img" src="${temple.imageUrl}" width="400" height="250" alt="${temple.templeName}" loading="lazy" />
        `;
        location.appendChild(card);
    })
}

/**
 * setNavListeners
 * using the navigation link nodes on the page, this function sets click listeners
 * to filter displayed data depending on the selected link. The "active" link is also
 * changed upon click by toggling the active class in the navigation bar.
 */
function setNavListeners(){
  //get nav links
  let homeLink = document.getElementById('home-link');
  let oldLink = document.getElementById('old-link');
  let newLink = document.getElementById('new-link');
  let largeLink = document.getElementById('large-link');
  let smallLink = document.getElementById('small-link');

  let linkList = document.querySelectorAll('.nav-link');

  //setNavListeners becomes the higher order function for this simple class toggle.
  function setActiveLink(linkNode){
    linkList.forEach(node => {node.classList.remove('active')});
    linkNode.classList.add('active');
  }

  //home returns all cards
  homeLink.addEventListener('click', ()=>{
    templeCardGenerator(temples);
    setActiveLink(homeLink);
  });
  //old returns temples from before 1900
  oldLink.addEventListener('click', ()=>{
    templeCardGenerator(temples.filter(temple => Number(temple.dedicated.slice(0,4)) < 1900));
    setActiveLink(oldLink);
  });
  //new returns temples after 2000
  newLink.addEventListener('click', ()=>{
    templeCardGenerator(temples.filter(temple => Number(temple.dedicated.slice(0,4)) > 2000));
    setActiveLink(newLink);
  });
  //large returns temples larger than 90,000 sq. ft.
  largeLink.addEventListener('click', ()=>{
    templeCardGenerator(temples.filter(temple => temple.area > 90000));
    setActiveLink(largeLink);
  });
  //small returns temples smaller than 10,000 sq. ft.
  smallLink.addEventListener('click', ()=>{
    templeCardGenerator(temples.filter(temple => temple.area < 10000));
    setActiveLink(smallLink);
  });
}

/**
 * main
 * establishes the DateManager and HanburgerMenu which control date functions and the menu button respectively.
 * 
 */
function main() {
    const manager = new DateManager();

    const menuBtn = document.querySelector('.menu-btn');
    const navi = document.querySelector('.site-nav');
    const hamburger = new HamburgerMenu(menuBtn, navi);
    hamburger.setMenuListener();

    const currentYear = document.getElementById('currentYear');
    const lastModified = document.getElementById('lastModified');

    currentYear.innerHTML = manager.displayCopyYear();
    lastModified.innerHTML = `Last modified: ${manager.displayLastModified()}`;

    pageTitle();
    //initial page load
    templeCardGenerator(temples);
    //see filtered content by setting link listeners
    setNavListeners();
}

main();