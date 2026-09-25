/* javascript.js v2.1: 大幅アップデート */
let lastModified = '2026/09/25 10:45';
let DocAPI_1 = 'https://script.google.com/macros/s/AKfycbw9HNyXA1v8FhPQHQulED5OqrUTuiUTymUeKde_-H-0A4UPfTCtcHvm6Csvj6JqjVP7/exec?docId=';
let DocAPI_2 = 'https://script.google.com/macros/s/AKfycbzp8i6HxGNMibzkK4LH15gEmnvmYWjM2dvCZZin2UXVPBcGw8QGOU91xQZifr4Ea39S/exec?docId=';
let GroqAPI = 'https://script.google.com/macros/s/AKfycbx36YyYjZRq2ePqYxCA6DY8lFIiKEG4CAT0Pa86jTIGE6sJMpDnwTWfpcBwmssnws0UKA/exec';
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

async function fetchDoc(secondAPI = false, docId = false)
{
    let API = '' + toggle(secondAPI, DocAPI_1, DocAPI_2) + (docId || defaultDocId);
    let jsonData = await API.fetch();
    let text = jsonData.parseJSON().text;
    return text;
}

async function saveDoc(payload, secondAPI = false, docId = false)
{
    let API = '' + toggle(secondAPI, DocAPI_1, DocAPI_2) + (docId || defaultDocId);
    let payloadBody = { text: autoJSON(payload) };

    await API.fetch(
        {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: payloadBody.JSONstring(null, 4)
        }
    );

    return payload;
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
        // 独自拡張の String.prototype.fetch は直接テキストを返す
        const aiReply = await GroqAPI.fetch(
            {
                method: "POST",
                // headers: {
                    // "Content-Type": "text/plain",
                // },
                body: params
            }
        );

        return aiReply.replace(/\n\n/g, '\n');
    } catch (e) {
        throw new Error(`通信エラー：${e.message || e}`);
    }
}

function setProperty(type, name, func)
{
    type.prototype[name] = func;
    Object.defineProperty(type.prototype, name, { enumerable: false });
}

function q(query)
{
    return document.querySelector(query);
}

function qAll(query)
{
    return document.querySelectorAll(query);
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

function getRandom2(min, max, count = 1)
{
    let array = [];

    for (let i = 0; i < count; i++)
    {
        let Random = Math.random() * (max - min + 1);
        let result = Math.floor(Random + min);
        array.push(result);
    }

    return (array.length === 1) ? array[0] : array;
}

function getRandomValue(...array)
{
    let targetArray = array;

    if (array.length === 1 && callStr(array[0]) === '[object Array]')
    {
        targetArray = array[0];
    } else if (array.length === 1 && callStr(array[0]) === '[object Object]') {
        throw new Error('オブジェクト形式で指定することはできません');
    }

    let index = getRandom2(1, targetArray.length) - 1;
    return targetArray[index];
}

function getAllParams(type = 'obj')
{
    let params = new URLSearchParams(location.search);

    if (type.toLowerCase().includes('arr'))
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
                    throw new Error(`正しくない値です: ${JSON.stringify(pair)}`);
                }
            }
        );
    }

    // 新しいURLを作成し、履歴を更新
    let newURL = location.pathname + '?' + searchParams.toString() + location.hash;
    history.replaceState(null, '', newURL);

    return location.href;
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

    return location.href;
}

function makeDataURI(str, lang = 'html')
{
    let langList = ['js', 'javascript', 'css', 'svg', 'html', 'md', 'markdown'].newSort();
    let switcher = { js: 'javascript', md: 'markdown', svg: 'html' };
    let lowerCase = lang.toLowerCase();
    let encoded = encodeURIComponent(str);

    if (langList.includes(lowerCase))
    {
        let newLang = switcher[lowerCase] || lowerCase;
        return `data:text/${newLang};charset=utf-8,${encoded}`;
    } else {
        throw new Error(`対応している形式は [${langList.join(', ')}] のみです`);
    }
}

function autoJSON(val, indent = 4)
{
    let types = ['[object String]', '[object Number]'];
    return types.includes(callStr(val)) ? val : val.JSONstring(null, indent);
}

