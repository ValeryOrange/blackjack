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
const Player = require('./Player');

// создается новая игра
const newGame = new Game(Deck);

const createNewUser = () => {
  return new Promise((resolve, reject) => {
    resolve();
  });
};

const gameLogic = async () => {
  try {
    const userName = await createNewUser(newGame.setUserName);
    const dealer = new Player('Agent Smith', 'dealer');
    const user = new Player(userName, 'user');
    const players = [dealer,user];
    console.log('Agent Smith is dealer.');
    newGame.firstDealing(players);
  } catch (e) {
    console.error(e.message);
  }
}

gameLogic();




