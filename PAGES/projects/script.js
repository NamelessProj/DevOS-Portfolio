// MY PROJECTS
const projectsAll = [
    {
        Name: 'Portfolio',
        Image: 'portfolio.jpg',
        Links: {
            Information: 'Well, you\'re literally on it right now.'
        }
    },
    {
        Name: 'Pizza Lord',
        Image: 'pizzaLord.jpg',
        Links: {
            Information: 'A pizzeria (that does not exist).',
            Github: 'https://github.com/NamelessProj/Pizza-Lord-REMASTERED',
            Behance: 'https://www.behance.net/gallery/191226035/Pizza-Lord-restaurant',
            Website: 'https://pizza-lord.vercel.app/'
        }
    },
    {
        Name: 'Visual Novel',
        Image: 'visualNovel.jpg',
        Links: {
            Information: 'I\'ve always wanted to do a Visual Novel and to build my own library to do that.'
        }
    },
    {
        Name: 'Calculator',
        Image: 'calculator.jpg',
        Links: {
            Information: 'A copy of the Windows 11 calculator.',
            Github: 'https://github.com/NamelessProj/Calculator-Windows',
            Website: 'https://calculator-windows.vercel.app/'
        }
    },
    {
        Name: 'Number Wizard',
        Image: 'numberWizard.jpg',
        Links: {
            Information: 'Can you guess the number your computer is thinking of? I don\'t think so.',
            Github: 'https://github.com/NamelessProj/Number-Wizard',
            Website: 'https://number-wizard.vercel.app/'
        }
    },
    {
        Name: 'Hangman',
        Image: 'hangman.jpg',
        Links: {
            Information: 'There\'s 307\'101 words for you to guess. Can you guess them all.',
            Github: 'https://github.com/NamelessProj/Hangman',
            Website: 'https://hangman-one-sooty.vercel.app/'
        }
    },
    {
        Name: 'Tic Tac Toe',
        Image: 'ticTacToe.jpg',
        Links: {
            Information: 'A 2 player game, so you\'ll need 1 friend to play this.',
            Github: 'https://github.com/NamelessProj/Tic-Tac-Toe',
            Website: 'https://tic-tac-toe-beta-orcin-66.vercel.app/'
        }
    },
    {
        Name: 'My pc\'s companion',
        Image: 'myPcsCompanion.jpg',
        Links: {
            Information: 'Have ever wanted to create your own computer, but didn\'t know how to start.',
            Behance: 'https://www.behance.net/gallery/185359143/My-pcs-companion',
        }
    }
];



