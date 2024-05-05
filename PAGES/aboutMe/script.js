import {visualNovel} from "./visualNovel.js"; // IMPORTING THE VN

// ELEMENTS
const playButton = document.getElementById('playBtn');
const creditsBtn = document.getElementById('creditsBtn');
const gameScreen = document.getElementById('game-screen');
const creditsScreen = document.getElementById('credits-screen');
const userOptions = document.getElementById('user-options');
const closeCreditsScreenBtn = document.getElementById('creditsCloseBtn');
const backBtn = document.getElementById('backBtn');
const hideBtn = document.getElementById('hideBtn');

// STATE OF THE GAME
let state = {
    gameStart: false,
    gameReady: false,
    currentScene: 'Scene0',
    dialogsIndex: 0,
    dialogsIndexMax: 0,
    webpImages: false,
    waitingOnUserInput: false,
    waitingOnUserOptions: false,
    isTyping: false,
    textWaiting: 300,
    textSpeed: 15,
    instantText: false,
    currentText: '',
    timeoutId: null,
    defaultNameColor: '#000',
    inputMaxCharacters: 30,
    currentMusic: null,
    musicVolume: 1,
    userVariables: [{ inputVariable: "NAME", inputValue: "kkkk" }],
    timeoutIdTextWriting: null,
    timeoutIdInstantText: false,
    newSceneReady: true,
    isSoundMuted: false
}



// SHOWING THE DIFFERENT SCREENS

playButton.addEventListener('click', () => {
    if(state.gameReady){
        gameScreen.classList.add('open');
        state.gameStart = true;
    }else alert(`The game isn't ready yet, please wait a little bit.`);
});
creditsBtn.addEventListener('click', () => {
    creditsScreen.classList.add('open');
});
closeCreditsScreenBtn.addEventListener('click', () => {
    creditsScreen.classList.remove('open');
});


// GAMES ELEMENTS
const nameTextBox = document.querySelector('#name p');
const textTextBox = document.querySelector('#text p');
const spriteCharacter = document.querySelector('#sprite img');
const setAudioVolumeButton = document.getElementById('setAudioVolume');

// GET THE MAXIMUM VALUE THE INDEX CAn BE FOR THE FIRST SCENE
state.dialogsIndexMax = visualNovel.Story[state.currentScene].Dialogs.length;

// CHECK IF BROWSER SUPPORTS WebP
function testWebP(){
    return new Promise(res => {
        const webP = new Image();
        webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        webP.onload = webP.onerror = () => {
            res(webP.height === 2);
        }
    });
}

// CHECK WebP SUPPORTS ONLY IF NEEDED
if(visualNovel.Settings.hasOwnProperty('WebpImages') && visualNovel.Settings.WebpImages){
    testWebP().then(hasWebP => {
        state.webpImages = hasWebP;
        state.gameReady = true;
    });
}else state.gameReady = true;

// CHECK IF THERE'S SOME IMAGES TO PRELOAD BEFORE PLAYING THE GAME
// this functionality don't exist yet
if(visualNovel.Settings.hasOwnProperty('PreloadImages') && visualNovel.Settings.PreloadImages.length > 0){
    const imagesAll = visualNovel.Settings.PreloadImages;
}

// REPLACE VARIABLES IN TEXT
function replaceVariablesInText(text, variableName, variableValue){
    const regex = `{{${variableName}}}`;
    console.log(regex);
    return text.replaceAll(regex, variableValue);
}

// CHANGING SCENE
function settingNewScene(index = state.currentScene){
    state.newSceneReady = false;
    const backgroundPicture = state.webpImages ? visualNovel.Story[index].Background.replace(/\.[^/.]+$/, "") + '.webp' : visualNovel.Story[index].Background;
    const newBg = new Image();
    newBg.onload = () => {
        gameScreen.style.backgroundImage = `url("./IMG/BG/${backgroundPicture}")`;
        state.newSceneReady = true;
    }
    newBg.src = `./IMG/BG/${backgroundPicture}`;

    // INITIALIZE BGM
    // The music is not ready to be used yet
    if(visualNovel.Story[index].hasOwnProperty('BGM') && visualNovel.Story[index].BGM !== ''){
        handleMusic(visualNovel.Story[index].BGM.File);
    }
}

// HANDLE USER CHOICE
function handleUserChoice(e){
    const target = e.target.dataset.vnTarget;
    if(target !== 'Null'){
        if(target.startsWith(':')){ // GO TO THE INDEX OF THE DIALOG
            state.dialogsIndex = target.replace(':', '');
        }else if(target.includes(':')){
            state.dialogsIndex = Number(!isNaN(target.split(':')[1])) ? Number(target.split(':')[1]) : 0;
            state.currentScene = target.split(':')[0];
            settingNewScene();
        }else{ // GO TO A SCENE
            state.currentScene = target;
            state.dialogsIndex = 0;
            state.dialogsIndexMax = visualNovel.Story[state.currentScene].Dialogs.length;
        }
    }
    state.waitingOnUserOptions = false;
    userOptions.innerHTML = '';
    showSlide(state.dialogsIndex);
}

