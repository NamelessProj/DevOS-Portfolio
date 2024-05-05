// SCREEN SIZE LIMIT
const screenSizeLimit = document.getElementById("screenSizeLimit");
const closeScreenSizeLimit = document.getElementById("closeScreenSizeLimit");
closeScreenSizeLimit.addEventListener('click', () => { screenSizeLimit.classList.add("hidden"); });



// PRELOADER

if(document.getElementById('loaderAnimation')){
    const progressbar = document.getElementById('loaderAnimation');
    let progress = 0;
    let currentStep = 0;
    const maxSteps = 10;

    function enableProgressBar(){
        progressbar.setAttribute('role', 'progressbar');
        progressbar.setAttribute('aria-valuenow', progress);
        progressbar.setAttribute('aria-live', 'polite');
    }

    let intervalTimer = null;

    function updateProgress(progress){
        progressbar.setAttribute("aria-valuenow", progress);
        progressbar.style.setProperty("--progress", progress + "%");
    }

    function startProgressAnimation(){
        // aria-busy prevents it from announcing every change as it keeps updating the progress
        progressbar.setAttribute("aria-busy", "true");
        let progress = 0;
        updateProgress(progress);

        intervalTimer = setInterval(() => {
            progress = currentStep === maxSteps ? 100 : progress + Math.floor(Math.random() * 16); // ADDING A MAX-STEP TO PREVENT THE LOADER TO TAKE FOREVER
            if(progress > 100) progress = 100;
            currentStep++;
            updateProgress(progress);
            if(progress === 100){
                progressbar.setAttribute("aria-busy", "false");
                clearInterval(intervalTimer);
                sessionStorage.setItem('loaderAnimationOnce', '1');
                setTimeout(() => { document.getElementById('preloader').classList.add('loaded'); }, 500);
                setTimeout(() => { document.getElementById('preloader').classList.add('loadedJS'); }, 2000);
            }
        }, 500);
    }
    enableProgressBar();
    startProgressAnimation();
}



// SCREEN TURN OFF

const screenTurnOff = document.getElementById('screenTurnOff');
const shutdownScreenBtn = document.getElementById('shutdownScreen');
let screenOff = false;

shutdownScreenBtn.addEventListener('click', () => {
    screenTurnOff.classList.add('off');
    startMenu.classList.remove('open');
    setTimeout(() => { screenOff = true; });
});

// ENABLE SCREEN WHEN MOUSE MOVE
window.addEventListener('mousemove', () => {
    if(screenOff){
        screenTurnOff.classList.remove('off');
        screenOff = false;
    }
});



function getRandomInt(min, max, negative = false, round = true) {
    const minCeiled = round ? Math.ceil(min) : min;
    const maxFloored = round ? Math.floor(max) : max;
    const answer = negative ? (Math.random() * (maxFloored * 2 - minCeiled) + minCeiled) - maxFloored : Math.random() * (maxFloored - minCeiled) + minCeiled;
    return round ? Math.floor(answer) : answer;
}

function getRandomRGB(){
    let o = Math.round,
        r = Math.random,
        s = 255;
    return `rgb(${o(r()*s)} ${o(r()*s)} ${o(r()*s)})`;
}

function addCrownToProfilePicture(){
    document.getElementById('startMenuFooter').classList.add('crown');
}



// HANDLE THE ACTIVATION OF DevOS
if(document.getElementById('activateYourWindows')){
    const devOS = document.getElementById('activateYourWindows');
    const crownContainer = document.getElementById('crownContainer');
    const maxConfetti = 20;

    if(!sessionStorage.getItem('crown')){
        for(let i = 0; i < maxConfetti; i++){
            const elem = document.createElement('i');
            elem.style.cssText = `--x: ${getRandomInt(50, 250, true)}px; --y: ${getRandomInt(50, 250, true)}px; --color: ${getRandomRGB()}; --scale: ${getRandomInt(0.7, 2, false, false)};`;
            crownContainer.appendChild(elem);
        }
    }

     // ACTIVATE DevOS
    devOS.addEventListener('click', () => {
        handleSound('EXPLOSION');
        const animationDuration = Number(getComputedStyle(document.getElementById('crownContainer')).getPropertyValue('--animation-duration').split('ms')[0]);
        crownContainer.classList.add('play');
        devOS.classList.add('activated');
        addCrownToProfilePicture();
        sessionStorage.setItem('DevOSIsActivated', '1');
        setTimeout(() => { crownContainer.style.display = 'none'; }, animationDuration);
    });
    devOS.classList.toggle('activated', sessionStorage.getItem('DevOSIsActivated'));
}

