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

const products = [
    {
      id: 'fc-1888',
      name: "flux capacitor",
      averagerating: 4.5
    },
    {
      id: 'fc-2050',
      name: "power laces",
      averagerating: 4.7
    },
    {
      id: 'fs-1987',
      name: "time circuits",
      averagerating: 3.5
    },
    {
      id: 'ac-2000',
      name: "low voltage reactor",
      averagerating: 3.9
    },
    {
      id: 'jj-1969',
      name: "warp equalizer",
      averagerating: 5.0
    }
  ];

function setProducts(productList){
    let selectEl = document.getElementById('product');

    productList.forEach(product => {
        let productEl = document.createElement('option');
        productEl.value = product.id;
        productEl.textContent = product.name;

        selectEl.appendChild(productEl);
    });
}

/**
 * writeToLS
 * helper function which stores a data object via JSON string
 * to local storage with a specified key.
 * 
 * @param key | String | the identifier which the data will be saved under in LS
 * @param data | Object | a data object (can be an array) that will be saved in JSON string format
 */
function writeToLS(key, data){
    localStorage.setItem(key, JSON.stringify(data));
}

function getReviewCount(){
    return JSON.parse(localStorage.getItem('reviews'));
}

function countReviews(currentCount){
    //increases the review counter.
    if(document.getElementById('reviewCount')){
        writeToLS('reviews', currentCount +1);
    }
    
}

function main(){
    const manager = new DateManager();
    const currentYear = document.getElementById('currentYear');
    const lastModified = document.getElementById('lastModified');

    currentYear.innerHTML = manager.displayCopyYear();
    lastModified.innerHTML = `Last modified: ${manager.displayLastModified()}`;

    //load options for products
    if(document.getElementById('product')){
        setProducts(products);
    }
    //review counter
    let reviewCount = getReviewCount() || 0;
    countReviews(reviewCount);
    if(document.getElementById('reviewCount')){
        if(reviewCount == 0){
            reviewCount = 1; //ensures not left at 0 on first load
        }
        document.getElementById('reviewCount').textContent = reviewCount;
    }

}

main();