// HANDLE USER INPUT
function handleUserInput(){
    const input = document.getElementById('userInput');
    const inputValue = input.value.trim();
    if(inputValue === '') return;
    if(inputValue.length > state.inputMaxCharacters){
        alert(`The maximum characters authorized is ${state.inputMaxCharacters}. Please, be careful.`);
        return;
    }
    let duplicate = false;
    const inputVariable = input.dataset.vnVariable;

    // CHECK IF VARIABLE ALREADY EXIST
    for(let i = 0; i < state.userVariables.length; i++){
        if(state.userVariables[i].inputVariable === inputVariable){
            state.userVariables[i].inputValue = inputValue;
            duplicate = true;
        }
    }

    if(!duplicate) state.userVariables.push({ inputVariable, inputValue }); // PUSH NEW VARIABLE IF NOT ALREADY EXIST

    state.waitingOnUserInput = false;
    userOptions.innerHTML = '';

    showSlide(state.dialogsIndex);
}

// HANDLE MUSIC
function handleMusic(newMusic, loop = true) {
    if(newMusic === 'Continue') return;
    if(state.currentMusic || newMusic === 'reset'){
        state.currentMusic.pause();
        state.currentMusic.currentTime = 0;
    }
    if(newMusic === 'reset'){
        state.currentMusic = null;
        return;
    }
    state.currentMusic = new Audio(`./MUSIC/${newMusic}`);
    state.currentMusic.volume = state.isSoundMuted ? 0 : state.musicVolume;
    state.currentMusic.loop = loop;
    state.currentMusic.play();
}

// INSTANT TEXT
function instantText(){
    state.timeoutIdInstantText = true;
    state.timeoutIdTextWriting = null;
    setTimeout(() => {
        textTextBox.innerHTML = state.currentText;
        state.isTyping = false;
    }, 50);
    setTimeout(() => {
        state.timeoutIdInstantText = false;
    }, 1000);
}

// TYPING ANIMATION
function typeWriter(speed = state.textSpeed){
    const text = state.currentText;
    let index = 0;
    let tag = '';
    let element = null;

    state.isTyping = true;

    // INSTANT TEXT
    if(speed === 0) instantText();

    function writeNextChar(){
        if(state.timeoutIdInstantText) return;
        if(index === text.length){ // TEXT IS FINISHED
            state.isTyping = false;
            state.timeoutIdTextWriting = null;
            return;
        }

        // HTML TAG HANDLER
        let char = text[index];
        index++;
        if(char === '<'){
            tag = char;
        }else if(char === '>'){
            tag += char;
            if(tag.startsWith('</')){
                element.innerHTML += tag;
                element = null;
            }else{
                element = document.createElement(tag.slice(1, -1));
                textTextBox.appendChild(element);
            }
            tag = '';
        }else if(tag !== ''){
            tag += char;
        }else{
            if(element){
                element.innerHTML += char;
            }else{
                textTextBox.innerHTML += char;
            }
        }
        state.timeoutIdTextWriting = setTimeout(writeNextChar, speed);
    }
    writeNextChar();
}

// GO BACK IN TIME
// this functions not ready yet
function previousSlide(){
    // using a array of all the previous destination [{Scene, Dialog}]
}

