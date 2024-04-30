# About Me
For this page, I haven't just done a little thing just for me. I've done what I call a mini-library. What is it?

I mean that you can use this to do your own Visual Novel on the web. But to do so, you'll need to follow my HTML.

In the HTML, you'll need to change the title of the game, the credits of the game (who made it). To change the title background and/or the font, you'll have to change the CSS. For everything else, it will be set in JavaScript.

``` html
<div id="visual-novel">

    <button id="programToggleFullScreen" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" height="40">
            <path class="expand" d="M32 32C14.3 32 0 46.3 0 64v96c0 17.7 14.3 32 32 32s32-14.3 32-32V96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H64V352zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h64v64c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32H320zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V352z"/>
            <path class="compress" d="M160 64c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V64zM32 320c-17.7 0-32 14.3-32 32s14.3 32 32 32H96v64c0 17.7 14.3 32 32 32s32-14.3 32-32V352c0-17.7-14.3-32-32-32H32zM352 64c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H352V64zM320 320c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32s32-14.3 32-32V384h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H320z"/>
        </svg>
    </button>

    <!-- ======== MAIN SCREEN ======== -->
    <div id="main-screen">
    
        <!-- ======== YOUR TITLE GO HERE ======== -->
        <h1>A Journey with a Swiss Dev</h1>
        
        <div id="main-menu">
            <button type="button" id="playBtn">
                <h2>Play</h2>
            </button>
            <button type="button" id="creditsBtn">
                Credits
            </button>
        </div>
    </div>

    <!-- ======== GAME SCREEN ======== -->
    <div id="game-screen">
        <button type="button" id="setAudioVolume">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="30" height="30" fill="currentColor">
                <path class="sound-on" d="M533.6 32.5C598.5 85.2 640 165.8 640 256s-41.5 170.7-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z"/>
                <path class="sound-off" d="M301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM425 167l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z"/>
            </svg>
        </button>

        <div id="user-options"></div>
        <div id="sprite">
            <img src="">
        </div>
        <div id="text-box">
            <div id="name">
                <p></p>
            </div>
            <div id="text">
                <p></p>
            </div>
        </div>
        <div id="quick-menu">
            <button type="button" id="hideBtn">Hide</button>
        </div>
    </div>

    <!-- ======== CREDITS SCREEN ======== -->
    <div id="credits-screen">
        <button type="button" id="creditsCloseBtn">Back to title</button>
        <div id="creditsContainer">
        
            <!-- ======== YOU CAN PUT AS MANY SECTION YOU WANT HERE ======== -->
            <section>
                <h2>Story</h2>
                <div>
                    <p>Da Silva Pinto Kevin</p>
                </div>
            </section>
            <section>
                <h2>Game Arts</h2>
                <div>
                    <p>Da Silva Pinto Kevin</p>
                    <p>Chat GPT</p>
                </div>
            </section>
            
        </div>
    </div>
</div>
```

To know more about how to use the mini-library, you can read below.

# Visual Novel Mini-Library
One day I'll do a better version of that mini-library, I'll do a real library.

## How to use this
You need to add the files `visualNovel.js` and `script.js` at the end of your body tag and the only thing you need to do is to write your scenario into the `visualNovel.js`.

I've tried my best doing something easy to use with a lot of options, hope you'll like my job.

## Settings
The first thing you can change is the `Settings`.

In here, you can change almost everything.

For the moment, there's only 1 parameter for the `Settings`, but soon more will come.
### WebP
``` js
WebpImages: true
```
If all of yours images also exist in WebP format and want to use them, you can tell the script, by putting `true` as the value. If you put `false`, you should just erase the option, because nothing will change, but you can do whatever you want only God can judge you.

## Characters
For all of yours characters, you can define a name color and some sprite.

