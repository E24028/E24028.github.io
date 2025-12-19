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