function setFrame(iFrame, html)
{
    // iframe内のconsoleログを親ウィンドウへ送信するスクリプトを自動注入
    let generatedHTML = '';
    let inject = `<script>
(
    function() {
        let _log = console.log;
        let _error = console.error;
        let _warn = console.warn;
        let _info = console.info;

        function formatArg(arg)
        {
            if (arg === null)
            {
                return 'null';
            }

            if (arg === undefined)
            {
                return 'undefined';
            }

            if (typeof arg === 'object')
            {
                try
                {
                    return JSON.stringify(arg, null, 4);
                } catch(e) {
                    return String(arg);
                }
            }

            return String(arg);
        }

        function sendToParent(type, args)
        {
            try
            {
                const message = Array.from(args).map(formatArg).join(' ');

                window.parent.postMessage(
                    {
                        type: 'PREVIEW_CONSOLE_LOG',
                        logLevel: type,
                        text: message
                    }, '*'
                );
            } catch(e) {
                return "err";
            }
        }

        let _console = { ...console };

        console.log = function(...args) {
            args.forEach(
                (arg) => {
                    _console.log(arg);
                }
            );

            _log.apply(console, args);
            sendToParent('log', args);
        };

        console.error = function(...args) {
            args.forEach(
                (arg) => {
                    _console.error(arg);
                }
            );

            _error.apply(console, args);
            sendToParent('error', args);
        };

        console.warn = function(...args) {
            args.forEach(
                (arg) => {
                    _console.warn(arg);
                }
            );

            _warn.apply(console, args);
            sendToParent('warn', args);
        };

        console.info = function(...args) {
            args.forEach(
                (arg) => {
                    _console.info(arg);
                }
            );

            _info.apply(console, args);
            sendToParent('info', args);
        };

        console.clear = function() {
            _console.clear();

            window.parent.postMessage(
                {
                    type: 'PREVIEW_CONSOLE_CLEAR'
                }, '*'
            );
        };

        document.addEventListener('DOMContentLoaded',
            function(e, elem) {
                window.parent.postMessage(
                    {
                        type: 'PREVIEW_TITLE',
                        title: document.title
                    }, '*'
                );
            }
        );

        window.addEventListener('error',
            function(e) {
                sendToParent('error',
                    [e.message + ' (' + e.filename + ':' + e.lineno + ')']
                );
            }
        );
    }
)();
<\/script>`;

    if (html.includes('</body>'))
    {
        generatedHTML = html.replace('</body>', `${inject}\n</body>`);
    } else {
        generatedHTML = html + inject;
    }

    iFrame.srcdoc = generatedHTML;

    // メッセージイベント受信 (iframeからのログ)
    // 受け止める関数：renderConsole(clearConsole = false, logLevel = false, text = false)
    window.addEventListener('message',
        (event) => {
            if (!event.data)
            {
                return;
            }

            if (event.data.type === 'PREVIEW_CONSOLE_LOG' && typeof renderConsole !== 'undefined')
            {
                renderConsole(false, event.data.logLevel, event.data.text);
            } else if (event.data.type === 'PREVIEW_CONSOLE_CLEAR' && typeof renderConsole !== 'undefined') {
                renderConsole(true);
            } else if (event.data.type === 'PREVIEW_TITLE') {
                let pageTitle = event.data.title;

                if (pageTitle)
                {
                    'title'.byQuery().innerText = `${pageTitle} - ${defaultTitle}`;
                } else {
                    'title'.byQuery().innerText = defaultTitle;
                }
            }
        }
    );

    return generatedHTML;
}

setProperty(String, 'encode',
    function() {
        // 全ての文字を myMap に基づいて置換、なければ encodeURIComponent
        return Array.from(this).map(
            char => {
                return myMap[char] || encodeURIComponent(char);
            }
        ).join('');
    }
);

setProperty(String, 'decode',
    function() {
        return decodeURIComponent(this);
    }
);

