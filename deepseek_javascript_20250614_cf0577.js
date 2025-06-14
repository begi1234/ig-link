const userAgent = navigator.userAgent.toLowerCase();
var sessionId = '';

function genUUID() {
  if (window.crypto && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  var dt = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == 'x' ? r : (r & 3 | 8)).toString(16);
  });
}

if (!sessionStorage.getItem('sid')) {
  sessionId = genUUID();
  sessionStorage.setItem("sid", sessionId);
} else {
  sessionId = sessionStorage.getItem('sid');
}

function isInApp() {
  const patterns = ['WebView', "(iPhone|iPod|iPad)(?!.*Safari/)", "Android.*(wv)"];
  const regex = new RegExp('(' + patterns.join('|') + ')', 'ig');
  return Boolean(userAgent.match(regex));
}

function getBrowser(ua) {
  const patterns = [
    [/\b(?:crmo|crios)\/([\w\.]+)/i, "Chrome"],
    [/\bedg(?:e|ios|a)?\/([\w\.]+)/i, "Microsoft Edge"],
    [/(opera mini)\/([-\w\.]+)/i, "Opera Mini"],
    [/(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, "Opera"],
    [/(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i, "Opera"],
    [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i, "UC Browser"],
    [/micromessenger\/([\w\.]+)/i, "WeChat"],
    [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i, "Internet Explorer"],
    [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i, "Facebook"],
    [/instagram[ ]?([\w\.]+)/i, "Instagram"],
    [/snapchat\/([\w\.]+)/i, "Snapchat"],
    [/chrome\/([\w\.]+) mobile/i, "Chrome Mobile"],
    [/version\/([\w\.\,]+) .*mobile.*safari/i, "Safari Mobile"],
    [/version\/([\w\.\,]+) .*(safari)/i, "Safari"],
    [/(firefox)\/([\w\.]+)/i, "Firefox"]
  ];

  for (const [regex, name] of patterns) {
    const match = ua.match(regex);
    if (match) return { Name: name, Version: match[1] || match[2] };
  }
  return { Name: "Unknown" };
}

function handleRedirect() {
  if (sessionStorage.getItem("dnd") === 'true') return;
  if (sessionStorage.getItem('after_sid') === "true") return;
  if (!isInApp()) return;

  const delay = 1500; // 1.5 second delay
  setTimeout(goToURL, delay);
}

function goToURL() {
  const currentUrl = window.location.href;
  const query = currentUrl.split('?')[1];
  sessionStorage.setItem('after_sid', 'true');
  
  const browser = getBrowser(userAgent);
  let platform = '';
  
  if (browser.Name === 'Instagram') platform = 'ig';
  else if (browser.Name === "Facebook") platform = 'fb';
  else if (browser.Name === "Snapchat") platform = 'sc';
  else if (browser.Name === 'LinkedIn') platform = 'li';
  else platform = browser.Name;

  const utm = query ? "&utm_term=inappredirect" : "?utm_term=inappredirect";
  const cleanUrl = currentUrl.replace(/^https?:\/\//, '');

  if (/(iPhone|iPod|iPad)/i.test(navigator.userAgent)) {
    const newUrl = "x-safari-https://" + cleanUrl + utm + "&adz_redir=s&adz_plt=" + platform + "&adz_sid=" + sessionId;
    window.location.href = newUrl;
  } else if (/Android/i.test(navigator.userAgent)) {
    const newUrl = "intent://" + cleanUrl + utm + "&adz_redir=c&adz_plt=" + platform + "&adz_sid=" + sessionId + "#Intent;scheme=https;end";
    window.location.href = newUrl;
  }
}

handleRedirect();