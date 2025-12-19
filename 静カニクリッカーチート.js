var Element = document.createElement('div');
document.body.appendChild(Element);

var Element1 = document.createElement('div');
document.body.appendChild(Element1);

var Element2 = document.createElement('div');
document.body.appendChild(Element2);

Element.innerText = '自動連打ツール';

var A = 50;

function Forever(n)
{
    var mainImage = document.getElementById('mainImage')
    mainImage.click();
    var FixedValue = (n / A).toFixed(3);

    var clickArea = document.getElementById('clickArea')
    clickArea.click();
    Element1.innerText = n + ' 回目のクリック！';


    Element2.innerText = FixedValue + ' 秒経過！';

    setTimeout(Forever, 10, n + 1);
}
Forever(1);

function Plus()
{
    A += 1;
}

function Minus()
{
    A -= 1;
}

// 埋め込みコード
// <script src="https://E24028.github.io/静カニクリッカーチート.js"></script>
