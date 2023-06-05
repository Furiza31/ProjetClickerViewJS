<template>
    <q-card>
      <q-card-section>
        <div class="text-h5">Name: {{ name }}</div>
      </q-card-section>
      <q-card-section>
        <div class="text-h6">Score: {{ formatedScore }}</div>
      </q-card-section>
      <q-card-section>
        <div class="text-h6">Levels: {{ formatedLevel }}</div>
      </q-card-section>
      <q-card-section>
        <div class="text-h6">Farmers: {{ formatedFarmer }}</div>
      </q-card-section>
      <q-card-section>
        <div class="text-h6 prestige" v-if="player.score >= 500" @click="prestigeUp">Prestiges : {{ player.prestige }} <q-icon name="arrow_upward" /></div>
      </q-card-section>
    </q-card>
    <div class="bottomfooter" style="padding-bottom: 10px;">
      <q-btn push label="Click!" icon="ads_click" class="upgrade" @click="upgrade" style="border-top-right-radius: 0px; border-top-left-radius: 0px; border-bottom-right-radius: 0px;" />
      <q-btn class="deleteButton" style="border-top-right-radius: 0px; border-top-left-radius: 0px; border-bottom-left-radius: 0px;"
      push
      icon="delete"
      @click="confirm"></q-btn>
    </div>
</template>

<script lang="ts">
import { useQuasar } from 'quasar'
import { game } from 'src/stores/game'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'GamePage',
  setup () {
    const store = game()
    const q = useQuasar()

    return {
      store,
      q
    }
  },
  data () {
    return {
      loop: setInterval(this.tick, 1000)
    }
  },
  props: {
    player: {
      type: Object,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  methods: {
    upgrade () {
      this.store.upgrade(this.id)
    },
    prestigeUp () {
      this.store.prestigeUp(this.id)
    },
    tick () {
      this.store.tick(this.id)
    },
    confirm () {
      this.q.dialog({
        title: 'Confirm',
        message: 'Would you like to delete this player?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        clearInterval(this.loop)
        this.store.deletePlayer(this.id)
      })
    }
  },
  computed: {
    formatedScore () {
      return this.store.formatedScore(this.id)
    },
    formatedLevel () {
      return this.store.formatedLevel(this.id)
    },
    formatedFarmer () {
      return this.store.formatedFarmer(this.id)
    },
    name () {
      return this.store.getNameById(this.id)
    }
  },
  beforeUnmount () {
    clearInterval(this.loop)
  }
})
</script>

<style>
.upgrade {
  background-color: indigo;
  color: #fff;
  width: 100%;
  padding: 25px;
  box-sizing: border-box;
}
.prestige {
  cursor: pointer;
  padding: 10px;
  background-color: orange;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid black;
}
.bottomfooter {
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}
.deleteButton {
  padding: 25px;
  box-sizing: border-box;
  width: 20%;
  height: max-content;
  color: #fff;
  background-color: crimson;
}
</style>
