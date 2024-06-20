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
}

main();