``` js
Characters: {
    MyCharacterName: {
        Color: "#e3e3e3",
        Sprites: {
            Happy: "MyCharacterName_Happy.png",
            Smiling: "MyCharacterName_Smiling.png"
        }
    },
    MySecondCharacterName: {
        Color: "rgb(250, 0, 0)",
        Sprites: {
            Happy: "MyCharacterSecondName_Happy.png",
            Smiling: "MyCharacterSecondName_Smiling.png",
            Screaming: "MyCharacterSecondName_Screaming.png"
        }
    },
    MyThirdCharacterName: {
        Color: "red",
        Sprites: {
            Happy: "MyCharacterSecondName_Happy.png",
            Smiling: "MyCharacterSecondName_Smiling.png",
            Screaming: "MyCharacterSecondName_Screaming.png"
        }
    }
}
```

### Color
``` js
Color: "red"
```
Each time your character talk, if you want, you can let them have their own color. You can put Hex value `#000000`, rgb value `rgb(0 0 0)` or only the label `red`.

### Sprites
``` js
Sprites: {
    Happy: "MyCharacterSecondName_Happy.png",
    Smiling: "MyCharacterSecondName_Smiling.png",
    Screaming: "MyCharacterSecondName_Screaming.png"
}
```
For each of your characters, you can define every sprite they might need by giving the name of the sprite and the name and extension of the image file.

The image must be placed inside the `img` directory.

## Preparing each scene
The story is not just some text, each text come in a scene. and each scene has their own settings.

### Background
Each scene has a background.
``` js
Background: "background.jpg"
```
You only need to put the name and the extension of the file, just like for the sprite. Because you need to put your images inside the `img` folder.

### Background music
For your scene, you might want some music, well you can.
``` js
BGM: {
    File: "BGM.mp3",
    Loop: true
}
```
Here you only need to put the name of the file with the extension (`mp3`). You should put the file inside the `music` folder.

If you want the same music between 2 or more scene without it getting to restart each time, you can put `Continue` as the value instead of the name of a file.

## Writing your story
Just below, you can see what a typical scenario could look like.
``` js
Story: {
        Scene0: {
            Background: "bg1.png",
            BGM: "BGM_01.mp3",
            Dialogs: [
                {
                    Name: "MyCharacterName",
                    Text: "My first text",
                    Sprite: {
                        Name: "Smiling",
                        Position: { Name: "Right" }
                    }
                },
                {
                    Name: "MyCharacterSecondName",
                    Text: "This is another text",
                    Sprite: {
                        Name: "Screaming",
                        Position: {Name: "Left" },
                        Mirror: true
                    }
                },
                {
                    Name: "",
                    Text: "You want an input from the user, like to get his name ?",
                    Input: "variableName"
                },
                {
                    Name: "MyCharacterSecondName",
                    Text: "Do you like options / choice ?",
                    Options: [
                        { Text: "Yes", Next: "" },
                        { Text: "No", Next: "Scene1" }
                    ]
                },
                {
                    Name: "MyCharacterName",
                    Text: "This scene is finished, let's go the the next one!",
                    TextSpeed: 300,
                    NextScene: "Scene1"
                }
            ]
        },
        Scene1: {
            Background: "bg2.jpg",
            BGM: "BGM_01.mp3",
            Dialogs: [
                {
                    Name: "MyCharacterName",
                    Text: "We're on the second scene."
                }
            ]
        }
    }
```

### Next scene
At the end of a scene, at the last dialog, you should put the attribute `NextScene`. This attribute will tell the engine where to go.

#### To a particular dialog in this scene
``` js
NextScene: ":2"
```
If you don't want to change scene, you want to stay in the one you currently in, but want to redirect the player in a particular dialog of that scene, you'll need that.

In this example, we'll be redirected to the index __2__ of the current scene, so the third text. The first text is the index __0__.

#### To a particular scene
``` js
NextScene: "Scene1"
```
By using this, you'll redirect the player to the scene "Scene1" (this is the name of the scene).

#### To a particular dialog in another scene
``` js
NextScene: "Scene1:2"
```
So you want to redirect the player to another scene and at a certain index. In this particular case, you'll be happy to know that you can use what is written above.

The first string tell the scene and what comes after the `:` tell the index.

