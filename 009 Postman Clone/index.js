
// Hide the parameters box initially
let parametersBox = document.getElementById('parametersBox')
parametersBox.style.display = "none";

// If the user clicks on params, hide json box
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = "none";
    document.getElementById('parametersBox').style.display = "block";
})

// If the user clicks on json box, hide params box
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('parametersBox').style.display = "none";
    document.getElementById('requestJsonBox').style.display = "block";
})

// If the user clicks on + button add more parameters
let addedParamCount = 0;
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    let params = document.getElementById('params');
    let str = `
                <div class="form-row d-flex justify-content-between my-2">
                    <legend class="col-form-label col-sm-2">Parameter ${addedParamCount + 2}</legend>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterKey${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} key">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterValue${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} value">
                    </div>
                    <button class="btn btn-primary deleteParam"> - </button>
                </div>
            `
    // convert the element string to DOM node
    let paramElement = getDOM(str);
    params.appendChild(paramElement);

    // add event listener to remove the parameter on clicking - button
    let deleteParams = document.getElementsByClassName('deleteParam');
    for (item of deleteParams) {
        item.addEventListener('click', (e) => {
            // TODO - add a confirmation box
            e.target.parentElement.remove();
        })
    }

    addedParamCount++;


})

// if user clicks on submit button
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    // show please wait in the response box to request patience from user
    document.getElementById('responseJsonTextBox').value = 'Please wait... Fetching response';
    // fetch values user has entered
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    // console.log(`URL: ${url}`);
    // console.log(`requestType: ${requestType}`);
    // console.log(`contentType: ${contentType}`);

    // if user has params option, collect all parameters
    if (contentType == 'params') {
        data = {};
        for (let i = 0; i < addedParamCount + 1; i++) {

            if (document.getElementById(`parameterKey${i + 1}`) != undefined) {
                let key = document.getElementById(`parameterKey${i + 1}`).value;
                let value = document.getElementById(`parameterValue${i + 1}`).value;

                data[key] = value;
            }
        }
        data = JSON.stringify(data);

    } else {
        data = document.getElementById('requestJsonTextBox').value;
    }

    console.log(`URL: ${url}`);
    console.log(`requestType: ${requestType}`);
    console.log(`contentType: ${contentType}`);
    console.log(`data: ${data}`);

    // if request type is get, fetch api to get request
    if (requestType == 'get') {
        fetch(url, {
            method: 'GET'
        })
            .then(response => response.text())
            .then((text) => {
                document.getElementById('responseJsonTextBox').innerHTML = text;
                Prism.highlightAll();
            })
    } else {

        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            } 
        })
            .then(response => response.text())
            .then((text) => {
                document.getElementById('responseJsonTextBox').innerHTML = text;
                Prism.highlightAll();
            })

    }

})



// utility functions

// function to get DOM element from string
function getDOM(str) {
    let div = document.createElement('div');
    div.innerHTML = str;
    return div.firstElementChild;
}