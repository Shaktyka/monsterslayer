new Vue({
  el: `#app`,
  data: {
    gameStarted: false,
    playerHealth: 100,
    monsterHealth: 100,
    logMessages: []
  },
  computed: {

  },
  methods: {
    startNewGame() {
      this.gameStarted = true;
    },
    attack() {
      //...
    },
    specialAttack() {
      //...
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
  }
});
