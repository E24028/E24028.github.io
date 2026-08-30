// エンコードされない文字列
let myMap = {
    '!' : '%21',
    '\'' : '%27',
    '(' : '%28',
    ')' : '%29',
    '*' : '%2A',
    '-' : '%2D',
    '.' : '%2E',
    '0' : '%30',
    '1' : '%31',
    '2' : '%32',
    '3' : '%33',
    '4' : '%34',
    '5' : '%35',
    '6' : '%36',
    '7' : '%37',
    '8' : '%38',
    '9' : '%39',
    'A' : '%41',
    'B' : '%42',
    'C' : '%43',
    'D' : '%44',
    'E' : '%45',
    'F' : '%46',
    'G' : '%47',
    'H' : '%48',
    'I' : '%49',
    'J' : '%4A',
    'K' : '%4B',
    'L' : '%4C',
    'M' : '%4D',
    'N' : '%4E',
    'O' : '%4F',
    'P' : '%50',
    'Q' : '%51',
    'R' : '%52',
    'S' : '%53',
    'T' : '%54',
    'U' : '%55',
    'V' : '%56',
    'W' : '%57',
    'X' : '%58',
    'Y' : '%59',
    'Z' : '%5A',
    '_' : '%5F',
    'a' : '%61',
    'b' : '%62',
    'c' : '%63',
    'd' : '%64',
    'e' : '%65',
    'f' : '%66',
    'g' : '%67',
    'h' : '%68',
    'i' : '%69',
    'j' : '%6A',
    'k' : '%6B',
    'l' : '%6C',
    'm' : '%6D',
    'n' : '%6E',
    'o' : '%6F',
    'p' : '%70',
    'q' : '%71',
    'r' : '%72',
    's' : '%73',
    't' : '%74',
    'u' : '%75',
    'v' : '%76',
    'w' : '%77',
    'x' : '%78',
    'y' : '%79',
    'z' : '%7A',
    '~' : '%7E'
};

String.prototype.encode = function() {
    // 全ての文字を myMap に基づいて置換、なければ encodeURIComponent
    return Array.from(this).map(
        char => {
            return myMap[char] || encodeURIComponent(char);
        }
    ).join('');
};

String.prototype.decode = function() {
    return decodeURIComponent(this);
};

String.prototype.reverse = function() {
    return this.split('').reverse().join('');
};

String.prototype.fetch = async function(option = {}) {
    let response = await fetch(this, option);

    if (response.ok)
    {
        let text = await response.text();
        return text; // .trimCenter(20);
    } else {
        console.error('リクエストに失敗しました');
        return 'リクエストに失敗しました';
    }
};

String.prototype.replaceToURL = function() {
    try
    {
        history.replaceState(null, '', this);
    } catch (e) {
        console.error(e);
        return `エラー: ${e.message || e}`;
    }
};

String.prototype.clipboard = function() {
    // 一時的な textarea 要素を作成
    let textarea = document.body.addElem(
        'textarea', {
            value: this,
            style: {
                position: 'fixed',
                left: '-9999px',
                top: '-9999px'
            }
        }
    );

    // 選択してコピー実行
    textarea.select();
    let success = document.execCommand('copy');

    // 要素を削除
    textarea.remove();

    return (success ? this.trimCenter(20) : 'コピー失敗...' );
};

String.prototype.trimCenter = function(length) {
    if (this.length > (length * 2))
    {
        return this.slice(0, length) + '...' + this.slice(-length);
    } else {
        return this.toString();
    }
};

String.prototype.queryS = function() {
    return document.querySelector(this);
};

String.prototype.queryAll = function() {
    return document.querySelectorAll(this);
};

String.prototype.byId = function() {
    let id = this.startsWith('#') ? this.slice(1) : this;
    return document.getElementById(id);
};

String.prototype.toURL = function() {
    return (new URL(this));
};

String.prototype.HEXtoRGB = function(type = 'str') {
    if (!this.startsWith('#'))
    {
        console.error('#ffffff形式で入力してください');
        return '#ffffff形式で入力してください';
    }

    let r = '00';
    let g = '00';
    let b = '00';
    let a = 'ff';

    if (this.length === 9)
    {
        r = this[1] + this[2];
        g = this[3] + this[4];
        b = this[5] + this[6];
        a = this[7] + this[8];
    } else if (this.length === 7) {
        r = this[1] + this[2];
        g = this[3] + this[4];
        b = this[5] + this[6];
    } else if (this.length === 5) {
        r = this[1] + this[1];
        g = this[2] + this[2];
        b = this[3] + this[3];
        a = this[4] + this[4];
    } else if (this.length === 4) {
        r = this[1] + this[1];
        g = this[2] + this[2];
        b = this[3] + this[3];
    } else {
        console.error('正しくない形式です。');
        return '正しくない形式です。';
    }

    let decodedR = r.hexDecode();
    let decodedG = g.hexDecode();
    let decodedB = b.hexDecode();
    let decodedA = a.hexDecode();

    if (type.toLowerCase() === 'obj')
    {
        return { red: decodedR, green: decodedG, blue: decodedB, alpha: decodedA };
    } else {
        let alpha = (decodedA / 255 * 100).toFixed(1);
        return `rgba(${decodedR}, ${decodedG}, ${decodedB}, ${alpha} %)`;
    }
};

