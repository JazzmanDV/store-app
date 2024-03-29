/**
 * @license
 * Swiper 7.3.4
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * https://swiperjs.com
 *
 * Copyright 2014-2021 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: December 22, 2021
 */

function isObject$1(e) {
    return null !== e && "object" == typeof e && "constructor" in e && e.constructor === Object;
}
function extend$1(e = {}, t = {}) {
    Object.keys(t).forEach((s) => {
        void 0 === e[s]
            ? (e[s] = t[s])
            : isObject$1(t[s]) && isObject$1(e[s]) && Object.keys(t[s]).length > 0 && extend$1(e[s], t[s]);
    });
}
const ssrDocument = {
    body: {},
    addEventListener() {},
    removeEventListener() {},
    activeElement: { blur() {}, nodeName: "" },
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
    createEvent: () => ({ initEvent() {} }),
    createElement: () => ({
        children: [],
        childNodes: [],
        style: {},
        setAttribute() {},
        getElementsByTagName: () => [],
    }),
    createElementNS: () => ({}),
    importNode: () => null,
    location: { hash: "", host: "", hostname: "", href: "", origin: "", pathname: "", protocol: "", search: "" },
};
function getDocument() {
    const e = "undefined" != typeof document ? document : {};
    return extend$1(e, ssrDocument), e;
}
const ssrWindow = {
    document: ssrDocument,
    navigator: { userAgent: "" },
    location: { hash: "", host: "", hostname: "", href: "", origin: "", pathname: "", protocol: "", search: "" },
    history: { replaceState() {}, pushState() {}, go() {}, back() {} },
    CustomEvent: function () {
        return this;
    },
    addEventListener() {},
    removeEventListener() {},
    getComputedStyle: () => ({ getPropertyValue: () => "" }),
    Image() {},
    Date() {},
    screen: {},
    setTimeout() {},
    clearTimeout() {},
    matchMedia: () => ({}),
    requestAnimationFrame: (e) => ("undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0)),
    cancelAnimationFrame(e) {
        "undefined" != typeof setTimeout && clearTimeout(e);
    },
};
function getWindow() {
    const e = "undefined" != typeof window ? window : {};
    return extend$1(e, ssrWindow), e;
}
function makeReactive(e) {
    const t = e.__proto__;
    Object.defineProperty(e, "__proto__", {
        get: () => t,
        set(e) {
            t.__proto__ = e;
        },
    });
}
class Dom7 extends Array {
    constructor(e) {
        super(...(e || [])), makeReactive(this);
    }
}
function arrayFlat(e = []) {
    const t = [];
    return (
        e.forEach((e) => {
            Array.isArray(e) ? t.push(...arrayFlat(e)) : t.push(e);
        }),
        t
    );
}
function arrayFilter(e, t) {
    return Array.prototype.filter.call(e, t);
}
function arrayUnique(e) {
    const t = [];
    for (let s = 0; s < e.length; s += 1) -1 === t.indexOf(e[s]) && t.push(e[s]);
    return t;
}
function qsa(e, t) {
    if ("string" != typeof e) return [e];
    const s = [],
        a = t.querySelectorAll(e);
    for (let e = 0; e < a.length; e += 1) s.push(a[e]);
    return s;
}
function $(e, t) {
    const s = getWindow(),
        a = getDocument();
    let i = [];
    if (!t && e instanceof Dom7) return e;
    if (!e) return new Dom7(i);
    if ("string" == typeof e) {
        const s = e.trim();
        if (s.indexOf("<") >= 0 && s.indexOf(">") >= 0) {
            let e = "div";
            0 === s.indexOf("<li") && (e = "ul"),
                0 === s.indexOf("<tr") && (e = "tbody"),
                (0 !== s.indexOf("<td") && 0 !== s.indexOf("<th")) || (e = "tr"),
                0 === s.indexOf("<tbody") && (e = "table"),
                0 === s.indexOf("<option") && (e = "select");
            const t = a.createElement(e);
            t.innerHTML = s;
            for (let e = 0; e < t.childNodes.length; e += 1) i.push(t.childNodes[e]);
        } else i = qsa(e.trim(), t || a);
    } else if (e.nodeType || e === s || e === a) i.push(e);
    else if (Array.isArray(e)) {
        if (e instanceof Dom7) return e;
        i = e;
    }
    return new Dom7(arrayUnique(i));
}
function addClass(...e) {
    const t = arrayFlat(e.map((e) => e.split(" ")));
    return (
        this.forEach((e) => {
            e.classList.add(...t);
        }),
        this
    );
}
function removeClass(...e) {
    const t = arrayFlat(e.map((e) => e.split(" ")));
    return (
        this.forEach((e) => {
            e.classList.remove(...t);
        }),
        this
    );
}
function toggleClass(...e) {
    const t = arrayFlat(e.map((e) => e.split(" ")));
    this.forEach((e) => {
        t.forEach((t) => {
            e.classList.toggle(t);
        });
    });
}
function hasClass(...e) {
    const t = arrayFlat(e.map((e) => e.split(" ")));
    return arrayFilter(this, (e) => t.filter((t) => e.classList.contains(t)).length > 0).length > 0;
}
function attr(e, t) {
    if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
    for (let s = 0; s < this.length; s += 1)
        if (2 === arguments.length) this[s].setAttribute(e, t);
        else for (const t in e) (this[s][t] = e[t]), this[s].setAttribute(t, e[t]);
    return this;
}
function removeAttr(e) {
    for (let t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
    return this;
}
function transform(e) {
    for (let t = 0; t < this.length; t += 1) this[t].style.transform = e;
    return this;
}
function transition$1(e) {
    for (let t = 0; t < this.length; t += 1) this[t].style.transitionDuration = "string" != typeof e ? `${e}ms` : e;
    return this;
}
function on(...e) {
    let [t, s, a, i] = e;
    function r(e) {
        const t = e.target;
        if (!t) return;
        const i = e.target.dom7EventData || [];
        if ((i.indexOf(e) < 0 && i.unshift(e), $(t).is(s))) a.apply(t, i);
        else {
            const e = $(t).parents();
            for (let t = 0; t < e.length; t += 1) $(e[t]).is(s) && a.apply(e[t], i);
        }
    }
    function n(e) {
        const t = (e && e.target && e.target.dom7EventData) || [];
        t.indexOf(e) < 0 && t.unshift(e), a.apply(this, t);
    }
    "function" == typeof e[1] && (([t, a, i] = e), (s = void 0)), i || (i = !1);
    const l = t.split(" ");
    let o;
    for (let e = 0; e < this.length; e += 1) {
        const t = this[e];
        if (s)
            for (o = 0; o < l.length; o += 1) {
                const e = l[o];
                t.dom7LiveListeners || (t.dom7LiveListeners = {}),
                    t.dom7LiveListeners[e] || (t.dom7LiveListeners[e] = []),
                    t.dom7LiveListeners[e].push({ listener: a, proxyListener: r }),
                    t.addEventListener(e, r, i);
            }
        else
            for (o = 0; o < l.length; o += 1) {
                const e = l[o];
                t.dom7Listeners || (t.dom7Listeners = {}),
                    t.dom7Listeners[e] || (t.dom7Listeners[e] = []),
                    t.dom7Listeners[e].push({ listener: a, proxyListener: n }),
                    t.addEventListener(e, n, i);
            }
    }
    return this;
}
function off(...e) {
    let [t, s, a, i] = e;
    "function" == typeof e[1] && (([t, a, i] = e), (s = void 0)), i || (i = !1);
    const r = t.split(" ");
    for (let e = 0; e < r.length; e += 1) {
        const t = r[e];
        for (let e = 0; e < this.length; e += 1) {
            const r = this[e];
            let n;
            if (
                (!s && r.dom7Listeners
                    ? (n = r.dom7Listeners[t])
                    : s && r.dom7LiveListeners && (n = r.dom7LiveListeners[t]),
                n && n.length)
            )
                for (let e = n.length - 1; e >= 0; e -= 1) {
                    const s = n[e];
                    (a && s.listener === a) || (a && s.listener && s.listener.dom7proxy && s.listener.dom7proxy === a)
                        ? (r.removeEventListener(t, s.proxyListener, i), n.splice(e, 1))
                        : a || (r.removeEventListener(t, s.proxyListener, i), n.splice(e, 1));
                }
        }
    }
    return this;
}
function trigger(...e) {
    const t = getWindow(),
        s = e[0].split(" "),
        a = e[1];
    for (let i = 0; i < s.length; i += 1) {
        const r = s[i];
        for (let s = 0; s < this.length; s += 1) {
            const i = this[s];
            if (t.CustomEvent) {
                const s = new t.CustomEvent(r, { detail: a, bubbles: !0, cancelable: !0 });
                (i.dom7EventData = e.filter((e, t) => t > 0)),
                    i.dispatchEvent(s),
                    (i.dom7EventData = []),
                    delete i.dom7EventData;
            }
        }
    }
    return this;
}
function transitionEnd$1(e) {
    const t = this;
    return (
        e &&
            t.on("transitionend", function s(a) {
                a.target === this && (e.call(this, a), t.off("transitionend", s));
            }),
        this
    );
}
function outerWidth(e) {
    if (this.length > 0) {
        if (e) {
            const e = this.styles();
            return (
                this[0].offsetWidth +
                parseFloat(e.getPropertyValue("margin-right")) +
                parseFloat(e.getPropertyValue("margin-left"))
            );
        }
        return this[0].offsetWidth;
    }
    return null;
}
function outerHeight(e) {
    if (this.length > 0) {
        if (e) {
            const e = this.styles();
            return (
                this[0].offsetHeight +
                parseFloat(e.getPropertyValue("margin-top")) +
                parseFloat(e.getPropertyValue("margin-bottom"))
            );
        }
        return this[0].offsetHeight;
    }
    return null;
}
function offset() {
    if (this.length > 0) {
        const e = getWindow(),
            t = getDocument(),
            s = this[0],
            a = s.getBoundingClientRect(),
            i = t.body,
            r = s.clientTop || i.clientTop || 0,
            n = s.clientLeft || i.clientLeft || 0,
            l = s === e ? e.scrollY : s.scrollTop,
            o = s === e ? e.scrollX : s.scrollLeft;
        return { top: a.top + l - r, left: a.left + o - n };
    }
    return null;
}
function styles() {
    const e = getWindow();
    return this[0] ? e.getComputedStyle(this[0], null) : {};
}
function css(e, t) {
    const s = getWindow();
    let a;
    if (1 === arguments.length) {
        if ("string" != typeof e) {
            for (a = 0; a < this.length; a += 1) for (const t in e) this[a].style[t] = e[t];
            return this;
        }
        if (this[0]) return s.getComputedStyle(this[0], null).getPropertyValue(e);
    }
    if (2 === arguments.length && "string" == typeof e) {
        for (a = 0; a < this.length; a += 1) this[a].style[e] = t;
        return this;
    }
    return this;
}
function each(e) {
    return e
        ? (this.forEach((t, s) => {
              e.apply(t, [t, s]);
          }),
          this)
        : this;
}
function filter(e) {
    return $(arrayFilter(this, e));
}
function html(e) {
    if (void 0 === e) return this[0] ? this[0].innerHTML : null;
    for (let t = 0; t < this.length; t += 1) this[t].innerHTML = e;
    return this;
}
function text(e) {
    if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
    for (let t = 0; t < this.length; t += 1) this[t].textContent = e;
    return this;
}
function is(e) {
    const t = getWindow(),
        s = getDocument(),
        a = this[0];
    let i, r;
    if (!a || void 0 === e) return !1;
    if ("string" == typeof e) {
        if (a.matches) return a.matches(e);
        if (a.webkitMatchesSelector) return a.webkitMatchesSelector(e);
        if (a.msMatchesSelector) return a.msMatchesSelector(e);
        for (i = $(e), r = 0; r < i.length; r += 1) if (i[r] === a) return !0;
        return !1;
    }
    if (e === s) return a === s;
    if (e === t) return a === t;
    if (e.nodeType || e instanceof Dom7) {
        for (i = e.nodeType ? [e] : e, r = 0; r < i.length; r += 1) if (i[r] === a) return !0;
        return !1;
    }
    return !1;
}
function index() {
    let e,
        t = this[0];
    if (t) {
        for (e = 0; null !== (t = t.previousSibling); ) 1 === t.nodeType && (e += 1);
        return e;
    }
}
function eq(e) {
    if (void 0 === e) return this;
    const t = this.length;
    if (e > t - 1) return $([]);
    if (e < 0) {
        const s = t + e;
        return $(s < 0 ? [] : [this[s]]);
    }
    return $([this[e]]);
}
function append(...e) {
    let t;
    const s = getDocument();
    for (let a = 0; a < e.length; a += 1) {
        t = e[a];
        for (let e = 0; e < this.length; e += 1)
            if ("string" == typeof t) {
                const a = s.createElement("div");
                for (a.innerHTML = t; a.firstChild; ) this[e].appendChild(a.firstChild);
            } else if (t instanceof Dom7) for (let s = 0; s < t.length; s += 1) this[e].appendChild(t[s]);
            else this[e].appendChild(t);
    }
    return this;
}
function prepend(e) {
    const t = getDocument();
    let s, a;
    for (s = 0; s < this.length; s += 1)
        if ("string" == typeof e) {
            const i = t.createElement("div");
            for (i.innerHTML = e, a = i.childNodes.length - 1; a >= 0; a -= 1)
                this[s].insertBefore(i.childNodes[a], this[s].childNodes[0]);
        } else if (e instanceof Dom7)
            for (a = 0; a < e.length; a += 1) this[s].insertBefore(e[a], this[s].childNodes[0]);
        else this[s].insertBefore(e, this[s].childNodes[0]);
    return this;
}
function next(e) {
    return this.length > 0
        ? e
            ? this[0].nextElementSibling && $(this[0].nextElementSibling).is(e)
                ? $([this[0].nextElementSibling])
                : $([])
            : this[0].nextElementSibling
            ? $([this[0].nextElementSibling])
            : $([])
        : $([]);
}
function nextAll(e) {
    const t = [];
    let s = this[0];
    if (!s) return $([]);
    for (; s.nextElementSibling; ) {
        const a = s.nextElementSibling;
        e ? $(a).is(e) && t.push(a) : t.push(a), (s = a);
    }
    return $(t);
}
function prev(e) {
    if (this.length > 0) {
        const t = this[0];
        return e
            ? t.previousElementSibling && $(t.previousElementSibling).is(e)
                ? $([t.previousElementSibling])
                : $([])
            : t.previousElementSibling
            ? $([t.previousElementSibling])
            : $([]);
    }
    return $([]);
}
function prevAll(e) {
    const t = [];
    let s = this[0];
    if (!s) return $([]);
    for (; s.previousElementSibling; ) {
        const a = s.previousElementSibling;
        e ? $(a).is(e) && t.push(a) : t.push(a), (s = a);
    }
    return $(t);
}
function parent(e) {
    const t = [];
    for (let s = 0; s < this.length; s += 1)
        null !== this[s].parentNode &&
            (e ? $(this[s].parentNode).is(e) && t.push(this[s].parentNode) : t.push(this[s].parentNode));
    return $(t);
}
function parents(e) {
    const t = [];
    for (let s = 0; s < this.length; s += 1) {
        let a = this[s].parentNode;
        for (; a; ) e ? $(a).is(e) && t.push(a) : t.push(a), (a = a.parentNode);
    }
    return $(t);
}
function closest(e) {
    let t = this;
    return void 0 === e ? $([]) : (t.is(e) || (t = t.parents(e).eq(0)), t);
}
function find(e) {
    const t = [];
    for (let s = 0; s < this.length; s += 1) {
        const a = this[s].querySelectorAll(e);
        for (let e = 0; e < a.length; e += 1) t.push(a[e]);
    }
    return $(t);
}
function children(e) {
    const t = [];
    for (let s = 0; s < this.length; s += 1) {
        const a = this[s].children;
        for (let s = 0; s < a.length; s += 1) (e && !$(a[s]).is(e)) || t.push(a[s]);
    }
    return $(t);
}
function remove() {
    for (let e = 0; e < this.length; e += 1) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
    return this;
}
$.fn = Dom7.prototype;
const Methods = {
    addClass: addClass,
    removeClass: removeClass,
    hasClass: hasClass,
    toggleClass: toggleClass,
    attr: attr,
    removeAttr: removeAttr,
    transform: transform,
    transition: transition$1,
    on: on,
    off: off,
    trigger: trigger,
    transitionEnd: transitionEnd$1,
    outerWidth: outerWidth,
    outerHeight: outerHeight,
    styles: styles,
    offset: offset,
    css: css,
    each: each,
    html: html,
    text: text,
    is: is,
    index: index,
    eq: eq,
    append: append,
    prepend: prepend,
    next: next,
    nextAll: nextAll,
    prev: prev,
    prevAll: prevAll,
    parent: parent,
    parents: parents,
    closest: closest,
    find: find,
    children: children,
    filter: filter,
    remove: remove,
};
function deleteProps(e) {
    const t = e;
    Object.keys(t).forEach((e) => {
        try {
            t[e] = null;
        } catch (e) {}
        try {
            delete t[e];
        } catch (e) {}
    });
}
function nextTick(e, t = 0) {
    return setTimeout(e, t);
}
function now() {
    return Date.now();
}
function getComputedStyle$1(e) {
    const t = getWindow();
    let s;
    return (
        t.getComputedStyle && (s = t.getComputedStyle(e, null)),
        !s && e.currentStyle && (s = e.currentStyle),
        s || (s = e.style),
        s
    );
}
function getTranslate(e, t = "x") {
    const s = getWindow();
    let a, i, r;
    const n = getComputedStyle$1(e);
    return (
        s.WebKitCSSMatrix
            ? ((i = n.transform || n.webkitTransform),
              i.split(",").length > 6 &&
                  (i = i
                      .split(", ")
                      .map((e) => e.replace(",", "."))
                      .join(", ")),
              (r = new s.WebKitCSSMatrix("none" === i ? "" : i)))
            : ((r =
                  n.MozTransform ||
                  n.OTransform ||
                  n.MsTransform ||
                  n.msTransform ||
                  n.transform ||
                  n.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")),
              (a = r.toString().split(","))),
        "x" === t && (i = s.WebKitCSSMatrix ? r.m41 : 16 === a.length ? parseFloat(a[12]) : parseFloat(a[4])),
        "y" === t && (i = s.WebKitCSSMatrix ? r.m42 : 16 === a.length ? parseFloat(a[13]) : parseFloat(a[5])),
        i || 0
    );
}
function isObject(e) {
    return (
        "object" == typeof e &&
        null !== e &&
        e.constructor &&
        "Object" === Object.prototype.toString.call(e).slice(8, -1)
    );
}
function isNode(e) {
    return "undefined" != typeof window && void 0 !== window.HTMLElement
        ? e instanceof HTMLElement
        : e && (1 === e.nodeType || 11 === e.nodeType);
}
function extend(...e) {
    const t = Object(e[0]),
        s = ["__proto__", "constructor", "prototype"];
    for (let a = 1; a < e.length; a += 1) {
        const i = e[a];
        if (null != i && !isNode(i)) {
            const e = Object.keys(Object(i)).filter((e) => s.indexOf(e) < 0);
            for (let s = 0, a = e.length; s < a; s += 1) {
                const a = e[s],
                    r = Object.getOwnPropertyDescriptor(i, a);
                void 0 !== r &&
                    r.enumerable &&
                    (isObject(t[a]) && isObject(i[a])
                        ? i[a].__swiper__
                            ? (t[a] = i[a])
                            : extend(t[a], i[a])
                        : !isObject(t[a]) && isObject(i[a])
                        ? ((t[a] = {}), i[a].__swiper__ ? (t[a] = i[a]) : extend(t[a], i[a]))
                        : (t[a] = i[a]));
            }
        }
    }
    return t;
}
function setCSSProperty(e, t, s) {
    e.style.setProperty(t, s);
}
function animateCSSModeScroll({ swiper: e, targetPosition: t, side: s }) {
    const a = getWindow(),
        i = -e.translate;
    let r,
        n = null;
    const l = e.params.speed;
    (e.wrapperEl.style.scrollSnapType = "none"), a.cancelAnimationFrame(e.cssModeFrameID);
    const o = t > i ? "next" : "prev",
        d = (e, t) => ("next" === o && e >= t) || ("prev" === o && e <= t),
        c = () => {
            (r = new Date().getTime()), null === n && (n = r);
            const o = Math.max(Math.min((r - n) / l, 1), 0),
                p = 0.5 - Math.cos(o * Math.PI) / 2;
            let u = i + p * (t - i);
            if ((d(u, t) && (u = t), e.wrapperEl.scrollTo({ [s]: u }), d(u, t)))
                return (
                    (e.wrapperEl.style.overflow = "hidden"),
                    (e.wrapperEl.style.scrollSnapType = ""),
                    setTimeout(() => {
                        (e.wrapperEl.style.overflow = ""), e.wrapperEl.scrollTo({ [s]: u });
                    }),
                    void a.cancelAnimationFrame(e.cssModeFrameID)
                );
            e.cssModeFrameID = a.requestAnimationFrame(c);
        };
    c();
}
let support, deviceCached, browser;
function calcSupport() {
    const e = getWindow(),
        t = getDocument();
    return {
        smoothScroll: t.documentElement && "scrollBehavior" in t.documentElement.style,
        touch: !!("ontouchstart" in e || (e.DocumentTouch && t instanceof e.DocumentTouch)),
        passiveListener: (function () {
            let t = !1;
            try {
                const s = Object.defineProperty({}, "passive", {
                    get() {
                        t = !0;
                    },
                });
                e.addEventListener("testPassiveListener", null, s);
            } catch (e) {}
            return t;
        })(),
        gestures: "ongesturestart" in e,
    };
}
function getSupport() {
    return support || (support = calcSupport()), support;
}
function calcDevice({ userAgent: e } = {}) {
    const t = getSupport(),
        s = getWindow(),
        a = s.navigator.platform,
        i = e || s.navigator.userAgent,
        r = { ios: !1, android: !1 },
        n = s.screen.width,
        l = s.screen.height,
        o = i.match(/(Android);?[\s\/]+([\d.]+)?/);
    let d = i.match(/(iPad).*OS\s([\d_]+)/);
    const c = i.match(/(iPod)(.*OS\s([\d_]+))?/),
        p = !d && i.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
        u = "Win32" === a;
    let h = "MacIntel" === a;
    return (
        !d &&
            h &&
            t.touch &&
            [
                "1024x1366",
                "1366x1024",
                "834x1194",
                "1194x834",
                "834x1112",
                "1112x834",
                "768x1024",
                "1024x768",
                "820x1180",
                "1180x820",
                "810x1080",
                "1080x810",
            ].indexOf(`${n}x${l}`) >= 0 &&
            ((d = i.match(/(Version)\/([\d.]+)/)), d || (d = [0, 1, "13_0_0"]), (h = !1)),
        o && !u && ((r.os = "android"), (r.android = !0)),
        (d || p || c) && ((r.os = "ios"), (r.ios = !0)),
        r
    );
}
function getDevice(e = {}) {
    return deviceCached || (deviceCached = calcDevice(e)), deviceCached;
}
function calcBrowser() {
    const e = getWindow();
    return {
        isSafari: (function () {
            const t = e.navigator.userAgent.toLowerCase();
            return t.indexOf("safari") >= 0 && t.indexOf("chrome") < 0 && t.indexOf("android") < 0;
        })(),
        isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent),
    };
}
function getBrowser() {
    return browser || (browser = calcBrowser()), browser;
}
function Resize({ swiper: e, on: t, emit: s }) {
    const a = getWindow();
    let i = null;
    const r = () => {
            e && !e.destroyed && e.initialized && (s("beforeResize"), s("resize"));
        },
        n = () => {
            e && !e.destroyed && e.initialized && s("orientationchange");
        };
    t("init", () => {
        e.params.resizeObserver && void 0 !== a.ResizeObserver
            ? e &&
              !e.destroyed &&
              e.initialized &&
              ((i = new ResizeObserver((t) => {
                  const { width: s, height: a } = e;
                  let i = s,
                      n = a;
                  t.forEach(({ contentBoxSize: t, contentRect: s, target: a }) => {
                      (a && a !== e.el) ||
                          ((i = s ? s.width : (t[0] || t).inlineSize), (n = s ? s.height : (t[0] || t).blockSize));
                  }),
                      (i === s && n === a) || r();
              })),
              i.observe(e.el))
            : (a.addEventListener("resize", r), a.addEventListener("orientationchange", n));
    }),
        t("destroy", () => {
            i && i.unobserve && e.el && (i.unobserve(e.el), (i = null)),
                a.removeEventListener("resize", r),
                a.removeEventListener("orientationchange", n);
        });
}
function Observer({ swiper: e, extendParams: t, on: s, emit: a }) {
    const i = [],
        r = getWindow(),
        n = (e, t = {}) => {
            const s = new (r.MutationObserver || r.WebkitMutationObserver)((e) => {
                if (1 === e.length) return void a("observerUpdate", e[0]);
                const t = function () {
                    a("observerUpdate", e[0]);
                };
                r.requestAnimationFrame ? r.requestAnimationFrame(t) : r.setTimeout(t, 0);
            });
            s.observe(e, {
                attributes: void 0 === t.attributes || t.attributes,
                childList: void 0 === t.childList || t.childList,
                characterData: void 0 === t.characterData || t.characterData,
            }),
                i.push(s);
        };
    t({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
        s("init", () => {
            if (e.params.observer) {
                if (e.params.observeParents) {
                    const t = e.$el.parents();
                    for (let e = 0; e < t.length; e += 1) n(t[e]);
                }
                n(e.$el[0], { childList: e.params.observeSlideChildren }), n(e.$wrapperEl[0], { attributes: !1 });
            }
        }),
        s("destroy", () => {
            i.forEach((e) => {
                e.disconnect();
            }),
                i.splice(0, i.length);
        });
}
Object.keys(Methods).forEach((e) => {
    Object.defineProperty($.fn, e, { value: Methods[e], writable: !0 });
});
var eventsEmitter = {
    on(e, t, s) {
        const a = this;
        if ("function" != typeof t) return a;
        const i = s ? "unshift" : "push";
        return (
            e.split(" ").forEach((e) => {
                a.eventsListeners[e] || (a.eventsListeners[e] = []), a.eventsListeners[e][i](t);
            }),
            a
        );
    },
    once(e, t, s) {
        const a = this;
        if ("function" != typeof t) return a;
        function i(...s) {
            a.off(e, i), i.__emitterProxy && delete i.__emitterProxy, t.apply(a, s);
        }
        return (i.__emitterProxy = t), a.on(e, i, s);
    },
    onAny(e, t) {
        const s = this;
        if ("function" != typeof e) return s;
        const a = t ? "unshift" : "push";
        return s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[a](e), s;
    },
    offAny(e) {
        const t = this;
        if (!t.eventsAnyListeners) return t;
        const s = t.eventsAnyListeners.indexOf(e);
        return s >= 0 && t.eventsAnyListeners.splice(s, 1), t;
    },
    off(e, t) {
        const s = this;
        return s.eventsListeners
            ? (e.split(" ").forEach((e) => {
                  void 0 === t
                      ? (s.eventsListeners[e] = [])
                      : s.eventsListeners[e] &&
                        s.eventsListeners[e].forEach((a, i) => {
                            (a === t || (a.__emitterProxy && a.__emitterProxy === t)) &&
                                s.eventsListeners[e].splice(i, 1);
                        });
              }),
              s)
            : s;
    },
    emit(...e) {
        const t = this;
        if (!t.eventsListeners) return t;
        let s, a, i;
        "string" == typeof e[0] || Array.isArray(e[0])
            ? ((s = e[0]), (a = e.slice(1, e.length)), (i = t))
            : ((s = e[0].events), (a = e[0].data), (i = e[0].context || t)),
            a.unshift(i);
        return (
            (Array.isArray(s) ? s : s.split(" ")).forEach((e) => {
                t.eventsAnyListeners &&
                    t.eventsAnyListeners.length &&
                    t.eventsAnyListeners.forEach((t) => {
                        t.apply(i, [e, ...a]);
                    }),
                    t.eventsListeners &&
                        t.eventsListeners[e] &&
                        t.eventsListeners[e].forEach((e) => {
                            e.apply(i, a);
                        });
            }),
            t
        );
    },
};
function updateSize() {
    const e = this;
    let t, s;
    const a = e.$el;
    (t = void 0 !== e.params.width && null !== e.params.width ? e.params.width : a[0].clientWidth),
        (s = void 0 !== e.params.height && null !== e.params.height ? e.params.height : a[0].clientHeight),
        (0 === t && e.isHorizontal()) ||
            (0 === s && e.isVertical()) ||
            ((t = t - parseInt(a.css("padding-left") || 0, 10) - parseInt(a.css("padding-right") || 0, 10)),
            (s = s - parseInt(a.css("padding-top") || 0, 10) - parseInt(a.css("padding-bottom") || 0, 10)),
            Number.isNaN(t) && (t = 0),
            Number.isNaN(s) && (s = 0),
            Object.assign(e, { width: t, height: s, size: e.isHorizontal() ? t : s }));
}
function updateSlides() {
    const e = this;
    function t(t) {
        return e.isHorizontal()
            ? t
            : {
                  width: "height",
                  "margin-top": "margin-left",
                  "margin-bottom ": "margin-right",
                  "margin-left": "margin-top",
                  "margin-right": "margin-bottom",
                  "padding-left": "padding-top",
                  "padding-right": "padding-bottom",
                  marginRight: "marginBottom",
              }[t];
    }
    function s(e, s) {
        return parseFloat(e.getPropertyValue(t(s)) || 0);
    }
    const a = e.params,
        { $wrapperEl: i, size: r, rtlTranslate: n, wrongRTL: l } = e,
        o = e.virtual && a.virtual.enabled,
        d = o ? e.virtual.slides.length : e.slides.length,
        c = i.children(`.${e.params.slideClass}`),
        p = o ? e.virtual.slides.length : c.length;
    let u = [];
    const h = [],
        m = [];
    let f = a.slidesOffsetBefore;
    "function" == typeof f && (f = a.slidesOffsetBefore.call(e));
    let g = a.slidesOffsetAfter;
    "function" == typeof g && (g = a.slidesOffsetAfter.call(e));
    const v = e.snapGrid.length,
        w = e.slidesGrid.length;
    let b = a.spaceBetween,
        x = -f,
        y = 0,
        E = 0;
    if (void 0 === r) return;
    "string" == typeof b && b.indexOf("%") >= 0 && (b = (parseFloat(b.replace("%", "")) / 100) * r),
        (e.virtualSize = -b),
        n
            ? c.css({ marginLeft: "", marginBottom: "", marginTop: "" })
            : c.css({ marginRight: "", marginBottom: "", marginTop: "" }),
        a.centeredSlides &&
            a.cssMode &&
            (setCSSProperty(e.wrapperEl, "--swiper-centered-offset-before", ""),
            setCSSProperty(e.wrapperEl, "--swiper-centered-offset-after", ""));
    const $ = a.grid && a.grid.rows > 1 && e.grid;
    let T;
    $ && e.grid.initSlides(p);
    const S =
        "auto" === a.slidesPerView &&
        a.breakpoints &&
        Object.keys(a.breakpoints).filter((e) => void 0 !== a.breakpoints[e].slidesPerView).length > 0;
    for (let i = 0; i < p; i += 1) {
        T = 0;
        const n = c.eq(i);
        if (($ && e.grid.updateSlide(i, n, p, t), "none" !== n.css("display"))) {
            if ("auto" === a.slidesPerView) {
                S && (c[i].style[t("width")] = "");
                const r = getComputedStyle(n[0]),
                    l = n[0].style.transform,
                    o = n[0].style.webkitTransform;
                if ((l && (n[0].style.transform = "none"), o && (n[0].style.webkitTransform = "none"), a.roundLengths))
                    T = e.isHorizontal() ? n.outerWidth(!0) : n.outerHeight(!0);
                else {
                    const e = s(r, "width"),
                        t = s(r, "padding-left"),
                        a = s(r, "padding-right"),
                        i = s(r, "margin-left"),
                        l = s(r, "margin-right"),
                        o = r.getPropertyValue("box-sizing");
                    if (o && "border-box" === o) T = e + i + l;
                    else {
                        const { clientWidth: s, offsetWidth: r } = n[0];
                        T = e + t + a + i + l + (r - s);
                    }
                }
                l && (n[0].style.transform = l),
                    o && (n[0].style.webkitTransform = o),
                    a.roundLengths && (T = Math.floor(T));
            } else
                (T = (r - (a.slidesPerView - 1) * b) / a.slidesPerView),
                    a.roundLengths && (T = Math.floor(T)),
                    c[i] && (c[i].style[t("width")] = `${T}px`);
            c[i] && (c[i].swiperSlideSize = T),
                m.push(T),
                a.centeredSlides
                    ? ((x = x + T / 2 + y / 2 + b),
                      0 === y && 0 !== i && (x = x - r / 2 - b),
                      0 === i && (x = x - r / 2 - b),
                      Math.abs(x) < 0.001 && (x = 0),
                      a.roundLengths && (x = Math.floor(x)),
                      E % a.slidesPerGroup == 0 && u.push(x),
                      h.push(x))
                    : (a.roundLengths && (x = Math.floor(x)),
                      (E - Math.min(e.params.slidesPerGroupSkip, E)) % e.params.slidesPerGroup == 0 && u.push(x),
                      h.push(x),
                      (x = x + T + b)),
                (e.virtualSize += T + b),
                (y = T),
                (E += 1);
        }
    }
    if (
        ((e.virtualSize = Math.max(e.virtualSize, r) + g),
        n &&
            l &&
            ("slide" === a.effect || "coverflow" === a.effect) &&
            i.css({ width: `${e.virtualSize + a.spaceBetween}px` }),
        a.setWrapperSize && i.css({ [t("width")]: `${e.virtualSize + a.spaceBetween}px` }),
        $ && e.grid.updateWrapperSize(T, u, t),
        !a.centeredSlides)
    ) {
        const t = [];
        for (let s = 0; s < u.length; s += 1) {
            let i = u[s];
            a.roundLengths && (i = Math.floor(i)), u[s] <= e.virtualSize - r && t.push(i);
        }
        (u = t), Math.floor(e.virtualSize - r) - Math.floor(u[u.length - 1]) > 1 && u.push(e.virtualSize - r);
    }
    if ((0 === u.length && (u = [0]), 0 !== a.spaceBetween)) {
        const s = e.isHorizontal() && n ? "marginLeft" : t("marginRight");
        c.filter((e, t) => !a.cssMode || t !== c.length - 1).css({ [s]: `${b}px` });
    }
    if (a.centeredSlides && a.centeredSlidesBounds) {
        let e = 0;
        m.forEach((t) => {
            e += t + (a.spaceBetween ? a.spaceBetween : 0);
        }),
            (e -= a.spaceBetween);
        const t = e - r;
        u = u.map((e) => (e < 0 ? -f : e > t ? t + g : e));
    }
    if (a.centerInsufficientSlides) {
        let e = 0;
        if (
            (m.forEach((t) => {
                e += t + (a.spaceBetween ? a.spaceBetween : 0);
            }),
            (e -= a.spaceBetween),
            e < r)
        ) {
            const t = (r - e) / 2;
            u.forEach((e, s) => {
                u[s] = e - t;
            }),
                h.forEach((e, s) => {
                    h[s] = e + t;
                });
        }
    }
    if (
        (Object.assign(e, { slides: c, snapGrid: u, slidesGrid: h, slidesSizesGrid: m }),
        a.centeredSlides && a.cssMode && !a.centeredSlidesBounds)
    ) {
        setCSSProperty(e.wrapperEl, "--swiper-centered-offset-before", -u[0] + "px"),
            setCSSProperty(e.wrapperEl, "--swiper-centered-offset-after", e.size / 2 - m[m.length - 1] / 2 + "px");
        const t = -e.snapGrid[0],
            s = -e.slidesGrid[0];
        (e.snapGrid = e.snapGrid.map((e) => e + t)), (e.slidesGrid = e.slidesGrid.map((e) => e + s));
    }
    p !== d && e.emit("slidesLengthChange"),
        u.length !== v && (e.params.watchOverflow && e.checkOverflow(), e.emit("snapGridLengthChange")),
        h.length !== w && e.emit("slidesGridLengthChange"),
        a.watchSlidesProgress && e.updateSlidesOffset();
}
function updateAutoHeight(e) {
    const t = this,
        s = [],
        a = t.virtual && t.params.virtual.enabled;
    let i,
        r = 0;
    "number" == typeof e ? t.setTransition(e) : !0 === e && t.setTransition(t.params.speed);
    const n = (e) =>
        a
            ? t.slides.filter((t) => parseInt(t.getAttribute("data-swiper-slide-index"), 10) === e)[0]
            : t.slides.eq(e)[0];
    if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
        if (t.params.centeredSlides)
            t.visibleSlides.each((e) => {
                s.push(e);
            });
        else
            for (i = 0; i < Math.ceil(t.params.slidesPerView); i += 1) {
                const e = t.activeIndex + i;
                if (e > t.slides.length && !a) break;
                s.push(n(e));
            }
    else s.push(n(t.activeIndex));
    for (i = 0; i < s.length; i += 1)
        if (void 0 !== s[i]) {
            const e = s[i].offsetHeight;
            r = e > r ? e : r;
        }
    r && t.$wrapperEl.css("height", `${r}px`);
}
function updateSlidesOffset() {
    const e = this,
        t = e.slides;
    for (let s = 0; s < t.length; s += 1) t[s].swiperSlideOffset = e.isHorizontal() ? t[s].offsetLeft : t[s].offsetTop;
}
function updateSlidesProgress(e = (this && this.translate) || 0) {
    const t = this,
        s = t.params,
        { slides: a, rtlTranslate: i, snapGrid: r } = t;
    if (0 === a.length) return;
    void 0 === a[0].swiperSlideOffset && t.updateSlidesOffset();
    let n = -e;
    i && (n = e), a.removeClass(s.slideVisibleClass), (t.visibleSlidesIndexes = []), (t.visibleSlides = []);
    for (let e = 0; e < a.length; e += 1) {
        const l = a[e];
        let o = l.swiperSlideOffset;
        s.cssMode && s.centeredSlides && (o -= a[0].swiperSlideOffset);
        const d = (n + (s.centeredSlides ? t.minTranslate() : 0) - o) / (l.swiperSlideSize + s.spaceBetween),
            c = (n - r[0] + (s.centeredSlides ? t.minTranslate() : 0) - o) / (l.swiperSlideSize + s.spaceBetween),
            p = -(n - o),
            u = p + t.slidesSizesGrid[e];
        ((p >= 0 && p < t.size - 1) || (u > 1 && u <= t.size) || (p <= 0 && u >= t.size)) &&
            (t.visibleSlides.push(l), t.visibleSlidesIndexes.push(e), a.eq(e).addClass(s.slideVisibleClass)),
            (l.progress = i ? -d : d),
            (l.originalProgress = i ? -c : c);
    }
    t.visibleSlides = $(t.visibleSlides);
}
function updateProgress(e) {
    const t = this;
    if (void 0 === e) {
        const s = t.rtlTranslate ? -1 : 1;
        e = (t && t.translate && t.translate * s) || 0;
    }
    const s = t.params,
        a = t.maxTranslate() - t.minTranslate();
    let { progress: i, isBeginning: r, isEnd: n } = t;
    const l = r,
        o = n;
    0 === a ? ((i = 0), (r = !0), (n = !0)) : ((i = (e - t.minTranslate()) / a), (r = i <= 0), (n = i >= 1)),
        Object.assign(t, { progress: i, isBeginning: r, isEnd: n }),
        (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) && t.updateSlidesProgress(e),
        r && !l && t.emit("reachBeginning toEdge"),
        n && !o && t.emit("reachEnd toEdge"),
        ((l && !r) || (o && !n)) && t.emit("fromEdge"),
        t.emit("progress", i);
}
function updateSlidesClasses() {
    const e = this,
        { slides: t, params: s, $wrapperEl: a, activeIndex: i, realIndex: r } = e,
        n = e.virtual && s.virtual.enabled;
    let l;
    t.removeClass(
        `${s.slideActiveClass} ${s.slideNextClass} ${s.slidePrevClass} ${s.slideDuplicateActiveClass} ${s.slideDuplicateNextClass} ${s.slideDuplicatePrevClass}`
    ),
        (l = n ? e.$wrapperEl.find(`.${s.slideClass}[data-swiper-slide-index="${i}"]`) : t.eq(i)),
        l.addClass(s.slideActiveClass),
        s.loop &&
            (l.hasClass(s.slideDuplicateClass)
                ? a
                      .children(`.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${r}"]`)
                      .addClass(s.slideDuplicateActiveClass)
                : a
                      .children(`.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${r}"]`)
                      .addClass(s.slideDuplicateActiveClass));
    let o = l.nextAll(`.${s.slideClass}`).eq(0).addClass(s.slideNextClass);
    s.loop && 0 === o.length && ((o = t.eq(0)), o.addClass(s.slideNextClass));
    let d = l.prevAll(`.${s.slideClass}`).eq(0).addClass(s.slidePrevClass);
    s.loop && 0 === d.length && ((d = t.eq(-1)), d.addClass(s.slidePrevClass)),
        s.loop &&
            (o.hasClass(s.slideDuplicateClass)
                ? a
                      .children(
                          `.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${o.attr(
                              "data-swiper-slide-index"
                          )}"]`
                      )
                      .addClass(s.slideDuplicateNextClass)
                : a
                      .children(
                          `.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${o.attr(
                              "data-swiper-slide-index"
                          )}"]`
                      )
                      .addClass(s.slideDuplicateNextClass),
            d.hasClass(s.slideDuplicateClass)
                ? a
                      .children(
                          `.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${d.attr(
                              "data-swiper-slide-index"
                          )}"]`
                      )
                      .addClass(s.slideDuplicatePrevClass)
                : a
                      .children(
                          `.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${d.attr(
                              "data-swiper-slide-index"
                          )}"]`
                      )
                      .addClass(s.slideDuplicatePrevClass)),
        e.emitSlidesClasses();
}
function updateActiveIndex(e) {
    const t = this,
        s = t.rtlTranslate ? t.translate : -t.translate,
        { slidesGrid: a, snapGrid: i, params: r, activeIndex: n, realIndex: l, snapIndex: o } = t;
    let d,
        c = e;
    if (void 0 === c) {
        for (let e = 0; e < a.length; e += 1)
            void 0 !== a[e + 1]
                ? s >= a[e] && s < a[e + 1] - (a[e + 1] - a[e]) / 2
                    ? (c = e)
                    : s >= a[e] && s < a[e + 1] && (c = e + 1)
                : s >= a[e] && (c = e);
        r.normalizeSlideIndex && (c < 0 || void 0 === c) && (c = 0);
    }
    if (i.indexOf(s) >= 0) d = i.indexOf(s);
    else {
        const e = Math.min(r.slidesPerGroupSkip, c);
        d = e + Math.floor((c - e) / r.slidesPerGroup);
    }
    if ((d >= i.length && (d = i.length - 1), c === n))
        return void (d !== o && ((t.snapIndex = d), t.emit("snapIndexChange")));
    const p = parseInt(t.slides.eq(c).attr("data-swiper-slide-index") || c, 10);
    Object.assign(t, { snapIndex: d, realIndex: p, previousIndex: n, activeIndex: c }),
        t.emit("activeIndexChange"),
        t.emit("snapIndexChange"),
        l !== p && t.emit("realIndexChange"),
        (t.initialized || t.params.runCallbacksOnInit) && t.emit("slideChange");
}
function updateClickedSlide(e) {
    const t = this,
        s = t.params,
        a = $(e).closest(`.${s.slideClass}`)[0];
    let i,
        r = !1;
    if (a)
        for (let e = 0; e < t.slides.length; e += 1)
            if (t.slides[e] === a) {
                (r = !0), (i = e);
                break;
            }
    if (!a || !r) return (t.clickedSlide = void 0), void (t.clickedIndex = void 0);
    (t.clickedSlide = a),
        t.virtual && t.params.virtual.enabled
            ? (t.clickedIndex = parseInt($(a).attr("data-swiper-slide-index"), 10))
            : (t.clickedIndex = i),
        s.slideToClickedSlide &&
            void 0 !== t.clickedIndex &&
            t.clickedIndex !== t.activeIndex &&
            t.slideToClickedSlide();
}
var update = {
    updateSize: updateSize,
    updateSlides: updateSlides,
    updateAutoHeight: updateAutoHeight,
    updateSlidesOffset: updateSlidesOffset,
    updateSlidesProgress: updateSlidesProgress,
    updateProgress: updateProgress,
    updateSlidesClasses: updateSlidesClasses,
    updateActiveIndex: updateActiveIndex,
    updateClickedSlide: updateClickedSlide,
};
function getSwiperTranslate(e = this.isHorizontal() ? "x" : "y") {
    const { params: t, rtlTranslate: s, translate: a, $wrapperEl: i } = this;
    if (t.virtualTranslate) return s ? -a : a;
    if (t.cssMode) return a;
    let r = getTranslate(i[0], e);
    return s && (r = -r), r || 0;
}
function setTranslate(e, t) {
    const s = this,
        { rtlTranslate: a, params: i, $wrapperEl: r, wrapperEl: n, progress: l } = s;
    let o = 0,
        d = 0;
    let c;
    s.isHorizontal() ? (o = a ? -e : e) : (d = e),
        i.roundLengths && ((o = Math.floor(o)), (d = Math.floor(d))),
        i.cssMode
            ? (n[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal() ? -o : -d)
            : i.virtualTranslate || r.transform(`translate3d(${o}px, ${d}px, 0px)`),
        (s.previousTranslate = s.translate),
        (s.translate = s.isHorizontal() ? o : d);
    const p = s.maxTranslate() - s.minTranslate();
    (c = 0 === p ? 0 : (e - s.minTranslate()) / p),
        c !== l && s.updateProgress(e),
        s.emit("setTranslate", s.translate, t);
}
function minTranslate() {
    return -this.snapGrid[0];
}
function maxTranslate() {
    return -this.snapGrid[this.snapGrid.length - 1];
}
function translateTo(e = 0, t = this.params.speed, s = !0, a = !0, i) {
    const r = this,
        { params: n, wrapperEl: l } = r;
    if (r.animating && n.preventInteractionOnTransition) return !1;
    const o = r.minTranslate(),
        d = r.maxTranslate();
    let c;
    if (((c = a && e > o ? o : a && e < d ? d : e), r.updateProgress(c), n.cssMode)) {
        const e = r.isHorizontal();
        if (0 === t) l[e ? "scrollLeft" : "scrollTop"] = -c;
        else {
            if (!r.support.smoothScroll)
                return animateCSSModeScroll({ swiper: r, targetPosition: -c, side: e ? "left" : "top" }), !0;
            l.scrollTo({ [e ? "left" : "top"]: -c, behavior: "smooth" });
        }
        return !0;
    }
    return (
        0 === t
            ? (r.setTransition(0),
              r.setTranslate(c),
              s && (r.emit("beforeTransitionStart", t, i), r.emit("transitionEnd")))
            : (r.setTransition(t),
              r.setTranslate(c),
              s && (r.emit("beforeTransitionStart", t, i), r.emit("transitionStart")),
              r.animating ||
                  ((r.animating = !0),
                  r.onTranslateToWrapperTransitionEnd ||
                      (r.onTranslateToWrapperTransitionEnd = function (e) {
                          r &&
                              !r.destroyed &&
                              e.target === this &&
                              (r.$wrapperEl[0].removeEventListener(
                                  "transitionend",
                                  r.onTranslateToWrapperTransitionEnd
                              ),
                              r.$wrapperEl[0].removeEventListener(
                                  "webkitTransitionEnd",
                                  r.onTranslateToWrapperTransitionEnd
                              ),
                              (r.onTranslateToWrapperTransitionEnd = null),
                              delete r.onTranslateToWrapperTransitionEnd,
                              s && r.emit("transitionEnd"));
                      }),
                  r.$wrapperEl[0].addEventListener("transitionend", r.onTranslateToWrapperTransitionEnd),
                  r.$wrapperEl[0].addEventListener("webkitTransitionEnd", r.onTranslateToWrapperTransitionEnd))),
        !0
    );
}
var translate = {
    getTranslate: getSwiperTranslate,
    setTranslate: setTranslate,
    minTranslate: minTranslate,
    maxTranslate: maxTranslate,
    translateTo: translateTo,
};
function setTransition(e, t) {
    const s = this;
    s.params.cssMode || s.$wrapperEl.transition(e), s.emit("setTransition", e, t);
}
function transitionEmit({ swiper: e, runCallbacks: t, direction: s, step: a }) {
    const { activeIndex: i, previousIndex: r } = e;
    let n = s;
    if ((n || (n = i > r ? "next" : i < r ? "prev" : "reset"), e.emit(`transition${a}`), t && i !== r)) {
        if ("reset" === n) return void e.emit(`slideResetTransition${a}`);
        e.emit(`slideChangeTransition${a}`),
            "next" === n ? e.emit(`slideNextTransition${a}`) : e.emit(`slidePrevTransition${a}`);
    }
}
function transitionStart(e = !0, t) {
    const s = this,
        { params: a } = s;
    a.cssMode ||
        (a.autoHeight && s.updateAutoHeight(),
        transitionEmit({ swiper: s, runCallbacks: e, direction: t, step: "Start" }));
}
function transitionEnd(e = !0, t) {
    const s = this,
        { params: a } = s;
    (s.animating = !1),
        a.cssMode || (s.setTransition(0), transitionEmit({ swiper: s, runCallbacks: e, direction: t, step: "End" }));
}
var transition = { setTransition: setTransition, transitionStart: transitionStart, transitionEnd: transitionEnd };
function slideTo(e = 0, t = this.params.speed, s = !0, a, i) {
    if ("number" != typeof e && "string" != typeof e)
        throw new Error(`The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`);
    if ("string" == typeof e) {
        const t = parseInt(e, 10);
        if (!isFinite(t))
            throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`);
        e = t;
    }
    const r = this;
    let n = e;
    n < 0 && (n = 0);
    const {
        params: l,
        snapGrid: o,
        slidesGrid: d,
        previousIndex: c,
        activeIndex: p,
        rtlTranslate: u,
        wrapperEl: h,
        enabled: m,
    } = r;
    if ((r.animating && l.preventInteractionOnTransition) || (!m && !a && !i)) return !1;
    const f = Math.min(r.params.slidesPerGroupSkip, n);
    let g = f + Math.floor((n - f) / r.params.slidesPerGroup);
    g >= o.length && (g = o.length - 1),
        (p || l.initialSlide || 0) === (c || 0) && s && r.emit("beforeSlideChangeStart");
    const v = -o[g];
    if ((r.updateProgress(v), l.normalizeSlideIndex))
        for (let e = 0; e < d.length; e += 1) {
            const t = -Math.floor(100 * v),
                s = Math.floor(100 * d[e]),
                a = Math.floor(100 * d[e + 1]);
            void 0 !== d[e + 1]
                ? t >= s && t < a - (a - s) / 2
                    ? (n = e)
                    : t >= s && t < a && (n = e + 1)
                : t >= s && (n = e);
        }
    if (r.initialized && n !== p) {
        if (!r.allowSlideNext && v < r.translate && v < r.minTranslate()) return !1;
        if (!r.allowSlidePrev && v > r.translate && v > r.maxTranslate() && (p || 0) !== n) return !1;
    }
    let w;
    if (((w = n > p ? "next" : n < p ? "prev" : "reset"), (u && -v === r.translate) || (!u && v === r.translate)))
        return (
            r.updateActiveIndex(n),
            l.autoHeight && r.updateAutoHeight(),
            r.updateSlidesClasses(),
            "slide" !== l.effect && r.setTranslate(v),
            "reset" !== w && (r.transitionStart(s, w), r.transitionEnd(s, w)),
            !1
        );
    if (l.cssMode) {
        const e = r.isHorizontal(),
            s = u ? v : -v;
        if (0 === t) {
            const t = r.virtual && r.params.virtual.enabled;
            t && ((r.wrapperEl.style.scrollSnapType = "none"), (r._immediateVirtual = !0)),
                (h[e ? "scrollLeft" : "scrollTop"] = s),
                t &&
                    requestAnimationFrame(() => {
                        (r.wrapperEl.style.scrollSnapType = ""), (r._swiperImmediateVirtual = !1);
                    });
        } else {
            if (!r.support.smoothScroll)
                return animateCSSModeScroll({ swiper: r, targetPosition: s, side: e ? "left" : "top" }), !0;
            h.scrollTo({ [e ? "left" : "top"]: s, behavior: "smooth" });
        }
        return !0;
    }
    return (
        r.setTransition(t),
        r.setTranslate(v),
        r.updateActiveIndex(n),
        r.updateSlidesClasses(),
        r.emit("beforeTransitionStart", t, a),
        r.transitionStart(s, w),
        0 === t
            ? r.transitionEnd(s, w)
            : r.animating ||
              ((r.animating = !0),
              r.onSlideToWrapperTransitionEnd ||
                  (r.onSlideToWrapperTransitionEnd = function (e) {
                      r &&
                          !r.destroyed &&
                          e.target === this &&
                          (r.$wrapperEl[0].removeEventListener("transitionend", r.onSlideToWrapperTransitionEnd),
                          r.$wrapperEl[0].removeEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd),
                          (r.onSlideToWrapperTransitionEnd = null),
                          delete r.onSlideToWrapperTransitionEnd,
                          r.transitionEnd(s, w));
                  }),
              r.$wrapperEl[0].addEventListener("transitionend", r.onSlideToWrapperTransitionEnd),
              r.$wrapperEl[0].addEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd)),
        !0
    );
}
function slideToLoop(e = 0, t = this.params.speed, s = !0, a) {
    const i = this;
    let r = e;
    return i.params.loop && (r += i.loopedSlides), i.slideTo(r, t, s, a);
}
function slideNext(e = this.params.speed, t = !0, s) {
    const a = this,
        { animating: i, enabled: r, params: n } = a;
    if (!r) return a;
    let l = n.slidesPerGroup;
    "auto" === n.slidesPerView &&
        1 === n.slidesPerGroup &&
        n.slidesPerGroupAuto &&
        (l = Math.max(a.slidesPerViewDynamic("current", !0), 1));
    const o = a.activeIndex < n.slidesPerGroupSkip ? 1 : l;
    if (n.loop) {
        if (i && n.loopPreventsSlide) return !1;
        a.loopFix(), (a._clientLeft = a.$wrapperEl[0].clientLeft);
    }
    return a.slideTo(a.activeIndex + o, e, t, s);
}
function slidePrev(e = this.params.speed, t = !0, s) {
    const a = this,
        { params: i, animating: r, snapGrid: n, slidesGrid: l, rtlTranslate: o, enabled: d } = a;
    if (!d) return a;
    if (i.loop) {
        if (r && i.loopPreventsSlide) return !1;
        a.loopFix(), (a._clientLeft = a.$wrapperEl[0].clientLeft);
    }
    function c(e) {
        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
    }
    const p = c(o ? a.translate : -a.translate),
        u = n.map((e) => c(e));
    let h = n[u.indexOf(p) - 1];
    if (void 0 === h && i.cssMode) {
        let e;
        n.forEach((t, s) => {
            p >= t && (e = s);
        }),
            void 0 !== e && (h = n[e > 0 ? e - 1 : e]);
    }
    let m = 0;
    return (
        void 0 !== h &&
            ((m = l.indexOf(h)),
            m < 0 && (m = a.activeIndex - 1),
            "auto" === i.slidesPerView &&
                1 === i.slidesPerGroup &&
                i.slidesPerGroupAuto &&
                ((m = m - a.slidesPerViewDynamic("previous", !0) + 1), (m = Math.max(m, 0)))),
        a.slideTo(m, e, t, s)
    );
}
function slideReset(e = this.params.speed, t = !0, s) {
    return this.slideTo(this.activeIndex, e, t, s);
}
function slideToClosest(e = this.params.speed, t = !0, s, a = 0.5) {
    const i = this;
    let r = i.activeIndex;
    const n = Math.min(i.params.slidesPerGroupSkip, r),
        l = n + Math.floor((r - n) / i.params.slidesPerGroup),
        o = i.rtlTranslate ? i.translate : -i.translate;
    if (o >= i.snapGrid[l]) {
        const e = i.snapGrid[l];
        o - e > (i.snapGrid[l + 1] - e) * a && (r += i.params.slidesPerGroup);
    } else {
        const e = i.snapGrid[l - 1];
        o - e <= (i.snapGrid[l] - e) * a && (r -= i.params.slidesPerGroup);
    }
    return (r = Math.max(r, 0)), (r = Math.min(r, i.slidesGrid.length - 1)), i.slideTo(r, e, t, s);
}
function slideToClickedSlide() {
    const e = this,
        { params: t, $wrapperEl: s } = e,
        a = "auto" === t.slidesPerView ? e.slidesPerViewDynamic() : t.slidesPerView;
    let i,
        r = e.clickedIndex;
    if (t.loop) {
        if (e.animating) return;
        (i = parseInt($(e.clickedSlide).attr("data-swiper-slide-index"), 10)),
            t.centeredSlides
                ? r < e.loopedSlides - a / 2 || r > e.slides.length - e.loopedSlides + a / 2
                    ? (e.loopFix(),
                      (r = s
                          .children(`.${t.slideClass}[data-swiper-slide-index="${i}"]:not(.${t.slideDuplicateClass})`)
                          .eq(0)
                          .index()),
                      nextTick(() => {
                          e.slideTo(r);
                      }))
                    : e.slideTo(r)
                : r > e.slides.length - a
                ? (e.loopFix(),
                  (r = s
                      .children(`.${t.slideClass}[data-swiper-slide-index="${i}"]:not(.${t.slideDuplicateClass})`)
                      .eq(0)
                      .index()),
                  nextTick(() => {
                      e.slideTo(r);
                  }))
                : e.slideTo(r);
    } else e.slideTo(r);
}
var slide = {
    slideTo: slideTo,
    slideToLoop: slideToLoop,
    slideNext: slideNext,
    slidePrev: slidePrev,
    slideReset: slideReset,
    slideToClosest: slideToClosest,
    slideToClickedSlide: slideToClickedSlide,
};
function loopCreate() {
    const e = this,
        t = getDocument(),
        { params: s, $wrapperEl: a } = e,
        i = a.children().length > 0 ? $(a.children()[0].parentNode) : a;
    i.children(`.${s.slideClass}.${s.slideDuplicateClass}`).remove();
    let r = i.children(`.${s.slideClass}`);
    if (s.loopFillGroupWithBlank) {
        const e = s.slidesPerGroup - (r.length % s.slidesPerGroup);
        if (e !== s.slidesPerGroup) {
            for (let a = 0; a < e; a += 1) {
                const e = $(t.createElement("div")).addClass(`${s.slideClass} ${s.slideBlankClass}`);
                i.append(e);
            }
            r = i.children(`.${s.slideClass}`);
        }
    }
    "auto" !== s.slidesPerView || s.loopedSlides || (s.loopedSlides = r.length),
        (e.loopedSlides = Math.ceil(parseFloat(s.loopedSlides || s.slidesPerView, 10))),
        (e.loopedSlides += s.loopAdditionalSlides),
        e.loopedSlides > r.length && (e.loopedSlides = r.length);
    const n = [],
        l = [];
    r.each((t, s) => {
        const a = $(t);
        s < e.loopedSlides && l.push(t),
            s < r.length && s >= r.length - e.loopedSlides && n.push(t),
            a.attr("data-swiper-slide-index", s);
    });
    for (let e = 0; e < l.length; e += 1) i.append($(l[e].cloneNode(!0)).addClass(s.slideDuplicateClass));
    for (let e = n.length - 1; e >= 0; e -= 1) i.prepend($(n[e].cloneNode(!0)).addClass(s.slideDuplicateClass));
}
function loopFix() {
    const e = this;
    e.emit("beforeLoopFix");
    const {
        activeIndex: t,
        slides: s,
        loopedSlides: a,
        allowSlidePrev: i,
        allowSlideNext: r,
        snapGrid: n,
        rtlTranslate: l,
    } = e;
    let o;
    (e.allowSlidePrev = !0), (e.allowSlideNext = !0);
    const d = -n[t] - e.getTranslate();
    if (t < a) {
        (o = s.length - 3 * a + t), (o += a);
        e.slideTo(o, 0, !1, !0) && 0 !== d && e.setTranslate((l ? -e.translate : e.translate) - d);
    } else if (t >= s.length - a) {
        (o = -s.length + t + a), (o += a);
        e.slideTo(o, 0, !1, !0) && 0 !== d && e.setTranslate((l ? -e.translate : e.translate) - d);
    }
    (e.allowSlidePrev = i), (e.allowSlideNext = r), e.emit("loopFix");
}
function loopDestroy() {
    const { $wrapperEl: e, params: t, slides: s } = this;
    e.children(`.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`).remove(),
        s.removeAttr("data-swiper-slide-index");
}
var loop = { loopCreate: loopCreate, loopFix: loopFix, loopDestroy: loopDestroy };
function setGrabCursor(e) {
    const t = this;
    if (t.support.touch || !t.params.simulateTouch || (t.params.watchOverflow && t.isLocked) || t.params.cssMode)
        return;
    const s = "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
    (s.style.cursor = "move"),
        (s.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab"),
        (s.style.cursor = e ? "-moz-grabbin" : "-moz-grab"),
        (s.style.cursor = e ? "grabbing" : "grab");
}
function unsetGrabCursor() {
    const e = this;
    e.support.touch ||
        (e.params.watchOverflow && e.isLocked) ||
        e.params.cssMode ||
        (e["container" === e.params.touchEventsTarget ? "el" : "wrapperEl"].style.cursor = "");
}
var grabCursor = { setGrabCursor: setGrabCursor, unsetGrabCursor: unsetGrabCursor };
function closestElement(e, t = this) {
    return (function t(s) {
        return s && s !== getDocument() && s !== getWindow()
            ? (s.assignedSlot && (s = s.assignedSlot), s.closest(e) || t(s.getRootNode().host))
            : null;
    })(t);
}
function onTouchStart(e) {
    const t = this,
        s = getDocument(),
        a = getWindow(),
        i = t.touchEventsData,
        { params: r, touches: n, enabled: l } = t;
    if (!l) return;
    if (t.animating && r.preventInteractionOnTransition) return;
    !t.animating && r.cssMode && r.loop && t.loopFix();
    let o = e;
    o.originalEvent && (o = o.originalEvent);
    let d = $(o.target);
    if ("wrapper" === r.touchEventsTarget && !d.closest(t.wrapperEl).length) return;
    if (((i.isTouchEvent = "touchstart" === o.type), !i.isTouchEvent && "which" in o && 3 === o.which)) return;
    if (!i.isTouchEvent && "button" in o && o.button > 0) return;
    if (i.isTouched && i.isMoved) return;
    !!r.noSwipingClass &&
        "" !== r.noSwipingClass &&
        o.target &&
        o.target.shadowRoot &&
        e.path &&
        e.path[0] &&
        (d = $(e.path[0]));
    const c = r.noSwipingSelector ? r.noSwipingSelector : `.${r.noSwipingClass}`,
        p = !(!o.target || !o.target.shadowRoot);
    if (r.noSwiping && (p ? closestElement(c, o.target) : d.closest(c)[0])) return void (t.allowClick = !0);
    if (r.swipeHandler && !d.closest(r.swipeHandler)[0]) return;
    (n.currentX = "touchstart" === o.type ? o.targetTouches[0].pageX : o.pageX),
        (n.currentY = "touchstart" === o.type ? o.targetTouches[0].pageY : o.pageY);
    const u = n.currentX,
        h = n.currentY,
        m = r.edgeSwipeDetection || r.iOSEdgeSwipeDetection,
        f = r.edgeSwipeThreshold || r.iOSEdgeSwipeThreshold;
    if (m && (u <= f || u >= a.innerWidth - f)) {
        if ("prevent" !== m) return;
        e.preventDefault();
    }
    if (
        (Object.assign(i, {
            isTouched: !0,
            isMoved: !1,
            allowTouchCallbacks: !0,
            isScrolling: void 0,
            startMoving: void 0,
        }),
        (n.startX = u),
        (n.startY = h),
        (i.touchStartTime = now()),
        (t.allowClick = !0),
        t.updateSize(),
        (t.swipeDirection = void 0),
        r.threshold > 0 && (i.allowThresholdMove = !1),
        "touchstart" !== o.type)
    ) {
        let e = !0;
        d.is(i.focusableElements) && (e = !1),
            s.activeElement &&
                $(s.activeElement).is(i.focusableElements) &&
                s.activeElement !== d[0] &&
                s.activeElement.blur();
        const a = e && t.allowTouchMove && r.touchStartPreventDefault;
        (!r.touchStartForcePreventDefault && !a) || d[0].isContentEditable || o.preventDefault();
    }
    t.emit("touchStart", o);
}
function onTouchMove(e) {
    const t = getDocument(),
        s = this,
        a = s.touchEventsData,
        { params: i, touches: r, rtlTranslate: n, enabled: l } = s;
    if (!l) return;
    let o = e;
    if ((o.originalEvent && (o = o.originalEvent), !a.isTouched))
        return void (a.startMoving && a.isScrolling && s.emit("touchMoveOpposite", o));
    if (a.isTouchEvent && "touchmove" !== o.type) return;
    const d = "touchmove" === o.type && o.targetTouches && (o.targetTouches[0] || o.changedTouches[0]),
        c = "touchmove" === o.type ? d.pageX : o.pageX,
        p = "touchmove" === o.type ? d.pageY : o.pageY;
    if (o.preventedByNestedSwiper) return (r.startX = c), void (r.startY = p);
    if (!s.allowTouchMove)
        return (
            (s.allowClick = !1),
            void (
                a.isTouched &&
                (Object.assign(r, { startX: c, startY: p, currentX: c, currentY: p }), (a.touchStartTime = now()))
            )
        );
    if (a.isTouchEvent && i.touchReleaseOnEdges && !i.loop)
        if (s.isVertical()) {
            if ((p < r.startY && s.translate <= s.maxTranslate()) || (p > r.startY && s.translate >= s.minTranslate()))
                return (a.isTouched = !1), void (a.isMoved = !1);
        } else if (
            (c < r.startX && s.translate <= s.maxTranslate()) ||
            (c > r.startX && s.translate >= s.minTranslate())
        )
            return;
    if (a.isTouchEvent && t.activeElement && o.target === t.activeElement && $(o.target).is(a.focusableElements))
        return (a.isMoved = !0), void (s.allowClick = !1);
    if ((a.allowTouchCallbacks && s.emit("touchMove", o), o.targetTouches && o.targetTouches.length > 1)) return;
    (r.currentX = c), (r.currentY = p);
    const u = r.currentX - r.startX,
        h = r.currentY - r.startY;
    if (s.params.threshold && Math.sqrt(u ** 2 + h ** 2) < s.params.threshold) return;
    if (void 0 === a.isScrolling) {
        let e;
        (s.isHorizontal() && r.currentY === r.startY) || (s.isVertical() && r.currentX === r.startX)
            ? (a.isScrolling = !1)
            : u * u + h * h >= 25 &&
              ((e = (180 * Math.atan2(Math.abs(h), Math.abs(u))) / Math.PI),
              (a.isScrolling = s.isHorizontal() ? e > i.touchAngle : 90 - e > i.touchAngle));
    }
    if (
        (a.isScrolling && s.emit("touchMoveOpposite", o),
        void 0 === a.startMoving && ((r.currentX === r.startX && r.currentY === r.startY) || (a.startMoving = !0)),
        a.isScrolling)
    )
        return void (a.isTouched = !1);
    if (!a.startMoving) return;
    (s.allowClick = !1),
        !i.cssMode && o.cancelable && o.preventDefault(),
        i.touchMoveStopPropagation && !i.nested && o.stopPropagation(),
        a.isMoved ||
            (i.loop && !i.cssMode && s.loopFix(),
            (a.startTranslate = s.getTranslate()),
            s.setTransition(0),
            s.animating && s.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
            (a.allowMomentumBounce = !1),
            !i.grabCursor || (!0 !== s.allowSlideNext && !0 !== s.allowSlidePrev) || s.setGrabCursor(!0),
            s.emit("sliderFirstMove", o)),
        s.emit("sliderMove", o),
        (a.isMoved = !0);
    let m = s.isHorizontal() ? u : h;
    (r.diff = m),
        (m *= i.touchRatio),
        n && (m = -m),
        (s.swipeDirection = m > 0 ? "prev" : "next"),
        (a.currentTranslate = m + a.startTranslate);
    let f = !0,
        g = i.resistanceRatio;
    if (
        (i.touchReleaseOnEdges && (g = 0),
        m > 0 && a.currentTranslate > s.minTranslate()
            ? ((f = !1),
              i.resistance &&
                  (a.currentTranslate = s.minTranslate() - 1 + (-s.minTranslate() + a.startTranslate + m) ** g))
            : m < 0 &&
              a.currentTranslate < s.maxTranslate() &&
              ((f = !1),
              i.resistance &&
                  (a.currentTranslate = s.maxTranslate() + 1 - (s.maxTranslate() - a.startTranslate - m) ** g)),
        f && (o.preventedByNestedSwiper = !0),
        !s.allowSlideNext &&
            "next" === s.swipeDirection &&
            a.currentTranslate < a.startTranslate &&
            (a.currentTranslate = a.startTranslate),
        !s.allowSlidePrev &&
            "prev" === s.swipeDirection &&
            a.currentTranslate > a.startTranslate &&
            (a.currentTranslate = a.startTranslate),
        s.allowSlidePrev || s.allowSlideNext || (a.currentTranslate = a.startTranslate),
        i.threshold > 0)
    ) {
        if (!(Math.abs(m) > i.threshold || a.allowThresholdMove)) return void (a.currentTranslate = a.startTranslate);
        if (!a.allowThresholdMove)
            return (
                (a.allowThresholdMove = !0),
                (r.startX = r.currentX),
                (r.startY = r.currentY),
                (a.currentTranslate = a.startTranslate),
                void (r.diff = s.isHorizontal() ? r.currentX - r.startX : r.currentY - r.startY)
            );
    }
    i.followFinger &&
        !i.cssMode &&
        (((i.freeMode && i.freeMode.enabled && s.freeMode) || i.watchSlidesProgress) &&
            (s.updateActiveIndex(), s.updateSlidesClasses()),
        s.params.freeMode && i.freeMode.enabled && s.freeMode && s.freeMode.onTouchMove(),
        s.updateProgress(a.currentTranslate),
        s.setTranslate(a.currentTranslate));
}
function onTouchEnd(e) {
    const t = this,
        s = t.touchEventsData,
        { params: a, touches: i, rtlTranslate: r, slidesGrid: n, enabled: l } = t;
    if (!l) return;
    let o = e;
    if (
        (o.originalEvent && (o = o.originalEvent),
        s.allowTouchCallbacks && t.emit("touchEnd", o),
        (s.allowTouchCallbacks = !1),
        !s.isTouched)
    )
        return s.isMoved && a.grabCursor && t.setGrabCursor(!1), (s.isMoved = !1), void (s.startMoving = !1);
    a.grabCursor &&
        s.isMoved &&
        s.isTouched &&
        (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
        t.setGrabCursor(!1);
    const d = now(),
        c = d - s.touchStartTime;
    if (t.allowClick) {
        const e = o.path || (o.composedPath && o.composedPath());
        t.updateClickedSlide((e && e[0]) || o.target),
            t.emit("tap click", o),
            c < 300 && d - s.lastClickTime < 300 && t.emit("doubleTap doubleClick", o);
    }
    if (
        ((s.lastClickTime = now()),
        nextTick(() => {
            t.destroyed || (t.allowClick = !0);
        }),
        !s.isTouched || !s.isMoved || !t.swipeDirection || 0 === i.diff || s.currentTranslate === s.startTranslate)
    )
        return (s.isTouched = !1), (s.isMoved = !1), void (s.startMoving = !1);
    let p;
    if (
        ((s.isTouched = !1),
        (s.isMoved = !1),
        (s.startMoving = !1),
        (p = a.followFinger ? (r ? t.translate : -t.translate) : -s.currentTranslate),
        a.cssMode)
    )
        return;
    if (t.params.freeMode && a.freeMode.enabled) return void t.freeMode.onTouchEnd({ currentPos: p });
    let u = 0,
        h = t.slidesSizesGrid[0];
    for (let e = 0; e < n.length; e += e < a.slidesPerGroupSkip ? 1 : a.slidesPerGroup) {
        const t = e < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
        void 0 !== n[e + t]
            ? p >= n[e] && p < n[e + t] && ((u = e), (h = n[e + t] - n[e]))
            : p >= n[e] && ((u = e), (h = n[n.length - 1] - n[n.length - 2]));
    }
    const m = (p - n[u]) / h,
        f = u < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
    if (c > a.longSwipesMs) {
        if (!a.longSwipes) return void t.slideTo(t.activeIndex);
        "next" === t.swipeDirection && (m >= a.longSwipesRatio ? t.slideTo(u + f) : t.slideTo(u)),
            "prev" === t.swipeDirection && (m > 1 - a.longSwipesRatio ? t.slideTo(u + f) : t.slideTo(u));
    } else {
        if (!a.shortSwipes) return void t.slideTo(t.activeIndex);
        t.navigation && (o.target === t.navigation.nextEl || o.target === t.navigation.prevEl)
            ? o.target === t.navigation.nextEl
                ? t.slideTo(u + f)
                : t.slideTo(u)
            : ("next" === t.swipeDirection && t.slideTo(u + f), "prev" === t.swipeDirection && t.slideTo(u));
    }
}
function onResize() {
    const e = this,
        { params: t, el: s } = e;
    if (s && 0 === s.offsetWidth) return;
    t.breakpoints && e.setBreakpoint();
    const { allowSlideNext: a, allowSlidePrev: i, snapGrid: r } = e;
    (e.allowSlideNext = !0),
        (e.allowSlidePrev = !0),
        e.updateSize(),
        e.updateSlides(),
        e.updateSlidesClasses(),
        ("auto" === t.slidesPerView || t.slidesPerView > 1) && e.isEnd && !e.isBeginning && !e.params.centeredSlides
            ? e.slideTo(e.slides.length - 1, 0, !1, !0)
            : e.slideTo(e.activeIndex, 0, !1, !0),
        e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.run(),
        (e.allowSlidePrev = i),
        (e.allowSlideNext = a),
        e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow();
}
function onClick(e) {
    const t = this;
    t.enabled &&
        (t.allowClick ||
            (t.params.preventClicks && e.preventDefault(),
            t.params.preventClicksPropagation && t.animating && (e.stopPropagation(), e.stopImmediatePropagation())));
}
function onScroll() {
    const e = this,
        { wrapperEl: t, rtlTranslate: s, enabled: a } = e;
    if (!a) return;
    let i;
    (e.previousTranslate = e.translate),
        e.isHorizontal() ? (e.translate = -t.scrollLeft) : (e.translate = -t.scrollTop),
        -0 === e.translate && (e.translate = 0),
        e.updateActiveIndex(),
        e.updateSlidesClasses();
    const r = e.maxTranslate() - e.minTranslate();
    (i = 0 === r ? 0 : (e.translate - e.minTranslate()) / r),
        i !== e.progress && e.updateProgress(s ? -e.translate : e.translate),
        e.emit("setTranslate", e.translate, !1);
}
let dummyEventAttached = !1;
function dummyEventListener() {}
const events = (e, t) => {
    const s = getDocument(),
        { params: a, touchEvents: i, el: r, wrapperEl: n, device: l, support: o } = e,
        d = !!a.nested,
        c = "on" === t ? "addEventListener" : "removeEventListener",
        p = t;
    if (o.touch) {
        const t = !("touchstart" !== i.start || !o.passiveListener || !a.passiveListeners) && {
            passive: !0,
            capture: !1,
        };
        r[c](i.start, e.onTouchStart, t),
            r[c](i.move, e.onTouchMove, o.passiveListener ? { passive: !1, capture: d } : d),
            r[c](i.end, e.onTouchEnd, t),
            i.cancel && r[c](i.cancel, e.onTouchEnd, t);
    } else r[c](i.start, e.onTouchStart, !1), s[c](i.move, e.onTouchMove, d), s[c](i.end, e.onTouchEnd, !1);
    (a.preventClicks || a.preventClicksPropagation) && r[c]("click", e.onClick, !0),
        a.cssMode && n[c]("scroll", e.onScroll),
        a.updateOnWindowResize
            ? e[p](
                  l.ios || l.android ? "resize orientationchange observerUpdate" : "resize observerUpdate",
                  onResize,
                  !0
              )
            : e[p]("observerUpdate", onResize, !0);
};
function attachEvents() {
    const e = this,
        t = getDocument(),
        { params: s, support: a } = e;
    (e.onTouchStart = onTouchStart.bind(e)),
        (e.onTouchMove = onTouchMove.bind(e)),
        (e.onTouchEnd = onTouchEnd.bind(e)),
        s.cssMode && (e.onScroll = onScroll.bind(e)),
        (e.onClick = onClick.bind(e)),
        a.touch &&
            !dummyEventAttached &&
            (t.addEventListener("touchstart", dummyEventListener), (dummyEventAttached = !0)),
        events(e, "on");
}
function detachEvents() {
    events(this, "off");
}
var events$1 = { attachEvents: attachEvents, detachEvents: detachEvents };
const isGridEnabled = (e, t) => e.grid && t.grid && t.grid.rows > 1;
function setBreakpoint() {
    const e = this,
        { activeIndex: t, initialized: s, loopedSlides: a = 0, params: i, $el: r } = e,
        n = i.breakpoints;
    if (!n || (n && 0 === Object.keys(n).length)) return;
    const l = e.getBreakpoint(n, e.params.breakpointsBase, e.el);
    if (!l || e.currentBreakpoint === l) return;
    const o = (l in n ? n[l] : void 0) || e.originalParams,
        d = isGridEnabled(e, i),
        c = isGridEnabled(e, o),
        p = i.enabled;
    d && !c
        ? (r.removeClass(`${i.containerModifierClass}grid ${i.containerModifierClass}grid-column`),
          e.emitContainerClasses())
        : !d &&
          c &&
          (r.addClass(`${i.containerModifierClass}grid`),
          ((o.grid.fill && "column" === o.grid.fill) || (!o.grid.fill && "column" === i.grid.fill)) &&
              r.addClass(`${i.containerModifierClass}grid-column`),
          e.emitContainerClasses());
    const u = o.direction && o.direction !== i.direction,
        h = i.loop && (o.slidesPerView !== i.slidesPerView || u);
    u && s && e.changeDirection(), extend(e.params, o);
    const m = e.params.enabled;
    Object.assign(e, {
        allowTouchMove: e.params.allowTouchMove,
        allowSlideNext: e.params.allowSlideNext,
        allowSlidePrev: e.params.allowSlidePrev,
    }),
        p && !m ? e.disable() : !p && m && e.enable(),
        (e.currentBreakpoint = l),
        e.emit("_beforeBreakpoint", o),
        h && s && (e.loopDestroy(), e.loopCreate(), e.updateSlides(), e.slideTo(t - a + e.loopedSlides, 0, !1)),
        e.emit("breakpoint", o);
}
function getBreakpoint(e, t = "window", s) {
    if (!e || ("container" === t && !s)) return;
    let a = !1;
    const i = getWindow(),
        r = "window" === t ? i.innerHeight : s.clientHeight,
        n = Object.keys(e).map((e) => {
            if ("string" == typeof e && 0 === e.indexOf("@")) {
                const t = parseFloat(e.substr(1));
                return { value: r * t, point: e };
            }
            return { value: e, point: e };
        });
    n.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
    for (let e = 0; e < n.length; e += 1) {
        const { point: r, value: l } = n[e];
        "window" === t ? i.matchMedia(`(min-width: ${l}px)`).matches && (a = r) : l <= s.clientWidth && (a = r);
    }
    return a || "max";
}
var breakpoints = { setBreakpoint: setBreakpoint, getBreakpoint: getBreakpoint };
function prepareClasses(e, t) {
    const s = [];
    return (
        e.forEach((e) => {
            "object" == typeof e
                ? Object.keys(e).forEach((a) => {
                      e[a] && s.push(t + a);
                  })
                : "string" == typeof e && s.push(t + e);
        }),
        s
    );
}
function addClasses() {
    const e = this,
        { classNames: t, params: s, rtl: a, $el: i, device: r, support: n } = e,
        l = prepareClasses(
            [
                "initialized",
                s.direction,
                { "pointer-events": !n.touch },
                { "free-mode": e.params.freeMode && s.freeMode.enabled },
                { autoheight: s.autoHeight },
                { rtl: a },
                { grid: s.grid && s.grid.rows > 1 },
                { "grid-column": s.grid && s.grid.rows > 1 && "column" === s.grid.fill },
                { android: r.android },
                { ios: r.ios },
                { "css-mode": s.cssMode },
                { centered: s.cssMode && s.centeredSlides },
            ],
            s.containerModifierClass
        );
    t.push(...l), i.addClass([...t].join(" ")), e.emitContainerClasses();
}
function removeClasses() {
    const { $el: e, classNames: t } = this;
    e.removeClass(t.join(" ")), this.emitContainerClasses();
}
var classes = { addClasses: addClasses, removeClasses: removeClasses };
function loadImage(e, t, s, a, i, r) {
    const n = getWindow();
    let l;
    function o() {
        r && r();
    }
    $(e).parent("picture")[0] || (e.complete && i)
        ? o()
        : t
        ? ((l = new n.Image()),
          (l.onload = o),
          (l.onerror = o),
          a && (l.sizes = a),
          s && (l.srcset = s),
          t && (l.src = t))
        : o();
}
function preloadImages() {
    const e = this;
    function t() {
        null != e &&
            e &&
            !e.destroyed &&
            (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
            e.imagesLoaded === e.imagesToLoad.length &&
                (e.params.updateOnImagesReady && e.update(), e.emit("imagesReady")));
    }
    e.imagesToLoad = e.$el.find("img");
    for (let s = 0; s < e.imagesToLoad.length; s += 1) {
        const a = e.imagesToLoad[s];
        e.loadImage(
            a,
            a.currentSrc || a.getAttribute("src"),
            a.srcset || a.getAttribute("srcset"),
            a.sizes || a.getAttribute("sizes"),
            !0,
            t
        );
    }
}
var images = { loadImage: loadImage, preloadImages: preloadImages };
function checkOverflow() {
    const e = this,
        { isLocked: t, params: s } = e,
        { slidesOffsetBefore: a } = s;
    if (a) {
        const t = e.slides.length - 1,
            s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * a;
        e.isLocked = e.size > s;
    } else e.isLocked = 1 === e.snapGrid.length;
    !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked),
        !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
        t && t !== e.isLocked && (e.isEnd = !1),
        t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
}
var checkOverflow$1 = { checkOverflow: checkOverflow },
    defaults = {
        init: !0,
        direction: "horizontal",
        touchEventsTarget: "wrapper",
        initialSlide: 0,
        speed: 300,
        cssMode: !1,
        updateOnWindowResize: !0,
        resizeObserver: !0,
        nested: !1,
        createElements: !1,
        enabled: !0,
        focusableElements: "input, select, option, textarea, button, video, label",
        width: null,
        height: null,
        preventInteractionOnTransition: !1,
        userAgent: null,
        url: null,
        edgeSwipeDetection: !1,
        edgeSwipeThreshold: 20,
        autoHeight: !1,
        setWrapperSize: !1,
        virtualTranslate: !1,
        effect: "slide",
        breakpoints: void 0,
        breakpointsBase: "window",
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerGroup: 1,
        slidesPerGroupSkip: 0,
        slidesPerGroupAuto: !1,
        centeredSlides: !1,
        centeredSlidesBounds: !1,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        normalizeSlideIndex: !0,
        centerInsufficientSlides: !1,
        watchOverflow: !0,
        roundLengths: !1,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: !0,
        shortSwipes: !0,
        longSwipes: !0,
        longSwipesRatio: 0.5,
        longSwipesMs: 300,
        followFinger: !0,
        allowTouchMove: !0,
        threshold: 0,
        touchMoveStopPropagation: !1,
        touchStartPreventDefault: !0,
        touchStartForcePreventDefault: !1,
        touchReleaseOnEdges: !1,
        uniqueNavElements: !0,
        resistance: !0,
        resistanceRatio: 0.85,
        watchSlidesProgress: !1,
        grabCursor: !1,
        preventClicks: !0,
        preventClicksPropagation: !0,
        slideToClickedSlide: !1,
        preloadImages: !0,
        updateOnImagesReady: !0,
        loop: !1,
        loopAdditionalSlides: 0,
        loopedSlides: null,
        loopFillGroupWithBlank: !1,
        loopPreventsSlide: !0,
        allowSlidePrev: !0,
        allowSlideNext: !0,
        swipeHandler: null,
        noSwiping: !0,
        noSwipingClass: "swiper-no-swiping",
        noSwipingSelector: null,
        passiveListeners: !0,
        containerModifierClass: "swiper-",
        slideClass: "swiper-slide",
        slideBlankClass: "swiper-slide-invisible-blank",
        slideActiveClass: "swiper-slide-active",
        slideDuplicateActiveClass: "swiper-slide-duplicate-active",
        slideVisibleClass: "swiper-slide-visible",
        slideDuplicateClass: "swiper-slide-duplicate",
        slideNextClass: "swiper-slide-next",
        slideDuplicateNextClass: "swiper-slide-duplicate-next",
        slidePrevClass: "swiper-slide-prev",
        slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
        wrapperClass: "swiper-wrapper",
        runCallbacksOnInit: !0,
        _emitClasses: !1,
    };
function moduleExtendParams(e, t) {
    return function (s = {}) {
        const a = Object.keys(s)[0],
            i = s[a];
        "object" == typeof i && null !== i
            ? (["navigation", "pagination", "scrollbar"].indexOf(a) >= 0 && !0 === e[a] && (e[a] = { auto: !0 }),
              a in e && "enabled" in i
                  ? (!0 === e[a] && (e[a] = { enabled: !0 }),
                    "object" != typeof e[a] || "enabled" in e[a] || (e[a].enabled = !0),
                    e[a] || (e[a] = { enabled: !1 }),
                    extend(t, s))
                  : extend(t, s))
            : extend(t, s);
    };
}
const prototypes = {
        eventsEmitter: eventsEmitter,
        update: update,
        translate: translate,
        transition: transition,
        slide: slide,
        loop: loop,
        grabCursor: grabCursor,
        events: events$1,
        breakpoints: breakpoints,
        checkOverflow: checkOverflow$1,
        classes: classes,
        images: images,
    },
    extendedDefaults = {};
class Swiper {
    constructor(...e) {
        let t, s;
        if (
            (1 === e.length && e[0].constructor && "Object" === Object.prototype.toString.call(e[0]).slice(8, -1)
                ? (s = e[0])
                : ([t, s] = e),
            s || (s = {}),
            (s = extend({}, s)),
            t && !s.el && (s.el = t),
            s.el && $(s.el).length > 1)
        ) {
            const e = [];
            return (
                $(s.el).each((t) => {
                    const a = extend({}, s, { el: t });
                    e.push(new Swiper(a));
                }),
                e
            );
        }
        const a = this;
        (a.__swiper__ = !0),
            (a.support = getSupport()),
            (a.device = getDevice({ userAgent: s.userAgent })),
            (a.browser = getBrowser()),
            (a.eventsListeners = {}),
            (a.eventsAnyListeners = []),
            (a.modules = [...a.__modules__]),
            s.modules && Array.isArray(s.modules) && a.modules.push(...s.modules);
        const i = {};
        a.modules.forEach((e) => {
            e({
                swiper: a,
                extendParams: moduleExtendParams(s, i),
                on: a.on.bind(a),
                once: a.once.bind(a),
                off: a.off.bind(a),
                emit: a.emit.bind(a),
            });
        });
        const r = extend({}, defaults, i);
        return (
            (a.params = extend({}, r, extendedDefaults, s)),
            (a.originalParams = extend({}, a.params)),
            (a.passedParams = extend({}, s)),
            a.params &&
                a.params.on &&
                Object.keys(a.params.on).forEach((e) => {
                    a.on(e, a.params.on[e]);
                }),
            a.params && a.params.onAny && a.onAny(a.params.onAny),
            (a.$ = $),
            Object.assign(a, {
                enabled: a.params.enabled,
                el: t,
                classNames: [],
                slides: $(),
                slidesGrid: [],
                snapGrid: [],
                slidesSizesGrid: [],
                isHorizontal: () => "horizontal" === a.params.direction,
                isVertical: () => "vertical" === a.params.direction,
                activeIndex: 0,
                realIndex: 0,
                isBeginning: !0,
                isEnd: !1,
                translate: 0,
                previousTranslate: 0,
                progress: 0,
                velocity: 0,
                animating: !1,
                allowSlideNext: a.params.allowSlideNext,
                allowSlidePrev: a.params.allowSlidePrev,
                touchEvents: (function () {
                    const e = ["touchstart", "touchmove", "touchend", "touchcancel"],
                        t = ["pointerdown", "pointermove", "pointerup"];
                    return (
                        (a.touchEventsTouch = { start: e[0], move: e[1], end: e[2], cancel: e[3] }),
                        (a.touchEventsDesktop = { start: t[0], move: t[1], end: t[2] }),
                        a.support.touch || !a.params.simulateTouch ? a.touchEventsTouch : a.touchEventsDesktop
                    );
                })(),
                touchEventsData: {
                    isTouched: void 0,
                    isMoved: void 0,
                    allowTouchCallbacks: void 0,
                    touchStartTime: void 0,
                    isScrolling: void 0,
                    currentTranslate: void 0,
                    startTranslate: void 0,
                    allowThresholdMove: void 0,
                    focusableElements: a.params.focusableElements,
                    lastClickTime: now(),
                    clickTimeout: void 0,
                    velocities: [],
                    allowMomentumBounce: void 0,
                    isTouchEvent: void 0,
                    startMoving: void 0,
                },
                allowClick: !0,
                allowTouchMove: a.params.allowTouchMove,
                touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
                imagesToLoad: [],
                imagesLoaded: 0,
            }),
            a.emit("_swiper"),
            a.params.init && a.init(),
            a
        );
    }
    enable() {
        const e = this;
        e.enabled || ((e.enabled = !0), e.params.grabCursor && e.setGrabCursor(), e.emit("enable"));
    }
    disable() {
        const e = this;
        e.enabled && ((e.enabled = !1), e.params.grabCursor && e.unsetGrabCursor(), e.emit("disable"));
    }
    setProgress(e, t) {
        const s = this;
        e = Math.min(Math.max(e, 0), 1);
        const a = s.minTranslate(),
            i = (s.maxTranslate() - a) * e + a;
        s.translateTo(i, void 0 === t ? 0 : t), s.updateActiveIndex(), s.updateSlidesClasses();
    }
    emitContainerClasses() {
        const e = this;
        if (!e.params._emitClasses || !e.el) return;
        const t = e.el.className
            .split(" ")
            .filter((t) => 0 === t.indexOf("swiper") || 0 === t.indexOf(e.params.containerModifierClass));
        e.emit("_containerClasses", t.join(" "));
    }
    getSlideClasses(e) {
        const t = this;
        return e.className
            .split(" ")
            .filter((e) => 0 === e.indexOf("swiper-slide") || 0 === e.indexOf(t.params.slideClass))
            .join(" ");
    }
    emitSlidesClasses() {
        const e = this;
        if (!e.params._emitClasses || !e.el) return;
        const t = [];
        e.slides.each((s) => {
            const a = e.getSlideClasses(s);
            t.push({ slideEl: s, classNames: a }), e.emit("_slideClass", s, a);
        }),
            e.emit("_slideClasses", t);
    }
    slidesPerViewDynamic(e = "current", t = !1) {
        const { params: s, slides: a, slidesGrid: i, slidesSizesGrid: r, size: n, activeIndex: l } = this;
        let o = 1;
        if (s.centeredSlides) {
            let e,
                t = a[l].swiperSlideSize;
            for (let s = l + 1; s < a.length; s += 1)
                a[s] && !e && ((t += a[s].swiperSlideSize), (o += 1), t > n && (e = !0));
            for (let s = l - 1; s >= 0; s -= 1)
                a[s] && !e && ((t += a[s].swiperSlideSize), (o += 1), t > n && (e = !0));
        } else if ("current" === e)
            for (let e = l + 1; e < a.length; e += 1) {
                (t ? i[e] + r[e] - i[l] < n : i[e] - i[l] < n) && (o += 1);
            }
        else
            for (let e = l - 1; e >= 0; e -= 1) {
                i[l] - i[e] < n && (o += 1);
            }
        return o;
    }
    update() {
        const e = this;
        if (!e || e.destroyed) return;
        const { snapGrid: t, params: s } = e;
        function a() {
            const t = e.rtlTranslate ? -1 * e.translate : e.translate,
                s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
            e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses();
        }
        let i;
        s.breakpoints && e.setBreakpoint(),
            e.updateSize(),
            e.updateSlides(),
            e.updateProgress(),
            e.updateSlidesClasses(),
            e.params.freeMode && e.params.freeMode.enabled
                ? (a(), e.params.autoHeight && e.updateAutoHeight())
                : ((i =
                      ("auto" === e.params.slidesPerView || e.params.slidesPerView > 1) &&
                      e.isEnd &&
                      !e.params.centeredSlides
                          ? e.slideTo(e.slides.length - 1, 0, !1, !0)
                          : e.slideTo(e.activeIndex, 0, !1, !0)),
                  i || a()),
            s.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
            e.emit("update");
    }
    changeDirection(e, t = !0) {
        const s = this,
            a = s.params.direction;
        return (
            e || (e = "horizontal" === a ? "vertical" : "horizontal"),
            e === a ||
                ("horizontal" !== e && "vertical" !== e) ||
                (s.$el
                    .removeClass(`${s.params.containerModifierClass}${a}`)
                    .addClass(`${s.params.containerModifierClass}${e}`),
                s.emitContainerClasses(),
                (s.params.direction = e),
                s.slides.each((t) => {
                    "vertical" === e ? (t.style.width = "") : (t.style.height = "");
                }),
                s.emit("changeDirection"),
                t && s.update()),
            s
        );
    }
    mount(e) {
        const t = this;
        if (t.mounted) return !0;
        const s = $(e || t.params.el);
        if (!(e = s[0])) return !1;
        e.swiper = t;
        const a = () => `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
        let i = (() => {
            if (e && e.shadowRoot && e.shadowRoot.querySelector) {
                const t = $(e.shadowRoot.querySelector(a()));
                return (t.children = (e) => s.children(e)), t;
            }
            return s.children(a());
        })();
        if (0 === i.length && t.params.createElements) {
            const e = getDocument().createElement("div");
            (i = $(e)),
                (e.className = t.params.wrapperClass),
                s.append(e),
                s.children(`.${t.params.slideClass}`).each((e) => {
                    i.append(e);
                });
        }
        return (
            Object.assign(t, {
                $el: s,
                el: e,
                $wrapperEl: i,
                wrapperEl: i[0],
                mounted: !0,
                rtl: "rtl" === e.dir.toLowerCase() || "rtl" === s.css("direction"),
                rtlTranslate:
                    "horizontal" === t.params.direction &&
                    ("rtl" === e.dir.toLowerCase() || "rtl" === s.css("direction")),
                wrongRTL: "-webkit-box" === i.css("display"),
            }),
            !0
        );
    }
    init(e) {
        const t = this;
        if (t.initialized) return t;
        return (
            !1 === t.mount(e) ||
                (t.emit("beforeInit"),
                t.params.breakpoints && t.setBreakpoint(),
                t.addClasses(),
                t.params.loop && t.loopCreate(),
                t.updateSize(),
                t.updateSlides(),
                t.params.watchOverflow && t.checkOverflow(),
                t.params.grabCursor && t.enabled && t.setGrabCursor(),
                t.params.preloadImages && t.preloadImages(),
                t.params.loop
                    ? t.slideTo(t.params.initialSlide + t.loopedSlides, 0, t.params.runCallbacksOnInit, !1, !0)
                    : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0),
                t.attachEvents(),
                (t.initialized = !0),
                t.emit("init"),
                t.emit("afterInit")),
            t
        );
    }
    destroy(e = !0, t = !0) {
        const s = this,
            { params: a, $el: i, $wrapperEl: r, slides: n } = s;
        return (
            void 0 === s.params ||
                s.destroyed ||
                (s.emit("beforeDestroy"),
                (s.initialized = !1),
                s.detachEvents(),
                a.loop && s.loopDestroy(),
                t &&
                    (s.removeClasses(),
                    i.removeAttr("style"),
                    r.removeAttr("style"),
                    n &&
                        n.length &&
                        n
                            .removeClass(
                                [a.slideVisibleClass, a.slideActiveClass, a.slideNextClass, a.slidePrevClass].join(" ")
                            )
                            .removeAttr("style")
                            .removeAttr("data-swiper-slide-index")),
                s.emit("destroy"),
                Object.keys(s.eventsListeners).forEach((e) => {
                    s.off(e);
                }),
                !1 !== e && ((s.$el[0].swiper = null), deleteProps(s)),
                (s.destroyed = !0)),
            null
        );
    }
    static extendDefaults(e) {
        extend(extendedDefaults, e);
    }
    static get extendedDefaults() {
        return extendedDefaults;
    }
    static get defaults() {
        return defaults;
    }
    static installModule(e) {
        Swiper.prototype.__modules__ || (Swiper.prototype.__modules__ = []);
        const t = Swiper.prototype.__modules__;
        "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
    }
    static use(e) {
        return Array.isArray(e)
            ? (e.forEach((e) => Swiper.installModule(e)), Swiper)
            : (Swiper.installModule(e), Swiper);
    }
}
function Virtual({ swiper: e, extendParams: t, on: s }) {
    let a;
    function i(t, s) {
        const a = e.params.virtual;
        if (a.cache && e.virtual.cache[s]) return e.virtual.cache[s];
        const i = a.renderSlide
            ? $(a.renderSlide.call(e, t, s))
            : $(`<div class="${e.params.slideClass}" data-swiper-slide-index="${s}">${t}</div>`);
        return (
            i.attr("data-swiper-slide-index") || i.attr("data-swiper-slide-index", s),
            a.cache && (e.virtual.cache[s] = i),
            i
        );
    }
    function r(t) {
        const { slidesPerView: s, slidesPerGroup: a, centeredSlides: r } = e.params,
            { addSlidesBefore: n, addSlidesAfter: l } = e.params.virtual,
            { from: o, to: d, slides: c, slidesGrid: p, offset: u } = e.virtual;
        e.params.cssMode || e.updateActiveIndex();
        const h = e.activeIndex || 0;
        let m, f, g;
        (m = e.rtlTranslate ? "right" : e.isHorizontal() ? "left" : "top"),
            r
                ? ((f = Math.floor(s / 2) + a + l), (g = Math.floor(s / 2) + a + n))
                : ((f = s + (a - 1) + l), (g = a + n));
        const v = Math.max((h || 0) - g, 0),
            w = Math.min((h || 0) + f, c.length - 1),
            b = (e.slidesGrid[v] || 0) - (e.slidesGrid[0] || 0);
        function x() {
            e.updateSlides(),
                e.updateProgress(),
                e.updateSlidesClasses(),
                e.lazy && e.params.lazy.enabled && e.lazy.load();
        }
        if (
            (Object.assign(e.virtual, { from: v, to: w, offset: b, slidesGrid: e.slidesGrid }),
            o === v && d === w && !t)
        )
            return e.slidesGrid !== p && b !== u && e.slides.css(m, `${b}px`), void e.updateProgress();
        if (e.params.virtual.renderExternal)
            return (
                e.params.virtual.renderExternal.call(e, {
                    offset: b,
                    from: v,
                    to: w,
                    slides: (function () {
                        const e = [];
                        for (let t = v; t <= w; t += 1) e.push(c[t]);
                        return e;
                    })(),
                }),
                void (e.params.virtual.renderExternalUpdate && x())
            );
        const y = [],
            E = [];
        if (t) e.$wrapperEl.find(`.${e.params.slideClass}`).remove();
        else
            for (let t = o; t <= d; t += 1)
                (t < v || t > w) &&
                    e.$wrapperEl.find(`.${e.params.slideClass}[data-swiper-slide-index="${t}"]`).remove();
        for (let e = 0; e < c.length; e += 1)
            e >= v && e <= w && (void 0 === d || t ? E.push(e) : (e > d && E.push(e), e < o && y.push(e)));
        E.forEach((t) => {
            e.$wrapperEl.append(i(c[t], t));
        }),
            y
                .sort((e, t) => t - e)
                .forEach((t) => {
                    e.$wrapperEl.prepend(i(c[t], t));
                }),
            e.$wrapperEl.children(".swiper-slide").css(m, `${b}px`),
            x();
    }
    t({
        virtual: {
            enabled: !1,
            slides: [],
            cache: !0,
            renderSlide: null,
            renderExternal: null,
            renderExternalUpdate: !0,
            addSlidesBefore: 0,
            addSlidesAfter: 0,
        },
    }),
        (e.virtual = { cache: {}, from: void 0, to: void 0, slides: [], offset: 0, slidesGrid: [] }),
        s("beforeInit", () => {
            e.params.virtual.enabled &&
                ((e.virtual.slides = e.params.virtual.slides),
                e.classNames.push(`${e.params.containerModifierClass}virtual`),
                (e.params.watchSlidesProgress = !0),
                (e.originalParams.watchSlidesProgress = !0),
                e.params.initialSlide || r());
        }),
        s("setTranslate", () => {
            e.params.virtual.enabled &&
                (e.params.cssMode && !e._immediateVirtual
                    ? (clearTimeout(a),
                      (a = setTimeout(() => {
                          r();
                      }, 100)))
                    : r());
        }),
        s("init update resize", () => {
            e.params.virtual.enabled &&
                e.params.cssMode &&
                setCSSProperty(e.wrapperEl, "--swiper-virtual-size", `${e.virtualSize}px`);
        }),
        Object.assign(e.virtual, {
            appendSlide: function (t) {
                if ("object" == typeof t && "length" in t)
                    for (let s = 0; s < t.length; s += 1) t[s] && e.virtual.slides.push(t[s]);
                else e.virtual.slides.push(t);
                r(!0);
            },
            prependSlide: function (t) {
                const s = e.activeIndex;
                let a = s + 1,
                    i = 1;
                if (Array.isArray(t)) {
                    for (let s = 0; s < t.length; s += 1) t[s] && e.virtual.slides.unshift(t[s]);
                    (a = s + t.length), (i = t.length);
                } else e.virtual.slides.unshift(t);
                if (e.params.virtual.cache) {
                    const t = e.virtual.cache,
                        s = {};
                    Object.keys(t).forEach((e) => {
                        const a = t[e],
                            r = a.attr("data-swiper-slide-index");
                        r && a.attr("data-swiper-slide-index", parseInt(r, 10) + i), (s[parseInt(e, 10) + i] = a);
                    }),
                        (e.virtual.cache = s);
                }
                r(!0), e.slideTo(a, 0);
            },
            removeSlide: function (t) {
                if (null == t) return;
                let s = e.activeIndex;
                if (Array.isArray(t))
                    for (let a = t.length - 1; a >= 0; a -= 1)
                        e.virtual.slides.splice(t[a], 1),
                            e.params.virtual.cache && delete e.virtual.cache[t[a]],
                            t[a] < s && (s -= 1),
                            (s = Math.max(s, 0));
                else
                    e.virtual.slides.splice(t, 1),
                        e.params.virtual.cache && delete e.virtual.cache[t],
                        t < s && (s -= 1),
                        (s = Math.max(s, 0));
                r(!0), e.slideTo(s, 0);
            },
            removeAllSlides: function () {
                (e.virtual.slides = []), e.params.virtual.cache && (e.virtual.cache = {}), r(!0), e.slideTo(0, 0);
            },
            update: r,
        });
}
function Keyboard({ swiper: e, extendParams: t, on: s, emit: a }) {
    const i = getDocument(),
        r = getWindow();
    function n(t) {
        if (!e.enabled) return;
        const { rtlTranslate: s } = e;
        let n = t;
        n.originalEvent && (n = n.originalEvent);
        const l = n.keyCode || n.charCode,
            o = e.params.keyboard.pageUpDown,
            d = o && 33 === l,
            c = o && 34 === l,
            p = 37 === l,
            u = 39 === l,
            h = 38 === l,
            m = 40 === l;
        if (!e.allowSlideNext && ((e.isHorizontal() && u) || (e.isVertical() && m) || c)) return !1;
        if (!e.allowSlidePrev && ((e.isHorizontal() && p) || (e.isVertical() && h) || d)) return !1;
        if (
            !(
                n.shiftKey ||
                n.altKey ||
                n.ctrlKey ||
                n.metaKey ||
                (i.activeElement &&
                    i.activeElement.nodeName &&
                    ("input" === i.activeElement.nodeName.toLowerCase() ||
                        "textarea" === i.activeElement.nodeName.toLowerCase()))
            )
        ) {
            if (e.params.keyboard.onlyInViewport && (d || c || p || u || h || m)) {
                let t = !1;
                if (
                    e.$el.parents(`.${e.params.slideClass}`).length > 0 &&
                    0 === e.$el.parents(`.${e.params.slideActiveClass}`).length
                )
                    return;
                const a = e.$el,
                    i = a[0].clientWidth,
                    n = a[0].clientHeight,
                    l = r.innerWidth,
                    o = r.innerHeight,
                    d = e.$el.offset();
                s && (d.left -= e.$el[0].scrollLeft);
                const c = [
                    [d.left, d.top],
                    [d.left + i, d.top],
                    [d.left, d.top + n],
                    [d.left + i, d.top + n],
                ];
                for (let e = 0; e < c.length; e += 1) {
                    const s = c[e];
                    if (s[0] >= 0 && s[0] <= l && s[1] >= 0 && s[1] <= o) {
                        if (0 === s[0] && 0 === s[1]) continue;
                        t = !0;
                    }
                }
                if (!t) return;
            }
            e.isHorizontal()
                ? ((d || c || p || u) && (n.preventDefault ? n.preventDefault() : (n.returnValue = !1)),
                  (((c || u) && !s) || ((d || p) && s)) && e.slideNext(),
                  (((d || p) && !s) || ((c || u) && s)) && e.slidePrev())
                : ((d || c || h || m) && (n.preventDefault ? n.preventDefault() : (n.returnValue = !1)),
                  (c || m) && e.slideNext(),
                  (d || h) && e.slidePrev()),
                a("keyPress", l);
        }
    }
    function l() {
        e.keyboard.enabled || ($(i).on("keydown", n), (e.keyboard.enabled = !0));
    }
    function o() {
        e.keyboard.enabled && ($(i).off("keydown", n), (e.keyboard.enabled = !1));
    }
    (e.keyboard = { enabled: !1 }),
        t({ keyboard: { enabled: !1, onlyInViewport: !0, pageUpDown: !0 } }),
        s("init", () => {
            e.params.keyboard.enabled && l();
        }),
        s("destroy", () => {
            e.keyboard.enabled && o();
        }),
        Object.assign(e.keyboard, { enable: l, disable: o });
}
function Mousewheel({ swiper: e, extendParams: t, on: s, emit: a }) {
    const i = getWindow();
    let r;
    t({
        mousewheel: {
            enabled: !1,
            releaseOnEdges: !1,
            invert: !1,
            forceToAxis: !1,
            sensitivity: 1,
            eventsTarget: "container",
            thresholdDelta: null,
            thresholdTime: null,
        },
    }),
        (e.mousewheel = { enabled: !1 });
    let n,
        l = now();
    const o = [];
    function d() {
        e.enabled && (e.mouseEntered = !0);
    }
    function c() {
        e.enabled && (e.mouseEntered = !1);
    }
    function p(t) {
        return (
            !(e.params.mousewheel.thresholdDelta && t.delta < e.params.mousewheel.thresholdDelta) &&
            !(e.params.mousewheel.thresholdTime && now() - l < e.params.mousewheel.thresholdTime) &&
            ((t.delta >= 6 && now() - l < 60) ||
                (t.direction < 0
                    ? (e.isEnd && !e.params.loop) || e.animating || (e.slideNext(), a("scroll", t.raw))
                    : (e.isBeginning && !e.params.loop) || e.animating || (e.slidePrev(), a("scroll", t.raw)),
                (l = new i.Date().getTime()),
                !1))
        );
    }
    function u(t) {
        let s = t,
            i = !0;
        if (!e.enabled) return;
        const l = e.params.mousewheel;
        e.params.cssMode && s.preventDefault();
        let d = e.$el;
        if (
            ("container" !== e.params.mousewheel.eventsTarget && (d = $(e.params.mousewheel.eventsTarget)),
            !e.mouseEntered && !d[0].contains(s.target) && !l.releaseOnEdges)
        )
            return !0;
        s.originalEvent && (s = s.originalEvent);
        let c = 0;
        const u = e.rtlTranslate ? -1 : 1,
            h = (function (e) {
                let t = 0,
                    s = 0,
                    a = 0,
                    i = 0;
                return (
                    "detail" in e && (s = e.detail),
                    "wheelDelta" in e && (s = -e.wheelDelta / 120),
                    "wheelDeltaY" in e && (s = -e.wheelDeltaY / 120),
                    "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120),
                    "axis" in e && e.axis === e.HORIZONTAL_AXIS && ((t = s), (s = 0)),
                    (a = 10 * t),
                    (i = 10 * s),
                    "deltaY" in e && (i = e.deltaY),
                    "deltaX" in e && (a = e.deltaX),
                    e.shiftKey && !a && ((a = i), (i = 0)),
                    (a || i) && e.deltaMode && (1 === e.deltaMode ? ((a *= 40), (i *= 40)) : ((a *= 800), (i *= 800))),
                    a && !t && (t = a < 1 ? -1 : 1),
                    i && !s && (s = i < 1 ? -1 : 1),
                    { spinX: t, spinY: s, pixelX: a, pixelY: i }
                );
            })(s);
        if (l.forceToAxis)
            if (e.isHorizontal()) {
                if (!(Math.abs(h.pixelX) > Math.abs(h.pixelY))) return !0;
                c = -h.pixelX * u;
            } else {
                if (!(Math.abs(h.pixelY) > Math.abs(h.pixelX))) return !0;
                c = -h.pixelY;
            }
        else c = Math.abs(h.pixelX) > Math.abs(h.pixelY) ? -h.pixelX * u : -h.pixelY;
        if (0 === c) return !0;
        l.invert && (c = -c);
        let m = e.getTranslate() + c * l.sensitivity;
        if (
            (m >= e.minTranslate() && (m = e.minTranslate()),
            m <= e.maxTranslate() && (m = e.maxTranslate()),
            (i = !!e.params.loop || !(m === e.minTranslate() || m === e.maxTranslate())),
            i && e.params.nested && s.stopPropagation(),
            e.params.freeMode && e.params.freeMode.enabled)
        ) {
            const t = { time: now(), delta: Math.abs(c), direction: Math.sign(c) },
                i = n && t.time < n.time + 500 && t.delta <= n.delta && t.direction === n.direction;
            if (!i) {
                (n = void 0), e.params.loop && e.loopFix();
                let d = e.getTranslate() + c * l.sensitivity;
                const p = e.isBeginning,
                    u = e.isEnd;
                if (
                    (d >= e.minTranslate() && (d = e.minTranslate()),
                    d <= e.maxTranslate() && (d = e.maxTranslate()),
                    e.setTransition(0),
                    e.setTranslate(d),
                    e.updateProgress(),
                    e.updateActiveIndex(),
                    e.updateSlidesClasses(),
                    ((!p && e.isBeginning) || (!u && e.isEnd)) && e.updateSlidesClasses(),
                    e.params.freeMode.sticky)
                ) {
                    clearTimeout(r), (r = void 0), o.length >= 15 && o.shift();
                    const s = o.length ? o[o.length - 1] : void 0,
                        a = o[0];
                    if ((o.push(t), s && (t.delta > s.delta || t.direction !== s.direction))) o.splice(0);
                    else if (o.length >= 15 && t.time - a.time < 500 && a.delta - t.delta >= 1 && t.delta <= 6) {
                        const s = c > 0 ? 0.8 : 0.2;
                        (n = t),
                            o.splice(0),
                            (r = nextTick(() => {
                                e.slideToClosest(e.params.speed, !0, void 0, s);
                            }, 0));
                    }
                    r ||
                        (r = nextTick(() => {
                            (n = t), o.splice(0), e.slideToClosest(e.params.speed, !0, void 0, 0.5);
                        }, 500));
                }
                if (
                    (i || a("scroll", s),
                    e.params.autoplay && e.params.autoplayDisableOnInteraction && e.autoplay.stop(),
                    d === e.minTranslate() || d === e.maxTranslate())
                )
                    return !0;
            }
        } else {
            const s = { time: now(), delta: Math.abs(c), direction: Math.sign(c), raw: t };
            o.length >= 2 && o.shift();
            const a = o.length ? o[o.length - 1] : void 0;
            if (
                (o.push(s),
                a ? (s.direction !== a.direction || s.delta > a.delta || s.time > a.time + 150) && p(s) : p(s),
                (function (t) {
                    const s = e.params.mousewheel;
                    if (t.direction < 0) {
                        if (e.isEnd && !e.params.loop && s.releaseOnEdges) return !0;
                    } else if (e.isBeginning && !e.params.loop && s.releaseOnEdges) return !0;
                    return !1;
                })(s))
            )
                return !0;
        }
        return s.preventDefault ? s.preventDefault() : (s.returnValue = !1), !1;
    }
    function h(t) {
        let s = e.$el;
        "container" !== e.params.mousewheel.eventsTarget && (s = $(e.params.mousewheel.eventsTarget)),
            s[t]("mouseenter", d),
            s[t]("mouseleave", c),
            s[t]("wheel", u);
    }
    function m() {
        return e.params.cssMode
            ? (e.wrapperEl.removeEventListener("wheel", u), !0)
            : !e.mousewheel.enabled && (h("on"), (e.mousewheel.enabled = !0), !0);
    }
    function f() {
        return e.params.cssMode
            ? (e.wrapperEl.addEventListener(event, u), !0)
            : !!e.mousewheel.enabled && (h("off"), (e.mousewheel.enabled = !1), !0);
    }
    s("init", () => {
        !e.params.mousewheel.enabled && e.params.cssMode && f(), e.params.mousewheel.enabled && m();
    }),
        s("destroy", () => {
            e.params.cssMode && m(), e.mousewheel.enabled && f();
        }),
        Object.assign(e.mousewheel, { enable: m, disable: f });
}
function createElementIfNotDefined(e, t, s, a) {
    const i = getDocument();
    return (
        e.params.createElements &&
            Object.keys(a).forEach((r) => {
                if (!s[r] && !0 === s.auto) {
                    let n = e.$el.children(`.${a[r]}`)[0];
                    n || ((n = i.createElement("div")), (n.className = a[r]), e.$el.append(n)), (s[r] = n), (t[r] = n);
                }
            }),
        s
    );
}
function Navigation({ swiper: e, extendParams: t, on: s, emit: a }) {
    function i(t) {
        let s;
        return (
            t &&
                ((s = $(t)),
                e.params.uniqueNavElements &&
                    "string" == typeof t &&
                    s.length > 1 &&
                    1 === e.$el.find(t).length &&
                    (s = e.$el.find(t))),
            s
        );
    }
    function r(t, s) {
        const a = e.params.navigation;
        t &&
            t.length > 0 &&
            (t[s ? "addClass" : "removeClass"](a.disabledClass),
            t[0] && "BUTTON" === t[0].tagName && (t[0].disabled = s),
            e.params.watchOverflow && e.enabled && t[e.isLocked ? "addClass" : "removeClass"](a.lockClass));
    }
    function n() {
        if (e.params.loop) return;
        const { $nextEl: t, $prevEl: s } = e.navigation;
        r(s, e.isBeginning), r(t, e.isEnd);
    }
    function l(t) {
        t.preventDefault(), (e.isBeginning && !e.params.loop) || e.slidePrev();
    }
    function o(t) {
        t.preventDefault(), (e.isEnd && !e.params.loop) || e.slideNext();
    }
    function d() {
        const t = e.params.navigation;
        if (
            ((e.params.navigation = createElementIfNotDefined(e, e.originalParams.navigation, e.params.navigation, {
                nextEl: "swiper-button-next",
                prevEl: "swiper-button-prev",
            })),
            !t.nextEl && !t.prevEl)
        )
            return;
        const s = i(t.nextEl),
            a = i(t.prevEl);
        s && s.length > 0 && s.on("click", o),
            a && a.length > 0 && a.on("click", l),
            Object.assign(e.navigation, { $nextEl: s, nextEl: s && s[0], $prevEl: a, prevEl: a && a[0] }),
            e.enabled || (s && s.addClass(t.lockClass), a && a.addClass(t.lockClass));
    }
    function c() {
        const { $nextEl: t, $prevEl: s } = e.navigation;
        t && t.length && (t.off("click", o), t.removeClass(e.params.navigation.disabledClass)),
            s && s.length && (s.off("click", l), s.removeClass(e.params.navigation.disabledClass));
    }
    t({
        navigation: {
            nextEl: null,
            prevEl: null,
            hideOnClick: !1,
            disabledClass: "swiper-button-disabled",
            hiddenClass: "swiper-button-hidden",
            lockClass: "swiper-button-lock",
        },
    }),
        (e.navigation = { nextEl: null, $nextEl: null, prevEl: null, $prevEl: null }),
        s("init", () => {
            d(), n();
        }),
        s("toEdge fromEdge lock unlock", () => {
            n();
        }),
        s("destroy", () => {
            c();
        }),
        s("enable disable", () => {
            const { $nextEl: t, $prevEl: s } = e.navigation;
            t && t[e.enabled ? "removeClass" : "addClass"](e.params.navigation.lockClass),
                s && s[e.enabled ? "removeClass" : "addClass"](e.params.navigation.lockClass);
        }),
        s("click", (t, s) => {
            const { $nextEl: i, $prevEl: r } = e.navigation,
                n = s.target;
            if (e.params.navigation.hideOnClick && !$(n).is(r) && !$(n).is(i)) {
                if (
                    e.pagination &&
                    e.params.pagination &&
                    e.params.pagination.clickable &&
                    (e.pagination.el === n || e.pagination.el.contains(n))
                )
                    return;
                let t;
                i
                    ? (t = i.hasClass(e.params.navigation.hiddenClass))
                    : r && (t = r.hasClass(e.params.navigation.hiddenClass)),
                    a(!0 === t ? "navigationShow" : "navigationHide"),
                    i && i.toggleClass(e.params.navigation.hiddenClass),
                    r && r.toggleClass(e.params.navigation.hiddenClass);
            }
        }),
        Object.assign(e.navigation, { update: n, init: d, destroy: c });
}
function classesToSelector(e = "") {
    return `.${e
        .trim()
        .replace(/([\.:!\/])/g, "\\$1")
        .replace(/ /g, ".")}`;
}
function Pagination({ swiper: e, extendParams: t, on: s, emit: a }) {
    const i = "swiper-pagination";
    let r;
    t({
        pagination: {
            el: null,
            bulletElement: "span",
            clickable: !1,
            hideOnClick: !1,
            renderBullet: null,
            renderProgressbar: null,
            renderFraction: null,
            renderCustom: null,
            progressbarOpposite: !1,
            type: "bullets",
            dynamicBullets: !1,
            dynamicMainBullets: 1,
            formatFractionCurrent: (e) => e,
            formatFractionTotal: (e) => e,
            bulletClass: `${i}-bullet`,
            bulletActiveClass: `${i}-bullet-active`,
            modifierClass: `${i}-`,
            currentClass: `${i}-current`,
            totalClass: `${i}-total`,
            hiddenClass: `${i}-hidden`,
            progressbarFillClass: `${i}-progressbar-fill`,
            progressbarOppositeClass: `${i}-progressbar-opposite`,
            clickableClass: `${i}-clickable`,
            lockClass: `${i}-lock`,
            horizontalClass: `${i}-horizontal`,
            verticalClass: `${i}-vertical`,
        },
    }),
        (e.pagination = { el: null, $el: null, bullets: [] });
    let n = 0;
    function l() {
        return !e.params.pagination.el || !e.pagination.el || !e.pagination.$el || 0 === e.pagination.$el.length;
    }
    function o(t, s) {
        const { bulletActiveClass: a } = e.params.pagination;
        t[s]().addClass(`${a}-${s}`)[s]().addClass(`${a}-${s}-${s}`);
    }
    function d() {
        const t = e.rtl,
            s = e.params.pagination;
        if (l()) return;
        const i = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
            d = e.pagination.$el;
        let c;
        const p = e.params.loop ? Math.ceil((i - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length;
        if (
            (e.params.loop
                ? ((c = Math.ceil((e.activeIndex - e.loopedSlides) / e.params.slidesPerGroup)),
                  c > i - 1 - 2 * e.loopedSlides && (c -= i - 2 * e.loopedSlides),
                  c > p - 1 && (c -= p),
                  c < 0 && "bullets" !== e.params.paginationType && (c = p + c))
                : (c = void 0 !== e.snapIndex ? e.snapIndex : e.activeIndex || 0),
            "bullets" === s.type && e.pagination.bullets && e.pagination.bullets.length > 0)
        ) {
            const a = e.pagination.bullets;
            let i, l, p;
            if (
                (s.dynamicBullets &&
                    ((r = a.eq(0)[e.isHorizontal() ? "outerWidth" : "outerHeight"](!0)),
                    d.css(e.isHorizontal() ? "width" : "height", r * (s.dynamicMainBullets + 4) + "px"),
                    s.dynamicMainBullets > 1 &&
                        void 0 !== e.previousIndex &&
                        ((n += c - e.previousIndex),
                        n > s.dynamicMainBullets - 1 ? (n = s.dynamicMainBullets - 1) : n < 0 && (n = 0)),
                    (i = c - n),
                    (l = i + (Math.min(a.length, s.dynamicMainBullets) - 1)),
                    (p = (l + i) / 2)),
                a.removeClass(
                    ["", "-next", "-next-next", "-prev", "-prev-prev", "-main"]
                        .map((e) => `${s.bulletActiveClass}${e}`)
                        .join(" ")
                ),
                d.length > 1)
            )
                a.each((e) => {
                    const t = $(e),
                        a = t.index();
                    a === c && t.addClass(s.bulletActiveClass),
                        s.dynamicBullets &&
                            (a >= i && a <= l && t.addClass(`${s.bulletActiveClass}-main`),
                            a === i && o(t, "prev"),
                            a === l && o(t, "next"));
                });
            else {
                const t = a.eq(c),
                    r = t.index();
                if ((t.addClass(s.bulletActiveClass), s.dynamicBullets)) {
                    const t = a.eq(i),
                        n = a.eq(l);
                    for (let e = i; e <= l; e += 1) a.eq(e).addClass(`${s.bulletActiveClass}-main`);
                    if (e.params.loop)
                        if (r >= a.length - s.dynamicMainBullets) {
                            for (let e = s.dynamicMainBullets; e >= 0; e -= 1)
                                a.eq(a.length - e).addClass(`${s.bulletActiveClass}-main`);
                            a.eq(a.length - s.dynamicMainBullets - 1).addClass(`${s.bulletActiveClass}-prev`);
                        } else o(t, "prev"), o(n, "next");
                    else o(t, "prev"), o(n, "next");
                }
            }
            if (s.dynamicBullets) {
                const i = Math.min(a.length, s.dynamicMainBullets + 4),
                    n = (r * i - r) / 2 - p * r,
                    l = t ? "right" : "left";
                a.css(e.isHorizontal() ? l : "top", `${n}px`);
            }
        }
        if (
            ("fraction" === s.type &&
                (d.find(classesToSelector(s.currentClass)).text(s.formatFractionCurrent(c + 1)),
                d.find(classesToSelector(s.totalClass)).text(s.formatFractionTotal(p))),
            "progressbar" === s.type)
        ) {
            let t;
            t = s.progressbarOpposite
                ? e.isHorizontal()
                    ? "vertical"
                    : "horizontal"
                : e.isHorizontal()
                ? "horizontal"
                : "vertical";
            const a = (c + 1) / p;
            let i = 1,
                r = 1;
            "horizontal" === t ? (i = a) : (r = a),
                d
                    .find(classesToSelector(s.progressbarFillClass))
                    .transform(`translate3d(0,0,0) scaleX(${i}) scaleY(${r})`)
                    .transition(e.params.speed);
        }
        "custom" === s.type && s.renderCustom
            ? (d.html(s.renderCustom(e, c + 1, p)), a("paginationRender", d[0]))
            : a("paginationUpdate", d[0]),
            e.params.watchOverflow && e.enabled && d[e.isLocked ? "addClass" : "removeClass"](s.lockClass);
    }
    function c() {
        const t = e.params.pagination;
        if (l()) return;
        const s = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
            i = e.pagination.$el;
        let r = "";
        if ("bullets" === t.type) {
            let a = e.params.loop ? Math.ceil((s - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length;
            e.params.freeMode && e.params.freeMode.enabled && !e.params.loop && a > s && (a = s);
            for (let s = 0; s < a; s += 1)
                t.renderBullet
                    ? (r += t.renderBullet.call(e, s, t.bulletClass))
                    : (r += `<${t.bulletElement} class="${t.bulletClass}"></${t.bulletElement}>`);
            i.html(r), (e.pagination.bullets = i.find(classesToSelector(t.bulletClass)));
        }
        "fraction" === t.type &&
            ((r = t.renderFraction
                ? t.renderFraction.call(e, t.currentClass, t.totalClass)
                : `<span class="${t.currentClass}"></span> / <span class="${t.totalClass}"></span>`),
            i.html(r)),
            "progressbar" === t.type &&
                ((r = t.renderProgressbar
                    ? t.renderProgressbar.call(e, t.progressbarFillClass)
                    : `<span class="${t.progressbarFillClass}"></span>`),
                i.html(r)),
            "custom" !== t.type && a("paginationRender", e.pagination.$el[0]);
    }
    function p() {
        e.params.pagination = createElementIfNotDefined(e, e.originalParams.pagination, e.params.pagination, {
            el: "swiper-pagination",
        });
        const t = e.params.pagination;
        if (!t.el) return;
        let s = $(t.el);
        0 !== s.length &&
            (e.params.uniqueNavElements &&
                "string" == typeof t.el &&
                s.length > 1 &&
                ((s = e.$el.find(t.el)), s.length > 1 && (s = s.filter((t) => $(t).parents(".swiper")[0] === e.el))),
            "bullets" === t.type && t.clickable && s.addClass(t.clickableClass),
            s.addClass(t.modifierClass + t.type),
            s.addClass(t.modifierClass + e.params.direction),
            "bullets" === t.type &&
                t.dynamicBullets &&
                (s.addClass(`${t.modifierClass}${t.type}-dynamic`),
                (n = 0),
                t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)),
            "progressbar" === t.type && t.progressbarOpposite && s.addClass(t.progressbarOppositeClass),
            t.clickable &&
                s.on("click", classesToSelector(t.bulletClass), function (t) {
                    t.preventDefault();
                    let s = $(this).index() * e.params.slidesPerGroup;
                    e.params.loop && (s += e.loopedSlides), e.slideTo(s);
                }),
            Object.assign(e.pagination, { $el: s, el: s[0] }),
            e.enabled || s.addClass(t.lockClass));
    }
    function u() {
        const t = e.params.pagination;
        if (l()) return;
        const s = e.pagination.$el;
        s.removeClass(t.hiddenClass),
            s.removeClass(t.modifierClass + t.type),
            s.removeClass(t.modifierClass + e.params.direction),
            e.pagination.bullets &&
                e.pagination.bullets.removeClass &&
                e.pagination.bullets.removeClass(t.bulletActiveClass),
            t.clickable && s.off("click", classesToSelector(t.bulletClass));
    }
    s("init", () => {
        p(), c(), d();
    }),
        s("activeIndexChange", () => {
            (e.params.loop || void 0 === e.snapIndex) && d();
        }),
        s("snapIndexChange", () => {
            e.params.loop || d();
        }),
        s("slidesLengthChange", () => {
            e.params.loop && (c(), d());
        }),
        s("snapGridLengthChange", () => {
            e.params.loop || (c(), d());
        }),
        s("destroy", () => {
            u();
        }),
        s("enable disable", () => {
            const { $el: t } = e.pagination;
            t && t[e.enabled ? "removeClass" : "addClass"](e.params.pagination.lockClass);
        }),
        s("lock unlock", () => {
            d();
        }),
        s("click", (t, s) => {
            const i = s.target,
                { $el: r } = e.pagination;
            if (
                e.params.pagination.el &&
                e.params.pagination.hideOnClick &&
                r.length > 0 &&
                !$(i).hasClass(e.params.pagination.bulletClass)
            ) {
                if (
                    e.navigation &&
                    ((e.navigation.nextEl && i === e.navigation.nextEl) ||
                        (e.navigation.prevEl && i === e.navigation.prevEl))
                )
                    return;
                const t = r.hasClass(e.params.pagination.hiddenClass);
                a(!0 === t ? "paginationShow" : "paginationHide"), r.toggleClass(e.params.pagination.hiddenClass);
            }
        }),
        Object.assign(e.pagination, { render: c, update: d, init: p, destroy: u });
}
function Scrollbar({ swiper: e, extendParams: t, on: s, emit: a }) {
    const i = getDocument();
    let r,
        n,
        l,
        o,
        d = !1,
        c = null,
        p = null;
    function u() {
        if (!e.params.scrollbar.el || !e.scrollbar.el) return;
        const { scrollbar: t, rtlTranslate: s, progress: a } = e,
            { $dragEl: i, $el: r } = t,
            o = e.params.scrollbar;
        let d = n,
            p = (l - n) * a;
        s
            ? ((p = -p), p > 0 ? ((d = n - p), (p = 0)) : -p + n > l && (d = l + p))
            : p < 0
            ? ((d = n + p), (p = 0))
            : p + n > l && (d = l - p),
            e.isHorizontal()
                ? (i.transform(`translate3d(${p}px, 0, 0)`), (i[0].style.width = `${d}px`))
                : (i.transform(`translate3d(0px, ${p}px, 0)`), (i[0].style.height = `${d}px`)),
            o.hide &&
                (clearTimeout(c),
                (r[0].style.opacity = 1),
                (c = setTimeout(() => {
                    (r[0].style.opacity = 0), r.transition(400);
                }, 1e3)));
    }
    function h() {
        if (!e.params.scrollbar.el || !e.scrollbar.el) return;
        const { scrollbar: t } = e,
            { $dragEl: s, $el: a } = t;
        (s[0].style.width = ""),
            (s[0].style.height = ""),
            (l = e.isHorizontal() ? a[0].offsetWidth : a[0].offsetHeight),
            (o =
                e.size / (e.virtualSize + e.params.slidesOffsetBefore - (e.params.centeredSlides ? e.snapGrid[0] : 0))),
            (n = "auto" === e.params.scrollbar.dragSize ? l * o : parseInt(e.params.scrollbar.dragSize, 10)),
            e.isHorizontal() ? (s[0].style.width = `${n}px`) : (s[0].style.height = `${n}px`),
            (a[0].style.display = o >= 1 ? "none" : ""),
            e.params.scrollbar.hide && (a[0].style.opacity = 0),
            e.params.watchOverflow &&
                e.enabled &&
                t.$el[e.isLocked ? "addClass" : "removeClass"](e.params.scrollbar.lockClass);
    }
    function m(t) {
        return e.isHorizontal()
            ? "touchstart" === t.type || "touchmove" === t.type
                ? t.targetTouches[0].clientX
                : t.clientX
            : "touchstart" === t.type || "touchmove" === t.type
            ? t.targetTouches[0].clientY
            : t.clientY;
    }
    function f(t) {
        const { scrollbar: s, rtlTranslate: a } = e,
            { $el: i } = s;
        let o;
        (o = (m(t) - i.offset()[e.isHorizontal() ? "left" : "top"] - (null !== r ? r : n / 2)) / (l - n)),
            (o = Math.max(Math.min(o, 1), 0)),
            a && (o = 1 - o);
        const d = e.minTranslate() + (e.maxTranslate() - e.minTranslate()) * o;
        e.updateProgress(d), e.setTranslate(d), e.updateActiveIndex(), e.updateSlidesClasses();
    }
    function g(t) {
        const s = e.params.scrollbar,
            { scrollbar: i, $wrapperEl: n } = e,
            { $el: l, $dragEl: o } = i;
        (d = !0),
            (r =
                t.target === o[0] || t.target === o
                    ? m(t) - t.target.getBoundingClientRect()[e.isHorizontal() ? "left" : "top"]
                    : null),
            t.preventDefault(),
            t.stopPropagation(),
            n.transition(100),
            o.transition(100),
            f(t),
            clearTimeout(p),
            l.transition(0),
            s.hide && l.css("opacity", 1),
            e.params.cssMode && e.$wrapperEl.css("scroll-snap-type", "none"),
            a("scrollbarDragStart", t);
    }
    function v(t) {
        const { scrollbar: s, $wrapperEl: i } = e,
            { $el: r, $dragEl: n } = s;
        d &&
            (t.preventDefault ? t.preventDefault() : (t.returnValue = !1),
            f(t),
            i.transition(0),
            r.transition(0),
            n.transition(0),
            a("scrollbarDragMove", t));
    }
    function w(t) {
        const s = e.params.scrollbar,
            { scrollbar: i, $wrapperEl: r } = e,
            { $el: n } = i;
        d &&
            ((d = !1),
            e.params.cssMode && (e.$wrapperEl.css("scroll-snap-type", ""), r.transition("")),
            s.hide &&
                (clearTimeout(p),
                (p = nextTick(() => {
                    n.css("opacity", 0), n.transition(400);
                }, 1e3))),
            a("scrollbarDragEnd", t),
            s.snapOnRelease && e.slideToClosest());
    }
    function b(t) {
        const { scrollbar: s, touchEventsTouch: a, touchEventsDesktop: r, params: n, support: l } = e,
            o = s.$el[0],
            d = !(!l.passiveListener || !n.passiveListeners) && { passive: !1, capture: !1 },
            c = !(!l.passiveListener || !n.passiveListeners) && { passive: !0, capture: !1 };
        if (!o) return;
        const p = "on" === t ? "addEventListener" : "removeEventListener";
        l.touch
            ? (o[p](a.start, g, d), o[p](a.move, v, d), o[p](a.end, w, c))
            : (o[p](r.start, g, d), i[p](r.move, v, d), i[p](r.end, w, c));
    }
    function x() {
        const { scrollbar: t, $el: s } = e;
        e.params.scrollbar = createElementIfNotDefined(e, e.originalParams.scrollbar, e.params.scrollbar, {
            el: "swiper-scrollbar",
        });
        const a = e.params.scrollbar;
        if (!a.el) return;
        let i = $(a.el);
        e.params.uniqueNavElements &&
            "string" == typeof a.el &&
            i.length > 1 &&
            1 === s.find(a.el).length &&
            (i = s.find(a.el));
        let r = i.find(`.${e.params.scrollbar.dragClass}`);
        0 === r.length && ((r = $(`<div class="${e.params.scrollbar.dragClass}"></div>`)), i.append(r)),
            Object.assign(t, { $el: i, el: i[0], $dragEl: r, dragEl: r[0] }),
            a.draggable && e.params.scrollbar.el && b("on"),
            i && i[e.enabled ? "removeClass" : "addClass"](e.params.scrollbar.lockClass);
    }
    function y() {
        e.params.scrollbar.el && b("off");
    }
    t({
        scrollbar: {
            el: null,
            dragSize: "auto",
            hide: !1,
            draggable: !1,
            snapOnRelease: !0,
            lockClass: "swiper-scrollbar-lock",
            dragClass: "swiper-scrollbar-drag",
        },
    }),
        (e.scrollbar = { el: null, dragEl: null, $el: null, $dragEl: null }),
        s("init", () => {
            x(), h(), u();
        }),
        s("update resize observerUpdate lock unlock", () => {
            h();
        }),
        s("setTranslate", () => {
            u();
        }),
        s("setTransition", (t, s) => {
            !(function (t) {
                e.params.scrollbar.el && e.scrollbar.el && e.scrollbar.$dragEl.transition(t);
            })(s);
        }),
        s("enable disable", () => {
            const { $el: t } = e.scrollbar;
            t && t[e.enabled ? "removeClass" : "addClass"](e.params.scrollbar.lockClass);
        }),
        s("destroy", () => {
            y();
        }),
        Object.assign(e.scrollbar, { updateSize: h, setTranslate: u, init: x, destroy: y });
}
function Parallax({ swiper: e, extendParams: t, on: s }) {
    t({ parallax: { enabled: !1 } });
    const a = (t, s) => {
            const { rtl: a } = e,
                i = $(t),
                r = a ? -1 : 1,
                n = i.attr("data-swiper-parallax") || "0";
            let l = i.attr("data-swiper-parallax-x"),
                o = i.attr("data-swiper-parallax-y");
            const d = i.attr("data-swiper-parallax-scale"),
                c = i.attr("data-swiper-parallax-opacity");
            if (
                (l || o
                    ? ((l = l || "0"), (o = o || "0"))
                    : e.isHorizontal()
                    ? ((l = n), (o = "0"))
                    : ((o = n), (l = "0")),
                (l = l.indexOf("%") >= 0 ? parseInt(l, 10) * s * r + "%" : l * s * r + "px"),
                (o = o.indexOf("%") >= 0 ? parseInt(o, 10) * s + "%" : o * s + "px"),
                null != c)
            ) {
                const e = c - (c - 1) * (1 - Math.abs(s));
                i[0].style.opacity = e;
            }
            if (null == d) i.transform(`translate3d(${l}, ${o}, 0px)`);
            else {
                const e = d - (d - 1) * (1 - Math.abs(s));
                i.transform(`translate3d(${l}, ${o}, 0px) scale(${e})`);
            }
        },
        i = () => {
            const { $el: t, slides: s, progress: i, snapGrid: r } = e;
            t
                .children(
                    "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
                )
                .each((e) => {
                    a(e, i);
                }),
                s.each((t, s) => {
                    let n = t.progress;
                    e.params.slidesPerGroup > 1 &&
                        "auto" !== e.params.slidesPerView &&
                        (n += Math.ceil(s / 2) - i * (r.length - 1)),
                        (n = Math.min(Math.max(n, -1), 1)),
                        $(t)
                            .find(
                                "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
                            )
                            .each((e) => {
                                a(e, n);
                            });
                });
        };
    s("beforeInit", () => {
        e.params.parallax.enabled && ((e.params.watchSlidesProgress = !0), (e.originalParams.watchSlidesProgress = !0));
    }),
        s("init", () => {
            e.params.parallax.enabled && i();
        }),
        s("setTranslate", () => {
            e.params.parallax.enabled && i();
        }),
        s("setTransition", (t, s) => {
            e.params.parallax.enabled &&
                ((t = e.params.speed) => {
                    const { $el: s } = e;
                    s.find(
                        "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
                    ).each((e) => {
                        const s = $(e);
                        let a = parseInt(s.attr("data-swiper-parallax-duration"), 10) || t;
                        0 === t && (a = 0), s.transition(a);
                    });
                })(s);
        });
}
function Zoom({ swiper: e, extendParams: t, on: s, emit: a }) {
    const i = getWindow();
    t({
        zoom: {
            enabled: !1,
            maxRatio: 3,
            minRatio: 1,
            toggle: !0,
            containerClass: "swiper-zoom-container",
            zoomedSlideClass: "swiper-slide-zoomed",
        },
    }),
        (e.zoom = { enabled: !1 });
    let r,
        n,
        l,
        o = 1,
        d = !1;
    const c = {
            $slideEl: void 0,
            slideWidth: void 0,
            slideHeight: void 0,
            $imageEl: void 0,
            $imageWrapEl: void 0,
            maxRatio: 3,
        },
        p = {
            isTouched: void 0,
            isMoved: void 0,
            currentX: void 0,
            currentY: void 0,
            minX: void 0,
            minY: void 0,
            maxX: void 0,
            maxY: void 0,
            width: void 0,
            height: void 0,
            startX: void 0,
            startY: void 0,
            touchesStart: {},
            touchesCurrent: {},
        },
        u = { x: void 0, y: void 0, prevPositionX: void 0, prevPositionY: void 0, prevTime: void 0 };
    let h = 1;
    function m(e) {
        if (e.targetTouches.length < 2) return 1;
        const t = e.targetTouches[0].pageX,
            s = e.targetTouches[0].pageY,
            a = e.targetTouches[1].pageX,
            i = e.targetTouches[1].pageY;
        return Math.sqrt((a - t) ** 2 + (i - s) ** 2);
    }
    function f(t) {
        const s = e.support,
            a = e.params.zoom;
        if (((n = !1), (l = !1), !s.gestures)) {
            if ("touchstart" !== t.type || ("touchstart" === t.type && t.targetTouches.length < 2)) return;
            (n = !0), (c.scaleStart = m(t));
        }
        (c.$slideEl && c.$slideEl.length) ||
        ((c.$slideEl = $(t.target).closest(`.${e.params.slideClass}`)),
        0 === c.$slideEl.length && (c.$slideEl = e.slides.eq(e.activeIndex)),
        (c.$imageEl = c.$slideEl
            .find(`.${a.containerClass}`)
            .eq(0)
            .find("picture, img, svg, canvas, .swiper-zoom-target")
            .eq(0)),
        (c.$imageWrapEl = c.$imageEl.parent(`.${a.containerClass}`)),
        (c.maxRatio = c.$imageWrapEl.attr("data-swiper-zoom") || a.maxRatio),
        0 !== c.$imageWrapEl.length)
            ? (c.$imageEl && c.$imageEl.transition(0), (d = !0))
            : (c.$imageEl = void 0);
    }
    function g(t) {
        const s = e.support,
            a = e.params.zoom,
            i = e.zoom;
        if (!s.gestures) {
            if ("touchmove" !== t.type || ("touchmove" === t.type && t.targetTouches.length < 2)) return;
            (l = !0), (c.scaleMove = m(t));
        }
        c.$imageEl && 0 !== c.$imageEl.length
            ? (s.gestures ? (i.scale = t.scale * o) : (i.scale = (c.scaleMove / c.scaleStart) * o),
              i.scale > c.maxRatio && (i.scale = c.maxRatio - 1 + (i.scale - c.maxRatio + 1) ** 0.5),
              i.scale < a.minRatio && (i.scale = a.minRatio + 1 - (a.minRatio - i.scale + 1) ** 0.5),
              c.$imageEl.transform(`translate3d(0,0,0) scale(${i.scale})`))
            : "gesturechange" === t.type && f(t);
    }
    function v(t) {
        const s = e.device,
            a = e.support,
            i = e.params.zoom,
            r = e.zoom;
        if (!a.gestures) {
            if (!n || !l) return;
            if ("touchend" !== t.type || ("touchend" === t.type && t.changedTouches.length < 2 && !s.android)) return;
            (n = !1), (l = !1);
        }
        c.$imageEl &&
            0 !== c.$imageEl.length &&
            ((r.scale = Math.max(Math.min(r.scale, c.maxRatio), i.minRatio)),
            c.$imageEl.transition(e.params.speed).transform(`translate3d(0,0,0) scale(${r.scale})`),
            (o = r.scale),
            (d = !1),
            1 === r.scale && (c.$slideEl = void 0));
    }
    function w(t) {
        const s = e.zoom;
        if (!c.$imageEl || 0 === c.$imageEl.length) return;
        if (((e.allowClick = !1), !p.isTouched || !c.$slideEl)) return;
        p.isMoved ||
            ((p.width = c.$imageEl[0].offsetWidth),
            (p.height = c.$imageEl[0].offsetHeight),
            (p.startX = getTranslate(c.$imageWrapEl[0], "x") || 0),
            (p.startY = getTranslate(c.$imageWrapEl[0], "y") || 0),
            (c.slideWidth = c.$slideEl[0].offsetWidth),
            (c.slideHeight = c.$slideEl[0].offsetHeight),
            c.$imageWrapEl.transition(0));
        const a = p.width * s.scale,
            i = p.height * s.scale;
        if (!(a < c.slideWidth && i < c.slideHeight)) {
            if (
                ((p.minX = Math.min(c.slideWidth / 2 - a / 2, 0)),
                (p.maxX = -p.minX),
                (p.minY = Math.min(c.slideHeight / 2 - i / 2, 0)),
                (p.maxY = -p.minY),
                (p.touchesCurrent.x = "touchmove" === t.type ? t.targetTouches[0].pageX : t.pageX),
                (p.touchesCurrent.y = "touchmove" === t.type ? t.targetTouches[0].pageY : t.pageY),
                !p.isMoved && !d)
            ) {
                if (
                    e.isHorizontal() &&
                    ((Math.floor(p.minX) === Math.floor(p.startX) && p.touchesCurrent.x < p.touchesStart.x) ||
                        (Math.floor(p.maxX) === Math.floor(p.startX) && p.touchesCurrent.x > p.touchesStart.x))
                )
                    return void (p.isTouched = !1);
                if (
                    !e.isHorizontal() &&
                    ((Math.floor(p.minY) === Math.floor(p.startY) && p.touchesCurrent.y < p.touchesStart.y) ||
                        (Math.floor(p.maxY) === Math.floor(p.startY) && p.touchesCurrent.y > p.touchesStart.y))
                )
                    return void (p.isTouched = !1);
            }
            t.cancelable && t.preventDefault(),
                t.stopPropagation(),
                (p.isMoved = !0),
                (p.currentX = p.touchesCurrent.x - p.touchesStart.x + p.startX),
                (p.currentY = p.touchesCurrent.y - p.touchesStart.y + p.startY),
                p.currentX < p.minX && (p.currentX = p.minX + 1 - (p.minX - p.currentX + 1) ** 0.8),
                p.currentX > p.maxX && (p.currentX = p.maxX - 1 + (p.currentX - p.maxX + 1) ** 0.8),
                p.currentY < p.minY && (p.currentY = p.minY + 1 - (p.minY - p.currentY + 1) ** 0.8),
                p.currentY > p.maxY && (p.currentY = p.maxY - 1 + (p.currentY - p.maxY + 1) ** 0.8),
                u.prevPositionX || (u.prevPositionX = p.touchesCurrent.x),
                u.prevPositionY || (u.prevPositionY = p.touchesCurrent.y),
                u.prevTime || (u.prevTime = Date.now()),
                (u.x = (p.touchesCurrent.x - u.prevPositionX) / (Date.now() - u.prevTime) / 2),
                (u.y = (p.touchesCurrent.y - u.prevPositionY) / (Date.now() - u.prevTime) / 2),
                Math.abs(p.touchesCurrent.x - u.prevPositionX) < 2 && (u.x = 0),
                Math.abs(p.touchesCurrent.y - u.prevPositionY) < 2 && (u.y = 0),
                (u.prevPositionX = p.touchesCurrent.x),
                (u.prevPositionY = p.touchesCurrent.y),
                (u.prevTime = Date.now()),
                c.$imageWrapEl.transform(`translate3d(${p.currentX}px, ${p.currentY}px,0)`);
        }
    }
    function b() {
        const t = e.zoom;
        c.$slideEl &&
            e.previousIndex !== e.activeIndex &&
            (c.$imageEl && c.$imageEl.transform("translate3d(0,0,0) scale(1)"),
            c.$imageWrapEl && c.$imageWrapEl.transform("translate3d(0,0,0)"),
            (t.scale = 1),
            (o = 1),
            (c.$slideEl = void 0),
            (c.$imageEl = void 0),
            (c.$imageWrapEl = void 0));
    }
    function x(t) {
        const s = e.zoom,
            a = e.params.zoom;
        if (
            (c.$slideEl ||
                (t && t.target && (c.$slideEl = $(t.target).closest(`.${e.params.slideClass}`)),
                c.$slideEl ||
                    (e.params.virtual && e.params.virtual.enabled && e.virtual
                        ? (c.$slideEl = e.$wrapperEl.children(`.${e.params.slideActiveClass}`))
                        : (c.$slideEl = e.slides.eq(e.activeIndex))),
                (c.$imageEl = c.$slideEl
                    .find(`.${a.containerClass}`)
                    .eq(0)
                    .find("picture, img, svg, canvas, .swiper-zoom-target")
                    .eq(0)),
                (c.$imageWrapEl = c.$imageEl.parent(`.${a.containerClass}`))),
            !c.$imageEl || 0 === c.$imageEl.length || !c.$imageWrapEl || 0 === c.$imageWrapEl.length)
        )
            return;
        let r, n, l, d, u, h, m, f, g, v, w, b, x, y, E, T, S, C;
        e.params.cssMode && ((e.wrapperEl.style.overflow = "hidden"), (e.wrapperEl.style.touchAction = "none")),
            c.$slideEl.addClass(`${a.zoomedSlideClass}`),
            void 0 === p.touchesStart.x && t
                ? ((r = "touchend" === t.type ? t.changedTouches[0].pageX : t.pageX),
                  (n = "touchend" === t.type ? t.changedTouches[0].pageY : t.pageY))
                : ((r = p.touchesStart.x), (n = p.touchesStart.y)),
            (s.scale = c.$imageWrapEl.attr("data-swiper-zoom") || a.maxRatio),
            (o = c.$imageWrapEl.attr("data-swiper-zoom") || a.maxRatio),
            t
                ? ((S = c.$slideEl[0].offsetWidth),
                  (C = c.$slideEl[0].offsetHeight),
                  (l = c.$slideEl.offset().left + i.scrollX),
                  (d = c.$slideEl.offset().top + i.scrollY),
                  (u = l + S / 2 - r),
                  (h = d + C / 2 - n),
                  (g = c.$imageEl[0].offsetWidth),
                  (v = c.$imageEl[0].offsetHeight),
                  (w = g * s.scale),
                  (b = v * s.scale),
                  (x = Math.min(S / 2 - w / 2, 0)),
                  (y = Math.min(C / 2 - b / 2, 0)),
                  (E = -x),
                  (T = -y),
                  (m = u * s.scale),
                  (f = h * s.scale),
                  m < x && (m = x),
                  m > E && (m = E),
                  f < y && (f = y),
                  f > T && (f = T))
                : ((m = 0), (f = 0)),
            c.$imageWrapEl.transition(300).transform(`translate3d(${m}px, ${f}px,0)`),
            c.$imageEl.transition(300).transform(`translate3d(0,0,0) scale(${s.scale})`);
    }
    function y() {
        const t = e.zoom,
            s = e.params.zoom;
        c.$slideEl ||
            (e.params.virtual && e.params.virtual.enabled && e.virtual
                ? (c.$slideEl = e.$wrapperEl.children(`.${e.params.slideActiveClass}`))
                : (c.$slideEl = e.slides.eq(e.activeIndex)),
            (c.$imageEl = c.$slideEl
                .find(`.${s.containerClass}`)
                .eq(0)
                .find("picture, img, svg, canvas, .swiper-zoom-target")
                .eq(0)),
            (c.$imageWrapEl = c.$imageEl.parent(`.${s.containerClass}`))),
            c.$imageEl &&
                0 !== c.$imageEl.length &&
                c.$imageWrapEl &&
                0 !== c.$imageWrapEl.length &&
                (e.params.cssMode && ((e.wrapperEl.style.overflow = ""), (e.wrapperEl.style.touchAction = "")),
                (t.scale = 1),
                (o = 1),
                c.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"),
                c.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"),
                c.$slideEl.removeClass(`${s.zoomedSlideClass}`),
                (c.$slideEl = void 0));
    }
    function E(t) {
        const s = e.zoom;
        s.scale && 1 !== s.scale ? y() : x(t);
    }
    function T() {
        const t = e.support;
        return {
            passiveListener: !(
                "touchstart" !== e.touchEvents.start ||
                !t.passiveListener ||
                !e.params.passiveListeners
            ) && { passive: !0, capture: !1 },
            activeListenerWithCapture: !t.passiveListener || { passive: !1, capture: !0 },
        };
    }
    function S() {
        return `.${e.params.slideClass}`;
    }
    function C(t) {
        const { passiveListener: s } = T(),
            a = S();
        e.$wrapperEl[t]("gesturestart", a, f, s),
            e.$wrapperEl[t]("gesturechange", a, g, s),
            e.$wrapperEl[t]("gestureend", a, v, s);
    }
    function M() {
        r || ((r = !0), C("on"));
    }
    function P() {
        r && ((r = !1), C("off"));
    }
    function k() {
        const t = e.zoom;
        if (t.enabled) return;
        t.enabled = !0;
        const s = e.support,
            { passiveListener: a, activeListenerWithCapture: i } = T(),
            r = S();
        s.gestures
            ? (e.$wrapperEl.on(e.touchEvents.start, M, a), e.$wrapperEl.on(e.touchEvents.end, P, a))
            : "touchstart" === e.touchEvents.start &&
              (e.$wrapperEl.on(e.touchEvents.start, r, f, a),
              e.$wrapperEl.on(e.touchEvents.move, r, g, i),
              e.$wrapperEl.on(e.touchEvents.end, r, v, a),
              e.touchEvents.cancel && e.$wrapperEl.on(e.touchEvents.cancel, r, v, a)),
            e.$wrapperEl.on(e.touchEvents.move, `.${e.params.zoom.containerClass}`, w, i);
    }
    function z() {
        const t = e.zoom;
        if (!t.enabled) return;
        const s = e.support;
        t.enabled = !1;
        const { passiveListener: a, activeListenerWithCapture: i } = T(),
            r = S();
        s.gestures
            ? (e.$wrapperEl.off(e.touchEvents.start, M, a), e.$wrapperEl.off(e.touchEvents.end, P, a))
            : "touchstart" === e.touchEvents.start &&
              (e.$wrapperEl.off(e.touchEvents.start, r, f, a),
              e.$wrapperEl.off(e.touchEvents.move, r, g, i),
              e.$wrapperEl.off(e.touchEvents.end, r, v, a),
              e.touchEvents.cancel && e.$wrapperEl.off(e.touchEvents.cancel, r, v, a)),
            e.$wrapperEl.off(e.touchEvents.move, `.${e.params.zoom.containerClass}`, w, i);
    }
    Object.defineProperty(e.zoom, "scale", {
        get: () => h,
        set(e) {
            if (h !== e) {
                const t = c.$imageEl ? c.$imageEl[0] : void 0,
                    s = c.$slideEl ? c.$slideEl[0] : void 0;
                a("zoomChange", e, t, s);
            }
            h = e;
        },
    }),
        s("init", () => {
            e.params.zoom.enabled && k();
        }),
        s("destroy", () => {
            z();
        }),
        s("touchStart", (t, s) => {
            e.zoom.enabled &&
                (function (t) {
                    const s = e.device;
                    c.$imageEl &&
                        0 !== c.$imageEl.length &&
                        (p.isTouched ||
                            (s.android && t.cancelable && t.preventDefault(),
                            (p.isTouched = !0),
                            (p.touchesStart.x = "touchstart" === t.type ? t.targetTouches[0].pageX : t.pageX),
                            (p.touchesStart.y = "touchstart" === t.type ? t.targetTouches[0].pageY : t.pageY)));
                })(s);
        }),
        s("touchEnd", (t, s) => {
            e.zoom.enabled &&
                (function () {
                    const t = e.zoom;
                    if (!c.$imageEl || 0 === c.$imageEl.length) return;
                    if (!p.isTouched || !p.isMoved) return (p.isTouched = !1), void (p.isMoved = !1);
                    (p.isTouched = !1), (p.isMoved = !1);
                    let s = 300,
                        a = 300;
                    const i = u.x * s,
                        r = p.currentX + i,
                        n = u.y * a,
                        l = p.currentY + n;
                    0 !== u.x && (s = Math.abs((r - p.currentX) / u.x)),
                        0 !== u.y && (a = Math.abs((l - p.currentY) / u.y));
                    const o = Math.max(s, a);
                    (p.currentX = r), (p.currentY = l);
                    const d = p.width * t.scale,
                        h = p.height * t.scale;
                    (p.minX = Math.min(c.slideWidth / 2 - d / 2, 0)),
                        (p.maxX = -p.minX),
                        (p.minY = Math.min(c.slideHeight / 2 - h / 2, 0)),
                        (p.maxY = -p.minY),
                        (p.currentX = Math.max(Math.min(p.currentX, p.maxX), p.minX)),
                        (p.currentY = Math.max(Math.min(p.currentY, p.maxY), p.minY)),
                        c.$imageWrapEl.transition(o).transform(`translate3d(${p.currentX}px, ${p.currentY}px,0)`);
                })();
        }),
        s("doubleTap", (t, s) => {
            !e.animating && e.params.zoom.enabled && e.zoom.enabled && e.params.zoom.toggle && E(s);
        }),
        s("transitionEnd", () => {
            e.zoom.enabled && e.params.zoom.enabled && b();
        }),
        s("slideChange", () => {
            e.zoom.enabled && e.params.zoom.enabled && e.params.cssMode && b();
        }),
        Object.assign(e.zoom, { enable: k, disable: z, in: x, out: y, toggle: E });
}
function Lazy({ swiper: e, extendParams: t, on: s, emit: a }) {
    t({
        lazy: {
            checkInView: !1,
            enabled: !1,
            loadPrevNext: !1,
            loadPrevNextAmount: 1,
            loadOnTransitionStart: !1,
            scrollingElement: "",
            elementClass: "swiper-lazy",
            loadingClass: "swiper-lazy-loading",
            loadedClass: "swiper-lazy-loaded",
            preloaderClass: "swiper-lazy-preloader",
        },
    }),
        (e.lazy = {});
    let i = !1,
        r = !1;
    function n(t, s = !0) {
        const i = e.params.lazy;
        if (void 0 === t) return;
        if (0 === e.slides.length) return;
        const r =
                e.virtual && e.params.virtual.enabled
                    ? e.$wrapperEl.children(`.${e.params.slideClass}[data-swiper-slide-index="${t}"]`)
                    : e.slides.eq(t),
            l = r.find(`.${i.elementClass}:not(.${i.loadedClass}):not(.${i.loadingClass})`);
        !r.hasClass(i.elementClass) || r.hasClass(i.loadedClass) || r.hasClass(i.loadingClass) || l.push(r[0]),
            0 !== l.length &&
                l.each((t) => {
                    const l = $(t);
                    l.addClass(i.loadingClass);
                    const o = l.attr("data-background"),
                        d = l.attr("data-src"),
                        c = l.attr("data-srcset"),
                        p = l.attr("data-sizes"),
                        u = l.parent("picture");
                    e.loadImage(l[0], d || o, c, p, !1, () => {
                        if (null != e && e && (!e || e.params) && !e.destroyed) {
                            if (
                                (o
                                    ? (l.css("background-image", `url("${o}")`), l.removeAttr("data-background"))
                                    : (c && (l.attr("srcset", c), l.removeAttr("data-srcset")),
                                      p && (l.attr("sizes", p), l.removeAttr("data-sizes")),
                                      u.length &&
                                          u.children("source").each((e) => {
                                              const t = $(e);
                                              t.attr("data-srcset") &&
                                                  (t.attr("srcset", t.attr("data-srcset")),
                                                  t.removeAttr("data-srcset"));
                                          }),
                                      d && (l.attr("src", d), l.removeAttr("data-src"))),
                                l.addClass(i.loadedClass).removeClass(i.loadingClass),
                                r.find(`.${i.preloaderClass}`).remove(),
                                e.params.loop && s)
                            ) {
                                const t = r.attr("data-swiper-slide-index");
                                if (r.hasClass(e.params.slideDuplicateClass)) {
                                    n(
                                        e.$wrapperEl
                                            .children(
                                                `[data-swiper-slide-index="${t}"]:not(.${e.params.slideDuplicateClass})`
                                            )
                                            .index(),
                                        !1
                                    );
                                } else {
                                    n(
                                        e.$wrapperEl
                                            .children(
                                                `.${e.params.slideDuplicateClass}[data-swiper-slide-index="${t}"]`
                                            )
                                            .index(),
                                        !1
                                    );
                                }
                            }
                            a("lazyImageReady", r[0], l[0]), e.params.autoHeight && e.updateAutoHeight();
                        }
                    }),
                        a("lazyImageLoad", r[0], l[0]);
                });
    }
    function l() {
        const { $wrapperEl: t, params: s, slides: a, activeIndex: i } = e,
            l = e.virtual && s.virtual.enabled,
            o = s.lazy;
        let d = s.slidesPerView;
        function c(e) {
            if (l) {
                if (t.children(`.${s.slideClass}[data-swiper-slide-index="${e}"]`).length) return !0;
            } else if (a[e]) return !0;
            return !1;
        }
        function p(e) {
            return l ? $(e).attr("data-swiper-slide-index") : $(e).index();
        }
        if (("auto" === d && (d = 0), r || (r = !0), e.params.watchSlidesProgress))
            t.children(`.${s.slideVisibleClass}`).each((e) => {
                n(l ? $(e).attr("data-swiper-slide-index") : $(e).index());
            });
        else if (d > 1) for (let e = i; e < i + d; e += 1) c(e) && n(e);
        else n(i);
        if (o.loadPrevNext)
            if (d > 1 || (o.loadPrevNextAmount && o.loadPrevNextAmount > 1)) {
                const e = o.loadPrevNextAmount,
                    t = d,
                    s = Math.min(i + t + Math.max(e, t), a.length),
                    r = Math.max(i - Math.max(t, e), 0);
                for (let e = i + d; e < s; e += 1) c(e) && n(e);
                for (let e = r; e < i; e += 1) c(e) && n(e);
            } else {
                const e = t.children(`.${s.slideNextClass}`);
                e.length > 0 && n(p(e));
                const a = t.children(`.${s.slidePrevClass}`);
                a.length > 0 && n(p(a));
            }
    }
    function o() {
        const t = getWindow();
        if (!e || e.destroyed) return;
        const s = e.params.lazy.scrollingElement ? $(e.params.lazy.scrollingElement) : $(t),
            a = s[0] === t,
            r = a ? t.innerWidth : s[0].offsetWidth,
            n = a ? t.innerHeight : s[0].offsetHeight,
            d = e.$el.offset(),
            { rtlTranslate: c } = e;
        let p = !1;
        c && (d.left -= e.$el[0].scrollLeft);
        const u = [
            [d.left, d.top],
            [d.left + e.width, d.top],
            [d.left, d.top + e.height],
            [d.left + e.width, d.top + e.height],
        ];
        for (let e = 0; e < u.length; e += 1) {
            const t = u[e];
            if (t[0] >= 0 && t[0] <= r && t[1] >= 0 && t[1] <= n) {
                if (0 === t[0] && 0 === t[1]) continue;
                p = !0;
            }
        }
        const h = !(
            "touchstart" !== e.touchEvents.start ||
            !e.support.passiveListener ||
            !e.params.passiveListeners
        ) && { passive: !0, capture: !1 };
        p ? (l(), s.off("scroll", o, h)) : i || ((i = !0), s.on("scroll", o, h));
    }
    s("beforeInit", () => {
        e.params.lazy.enabled && e.params.preloadImages && (e.params.preloadImages = !1);
    }),
        s("init", () => {
            e.params.lazy.enabled && (e.params.lazy.checkInView ? o() : l());
        }),
        s("scroll", () => {
            e.params.freeMode && e.params.freeMode.enabled && !e.params.freeMode.sticky && l();
        }),
        s("scrollbarDragMove resize _freeModeNoMomentumRelease", () => {
            e.params.lazy.enabled && (e.params.lazy.checkInView ? o() : l());
        }),
        s("transitionStart", () => {
            e.params.lazy.enabled &&
                (e.params.lazy.loadOnTransitionStart || (!e.params.lazy.loadOnTransitionStart && !r)) &&
                (e.params.lazy.checkInView ? o() : l());
        }),
        s("transitionEnd", () => {
            e.params.lazy.enabled && !e.params.lazy.loadOnTransitionStart && (e.params.lazy.checkInView ? o() : l());
        }),
        s("slideChange", () => {
            const {
                lazy: t,
                cssMode: s,
                watchSlidesProgress: a,
                touchReleaseOnEdges: i,
                resistanceRatio: r,
            } = e.params;
            t.enabled && (s || (a && (i || 0 === r))) && l();
        }),
        Object.assign(e.lazy, { load: l, loadInSlide: n });
}
function Controller({ swiper: e, extendParams: t, on: s }) {
    function a(e, t) {
        const s = (function () {
            let e, t, s;
            return (a, i) => {
                for (t = -1, e = a.length; e - t > 1; ) (s = (e + t) >> 1), a[s] <= i ? (t = s) : (e = s);
                return e;
            };
        })();
        let a, i;
        return (
            (this.x = e),
            (this.y = t),
            (this.lastIndex = e.length - 1),
            (this.interpolate = function (e) {
                return e
                    ? ((i = s(this.x, e)),
                      (a = i - 1),
                      ((e - this.x[a]) * (this.y[i] - this.y[a])) / (this.x[i] - this.x[a]) + this.y[a])
                    : 0;
            }),
            this
        );
    }
    function i() {
        e.controller.control && e.controller.spline && ((e.controller.spline = void 0), delete e.controller.spline);
    }
    t({ controller: { control: void 0, inverse: !1, by: "slide" } }),
        (e.controller = { control: void 0 }),
        s("beforeInit", () => {
            e.controller.control = e.params.controller.control;
        }),
        s("update", () => {
            i();
        }),
        s("resize", () => {
            i();
        }),
        s("observerUpdate", () => {
            i();
        }),
        s("setTranslate", (t, s, a) => {
            e.controller.control && e.controller.setTranslate(s, a);
        }),
        s("setTransition", (t, s, a) => {
            e.controller.control && e.controller.setTransition(s, a);
        }),
        Object.assign(e.controller, {
            setTranslate: function (t, s) {
                const i = e.controller.control;
                let r, n;
                const l = e.constructor;
                function o(t) {
                    const s = e.rtlTranslate ? -e.translate : e.translate;
                    "slide" === e.params.controller.by &&
                        (!(function (t) {
                            e.controller.spline ||
                                (e.controller.spline = e.params.loop
                                    ? new a(e.slidesGrid, t.slidesGrid)
                                    : new a(e.snapGrid, t.snapGrid));
                        })(t),
                        (n = -e.controller.spline.interpolate(-s))),
                        (n && "container" !== e.params.controller.by) ||
                            ((r = (t.maxTranslate() - t.minTranslate()) / (e.maxTranslate() - e.minTranslate())),
                            (n = (s - e.minTranslate()) * r + t.minTranslate())),
                        e.params.controller.inverse && (n = t.maxTranslate() - n),
                        t.updateProgress(n),
                        t.setTranslate(n, e),
                        t.updateActiveIndex(),
                        t.updateSlidesClasses();
                }
                if (Array.isArray(i)) for (let e = 0; e < i.length; e += 1) i[e] !== s && i[e] instanceof l && o(i[e]);
                else i instanceof l && s !== i && o(i);
            },
            setTransition: function (t, s) {
                const a = e.constructor,
                    i = e.controller.control;
                let r;
                function n(s) {
                    s.setTransition(t, e),
                        0 !== t &&
                            (s.transitionStart(),
                            s.params.autoHeight &&
                                nextTick(() => {
                                    s.updateAutoHeight();
                                }),
                            s.$wrapperEl.transitionEnd(() => {
                                i &&
                                    (s.params.loop && "slide" === e.params.controller.by && s.loopFix(),
                                    s.transitionEnd());
                            }));
                }
                if (Array.isArray(i)) for (r = 0; r < i.length; r += 1) i[r] !== s && i[r] instanceof a && n(i[r]);
                else i instanceof a && s !== i && n(i);
            },
        });
}
function A11y({ swiper: e, extendParams: t, on: s }) {
    t({
        a11y: {
            enabled: !0,
            notificationClass: "swiper-notification",
            prevSlideMessage: "Previous slide",
            nextSlideMessage: "Next slide",
            firstSlideMessage: "This is the first slide",
            lastSlideMessage: "This is the last slide",
            paginationBulletMessage: "Go to slide {{index}}",
            slideLabelMessage: "{{index}} / {{slidesLength}}",
            containerMessage: null,
            containerRoleDescriptionMessage: null,
            itemRoleDescriptionMessage: null,
            slideRole: "group",
        },
    });
    let a = null;
    function i(e) {
        const t = a;
        0 !== t.length && (t.html(""), t.html(e));
    }
    function r(e) {
        e.attr("tabIndex", "0");
    }
    function n(e) {
        e.attr("tabIndex", "-1");
    }
    function l(e, t) {
        e.attr("role", t);
    }
    function o(e, t) {
        e.attr("aria-roledescription", t);
    }
    function d(e, t) {
        e.attr("aria-label", t);
    }
    function c(e) {
        e.attr("aria-disabled", !0);
    }
    function p(e) {
        e.attr("aria-disabled", !1);
    }
    function u(t) {
        if (13 !== t.keyCode && 32 !== t.keyCode) return;
        const s = e.params.a11y,
            a = $(t.target);
        e.navigation &&
            e.navigation.$nextEl &&
            a.is(e.navigation.$nextEl) &&
            ((e.isEnd && !e.params.loop) || e.slideNext(), e.isEnd ? i(s.lastSlideMessage) : i(s.nextSlideMessage)),
            e.navigation &&
                e.navigation.$prevEl &&
                a.is(e.navigation.$prevEl) &&
                ((e.isBeginning && !e.params.loop) || e.slidePrev(),
                e.isBeginning ? i(s.firstSlideMessage) : i(s.prevSlideMessage)),
            e.pagination && a.is(classesToSelector(e.params.pagination.bulletClass)) && a[0].click();
    }
    function h() {
        if (e.params.loop || !e.navigation) return;
        const { $nextEl: t, $prevEl: s } = e.navigation;
        s && s.length > 0 && (e.isBeginning ? (c(s), n(s)) : (p(s), r(s))),
            t && t.length > 0 && (e.isEnd ? (c(t), n(t)) : (p(t), r(t)));
    }
    function m() {
        return e.pagination && e.pagination.bullets && e.pagination.bullets.length;
    }
    function f() {
        return m() && e.params.pagination.clickable;
    }
    const g = (e, t, s) => {
        r(e),
            "BUTTON" !== e[0].tagName && (l(e, "button"), e.on("keydown", u)),
            d(e, s),
            (function (e, t) {
                e.attr("aria-controls", t);
            })(e, t);
    };
    function v() {
        const t = e.params.a11y;
        e.$el.append(a);
        const s = e.$el;
        t.containerRoleDescriptionMessage && o(s, t.containerRoleDescriptionMessage),
            t.containerMessage && d(s, t.containerMessage);
        const i = e.$wrapperEl,
            r =
                i.attr("id") ||
                `swiper-wrapper-${(function (e = 16) {
                    return "x".repeat(e).replace(/x/g, () => Math.round(16 * Math.random()).toString(16));
                })(16)}`,
            n = e.params.autoplay && e.params.autoplay.enabled ? "off" : "polite";
        var c;
        (c = r),
            i.attr("id", c),
            (function (e, t) {
                e.attr("aria-live", t);
            })(i, n),
            t.itemRoleDescriptionMessage && o($(e.slides), t.itemRoleDescriptionMessage),
            l($(e.slides), t.slideRole);
        const p = e.params.loop
            ? e.slides.filter((t) => !t.classList.contains(e.params.slideDuplicateClass)).length
            : e.slides.length;
        let h, m;
        e.slides.each((s, a) => {
            const i = $(s),
                r = e.params.loop ? parseInt(i.attr("data-swiper-slide-index"), 10) : a;
            d(i, t.slideLabelMessage.replace(/\{\{index\}\}/, r + 1).replace(/\{\{slidesLength\}\}/, p));
        }),
            e.navigation && e.navigation.$nextEl && (h = e.navigation.$nextEl),
            e.navigation && e.navigation.$prevEl && (m = e.navigation.$prevEl),
            h && h.length && g(h, r, t.nextSlideMessage),
            m && m.length && g(m, r, t.prevSlideMessage),
            f() && e.pagination.$el.on("keydown", classesToSelector(e.params.pagination.bulletClass), u);
    }
    s("beforeInit", () => {
        a = $(`<span class="${e.params.a11y.notificationClass}" aria-live="assertive" aria-atomic="true"></span>`);
    }),
        s("afterInit", () => {
            e.params.a11y.enabled && (v(), h());
        }),
        s("toEdge", () => {
            e.params.a11y.enabled && h();
        }),
        s("fromEdge", () => {
            e.params.a11y.enabled && h();
        }),
        s("paginationUpdate", () => {
            e.params.a11y.enabled &&
                (function () {
                    const t = e.params.a11y;
                    m() &&
                        e.pagination.bullets.each((s) => {
                            const a = $(s);
                            e.params.pagination.clickable &&
                                (r(a),
                                e.params.pagination.renderBullet ||
                                    (l(a, "button"),
                                    d(a, t.paginationBulletMessage.replace(/\{\{index\}\}/, a.index() + 1)))),
                                a.is(`.${e.params.pagination.bulletActiveClass}`)
                                    ? a.attr("aria-current", "true")
                                    : a.removeAttr("aria-current");
                        });
                })();
        }),
        s("destroy", () => {
            e.params.a11y.enabled &&
                (function () {
                    let t, s;
                    a && a.length > 0 && a.remove(),
                        e.navigation && e.navigation.$nextEl && (t = e.navigation.$nextEl),
                        e.navigation && e.navigation.$prevEl && (s = e.navigation.$prevEl),
                        t && t.off("keydown", u),
                        s && s.off("keydown", u),
                        f() && e.pagination.$el.off("keydown", classesToSelector(e.params.pagination.bulletClass), u);
                })();
        });
}
function History({ swiper: e, extendParams: t, on: s }) {
    t({ history: { enabled: !1, root: "", replaceState: !1, key: "slides" } });
    let a = !1,
        i = {};
    const r = (e) =>
            e
                .toString()
                .replace(/\s+/g, "-")
                .replace(/[^\w-]+/g, "")
                .replace(/--+/g, "-")
                .replace(/^-+/, "")
                .replace(/-+$/, ""),
        n = (e) => {
            const t = getWindow();
            let s;
            s = e ? new URL(e) : t.location;
            const a = s.pathname
                    .slice(1)
                    .split("/")
                    .filter((e) => "" !== e),
                i = a.length;
            return { key: a[i - 2], value: a[i - 1] };
        },
        l = (t, s) => {
            const i = getWindow();
            if (!a || !e.params.history.enabled) return;
            let n;
            n = e.params.url ? new URL(e.params.url) : i.location;
            const l = e.slides.eq(s);
            let o = r(l.attr("data-history"));
            if (e.params.history.root.length > 0) {
                let s = e.params.history.root;
                "/" === s[s.length - 1] && (s = s.slice(0, s.length - 1)), (o = `${s}/${t}/${o}`);
            } else n.pathname.includes(t) || (o = `${t}/${o}`);
            const d = i.history.state;
            (d && d.value === o) ||
                (e.params.history.replaceState
                    ? i.history.replaceState({ value: o }, null, o)
                    : i.history.pushState({ value: o }, null, o));
        },
        o = (t, s, a) => {
            if (s)
                for (let i = 0, n = e.slides.length; i < n; i += 1) {
                    const n = e.slides.eq(i);
                    if (r(n.attr("data-history")) === s && !n.hasClass(e.params.slideDuplicateClass)) {
                        const s = n.index();
                        e.slideTo(s, t, a);
                    }
                }
            else e.slideTo(0, t, a);
        },
        d = () => {
            (i = n(e.params.url)), o(e.params.speed, e.paths.value, !1);
        };
    s("init", () => {
        e.params.history.enabled &&
            (() => {
                const t = getWindow();
                if (e.params.history) {
                    if (!t.history || !t.history.pushState)
                        return (e.params.history.enabled = !1), void (e.params.hashNavigation.enabled = !0);
                    (a = !0),
                        (i = n(e.params.url)),
                        (i.key || i.value) &&
                            (o(0, i.value, e.params.runCallbacksOnInit),
                            e.params.history.replaceState || t.addEventListener("popstate", d));
                }
            })();
    }),
        s("destroy", () => {
            e.params.history.enabled &&
                (() => {
                    const t = getWindow();
                    e.params.history.replaceState || t.removeEventListener("popstate", d);
                })();
        }),
        s("transitionEnd _freeModeNoMomentumRelease", () => {
            a && l(e.params.history.key, e.activeIndex);
        }),
        s("slideChange", () => {
            a && e.params.cssMode && l(e.params.history.key, e.activeIndex);
        });
}
function HashNavigation({ swiper: e, extendParams: t, emit: s, on: a }) {
    let i = !1;
    const r = getDocument(),
        n = getWindow();
    t({ hashNavigation: { enabled: !1, replaceState: !1, watchState: !1 } });
    const l = () => {
            s("hashChange");
            const t = r.location.hash.replace("#", "");
            if (t !== e.slides.eq(e.activeIndex).attr("data-hash")) {
                const s = e.$wrapperEl.children(`.${e.params.slideClass}[data-hash="${t}"]`).index();
                if (void 0 === s) return;
                e.slideTo(s);
            }
        },
        o = () => {
            if (i && e.params.hashNavigation.enabled)
                if (e.params.hashNavigation.replaceState && n.history && n.history.replaceState)
                    n.history.replaceState(null, null, `#${e.slides.eq(e.activeIndex).attr("data-hash")}` || ""),
                        s("hashSet");
                else {
                    const t = e.slides.eq(e.activeIndex),
                        a = t.attr("data-hash") || t.attr("data-history");
                    (r.location.hash = a || ""), s("hashSet");
                }
        };
    a("init", () => {
        e.params.hashNavigation.enabled &&
            (() => {
                if (!e.params.hashNavigation.enabled || (e.params.history && e.params.history.enabled)) return;
                i = !0;
                const t = r.location.hash.replace("#", "");
                if (t) {
                    const s = 0;
                    for (let a = 0, i = e.slides.length; a < i; a += 1) {
                        const i = e.slides.eq(a);
                        if (
                            (i.attr("data-hash") || i.attr("data-history")) === t &&
                            !i.hasClass(e.params.slideDuplicateClass)
                        ) {
                            const t = i.index();
                            e.slideTo(t, s, e.params.runCallbacksOnInit, !0);
                        }
                    }
                }
                e.params.hashNavigation.watchState && $(n).on("hashchange", l);
            })();
    }),
        a("destroy", () => {
            e.params.hashNavigation.enabled && e.params.hashNavigation.watchState && $(n).off("hashchange", l);
        }),
        a("transitionEnd _freeModeNoMomentumRelease", () => {
            i && o();
        }),
        a("slideChange", () => {
            i && e.params.cssMode && o();
        });
}
function Autoplay({ swiper: e, extendParams: t, on: s, emit: a }) {
    let i;
    function r() {
        const t = e.slides.eq(e.activeIndex);
        let s = e.params.autoplay.delay;
        t.attr("data-swiper-autoplay") && (s = t.attr("data-swiper-autoplay") || e.params.autoplay.delay),
            clearTimeout(i),
            (i = nextTick(() => {
                let t;
                e.params.autoplay.reverseDirection
                    ? e.params.loop
                        ? (e.loopFix(), (t = e.slidePrev(e.params.speed, !0, !0)), a("autoplay"))
                        : e.isBeginning
                        ? e.params.autoplay.stopOnLastSlide
                            ? l()
                            : ((t = e.slideTo(e.slides.length - 1, e.params.speed, !0, !0)), a("autoplay"))
                        : ((t = e.slidePrev(e.params.speed, !0, !0)), a("autoplay"))
                    : e.params.loop
                    ? (e.loopFix(), (t = e.slideNext(e.params.speed, !0, !0)), a("autoplay"))
                    : e.isEnd
                    ? e.params.autoplay.stopOnLastSlide
                        ? l()
                        : ((t = e.slideTo(0, e.params.speed, !0, !0)), a("autoplay"))
                    : ((t = e.slideNext(e.params.speed, !0, !0)), a("autoplay")),
                    ((e.params.cssMode && e.autoplay.running) || !1 === t) && r();
            }, s));
    }
    function n() {
        return void 0 === i && !e.autoplay.running && ((e.autoplay.running = !0), a("autoplayStart"), r(), !0);
    }
    function l() {
        return (
            !!e.autoplay.running &&
            void 0 !== i &&
            (i && (clearTimeout(i), (i = void 0)), (e.autoplay.running = !1), a("autoplayStop"), !0)
        );
    }
    function o(t) {
        e.autoplay.running &&
            (e.autoplay.paused ||
                (i && clearTimeout(i),
                (e.autoplay.paused = !0),
                0 !== t && e.params.autoplay.waitForTransition
                    ? ["transitionend", "webkitTransitionEnd"].forEach((t) => {
                          e.$wrapperEl[0].addEventListener(t, c);
                      })
                    : ((e.autoplay.paused = !1), r())));
    }
    function d() {
        const t = getDocument();
        "hidden" === t.visibilityState && e.autoplay.running && o(),
            "visible" === t.visibilityState && e.autoplay.paused && (r(), (e.autoplay.paused = !1));
    }
    function c(t) {
        e &&
            !e.destroyed &&
            e.$wrapperEl &&
            t.target === e.$wrapperEl[0] &&
            (["transitionend", "webkitTransitionEnd"].forEach((t) => {
                e.$wrapperEl[0].removeEventListener(t, c);
            }),
            (e.autoplay.paused = !1),
            e.autoplay.running ? r() : l());
    }
    function p() {
        e.params.autoplay.disableOnInteraction ? l() : o(),
            ["transitionend", "webkitTransitionEnd"].forEach((t) => {
                e.$wrapperEl[0].removeEventListener(t, c);
            });
    }
    function u() {
        e.params.autoplay.disableOnInteraction || ((e.autoplay.paused = !1), r());
    }
    (e.autoplay = { running: !1, paused: !1 }),
        t({
            autoplay: {
                enabled: !1,
                delay: 3e3,
                waitForTransition: !0,
                disableOnInteraction: !0,
                stopOnLastSlide: !1,
                reverseDirection: !1,
                pauseOnMouseEnter: !1,
            },
        }),
        s("init", () => {
            if (e.params.autoplay.enabled) {
                n();
                getDocument().addEventListener("visibilitychange", d),
                    e.params.autoplay.pauseOnMouseEnter && (e.$el.on("mouseenter", p), e.$el.on("mouseleave", u));
            }
        }),
        s("beforeTransitionStart", (t, s, a) => {
            e.autoplay.running && (a || !e.params.autoplay.disableOnInteraction ? e.autoplay.pause(s) : l());
        }),
        s("sliderFirstMove", () => {
            e.autoplay.running && (e.params.autoplay.disableOnInteraction ? l() : o());
        }),
        s("touchEnd", () => {
            e.params.cssMode && e.autoplay.paused && !e.params.autoplay.disableOnInteraction && r();
        }),
        s("destroy", () => {
            e.$el.off("mouseenter", p), e.$el.off("mouseleave", u), e.autoplay.running && l();
            getDocument().removeEventListener("visibilitychange", d);
        }),
        Object.assign(e.autoplay, { pause: o, run: r, start: n, stop: l });
}
function Thumb({ swiper: e, extendParams: t, on: s }) {
    t({
        thumbs: {
            swiper: null,
            multipleActiveThumbs: !0,
            autoScrollOffset: 0,
            slideThumbActiveClass: "swiper-slide-thumb-active",
            thumbsContainerClass: "swiper-thumbs",
        },
    });
    let a = !1,
        i = !1;
    function r() {
        const t = e.thumbs.swiper;
        if (!t) return;
        const s = t.clickedIndex,
            a = t.clickedSlide;
        if (a && $(a).hasClass(e.params.thumbs.slideThumbActiveClass)) return;
        if (null == s) return;
        let i;
        if (
            ((i = t.params.loop ? parseInt($(t.clickedSlide).attr("data-swiper-slide-index"), 10) : s), e.params.loop)
        ) {
            let t = e.activeIndex;
            e.slides.eq(t).hasClass(e.params.slideDuplicateClass) &&
                (e.loopFix(), (e._clientLeft = e.$wrapperEl[0].clientLeft), (t = e.activeIndex));
            const s = e.slides.eq(t).prevAll(`[data-swiper-slide-index="${i}"]`).eq(0).index(),
                a = e.slides.eq(t).nextAll(`[data-swiper-slide-index="${i}"]`).eq(0).index();
            i = void 0 === s ? a : void 0 === a ? s : a - t < t - s ? a : s;
        }
        e.slideTo(i);
    }
    function n() {
        const { thumbs: t } = e.params;
        if (a) return !1;
        a = !0;
        const s = e.constructor;
        if (t.swiper instanceof s)
            (e.thumbs.swiper = t.swiper),
                Object.assign(e.thumbs.swiper.originalParams, { watchSlidesProgress: !0, slideToClickedSlide: !1 }),
                Object.assign(e.thumbs.swiper.params, { watchSlidesProgress: !0, slideToClickedSlide: !1 });
        else if (isObject(t.swiper)) {
            const a = Object.assign({}, t.swiper);
            Object.assign(a, { watchSlidesProgress: !0, slideToClickedSlide: !1 }),
                (e.thumbs.swiper = new s(a)),
                (i = !0);
        }
        return e.thumbs.swiper.$el.addClass(e.params.thumbs.thumbsContainerClass), e.thumbs.swiper.on("tap", r), !0;
    }
    function l(t) {
        const s = e.thumbs.swiper;
        if (!s) return;
        const a = "auto" === s.params.slidesPerView ? s.slidesPerViewDynamic() : s.params.slidesPerView,
            i = e.params.thumbs.autoScrollOffset,
            r = i && !s.params.loop;
        if (e.realIndex !== s.realIndex || r) {
            let n,
                l,
                o = s.activeIndex;
            if (s.params.loop) {
                s.slides.eq(o).hasClass(s.params.slideDuplicateClass) &&
                    (s.loopFix(), (s._clientLeft = s.$wrapperEl[0].clientLeft), (o = s.activeIndex));
                const t = s.slides.eq(o).prevAll(`[data-swiper-slide-index="${e.realIndex}"]`).eq(0).index(),
                    a = s.slides.eq(o).nextAll(`[data-swiper-slide-index="${e.realIndex}"]`).eq(0).index();
                (n =
                    void 0 === t
                        ? a
                        : void 0 === a
                        ? t
                        : a - o == o - t
                        ? s.params.slidesPerGroup > 1
                            ? a
                            : o
                        : a - o < o - t
                        ? a
                        : t),
                    (l = e.activeIndex > e.previousIndex ? "next" : "prev");
            } else (n = e.realIndex), (l = n > e.previousIndex ? "next" : "prev");
            r && (n += "next" === l ? i : -1 * i),
                s.visibleSlidesIndexes &&
                    s.visibleSlidesIndexes.indexOf(n) < 0 &&
                    (s.params.centeredSlides
                        ? (n = n > o ? n - Math.floor(a / 2) + 1 : n + Math.floor(a / 2) - 1)
                        : n > o && s.params.slidesPerGroup,
                    s.slideTo(n, t ? 0 : void 0));
        }
        let n = 1;
        const l = e.params.thumbs.slideThumbActiveClass;
        if (
            (e.params.slidesPerView > 1 && !e.params.centeredSlides && (n = e.params.slidesPerView),
            e.params.thumbs.multipleActiveThumbs || (n = 1),
            (n = Math.floor(n)),
            s.slides.removeClass(l),
            s.params.loop || (s.params.virtual && s.params.virtual.enabled))
        )
            for (let t = 0; t < n; t += 1)
                s.$wrapperEl.children(`[data-swiper-slide-index="${e.realIndex + t}"]`).addClass(l);
        else for (let t = 0; t < n; t += 1) s.slides.eq(e.realIndex + t).addClass(l);
    }
    (e.thumbs = { swiper: null }),
        s("beforeInit", () => {
            const { thumbs: t } = e.params;
            t && t.swiper && (n(), l(!0));
        }),
        s("slideChange update resize observerUpdate", () => {
            e.thumbs.swiper && l();
        }),
        s("setTransition", (t, s) => {
            const a = e.thumbs.swiper;
            a && a.setTransition(s);
        }),
        s("beforeDestroy", () => {
            const t = e.thumbs.swiper;
            t && i && t && t.destroy();
        }),
        Object.assign(e.thumbs, { init: n, update: l });
}
function freeMode({ swiper: e, extendParams: t, emit: s, once: a }) {
    t({
        freeMode: {
            enabled: !1,
            momentum: !0,
            momentumRatio: 1,
            momentumBounce: !0,
            momentumBounceRatio: 1,
            momentumVelocityRatio: 1,
            sticky: !1,
            minimumVelocity: 0.02,
        },
    }),
        Object.assign(e, {
            freeMode: {
                onTouchMove: function () {
                    const { touchEventsData: t, touches: s } = e;
                    0 === t.velocities.length &&
                        t.velocities.push({
                            position: s[e.isHorizontal() ? "startX" : "startY"],
                            time: t.touchStartTime,
                        }),
                        t.velocities.push({ position: s[e.isHorizontal() ? "currentX" : "currentY"], time: now() });
                },
                onTouchEnd: function ({ currentPos: t }) {
                    const { params: i, $wrapperEl: r, rtlTranslate: n, snapGrid: l, touchEventsData: o } = e,
                        d = now() - o.touchStartTime;
                    if (t < -e.minTranslate()) e.slideTo(e.activeIndex);
                    else if (t > -e.maxTranslate())
                        e.slides.length < l.length ? e.slideTo(l.length - 1) : e.slideTo(e.slides.length - 1);
                    else {
                        if (i.freeMode.momentum) {
                            if (o.velocities.length > 1) {
                                const t = o.velocities.pop(),
                                    s = o.velocities.pop(),
                                    a = t.position - s.position,
                                    r = t.time - s.time;
                                (e.velocity = a / r),
                                    (e.velocity /= 2),
                                    Math.abs(e.velocity) < i.freeMode.minimumVelocity && (e.velocity = 0),
                                    (r > 150 || now() - t.time > 300) && (e.velocity = 0);
                            } else e.velocity = 0;
                            (e.velocity *= i.freeMode.momentumVelocityRatio), (o.velocities.length = 0);
                            let t = 1e3 * i.freeMode.momentumRatio;
                            const d = e.velocity * t;
                            let c = e.translate + d;
                            n && (c = -c);
                            let p,
                                u = !1;
                            const h = 20 * Math.abs(e.velocity) * i.freeMode.momentumBounceRatio;
                            let m;
                            if (c < e.maxTranslate())
                                i.freeMode.momentumBounce
                                    ? (c + e.maxTranslate() < -h && (c = e.maxTranslate() - h),
                                      (p = e.maxTranslate()),
                                      (u = !0),
                                      (o.allowMomentumBounce = !0))
                                    : (c = e.maxTranslate()),
                                    i.loop && i.centeredSlides && (m = !0);
                            else if (c > e.minTranslate())
                                i.freeMode.momentumBounce
                                    ? (c - e.minTranslate() > h && (c = e.minTranslate() + h),
                                      (p = e.minTranslate()),
                                      (u = !0),
                                      (o.allowMomentumBounce = !0))
                                    : (c = e.minTranslate()),
                                    i.loop && i.centeredSlides && (m = !0);
                            else if (i.freeMode.sticky) {
                                let t;
                                for (let e = 0; e < l.length; e += 1)
                                    if (l[e] > -c) {
                                        t = e;
                                        break;
                                    }
                                (c =
                                    Math.abs(l[t] - c) < Math.abs(l[t - 1] - c) || "next" === e.swipeDirection
                                        ? l[t]
                                        : l[t - 1]),
                                    (c = -c);
                            }
                            if (
                                (m &&
                                    a("transitionEnd", () => {
                                        e.loopFix();
                                    }),
                                0 !== e.velocity)
                            ) {
                                if (
                                    ((t = n
                                        ? Math.abs((-c - e.translate) / e.velocity)
                                        : Math.abs((c - e.translate) / e.velocity)),
                                    i.freeMode.sticky)
                                ) {
                                    const s = Math.abs((n ? -c : c) - e.translate),
                                        a = e.slidesSizesGrid[e.activeIndex];
                                    t = s < a ? i.speed : s < 2 * a ? 1.5 * i.speed : 2.5 * i.speed;
                                }
                            } else if (i.freeMode.sticky) return void e.slideToClosest();
                            i.freeMode.momentumBounce && u
                                ? (e.updateProgress(p),
                                  e.setTransition(t),
                                  e.setTranslate(c),
                                  e.transitionStart(!0, e.swipeDirection),
                                  (e.animating = !0),
                                  r.transitionEnd(() => {
                                      e &&
                                          !e.destroyed &&
                                          o.allowMomentumBounce &&
                                          (s("momentumBounce"),
                                          e.setTransition(i.speed),
                                          setTimeout(() => {
                                              e.setTranslate(p),
                                                  r.transitionEnd(() => {
                                                      e && !e.destroyed && e.transitionEnd();
                                                  });
                                          }, 0));
                                  }))
                                : e.velocity
                                ? (s("_freeModeNoMomentumRelease"),
                                  e.updateProgress(c),
                                  e.setTransition(t),
                                  e.setTranslate(c),
                                  e.transitionStart(!0, e.swipeDirection),
                                  e.animating ||
                                      ((e.animating = !0),
                                      r.transitionEnd(() => {
                                          e && !e.destroyed && e.transitionEnd();
                                      })))
                                : e.updateProgress(c),
                                e.updateActiveIndex(),
                                e.updateSlidesClasses();
                        } else {
                            if (i.freeMode.sticky) return void e.slideToClosest();
                            i.freeMode && s("_freeModeNoMomentumRelease");
                        }
                        (!i.freeMode.momentum || d >= i.longSwipesMs) &&
                            (e.updateProgress(), e.updateActiveIndex(), e.updateSlidesClasses());
                    }
                },
            },
        });
}
function Grid({ swiper: e, extendParams: t }) {
    let s, a, i;
    t({ grid: { rows: 1, fill: "column" } });
    e.grid = {
        initSlides: (t) => {
            const { slidesPerView: r } = e.params,
                { rows: n, fill: l } = e.params.grid;
            (a = s / n),
                (i = Math.floor(t / n)),
                (s = Math.floor(t / n) === t / n ? t : Math.ceil(t / n) * n),
                "auto" !== r && "row" === l && (s = Math.max(s, r * n));
        },
        updateSlide: (t, r, n, l) => {
            const { slidesPerGroup: o, spaceBetween: d } = e.params,
                { rows: c, fill: p } = e.params.grid;
            let u, h, m;
            if ("row" === p && o > 1) {
                const e = Math.floor(t / (o * c)),
                    a = t - c * o * e,
                    i = 0 === e ? o : Math.min(Math.ceil((n - e * c * o) / c), o);
                (m = Math.floor(a / i)),
                    (h = a - m * i + e * o),
                    (u = h + (m * s) / c),
                    r.css({ "-webkit-order": u, order: u });
            } else
                "column" === p
                    ? ((h = Math.floor(t / c)),
                      (m = t - h * c),
                      (h > i || (h === i && m === c - 1)) && ((m += 1), m >= c && ((m = 0), (h += 1))))
                    : ((m = Math.floor(t / a)), (h = t - m * a));
            r.css(l("margin-top"), 0 !== m ? d && `${d}px` : "");
        },
        updateWrapperSize: (t, a, i) => {
            const { spaceBetween: r, centeredSlides: n, roundLengths: l } = e.params,
                { rows: o } = e.params.grid;
            if (
                ((e.virtualSize = (t + r) * s),
                (e.virtualSize = Math.ceil(e.virtualSize / o) - r),
                e.$wrapperEl.css({ [i("width")]: `${e.virtualSize + r}px` }),
                n)
            ) {
                a.splice(0, a.length);
                const t = [];
                for (let s = 0; s < a.length; s += 1) {
                    let i = a[s];
                    l && (i = Math.floor(i)), a[s] < e.virtualSize + a[0] && t.push(i);
                }
                a.push(...t);
            }
        },
    };
}
function appendSlide(e) {
    const t = this,
        { $wrapperEl: s, params: a } = t;
    if ((a.loop && t.loopDestroy(), "object" == typeof e && "length" in e))
        for (let t = 0; t < e.length; t += 1) e[t] && s.append(e[t]);
    else s.append(e);
    a.loop && t.loopCreate(), a.observer || t.update();
}
function prependSlide(e) {
    const t = this,
        { params: s, $wrapperEl: a, activeIndex: i } = t;
    s.loop && t.loopDestroy();
    let r = i + 1;
    if ("object" == typeof e && "length" in e) {
        for (let t = 0; t < e.length; t += 1) e[t] && a.prepend(e[t]);
        r = i + e.length;
    } else a.prepend(e);
    s.loop && t.loopCreate(), s.observer || t.update(), t.slideTo(r, 0, !1);
}
function addSlide(e, t) {
    const s = this,
        { $wrapperEl: a, params: i, activeIndex: r } = s;
    let n = r;
    i.loop && ((n -= s.loopedSlides), s.loopDestroy(), (s.slides = a.children(`.${i.slideClass}`)));
    const l = s.slides.length;
    if (e <= 0) return void s.prependSlide(t);
    if (e >= l) return void s.appendSlide(t);
    let o = n > e ? n + 1 : n;
    const d = [];
    for (let t = l - 1; t >= e; t -= 1) {
        const e = s.slides.eq(t);
        e.remove(), d.unshift(e);
    }
    if ("object" == typeof t && "length" in t) {
        for (let e = 0; e < t.length; e += 1) t[e] && a.append(t[e]);
        o = n > e ? n + t.length : n;
    } else a.append(t);
    for (let e = 0; e < d.length; e += 1) a.append(d[e]);
    i.loop && s.loopCreate(),
        i.observer || s.update(),
        i.loop ? s.slideTo(o + s.loopedSlides, 0, !1) : s.slideTo(o, 0, !1);
}
function removeSlide(e) {
    const t = this,
        { params: s, $wrapperEl: a, activeIndex: i } = t;
    let r = i;
    s.loop && ((r -= t.loopedSlides), t.loopDestroy(), (t.slides = a.children(`.${s.slideClass}`)));
    let n,
        l = r;
    if ("object" == typeof e && "length" in e) {
        for (let s = 0; s < e.length; s += 1) (n = e[s]), t.slides[n] && t.slides.eq(n).remove(), n < l && (l -= 1);
        l = Math.max(l, 0);
    } else (n = e), t.slides[n] && t.slides.eq(n).remove(), n < l && (l -= 1), (l = Math.max(l, 0));
    s.loop && t.loopCreate(),
        s.observer || t.update(),
        s.loop ? t.slideTo(l + t.loopedSlides, 0, !1) : t.slideTo(l, 0, !1);
}
function removeAllSlides() {
    const e = this,
        t = [];
    for (let s = 0; s < e.slides.length; s += 1) t.push(s);
    e.removeSlide(t);
}
function Manipulation({ swiper: e }) {
    Object.assign(e, {
        appendSlide: appendSlide.bind(e),
        prependSlide: prependSlide.bind(e),
        addSlide: addSlide.bind(e),
        removeSlide: removeSlide.bind(e),
        removeAllSlides: removeAllSlides.bind(e),
    });
}
function effectInit(e) {
    const { effect: t, swiper: s, on: a, setTranslate: i, setTransition: r, overwriteParams: n, perspective: l } = e;
    a("beforeInit", () => {
        if (s.params.effect !== t) return;
        s.classNames.push(`${s.params.containerModifierClass}${t}`),
            l && l() && s.classNames.push(`${s.params.containerModifierClass}3d`);
        const e = n ? n() : {};
        Object.assign(s.params, e), Object.assign(s.originalParams, e);
    }),
        a("setTranslate", () => {
            s.params.effect === t && i();
        }),
        a("setTransition", (e, a) => {
            s.params.effect === t && r(a);
        });
}
function effectTarget(e, t) {
    return e.transformEl
        ? t.find(e.transformEl).css({ "backface-visibility": "hidden", "-webkit-backface-visibility": "hidden" })
        : t;
}
function effectVirtualTransitionEnd({ swiper: e, duration: t, transformEl: s, allSlides: a }) {
    const { slides: i, activeIndex: r, $wrapperEl: n } = e;
    if (e.params.virtualTranslate && 0 !== t) {
        let t,
            l = !1;
        (t = a ? (s ? i.find(s) : i) : s ? i.eq(r).find(s) : i.eq(r)),
            t.transitionEnd(() => {
                if (l) return;
                if (!e || e.destroyed) return;
                (l = !0), (e.animating = !1);
                const t = ["webkitTransitionEnd", "transitionend"];
                for (let e = 0; e < t.length; e += 1) n.trigger(t[e]);
            });
    }
}
function EffectFade({ swiper: e, extendParams: t, on: s }) {
    t({ fadeEffect: { crossFade: !1, transformEl: null } });
    effectInit({
        effect: "fade",
        swiper: e,
        on: s,
        setTranslate: () => {
            const { slides: t } = e,
                s = e.params.fadeEffect;
            for (let a = 0; a < t.length; a += 1) {
                const t = e.slides.eq(a);
                let i = -t[0].swiperSlideOffset;
                e.params.virtualTranslate || (i -= e.translate);
                let r = 0;
                e.isHorizontal() || ((r = i), (i = 0));
                const n = e.params.fadeEffect.crossFade
                    ? Math.max(1 - Math.abs(t[0].progress), 0)
                    : 1 + Math.min(Math.max(t[0].progress, -1), 0);
                effectTarget(s, t).css({ opacity: n }).transform(`translate3d(${i}px, ${r}px, 0px)`);
            }
        },
        setTransition: (t) => {
            const { transformEl: s } = e.params.fadeEffect;
            (s ? e.slides.find(s) : e.slides).transition(t),
                effectVirtualTransitionEnd({ swiper: e, duration: t, transformEl: s, allSlides: !0 });
        },
        overwriteParams: () => ({
            slidesPerView: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: !0,
            spaceBetween: 0,
            virtualTranslate: !e.params.cssMode,
        }),
    });
}
function EffectCube({ swiper: e, extendParams: t, on: s }) {
    t({ cubeEffect: { slideShadows: !0, shadow: !0, shadowOffset: 20, shadowScale: 0.94 } });
    effectInit({
        effect: "cube",
        swiper: e,
        on: s,
        setTranslate: () => {
            const { $el: t, $wrapperEl: s, slides: a, width: i, height: r, rtlTranslate: n, size: l, browser: o } = e,
                d = e.params.cubeEffect,
                c = e.isHorizontal(),
                p = e.virtual && e.params.virtual.enabled;
            let u,
                h = 0;
            d.shadow &&
                (c
                    ? ((u = s.find(".swiper-cube-shadow")),
                      0 === u.length && ((u = $('<div class="swiper-cube-shadow"></div>')), s.append(u)),
                      u.css({ height: `${i}px` }))
                    : ((u = t.find(".swiper-cube-shadow")),
                      0 === u.length && ((u = $('<div class="swiper-cube-shadow"></div>')), t.append(u))));
            for (let e = 0; e < a.length; e += 1) {
                const t = a.eq(e);
                let s = e;
                p && (s = parseInt(t.attr("data-swiper-slide-index"), 10));
                let i = 90 * s,
                    r = Math.floor(i / 360);
                n && ((i = -i), (r = Math.floor(-i / 360)));
                const o = Math.max(Math.min(t[0].progress, 1), -1);
                let u = 0,
                    m = 0,
                    f = 0;
                s % 4 == 0
                    ? ((u = 4 * -r * l), (f = 0))
                    : (s - 1) % 4 == 0
                    ? ((u = 0), (f = 4 * -r * l))
                    : (s - 2) % 4 == 0
                    ? ((u = l + 4 * r * l), (f = l))
                    : (s - 3) % 4 == 0 && ((u = -l), (f = 3 * l + 4 * l * r)),
                    n && (u = -u),
                    c || ((m = u), (u = 0));
                const g = `rotateX(${c ? 0 : -i}deg) rotateY(${c ? i : 0}deg) translate3d(${u}px, ${m}px, ${f}px)`;
                if (
                    (o <= 1 && o > -1 && ((h = 90 * s + 90 * o), n && (h = 90 * -s - 90 * o)),
                    t.transform(g),
                    d.slideShadows)
                ) {
                    let e = c ? t.find(".swiper-slide-shadow-left") : t.find(".swiper-slide-shadow-top"),
                        s = c ? t.find(".swiper-slide-shadow-right") : t.find(".swiper-slide-shadow-bottom");
                    0 === e.length &&
                        ((e = $(`<div class="swiper-slide-shadow-${c ? "left" : "top"}"></div>`)), t.append(e)),
                        0 === s.length &&
                            ((s = $(`<div class="swiper-slide-shadow-${c ? "right" : "bottom"}"></div>`)), t.append(s)),
                        e.length && (e[0].style.opacity = Math.max(-o, 0)),
                        s.length && (s[0].style.opacity = Math.max(o, 0));
                }
            }
            if (
                (s.css({
                    "-webkit-transform-origin": `50% 50% -${l / 2}px`,
                    "transform-origin": `50% 50% -${l / 2}px`,
                }),
                d.shadow)
            )
                if (c)
                    u.transform(
                        `translate3d(0px, ${i / 2 + d.shadowOffset}px, ${
                            -i / 2
                        }px) rotateX(90deg) rotateZ(0deg) scale(${d.shadowScale})`
                    );
                else {
                    const e = Math.abs(h) - 90 * Math.floor(Math.abs(h) / 90),
                        t = 1.5 - (Math.sin((2 * e * Math.PI) / 360) / 2 + Math.cos((2 * e * Math.PI) / 360) / 2),
                        s = d.shadowScale,
                        a = d.shadowScale / t,
                        i = d.shadowOffset;
                    u.transform(
                        `scale3d(${s}, 1, ${a}) translate3d(0px, ${r / 2 + i}px, ${-r / 2 / a}px) rotateX(-90deg)`
                    );
                }
            const m = o.isSafari || o.isWebView ? -l / 2 : 0;
            s.transform(
                `translate3d(0px,0,${m}px) rotateX(${e.isHorizontal() ? 0 : h}deg) rotateY(${
                    e.isHorizontal() ? -h : 0
                }deg)`
            );
        },
        setTransition: (t) => {
            const { $el: s, slides: a } = e;
            a
                .transition(t)
                .find(
                    ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
                )
                .transition(t),
                e.params.cubeEffect.shadow && !e.isHorizontal() && s.find(".swiper-cube-shadow").transition(t);
        },
        perspective: () => !0,
        overwriteParams: () => ({
            slidesPerView: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: !0,
            resistanceRatio: 0,
            spaceBetween: 0,
            centeredSlides: !1,
            virtualTranslate: !0,
        }),
    });
}
function createShadow(e, t, s) {
    const a = "swiper-slide-shadow" + (s ? `-${s}` : ""),
        i = e.transformEl ? t.find(e.transformEl) : t;
    let r = i.children(`.${a}`);
    return r.length || ((r = $(`<div class="swiper-slide-shadow${s ? `-${s}` : ""}"></div>`)), i.append(r)), r;
}
function EffectFlip({ swiper: e, extendParams: t, on: s }) {
    t({ flipEffect: { slideShadows: !0, limitRotation: !0, transformEl: null } });
    effectInit({
        effect: "flip",
        swiper: e,
        on: s,
        setTranslate: () => {
            const { slides: t, rtlTranslate: s } = e,
                a = e.params.flipEffect;
            for (let i = 0; i < t.length; i += 1) {
                const r = t.eq(i);
                let n = r[0].progress;
                e.params.flipEffect.limitRotation && (n = Math.max(Math.min(r[0].progress, 1), -1));
                const l = r[0].swiperSlideOffset;
                let o = -180 * n,
                    d = 0,
                    c = e.params.cssMode ? -l - e.translate : -l,
                    p = 0;
                if (
                    (e.isHorizontal() ? s && (o = -o) : ((p = c), (c = 0), (d = -o), (o = 0)),
                    (r[0].style.zIndex = -Math.abs(Math.round(n)) + t.length),
                    a.slideShadows)
                ) {
                    let t = e.isHorizontal() ? r.find(".swiper-slide-shadow-left") : r.find(".swiper-slide-shadow-top"),
                        s = e.isHorizontal()
                            ? r.find(".swiper-slide-shadow-right")
                            : r.find(".swiper-slide-shadow-bottom");
                    0 === t.length && (t = createShadow(a, r, e.isHorizontal() ? "left" : "top")),
                        0 === s.length && (s = createShadow(a, r, e.isHorizontal() ? "right" : "bottom")),
                        t.length && (t[0].style.opacity = Math.max(-n, 0)),
                        s.length && (s[0].style.opacity = Math.max(n, 0));
                }
                const u = `translate3d(${c}px, ${p}px, 0px) rotateX(${d}deg) rotateY(${o}deg)`;
                effectTarget(a, r).transform(u);
            }
        },
        setTransition: (t) => {
            const { transformEl: s } = e.params.flipEffect;
            (s ? e.slides.find(s) : e.slides)
                .transition(t)
                .find(
                    ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
                )
                .transition(t),
                effectVirtualTransitionEnd({ swiper: e, duration: t, transformEl: s });
        },
        perspective: () => !0,
        overwriteParams: () => ({
            slidesPerView: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: !0,
            spaceBetween: 0,
            virtualTranslate: !e.params.cssMode,
        }),
    });
}
function EffectCoverflow({ swiper: e, extendParams: t, on: s }) {
    t({
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            scale: 1,
            modifier: 1,
            slideShadows: !0,
            transformEl: null,
        },
    });
    effectInit({
        effect: "coverflow",
        swiper: e,
        on: s,
        setTranslate: () => {
            const { width: t, height: s, slides: a, slidesSizesGrid: i } = e,
                r = e.params.coverflowEffect,
                n = e.isHorizontal(),
                l = e.translate,
                o = n ? t / 2 - l : s / 2 - l,
                d = n ? r.rotate : -r.rotate,
                c = r.depth;
            for (let e = 0, t = a.length; e < t; e += 1) {
                const t = a.eq(e),
                    s = i[e],
                    l = ((o - t[0].swiperSlideOffset - s / 2) / s) * r.modifier;
                let p = n ? d * l : 0,
                    u = n ? 0 : d * l,
                    h = -c * Math.abs(l),
                    m = r.stretch;
                "string" == typeof m && -1 !== m.indexOf("%") && (m = (parseFloat(r.stretch) / 100) * s);
                let f = n ? 0 : m * l,
                    g = n ? m * l : 0,
                    v = 1 - (1 - r.scale) * Math.abs(l);
                Math.abs(g) < 0.001 && (g = 0),
                    Math.abs(f) < 0.001 && (f = 0),
                    Math.abs(h) < 0.001 && (h = 0),
                    Math.abs(p) < 0.001 && (p = 0),
                    Math.abs(u) < 0.001 && (u = 0),
                    Math.abs(v) < 0.001 && (v = 0);
                const w = `translate3d(${g}px,${f}px,${h}px)  rotateX(${u}deg) rotateY(${p}deg) scale(${v})`;
                if (
                    (effectTarget(r, t).transform(w), (t[0].style.zIndex = 1 - Math.abs(Math.round(l))), r.slideShadows)
                ) {
                    let e = n ? t.find(".swiper-slide-shadow-left") : t.find(".swiper-slide-shadow-top"),
                        s = n ? t.find(".swiper-slide-shadow-right") : t.find(".swiper-slide-shadow-bottom");
                    0 === e.length && (e = createShadow(r, t, n ? "left" : "top")),
                        0 === s.length && (s = createShadow(r, t, n ? "right" : "bottom")),
                        e.length && (e[0].style.opacity = l > 0 ? l : 0),
                        s.length && (s[0].style.opacity = -l > 0 ? -l : 0);
                }
            }
        },
        setTransition: (t) => {
            const { transformEl: s } = e.params.coverflowEffect;
            (s ? e.slides.find(s) : e.slides)
                .transition(t)
                .find(
                    ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
                )
                .transition(t);
        },
        perspective: () => !0,
        overwriteParams: () => ({ watchSlidesProgress: !0 }),
    });
}
function EffectCreative({ swiper: e, extendParams: t, on: s }) {
    t({
        creativeEffect: {
            transformEl: null,
            limitProgress: 1,
            shadowPerProgress: !1,
            progressMultiplier: 1,
            perspective: !0,
            prev: { translate: [0, 0, 0], rotate: [0, 0, 0], opacity: 1, scale: 1 },
            next: { translate: [0, 0, 0], rotate: [0, 0, 0], opacity: 1, scale: 1 },
        },
    });
    const a = (e) => ("string" == typeof e ? e : `${e}px`);
    effectInit({
        effect: "creative",
        swiper: e,
        on: s,
        setTranslate: () => {
            const { slides: t, $wrapperEl: s, slidesSizesGrid: i } = e,
                r = e.params.creativeEffect,
                { progressMultiplier: n } = r,
                l = e.params.centeredSlides;
            if (l) {
                const t = i[0] / 2 - e.params.slidesOffsetBefore || 0;
                s.transform(`translateX(calc(50% - ${t}px))`);
            }
            for (let s = 0; s < t.length; s += 1) {
                const i = t.eq(s),
                    o = i[0].progress,
                    d = Math.min(Math.max(i[0].progress, -r.limitProgress), r.limitProgress);
                let c = d;
                l || (c = Math.min(Math.max(i[0].originalProgress, -r.limitProgress), r.limitProgress));
                const p = i[0].swiperSlideOffset,
                    u = [e.params.cssMode ? -p - e.translate : -p, 0, 0],
                    h = [0, 0, 0];
                let m = !1;
                e.isHorizontal() || ((u[1] = u[0]), (u[0] = 0));
                let f = { translate: [0, 0, 0], rotate: [0, 0, 0], scale: 1, opacity: 1 };
                d < 0 ? ((f = r.next), (m = !0)) : d > 0 && ((f = r.prev), (m = !0)),
                    u.forEach((e, t) => {
                        u[t] = `calc(${e}px + (${a(f.translate[t])} * ${Math.abs(d * n)}))`;
                    }),
                    h.forEach((e, t) => {
                        h[t] = f.rotate[t] * Math.abs(d * n);
                    }),
                    (i[0].style.zIndex = -Math.abs(Math.round(o)) + t.length);
                const g = u.join(", "),
                    v = `rotateX(${h[0]}deg) rotateY(${h[1]}deg) rotateZ(${h[2]}deg)`,
                    w = c < 0 ? `scale(${1 + (1 - f.scale) * c * n})` : `scale(${1 - (1 - f.scale) * c * n})`,
                    b = c < 0 ? 1 + (1 - f.opacity) * c * n : 1 - (1 - f.opacity) * c * n,
                    x = `translate3d(${g}) ${v} ${w}`;
                if ((m && f.shadow) || !m) {
                    let e = i.children(".swiper-slide-shadow");
                    if ((0 === e.length && f.shadow && (e = createShadow(r, i)), e.length)) {
                        const t = r.shadowPerProgress ? d * (1 / r.limitProgress) : d;
                        e[0].style.opacity = Math.min(Math.max(Math.abs(t), 0), 1);
                    }
                }
                const y = effectTarget(r, i);
                y.transform(x).css({ opacity: b }), f.origin && y.css("transform-origin", f.origin);
            }
        },
        setTransition: (t) => {
            const { transformEl: s } = e.params.creativeEffect;
            (s ? e.slides.find(s) : e.slides).transition(t).find(".swiper-slide-shadow").transition(t),
                effectVirtualTransitionEnd({ swiper: e, duration: t, transformEl: s, allSlides: !0 });
        },
        perspective: () => e.params.creativeEffect.perspective,
        overwriteParams: () => ({ watchSlidesProgress: !0, virtualTranslate: !e.params.cssMode }),
    });
}
function EffectCards({ swiper: e, extendParams: t, on: s }) {
    t({ cardsEffect: { slideShadows: !0, transformEl: null } });
    effectInit({
        effect: "cards",
        swiper: e,
        on: s,
        setTranslate: () => {
            const { slides: t, activeIndex: s } = e,
                a = e.params.cardsEffect,
                { startTranslate: i, isTouched: r } = e.touchEventsData,
                n = e.translate;
            for (let l = 0; l < t.length; l += 1) {
                const o = t.eq(l),
                    d = o[0].progress,
                    c = Math.min(Math.max(d, -4), 4);
                let p = o[0].swiperSlideOffset;
                e.params.centeredSlides &&
                    !e.params.cssMode &&
                    e.$wrapperEl.transform(`translateX(${e.minTranslate()}px)`),
                    e.params.centeredSlides && e.params.cssMode && (p -= t[0].swiperSlideOffset);
                let u = e.params.cssMode ? -p - e.translate : -p,
                    h = 0;
                const m = -100 * Math.abs(c);
                let f = 1,
                    g = -2 * c,
                    v = 8 - 0.75 * Math.abs(c);
                const w = (l === s || l === s - 1) && c > 0 && c < 1 && (r || e.params.cssMode) && n < i,
                    b = (l === s || l === s + 1) && c < 0 && c > -1 && (r || e.params.cssMode) && n > i;
                if (w || b) {
                    const e = (1 - Math.abs((Math.abs(c) - 0.5) / 0.5)) ** 0.5;
                    (g += -28 * c * e), (f += -0.5 * e), (v += 96 * e), (h = -25 * e * Math.abs(c) + "%");
                }
                if (
                    ((u =
                        c < 0
                            ? `calc(${u}px + (${v * Math.abs(c)}%))`
                            : c > 0
                            ? `calc(${u}px + (-${v * Math.abs(c)}%))`
                            : `${u}px`),
                    !e.isHorizontal())
                ) {
                    const e = h;
                    (h = u), (u = e);
                }
                const x = `\n        translate3d(${u}, ${h}, ${m}px)\n        rotateZ(${g}deg)\n        scale(${
                    c < 0 ? "" + (1 + (1 - f) * c) : "" + (1 - (1 - f) * c)
                })\n      `;
                if (a.slideShadows) {
                    let e = o.find(".swiper-slide-shadow");
                    0 === e.length && (e = createShadow(a, o)),
                        e.length && (e[0].style.opacity = Math.min(Math.max((Math.abs(c) - 0.5) / 0.5, 0), 1));
                }
                o[0].style.zIndex = -Math.abs(Math.round(d)) + t.length;
                effectTarget(a, o).transform(x);
            }
        },
        setTransition: (t) => {
            const { transformEl: s } = e.params.cardsEffect;
            (s ? e.slides.find(s) : e.slides).transition(t).find(".swiper-slide-shadow").transition(t),
                effectVirtualTransitionEnd({ swiper: e, duration: t, transformEl: s });
        },
        perspective: () => !0,
        overwriteParams: () => ({ watchSlidesProgress: !0, virtualTranslate: !e.params.cssMode }),
    });
}
Object.keys(prototypes).forEach((e) => {
    Object.keys(prototypes[e]).forEach((t) => {
        Swiper.prototype[t] = prototypes[e][t];
    });
}),
    Swiper.use([Resize, Observer]);
const modules = [
    Virtual,
    Keyboard,
    Mousewheel,
    Navigation,
    Pagination,
    Scrollbar,
    Parallax,
    Zoom,
    Lazy,
    Controller,
    A11y,
    History,
    HashNavigation,
    Autoplay,
    Thumb,
    freeMode,
    Grid,
    Manipulation,
    EffectFade,
    EffectCube,
    EffectFlip,
    EffectCoverflow,
    EffectCreative,
    EffectCards,
];
Swiper.use(modules);
export { Swiper, Swiper as default };
//# sourceMappingURL=swiper-bundle.esm.browser.min.js.map
