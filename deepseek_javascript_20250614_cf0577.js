const isCreditExpiredStatus = false;
const footerBannerDelay = Number("1.5") || 1.5;
let sessionId = sessionStorage.getItem('sid') || generateUUID();
if (!sessionStorage.getItem('sid')) sessionStorage.setItem("sid", sessionId);

const userAgent = navigator.userAgent.toLowerCase();
let chromeRedirectInitiated = false;
let stickyWidgetExpanded = false;

// Optimized browser detection patterns
const browserPatterns = [
  { pattern: /\b(?:crmo|crios)\/([\w.]+)/i, name: "Chrome" },
  { pattern: /\bedg(?:e|ios|a)?\/([\w.]+)/i, name: "Microsoft Edge" },
  { pattern: /(opera mini)\/([-\w.]+)/i, name: "Opera Mini" },
  { pattern: /(opera [mobiletab]{3,6})\b.+version\/([-\w.]+)/i, name: "Opera" },
  { pattern: /(opera)(?:.+version\/|[\/ ]+)([\w.]+)/i, name: "Opera" },
  { pattern: /opios[\/ ]+([\w.]+)/i, name: "Opera mini on iPhone" },
  { pattern: /\bop(?:rg)?x\/([\w.]+)/i, name: "Opera Webkit" },
  { pattern: /(?:fbav|fban|fb_iab)\/([\w.]+)/i, name: "Facebook" },
  { pattern: /instagram[ ]?([\w.]+)/i, name: "Instagram" },
  { pattern: /snapchat\/([\w.]+)/i, name: "Snapchat" },
  { pattern: /\[(linkedin)app\]/i, name: "LinkedIn" },
  { pattern: /micromessenger\/([\w.]+)/i, name: "WeChat" },
  { pattern: /samsungbrowser\/([\w.]+)/i, name: "Samsung Internet" },
  { pattern: /(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w.]+)/i, name: "Chrome" },
  { pattern: /firefox\/([\w.]+)/i, name: "Firefox" },
  { pattern: /version\/([\w.,]+) .*(safari)/i, name: "Safari" }
];

// Optimized mobile detection
const isMobile = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(userAgent);
const isIOS = /(iPhone|iPod|iPad)/i.test(userAgent);
const isAndroid = /Android/i.test(userAgent);

// Optimized in-app detection
const isInApp = () => {
  return /WebView|(iPhone|iPod|iPad)(?!.*Safari\/)|Android.*(wv)/i.test(userAgent);
};

// Optimized UUID generator
function generateUUID() {
  if (window.crypto?.randomUUID) return crypto.randomUUID();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 3 | 8)).toString(16);
  });
}

// Optimized browser detection
function getBrowser(ua) {
  for (const {pattern, name} of browserPatterns) {
    const match = ua.match(pattern);
    if (match) return { Name: name, Version: match[1] || "App" };
  }
  return { Name: "Unknown" };
}

// Optimized redirect handler
function handleRedirect() {
  if (sessionStorage.getItem("dnd") === 'true' || sessionStorage.getItem("after_sid") === "true") return;
  if (!isInApp()) return;

  const browser = getBrowser(userAgent);
  let platform = '';
  
  if (browser.Name === 'Instagram') platform = 'ig';
  else if (browser.Name === "Facebook") platform = 'fb';
  else if (browser.Name === "Snapchat") platform = 'sc';
  else if (browser.Name === 'LinkedIn') platform = 'li';
  else platform = browser.Name;

  const currentUrl = window.location.href;
  const queryString = currentUrl.split('?')[1];
  const urlWithoutProtocol = currentUrl.replace(/^https?:\/\//, '');
  const utmParam = queryString ? "&utm_term=justredirect" : "?utm_term=justredirect";
  const redirectUrl = `${urlWithoutProtocol}${utmParam}&adz_plt=${platform}&adz_sid=${sessionId}`;

  if (isIOS) {
    window.location.href = `x-safari-https://${redirectUrl}&adz_redir=s`;
  } else if (isAndroid) {
    window.location.href = `intent://${redirectUrl}&adz_redir=c#Intent;scheme=https;end`;
  }
}

// Initialize
if (typeof window !== "undefined") {
  // Use requestIdleCallback or setTimeout to avoid blocking main thread
  (window.requestIdleCallback || setTimeout)(() => {
    handleRedirect();
  });
}