String.prototype.hexDecode = function() {
    return parseInt(this, 16);
};

Number.prototype.hexDecode = function() {
    return parseInt(this, 16);
};

Number.prototype.toHex = function() {
    return this.toString(16);
};

Array.prototype.getRandom2 = function() {
    if (this.length !== 2)
    {
        console.error('2つの数値を入力してください');
        return '2つの数値を入力してください';
    }

    let min = this[0];
    let max = this[1];

    if (typeof min === 'number' && typeof max === 'number')
    {
        let Random = Math.random() * (max - min + 1);
        let shori = Random + min;
        return Math.floor(shori);
    } else {
        console.error('数値で入力してください');
        return '数値で入力してください';
    }
};

Array.prototype.newSort = function() {
    let target = this;

    // ソート
    target.sort(
        (str1, str2) => {
            let keyA = str1.encode();
            let keyB = str2.encode();
            return keyA.localeCompare(keyB);
        }
    );

    return target;
};

Object.prototype.RGBtoHEX = function() {
    let r = this.red || 0;
    let g = this.green || 0;
    let b = this.blue || 0;
    let a = this.alpha || 255;
    let hexArray = [
        r.toHex().padStart(2, '0'),
        g.toHex().padStart(2, '0'),
        b.toHex().padStart(2, '0'),
        a.toHex().padStart(2, '0')
    ];

    return '#' + hexArray.join('');
};

URL.prototype.replaceToURL = function() {
    return this.toString().replaceToURL();
};

URL.prototype.getAllParams = function(type = 'object') {
    let params = new URLSearchParams(this.search);

    if (type.toLowerCase() === 'array')
    {
        // Array形式
        // [ ['key1', 'val1'], ['key2', 'val2'], ... ]
        return Array.from(params.entries());
    } else {
        // Object形式
        // { key1: 'val1', key2: 'val2', ... }
        return Object.fromEntries(params.entries());
    }
};

URL.prototype.getParams2 = function(key) {
    let url = this;
    let params = url.searchParams;
    return params.get(key);
};

URL.prototype.setParams2 = function(...args) {
    let searchParams = this.searchParams;

    if (args.length === 1 && typeof args[0] === 'object' && !Array.isArray(args[0]) && args[0] !== null)
    {
        // 引数がオブジェクト形式の場合: setParams({ key1: 'val1', key2: 'val2', ... })
        Object.entries(args[0]).forEach(
            ([key, value]) => {
                searchParams.set(key, value);
            }
        );
    } else {
        // 引数が配列形式の場合: setParams(['key1', 'val1'], ['key2', 'val2'], ...)
        args.forEach(
            (pair) => {
                if (Array.isArray(pair) && pair.length === 2)
                {
                    let [key, value] = pair;
                    searchParams.set(key, value);
                }
            }
        );
    }

    // 新しいURLを作成し、履歴を更新
    return (this.pathname + '?' + searchParams.toString() + this.hash);
};

URL.prototype.getHash = function() {
    let hash = this.hash;
    return (hash.startsWith('#') ? hash.slice(1) : hash);
};

URL.prototype.setHash = function(text) {
    let params = this.search ? ('?' + this.search) : '';
    let hash = text ? ('#' + text) : '';

    // 新しいURLを作成し、履歴を更新
    let newURL = this.pathname + params + hash;
    history.replaceState(null, '', newURL);
};

HTMLElement.prototype.addElem = function(tagName, optionObj, isNs = false, nsURL = 'http://www.w3.org/2000/svg') {
    let elem = isNs
        ? document.createElementNs(nsURL, tagName)
        : document.createElement(tagName);

    // optionObj のプロパティを要素に適用
    Object.entries(optionObj).forEach(
        ([key, value]) => {
            if (key === 'style' && typeof value === 'object')
            {
                // style オブジェクトの場合 (例: { color: 'red', fontSize: '14px' })
                Object.assign(elem.style, value);
            } else if (key === 'dataset' && typeof value === 'object') {
                // dataset オブジェクトの場合 (例: { id: '123' })
                Object.assign(elem.dataset, value);
            } else if (key.startsWith('on') && typeof value === 'function') {
                // イベントハンドラの場合 (例: onclick: () => {})
                elem.addEventListener(key.slice(2).toLowerCase(), value);
            } else {
                // その他の直接プロパティ (innerText, className, id など)
                elem[key] = value;
            }
        }
    );

    this.appendChild(elem);
    return elem;
};