setProperty(String, 'toBraille',
    function() {
        let string = this.encode().replace(/%/g, ' ').trim();
        let value = '';

        if (string === '')
        {
            value = '';
        } else {
            value = string.split(' ').map(
                (Str) => {
                    const charCode = 0x2800 + parseInt(Str, 16);
                    return String.fromCharCode(charCode);
                }
            ).join('');
        }

        return value;
    }
);

setProperty(String, 'parseBraille',
    function() {
        let value = this.replace(/[^\u2800-\u28FF]/g, '');

        return value.split('').map(
            (char) => {
                return '%' + (char.charCodeAt(0) - 0x2800).toString(16).toUpperCase().padStart(2, '0');
            }
        ).join('').decode();
    }
);

setProperty(String, 'reverse',
    function() {
        return this.split('').reverse().join('');
    }
);

setProperty(String, 'fetch',
    async function(option = {}) {
        let response = await fetch(this.toString(), option);

        if (response.ok)
        {
            let text = await response.text();
            return text; // .trimCenter(20);
        } else {
            throw new Error('リクエストに失敗しました');
        }
    }
);

setProperty(String, 'replaceToURL',
    function() {
        try
        {
            history.replaceState(null, '', this);
        } catch (e) {
            throw new Error(`エラー：${e.message || e}`);
        }

        return location.href;
    }
);

