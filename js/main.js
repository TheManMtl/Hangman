function out(x) {
    console.log(x);
}

// varables
let list = [];
let guestCount = 1;
let maxTry = 8;
let theWord;
let correctChars = 0;
let enDis = true; // flag to disable/enable

// initializin page at first load and when game is finished
onLoad(enDis);

function onLoad(tog) {

    let elems = [];
    let charInput = $('#charGuess');
    let wordInput = $('#wordGuess');
    let btnStart = $('#start');
    let btnWordG = $('#wordguessbtn');
    let btnCharG = $('#charguessbtn');

    //elements needs to be disabled
    elems = [charInput, wordInput, btnStart, btnWordG, btnCharG];
    $(elems).each((ind) => {

        $(elems[ind]).prop('disabled', tog);
    });
}

//prepare to start
function initGame() {

    onLoad(false); // enable
    let box = $('#box');

    guestCount = 1;
    generateInput();

}

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
    $('#start').prop('disabled', false);// enable start btn
    $('#lists').prop('disabled',true); // disable dropdownlist to prevent switching the category
    $('#theWordRes').text(''); // deleting resul tag 
    $('#stateImg').attr('src', imgArr[0]);//rest the img
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
    let charIndx = charPos(char, str); // char exists in the word
    if (char.length == 1) {
        // check guest limit
        if (maxTry != guestCount) {
            if (charIndx.length > 0) {// find in string
                for (let i in charIndx) {
                    $('#charInput' + charIndx[i]).val(char);
                    correctChars++;
                }
            } else {
                guestCount++;

                $('#theWordRes').text('/' + char + '/ Not found in the Word');
            }
        } else {
            $('#theWordRes').text('the word was  >>>  ' + theWord + '  <<<  better luck Next Time');
            $('#lists').prop('disabled',false); // enable dropdownlist to be able to restart
            /* to do */
            // function new game
        
            onLoad(true);
            $('#box').empty();
        }
    } else {
        alert('Be careful!! It is a charachter ONLY');
    }
    $('#charGuess').val('');
    changeState();
}

function wordGuess() {

    let inputVal = $('#wordGuess').val();
    let str = theWord.toLowerCase();

    // check strings
    // if match alert win
    if (maxTry != guestCount) {// check guest limit
        if (equalStrs(inputVal, str)) {// find in string
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

    changeState()

}

function generateInput() {


    let inputClasses = 'col form-control mx-1 my-1 border-0 border-bottom border-dark text-center fs-1';
    $('#box').empty();

    theWord = chooseOne(list);
    $('#box').addClass('row');
    for (let index = 0; index < theWord.length; index++) {

        $('#box').append('<input class="' + inputClasses + '" id="charInput' + index + '" type="text" disabled>')
    }
}


$('#charguessbtn').on('click', charGuess);
$('#wordguessbtn').on('click', wordGuess);
$('#start').on('click', initGame);

const imgArr = [
    '/images/0.png',
    '/images/01.jpg',
    '/images/02.jpg',
    '/images/03.jpg',
    '/images/04.jpg',
    '/images/05.jpg',
    '/images/06.jpg',
    '/images/07.jpg',
    '/images/08.jpg',
];

function changeState() {
    let imgIndx = guestCount - 1;
    $('#stateImg').attr('src', imgArr[imgIndx]);
    $('#progress .progress-bar').css('width', (correctChars * 100) / theWord.length + '%');
}


/* 
    how to play

    - select the category of starwars
    - click the start button
    - start gussing the characters by entering charachters into the box
    - then click the Char Guess button
    - If you already guessed the word type in the word and click the Word Guess button
    - Remember you hav EIGHT choises
*/