// MAKE THE GAME ROLL
function showSlide(index){
    if(state.waitingOnUserOptions) return; // IF USER MUST DO SOMETHING, WE'LL WAIT ON HIM
    let startingNewDialog = false;
    let newSceneIsSameAsNow = false;

    textTextBox.innerText = '';
    nameTextBox.innerText = '';

    // CHECK IF WE'RE AT THE END OF THE SCENE
    let pseudoIndex = index;
    if(pseudoIndex++ === state.dialogsIndexMax){
        pseudoIndex-=2;
        if(visualNovel.Story[state.currentScene].Dialogs[pseudoIndex].hasOwnProperty('NextScene')){ // IF WE'RE AT THE END CHECK IF THERE'S A NEXT SCENE
            if(visualNovel.Story[state.currentScene].Dialogs[pseudoIndex].NextScene.startsWith(':')){ // SETTING NEW INDEX FOR THE CURRENT SCENE
                state.dialogsIndex = Number(!isNaN(visualNovel.Story[state.currentScene].Dialogs[pseudoIndex].NextScene.split(':')[1])) ? Number(visualNovel.Story[state.currentScene].Dialogs[pseudoIndex].NextScene.split(':')[1]) : 0;
                if(!visualNovel.Story[state.currentScene].Dialogs[pseudoIndex].NextScene.includes(';')) newSceneIsSameAsNow = true; // IF WE WANT TO RESTART THE MUSIC
            }else if(visualNovel.Story[state.currentScene].Dialogs[pseudoIndex].NextScene.includes(':')){ // SETTING THE NEW SCENE AND NEW INDEX
                state.dialogsIndex = Number(!isNaN(visualNovel.Story[state.currentScene].Dialogs[pseudoIndex].NextScene.split(':')[1])) ? Number(visualNovel.Story[state.currentScene].Dialogs[pseudoIndex].NextScene.split(':')[1]) : 0;
                state.currentScene = visualNovel.Story[state.currentScene].Dialogs[pseudoIndex].NextScene.split(':')[0];
            }else{ // SETTING THE NEW SCENE
                state.dialogsIndex = 0;
                state.currentScene = visualNovel.Story[state.currentScene].Dialogs[pseudoIndex].NextScene;
            }

            //state.currentScene = visualNovel.Story[state.currentScene].Dialogs[pseudoIndex].NextScene;
            //state.dialogsIndex = 0;
            state.dialogsIndexMax = visualNovel.Story[state.currentScene].Dialogs.length;
            index = state.dialogsIndex;
            startingNewDialog = true;
        }else if(visualNovel.Story[state.currentScene].Dialogs[pseudoIndex].hasOwnProperty('END')){
            // IF THE VN IS FINISHED, WE GO BACK TO THE TITLE
            handleMusic('reset');
            gameScreen.classList.remove('open');
        }else alert(`AN ERROR OCCUR!`);
    }

    // INITIALIZE NEW SCENE
    if(!newSceneIsSameAsNow && (startingNewDialog || index === 0)) settingNewScene();

    // INITIALIZE THE MOST USEFUL SHORTCUT
    const dialog = visualNovel.Story[state.currentScene].Dialogs[index];

    // CHECK IF THERE'S OPTIONS FOR THE USER TO CHOOSE
    if(dialog.hasOwnProperty('Options') && dialog.Options.length > 0){
        state.waitingOnUserOptions = true;
        dialog.Options.forEach(opt => {
            const optionsButton = document.createElement('button');
            optionsButton.innerText = opt.Text;
            optionsButton.classList.add('user-option');
            const dataBtn = !opt.hasOwnProperty('Next') || opt.Next === '' ? 'Null' : opt.Next;
            optionsButton.setAttribute('data-vn-target', dataBtn);
            userOptions.appendChild(optionsButton);
            optionsButton.addEventListener('click', (e) => {
                handleUserChoice(e);
            });
        });
        setTimeout(() => {
            document.querySelectorAll('.user-option').forEach(button => {
                button.classList.add('visible');
            });
            document.querySelector('.user-option').focus();
        }, 50);
    }

    // CHECK IF THERE'S AN INPUT FOR THE USER TO FILL UP
    if(dialog.hasOwnProperty('Input')){
        state.waitingOnUserInput = true;
        const varName = dialog.Input;
        const inputElem = document.createElement('input');
        inputElem.type = 'text';
        inputElem.id = 'userInput';
        inputElem.classList.add('user-input');
        inputElem.setAttribute('data-vn-variable', varName);
        userOptions.appendChild(inputElem);
        setTimeout(() => {
            inputElem.classList.add('visible');
            inputElem.focus();
        }, 50);
    }

    // IF THERE'S NO TEXT, THERE'S NEITHER TEXT AND NAME
    if(dialog.hasOwnProperty('Text') && dialog.Text.length > 0){
        // REPLACE THE VARIABLES IN THE TEXT
        let finalText = dialog.Text;
        if(finalText.includes('{{')){
            for(let i = 0; i < state.userVariables.length; i++){
                const variableName = state.userVariables[i].inputVariable;
                const variableValue = state.userVariables[i].inputValue;
                finalText = replaceVariablesInText(finalText, variableName, variableValue);
            }
        }

        // DISPLAY THE ELEMENTS
        state.currentText = finalText;
        //setTimeout(typeWriter, state.textWaiting);

        // IF THE TEXT SPEED IS SET DIFFERENT THIS TIME, WE USE IT
        if(dialog.hasOwnProperty('TextSpeed') && Number(!isNaN(dialog.TextSpeed))){
            typeWriter(Number(dialog.TextSpeed));
        }else typeWriter();
    }

    // GET THE NAME OF WHO'S TALKING
    if(dialog.hasOwnProperty('Name') && dialog.Name.length > 0){
        let finalName = dialog.Name;
        if(finalName.includes('{{')){ // IF THE NAME USE A VARIABLE, WE USE THAT
            for(let i = 0; i < state.userVariables.length; i++){
                const variableName = state.userVariables[i].inputVariable;
                const variableValue = state.userVariables[i].inputValue;
                finalName = replaceVariablesInText(finalName, variableName, variableValue);
            }
        }
        nameTextBox.innerText = finalName;

        // GET THE COLOR FOR THE NAME
        nameTextBox.style.color = visualNovel.Characters[dialog.Name].hasOwnProperty('Color') && visualNovel.Characters[dialog.Name].Color.length > 0 ? visualNovel.Characters[dialog.Name].Color : state.defaultNameColor;
    }

    // IF THERE'S NO SPRITE, THEN THERE'S NO SPRITE && IF THE CHARACTER DOESN'T HAVE THIS SPRITE, THEN THERE'S NO SPRITE. TO HAVE A SPRITE WE NEED THE NAME OF THE CHARACTER
    if(dialog.hasOwnProperty('Name') && dialog.Name.length > 0 && dialog.hasOwnProperty('Sprite') && dialog.Sprite.Name.length > 0 && visualNovel.Characters[dialog.Name].Sprites[dialog.Sprite.Name].length > 0){
        document.querySelector(spriteCharacter.parentElement.nodeName).removeAttribute('style');
        spriteCharacter.className = '';

        // CHANGING THE SPRITE ONLY IF NEEDED
        if(spriteCharacter.src.replace(/\.[^/.]+$/, "").substring(spriteCharacter.src.lastIndexOf('/') + 1) !== visualNovel.Characters[dialog.Name].Sprites[dialog.Sprite.Name].replace(/\.[^/.]+$/, "")){
            // GET THE SPRITE OF THE CHARACTER AND USE THE WebP VERSION IF NEEDED
            const spriteUrl = state.webpImages ? visualNovel.Characters[dialog.Name].Sprites[dialog.Sprite.Name].replace(/\.[^/.]+$/, "") + '.webp' : visualNovel.Characters[dialog.Name].Sprites[dialog.Sprite.Name];
            spriteCharacter.src = `./IMG/SPRITES/${spriteUrl}`;
        }

        // POSITION OF THE SPRITE
        if(dialog.Sprite.hasOwnProperty('Position') && dialog.Sprite.Position.hasOwnProperty('Name')){
            spriteCharacter.classList.add(dialog.Sprite.Position.Name);
        }else spriteCharacter.classList.add('center');

        // POSITIONING THE SPRITE IN X AND Y AXES
        if(dialog.Sprite.hasOwnProperty('Position') && (dialog.Sprite.Position.hasOwnProperty('X') || dialog.Sprite.Position.hasOwnProperty('Y'))){
            let spriteX = dialog.Sprite.Position.hasOwnProperty('X') && Number(!isNaN(dialog.Sprite.Position.X)) ? dialog.Sprite.Position.X : 0;
            let spriteY = dialog.Sprite.Position.hasOwnProperty('Y') && Number(!isNaN(dialog.Sprite.Position.Y)) ? dialog.Sprite.Position.Y : 0;

            document.querySelector(spriteCharacter.parentElement.nodeName).style.translate = `${spriteX}px ${spriteY}px`;
        }

        // MIRRORING THE SPRITE
        if(dialog.Sprite.hasOwnProperty('Mirror') && dialog.Sprite.Mirror) spriteCharacter.classList.add('mirror');
    }else spriteCharacter.src = '';

    // INCREMENTS INDEX
    state.dialogsIndex++;
}



