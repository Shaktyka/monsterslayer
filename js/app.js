new Vue({
  el: `#app`,
  data: {
    gameStarted: false,
    playerHealth: 100,
    monsterHealth: 100,
    player: {
      maxDamage: 10,
      minDamage: 3,
      maxSpecDamage: 20,
      minSpecDamage: 10
    },
    monster: {
      maxDamage: 12,
      minDamage: 5
    },
    winMessage: `Вы выиграли! Сыграем ещё?`,
    lostMessage: `Увы, монстр оказался сильнее... Наваляем ему?`,
    logMessages: []
  },
  methods: {
    startNewGame() {
      this.gameStarted = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
    },
    calcDamage(minDamage, maxDamage) {
      return Math.max(Math.floor(Math.random() * maxDamage) + 1, minDamage);
    },
    checkWin() {
      if (this.monsterHealth <= 0) {
        if (confirm(this.winMessage)) {
          this.startNewGame();
        } else {
          this.gameStarted = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm(this.lostMessage)) {
          this.startNewGame();
        } else {
          this.gameStarted = false;
        }
        return true;
      }
      return false;
    },
    attack(spec = false) {
      let playerMinDamage = this.player.minDamage;
      let playerMaxDamage = this.player.maxDamage;
      if (spec === true) {
        playerMinDamage = this.player.minSpecDamage;
        playerMaxDamage = this.player.maxSpecDamage;
      }

      this.monsterHealth -= this.calcDamage(playerMinDamage, playerMaxDamage);
      if (this.checkWin()) {
        return;
      }

      this.playerHealth -= this.calcDamage(this.monster.minDamage, this.monster.maxDamage);
      this.checkWin();
    },
    heal() {
      //...
    },
    giveUp() {
      this.gameStarted = false;
    },
    addLogMessage() {
      //...
    }
  },
  computed: {}
});
