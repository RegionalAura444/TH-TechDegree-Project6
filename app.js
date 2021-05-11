document.addEventListener('DOMContentLoaded',() => {
    //Global Variables
    const keyboard = document.getElementById('qwerty');
    const phrase = document.getElementById('phrase');
    const overlayDiv = document.getElementById('overlay');
    const heading = overlayDiv.getElementsByTagName("h2")[0];
    const buttonReset = document.getElementsByClassName('btn__reset')[0];
    const letter = document.getElementsByClassName("letter");
    let show = document.getElementsByClassName("show");
    let missed = 0;
    const lives = document.querySelectorAll('img');
    const phrases = [
        'kaa na mama yako', 
        'ambia morio hukupea',
        'hiyo ndio maendeleo', 
        'mwambie agonge mbili',
        'ala ala ala' ];

    function getRandomPhraseAsArray(arr) {
    
        const random = Math.floor (Math.random() * arr.length);
        //splits to new arrays of chars
        const str = arr[random];
        const characterArray = str.split('');
        //return new character array
        return characterArray;
    }

    function addPhraseToDisplay(arr) {
        //loop through arr, 
        for (let i = 0; i < arr.length; i++) {
            const li = document.createElement('li');
            li.textContent = arr[i];
            if (arr[i] !== ' ') {
                li.className = "letter";
            } else {
                li.className = "space";
            }
            phrase.appendChild(li);
        }
    }
    //Letter class checker
    function checkLetter(button) {
        const ListLi = phrase.getElementsByTagName('li');
        let match = null;
        for (let i = 0; i<ListLi.length; i++) {
            if (ListLi[i].className==="letter" && button.textContent === ListLi[i].textContent) {
                ListLi[i].classList.add("show");
                ListLi[i].style.transition = "all .5s";
                match = button.textContent;
            } 
        }
        //if no match found, return match = null and exit function
        return match;
    }

    //listen for the "Start Game" button
    buttonReset.addEventListener('click', () => {
        overlayDiv.style.display = "none";
        });

    //listen for onscreen keyboard clicks
    keyboard.addEventListener("click", (e) => {
        if (e.target.tagName === 'BUTTON' && !e.target.classList.contains('chosen')) {
            e.target.classList.add("chosen");
            e.target.disabled=true;
            let letterFound = checkLetter(e.target);
            if (!letterFound) {
                missed++;
                const lostLife = 5 - missed;
                lives[lostLife].setAttribute("src","images/lostHeart.png");
            }
        }
        checkWin();
    });

    function resetGame() {
        //reset lives
        const lostLife = 5 - missed;
        for (let i =4; i>=lostLife; i--) {
            lives[i].setAttribute("src","images/liveHeart.png");
        }
        //reset overlayDiv
        if (missed >= 5) {
            overlayDiv.classList.remove("lose");
        } else if (letter.length === show.length) {
            overlayDiv.classList.remove("win");
        }
        missed = 0;
        //recreate keyboard
        const chosenButtons = document.querySelectorAll(".chosen");
        for (let i = 0; i < chosenButtons.length; i++) {
            chosenButtons[i].disabled = false;
            chosenButtons[i].classList.remove("chosen");
        }
        //new phrase
        while (phrase.firstChild) {
            phrase.removeChild(phrase.lastChild);
        }
        phraseArray = getRandomPhraseAsArray(phrases);
        addPhraseToDisplay(phraseArray);

    }

    // checks if user wins or loses by checking shown letter length, or missed count
    function checkWin() {
        if (letter.length === show.length) {
            overlayDiv.classList.add("win");
            heading.textContent = "You won! Bring the Tea and Biscuits"
            overlayDiv.style.display = "flex";
            buttonReset.textContent = "Play Again."
            buttonReset.addEventListener('click', () => {
                resetGame();
                });
        } else if (missed >= 5) {
            overlayDiv.classList.add("lose");
            heading.textContent = "Sorry,you lost the game mate,bugger off or..."
            overlayDiv.style.display = "flex";
            buttonReset.textContent = "Play Again."
            buttonReset.addEventListener('click', () => {
                resetGame();
                });
        }
    }


    let phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);
});
