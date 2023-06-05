/* eslint-disable quote-props */
// const state = {
//   score: 0,
//   level: 1,
//   farmers: 1,
//   prestige: 0
// }

// const mutations = {
// }

// const actions = {
// }

// const getters = {
//   player: (state: any) => {
//     return state
//   }
// }

// export default {
//   namespaced: true,
//   state,
//   mutations,
//   actions,
//   getters
// }

import { defineStore } from 'pinia'

interface Player {
  name: string
  score: number
  level: number
  farmers: number
  prestige: number
}

interface Players {
  [key: string]: Player
}

export const game = defineStore('counter', {
  state: () => ({
    players: {
      '1': {
        name: 'Anna',
        score: 0,
        level: 1,
        farmers: 1,
        prestige: 0
      },
      '2': {
        name: 'Bob',
        score: 0,
        level: 1,
        farmers: 1,
        prestige: 0
      }
    }
  }),
  getters: {
    getPlayers (state): Players {
      return state.players
    }
  },
  actions: {
    scorePerSecond (id: string) {
      return this.getPlayers[id].farmers * (0.001 + this.getPlayers[id].prestige)
    },
    formatedScore (id: string) {
      return this.getPlayers[id].score.toFixed(3)
    },
    formatedFarmer (id: string) {
      return this.getPlayers[id].farmers.toFixed(3)
    },
    formatedLevel (id: string) {
      return this.getPlayers[id].level.toFixed(0)
    },
    upgrade (id: string) {
      this.getPlayers[id].score += this.scorePerSecond(id)
      this.getPlayers[id].level += 0.01
      this.getPlayers[id].farmers += 0.01
    },
    prestigeUp (id: string) {
      this.getPlayers[id].prestige += 1
      this.getPlayers[id].farmers = 0
      this.getPlayers[id].level = 0
      this.getPlayers[id].score = 0
    },
    tick (id: string) {
      this.upgrade(id)
    },
    deletePlayer (id: string) {
      delete this.getPlayers[id]
    },
    addPlayer (pfName: string) {
      // take the last id
      const lastId = Object.keys(this.getPlayers).sort().pop()
      // add 1 to the last id
      const newId = (parseInt(lastId!) + 1).toString()
      // add the new player
      this.getPlayers[newId] = {
        name: pfName,
        score: 0,
        level: 1,
        farmers: 1,
        prestige: 0
      }
    },
    scoreTotal (): number {
      let total = 0
      Object.keys(this.getPlayers).forEach((key: string) => {
        total += this.getPlayers[key].score
      })
      return total
    },
    getNameById (id: string): string {
      return this.getPlayers[id].name
    }
  }
})