if(sessionStorage.getItem('DevOSIsActivated')) addCrownToProfilePicture();



// WEBSITE

const timeContainer = document.getElementById('time');
const dateContainer = document.getElementById('date');

let windowsHeight = document.body.clientHeight;
let windowsWidth = document.body.clientWidth;



// PUT TODAY'S DATE TO ELEMENTS WHO NEED

const getTodayElements = document.querySelectorAll('.get-today');
const TODAY = new Date();

const todayDate = TODAY.toLocaleDateString('en-Gb').split('/');
const todayDate_day = todayDate[0];
const todayDate_month = todayDate[1];
const todayDate_year = todayDate[2];

let timeNow_hours = String(TODAY.getHours());
let timeNow_minutes = String(TODAY.getMinutes());

if(timeNow_hours.length === 1) timeNow_hours = '0' + timeNow_hours;
if(timeNow_minutes.length === 1) timeNow_minutes = '0' + timeNow_minutes;

getTodayElements.forEach(elem => {
    elem.innerText = `${todayDate_day}.${todayDate_month}.${todayDate_year} ${timeNow_hours}:${timeNow_minutes}`;
});



function changePseudo(pseudo){
    document.querySelector('#startMenuFooter .user-wrapper span').innerText = pseudo;
    sessionStorage.setItem('userName', pseudo); // SAVE THE NAME OF USER
}

function changeProfilePicture(seed){
    profilePictureCont.src = 'https://api.dicebear.com/8.x/fun-emoji/svg?seed=' + seed;
    sessionStorage.setItem('profilePicture', seed); // SAVE THE PROFILE PICTURE SEED
}


// GET PROFILE PICTURE

const profilePictureCont = document.querySelector('#startMenuFooter .user-wrapper img');

// IF THE PROFILE PICTURE ALREADY EXIST, WE TAKE THIS ONE
const profilePictureSeed = sessionStorage.getItem('profilePicture') ? sessionStorage.getItem('profilePicture') : new Date().getTime();
changeProfilePicture(profilePictureSeed);


// GET THE USERNAME IF IT EXIST
if(sessionStorage.getItem('userName')) changePseudo(sessionStorage.getItem('userName'));



// GET TIME AND DATE

function getDate(){
    const dateNow = new Date();
    const year = dateNow.getFullYear();
    let month = String(dateNow.getMonth());
    let day = String(dateNow.getDate());

    if(month.length < 2) month = `0${month}`;
    if(day.length < 2) day = `0${day}`;

    dateContainer.innerText = `${day}.${month}.${year}`;
}

function getTime(){
    const dateNow = new Date();
    let hours = String(dateNow.getHours());
    let minutes = String(dateNow.getMinutes());

    if(hours.length < 2) hours = `0${hours}`;
    if(minutes.length < 2) minutes = `0${minutes}`;

    if(minutes === '00' && hours === '00') getDate(); // IF MIDNIGHT, GET NEW DATE

    timeContainer.innerText = `${hours}:${minutes}`;
}

// INITIALIZE TIME AND DATE
getTime();
getDate();
setInterval(getTime, 5000); // CHECK TIME EVERY 5 SECONDS


// OPEN PROGRAMS
function openProgram(button){
    if(document.body.classList.contains('page')) return alert(`Why would you open another program if you're already on that one?`);
    const program = button.dataset.exe ? button.dataset.exe : 'programDoesNotExist';
    if(document.getElementById(program).classList.contains('open')){
        document.getElementById(program).classList.add('focus');
        setTimeout(() => { document.getElementById(program).classList.remove('focus'); }, 500);
    }else document.getElementById(program).classList.add('open');
}



// HANDLE CLICK ON SCREEN ELEMENTS
function removeClickedClassToScreenElements(){
    const clickedElem = document.querySelectorAll('.screen-element.clicked');
    if(clickedElem.length > 0){
        clickedElem.forEach(clickEl => {
            clickEl.classList.remove('clicked');
        });
    }
}
const screenElements = document.querySelectorAll('.screen-element');
screenElements.forEach(elem => {
    elem.addEventListener('click', (e) => {
        e.stopPropagation();
        removeClickedClassToScreenElements();
        elem.classList.add('clicked');
    });
});
window.addEventListener('click', removeClickedClassToScreenElements);