setProperty(String, 'clipboard',
    function() {
        // 一時的な textarea 要素を作成
        let textarea = document.body.addElem(
            'textarea', {
                value: this.toString(),
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
    }
);

setProperty(String, 'trimCenter',
    function(before, after = before) {
        if (this.length > (before + after))
        {
            return this.slice(0, before) + '...' + this.slice(-after);
        } else {
            return this.toString();
        }
    }
);

setProperty(String, 'searchStorage',
    function() {
        return localStorage[this] || false;
    }
);

setProperty(String, 'byQuery',
    function() {
        return document.querySelector(this.toString());
    }
);

setProperty(String, 'byQueryAll',
    function() {
        return document.querySelectorAll(this.toString());
    }
);

setProperty(String, 'byId',
    function() {
        let id = this.toString().startsWith('#') ? this.slice(1) : this.toString();
        return document.getElementById(id);
    }
);

setProperty(String, 'toURL',
    function() {
        return (new URL(this.toString()));
    }
);

setProperty(String, 'setToHash',
    function() {
        // let params = location.search ? ('?' + location.search) : '';
        let params = location.search;
        let hash = this.toString() ? ('#' + this.toString()) : '';

        // 新しいURLを作成し、履歴を更新
        let newURL = location.pathname + params + hash;
        history.replaceState(null, 0, newURL);

        return location.href;
    }
);

setProperty(String, 'HEXtoRGB',
    function(type = 'str') {
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
            throw new Error('正しくない形式です');
        }

        let decodedR = r.hexDecode();
        let decodedG = g.hexDecode();
        let decodedB = b.hexDecode();
        let decodedA = a.hexDecode();

        if (type.toLowerCase().includes('obj'))
        {
            return { red: decodedR, green: decodedG, blue: decodedB, alpha: decodedA };
        } else {
            let alpha = (decodedA / 255 * 100).toFixed(1);
            return `rgba(${decodedR}, ${decodedG}, ${decodedB}, ${alpha} %)`;
        }
    }
);

setProperty(String, 'parseJSON',
    function() {
        return JSON.parse(this.toString());
    }
);

setProperty(String, 'insertToTextArea',
    function(textarea, moveRight = 0) {
        let start = textarea.selectionStart;
        let end = textarea.selectionEnd;
        let val = textarea.value;

        // 値を更新
        textarea.value = val.substring(0, start) + this + val.substring(end);

        // 挿入した文字の直後にカーソルを移動
        textarea.selectionStart = start + this.length + moveRight;
        textarea.selectionEnd = start + this.length + moveRight;

        // フォーカスを戻す
        textarea.focus();
        return textarea.value;
    }
);

setProperty(String, 'toDataURI',
    function(lang = 'html') {
        let langList = ['js', 'javascript', 'css', 'svg', 'html', 'md', 'markdown'].newSort();
        let switcher = { js: 'javascript', md: 'markdown', svg: 'html' };
        let lowerCase = lang.toLowerCase();
        let encoded = encodeURIComponent(this.toString());

        if (langList.includes(lowerCase))
        {
            let newLang = switcher[lowerCase] || lowerCase;
            return `data:text/${newLang};charset=utf-8,${encoded}`;
        } else {
            throw new Error(`対応している形式は [${langList.join(', ')}] のみです`);
        }
    }
);

setProperty(String, 'hexDecode',
    function() {
        return parseInt(this, 16);
    }
);

setProperty(Number, 'hexDecode',
    function() {
        return this.toString().hexDecode();
    }
);

setProperty(Number, 'toHex',
    function() {
        return this.toString(16);
    }
);

setProperty(Number, 'insertToTextArea',
    function(textarea, moveRight = 0) {
        return this.toString().insertToTextArea(textarea, moveRight);
    }
);

setProperty(Number, 'clipboard',
    function() {
        return this.toString().clipboard();
    }
);

setProperty(Number, 'encode',
    function() {
        return this.toString().encode();
    }
);

setProperty(Number, 'toBraille',
    function() {
        return this.toString().toBraille();
    }
);

setProperty(Array, 'getRandom2',
    function(count = 1) {
        if (this.length !== 2)
        {
            throw new Error('2つの数値を配列として入力してください');
        }

        let min = this[0];
        let max = this[1];

        if (typeof min === 'number' && typeof max === 'number')
        {
            return getRandom2(min, max, count);
        } else {
            throw new Error('数値で入力してください');
        }
    }
);

setProperty(Array, 'getRandomValue',
    function() {
        let index = getRandom2(1, this.length) - 1;
        return this[index];
    }
);

setProperty(Array, 'newSort',
    function() {
        let target = this;

        // ソート
        target.sort(
            (str1, str2) => {
                let keyA = autoJSON(str1).encode();
                let keyB = autoJSON(str2).encode();
                return keyA.localeCompare(keyB);
            }
        );

        return target;
    }
);

setProperty(Array, 'autoToStr',
    function() {
        return (this.length === 1) ? this[0] : this;
    }
);

setProperty(Array, 'JSONstring',
    function(replacer = null, indent = null) {
        return JSON.stringify(this, replacer, indent);
    }
);

setProperty(Array, 'setToStorage',
    function() {
        // [key, value] でも [[key1: value1], [key2: value2], ...] でも叩ける設計ｗｗｗ
        if (typeof this[0] === 'string' && this.length === 2)
        {
            let [key, value] = this;
            value = autoJSON(value);
            localStorage.setItem(key, value);
        } else {
            this.forEach(
                (pair) => {
                    if (Array.isArray(pair) && pair.length === 2)
                    {
                        let [key, value] = pair;
                        value = autoJSON(value);
                        localStorage.setItem(key, value);
                    } else {
                        throw new Error(`正しくない値です: ${JSON.stringify(pair)}`);
                    }
                }
            );
        }

        return localStorage;
    }
);

setProperty(Array, 'setToParams',
    function() {
        let searchParams = new URLSearchParams(location.search);

        // [key, value] でも [[key1: value1], [key2: value2], ...] でも叩ける設計ｗｗｗ
        if (typeof this[0] === 'string' && this.length === 2)
        {
            let [key, value] = this;
            value = autoJSON(value);
            searchParams.set(key, value);
        } else {
            this.forEach(
                (pair) => {
                    if (Array.isArray(pair) && pair.length === 2)
                    {
                        let [key, value] = pair;
                        value = autoJSON(value);
                        searchParams.set(key, value);
                    } else {
                        throw new Error(`正しくない値です: ${JSON.stringify(pair)}`);
                    }
                }
            );
        }

        // 新しいURLを作成し、履歴を更新
        let newURL = location.pathname + '?' + searchParams.toString() + location.hash;
        history.replaceState(null, '', newURL);

        return location.href;
    }
);

setProperty(Object, 'setToParams',
    function() {
        let searchParams = new URLSearchParams(location.search);

        Object.entries(this).forEach(
            ([key, value]) => {
                searchParams.set(key, value);
            }
        );

        // 新しいURLを作成し、履歴を更新
        let newURL = location.pathname + '?' + searchParams.toString() + location.hash;
        history.replaceState(null, '', newURL);

        return location.href;
    }
);

setProperty(Object, 'setToStorage',
    function() {
        Object.entries(this).forEach(
            ([key, value]) => {
                localStorage.setItem(key, autoJSON(value));
            }
        );

        return localStorage;
    }
);

setProperty(Object, 'JSONstring',
    function(replacer = null, indent = null) {
        return JSON.stringify(this, replacer, indent);
    }
);

setProperty(Object, 'newSort',
    function() {
        let keys = Object.keys(this).newSort();
        let output = {};

        // 判定に使う型
        let types1 = ['[object String]', '[object Number]'];
        let types2 = ['[object Array]', '[object Object]'];

        keys.forEach(
            (key, index) => {
                let value = this[key];

                if (types1.includes(callStr(value)))
                {
                    output[key] = value;
                } else if (types2.includes(callStr(value))) {
                    output[key] = value.newSort();
                } else {
                    console.error('型エラー:', value);
                }
            }
        );

        return output;
    }
);

setProperty(Object, 'RGBtoHEX',
    function() {
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
    }
);

setProperty(Object, 'saveToDoc',
    async function(secondAPI = false, docId = false) {
        let API = '' + toggle(secondAPI, DocAPI_1, DocAPI_2) + (docId || defaultDocId);
        let payloadBody = { text: autoJSON(this) };

        await API.fetch(
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: payloadBody.JSONstring(null, 4)
            }
        );

        return this;
    }
);

