module.exports = {
    "extends": "google",
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "env": {
        "es6": true
    },
    "rules": {
        "comma-dangle": ["error", "never"],
        "max-len": [1, 120, 150, {"ignoreComments": true, "ignoreUrls": true}],
        "indent": ["error", 4, { "SwitchCase": 1 }],
        "object-curly-spacing": [2, "always"],
        "linebreak-style": [0, "error", "windows", "unix"],
    }
};