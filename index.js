function webpackBootstrapFunc (modules) {
  var installedModules = {}
  function __webpack_require__ (moduleId) {
    if (installedModules[moduleId]) return installedModules[moduleId].exports
    var module = installedModules[moduleId] = {
      exports: {},
      id: moduleId,
      loaded: false
    }
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__)
    module.loaded = true
    return module.exports
  }
  __webpack_require__.m = modules
  __webpack_require__.c = installedModules
  __webpack_require__.oe = function (err) { throw err }
  __webpack_require__.p = ''
  var f = __webpack_require__(__webpack_require__.s = 'ENTRY_MODULE')
  return f.default || f // try to call default if defined to also support babel esmodule exports
}

// http://stackoverflow.com/a/2593661/130442
function quoteRegExp (str) {
  return (str + '').replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&')
}

function getModuleDependencies (module) {
  var retval = []
  var fnString = module.toString()
  var wrapperSignature = fnString.match(/^function\s?\(\w+,\s*\w+,\s*(\w+)\)/)
  if (!wrapperSignature) return retval

  var webpackRequireName = wrapperSignature[1]
  var re = new RegExp(quoteRegExp(webpackRequireName) + '\\([^)]*?(\\d+)\\)', 'g') // external chars are when output.pathinfo is true
  var match
  while ((match = re.exec(fnString))) {
    retval.push(parseInt(match[1], 10))
  }
  return retval
}

function getRequiredModules (sources, moduleId) {
  var modulesQueue = [moduleId]
  var requiredModules = []
  var seenModules = {}

  while (modulesQueue.length) {
    var moduleToCheck = modulesQueue.pop()
    if (seenModules[moduleToCheck]) continue
    seenModules[moduleToCheck] = true
    requiredModules.push(moduleToCheck)
    var newModules = getModuleDependencies(sources[moduleToCheck])
    modulesQueue = modulesQueue.concat(newModules)
  }

  return requiredModules
}

module.exports = function (moduleId, options) {
  options = options || {}
  var sources = __webpack_modules__

  var requiredModules = options.all ? Object.keys(sources) : getRequiredModules(sources, moduleId)
  var src = '(' + webpackBootstrapFunc.toString().replace('\'ENTRY_MODULE\'', moduleId) + ')({' + requiredModules.map(function (id) { return '' + id + ': ' + sources[id].toString() }).join(',') + '})();'

  var blob = new window.Blob([src], { type: 'text/javascript' })
  if (options.bare) { return blob }

  var URL = window.URL || window.webkitURL || window.mozURL || window.msURL

  var workerUrl = URL.createObjectURL(blob)
  var worker = new window.Worker(workerUrl)
  worker.objectURL = workerUrl

  return worker
}
