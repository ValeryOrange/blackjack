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
const blockBreak = require('./BlockBreak');


// число карт каждому игроку во время первой раздачи
const FIRST_NUMBER = 2;

module.exports = class Game {
  /**
  * @param {Array} deck колода карт
  */
  constructor(deck) {
    this.winner = '';
    this.deck = deck;
  }

  /**
  * @description приветствует пользователя и спрашивает его имя
  * @return {String} имя пользователя
  */
  setUserName() {
    return new Promise((resolve, reject) => {
      let name = '';
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      console.log("Hello! Welcome to our blackjack casino! Let's see how deep the rabbit-hole goes.");
      blockBreak();

      rl.question('What is your name?\n', (answer) => {
        if (answer && answer !== ' ') {
          name = answer;
          resolve(name);
        } else {
          resolve('Mr. Anderson');
        }
        rl.close();
      });
    });
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

    players.map((item) => {
      let card = this.getCard();
      item.addPoints(card);
      if (card === 11 && item.score >= 21) {
        item.addPoints(-10);
      }
      console.log(`${item.name} has ${item.score} points`);
      item.cardNumber++;
    });
  }

  /**
  * @param {Array} массив игроков
  * @description при первой раздаче раздает каждому игру несколько карт
  */
  firstDealing(players) {
    console.log('There is the first dealing!\n');
    let i = FIRST_NUMBER;
    for (i;i--;) {
      this.dealCard(players);
    }
  }

  checkWinner(players) {
    players.map((item) => {
      if (item.score === 21) {
        this.winner = !this.winner ? item.name : 'tie score';
      }
    });
    
    if (this.winner) {
      console.log(`The winner is: ${this.winner}`);
    } else {
      console.log('The game goes on!');
    }
    blockBreak();
  }
};