// RANDOMIZE THE ELEMENTS SO IT'S NEVER IN THE SAME ORDER
// https://www.freecodecamp.org/news/how-to-shuffle-an-array-of-items-using-javascript-or-typescript/
function shuffleArray(array){
    for(let i = 0; i < array.length; i++){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const projects = shuffleArray(projectsAll); // HAVING ALL PROJECTS IN RANDOM PLACES



const carousel = document.querySelector('.carousel');

// PUTTING EVERY PROJECTS INTO THE CAROUSEL
const imgOrigin = './IMG/';
for(let i = 0; i < projects.length; i++){
    const image = projects[i].Image;
    carousel.innerHTML += `<div class="carousel-element"><div><picture><source srcset="${imgOrigin}${image.split('.')[0] + '.webp'}" type="image/webp"><img src="${imgOrigin}${image}" alt="¨Project: ${projects[i].Name}"></picture></div></div>`;
}


// SETTING IMPORTANT VARIABLES
let index = 0;
let selectedIndex = 1;
let isRotating = true;
const elements = document.querySelectorAll('.carousel-element');
const titleProjectContainer = document.querySelector('#menuBottomTitle h2');
let totalElements = elements.length;
const visibleElements = Number(getComputedStyle(document.querySelector('.carousel')).getPropertyValue('--visible-elements'));
let gapElements = Number(getComputedStyle(document.querySelector('.carousel')).getPropertyValue('--element-gap').split('px')[0]);
const rotationInterval = 5000; // EVERY 5 SECOND
let rotationTimer = null;
let timeoutId;
let absolutelyEveryElement;
let autoRotation = true;
let modalOpen = false;
let transitionSpeed = Number(getComputedStyle(document.body).getPropertyValue('--transition-speed').split('ms')[0]);
const elementChildren = elements[0].children[0].localName;

let timeoutWriter = false;
let newSlideIsSetting = false;
let timeoutTypeWriter = null;

let buttonJustBeenClicked = false;

// GETTING BOTTOM LINKS ELEMENTS
const githubLink = document.getElementById('githubLink');
const behanceLink = document.getElementById('behanceLink');
const websiteLink = document.getElementById('websiteLink');
const informationLink = document.getElementById('informationLink');

// GETTING DIALOG ELEMENT
const informationDialog = document.getElementById('informationDialog');
const closeDialogButton = document.getElementById('closeDialogButton');

// SETTING THE FIRST ELEMENT AS SELECTED
carousel.querySelector('.carousel-element:nth-child('+selectedIndex+')').classList.add('active');

// GET WIDTH OF EACH ELEMENT
let elementWidth = document.querySelector('.carousel-element').clientWidth;

function changeProjectTitle(index, writing = true){
    if(!writing) return;

    const speed = transitionSpeed / index.Name.length;
    titleProjectContainer.innerHTML = '&emsp;';

    // WRITING THE NAME CHARACTERTeR BY CHARACTER
    function typeWriter(indexCh = 0){
        if(timeoutWriter && newSlideIsSetting){
            clearTimeout(timeoutTypeWriter);
            setTimeout(()=>{
                newSlideIsSetting = false;
                typeWriter();
            }, 50);
            return;
        }
        if(indexCh === index.Name.length){
            timeoutWriter = false;
            newSlideIsSetting = false;
            return;
        }
        if(indexCh === 0){
            titleProjectContainer.innerHTML = index.Name[indexCh];
        }else titleProjectContainer.innerHTML += index.Name[indexCh];

        timeoutTypeWriter = setTimeout(() => { typeWriter(indexCh+=1); }, speed);
    }

    timeoutWriter = true;
    timeoutTypeWriter = setTimeout(typeWriter, transitionSpeed / 4);
    setTimeout(() => { timeoutWriter = null; });
}

function setElementLinks(indexProject, changeTitle = true){
    setTimeout(() => {
        informationDialog.querySelector('h3 span').innerText = indexProject.Name;
        informationDialog.querySelector('p').innerText = indexProject.Links.Information;

        githubLink.href = indexProject.Links.hasOwnProperty('Github') ? indexProject.Links.Github : '';
        behanceLink.href = indexProject.Links.hasOwnProperty('Behance') ? indexProject.Links.Behance : '';
        websiteLink.href = indexProject.Links.hasOwnProperty('Website') ? indexProject.Links.Website : '';
    }, transitionSpeed / 2);

    changeProjectTitle(indexProject, changeTitle);
}

function rotateCarousel(direction, button = false){
    if(buttonJustBeenClicked) return;

    const copiedNode = document.querySelectorAll('.carousel .copy');
    let transition = true;

    // GET IN WHICH DIRECTION TO ROTATE
    if(direction === 'right'){
        let maxElements = totalElements;
        maxElements -= 3; // SUBTRACT COPY ELEMENTS

        if(index === maxElements){ // IF WE'RE AT THE END
            index = 0;
            transition = false;

            absolutelyEveryElement.forEach(el => {
                el.style.transition = 'unset';
                el.querySelector(elementChildren).style.transition = 'unset';
            });

        }else index++;
    }else{
        if(index === 0){ // IF WE'RE AT THE BEGINNING
            index = totalElements - visibleElements;
            transition = false;

            absolutelyEveryElement.forEach(el => {
                el.style.transition = 'unset';
                el.querySelector(elementChildren).style.transition = 'unset';
            });

        }else index--;
    }

    // GETTING INFOS OF THE SELECTED PROJECTS
    let selectedIndexProject = index === projects.length ? projects[0] : projects[index];
    setElementLinks(selectedIndexProject, transition);

    // SELECT THE RIGHT ITEM
    selectedIndex = index;
    selectedIndex += 2;
    carousel.querySelectorAll('.carousel-element.active').forEach(elem => {
        elem.classList.remove('active');
    });
    carousel.querySelector('.carousel-element:nth-child('+selectedIndex+')').classList.add('active');

    const offset = index * (elementWidth + gapElements); // HOW MUCH DO EACH ITEMS NEED TO BE MOVED

    // MOVED EVERY PROJECTS ITEM AND PUT A TRANSITION IF NEEDED
    setTimeout(() => {
        let maxElements = totalElements;
        maxElements -= 3;

        if(transition){
            absolutelyEveryElement.forEach(el => {
                el.style.transition = `transform ${transitionSpeed}ms ease`;
                el.querySelector(elementChildren).style.transition = `scale ${transitionSpeed}ms ease, filter ${transitionSpeed}ms ease`;
            });
        }else{
            absolutelyEveryElement.forEach(el => {
                el.style.transition = 'unset';
                el.querySelector(elementChildren).style.transition = 'unset';
            });
        }

        absolutelyEveryElement.forEach(el => {
            el.style.transform = `translateX(-${offset}px)`;
        });

        setTimeout(() => {
            absolutelyEveryElement.forEach(el => {
                el.style.transition = `transform ${transitionSpeed}ms ease`;
                el.querySelector(elementChildren).style.transition = `scale ${transitionSpeed}ms ease, filter ${transitionSpeed}ms ease`;
            });
        }, 100);
    });

    // IF WE CLICK ON ONE ARROW BUTTONS, WE BLOCK THE AUTOMATIC ROTATION FOR 15s
    if(button){
        buttonJustBeenClicked = true;
        newSlideIsSetting = true;
        clearInterval(rotationTimer);
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            if(!modalOpen) rotationTimer = setInterval(() => rotateCarousel('right'), rotationInterval);
        }, 15000);
        setTimeout(() => { buttonJustBeenClicked = false; }, 400); // LETTING A BUFFER EACH TIME WE CLICK ON A ARROW BUTTON. PREVENT FROM SPAM
    }

    if(index === projects.length) setTimeout(() => rotateCarousel(direction), 500); // IF WE'RE AT THE END OF THE CAROUSEL, LOOP EVERYTHING
}

