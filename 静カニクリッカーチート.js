var Element = document.createElement('div');
document.body.appendChild(Element);

var Element1 = document.createElement('div');
document.body.appendChild(Element1);

var Element2 = document.createElement('div');
document.body.appendChild(Element2);

function Forever(n)
{
    var mainImage = document.getElementById('mainImage')
    mainImage.click();

    var clickArea = document.getElementById('clickArea')
    clickArea.click();

    Element.innerText = '自動連打ツール';
    Element1.innerText = n + ' 回目のクリック！';
    Element2.innerText = (n / 100) + ' 秒経過！';

    setTimeout(Forever, 10, n + 1);
}
Forever(1);

// 埋め込みコード
// <script src="https://E24028.github.io/静カニクリッカーチート.js"></script>
