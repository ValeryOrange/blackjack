/**
* @Module Game
* @describe Логика игры
* @author Valeriya Tokareva <tkrv.valery@gmail.com>
* @requires chalk
* @version 1.0.0
**/

// внешние модули
const chalk = require('chalk');

// внутренние модули
const readline = require('readline');


// число карт каждому игроку во время первой раздачи
const FIRST_NUMBER = 2;

module.exports = class Game {
  /**
  * @param {Array} deck колода карт
  */
  constructor(deck) {
    this.isWinner = false;
    this.deck = deck;
  }

  /**
  * @description приветствует пользователя и спрашивает его имя
  * @return {String} имя пользователя
  */
  setUserName() {
    let name = '';
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    console.log("Hello! Welcome to our blackjack casino! Let's see how deep the rabbit-hole goes.");

    rl.question('What is your name?\n', (answer) => {
      name = answer && answer !== ' ' ? answer : 'Mr. Anderson';
      rl.close();
    });

    return name;
  }

  /**
  * @return {Number} вес возвращенной карты
  * private
  */
  getCard() {
    const randomIndex = Math.floor(Math.random()*this.deck.length);
    const dealtCard = this.deck.splice(randomIndex, 1)[0];
    return dealtCard;
  }

  /**
  * @param {Array} массив игроков
  * @description выдает игроку одну карту
                 если счет больше 21 и выпал туз, то его вес 11 очков
    в node.js нет деструктуризаци?
  */

  dealCard(players) {
    let i = players.length;
    for (i;i--;) {
      let card = this.getCard()
      players[i].addPoints(card);
      if (card === 11 && players[i].score >= 21) {
        players[i].addPoints(-10);
      }
      console.log(`${players[i].name} has ${players[i].score} points`);
      players[i].cardNumber++;
    }
  }

  /**
  * @param {Array} массив игроков
  * @description при первой раздаче раздает каждому игру несколько карт
  */
  firstDealing(players) {
    let i = FIRST_NUMBER;
    for (i;i--;) {
      this.dealCard(players);
    }
  }
};
