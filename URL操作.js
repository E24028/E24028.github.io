function getParams(params)
{
    const url = new URL(window.location.href);
    const params = url.searchParams;
    return params.get(params);
}

function setParams(...pairs)
{
    // pairs は [[params1, value1], [params2, value2], ...] という構造の配列として指定

    // URLSearchParamsオブジェクトを作成
    var searchParams = new URLSearchParams(window.location.search);

    pairs.forEach(
        (pair, index) => {
            const [params, value] = pair;

            // パラメーターを更新
            searchParams.set(params, value);
        }
    );

    // 新しいURLを作成し、ページをリロード
    var newURL = window.location.pathname + '?' + searchParams.toString();

    window.history.replaceState(null, '', newURL);
}
