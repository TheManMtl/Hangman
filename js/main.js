function out(x) {
    console.log(x);
}
let list = [];
function doList(url) {

    $.get(url, (res) => {
        res.results.forEach(element => {
            list.push(element.name);
        });
        if (res.next !== null) {
            doList(res.next);
        }
    })
}

$('#lists').on('change', () => {
    let cat = $('#lists option:selected').val().toLowerCase();
    let thisUrl = 'https://swapi.dev/api/' + cat + '/?page=1';
    doList(thisUrl);
});

// select randomly from array

function chooseOne(arr) {
    return arr[(Math.floor(Math.random() * arr.length))];
}
// position char in string

function isCharIn(char, str) {
    var indexes = [];
    var i = -1;
    while ((i = string.indexOf(char, i + 1)) >= 0) indexes.push(i);
    return indexes;
}

// compare two string
function equalStrs(srtUser, strRandom) {
    return srtUser.toLowerCase() === strRandom.toLowerCase();

}

// if char is in string
function charExists(char, str) {
    return isCharIn(char, str).length > 0;
}

limit = 5

function generateInput() {

    let string = chooseOne(list);
    for (let index = 0; index < string.length; index++) {
        $('#box').append('<input id="charInut"' + index + ' type="text">')
    }


    let input = document.createElement()
    input.classList.add('');
    input.attr('id', 'charInput' + i)


    $('#charInput' + 2).val()
    // be tedade string entekhab shode generate inputs
    // add generated input to a

}