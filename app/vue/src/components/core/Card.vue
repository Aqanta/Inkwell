<template>
  <div class="card m-2 is-flex is-flex-direction-column is-justify-content-space-between" style="height: 11rem; width: 12rem;">
    <div class="card-content">
      <div class="subtitle is-clickable" @click="$emit('contentClicked')">
        <div class="is-flex is-flex-direction-row is-justify-content-space-between mb-4">
          <div></div>
          <div class="icon is-size-2 has-text-primary" v-if="cardInfo.icon">
            <FontAwesomeIcon v-if="cardInfo.icon.length > 3" :icon="fas[cardInfo.icon]" />
            <span v-if="cardInfo.icon.length < 3">{{ cardInfo.icon }}</span>
          </div>
          <div></div>
        </div>
        <div v-if="cardInfo.title" class="has-text-centered pt-2">{{ cardInfo.title }}</div>
      </div>
    </div>
    <footer class="card-footer">
      <p class="card-footer-item">
         <span class="icon has-text-link">
              <FontAwesomeIcon :icon="fas.faCog" />
         </span>
      </p>
      <p class="card-footer-item">
        <span class="icon has-text-link">
              <FontAwesomeIcon :icon="fas.faFileExport" />
        </span>
      </p>
      <p class="card-footer-item">
        <span class="icon has-text-link">
              <FontAwesomeIcon :icon="fas.faTrashCan" />
        </span>
      </p>
    </footer>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons'
</script>

<script>
export default {
  name: "Card",
  props: {
    cardInfo: {
      required: true,
      type: Object
    }
  }
}
</script>

<style scoped>

</style>