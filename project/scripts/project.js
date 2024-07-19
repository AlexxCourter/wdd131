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

const test = [
    {task: "test", hours: 2},
    {task: "test", hours: 4},
    {task: "test", hours: 5}
]

class TimeBank {
    key = 'timebank';
    data;

    constructor(){
        if(this.readFromLS()){
            this.data = this.readFromLS();
        }
        else {
            //remove test data
            this.data = {
                'ess': [...test],
                'noness': [...test],
                'free': 24
            }
        }
        this.calcStats();
        this.calcTimeCost();
        
        this.renderAllTasks();
    }

    readFromLS(){
        return JSON.parse(localStorage.getItem(this.key));
    }

    saveToLS(data){
        localStorage.setItem(this.key, JSON.stringify(data));
    }

    addEssTask(name, hours){
        this.data.ess.push({'task': name, 'hours': hours});
    }
    addNonEssTask(name, hours){
        this.data.noness.push({'task': name, 'hours': hours});
    }

    renderAllTasks(){
        if(document.querySelector('.pl')){
            //ensure dropzones are empty
            document.getElementById('ess_dropzone').innerHTML = "";
            document.getElementById('noness_dropzone').innerHTML = "";
            //render all tasks.
            this.data.ess.forEach(task => {
                let item = document.createElement('div');
                item.classList.add('task-container');
                item.innerHTML = `
                    <p class="task">${task.task} <span>${task.hours}</span></p>
                    <button type="button" data-index="${this.data.ess.indexOf(task)}" data-type="ess" class="delete">❌</button>
                `;
    
                document.getElementById('ess_dropzone').appendChild(item);
            });
    
            this.data.noness.forEach(task => {
                let item = document.createElement('div');
                item.classList.add('task-container');
                item.innerHTML = `
                    <p class="task">${task.task} <span>${task.hours}</span></p>
                    <button type="button" data-index="${this.data.noness.indexOf(task)}" data-type="noness" class="delete">❌</button>
                `;
    
                document.getElementById('noness_dropzone').appendChild(item);
            });

            //set delete listeners
            document.querySelectorAll('.delete').forEach(btn =>{
                btn.addEventListener('click', ()=>{
                    this.deleteTask(btn.dataset.type, btn.dataset.index)
                })
            })
        }
    }

    calcStats(){
        if(document.querySelector('.tb')){
            document.getElementById('stat-today').textContent = this.data.free;

            document.getElementById('day').textContent = this.data.free;
            let month = new Date().getMonth();
            let year = new Date().getFullYear();
            let monthdays = new Date(month, year, 0).getDate();
            document.getElementById('month').textContent = this.data.free * monthdays;

            document.getElementById('year').textContent = this.data.free * 365;

            //icon adjustments
            if(this.data.free > 2) {
                document.getElementById('pig_icon').src = './images/piggy_icon_happy.png';
            } else if (this.data.free < 2) {
                document.getElementById('pig_icon').src = './images/piggy_icon_sad.png';
            }
        }
    }

    calcTimeCost(){
        if(document.querySelector('.tb')){
            if(this.data.ess.length > 0){
                let todayTotal = 0;
                this.data.ess.forEach(task => {
                    todayTotal += Number(task.hours);
                });
                document.getElementById('eday').textContent = todayTotal;

                let month = new Date().getMonth();
                let year = new Date().getFullYear();
                let monthdays = new Date(month, year, 0).getDate();

                document.getElementById('emonth').textContent = todayTotal * monthdays;
                document.getElementById('eyear').textContent = todayTotal * 365;
            }

            if(this.data.noness.length > 0){
                let todayTotal = 0;
                this.data.noness.forEach(task => {
                    todayTotal += Number(task.hours);
                });
                document.getElementById('nday').textContent = todayTotal;

                let month = new Date().getMonth();
                let year = new Date().getFullYear();
                let monthdays = new Date(month, year, 0).getDate();

                document.getElementById('nmonth').textContent = todayTotal * monthdays;
                document.getElementById('nyear').textContent = todayTotal * 365;
            }
        }
    }

    addNewTask(type){
        let task = {task: '', hours: ''}
        if(type === "add_ess"){
            task.task = document.getElementById('essentials').value;
            task.hours = document.getElementById('ess-hours').value;
        } else if (type === "add_noness") {
            task.task = document.getElementById('nonessentials').value;
            task.hours = document.getElementById('noness-hours').value;
        } else {
            console.log("error: type of task was not specified.");
        }

        if (this.data.free < task.hours){
            alert(`Adding that task will go over your available free time! Please enter a task that is ${this.data.free} hours or less.`)
        } else {
            this.data.free = this.data.free - task.hours;
            if(type === "add_ess"){
                this.data.ess.push(task);
            } else if (type === "add_noness") {
                this.data.noness.push(task);
            }
            this.renderAllTasks();
            this.saveToLS(this.data);
        }
    }

    setListeners(){
        if(document.querySelector('.pl')){
            document.querySelectorAll('.add-btn').forEach(btn =>{
                btn.addEventListener('click', ()=>{
                    this.addNewTask(btn.id);
                })
            })
        }
    }

    deleteTask(type, index){
        if (type === "ess"){
            this.data.ess.splice(index, 1);
            this.renderAllTasks();
            this.saveToLS(this.data);
        } else if (type === "noness"){
            this.data.noness.splice(index, 1);
            this.renderAllTasks();
            this.saveToLS(this.data);
        }
    }

}

function main(){
    const manager = new DateManager();
    const currentYear = document.getElementById('currentYear');
    const lastModified = document.getElementById('lastModified');

    const menuBtn = document.querySelector('.menu-btn');
    const navi = document.querySelector('.site-nav');
    const hamburger = new HamburgerMenu(menuBtn, navi);
    hamburger.setMenuListener();

    currentYear.innerHTML = manager.displayCopyYear();
    lastModified.innerHTML = `Last modified: ${manager.displayLastModified()}`;

    const tb = new TimeBank();
    tb.setListeners();
}

main();