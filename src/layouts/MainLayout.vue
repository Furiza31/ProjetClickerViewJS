<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Clicker Game
        </q-toolbar-title>

        <div>v1.0</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Navigations
        </q-item-label>

        <NavigationLink
          v-for="link in navigationLink"
          :key="link.link"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavigationLink from 'src/components/NavigationLink.vue'

const linksList = [
  {
    title: 'Home',
    caption: 'Go back to home',
    icon: 'home',
    link: '/'
  },
  {
    title: 'Game',
    caption: 'Lest\'s click',
    icon: 'code',
    link: '/game'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    NavigationLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      navigationLink: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