// HANDLE CLICK ON DESKTOP ELEMENTS IN FILE EXPLORER
const desktopElementsFileExplorer = document.querySelectorAll('#fileExplorer .exeFile');
desktopElementsFileExplorer.forEach(elem => {
    elem.addEventListener('click', () => {
        const allClickedElems = document.querySelectorAll('#fileExplorer .exeFile.clicked');
        allClickedElems.forEach(clickedElem => { clickedElem.classList.remove('clicked'); });
        elem.classList.add('clicked');
    });
});



// HANDLE RESCALE
document.addEventListener('resize', () => {
    windowsHeight = document.body.clientHeight;
    windowsWidth = document.body.clientWidth;
});



// WIFI AND BATTERY MENU
let wifiBatteryMenuJustOpen = false;
const wifiMenuBtn = document.getElementById('wifiMenuBtn');
const wifiBatteryMenu = document.getElementById('wifiBattery');
wifiMenuBtn.addEventListener('click', () => {
    wifiMenuBtn.classList.toggle('open');
    wifiBatteryMenu.classList.toggle('open');
    if(wifiMenuBtn.classList.contains('open')){
        wifiBatteryMenuJustOpen = true;
        setTimeout(() => { wifiBatteryMenuJustOpen = false; });
    }
});



// HANDLE CLICK ON WIFI AND BATTERY MENU BUTTONS
const wifiBatteryMenuButtons = document.querySelectorAll('#wifiBattery button');
wifiBatteryMenuButtons.forEach(btn => {
    btn.addEventListener('click', () => { btn.classList.toggle('active'); });
});



// HANDLE NOTIFICATIONS PANEL
let notificationsPanelJustOpen = false;
const notificationsPanel = document.getElementById('notificationsPanel');
const notificationsButton = document.getElementById('notifications');
notificationsButton.addEventListener('click', () => {
    notificationsPanel.classList.toggle('open');
    notificationsButton.classList.toggle('open');
    if(notificationsButton.classList.contains('open')){
        notificationsButton.classList.add('been-opened');
        sessionStorage.setItem('notificationsOpened', '1');
    }
    notificationsPanelJustOpen = true;
    setTimeout(() => { notificationsPanelJustOpen = false; });
});

// GET IF WE'VE ALREADY READ THE NOTIFICATIONS
if(sessionStorage.getItem('notificationsOpened')) notificationsButton.classList.add('been-opened');


// CLEAR ALL NOTIFICATIONS
const clearNotificationsPanel = document.getElementById('notificationsPanelClear');
const notificationsPanelBody = document.getElementById('notificationsPanelBody');
clearNotificationsPanel.addEventListener('click', () => {
    const allNotifications = document.querySelectorAll('#notificationsPanelBody .notification-block');
    allNotifications.forEach(notification => { notification.style.display = 'none'; });
    notificationsPanelBody.classList.add('empty');
    sessionStorage.setItem('notificationsEmpty', '1');
});

// IF WE'VE ALREADY DELETE NOTIFICATIONS THEY'RE DELETED FOREVER (almost)
if(sessionStorage.getItem('notificationsEmpty')){
    const allNotifications = document.querySelectorAll('#notificationsPanelBody .notification-block');
    allNotifications.forEach(notification => { notification.style.display = 'none'; });
    notificationsPanelBody.classList.add('empty');
}



function toggleStartMenu(){
    startMenu.classList.toggle('open');
    menuStartJustOpen = true;
    setTimeout(() => { menuStartJustOpen = false; });
}

// HANDLE START MENU
let menuStartJustOpen = false;
const startMenu = document.getElementById('startMenu');
const windowsButton = document.getElementById('windowsMenu');
windowsButton.addEventListener('click', toggleStartMenu);
window.addEventListener('keydown', (e) => {
    if(e.keyCode === 91){ // IF THE WINDOWS BUTTON ON THE USER'S KEYBOARD IS PRESSED, OPEN THE START MENU OF MY WEBSITE
        e.preventDefault();
        toggleStartMenu();
    }
});



