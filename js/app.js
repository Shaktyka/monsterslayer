new Vue({
  el: `#app`,
  data: {
    gameStarted: false,
    playerHealth: 100,
    monsterHealth: 100,
    player: {
      maxHealth: 100,
      healthForHeal: 90,
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
    healValue: 10,
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

      this.monsterAttack();
    },
    monsterAttack() {
      this.playerHealth -= this.calcDamage(this.monster.minDamage, this.monster.maxDamage);
      this.checkWin();
    },
    heal() {
      if (this.playerHealth <= this.player.healthForHeal) {
        this.playerHealth += this.healValue;
      } else {
        this.playerHealth = this.player.maxHealth;
      }
      this.monsterAttack();
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
