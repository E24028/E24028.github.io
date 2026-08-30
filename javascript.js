let DocAPI_1 = 'https://script.google.com/macros/s/AKfycbw9HNyXA1v8FhPQHQulED5OqrUTuiUTymUeKde_-H-0A4UPfTCtcHvm6Csvj6JqjVP7/exec?docId=';
let DocAPI_2 = 'https://script.google.com/macros/s/AKfycbzp8i6HxGNMibzkK4LH15gEmnvmYWjM2dvCZZin2UXVPBcGw8QGOU91xQZifr4Ea39S/exec?docId=';
let GroqAPI = 'https://script.google.com/macros/s/AKfycbyuZNtZrpOplh6jrG630_VY6CkFPZcwZxXVBtKPDKFd4IYMsgx8-eVFu9S8wMOiIFtsWA/exec';
let defaultDocId = decodeURIComponent('%31%33%63%33%31%30%5F%63%6A%69%35%67%53%70%33%30%65%58%30%2D%4B%71%32%68%43%43%53%52%64%52%4F%64%59%6A%61%76%65%5A%68%46%59%4C%44%45');

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
        throw new Error('リクエストに失敗しました');
    }
};

String.prototype.replaceToURL = function() {
    try
    {
        history.replaceState(null, '', this);
    } catch (e) {
        throw new Error(`エラー：${e.message || e}`);
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

    if (success)
    {
        return this.trimCenter(20);
    } else {
        throw new Error('コピー失敗...');
    }
};

String.prototype.trimCenter = function(length) {
    if (this.length > (length * 2))
    {
        return this.slice(0, length) + '...' + this.slice(-length);
    } else {
        return this.toString();
    }
};

String.prototype.searchStorage = function() {
    return localStorage[this.toString()] || undefined;
};

String.prototype.byQuery = function() {
    let all = document.querySelectorAll(this);
    return (all.length === 1) ? all[0] : all;
};

String.prototype.byId = function() {
    let id = this.startsWith('#') ? this.slice(1) : this;
    return document.getElementById(id);
};

String.prototype.toURL = function() {
    return (new URL(this));
};

String.prototype.setToHash = function() {
    // let params = location.search ? ('?' + location.search) : '';
    let params = location.search;
    let hash = this ? ('#' + this) : '';

    // 新しいURLを作成し、履歴を更新
    let newURL = location.pathname + params + hash;
    history.replaceState(null, 0, newURL);
};

String.prototype.HEXtoRGB = function(type = 'str') {
    if (!this.startsWith('#'))
    {
        throw new Error('#ffffff形式で入力してください');
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
        throw new Error('正しくない形式です。');
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

String.prototype.toJSON = function() {
    return JSON.parse(this.toString());
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
        throw new Error('2つの数値を入力してください');
    }

    let min = this[0];
    let max = this[1];

    if (typeof min === 'number' && typeof max === 'number')
    {
        let Random = Math.random() * (max - min + 1);
        let shori = Random + min;
        return Math.floor(shori);
    } else {
        throw new Error('数値で入力してください');
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

Array.prototype.stringify = function() {
    return JSON.stringify(this);
};

Array.prototype.setToStorage = function() {
    // [key, value] でも [[key1: value1], [key2: value2], ...] でも叩ける設計ｗｗｗ
    if (typeof this[0] === 'string' && this.length === 2)
    {
        let [key, value] = this;

        if (typeof value !== 'string')
        {
            value = JSON.stringify(value);
        }

        localStorage.setItem(key, value);
    } else {
        this.forEach(
            (pair) => {
                if (Array.isArray(pair) && pair.length === 2)
                {
                    let [key, value] = pair;

                    if (typeof value !== 'string')
                    {
                        value = JSON.stringify(value);
                    }

                    localStorage.setItem(key, value);
                } else {
                    throw new Error(`正しくない値です。${JSON.stringify(pair)}`);
                }
            }
        );
    }
};

Array.prototype.setToParams = function() {
    let searchParams = new URLSearchParams(location.search);

    // [key, value] でも [[key1: value1], [key2: value2], ...] でも叩ける設計ｗｗｗ
    if (typeof this[0] === 'string' && this.length === 2)
    {
        let [key, value] = this;

        if (typeof value !== 'string')
        {
            value = JSON.stringify(value);
        }

        searchParams.set(key, value);
    } else {
        this.forEach(
            (pair) => {
                if (Array.isArray(pair) && pair.length === 2)
                {
                    let [key, value] = pair;

                    if (typeof value !== 'string')
                    {
                        value = JSON.stringify(value);
                    }

                    searchParams.set(key, value);
                } else {
                    throw new Error(`正しくない値です。${JSON.stringify(pair)}`);
                }
            }
        );
    }

    // 新しいURLを作成し、履歴を更新
    let newURL = location.pathname + '?' + searchParams.toString() + location.hash;
    history.replaceState(null, '', newURL);
};

Object.prototype.setToParams = function() {
    let searchParams = new URLSearchParams(location.search);

    Object.entries(this).forEach(
        ([key, value]) => {
            searchParams.set(key, value);
        }
    );

    // 新しいURLを作成し、履歴を更新
    let newURL = location.pathname + '?' + searchParams.toString() + location.hash;
    history.replaceState(null, '', newURL);
};

Object.prototype.setToStorage = function() {
    Object.entries(this).forEach(
        ([key, value]) => {
            localStorage.setItem(key, value);
        }
    );
};

Object.prototype.stringify = function() {
    return JSON.stringify(this);
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
                } else {
                    throw new Error(`正しくない値です。${JSON.stringify(pair)}`);
                }
            }
        );
    }

    // 新しいURLを作成
    return (this.pathname + '?' + searchParams.toString() + this.hash);
};

