<template>
  <q-page padding>
    <q-btn @click="addPlayerShowDialog" class="addPlayer" :class="(scoreTotal < 1000 ? 'disabled': '')">Add Player | 1000 Score!</q-btn>
    <q-card style="margin-bottom: 10px;">
      <q-card-section>
        <q-list>
          <q-item>
            <h5>total score: {{ scoreTotal.toFixed(3) }}</h5 >
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
    <player v-for="(player, key) in getPlayers" :key="key" :player="player" :id="key.toString()"></player>
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">The player name</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="name" autofocus @keyup.enter="prompt = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Add Player" v-close-popup @click="addPlayer" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          The name cannot be empty!
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { game } from 'src/stores/game.js'
import player from 'components/Player.vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'GamePage',
  setup () {
    const store = game()
    const q = useQuasar()

    const { getPlayers } = storeToRefs(store)

    return {
      store,
      getPlayers,
      q,
      name: ref(''),
      prompt: ref(false),
      alert: ref(false)
    }
  },
  components: {
    player
  },
  methods: {
    addPlayerShowDialog () {
      if (this.store.scoreTotal() < 1000) return
      this.name = ''
      this.prompt = true
    },
    addPlayer () {
      this.prompt = false
      if (this.name === '') {
        this.alert = true
        return
      }
      this.store.addPlayer(this.name)
    }
  },
  computed: {
    scoreTotal () {
      return this.store.scoreTotal()
    }
  }
})
</script>

<style>
.addPlayer {
  position: relative;
  display: block;
  width: 100%;
  background-color: green;
  padding: 10px;
  color: white;
  margin-bottom: 10px;
}
.disabled {
  background-color: grey;
  cursor: not-allowed;
}
</style>
