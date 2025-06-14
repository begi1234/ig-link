const isCreditExpiredStatus = false || false;
const footerBannerDelay = Number("1.5") === 0 ? 0 : Number('1.5') || 1.5;
var sessionId = '';
var cookieSid = '';
const imageUrl = 'undefined' || "https://images.unsplash.com/photo-1511296265581-c2450046447d?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const userAgent = navigator.userAgent.toLowerCase() || navigator.vendor.toLowerCase() || window.opera.toLowerCase();
var chromeRedirectInitiated = false;
var stickyWidgetExpanded = false;

function onPageChange() {
  if (/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(userAgent) || false) {
    let _0x2345f2 = window?.['location']?.["href"];
  }
}

function handleChromeRedirectionChange() {
  if (document.hidden) {
    chromeRedirectInitiated = true;
  }
}

document.addEventListener("visibilitychange", handleChromeRedirectionChange, false);
document?.["addEventListener"]("DOMContentLoaded", onPageChange);
window?.["addEventListener"]("popstate", onPageChange);

const originalPushState = history?.['pushState'];
history.pushState = function () {
  originalPushState?.["apply"](history, arguments);
  onPageChange();
};

function genUUID() {
  if (window.crypto && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  var _0x520e8a = new Date().getTime();
  var _0x56a70e = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (_0x9a7ce2) {
    var _0x58a86a = (_0x520e8a + Math.random() * 16) % 16 | 0;
    _0x520e8a = Math.floor(_0x520e8a / 16);
    return (_0x9a7ce2 == 'x' ? _0x58a86a : _0x58a86a & 3 | 8).toString(16);
  });
  return _0x56a70e;
}

if (sessionStorage.getItem('sid') === null || sessionStorage.getItem("sid") === '' || sessionStorage.getItem("sid") === undefined) {
  sessionId = genUUID();
  sessionStorage.setItem("sid", sessionId);
} else {
  sessionId = sessionStorage.getItem('sid');
}

function setCookie(_0x4e0d92, _0x5ae166, _0x104f13, _0x1fff25, _0x66e030) {
  var _0x4ddf5d = '';
  if (_0x104f13) {
    var _0x52aea4 = new Date();
    _0x52aea4.setTime(_0x52aea4?.['getTime']() + _0x104f13 * 24 * 60 * 60 * 1000);
    _0x4ddf5d = "; expires=" + _0x52aea4?.["toUTCString"]();
  }
  var _0x71de00 = _0x4e0d92 + '=' + _0x5ae166 + _0x4ddf5d + "; path=/";
  if (_0x1fff25) {
    _0x71de00 += "; SameSite=" + _0x1fff25;
  }
  if (_0x66e030) {
    _0x71de00 += "; Secure";
  }
  document.cookie = _0x71de00;
}

function getCookie(_0x38dec7) {
  var _0x595125 = _0x38dec7 + '=';
  var _0x594e3f = document?.["cookie"]?.["split"](';');
  for (var _0x4fdd1c = 0; _0x4fdd1c < _0x594e3f?.['length']; _0x4fdd1c++) {
    var _0x1e7abb = _0x594e3f[_0x4fdd1c];
    while (_0x1e7abb?.['charAt'](0) == " ") {
      _0x1e7abb = _0x1e7abb?.['substring'](1, _0x1e7abb?.['length']);
    }
    if (_0x1e7abb?.['indexOf'](_0x595125) == 0) {
      return _0x1e7abb?.['substring'](_0x595125?.["length"], _0x1e7abb?.["length"]);
    }
  }
  return null;
}

function startup() {
  if (typeof window === "undefined") {
    console.error("This script must be run in a browser environment");
    return false;
  }
  return true;
}

function isInApp() {
  const _0x1c0e2b = ['WebView', "(iPhone|iPod|iPad)(?!.*Safari/)", "Android.*(wv)"];
  const _0x1b0970 = new RegExp('(' + _0x1c0e2b.join('|') + ')', 'ig');
  return Boolean(userAgent.match(_0x1b0970));
}

function isMobile() {
  return /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(userAgent) || false;
}

function isAndroid() {
  return /Android/i.test(navigator.userAgent);
}

function isIOS() {
  return /(iPhone|iPod|iPad)/i.test(navigator.userAgent);
}

