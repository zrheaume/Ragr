var context = {
    index: {
        title: "ragr",
        assets: {
            css: "index",
            js: "index"
        }
    },
    login: {
        title: "Login - ragr",
        assets: {
            css: "none",
            js: "login"
        }
    },
    home: {
        title: "Home - ragr",
        assets: {
            css: "none",
            js: "home"
        }
    },
    signup: [
        {
            title: "Sign Up for ragr",
            assets: {
                css: "none",
                js: "signup_0"
            },
            header: "User Info",
            desc: "Enter your information to get started",
            form: [
                {
                    ID: "name-first",
                    type: "text",
                    placeholder: "John",
                    label: "First Name"
                },
                {
                    ID: "name-last",
                    type: "text",
                    placeholder: "Doe",
                    label: "Last Name"
                },
                {
                    ID: "birth-date",
                    type: "date",
                    placeholder: "12/07/1996",
                    label: "Birthday"
                },
                {
                    ID: "username",
                    type: "text",
                    placeholder: "johnDoe23",
                    label: "Username"
                },
                {
                    ID: "pw",
                    type: "password",
                    placeholder: "",
                    label: "Password"
                }
            ],
            action: "Next",
            nextStep: 1
        },
        {
            title: "Sign Up for ragr",
            assets: {
                css: "none",
                js: "signup_1"
            },
            header: "Profile",
            desc: "Tell us a little bit about yourself so we can help match you. Don't worry, you can change these later.",
            form: [
                {
                    default: "What kind of party do you prefer?",
                    label: "Your style",
                    ID: "usr-style",
                    options: [
                        {
                            value: "1",
                            text: "Casual"
                        },
                        {
                            value: "2",
                            text: "Chaotic"
                        },
                        {
                            value: "3",
                            text: "Club"
                        },
                        {
                            value: "4",
                            text: "Rave"
                        },
                    ]
                },
                {
                    default: "Who do you like to party with?",
                    label: "Social boundaries",
                    ID: "usr-bounds",
                    options: [
                        {
                            value: "1",
                            text: "Just friends"
                        },
                        {
                            value: "2",
                            text: "Friends or people they know"
                        },
                        {
                            value: "3",
                            text: "Strangers"
                        },
                        {
                            value: "4",
                            text: "Whoever"
                        },
                    ]
                },
                {
                    default: "Where do you like to attend parties?",
                    label: "Setting",
                    ID: "usr-setting",
                    options: [
                        {
                            value: "1",
                            text: "Apartments or houses"
                        },
                        {
                            value: "2",
                            text: "Bars or clubs"
                        },
                        {
                            value: "3",
                            text: "Concerts or shows"
                        },
                        {
                            value: "4",
                            text: "Public events"
                        },
                        {
                            value: "5",
                            text: "Anywhere"
                        }
                    ]
                },
                {
                    default: "What's your feeling on alcohol?",
                    label: "Alcohol use",
                    ID: "usr-alc",
                    options: [
                        {
                            value: "1",
                            text: "I don't want to be around it"
                        },
                        {
                            value: "2",
                            text: "I'm fine if other people drink, but it's not my thing"
                        },
                        {
                            value: "3",
                            text: "I'll drink a little"
                        },
                        {
                            value: "4",
                            text: "I go hard"
                        },
                        {
                            value: "5",
                            text: "I'm indifferent"
                        }
                    ]
                },
                {
                    default: "What's your feeling on drugs?",
                    label: "Drug use",
                    ID: "usr-drug",
                    options: [
                        {
                            value: "1",
                            text: "I want nothing to do with them"
                        },
                        {
                            value: "2",
                            text: "I don't care what other people do, but I'm not into them"
                        },
                        {
                            value: "3",
                            text: "I occasionally dabble, but nothing hard"
                        },
                        {
                            value: "4",
                            text: "If there's no drugs, is it really a party?"
                        },
                        {
                            value: "5",
                            text: "I'm indifferent"
                        }
                    ]
                },
            ],
            action: "Create My Account",
            nextStep: 2
        }
    ],
    party: {
        throw: {
            title: "Throw a ragr",
            assets: {
                css: "none",
                js: "throwParty"
            }
        }
    },
    attrKey: {
        style: {
            1: "Casual",
            2: "Chaotic",
            3: "Club",
            4: "Rave"
        },
        bounds: {
            1: "Just friends",
            2: "Friends or people they know",
            3: "Strangers",
            4: "Whoever"
        },
        setting: {
            1: "Apartments or houses",
            2: "Bars or clubs",
            3: "Concerts or shows",
            4: "Public events",
            5: "Anywhere"
        },
        alc: {
            1: "I don't want to be around it",
            2: "I'm fine if other people drink, but it's not my thing",
            3: "I'll drink a little",
            4: "I go hard",
            5: "I'm indifferent"
        },
        drug: {
            1: "I want nothing to do with them",
            2: "I don't care what other people do, but I'm not into them",
            3: "I occasioanlly dablle, but nothing hard",
            4: "If there's no drugs, is it really a party?",
            5: "I'm indifferent"
        }
    }
}
module.exports = context;