// HANDLE CLICK AND KEYBOARD INPUT

// HIDE THE TEXT
hideBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    hideBtn.classList.toggle('active');
    textTextBox.classList.toggle('hide');
});

// TOGGLE SOUND
setAudioVolumeButton.addEventListener('click', (e) => {
    e.stopPropagation();
    setAudioVolumeButton.classList.toggle('off');
    state.isSoundMuted = setAudioVolumeButton.classList.contains('off');
    state.currentMusic.volume = state.isSoundMuted ? 0 : 1;
});

// GO TO NEXT TEXT, INSTANT TEXT AND HANDLE USER INPUT
document.addEventListener('keydown', (e) => {
    if(e.code === 'Space') e.preventDefault();
    if((e.key === 'ArrowRight' || e.code === 'Space' || e.key === 'Enter') && state.gameStart && !state.isTyping && !state.timeoutIdInstantText && state.newSceneReady){
        if(state.waitingOnUserInput){
            handleUserInput();
        }else showSlide(state.dialogsIndex);
    }else if(state.isTyping){
        state.timeoutIdInstantText = true;
        instantText();
    }
});

document.addEventListener('click', (e) => {
    if(e.target.classList.contains('user-option')) return;
    if(state.gameStart && !state.waitingOnUserInput && !state.waitingOnUserOptions && !state.isTyping && state.newSceneReady){
        showSlide(state.dialogsIndex);
    }
});
