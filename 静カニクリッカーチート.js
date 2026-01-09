var Element = document.createElement('div');
var Element1 = document.createElement('div');
var Element2 = document.createElement('div');
var Element = document.createElement('div');
var Button = document.createElement('button');
var A = 70;

function onClickerLoaded()
{
    document.body.appendChild(Element);
    document.body.appendChild(Element1);
    document.body.appendChild(Element2);
    document.body.appendChild(Button);
    Element.innerText = '自動連打ツール';
    Button.onclick = clickA;
    Button.innerText = '効率増加ボタン';
}
onClickerLoaded();

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

function clickA()
{
    clickIncrease *= 10;
}

// 埋め込みコード
// <script src="https://E24028.github.io/静カニクリッカーチート.js"></script>
