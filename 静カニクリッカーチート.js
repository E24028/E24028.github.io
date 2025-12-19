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

// 埋め込みコード
// <script src="https://E24028.github.io/静カニクリッカーチート.js></script>