setProperty(Object, 'setToProperty',
    function(targetElement) {
        // プロパティを要素に適用
        targetElement.setProperty(this);

        return targetElement;
    }
);

setProperty(URL, 'replaceToURL',
    function() {
        return this.toString().replaceToURL();
    }
);

setProperty(URL, 'getAllParams',
    function(type = 'obj') {
        let params = new URLSearchParams(this.search);

        if (type.toLowerCase().includes('arr'))
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
);

setProperty(URL, 'getParams2',
    function(key) {
        let url = this;
        let params = url.searchParams;
        return params.get(key);
    }
);

setProperty(URL, 'setParams2',
    function(...args) {
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
                        throw new Error(`正しくない値です: ${JSON.stringify(pair)}`);
                    }
                }
            );
        }

        // 新しいURLを作成
        return (this.pathname + '?' + searchParams.toString() + this.hash);
    }
);

setProperty(URL, 'getHash',
    function() {
        let hash = this.hash;
        return (hash.startsWith('#') ? hash.slice(1) : hash);
    }
);

setProperty(URL, 'setHash',
    function(text) {
        // let params = this.search ? ('?' + this.search) : '';
        let params = this.search;
        let hash = text ? ('#' + text) : '';

        // 新しいURLを作成
        return (this.pathname + params + hash);
    }
);

setProperty(HTMLElement, 'addElem',
    function(tagName, optionObj, isNs = false, nsURL = 'http://www.w3.org/2000/svg') {
        let elem = toggle(
            isNs,
            document.createElementNS(nsURL, tagName),
            document.createElement(tagName)
        );

        // optionObj のプロパティを要素に適用
        elem.setProperty(optionObj);

        this.appendChild(elem);
        return elem;
    }
);

setProperty(HTMLElement, 'setProperty',
    function(obj) {
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

        return this;
    }
);

setProperty(HTMLElement, 'getPx',
    function(type = 'obj') {
        let style = getComputedStyle(this);
        let xPx = style.width;
        let yPx = style.height;
        let x = Number(xPx.replace(/px/g, ''));
        let y = Number(yPx.replace(/px/g, ''));

        if (type.toLowerCase().includes('arr'))
        {
            return [x, y];
        } else {
            return { width: x, height: y };
        }
    }
);

setProperty(HTMLElement, 'setPx',
    function(width = false, height = false) {
        let x = width || this.getPx().width;
        let y = height || this.getPx().height;
        this.style.width = x.toString() + 'px';
        this.style.height = y.toString() + 'px';

        return this;
    }
);