// CLOSE START MENU, WIFI & BATTERY MENU WHEN CLICKED OUTSIDE OF THEM
document.addEventListener('click', (e) => {
    if(!menuStartJustOpen && startMenu.classList.contains('open') && !startMenu.contains(e.target)) startMenu.classList.remove('open');
    if(!wifiBatteryMenuJustOpen && wifiBatteryMenu.classList.contains('open') && !wifiBatteryMenu.contains(e.target)){
        wifiBatteryMenu.classList.remove('open');
        wifiMenuBtn.classList.remove('open');
    }
    if(!notificationsPanelJustOpen && notificationsPanel.classList.contains('open') && !notificationsPanel.contains(e.target)){
        notificationsPanel.classList.remove('open');
        notificationsButton.classList.remove('open');
    }
});



// HANDLE START MENU AND TASKBAR ACTIONS

const programsCloseButton = document.querySelectorAll('#screen .program .programCloseButton'); // GET ALL PROGRAM CLOSE BUTTON
const programDoesNotExist = document.getElementById('programDoesNotExist'); // IF THE PROGRAM DOES NOT EXIST, WE ENABLE THIS ONE TO LET THE USER KNOW
const programsAction = document.querySelectorAll('[data-program="click"]');

programsAction.forEach(button => {
    button.addEventListener('click', () => {
        if(button.dataset.link){
            window.open(button.dataset.link,'_blank');
        }else openProgram(button);

        startMenu.classList.remove('open');
    });
});

// CLOSE THE PROGRAM
programsCloseButton.forEach(button => {
    button.addEventListener('click', () => {
        const parentProgram = button.parentElement.parentElement.parentElement;
        parentProgram.classList.remove('open');
    });
});



// HANDLE EXPAND PROGRAM
const expandButtons = document.querySelectorAll('#screen .program .programToggleFullScreen');
expandButtons.forEach(button => {
    button.addEventListener('click', () => {
        const parent = button.parentElement.parentElement.parentElement;
        parent.classList.toggle('expand');
    });
});



// HANDLE MOVE PROGRAM

const programs = document.querySelectorAll('#screen .program');
programs.forEach(program => {
    let posX = 0,
        posY = 0,
        mouseX = 0,
        mouseY = 0;

    function moveElement(e){
        mouseX = e.clientX - posX;
        mouseY = e.clientY - posY;
        program.style.left = `${mouseX}px`;
        program.style.top = `${mouseY}px`;
    }

    function mouseDown(e){
        e.preventDefault();
        if(program.classList.contains('expand')){
            mouseUp();
            return;
        }

        posX = e.clientX - program.offsetLeft;
        posY = e.clientY - program.offsetTop;
        window.addEventListener('mousemove', moveElement, false);
    }

    function mouseUp(){
        window.removeEventListener('mousemove', moveElement, false);
    }

    program.querySelector('header').addEventListener('mousedown', mouseDown, false);
    window.addEventListener('mouseup', mouseUp, false);
});



// HANDLE CONTEXTMENU
const contextMenuObject = [
    {
        Svg: 'M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z',
        Link: 'mailto:pintokevin2002@hotmail.com',
        Name: 'Contact me'
    },
    {
        Svg: 'M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z',
        Link: 'https://www.instagram.com/_kevin_pin?igsh=MThxMWFmN2tra3FkZw%3D%3D&utm_source=qr',
        Name: 'Instagram'
    }
];
const contextMenu = document.getElementById('contextMenu');
const contextMenuHeight = contextMenu.clientHeight;
const contextMenuWidth = contextMenu.clientWidth;

// ADDING ALL LINKS IN CONTEXTMENU
contextMenuObject.forEach(obj => {
    contextMenu.innerHTML += `<div class="contextmenu-section">
                <a href="${obj.Link}" target="_blank" class="contextmenu-row">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" height="20">
                        <path d="${obj.Svg}"/>
                    </svg>
                    <p>${obj.Name}</p>
                </a>
            </div>`;
});

document.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    // POSITIONING CONTEXTMENU (Check if too close from borders)
    contextMenu.style.top = e.y + contextMenuHeight >= windowsHeight ? `${e.y - contextMenuHeight}px` : `${e.y}px`;
    contextMenu.style.left = e.x + contextMenuWidth >= windowsWidth ? `${e.x - contextMenuWidth}px` : `${e.x}px`;
    contextMenu.style.visibility = 'visible';
});
contextMenu.addEventListener('mouseleave', () => { contextMenu.style.visibility = 'hidden'; });



// HANDLE SOUND/MUSIC
let currentSound = null;
function handleSound(newSound){
    if(currentSound){ // ALLOWING ONLY 1 SOUND TO BE PLAYED
        currentSound.pause();
        currentSound.currentTime = 0;
    }
    currentSound = new Audio(`./MUSIC/${newSound}.mp3`);
    currentSound.volume = 1;
    currentSound.play();
}



