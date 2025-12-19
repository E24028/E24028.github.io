var Element1 = document.createElement('div');
document.body.appendChild(Element1);

var Element2 = document.createElement('div');
document.body.appendChild(Element2);

var Element3 = document.createElement('div');
document.body.appendChild(Element3);

var Element4 = document.createElement('div');
document.body.appendChild(Element4);

function Forever(n)
{
    var mainImage = document.getElementById('mainImage')
    mainImage.click();

    var clickArea = document.getElementById('clickArea')
    clickArea.click();

    Element1.innerText = n + ' 回目のクリック！';
    Element2.innerText = n + ' 回目のクリック！';
    Element3.innerText = n + ' 回目のクリック！';
    Element4.innerText = n + ' 回目のクリック！';

    setTimeout(Forever, 2, n + 1);
}
Forever(1);

// 埋め込みコード
// <script src="https://E24028.github.io/静カニクリッカーチート.js"></script>