setProperty(HTMLElement, 'showInfo',
    function() {
        let output = {};
        let style = getComputedStyle(this);

        output.style = {
            'animation': style.animation,
            'background-color': style.backgroundColor,
            'border': style.border,
            'box-shadow': style.boxShadow,
            'color': style.color,
            'display': style.display,
            'flex': style.flex,
            'font-size': style.fontSize,
            'font-family': style.fontFamily,
            'font-weight': style.fontWeight,
            'height': style.height,
            'left': style.left,
            'margin': style.margin,
            'padding': style.padding,
            'pointer-events': style.pointerEvents,
            'position': style.position,
            'text-align': style.textAlign,
            'text-decoration': style.textDecoration,
            'text-shadow': style.textShadow,
            'top': style.top,
            'transform': style.transform,
            'width': style.width
        };

        output.innerHTML = this.innerHTML.trimCenter(50);
        output.tagName = this.tagName.toLowerCase();
        output.value = this.value || '';

        output.attributes = {};

        Object.values(this.attributes).forEach(
            (key, index) => {
                output.attributes[key.localName] = key.value;
            }
        );

        // 無効なキーを削除
        Object.keys(output).forEach(
            (key) => {
                if (output[key] === '')
                {
                    delete output[key];
                }
            }
        );

        Object.keys(output.style).forEach(
            (key) => {
                if (output.style[key] === '')
                {
                    delete output.style[key];
                }
            }
        );

        return output;
    }
);

setProperty(HTMLElement, 'byQuery',
    function(query) {
        return this.querySelector(query);
    }
);

setProperty(HTMLElement, 'byQueryAll',
    function(query) {
        return this.querySelectorAll(query);
    }
);

setProperty(HTMLElement, 'byId',
    function(id) {
        let _id = id.startsWith('#') ? id.slice(1) : id;
        return this.getElementById(_id);
    }
);

setProperty(HTMLSelectElement, 'selectedOpt',
    function() {
        return this.byQuery(`[value="${this.value}"]`);
    }
);

setProperty(HTMLSelectElement, 'selectedText',
    function() {
        let all = this.byQueryAll(`[value="${this.value}"]`);
        let textList = [];

        all.forEach(
            (elem, index) => {
                textList.push(elem.innerText);
            }
        );

        return (textList.length === 1) ? textList[0] : textList;
    }
);

setProperty(HTMLTextAreaElement, 'insertText',
    function(insert, moveRight = 0) {
        let start = this.selectionStart;
        let end = this.selectionEnd;
        let val = this.value;

        // 値を更新
        this.value = val.substring(0, start) + insert + val.substring(end);

        // 挿入した文字の直後にカーソルを移動
        this.selectionStart = start + insert.length + moveRight;
        this.selectionEnd = start + insert.length + moveRight;

        // フォーカスを戻す
        this.focus();

        return this.value;
    }
);

setProperty(HTMLInputElement, 'insertText',
    function(insert, moveRight = 0) {
        let start = this.selectionStart;
        let end = this.selectionEnd;
        let val = this.value;

        // 値を更新
        this.value = val.substring(0, start) + insert + val.substring(end);

        // 挿入した文字の直後にカーソルを移動
        this.selectionStart = start + insert.length + moveRight;
        this.selectionEnd = start + insert.length + moveRight;

        // フォーカスを戻す
        this.focus();

        return this.value;
    }
);

setProperty(HTMLTextAreaElement, 'getSelection',
    function() {
        let start = this.selectionStart;
        let end = this.selectionEnd;

        let left = this.value.substring(0, start);
        let center = this.value.slice(start, end);
        let right = this.value.substring(end);
        return [left, center, right];
    }
);

setProperty(HTMLInputElement, 'getSelection',
    function() {
        let start = this.selectionStart;
        let end = this.selectionEnd;

        let left = this.value.substring(0, start);
        let center = this.value.slice(start, end);
        let right = this.value.substring(end);
        return [left, center, right];
    }
);

console.log('javascript.jsが読み込まれました！');
