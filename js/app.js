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
    winMessage: `Вы победили! Сыграем ещё?`,
    lostMessage: `Увы, монстр оказался сильнее... Сыграем ещё?`,
    healMessage: `Вы восстанавливаете здоровье: `,
    giveUpMessage: `Вы сдались :(`,
    damageMessage: `Монстр наносит вам урон: `,
    attackMessage: `Вы наносите урон монстру: `,
    specAttackMessage: `Вы сильно бьёте монстра: `,
    healValue: 10,
    turns: []
  },
  methods: {
    startNewGame() {
      this.gameStarted = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
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

      const damage = this.calcDamage(playerMinDamage, playerMaxDamage)
      this.monsterHealth -= damage;
      if (this.monsterHealth < 0) {
        this.monsterHealth = 0;
      }
      const message = spec ? (this.specAttackMessage + damage) : (this.attackMessage + damage);
      this.turns.unshift({
        isPlayer: true,
        isHeal: false,
        isGiveup: false,
        text: message
      });
      if (this.checkWin()) {
        return;
      }

      this.monsterAttack();
    },
    monsterAttack() {
      const damage = this.calcDamage(this.monster.minDamage, this.monster.maxDamage);
      this.playerHealth -= damage;
      if (this.playerHealth < 0) {
        this.playerHealth = 0;
      }
      this.turns.unshift({
        isPlayer: false,
        isHeal: false,
        isGiveup: false,
        text: this.damageMessage + damage
      });
      this.checkWin();
    },
    heal() {
      if (this.playerHealth <= this.player.healthForHeal) {
        this.playerHealth += this.healValue;
      } else {
        this.playerHealth = this.player.maxHealth;
      }
      this.turns.unshift({
        isPlayer: true,
        isHeal: true,
        isGiveup: false,
        text: this.healMessage + this.healValue
      });
      this.monsterAttack();
    },
    giveUp() {
      this.turns.unshift({
        isPlayer: true,
        isHeal: false,
        isGiveup: true,
        text: this.giveUpMessage
      });
      this.gameStarted = false;
    }
  }
});
