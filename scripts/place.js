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

function calculateWindChill(temperature, windSpeed){
    return 13.12 + 0.6215 * temperature - 11.37 * (windSpeed ** 0.16) + 0.3965 * temperature * (windSpeed ** 0.16);
}

function main(){
    const manager = new DateManager();
    const currentYear = document.getElementById('currentYear');
    const lastModified = document.getElementById('lastModified');

    currentYear.innerHTML = manager.displayCopyYear();
    lastModified.innerHTML = `Last modified: ${manager.displayLastModified()}`;

    let temp = 2;
    let wind = 7;
    //calc wind chill
    if(temp <= 10 && wind >= 4.8){
        document.getElementById('windChill').innerHTML = ` ${calculateWindChill(temp, wind).toFixed(2)} &deg;C`
    }
}

main();