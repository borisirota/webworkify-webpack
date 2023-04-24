const presets = [
    [
        "@babel/env",
        {
            "useBuiltIns": "usage",
            "corejs": 3,
            "targets": {
                "chrome": "58",
                "ie": "8"
            }
        }
    ]
]
module.exports = { presets }