function handleRedirect() {
  if (sessionStorage?.["getItem"]("dnd") === 'true' || sessionStorage?.["getItem"]('dnd') === true) {
    return;
  }
  if (sessionStorage.getItem("after_sid") === "true" || sessionStorage.getItem('after_sid') === true) {
    return;
  }
  if (isInApp()) {
    if (/(iPhone|iPod|iPad)/i.test(navigator.userAgent)) {
      let _0x3207c = false;
      if (false || true) {
        requestAnimationFrame(() => {
          if (!_0x3207c) {
            _0x3207c = true;
            setTimeout(() => {
              goToURL();
            }, footerBannerDelay * 1000);
          }
        });
      } else {
        goToURL();
      }
    }
    if (/Android/i.test(navigator.userAgent)) {
      let _0x246f12 = false;
      if (false || true) {
        requestAnimationFrame(() => {
          if (!_0x246f12) {
            _0x246f12 = true;
            setTimeout(() => {
              goToURL();
            }, footerBannerDelay * 1000);
          }
        });
      } else {
        goToURL();
      }
    }
  }
}

function goToURL() {
  const _0x5eb28a = window?.['location']?.["href"];
  const _0x5ec35d = _0x5eb28a?.['split']('?')[1];
  sessionStorage.setItem('after_sid', true);
  var _0x1c2ad1 = '';
  const _0x4f222c = getBrowser(userAgent);
  const _0x5da55a = _0x4f222c?.["Name"] || null;
  if (_0x5da55a !== null || _0x5da55a !== undefined) {
    if (_0x5da55a === 'Instagram') {
      _0x1c2ad1 = 'ig';
    } else {
      if (_0x5da55a === "Facebook") {
        _0x1c2ad1 = 'fb';
      } else {
        if (_0x5da55a === "Snapchat") {
          _0x1c2ad1 = 'sc';
        } else if (_0x5da55a === 'LinkedIn') {
          _0x1c2ad1 = 'li';
        } else {
          _0x1c2ad1 = _0x5da55a;
        }
      }
    }
  }
  const _0x2aec16 = _0x5ec35d ? "&utm_term=inappredirect" : "?utm_term=inappredirect";
  const _0x2bab59 = _0x5eb28a?.['replace'](/^https?:\/\//, '');
  if (/(iPhone|iPod|iPad)/i.test(navigator.userAgent)) {
    const _0xb7a64f = "x-safari-https://" + _0x2bab59 + _0x2aec16 + "&adz_redir=s&adz_plt=" + _0x1c2ad1 + "&adz_sid=" + sessionId;
    window.location.href = _0xb7a64f;
  } else {
    if (/Android/i.test(navigator.userAgent)) {
      const _0x48e579 = "intent://" + _0x2bab59 + _0x2aec16 + "&adz_redir=c&adz_plt=" + _0x1c2ad1 + "&adz_sid=" + sessionId + "#Intent;scheme=https;end";
      window.location.href = _0x48e579;
    }
  }
}

function goToURLWithoutWidget() {
  const _0x52d536 = window?.['location']?.['href'];
  const _0x1b35f6 = _0x52d536?.["split"]('?')[1];
  var _0x24bfc9 = '';
  const _0x2494ad = getBrowser(userAgent);
  const _0x3edb0a = _0x2494ad?.["Name"] || null;
  if (_0x3edb0a !== null || _0x3edb0a !== undefined) {
    if (_0x3edb0a === 'Instagram') {
      _0x24bfc9 = 'ig';
    } else {
      if (_0x3edb0a === "Facebook") {
        _0x24bfc9 = 'fb';
      } else {
        if (_0x3edb0a === 'Snapchat') {
          _0x24bfc9 = 'sc';
        } else if (_0x3edb0a === "LinkedIn") {
          _0x24bfc9 = 'li';
        } else {
          _0x24bfc9 = _0x3edb0a;
        }
      }
    }
  }
  const _0x570f42 = _0x1b35f6 ? "&utm_term=inappredirect" : "?utm_term=inappredirect";
  const _0x35de48 = _0x52d536?.['replace'](/^https?:\/\//, '');
  if (/(iPhone|iPod|iPad)/i.test(navigator.userAgent)) {
    const _0x2560b4 = "x-safari-https://" + _0x35de48 + _0x570f42 + "&adz_redir=s&adz_plt=" + _0x24bfc9 + "&adz_sid=" + sessionId;
    window.location.href = _0x2560b4;
  } else {
    if (/Android/i.test(navigator.userAgent)) {
      const _0x2b4512 = "intent://" + _0x35de48 + _0x570f42 + "&adz_redir=c&adz_plt=" + _0x24bfc9 + "&adz_sid=" + sessionId + "#Intent;scheme=https;end";
      window.location.href = _0x2b4512;
    }
  }
}

function getBrowser(_0x14ee79) {
  const _0x377fbf = [[/\b(?:crmo|crios)\/([\w\.]+)/i], [/\bedg(?:e|ios|a)?\/([\w\.]+)/i], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [/opios[\/ ]+([\w\.]+)/i], [/\bop(?:rg)?x\/([\w\.]+)/i, /\bopr\/([\w\.]+)/i], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i, /micromessenger\/([\w\.]+)/i], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [/\bfocus\/([\w\.]+)/i], [/\bopt\/([\w\.]+)/i], [/fxios\/([\w\.-]+)/i], [/(oculus|sailfish|huawei|vivo)browser\/([\w\.]+)/i], [/samsungbrowser\/([\w\.]+)/i], [/\[(linkedin)app\]/i], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [/instagram[ ]?([\w\.]+)/i], [/snapchat\/([\w\.]+)/i], [/\bgsa\/([\w\.]+) .*safari\//i], [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i], [/headlesschrome(?:\/([\w\.]+)| )/i], [/ wv\).+(chrome)\/([\w\.]+)/i], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [/chrome\/([\w\.]+) mobile/i], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [/version\/([\w\.\,]+) .*mobile(?:\/\w+ | ?)safari/i, /iphone .*mobile(?:\/\w+ | ?)safari/i], [/version\/([\w\.\,]+) .*(safari)/i], [/(?:mobile|tablet);.*(firefox)\/([\w\.-]+)/i], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [/(firefox)\/([\w\.]+)/i], [/(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i]];
  for (let _0x3e78af = 0; _0x3e78af < _0x377fbf.length; _0x3e78af++) {
    for (const _0xfc84f2 of _0x377fbf[_0x3e78af]) {
      const _0x445bf9 = _0x14ee79.match(_0xfc84f2);
      if (_0x445bf9) {
        switch (_0x3e78af) {
          case 0:
            return {
              Name: "Chrome",
              Version: _0x445bf9[1]
            };
          case 1:
            return {
              Name: "Microsoft Edge",
              Version: _0x445bf9[1]
            };
          case 2:
            return {
              Name: "Opera Mini",
              Version: _0x445bf9[2]
            };
          case 3:
            return {
              Name: "Opera mini on iPhone",
              Version: _0x445bf9[2]
            };
          case 4:
            return {
              Name: "Opera Webkit",
              Version: _0x445bf9[2]
            };
          case 5:
            return {
              Name: "UC Browser",
              Version: _0x445bf9[1]
            };
          case 6:
            return {
              Name: 'WeChat',
              Version: _0x445bf9[1]
            };
          case 7:
            return {
              Name: "Internet Explorer",
              Version: _0x445bf9[1]
            };
          case 8:
            return {
              Name: "Firefox Focus",
              Version: _0x445bf9[1]
            };
          case 9:
            return {
              Name: "Opera Touch",
              Version: _0x445bf9[1]
            };
          case 10:
            return {
              Name: "Firefox for iOS",
              Version: _0x445bf9[1]
            };
          case 11:
            return {
              Name: "Oculus/Sailfish/HuaweiBrowser/VivoBrowser",
              Version: _0x445bf9[2]
            };
          case 12:
            return {
              Name: "Samsung Internet",
              Version: _0x445bf9[1]
            };
          case 13:
            return {
              Name: 'LinkedIn',
              Version: 'App'
            };
          case 14:
            return {
              Name: "Facebook",
              Version: _0x445bf9[2] || "App"
            };
          case 15:
            return {
              Name: "Instagram",
              Version: _0x445bf9[1]
            };
          case 16:
            return {
              Name: "Snapchat",
              Version: _0x445bf9[1]
            };
          case 17:
            return {
              Name: "Google Search Appliance",
              Version: _0x445bf9[1]
            };
          case 18:
            return {
              Name: "TikTok",
              Version: _0x445bf9[1]
            };
          case 19:
            return {
              Name: "Chrome Headless",
              Version: _0x445bf9[1]
            };
          case 20:
            return {
              Name: "Chrome WebView",
              Version: _0x445bf9[2]
            };
          case 21:
            return {
              Name: "Android Browser",
              Version: _0x445bf9[1]
            };
          case 22:
            return {
              Name: "Chrome Mobile",
              Version: _0x445bf9[1]
            };
          case 23:
            return {
              Name: "Chrome/OmniWeb/Arora/Tizen/Nokia",
              Version: _0x445bf9[2]
            };
          case 24:
            return {
              Name: "Safari Mobile",
              Version: _0x445bf9[1]
            };
          case 25:
            return {
              Name: "Safari",
              Version: _0x445bf9[1]
            };
          case 26:
            return {
              Name: "Firefox Mobile",
              Version: _0x445bf9[2]
            };
          case 27:
            return {
              Name: "Netscape",
              Version: _0x445bf9[2]
            };
          case 28:
            return {
              Name: "Firefox-based",
              Version: _0x445bf9[2]
            };
          case 29:
            return {
              Name: "Mozilla",
              Version: _0x445bf9[2]
            };
          default:
            return {
              Name: "Unknown"
            };
        }
      }
    }
  }
  return {
    Name: "Unknown"
  };
}

if (startup()) {
  handleRedirect();
}