// OPEN PAGES / PLAY SOUND
const pagePreloader = document.getElementById('pagePreloader');
const allPages = document.querySelectorAll('.exeFile');
allPages.forEach(page => {
    page.addEventListener('dblclick', (e) => {
        if(page.dataset.page){
            document.querySelector('#pagePreloaderHeader img').src = page.querySelector('img').src;
            document.querySelector('#pagePreloaderHeader span').innerText = page.querySelector('p').innerText;
            pagePreloader.classList.add('loading');
            const destination = page.dataset.page;
            setTimeout(() => { location.href = `./PAGES/${destination}/index.html`; }, 100);
        }else if(page.dataset.sound){
            handleSound(page.dataset.sound);
        }
    });
});

// HANDLE PROGRAMS ON DESKTOP
const allProgramsOnDesktop = document.querySelectorAll('#screen .screen-element [data-exe]');
allProgramsOnDesktop.forEach(prog => {
    prog.addEventListener('dblclick', () => { openProgram(prog); });
});



// HANDLE FILE EXPLORER TAB
if(!document.body.classList.contains('page')){
    const fileExplorerHeaderSearchInput = document.querySelector('#fileExplorer_header_search input');
    const fileExplorerHeaderLocationTab = document.getElementById('fileExplorerHeaderLocationTab');
    const fileExplorerTab = document.querySelectorAll('#fileExplorer_main_explorer li');
    const fileExplorerContents = document.querySelectorAll('#fileExplorer_main_files tr:has(:not(th))');
    fileExplorerTab.forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelector('#fileExplorer_main_explorer li.active').classList.remove('active');
            tab.classList.add('active');
            const tabPointer = tab.querySelector('span').innerText;
            fileExplorerHeaderLocationTab.innerText = tabPointer;
            fileExplorerHeaderSearchInput.setAttribute('placeholder', `Search in : ${tabPointer}`);
            fileExplorerContents.forEach(elem => {
                elem.classList.toggle('visible', elem.dataset.explorer.toLowerCase() === tabPointer.toLowerCase());
            });
        });
    });
}



// HANDLE FULLSCREEN ON PROGRAM

let fullscreenBeingActivated = false;

function openFullscreen(elem){
    fullscreenBeingActivated = true;
    if(elem.requestFullscreen){
        elem.requestFullscreen();
    }else if(elem.webkitRequestFullscreen){ // SAFARI
        elem.webkitRequestFullscreen();
    }else if(elem.msRequestFullscreen){ // IE11
        elem.msRequestFullscreen();
    }
    setTimeout(() => { fullscreenBeingActivated = false; }, 500);
}

// HANDLE EXIT FULLSCREEN
function closeFullscreen(){
    fullscreenBeingActivated = true;
    if(document.exitFullscreen){
        document.exitFullscreen();
    }else if(document.webkitExitFullscreen){ // SAFARI
        document.webkitExitFullscreen();
    }else if(document.msExitFullscreen){ // IE11
        document.msExitFullscreen();
    }
    setTimeout(() => { fullscreenBeingActivated = false; }, 500);
}

const pageLoaderEndSpeed = 3000;
if(document.body.classList.contains('page')){
    // TOGGLE FULLSCREEN
    const mainGame = document.getElementById('mainGame');
    const fullScreenButton = document.getElementById('programToggleFullScreen');
    fullScreenButton.addEventListener('click', (e) => {
        e.stopPropagation();
        document.body.classList.toggle('fullscreen');
        if(document.body.classList.contains('fullscreen')){
            openFullscreen(mainGame);
        }else closeFullscreen();
    });


    // EXIT PAGE, BACK TO HOME PAGE
    const programCloseButton = document.getElementById('programCloseButton');
    programCloseButton.addEventListener('click', () => {
        const goBackToHomeLink = document.createElement('a');
        goBackToHomeLink.setAttribute('href', '../../index.html');
        goBackToHomeLink.click();
    });


    // END LOADING
    document.onreadystatechange = () => {
        if(document.readyState === 'complete'){
            setTimeout(() => {
                const pagePreloader = document.getElementById('pagePreloader');
                pagePreloader.classList.add('loaded');
            }, pageLoaderEndSpeed);
        }
    }
}
