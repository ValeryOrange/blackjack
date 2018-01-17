/**
* @Module Blackjack
* @describe Эмулирует игру с дилером по упрощенным правилам блэкджека
* @author Valeriya Tokareva <tkrv.valery@gmail.com>
* @requires chalk
* @version 1.0.0
**/

// внешние модули
const chalk = require('chalk');

// внутренние модули
const Game = require('./Game');
const Deck = require('./SetDeck');


// создается новый игровой цикл
const newGame = new Game(Deck);

const userName = newGame.setUserName();
console.log('Agent Smith is dealer.');

newGame.firstDealing();


