function out(x) {
    console.log(x);
}

// varables
let list = []; // arr of api pages
let guestCount = 0;
let maxTry = 8;
let theWord; // the word to guess
let correctChars = 0; // number of corrected guess
let enDis = true; // flag to disable/enable elements


toggleEnDisElems(enDis);

// initializin page at first load and when game is finished
function toggleEnDisElems(tog) {

    let elems = [];
    let charInput = $('#charGuess');
    let wordInput = $('#wordGuess');
    let btnStart = $('#start');
    let btnWordG = $('#wordguessbtn');
    let btnCharG = $('#charguessbtn');

    //elements needs to be disabled
    elems = [charInput, wordInput, btnStart, btnWordG, btnCharG];
    $(elems).each((indx) => {

        $(elems[indx]).prop('disabled', tog);

    });
}

//prepare to start
function initGame() {

    toggleEnDisElems(false); // enable elements

    guestCount = 0; // wrong answer set to zero
    generateInput(); // create empty char containers

}

/* 
connect to starwars api and create a arr of names 
for specific caegory
categories: people/Planet/species/Star Ships/Vehicles
*/
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

// event lisner for select tag
$('#lists').on('change', () => {

    //value of selected option
    let cat = $('#lists option:selected').val().toLowerCase();

    //url of selected category
    let thisUrl = 'https://swapi.dev/api/' + cat + '/?page=1';

    $('#start').prop('disabled', false);// enable start btn

     // disable dropdownlist to prevent switching the category
    $('#lists').prop('disabled',true);
    $('#theWordRes').text(''); // reseting result tag 
    $('#stateImg').attr('src', imgArr[0]);//resting the img
    $('#progress .progress-bar').css('width', '0%');// reseting progress bar to zero

    doList(thisUrl); // making arr of names
});

// select randomly from array of names
function chooseOne(arr) {
    return arr[(Math.floor(Math.random() * arr.length))];
}

// position of char in string
function charPos(char, str) {
    var indexes = [];
    var i = -1;
    /* 
        if any char exists in the word the 
        indexes are stored into an arr
        the indexes will be used to place the letters in the 
        right places after player guesses
    */
    while ((i = str.indexOf(char, i + 1)) >= 0) {
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

/* 
    decides the chars player enters

    if any tries left and the char exists inside word 
    the chars will be placed in the designated places
*/
function charGuess() {
    let char = $('#charGuess').val().toLowerCase();
    let str = theWord.toLowerCase();
    let charIndx = charPos(char, str); // char exists in the word
    if (char.length == 1) { // input box not empty, not more than one charachter
        // check guest limit
        if (maxTry > guestCount) { // tries
            if (charIndx.length > 0) {// if exists
                for (let i in charIndx) { 
                    $('#charInput' + charIndx[i]).val(char);
                    correctChars++;
                }
            } else {// wrong guess
                guestCount++; // increase wrong response count

                $('#theWordRes').text('/' + char + '/ Not found in the Word'); // notify player
            }
        } else {// no more tries left
            $('#theWordRes').text('the word was  >>>  ' + theWord + '  <<<  better luck Next Time'); // message to player
            $('#lists').prop('disabled',false); // enable dropdownlist to be able to restart
            
            toggleEnDisElems(true);
            $('#box').empty();
        }
    } else {
        $('#theWordRes').text('Be careful!! It is only ONE charachter');
    }
    $('#charGuess').val('');
    changeState();
}

function wordGuess() {

    let inputVal = $('#wordGuess').val();
    let str = theWord.toLowerCase();

    // check strings
    // if match alert win
    if (maxTry > guestCount) {// check guest limit
        if (equalStrs(inputVal, str)) {// find in string
            $('#theWordRes').text('You are Hell Of a Fan!!!');
        } else {  
            guestCount++;
            $('#theWordRes').text('/' + str + '/is Not the one!!');
        }
    } else {
        $('#theWordRes').text('the word was  >>>  ' + theWord + '  <<<  better luck Next Time');
        toggleEnDisElems(true);
        $('#box').empty();
    }

    changeState(); //img go to next 

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
    let imgIndx = guestCount;
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