function out(x) {
    console.log(x);
}

let list = [];
let guestCount = 1;
let maxTry = 5;
let theWord;
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
    out(thisUrl);
    doList(thisUrl);
});

// select randomly from array

function chooseOne(arr) {
    return arr[(Math.floor(Math.random() * arr.length))];
}
// position char in string

function charPos(char, str) {
    var indexes = [];
    var i = -1;
    out('Position:' + str);
    while ((i = str.indexOf(char, i + 1)) >= 0) {
        out(i);
        indexes.push(i);
    }
    return indexes;
}

// compare two string
function equalStrs(srtUser, strRandom) {
    return srtUser.toLowerCase() === strRandom.toLowerCase();

}

// if char is in string
function charExists(char, str) {
    return charPos(char, str).length > 0;
}

function charGuess() {
    let char = $('#charGuess').val().toLowerCase();
    let str = theWord.toLowerCase();

    // check guest limit
    if (maxTry != guestCount) {
        if (charIndx.length > 0) {// find in string
            for (let i in charIndx) {

                $('#charInput' + charIndx[i]).val(char);
            }
        } else {
            guestCount++;
            out('not in the word:' + char);
        }

    } else {
        alert('Guesses finished!!')
        /* to do */
        // function new game
    }

    $('#charGuess').val('');
}

$('#charguessbtn').on('click', charGuess);
$('#wordguessbtn').on('click', wordGuess);

function wordGuess() {

    let inputVal = $('#wordGuess').val();
    let str = theWord.toLowerCase();

    // check strings
    // if match alert win
    if (maxTry != guestCount) {// check guest limit
        if (equalStrs(inputVal,str)) {// find in string
            alert('You won!')
        } else {
            guestCount++;
            out('not the word:' + inputVal);
        }
    } else {
        alert('Guesses finished!!')
        /* to do */
        // function new game
    }
}

function generateInput() {

    $('#box').empty();
    theWord = chooseOne(list);

    for (let index = 0; index < theWord.length; index++) {
        $('#box').append('<input id="charInput' + index + '" type="text">')
    }
}

function initGame(){

    generateInput();
    
}

$('#charguessbtn').on('click', charGuess);
$('#wordguessbtn').on('click', wordGuess);
$('#start').on('click', initGame);