#### To a particular dialog in the same scene
``` js
NextScene: ":2"
```
By doing that, you will make the user go back to the third text of that scene.

``` js
NextScene: ":2;"
```
If you add `;` at the end, then the music will restart, just like if we've set a new scene.

### Name of the one who speak
You're not obligated to put a name, if it's empty, no name would be displayed. If you put a name, if the name is referred in the `Characters` list, we'll check to get the color. But if the name doesn't exist in the `Characters` list, the default color will be put.

### Writing text
Well, of course you can add text. But you can do way more than just put text, you can also put HTML tag.

``` js
Text: "This is an <strong>strong</strong> exemple."
```

And if you had an input with a variable, you can refer to that variable with that: 
``` js
Text: "This is the user name {{variableName}}."
```
This can also be used for the name of the one who speak.

### Writing speed
If the default writing speed doesn't suit you, you can change it for every text.

Bigger is the value, bigger the interval between each letter will be.
``` js
TextSpeed: 300
```

### Options
You might want the player to choose between paths. Then you need options.
``` js
Options: [
    { Text: "Text 1", Next: "" },
    { Text: "Text 2", Next: ":2" },
    { Text: "Text 3", Next: "Scene1" },
    { Text: "Text 4", Next: "Scene1:2" }
]
```
You can put as many options as your heart desire.

The `"Text"` is where you put what the user will see to choose.

The `"Next"` is where you put where the user will end once he has made his choice. There's multiple thing you can put in there.

If you let it empty, it would get the user to the next text, so the one that directly follow the text with the options.

If you put `:` you should put a number after it, that will get the user to be redirected to the index of the current Dialog. Know that the first text is the number `0`.

And if you directly put a string, like `"Scene1"`, that will get the user to go to that scene.

You can also specify the scene and the dialog by writing this: `"Scene1:2"`. In this example, the player will be redirected to the scene "Scene1" (that's the name of the scene) at the dialog index "2".

### Input
To get the player to enter for example his name and stored it in a variable to use it later, you would need to use an input.
``` js
Input: "userName"
```
The `Input` take only 1 parameter, it's the name of the variable that you will need to put in your text to use it.

## Sprite
You might want an image to represent the person who talk, know that you can leave it empty or even not put it if you don't need a sprite.

There's some options too.
### Position
You can tell where you want the sprite to be.
``` js
Position: { Name: "Right" }
```
There's 3 options: `Left`, `Center` or `Right`.
``` js
Position: {
    Name: "Right",
    X: 100,
    Y: 300
}
```
You can also put an `X` and/or `Y` value. This way, you can fully place the sprite where you want it to be.

The `X` will translate the sprite horizontally.

The `Y` will translate the sprite vertically.

Know that those must be numbers and are in pixels.

### Mirror
You might want a sprite to be at the left of the screen, but you haven't done the sprite this way, don't worry, with the `Mirror` option, you can.
``` js
Mirror: true
```
You can only put `true` or `false`, but if you put false, there's no real reason to keep that.

## Changing scene at the end of one
When you arrived at the end of a scene, the player should be redirected to the next scene. But this is not automatic, you need to write where the player should be redirected. For that, there's more than 1 setting you can put.

### Changing just the scene
``` js
NextScene: "Scene1"
```
That way, the player will be redirected to the scene `Scene1`.

### Changing the scene and the index
``` js
NextScene: "Scene1:2"
```
That way, the player will be redirected to the scene `Scene1` and to the dialog `2` of that scene.

### Staying in the same scene but to a particular index
``` js
NextScene: ":2"
```
That way, the player will be redirected to the same scene (the actual one) and to the dialog `2`.

### Staying in the same scene but to a particular index and we restart the music
``` js
NextScene: ":2;"
```
That way, the player will be redirected to the same scene (the actual one) and to the dialog `2`. The `;` at the end stand to restart the music.

By default if we stay in the same scene, the music will just continue. But if we go to another scene, it will depend on the setting of the BGM of that scene (see _Preparing each scene_).