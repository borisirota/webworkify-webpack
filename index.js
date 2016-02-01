var __webpack_require__ = arguments[2];
var sources = __webpack_require__.m;

var webpackBootstrapFunc = function(modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
      if(installedModules[moduleId])
        return installedModules[moduleId].exports;
      var module = installedModules[moduleId] = {
        exports: {},
        id: moduleId,
        loaded: false
      };
      modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
      module.loaded = true;
      return module.exports;
    }
    __webpack_require__.m = modules;
    __webpack_require__.c = installedModules;
    __webpack_require__.p = "js/";
    var f = __webpack_require__(entryModule);
    return f.default || f; // try to call default if defined to also support babel esmodule exports
}

module.exports = function (fn) {
    var key;
    for (var i = 0, l = sources.length; i < l; i++) {
        var exp = __webpack_require__(i);
        // Using babel as a transpiler to use esmodule, the export will always
        // be an object with the default export as a property of it. To ensure
        // the existing api and babel esmodule exports are both supported we
        // check for both
        if (exp === fn || exp.default === fn) {
            key = i;
            break;
        }
    }

    var src = '(' + webpackBootstrapFunc.toString().replace('entryModule', key) + ')(['
        + sources.map(function (func) {
            return func.toString();
        }).join(',')
        + '])(self);'
    ;

    var URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

    return new Worker(URL.createObjectURL(
        new Blob([src], { type: 'text/javascript' })
    ));
};
