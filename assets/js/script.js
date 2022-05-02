/*
Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.
Dopo 30 secondi l’utente deve inserire, uno alla volta, i numeri che ha visto precedentemente, tramite il prompt().
Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.
*/


/*********
    INIT
**********/

let secondsToWait = 5;
const totalNumbers = 5;
const randomNumbers = [];

/*************
   FUNCTIONS
**************/


// con le arrow function non ho i return implicito i n assenza delle {}
const getRandomNumbers = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);


// funzione che stampa tutti i messaggi
const printMessages = (message, numbers) => {
    document.getElementById('message').innerHTML = message;
    document.getElementById('numbers').innerHTML = numbers;
}

const getUserNumbers = () => {
    const numbers = [];

    // genero un prompt fino a quando non ho scritto tutti i numeri
    while(numbers.length < totalNumbers){
        const newNumber = parseInt(prompt('Inserisci un numero'));
        // se il numero è già inserito non lo aggiungo alla ista e lancio un alert
        if(!numbers.includes(newNumber)){
            numbers.push(newNumber)
        }else{
            alert('Numero già inserito!')
        }
    }

    // restituisco i numeri estratti
    return numbers;
}

// accetta come parametro un aarray di numeri (da controllare)
const getGuessedNumbers = (numbersToCheck) => {
    const guessedNumbers= [];

    // ciclo i numeri corretti e verifico la loro presenza dentro l'array dei nnumeri da controllare
    for(let i = 0; i < randomNumbers.length; i++){
        console.log('Verifico se ',randomNumbers[i], 'è presente in ', numbersToCheck);
        if(numbersToCheck.includes(randomNumbers[i])){
            // se è presente lo pusho
            guessedNumbers.push(randomNumbers[i])
        }
    }

    // restituisco i numeri corretti
    return guessedNumbers;
}

/********************
   TIMING FUNCTIONS
*********************/

// stampo un nuovo messaggio ad ogni secondo attendendo un secondo prima di partire
const countDown = setInterval(function(){
    // stampo ogni momento del countdown
    printMessages(`Hai ${--secondsToWait} secondi per indovinare i seguenti numeri`, randomNumbers);
},1000);


// allo scadere dei secondi nascondo i numeri, scrivo un messaggio e interrompo il countdown
setTimeout(function(){
    clearInterval(countDown);
    printMessages("Te li ricordi tutti?", '');
}, secondsToWait * 1000);

// all scadere dei secondi + 1 (per dare il tempo di legger eil messaggio precedente faggio partire l'interrazione con l'utente)
setTimeout(function(){
    printMessages("Scrivi tutti i numeri", '');
    
    // delogo a una funzione la generazione dei prompt e salco i risultati in un array
    const userNumbers = getUserNumbers();

    // delego a una funzione il controllo dei numeri corretti e li salvo in nun array
    const guessedNumbers = getGuessedNumbers(userNumbers);

    // se l'array è vuoto non ho indovinato nulla
    if(guessedNumbers.length === 0){
        printMessages('Non hai indovinato nulla!!','');
    }else{
        // stampo i numeir indovinati
        printMessages(`Hai indovinato ${guessedNumbers.length} numeri su ${totalNumbers}`, guessedNumbers);
    }

    console.log(guessedNumbers);

}, (secondsToWait + 1) * 1000)


/*************
   START
**************/
// genero i numeri random (univoci) e li stampo
while(randomNumbers.length < totalNumbers){
    const newRandomNumber = getRandomNumbers(1,100);
    if(!randomNumbers.includes(newRandomNumber)){
        randomNumbers.push(newRandomNumber);
    }
}

printMessages(`Hai ${secondsToWait} secondi per indovinare i seguenti numeri`, randomNumbers);


// ..... tra poco partono le timing function ......