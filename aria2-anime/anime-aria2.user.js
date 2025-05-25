// ==UserScript==
// @name         anime-aria2
// @namespace    https://github.com/niyoh120/userscripts
// @version      0.1.0
// @author       niyoh
// @description  使用aria2下载动画的用户脚本
// @match        https://hanime1.me/watch*
// @require      https://cdn.jsdelivr.net/npm/jsoneditor@10.2.0
// @resource     jsoneditor/dist/jsoneditor.min.css  https://cdn.jsdelivr.net/npm/jsoneditor@10.2.0/dist/jsoneditor.min.css
// @grant        GM_addStyle
// @grant        GM_deleteValue
// @grant        GM_getResourceText
// @grant        GM_getValue
// @grant        GM_listValues
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// ==/UserScript==

(function (JSONEditor) {
  'use strict';

  const cssLoader = (e) => {
    const t = GM_getResourceText(e);
    return GM_addStyle(t), t;
  };
  cssLoader("jsoneditor/dist/jsoneditor.min.css");
  function getDefaultExportFromCjs$1(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
  }
  var dist = {};
  var JSONRPCClient = {};
  var events = { exports: {} };
  var hasRequiredEvents;
  function requireEvents() {
    if (hasRequiredEvents) return events.exports;
    hasRequiredEvents = 1;
    var R = typeof Reflect === "object" ? Reflect : null;
    var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply2(target, receiver, args) {
      return Function.prototype.apply.call(target, receiver, args);
    };
    var ReflectOwnKeys;
    if (R && typeof R.ownKeys === "function") {
      ReflectOwnKeys = R.ownKeys;
    } else if (Object.getOwnPropertySymbols) {
      ReflectOwnKeys = function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
      };
    } else {
      ReflectOwnKeys = function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target);
      };
    }
    function ProcessEmitWarning(warning) {
      if (console && console.warn) console.warn(warning);
    }
    var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
      return value !== value;
    };
    function EventEmitter() {
      EventEmitter.init.call(this);
    }
    events.exports = EventEmitter;
    events.exports.once = once;
    EventEmitter.EventEmitter = EventEmitter;
    EventEmitter.prototype._events = void 0;
    EventEmitter.prototype._eventsCount = 0;
    EventEmitter.prototype._maxListeners = void 0;
    var defaultMaxListeners = 10;
    function checkListener(listener) {
      if (typeof listener !== "function") {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }
    }
    Object.defineProperty(EventEmitter, "defaultMaxListeners", {
      enumerable: true,
      get: function() {
        return defaultMaxListeners;
      },
      set: function(arg) {
        if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
          throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
        }
        defaultMaxListeners = arg;
      }
    });
    EventEmitter.init = function() {
      if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
      }
      this._maxListeners = this._maxListeners || void 0;
    };
    EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
      if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
        throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
      }
      this._maxListeners = n;
      return this;
    };
    function _getMaxListeners(that) {
      if (that._maxListeners === void 0)
        return EventEmitter.defaultMaxListeners;
      return that._maxListeners;
    }
    EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
      return _getMaxListeners(this);
    };
    EventEmitter.prototype.emit = function emit(type) {
      var args = [];
      for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
      var doError = type === "error";
      var events2 = this._events;
      if (events2 !== void 0)
        doError = doError && events2.error === void 0;
      else if (!doError)
        return false;
      if (doError) {
        var er;
        if (args.length > 0)
          er = args[0];
        if (er instanceof Error) {
          throw er;
        }
        var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
        err.context = er;
        throw err;
      }
      var handler = events2[type];
      if (handler === void 0)
        return false;
      if (typeof handler === "function") {
        ReflectApply(handler, this, args);
      } else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i)
          ReflectApply(listeners[i], this, args);
      }
      return true;
    };
    function _addListener(target, type, listener, prepend) {
      var m;
      var events2;
      var existing;
      checkListener(listener);
      events2 = target._events;
      if (events2 === void 0) {
        events2 = target._events = /* @__PURE__ */ Object.create(null);
        target._eventsCount = 0;
      } else {
        if (events2.newListener !== void 0) {
          target.emit(
            "newListener",
            type,
            listener.listener ? listener.listener : listener
          );
          events2 = target._events;
        }
        existing = events2[type];
      }
      if (existing === void 0) {
        existing = events2[type] = listener;
        ++target._eventsCount;
      } else {
        if (typeof existing === "function") {
          existing = events2[type] = prepend ? [listener, existing] : [existing, listener];
        } else if (prepend) {
          existing.unshift(listener);
        } else {
          existing.push(listener);
        }
        m = _getMaxListeners(target);
        if (m > 0 && existing.length > m && !existing.warned) {
          existing.warned = true;
          var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
          w.name = "MaxListenersExceededWarning";
          w.emitter = target;
          w.type = type;
          w.count = existing.length;
          ProcessEmitWarning(w);
        }
      }
      return target;
    }
    EventEmitter.prototype.addListener = function addListener(type, listener) {
      return _addListener(this, type, listener, false);
    };
    EventEmitter.prototype.on = EventEmitter.prototype.addListener;
    EventEmitter.prototype.prependListener = function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };
    function onceWrapper() {
      if (!this.fired) {
        this.target.removeListener(this.type, this.wrapFn);
        this.fired = true;
        if (arguments.length === 0)
          return this.listener.call(this.target);
        return this.listener.apply(this.target, arguments);
      }
    }
    function _onceWrap(target, type, listener) {
      var state = { fired: false, wrapFn: void 0, target, type, listener };
      var wrapped = onceWrapper.bind(state);
      wrapped.listener = listener;
      state.wrapFn = wrapped;
      return wrapped;
    }
    EventEmitter.prototype.once = function once2(type, listener) {
      checkListener(listener);
      this.on(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter.prototype.removeListener = function removeListener(type, listener) {
      var list, events2, position, i, originalListener;
      checkListener(listener);
      events2 = this._events;
      if (events2 === void 0)
        return this;
      list = events2[type];
      if (list === void 0)
        return this;
      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = /* @__PURE__ */ Object.create(null);
        else {
          delete events2[type];
          if (events2.removeListener)
            this.emit("removeListener", type, list.listener || listener);
        }
      } else if (typeof list !== "function") {
        position = -1;
        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }
        if (position < 0)
          return this;
        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }
        if (list.length === 1)
          events2[type] = list[0];
        if (events2.removeListener !== void 0)
          this.emit("removeListener", type, originalListener || listener);
      }
      return this;
    };
    EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
    EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
      var listeners, events2, i;
      events2 = this._events;
      if (events2 === void 0)
        return this;
      if (events2.removeListener === void 0) {
        if (arguments.length === 0) {
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
        } else if (events2[type] !== void 0) {
          if (--this._eventsCount === 0)
            this._events = /* @__PURE__ */ Object.create(null);
          else
            delete events2[type];
        }
        return this;
      }
      if (arguments.length === 0) {
        var keys = Object.keys(events2);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === "removeListener") continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners("removeListener");
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
        return this;
      }
      listeners = events2[type];
      if (typeof listeners === "function") {
        this.removeListener(type, listeners);
      } else if (listeners !== void 0) {
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }
      return this;
    };
    function _listeners(target, type, unwrap) {
      var events2 = target._events;
      if (events2 === void 0)
        return [];
      var evlistener = events2[type];
      if (evlistener === void 0)
        return [];
      if (typeof evlistener === "function")
        return unwrap ? [evlistener.listener || evlistener] : [evlistener];
      return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
    }
    EventEmitter.prototype.listeners = function listeners(type) {
      return _listeners(this, type, true);
    };
    EventEmitter.prototype.rawListeners = function rawListeners(type) {
      return _listeners(this, type, false);
    };
    EventEmitter.listenerCount = function(emitter, type) {
      if (typeof emitter.listenerCount === "function") {
        return emitter.listenerCount(type);
      } else {
        return listenerCount.call(emitter, type);
      }
    };
    EventEmitter.prototype.listenerCount = listenerCount;
    function listenerCount(type) {
      var events2 = this._events;
      if (events2 !== void 0) {
        var evlistener = events2[type];
        if (typeof evlistener === "function") {
          return 1;
        } else if (evlistener !== void 0) {
          return evlistener.length;
        }
      }
      return 0;
    }
    EventEmitter.prototype.eventNames = function eventNames() {
      return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
    };
    function arrayClone(arr, n) {
      var copy = new Array(n);
      for (var i = 0; i < n; ++i)
        copy[i] = arr[i];
      return copy;
    }
    function spliceOne(list, index) {
      for (; index + 1 < list.length; index++)
        list[index] = list[index + 1];
      list.pop();
    }
    function unwrapListeners(arr) {
      var ret = new Array(arr.length);
      for (var i = 0; i < ret.length; ++i) {
        ret[i] = arr[i].listener || arr[i];
      }
      return ret;
    }
    function once(emitter, name) {
      return new Promise(function(resolve, reject) {
        function errorListener(err) {
          emitter.removeListener(name, resolver);
          reject(err);
        }
        function resolver() {
          if (typeof emitter.removeListener === "function") {
            emitter.removeListener("error", errorListener);
          }
          resolve([].slice.call(arguments));
        }
        eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
        if (name !== "error") {
          addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
        }
      });
    }
    function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
      if (typeof emitter.on === "function") {
        eventTargetAgnosticAddListener(emitter, "error", handler, flags);
      }
    }
    function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
      if (typeof emitter.on === "function") {
        if (flags.once) {
          emitter.once(name, listener);
        } else {
          emitter.on(name, listener);
        }
      } else if (typeof emitter.addEventListener === "function") {
        emitter.addEventListener(name, function wrapListener(arg) {
          if (flags.once) {
            emitter.removeEventListener(name, wrapListener);
          }
          listener(arg);
        });
      } else {
        throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
      }
    }
    return events.exports;
  }
  var browser$1;
  var hasRequiredBrowser;
  function requireBrowser() {
    if (hasRequiredBrowser) return browser$1;
    hasRequiredBrowser = 1;
    browser$1 = function() {
      throw new Error(
        "ws does not work in the browser. Browser clients must use the native WebSocket object"
      );
    };
    return browser$1;
  }
  var Deferred = {};
  var hasRequiredDeferred;
  function requireDeferred() {
    if (hasRequiredDeferred) return Deferred;
    hasRequiredDeferred = 1;
    Object.defineProperty(Deferred, "__esModule", { value: true });
    let Deferred$1 = class Deferred {
      constructor() {
        this.promise = new Promise((resolve, reject) => {
          this.resolve = resolve;
          this.reject = reject;
        });
      }
    };
    Deferred.default = Deferred$1;
    return Deferred;
  }
  var promiseEvent = {};
  var hasRequiredPromiseEvent;
  function requirePromiseEvent() {
    if (hasRequiredPromiseEvent) return promiseEvent;
    hasRequiredPromiseEvent = 1;
    Object.defineProperty(promiseEvent, "__esModule", { value: true });
    function promiseEvent$1(target, event) {
      return new Promise((resolve, reject) => {
        function cleanup() {
          target.removeListener(event, onEvent);
          target.removeListener("error", onError);
        }
        function onEvent(data) {
          resolve(data);
          cleanup();
        }
        function onError(err) {
          reject(err);
          cleanup();
        }
        target.addListener(event, onEvent);
        target.addListener("error", onError);
      });
    }
    promiseEvent.default = promiseEvent$1;
    return promiseEvent;
  }
  var JSONRPCError = {};
  var hasRequiredJSONRPCError;
  function requireJSONRPCError() {
    if (hasRequiredJSONRPCError) return JSONRPCError;
    hasRequiredJSONRPCError = 1;
    Object.defineProperty(JSONRPCError, "__esModule", { value: true });
    let JSONRPCError$1 = class JSONRPCError extends Error {
      constructor({ message, code, data }) {
        super(message);
        this.code = code;
        if (data)
          this.data = data;
        this.name = this.constructor.name;
      }
    };
    JSONRPCError.default = JSONRPCError$1;
    return JSONRPCError;
  }
  var hasRequiredJSONRPCClient;
  function requireJSONRPCClient() {
    if (hasRequiredJSONRPCClient) return JSONRPCClient;
    hasRequiredJSONRPCClient = 1;
    var __awaiter = JSONRPCClient && JSONRPCClient.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(JSONRPCClient, "__esModule", { value: true });
    const events_1 = requireEvents();
    const ws_1 = requireBrowser();
    const Deferred_1 = requireDeferred();
    const promiseEvent_1 = requirePromiseEvent();
    const JSONRPCError_1 = requireJSONRPCError();
    let JSONRPCClient$1 = class JSONRPCClient extends events_1.EventEmitter {
      constructor(options, engines) {
        super();
        this.deferreds = {};
        this.lastId = 0;
        this.options = options;
        if (engines === null || engines === void 0 ? void 0 : engines.WebSocket)
          this.WebSocket = engines === null || engines === void 0 ? void 0 : engines.WebSocket;
        else
          this.WebSocket = ws_1.WebSocket;
        if (engines === null || engines === void 0 ? void 0 : engines.fetch)
          this.fetch = engines === null || engines === void 0 ? void 0 : engines.fetch.bind(this);
        else
          this.fetch = fetch.bind(this);
      }
      id() {
        return this.lastId++;
      }
      url(protocol) {
        return protocol + (this.options.secure ? "s" : "") + "://" + this.options.host + ":" + this.options.port + this.options.path;
      }
      websocket(message) {
        return new Promise((resolve, reject) => {
          var _a;
          const cb = (err) => {
            if (err)
              reject(err);
            else
              resolve();
          };
          (_a = this.socket) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify(message), cb);
          if (this.WebSocket && this.socket instanceof this.WebSocket)
            cb();
        });
      }
      http(message) {
        return __awaiter(this, void 0, void 0, function* () {
          const response = yield this.fetch(this.url("http"), {
            method: "POST",
            body: JSON.stringify(message),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          });
          response.json().then((msg) => this._onmessage(msg)).catch((err) => {
            this.emit("error", err);
          });
          return response;
        });
      }
      _buildMessage(method, params) {
        if (typeof method !== "string") {
          throw new TypeError(method + " is not a string");
        }
        const message = {
          method,
          "json-rpc": "2.0",
          id: this.id()
        };
        if (params)
          Object.assign(message, { params });
        return message;
      }
      batch(calls) {
        return __awaiter(this, void 0, void 0, function* () {
          const message = calls.map(([method, params]) => {
            return this._buildMessage(method, params);
          });
          yield this._send(message);
          return message.map(({ id }) => {
            const { promise } = this.deferreds[id] = new Deferred_1.default();
            return promise;
          });
        });
      }
      call(method, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
          const message = this._buildMessage(method, parameters);
          yield this._send(message);
          const { promise } = this.deferreds[message.id] = new Deferred_1.default();
          return promise;
        });
      }
      _send(message) {
        this.emit("output", message);
        const { socket } = this;
        return socket && socket.readyState === 1 ? this.websocket(message) : this.http(message);
      }
      _onresponse({ id, error, result }) {
        const deferred = this.deferreds[id];
        if (!deferred)
          return;
        if (error)
          deferred.reject(new JSONRPCError_1.default(error));
        else
          deferred.resolve(result);
        delete this.deferreds[id];
      }
      _onnotification({ method, params }) {
        this.emit(method, params);
      }
      _onmessage(message) {
        this.emit("input", message);
        if (Array.isArray(message)) {
          for (const object of message) {
            this._onobject(object);
          }
        } else {
          this._onobject(message);
        }
      }
      _onobject(message) {
        if (message.method === void 0)
          this._onresponse(message);
        else if (message.id === void 0)
          this._onnotification(message);
      }
      open() {
        const socket = this.socket = new this.WebSocket(this.url("ws"));
        socket.onclose = (...args) => {
          this.emit("close", ...args);
        };
        socket.onmessage = (event) => {
          let message;
          try {
            message = JSON.parse(event.data.toString());
          } catch (err) {
            this.emit("error", err);
            return;
          }
          this._onmessage(message);
        };
        socket.onopen = (...args) => {
          this.emit("open", ...args);
        };
        socket.onerror = (...args) => {
          this.emit("error", ...args);
        };
        return (0, promiseEvent_1.default)(this, "open");
      }
      close() {
        const { socket } = this;
        socket === null || socket === void 0 ? void 0 : socket.close();
        return (0, promiseEvent_1.default)(this, "close");
      }
    };
    JSONRPCClient.default = JSONRPCClient$1;
    return JSONRPCClient;
  }
  var hasRequiredDist;
  function requireDist() {
    if (hasRequiredDist) return dist;
    hasRequiredDist = 1;
    var __awaiter = dist && dist.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(dist, "__esModule", { value: true });
    dist.Aria2RPC = void 0;
    const JSONRPCClient_1 = requireJSONRPCClient();
    function prefix(str) {
      if (!str.startsWith("system.") && !str.startsWith("aria2.")) {
        str = "aria2." + str;
      }
      return str;
    }
    function unprefix(str) {
      const suffix = str.split("aria2.")[1];
      return suffix || str;
    }
    class Aria2RPC extends JSONRPCClient_1.default {
      withSecret(parameters) {
        let params = this.options.secret ? ["token:" + this.options.secret] : [];
        if (Array.isArray(parameters)) {
          params = params.concat(parameters);
        }
        return params;
      }
      _onnotification(notification) {
        const { method, params } = notification;
        const event = unprefix(method);
        if (event !== method)
          this.emit(event, params);
        return super._onnotification(notification);
      }
      call(method, ...params) {
        return super.call(prefix(method), this.withSecret(params));
      }
      multicall(calls) {
        const multi = [
          calls.map(([method, ...params]) => {
            return { methodName: prefix(method), params: this.withSecret(params) };
          })
        ];
        return super.call("system.multicall", multi);
      }
      batch(calls) {
        return super.batch(calls.map(([method, ...params]) => [prefix(method), this.withSecret(params)]));
      }
      listNotifications() {
        return __awaiter(this, void 0, void 0, function* () {
          const events2 = yield this.call("system.listNotifications");
          return events2.map((event) => unprefix(event));
        });
      }
      listMethods() {
        return __awaiter(this, void 0, void 0, function* () {
          const methods = yield this.call("system.listMethods");
          return methods.map((method) => unprefix(method));
        });
      }
    }
    dist.Aria2RPC = Aria2RPC;
    return dist;
  }
  var distExports = requireDist();
  function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
  }
  var browser = { exports: {} };
  var process = browser.exports = {};
  var cachedSetTimeout;
  var cachedClearTimeout;
  function defaultSetTimout() {
    throw new Error("setTimeout has not been defined");
  }
  function defaultClearTimeout() {
    throw new Error("clearTimeout has not been defined");
  }
  (function() {
    try {
      if (typeof setTimeout === "function") {
        cachedSetTimeout = setTimeout;
      } else {
        cachedSetTimeout = defaultSetTimout;
      }
    } catch (e) {
      cachedSetTimeout = defaultSetTimout;
    }
    try {
      if (typeof clearTimeout === "function") {
        cachedClearTimeout = clearTimeout;
      } else {
        cachedClearTimeout = defaultClearTimeout;
      }
    } catch (e) {
      cachedClearTimeout = defaultClearTimeout;
    }
  })();
  function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
      return setTimeout(fun, 0);
    }
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
      cachedSetTimeout = setTimeout;
      return setTimeout(fun, 0);
    }
    try {
      return cachedSetTimeout(fun, 0);
    } catch (e) {
      try {
        return cachedSetTimeout.call(null, fun, 0);
      } catch (e2) {
        return cachedSetTimeout.call(this, fun, 0);
      }
    }
  }
  function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
      return clearTimeout(marker);
    }
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
      cachedClearTimeout = clearTimeout;
      return clearTimeout(marker);
    }
    try {
      return cachedClearTimeout(marker);
    } catch (e) {
      try {
        return cachedClearTimeout.call(null, marker);
      } catch (e2) {
        return cachedClearTimeout.call(this, marker);
      }
    }
  }
  var queue = [];
  var draining = false;
  var currentQueue;
  var queueIndex = -1;
  function cleanUpNextTick() {
    if (!draining || !currentQueue) {
      return;
    }
    draining = false;
    if (currentQueue.length) {
      queue = currentQueue.concat(queue);
    } else {
      queueIndex = -1;
    }
    if (queue.length) {
      drainQueue();
    }
  }
  function drainQueue() {
    if (draining) {
      return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;
    var len = queue.length;
    while (len) {
      currentQueue = queue;
      queue = [];
      while (++queueIndex < len) {
        if (currentQueue) {
          currentQueue[queueIndex].run();
        }
      }
      queueIndex = -1;
      len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
  }
  process.nextTick = function(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
      for (var i = 1; i < arguments.length; i++) {
        args[i - 1] = arguments[i];
      }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
      runTimeout(drainQueue);
    }
  };
  function Item(fun, array) {
    this.fun = fun;
    this.array = array;
  }
  Item.prototype.run = function() {
    this.fun.apply(null, this.array);
  };
  process.title = "browser";
  process.browser = true;
  process.env = {};
  process.argv = [];
  process.version = "";
  process.versions = {};
  function noop() {
  }
  process.on = noop;
  process.addListener = noop;
  process.once = noop;
  process.off = noop;
  process.removeListener = noop;
  process.removeAllListeners = noop;
  process.emit = noop;
  process.prependListener = noop;
  process.prependOnceListener = noop;
  process.listeners = function(name) {
    return [];
  };
  process.binding = function(name) {
    throw new Error("process.binding is not supported");
  };
  process.cwd = function() {
    return "/";
  };
  process.chdir = function(dir) {
    throw new Error("process.chdir is not supported");
  };
  process.umask = function() {
    return 0;
  };
  var browserExports = browser.exports;
  const process$1 = /* @__PURE__ */ getDefaultExportFromCjs(browserExports);
  var pathBrowserify;
  var hasRequiredPathBrowserify;
  function requirePathBrowserify() {
    if (hasRequiredPathBrowserify) return pathBrowserify;
    hasRequiredPathBrowserify = 1;
    function assertPath(path2) {
      if (typeof path2 !== "string") {
        throw new TypeError("Path must be a string. Received " + JSON.stringify(path2));
      }
    }
    function normalizeStringPosix(path2, allowAboveRoot) {
      var res = "";
      var lastSegmentLength = 0;
      var lastSlash = -1;
      var dots = 0;
      var code;
      for (var i = 0; i <= path2.length; ++i) {
        if (i < path2.length)
          code = path2.charCodeAt(i);
        else if (code === 47)
          break;
        else
          code = 47;
        if (code === 47) {
          if (lastSlash === i - 1 || dots === 1) ;
          else if (lastSlash !== i - 1 && dots === 2) {
            if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || res.charCodeAt(res.length - 2) !== 46) {
              if (res.length > 2) {
                var lastSlashIndex = res.lastIndexOf("/");
                if (lastSlashIndex !== res.length - 1) {
                  if (lastSlashIndex === -1) {
                    res = "";
                    lastSegmentLength = 0;
                  } else {
                    res = res.slice(0, lastSlashIndex);
                    lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
                  }
                  lastSlash = i;
                  dots = 0;
                  continue;
                }
              } else if (res.length === 2 || res.length === 1) {
                res = "";
                lastSegmentLength = 0;
                lastSlash = i;
                dots = 0;
                continue;
              }
            }
            if (allowAboveRoot) {
              if (res.length > 0)
                res += "/..";
              else
                res = "..";
              lastSegmentLength = 2;
            }
          } else {
            if (res.length > 0)
              res += "/" + path2.slice(lastSlash + 1, i);
            else
              res = path2.slice(lastSlash + 1, i);
            lastSegmentLength = i - lastSlash - 1;
          }
          lastSlash = i;
          dots = 0;
        } else if (code === 46 && dots !== -1) {
          ++dots;
        } else {
          dots = -1;
        }
      }
      return res;
    }
    function _format(sep, pathObject) {
      var dir = pathObject.dir || pathObject.root;
      var base = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
      if (!dir) {
        return base;
      }
      if (dir === pathObject.root) {
        return dir + base;
      }
      return dir + sep + base;
    }
    var posix = {
      // path.resolve([from ...], to)
      resolve: function resolve() {
        var resolvedPath = "";
        var resolvedAbsolute = false;
        var cwd;
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path2;
          if (i >= 0)
            path2 = arguments[i];
          else {
            if (cwd === void 0)
              cwd = process$1.cwd();
            path2 = cwd;
          }
          assertPath(path2);
          if (path2.length === 0) {
            continue;
          }
          resolvedPath = path2 + "/" + resolvedPath;
          resolvedAbsolute = path2.charCodeAt(0) === 47;
        }
        resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);
        if (resolvedAbsolute) {
          if (resolvedPath.length > 0)
            return "/" + resolvedPath;
          else
            return "/";
        } else if (resolvedPath.length > 0) {
          return resolvedPath;
        } else {
          return ".";
        }
      },
      normalize: function normalize(path2) {
        assertPath(path2);
        if (path2.length === 0) return ".";
        var isAbsolute = path2.charCodeAt(0) === 47;
        var trailingSeparator = path2.charCodeAt(path2.length - 1) === 47;
        path2 = normalizeStringPosix(path2, !isAbsolute);
        if (path2.length === 0 && !isAbsolute) path2 = ".";
        if (path2.length > 0 && trailingSeparator) path2 += "/";
        if (isAbsolute) return "/" + path2;
        return path2;
      },
      isAbsolute: function isAbsolute(path2) {
        assertPath(path2);
        return path2.length > 0 && path2.charCodeAt(0) === 47;
      },
      join: function join() {
        if (arguments.length === 0)
          return ".";
        var joined;
        for (var i = 0; i < arguments.length; ++i) {
          var arg = arguments[i];
          assertPath(arg);
          if (arg.length > 0) {
            if (joined === void 0)
              joined = arg;
            else
              joined += "/" + arg;
          }
        }
        if (joined === void 0)
          return ".";
        return posix.normalize(joined);
      },
      relative: function relative(from, to) {
        assertPath(from);
        assertPath(to);
        if (from === to) return "";
        from = posix.resolve(from);
        to = posix.resolve(to);
        if (from === to) return "";
        var fromStart = 1;
        for (; fromStart < from.length; ++fromStart) {
          if (from.charCodeAt(fromStart) !== 47)
            break;
        }
        var fromEnd = from.length;
        var fromLen = fromEnd - fromStart;
        var toStart = 1;
        for (; toStart < to.length; ++toStart) {
          if (to.charCodeAt(toStart) !== 47)
            break;
        }
        var toEnd = to.length;
        var toLen = toEnd - toStart;
        var length = fromLen < toLen ? fromLen : toLen;
        var lastCommonSep = -1;
        var i = 0;
        for (; i <= length; ++i) {
          if (i === length) {
            if (toLen > length) {
              if (to.charCodeAt(toStart + i) === 47) {
                return to.slice(toStart + i + 1);
              } else if (i === 0) {
                return to.slice(toStart + i);
              }
            } else if (fromLen > length) {
              if (from.charCodeAt(fromStart + i) === 47) {
                lastCommonSep = i;
              } else if (i === 0) {
                lastCommonSep = 0;
              }
            }
            break;
          }
          var fromCode = from.charCodeAt(fromStart + i);
          var toCode = to.charCodeAt(toStart + i);
          if (fromCode !== toCode)
            break;
          else if (fromCode === 47)
            lastCommonSep = i;
        }
        var out = "";
        for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
          if (i === fromEnd || from.charCodeAt(i) === 47) {
            if (out.length === 0)
              out += "..";
            else
              out += "/..";
          }
        }
        if (out.length > 0)
          return out + to.slice(toStart + lastCommonSep);
        else {
          toStart += lastCommonSep;
          if (to.charCodeAt(toStart) === 47)
            ++toStart;
          return to.slice(toStart);
        }
      },
      _makeLong: function _makeLong(path2) {
        return path2;
      },
      dirname: function dirname(path2) {
        assertPath(path2);
        if (path2.length === 0) return ".";
        var code = path2.charCodeAt(0);
        var hasRoot = code === 47;
        var end = -1;
        var matchedSlash = true;
        for (var i = path2.length - 1; i >= 1; --i) {
          code = path2.charCodeAt(i);
          if (code === 47) {
            if (!matchedSlash) {
              end = i;
              break;
            }
          } else {
            matchedSlash = false;
          }
        }
        if (end === -1) return hasRoot ? "/" : ".";
        if (hasRoot && end === 1) return "//";
        return path2.slice(0, end);
      },
      basename: function basename(path2, ext) {
        if (ext !== void 0 && typeof ext !== "string") throw new TypeError('"ext" argument must be a string');
        assertPath(path2);
        var start = 0;
        var end = -1;
        var matchedSlash = true;
        var i;
        if (ext !== void 0 && ext.length > 0 && ext.length <= path2.length) {
          if (ext.length === path2.length && ext === path2) return "";
          var extIdx = ext.length - 1;
          var firstNonSlashEnd = -1;
          for (i = path2.length - 1; i >= 0; --i) {
            var code = path2.charCodeAt(i);
            if (code === 47) {
              if (!matchedSlash) {
                start = i + 1;
                break;
              }
            } else {
              if (firstNonSlashEnd === -1) {
                matchedSlash = false;
                firstNonSlashEnd = i + 1;
              }
              if (extIdx >= 0) {
                if (code === ext.charCodeAt(extIdx)) {
                  if (--extIdx === -1) {
                    end = i;
                  }
                } else {
                  extIdx = -1;
                  end = firstNonSlashEnd;
                }
              }
            }
          }
          if (start === end) end = firstNonSlashEnd;
          else if (end === -1) end = path2.length;
          return path2.slice(start, end);
        } else {
          for (i = path2.length - 1; i >= 0; --i) {
            if (path2.charCodeAt(i) === 47) {
              if (!matchedSlash) {
                start = i + 1;
                break;
              }
            } else if (end === -1) {
              matchedSlash = false;
              end = i + 1;
            }
          }
          if (end === -1) return "";
          return path2.slice(start, end);
        }
      },
      extname: function extname(path2) {
        assertPath(path2);
        var startDot = -1;
        var startPart = 0;
        var end = -1;
        var matchedSlash = true;
        var preDotState = 0;
        for (var i = path2.length - 1; i >= 0; --i) {
          var code = path2.charCodeAt(i);
          if (code === 47) {
            if (!matchedSlash) {
              startPart = i + 1;
              break;
            }
            continue;
          }
          if (end === -1) {
            matchedSlash = false;
            end = i + 1;
          }
          if (code === 46) {
            if (startDot === -1)
              startDot = i;
            else if (preDotState !== 1)
              preDotState = 1;
          } else if (startDot !== -1) {
            preDotState = -1;
          }
        }
        if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
        preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
          return "";
        }
        return path2.slice(startDot, end);
      },
      format: function format(pathObject) {
        if (pathObject === null || typeof pathObject !== "object") {
          throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
        }
        return _format("/", pathObject);
      },
      parse: function parse(path2) {
        assertPath(path2);
        var ret = { root: "", dir: "", base: "", ext: "", name: "" };
        if (path2.length === 0) return ret;
        var code = path2.charCodeAt(0);
        var isAbsolute = code === 47;
        var start;
        if (isAbsolute) {
          ret.root = "/";
          start = 1;
        } else {
          start = 0;
        }
        var startDot = -1;
        var startPart = 0;
        var end = -1;
        var matchedSlash = true;
        var i = path2.length - 1;
        var preDotState = 0;
        for (; i >= start; --i) {
          code = path2.charCodeAt(i);
          if (code === 47) {
            if (!matchedSlash) {
              startPart = i + 1;
              break;
            }
            continue;
          }
          if (end === -1) {
            matchedSlash = false;
            end = i + 1;
          }
          if (code === 46) {
            if (startDot === -1) startDot = i;
            else if (preDotState !== 1) preDotState = 1;
          } else if (startDot !== -1) {
            preDotState = -1;
          }
        }
        if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
        preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
          if (end !== -1) {
            if (startPart === 0 && isAbsolute) ret.base = ret.name = path2.slice(1, end);
            else ret.base = ret.name = path2.slice(startPart, end);
          }
        } else {
          if (startPart === 0 && isAbsolute) {
            ret.name = path2.slice(1, startDot);
            ret.base = path2.slice(1, end);
          } else {
            ret.name = path2.slice(startPart, startDot);
            ret.base = path2.slice(startPart, end);
          }
          ret.ext = path2.slice(startDot, end);
        }
        if (startPart > 0) ret.dir = path2.slice(0, startPart - 1);
        else if (isAbsolute) ret.dir = "/";
        return ret;
      },
      sep: "/",
      delimiter: ":",
      win32: null,
      posix: null
    };
    posix.posix = posix;
    pathBrowserify = posix;
    return pathBrowserify;
  }
  var pathBrowserifyExports = requirePathBrowserify();
  const path = /* @__PURE__ */ getDefaultExportFromCjs$1(pathBrowserifyExports);
  var _GM_deleteValue = /* @__PURE__ */ (() => typeof GM_deleteValue != "undefined" ? GM_deleteValue : void 0)();
  var _GM_getValue = /* @__PURE__ */ (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
  var _GM_listValues = /* @__PURE__ */ (() => typeof GM_listValues != "undefined" ? GM_listValues : void 0)();
  var _GM_registerMenuCommand = /* @__PURE__ */ (() => typeof GM_registerMenuCommand != "undefined" ? GM_registerMenuCommand : void 0)();
  var _GM_setValue = /* @__PURE__ */ (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
  const DEFAULT_CONFIG = {
    "aria2-rpc-address": "ws://localhost:6800/jsonrpc",
    "aria2-rpc-secret": "",
    "aria2-download-path": ""
  };
  function cleanupConfig() {
    for (const key of _GM_listValues()) {
      if ([null, void 0].includes(_GM_getValue(key))) {
        _GM_deleteValue(key);
      }
    }
  }
  function loadConfig() {
    const configStr = _GM_getValue("config");
    if (configStr) {
      return JSON.parse(configStr);
    }
    return DEFAULT_CONFIG;
  }
  function createJsonEditor(initial, onChange) {
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.top = "0";
    container.style.left = "0";
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.display = "flex";
    container.style.justifyContent = "center";
    container.style.alignItems = "center";
    container.style.zIndex = "999999998";
    const closeButton = document.createElement("button");
    closeButton.innerHTML = "关闭";
    closeButton.style.position = "absolute";
    closeButton.style.right = "10px";
    closeButton.style.bottom = "10px";
    closeButton.style.display = "flex";
    closeButton.style.zIndex = "999999999";
    closeButton.onclick = () => {
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
    };
    container.appendChild(closeButton);
    document.body.appendChild(container);
    new JSONEditor(container, { onChangeText: onChange }, initial);
  }
  function modifyConfig() {
    createJsonEditor(loadConfig(), (newConfig) => {
      _GM_setValue("config", newConfig);
    });
  }
  function getCollectTitle() {
    const titleSelector = "#video-playlist-wrapper h4";
    const titleTag = document.querySelector(titleSelector);
    if (!titleTag) {
      throw new Error(`Invalid title selector ${titleSelector}`);
    }
    const title = titleTag.textContent;
    if (!title) {
      throw new Error(`Invalid title`);
    }
    return title;
  }
  function getDownloadPageURL(watchURL) {
    const url = new URL(watchURL);
    const baseURL = url.origin;
    const params = url.searchParams;
    let videoID = params.get("v");
    let downloadPageURL = `${baseURL}/download?v=${videoID}`;
    return downloadPageURL;
  }
  function getAllDownloadPageURL() {
    var _a;
    const urlTagList = (_a = document.querySelector("#video-playlist-wrapper")) == null ? void 0 : _a.querySelectorAll("a.overlay");
    if (!urlTagList || urlTagList.length === 0) {
      throw new Error(`Invalid urlTag selector`);
    }
    const urlList = Array.from(urlTagList).map((tag) => {
      return getDownloadPageURL(tag.href);
    });
    return urlList;
  }
  async function getDownloadInfo(downloadPageURL) {
    const resp = await fetch(downloadPageURL);
    const data = await resp.text();
    const iframe = document.createElement("iframe");
    iframe.srcdoc = data;
    iframe.style.display = "none";
    document.body.appendChild(iframe);
    await new Promise((resolve) => iframe.onload = resolve);
    const doc = iframe.contentDocument;
    try {
      const titleSelector = "#content-div > div.row.no-gutter.video-show-width.download-panel > div.col-md-12 > div > div > h3";
      const titleTag = doc.querySelector(titleSelector);
      if (!titleTag) {
        throw new Error(`no title for download page ${downloadPageURL}`);
      }
      const title = titleTag.textContent;
      const urlSelector = "table.download-table a";
      const urlTag = doc.querySelector(urlSelector);
      if (urlTag) {
        const url = urlTag.getAttribute("data-url");
        if (url) {
          return {
            title,
            url
          };
        }
      }
      throw new Error(`no url for download page ${downloadPageURL}`);
    } catch (error) {
      throw error;
    } finally {
      iframe.remove();
    }
  }
  async function addDownloadTask(collectTitle, downloadInfoList) {
    const SECURE_PROTOCOL = ["wss:", "https:"];
    const config = loadConfig();
    console.log(config);
    let url = new URL(config["aria2-rpc-address"]);
    const secure = SECURE_PROTOCOL.includes(url.protocol);
    let port = secure ? 443 : 80;
    if (url.port != "") {
      port = parseInt(url.port);
    }
    const aria2 = new distExports.Aria2RPC(
      {
        host: url.hostname,
        port,
        secure,
        secret: config["aria2-rpc-secret"],
        path: url.pathname
      },
      { WebSocket, fetch }
    );
    await aria2.open();
    try {
      const multicall = downloadInfoList.map((info) => [
        "aria2.addUri",
        [info.url],
        {
          dir: path.join(config["aria2-download-path"], collectTitle),
          out: `${info.title}.mp4`
        }
      ]);
      console.log(multicall);
      const result = await aria2.multicall(multicall);
      console.log(result);
    } finally {
      await aria2.close();
    }
  }
  async function downloadCollection() {
    const collectTitle = getCollectTitle();
    console.log(collectTitle);
    const urlList = getAllDownloadPageURL();
    console.log(urlList);
    const downloadInfoList = await Promise.all(
      urlList.map((url) => {
        return getDownloadInfo(url);
      })
    );
    console.log(downloadInfoList);
    await addDownloadTask(collectTitle, downloadInfoList);
  }
  async function downloadOne() {
    const collectTitle = getCollectTitle();
    console.log(collectTitle);
    const urlList = [getDownloadPageURL(window.location.href)];
    console.log(urlList);
    const downloadInfoList = await Promise.all(
      urlList.map((url) => {
        return getDownloadInfo(url);
      })
    );
    console.log(downloadInfoList);
    await addDownloadTask(collectTitle, downloadInfoList);
  }
  cleanupConfig();
  _GM_registerMenuCommand("设置", modifyConfig);
  _GM_registerMenuCommand("下载本集", downloadOne);
  _GM_registerMenuCommand("下载合集", downloadCollection);

})(JSONEditor);