HTMLElement.prototype.setProperty = function(obj)
{
    // プロパティを要素に適用
    Object.entries(obj).forEach(
        ([key, value]) => {
            if (key === 'style' && typeof value === 'object')
            {
                // style オブジェクトの場合 (例: { color: 'red', fontSize: '14px' })
                Object.assign(this.style, value);
            } else if (key === 'dataset' && typeof value === 'object') {
                // dataset オブジェクトの場合 (例: { id: '123' })
                Object.assign(this.dataset, value);
            } else if (key.startsWith('on') && typeof value === 'function') {
                // イベントハンドラの場合 (例: onclick: () => {})
                this.addEventListener(key.slice(2).toLowerCase(), value);
            } else {
                // その他の直接プロパティ (innerText, className, id など)
                this[key] = value;
            }
        }
    );
};

HTMLElement.prototype.getPx = function() {
    let xPx = this.getComputedStyle('width');
    let yPx = this.getComputedStyle('height');
    let x = Number(xPx.replace(/px/g, ''));
    let y = Number(yPx.replace(/px/g, ''));
    return { width: x, height: y };
};

HTMLElement.prototype.setPx = function(width = false, height = false) {
    let x = width || this.getPx().width;
    let y = height || this.getPx().height;
    this.style.width = x.toString() + 'px';
    this.style.height = y.toString() + 'px';
};

HTMLElement.prototype.queryS = function(query) {
    return this.querySelector(query);
};

HTMLElement.prototype.queryAll = function(query) {
    return this.querySelectorAll(query);
};

HTMLElement.prototype.byId = function(id) {
    let _id = id.startsWith('#') ? id.slice(1) : id;
    return this.getElementById(id);
};

HTMLSelectElement.prototype.selectedOpt = function() {
    let all = this.queryAll(`[value="${this.value}"]`);
    return (all.length === 1) ? all[0] : all;
};

HTMLSelectElement.prototype.selectedText = function() {
    let all = this.queryAll(`[value="${this.value}"]`);
    let textList = [];

    all.forEach(
        (elem, index) => {
            textList.push(elem.innerText);
        }
    );

    return (textList.length === 1) ? textList[0] : textList;
};

function q(query)
{
    return document.querySelector(query);
}

function s(id)
{
    return document.getElementById(id);
}

function toggle(target, ifTrue = true, ifFalse = false)
{
    return (target ? ifTrue : ifFalse);
}

function callStr(...target)
{
    let result = [];

    target.forEach(
        (value, index) => {
            result.push(Object.prototype.toString.call(value));
        }
    );

    return (result.length === 1) ? result[0] : result;
}

function getRandom2(min, max)
{
    let Random = Math.random() * (max - min + 1);
    let shori = Random + min;
    return Math.floor(shori);
}

function getAllParams(type = 'object')
{
    let params = new URLSearchParams(location.search);

    if (type.toLowerCase() === 'array')
    {
        // Array形式
        // [ ['key1', 'val1'], ['key2', 'val2'], ... ]
        return Array.from(params.entries());
    } else {
        // Object形式
        // { key1: 'val1', key2: 'val2', ... }
        return Object.fromEntries(params.entries());
    }
}

function getParams2(key)
{
    let url = new URL(location.href);
    let params = url.searchParams;
    return params.get(key);
}

function setParams2(...args)
{
    let searchParams = new URLSearchParams(location.search);

    if (args.length === 1 && typeof args[0] === 'object' && !Array.isArray(args[0]) && args[0] !== null)
    {
        // 引数がオブジェクト形式の場合: setParams({ key1: 'val1', key2: 'val2', ... })
        Object.entries(args[0]).forEach(
            ([key, value]) => {
                searchParams.set(key, value);
            }
        );
    } else {
        // 引数が配列形式の場合: setParams(['key1', 'val1'], ['key2', 'val2'], ...)
        args.forEach(
            (pair) => {
                if (Array.isArray(pair) && pair.length === 2)
                {
                    let [key, value] = pair;
                    searchParams.set(key, value);
                }
            }
        );
    }

    // 新しいURLを作成し、履歴を更新
    let newURL = location.pathname + '?' + searchParams.toString() + location.hash;
    history.replaceState(null, '', newURL);
}

function getHash()
{
    return location.hash.slice(1);
}

function setHash(text)
{
    let params = location.search ? ('?' + location.search) : '';
    let hash = text ? ('#' + text) : '';

    // 新しいURLを作成し、履歴を更新
    let newURL = location.pathname + params + hash;
    history.replaceState(null, '', newURL);
}
