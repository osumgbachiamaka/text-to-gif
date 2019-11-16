const gif = "http://api.giphy.com/v1/gifs/";
const translate = 'translate';
const search = 'search';
const api_key = "QeuRpqUf9nYgvIzxiS2xqDRVtQJUZc7t";
const retrievedData = {}

const btn = document.querySelector('.btn')
btn.addEventListener('click', (e) => {
    fetchApi()
})

const fetchApi = () => {
    const text = document.querySelector('input').value
    fetchTransalateApi(text)
    fetchSearchApi(text)
}

const fetchTransalateApi = (text) => {
    const query = `s=${text}&`;
    const api = `${gif}${translate}?${query}api_key=${api_key}`;

    console.log('about to fetch')
    fetch(api)
    .then(response => response.json())
    .then((data) => destructureTranslateApi(data))
    .catch(err => console.log(err))
}

const fetchSearchApi = (text) => {
    const query = `q=${text}&`;
    const api = `${gif}${search}?${query}api_key=${api_key}&limit=6`;

    fetch(api)
    .then(response => response.json())
    .then((data) => destructureSearchApi(data))
    .catch(err => console.log(err))
}

const destructureTranslateApi = (result) =>{
    const {data} = result
    // console.log(data.images.original)
    retrievedData.data = data.images.original.url;
    retrievedData.user = data.user;
    showTranslateApi(retrievedData);
}

const destructureSearchApi = (result) =>{
    const {data} = result
    // console.log(data)
    showSearchApi(data);
}

const showTranslateApi = (results) => {
    //destructuring result
    const {data, user} = results
    const gifDisplay = document.querySelector('.gif')
    let image = `
        <div class='copyDiv'>
            <input type = 'text' value = '${data}' readonly class='url'>
            <button onclick="myFunction()" onmouseout="outFunc()">
            <span class="tooltiptext">Copy to clipboard</span>
                Copy url
            </button>
        </div>
        <img src = '${data}' class='translateGif' alt = >
    `
    gifDisplay.insertAdjacentHTML('beforeend', image)
}

const showSearchApi = (result) => {
    const table = document.querySelector('.gif--search .search--row')
    
    result.forEach(element => {
        const data = element.images.original.url;
        
        let tableRow = `
            <td class="search--column">
                <div class='copyDiv'>
                    <input type = 'text' value = '${data}' readonly class='url'>
                    <button onclick="myFunction()" onmouseout="outFunc()">
                    <span class="tooltiptext">Copy to clipboard</span>
                        Copy url
                    </button>
                </div>
                <img src = '${data}' class='translateGif' alt = >
            </td>
        `
        table.insertAdjacentHTML("beforeend", tableRow)
    });
}

const myFunction = () => {
    var copyText = document.querySelector(".url");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");

    var tooltip = document.querySelector(".tooltiptext");
    tooltip.innerHTML = "Gif url copied";
}
  
const outFunc = () =>{
    var tooltip = document.querySelector(".tooltiptext");
    tooltip.innerHTML = "Copy to clipboard";
}