// PAUSE AND RESUME THE AUTOPLAY
document.getElementById('pauseResumeBtn').addEventListener('click', function() {
    if(isRotating){
        clearInterval(rotationTimer);
    }else{
        rotationTimer = setInterval(() => rotateCarousel('right'), rotationInterval);
    }

    isRotating = !isRotating;
    autoRotation = !autoRotation;
    document.getElementById('pauseResumeBtn').classList.toggle('paused');
});



// SETTING THE 1ST ELEMENT
setElementLinks(projects[index]);



// CLONE FIRST AND LAST ELEMENTS TO HELP THE LOOP LOOK BETTER

const firstElement = elements[0].cloneNode(true);
const secondElement = elements[1].cloneNode(true);
const lasElement = elements[elements.length - 1].cloneNode(true);

firstElement.classList.add('copy');
secondElement.classList.add('copy');
lasElement.classList.add('copy');

carousel.insertBefore(firstElement, null);
carousel.insertBefore(secondElement, null);
carousel.insertBefore(lasElement, elements[0]);

// MAKE THE CAROUSEL BEGINS WITH THE FIRST ELEMENT
carousel.scrollLeft = -document.querySelector('.carousel-element').clientWidth;

// GETTING EVERY ELEMENT
absolutelyEveryElement = document.querySelectorAll('.carousel .carousel-element');

// SETTING THE NEW TOTAL NUMBER OF ELEMENTS
totalElements = absolutelyEveryElement.length;

// GIVING TRANSITIONS AT EVERY ELEMENT
absolutelyEveryElement.forEach(el => {
    el.style.transition = `transform ${transitionSpeed}ms`;
    el.querySelector(elementChildren).style.transition = `scale ${transitionSpeed}ms ease, filter ${transitionSpeed}ms ease`;
});



// IF WINDOW IS RESIZED, GET THE NEW GAP BETWEEN ELEMENTS
window.addEventListener('resize', () => {
    gapElements = Number(getComputedStyle(document.querySelector('.carousel')).getPropertyValue('--element-gap').split('px')[0]);
    elementWidth = document.querySelector('.carousel-element').clientWidth;
});



// HANDLE INFORMATION DIALOG

informationLink.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    modalOpen = true;
    clearInterval(rotationTimer);
    informationDialog.showModal();
});

closeDialogButton.addEventListener('click', () => {
    informationDialog.close();
    rotationTimer = autoRotation ? setInterval(() => rotateCarousel('right'), rotationInterval) : null;
    modalOpen = false;
});



// STOP ANIMATION IF THE PAGE IS NOT VISIBLE
window.addEventListener('visibilitychange', () => {
    if(document.hidden){
        clearInterval(rotationTimer);
    }else{
        rotationTimer = autoRotation ? setInterval(() => rotateCarousel('right'), rotationInterval) : null;
    }
});



// START THE CAROUSEL
document.onreadystatechange = () => {
    if(document.readyState === 'complete'){
        setTimeout(() => {
            const pagePreloader = document.getElementById('pagePreloader');
            pagePreloader.classList.add('loaded');
            rotationTimer = setInterval(() => rotateCarousel('right'), rotationInterval);
        }, pageLoaderEndSpeed); // pageLoaderEndSpeed from the JS of home page
    }
}