// 1
var Element = document.createElement('div');
document.body.appendChild(Element);

function Forever(n)
{
    var mainImage = document.getElementById('mainImage')
    mainImage.click();

    var clickArea = document.getElementById('clickArea')
    clickArea.click();

    Element.innerText = 'click! ' + n;

    setTimeout(Forever, 10, n + 1);
}
Forever(1);

// 2
var Element2 = document.createElement('div');
document.body.appendChild(Element2);

function Forever2(n)
{
    var mainImage = document.getElementById('mainImage')
    mainImage.click();

    var clickArea = document.getElementById('clickArea')
    clickArea.click();

    Element2.innerText = 'click! ' + n;

    setTimeout(Forever2, 10, n + 1);
}
Forever2(1);

// 3
var Element3 = document.createElement('div');
document.body.appendChild(Element3);

function Forever3(n)
{
    var mainImage = document.getElementById('mainImage')
    mainImage.click();

    var clickArea = document.getElementById('clickArea')
    clickArea.click();

    Element3.innerText = 'click! ' + n;

    setTimeout(Forever3, 10, n + 1);
}
Forever3(1);

// 4
var Element4 = document.createElement('div');
document.body.appendChild(Element4);

function Forever4(n)
{
    var mainImage = document.getElementById('mainImage')
    mainImage.click();

    var clickArea = document.getElementById('clickArea')
    clickArea.click();

    Element4.innerText = 'click! ' + n;

    setTimeout(Forever4, 10, n + 1);
}
Forever4(1);

// 埋め込みコード
// <script src="https://E24028.github.io/静カニクリッカーチート.js"></script>