URL.prototype.getHash = function() {
    let hash = this.hash;
    return (hash.startsWith('#') ? hash.slice(1) : hash);
};

URL.prototype.setHash = function(text) {
    // let params = this.search ? ('?' + this.search) : '';
    let params = this.search;
    let hash = text ? ('#' + text) : '';

    // 新しいURLを作成
    return (this.pathname + params + hash);
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
            } else if (['innerText', 'innerHTML', 'textContent', 'className', 'id', 'value'].indexOf(key) !== -1) {
                // 直接プロパティー (innerText, className, id など)
                this[key] = value;
            } else {
                // 属性値
                this.setAttribute(key, value);
            }
        }
    );
};

HTMLElement.prototype.getPx = function() {
    let style = window.getComputedStyle(this);
    let xPx = style.width;
    let yPx = style.height;
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

HTMLElement.prototype.byQuery = function(query) {
    let all = this.querySelectorAll(query);
    return (all.length === 1) ? all[0] : all;
};

HTMLElement.prototype.byId = function(id) {
    let _id = id.startsWith('#') ? id.slice(1) : id;
    return this.getElementById(id);
};

HTMLSelectElement.prototype.selectedOpt = function() {
    return this.byQuery(`[value="${this.value}"]`);
};

HTMLSelectElement.prototype.selectedText = function() {
    let all = this.byQuery(`[value="${this.value}"]`);

    if (callStr(all) === '[object NodeList]')
    {
        let textList = [];

        all.forEach(
            (elem, index) => {
                textList.push(elem.innerText);
            }
        );

        return textList;
    } else {
        return all.innerText;
    }
};

async function getData(secondAPI = false, docId = false)
{
    let API = '' + toggle(secondAPI, DocAPI_1, DocAPI_2) + (docId || defaultDocId);
    let value = await API.fetch();
    return value;
}

async function saveData(payload, secondAPI = false, docId = false)
{
    let API = '' + toggle(secondAPI, DocAPI_1, DocAPI_2) + (docId || defaultDocId);
    let payloadBody = { text: payload };

    await API.fetch(
        {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: JSON.stringify(payloadBody)
        }
    );

    return '保存成功！';
}

async function askAI(system, text)
{
    // POSTで送信するパラメータを設定
    let params = new URLSearchParams();
    params.append("systemText", (system || '不明'));
    params.append("userInput", (text || '不明'));
    params.append("aiModel", 'openai/gpt-oss-120b');

    try
    {
        const response = await fetch(GroqAPI,
            {
                method: "POST",
                // headers: {
                    // "Content-Type": "text/plain",
                // },
                body: params // .toString()
            }
        );

        if (!response.ok)
        {
            throw new Error(`HTTP エラー: ${response.status}`);
        }

        const aiReply = await response.text();
        return aiReply.replace(/\n\n/g, '\n');
    } catch (e) {
        throw new Error(`通信エラー：${e.message || e}`);
    }
}

function q(query)
{
    let all = document.querySelectorAll(query);
    return (all.length === 1) ? all[0] : all;
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
                } else {
                    throw new Error(`正しくない値です。${JSON.stringify(pair)}`);
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
    // let params = location.search ? ('?' + location.search) : '';
    let params = location.search;
    let hash = text ? ('#' + text) : '';

    // 新しいURLを作成し、履歴を更新
    let newURL = location.pathname + params + hash;
    history.replaceState(null, '', newURL);
}
