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

String.prototype.replaceURL = function() {
    try
    {
        history.replaceState(null, '', this);
    } catch (e) {
        console.error(e);
        return `エラー: ${e.message || e}`;
    }
}

String.prototype.clipboard = function() {
    // 一時的な textarea 要素を作成
    let textarea = document.createElement('textarea');
    textarea.value = this;

    // 画面外へ
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '-9999px';

    document.body.appendChild(textarea);

    // 選択してコピー実行
    textarea.select();
    let success = document.execCommand('copy');

    // 要素を削除
    document.body.removeChild(textarea);

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
    return new URL(this);
};

String.prototype.getParams2 = function() {
    let url = new URL(location.href);
    let params = url.searchParams;
    return params.get(this);
};

Array.prototype.getRandom2 = function() {
    if (this.length !== 2)
    {
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
        return '数値で入力してください';
    }
}

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

URL.prototype.getHash = function() {
    let hash = this.hash;
    return (hash.startsWith('#') ? hash.slice(1) : hash);
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
