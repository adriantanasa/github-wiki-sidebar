module.exports = {
    "env": {
        "node": true,
        "es6": true,
        "browser": false
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },"globals": {
        "define": false,
        "require": false
    },
    "rules": {
        "semi": "error",
        "eol-last": "error",
        "wrap-regex": "error",
        "new-parens": "error",
        "comma-style": "error",
        "semi-spacing": "error",
        "no-lonely-if": "error",
        "comma-spacing": "error",
        "block-spacing": "error",
        "no-spaced-func": "error",
        "spaced-comment": "error",
        "space-in-parens": "error",
        "space-infix-ops": "error",
        "keyword-spacing": "error",
        "no-inline-comments": "error",
        "no-trailing-spaces": "error",
        "space-before-blocks": "error",
        "array-bracket-spacing": "error",
        "no-multiple-empty-lines": "error",
        "no-mixed-spaces-and-tabs": "error",
        "computed-property-spacing": "error",
        "no-whitespace-before-property": "error",
        "space-before-function-paren": [
            "error",
            "never"
        ],
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "object-curly-spacing": [
            "error",
            "never"
        ],
        "max-len": [
            "error",
            120,
            4
        ],
        "brace-style": [
            "error",
            "1tbs",
            {
                "allowSingleLine": true
            }
        ],
        "key-spacing": [
            "error",
            {
                "beforeColon": false,
                "afterColon": true
            }
        ],
        "lines-around-comment": [
            "error",
            {
                "beforeBlockComment": true
            }
        ]
    }
};
