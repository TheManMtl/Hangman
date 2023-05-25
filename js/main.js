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



function generateInput() {

    $('#box').empty();
    theWord = chooseOne(list);
    out(theWord)

    for (let index = 0; index < theWord.length; index++) {
        $('#box').append('<input id="charInput' + index + '" type="text">')
    }
}



function charGuess() {
    char = $('#charGuess').val().toLowerCase();
    str = theWord.toLowerCase();
    out(char);
    out(str);
    let charIndx = charPos(char, str);
    // check guest limit
    if (maxTry != guestCount) {
        if (charIndx.length > 0) {// find in string
            for (let i in charIndx) {
                out('index: ' + charIndx[i])
                $('#charInput' + charIndx[i]).val(char);
            }
        }

    }else{
        alert('Guesses finished!!')
        /* to do */
        // function new game
    }
    guestCount++;
    $('#charGuess').val('');
}

$('#charguessbtn').on('click', charGuess);

function wordGuess(inp, str) {

    // check guest limit

    // check strings
    // if match alert win

    guestlimit++;

}