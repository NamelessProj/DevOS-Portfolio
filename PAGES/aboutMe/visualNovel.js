export const visualNovel = {
    Settings: {
        WebpImages: true, // ONLY SAY TRUE IF EVERY IMAGE ARE ENABLE IN WEBP FORMAT
        PreloadImages: []
    },
    Characters: {
        Kevin: {
            Color: "rgb(255 130 0)",
            Sprites: {
                Waving: 'waving.png',
                Thinking: 'thinking.png',
                Idle: 'idle.png',
                Yeah: 'yeah.png',
                JJK: 'jjk.png',
                SNK: 'snk.png',
                Calming: 'calming.png',
            }
        },
        "{{userName}}": {
            Color: "red"
        }
    },
    Story: {
        Scene0: {
            Background: "BG_black.jpg",
            BGM: {
                File: "BGM_01.mp3"
            },
            Dialogs: [
                {
                    Name: "",
                    Text: "Welcome dear traveller."
                },
                {
                    Name: "",
                    Text: "If you're here, that's because you wanna know more about me."
                },
                {
                    Name: "",
                    Text: "Before anything, what's your name ?",
                    Input: "userName"
                },
                {
                    Name: "",
                    Text: "Are you sure that's you are {{userName}}! <strong>I hope you're not stealing this name!</strong>",
                    Options: [
                        { Text: "Yep, that's me.", Next: "" },
                        { Text: "Sorry, I lied.", Next: ":2" }
                    ]
                },
                {
                    Name: "",
                    Text: "Well then pal! I hope you're ready for an adventure my friend. Cause, here we go!",
                    NextScene: "BeforeAnything"
                }
            ]
        },
        BeforeAnything: {
            Background: "BG_black.jpg",
            BGM: {
                File: "BGM_01.mp3"
            },
            Dialogs: [
                {
                    Name: "",
                    Text: "You're on vacation and you're visiting the most beautiful country that exist, Switzerland."
                },
                {
                    Name: "",
                    Text: "For this excursion, you've asked a friend you know from a video game. His name... Kevin."
                },
                {
                    Name: "",
                    Text: "You don't really know much about him. At least you know that he's living in Neuchâtel.",
                    NextScene: "Scene1"
                }
            ]
        },
        Scene1: {
            Background: "BG_city.jpg",
            BGM: {
                File: "BGM_02.mp3"
            },
            Dialogs: [
                {
                    Name: "{{userName}}",
                    Text: "Hey Kevin, I'm already at the train station, where are you?"
                },
                {
                    Name: "Kevin",
                    Text: "I'm here as well, oh wait... I see you! Don't you dare move, I come to you."
                },
                {
                    Name: "",
                    Text: "Soon, you see someone running and waving at you."
                },
                {
                    Name: "Kevin",
                    Text: "Hey, first time seeing each other. So I'm Kevin, nice to meet you.",
                    Sprite: {
                        Name: "Waving",
                        Position: { Name: "Right" }
                    }
                },
                {
                    Name: "{{userName}}",
                    Text: "I'm {{userName}}, it's so nice seeing you IRL."
                },
                {
                    Name: "Kevin",
                    Text: "I say if you have everything, let's get going!",
                    Sprite: {
                        Name: "Thinking",
                        Position: { Name: "Right" }
                    },
                    NextScene: "Scene2"
                },
            ]
        },
        Scene2: {
            Background: "BG_town.jpg",
            BGM: {
                File: "Continue"
            },
            Dialogs: [
                {
                    Name: "",
                    Text: "You're both going to Kevin's house and on the road, you made some small talk.",
                    NextScene: "Scene3"
                }
            ]
        },
        Scene3: {
            Background: "BG_house_2.jpg",
            BGM: {
                File: "Continue"
            },
            Dialogs: [
                {
                    Name: "Kevin",
                    Text: "Don't worry, you can stay here as long as you're on vacation.",
                    Sprite: {
                        Name: "Idle",
                        Position: { Name: "Right" }
                    }
                },
                {
                    Name: "{{userName}}",
                    Text: "Thanks."
                },
                {
                    Name: "Kevin",
                    Text: "So, is there anything you wanna know about me?",
                    Sprite: {
                        Name: "Idle",
                        Position: { Name: "Right" }
                    },
                    Options: [
                        { Text: "Do you play any video games?", Next: "Scene3VideoGame" },
                        { Text: "Do you watch some anime?", Next: "Scene3Anime" },
                        { Text: "It's all right, I know everything I need.", Next: "Scene3Nevermind" }
                    ]
                }
            ]
        },
        Scene3VideoGame: {
            Background: "BG_house_2.jpg",
            BGM: {
                File: "Continue"
            },
            Dialogs: [
                {
                    Name: "Kevin",
                    Text: "Well, actually yes.",
                    Sprite: {
                        Name: "Yeah",
                        Position: { Name: "Right" }
                    }
                },
                {
                    Name: "{{userName}}",
                    Text: "And what kind of games are you playing?",
                },
                {
                    Name: "Kevin",
                    Text: "I really like playing rhythm games like <strong>OSU!</strong> or <strong>Muse Dash</strong>.",
                    Sprite: {
                        Name: "Thinking",
                        Position: { Name: "Right" }
                    }
                },
                {
                    Name: "Kevin",
                    Text: "But I also like sandbox games like <strong>Minecraft</strong>.",
                    Sprite: {
                        Name: "Yeah",
                        Position: { Name: "Right" }
                    }
                },
                {
                    Name: "Kevin",
                    Text: "And how could I forget about visual novel! I really like playing <strong>Higurashi</strong>, <strong>Clannad</strong> and <strong>Find Love or Die Trying</strong>.",
                    Sprite: {
                        Name: "Yeah",
                        Position: { Name: "Right" }
                    }
                },
                {
                    Name: "Kevin",
                    Text: "And by the way... <i>This is a visual novel</i>.",
                    Sprite: {
                        Name: "Thinking",
                        Position: { Name: "Right" }
                    }
                },
                {
                    Name: "Kevin",
                    Text: "I've also played some other games like <strong>CS:GO</strong>",
                    Sprite: {
                        Name: "Idle",
                        Position: { Name: "Right" }
                    },
                    NextScene: "Scene3:2"
                }
            ]
        },
        Scene3Anime: {
            Background: "BG_house_2.jpg",
            BGM: {
                File: "Continue"
            },
            Dialogs: [
                {
                    Name: "Kevin",
                    Text: "Actually, yes.",
                    Sprite: {
                        Name: "Thinking",
                        Position: { Name: "Right" }
                    }
                },
                {
                    Name: "{{userName}}",
                    Text: "How many anime have you watched till now?"
                },
                {
                    Name: "Kevin",
                    Text: "A little bit over than 1000. Something like... 1011. (April 24, 2024)",
                    Sprite: {
                        Name: "Thinking",
                        Position: { Name: "Right" }
                    }
                },
                {
                    Name: "{{userName}}",
                    Text: "That's quite a lot!"
                },
                {
                    Name: "{{userName}}",
                    Text: "So, do you have some recommendations for me?"
                },
                {
                    Name: "Kevin",
                    Text: "Of course.",
                    Sprite: {
                        Name: "JJK",
                        Position: { Name: "Right" }
                    }
                },
                {
                    Name: "Kevin",
                    Text: 'If you feel like crying, I recommend you <i>"Clannad"</i>. It\'s a lovely story where we follow some students going into adulthood. There\'s some action, romance and even some drama. The show is popular and known for being one of the saddest. I won\'t tell much more, it\'s up to you now.',
                    Sprite: {
                        Name: "Thinking",
                        Position: { Name: "Right" }
                    }
                },
                {
                    Name: "Kevin",
                    Text: "If you want a recommendation that come from my heart, I will lead you to <i>\"Overlord\"</i>. This is not the greatest show of all time, but I do really love that one. The story follow a man trapped in a game, but the NPCs start acting weirdly.",
                    Sprite: {
                        Name: "SNK",
                        Position: { Name: "Right" }
                    }
                },
                {
                    Name: "Kevin",
                    Text: "I could talk a lot more about \"Overlord\", but the joy is to let you find by yourself what make this one, the greatest anime of all time.",
                    Sprite: {
                        Name: "Idle",
                        Position: { Name: "Right" }
                    }
                },
                {
                    Name: "Kevin",
                    Text: "If you only want some names, to check yourself, I got you.",
                    Sprite: {
                        Name: "Thinking",
                        Position: { Name: "Right" }
                    }
                },
                {
                    Name: "Kevin",
                    Text: '"Angels of Death" <i>(Satsuriku no Tenshi)</i>, "Initial D" and "The Millionaire Detective - Balance: UNLIMITED" <i>(Fugou Keiji: Balance:UNLIMITED)</i>, I think that\'s a pretty good list to start from.',
                    Sprite: {
                        Name: "Thinking",
                        Position: { Name: "Right" }
                    },
                    NextScene: "Scene3:2"
                },
            ]
        },
        Scene3Nevermind: {
            Background: "BG_house_2.jpg",
            BGM: {
                File: "Continue"
            },
            Dialogs: [
                {
                    Name: "Kevin",
                    Text: "So that means you already know me quite well right?",
                    Sprite: {
                        Name: "Thinking",
                        Position: { Name: "Right" }
                    }
                },
                {
                    Name: "{{userName}}",
                    Text: "Uh, yeah probably."
                },
                {
                    Name: "Kevin",
                    Text: "It's alright. Let's get some rest, you should be quite sleepy.",
                    Sprite: {
                        Name: "Yeah",
                        Position: { Name: "Right" }
                    }
                },
                {
                    Name: "{{userName}}",
                    Text: "I can't say no to that.",
                    NextScene: "Scene4"
                },
            ]
        },
        Scene4: {
            Background: "BG_house_2.jpg",
            BGM: {
                File: "Continue"
            },
            Dialogs: [
                {
                    Name: "",
                    Text: "You have both slept for several hours, we're now in the morning."
                },
                {
                    Name: "Kevin",
                    Text: "How are you doing today?",
                    Sprite: {
                        Name: "Thinking",
                        Position: { "Name": "Right" }
                    }
                },
                {
                    Name: "{{userName}}",
                    Text: "Way better than yesterday. I'm well awake."
                },
                {
                    Name: "{{userName}}",
                    Text: "Can I ask you a question?"
                },
                {
                    Name: "Kevin",
                    Text: "No problem, but you already did.",
                    Sprite: {
                        Name: "Yeah",
                        Position: { Name: "Right" }
                    }
                },
                {
                    Name: "{{userName}}",
                    Text: "Can I ask you three question then?"
                },
                {
                    Name: "Kevin",
                    Text: "You have already done that too.",
                    Sprite: {
                        Name: "Yeah",
                        Position: { "Name": "Right" }
                    }
                },
                {
                    Name: "{{userName}}",
                    Text: "WHEN!!!"
                },
                {
                    Name: "Kevin",
                    Text: "Right now.",
                    Sprite: {
                        Name: "JJK",
                        Position: { "Name": "Right" }
                    }
                },
                {
                    Name: "Kevin",
                    Text: "Ok, ok, ok... ask me whatever you want.",
                    Sprite: {
                        Name: "Calming",
                        Position: { Name: "Right" }
                    }
                },
                {
                    Name: "{{userName}}",
                    Text: "Thanks!"
                },
                {
                    Name: "{{userName}}",
                    Text: "So... I learned that you've made some study. Can you tell me a little bit more about that?"
                },
                {
                    Name: "Kevin",
                    Text: "Yeah, everything started approximately 13,7 billion years ago.",
                    Sprite: {
                        Name: "Thinking",
                        Position: { Name: "Right" }
                    }
                },
                {
                    Name: "{{userName}}",
                    Text: "Very funny..."
                },
                {
                    Name: "Kevin",
                    Text: "Sorry, so I was born in Switzerland in 2002.",
                    Sprite: {
                        Name: "Yeah",
                        Position: { Name: "Right" }
                    }
                },
                {
                    Name: "Kevin",
                    Text: "I spend almost all my childhood in the canton <i>(this is a swiss word)</i> of Vaud.",
                    Sprite: {
                        Name: "Thinking",
                        Position: { Name: "Right" }
                    }
                },
                {
                    Name: "Kevin",
                    Text: "I spend my adolescence in Neuchâtel. And that's where I did my apprenticeship of mediamatician.",
                    Sprite: {
                        Name: "Thinking",
                        Position: { Name: "Right" }
                    }
                },
                {
                    Name: "Kevin",
                    Text: "After my apprenticeship, I found a school in Geneva to learn more about the web development.",
                    Sprite: {
                        Name: "Thinking",
                        Position: { Name: "Right" }
                    }
                },
                {
                    Name: "Kevin",
                    Text: "The school is... <strong> THE SAE OF GENEVA</strong>",
                    Sprite: {
                        Name: "SNK",
                        Position: { Name: "Right" }
                    }
                },
                {
                    Name: "Kevin",
                    Text: "Well, now I think you know almost everything of me.",
                    Sprite: {
                        Name: "Thinking",
                        Position: { Name: "Right" }
                    },
                    NextScene: "SceneFinal"
                }
            ]
        },
        SceneFinal: {
            Background: "BG_black.jpg",
            BGM: {
                File: "Continue"
            },
            Dialogs: [
                {
                    Name: "",
                    Text: "You may now know Kevin, you still have a lot more to discover."
                },
                {
                    Name: "",
                    Text: "THE END.",
                    END: true
                }
            ]
        },
    }
};