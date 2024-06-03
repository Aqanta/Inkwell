<template>
  <div class="modal is-active">
    <div class="modal-background" @click="$emit('cancel')"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ title }}</p>
        <button class="delete" aria-label="close" @click="$emit('cancel')"></button>
      </header>
      <section class="modal-card-body">
       <slot />
      </section>
      <footer class="modal-card-foot">
        <div class="buttons is-justify-content-end" style="width: 100%">
          <button class="button" @click="$emit('cancel')">Cancel</button>
          <button :class="`button is-${goColor}`" @click="$emit('go')">{{ goString }}</button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "Popup",
  props: {
    title:{
      type: String,
      required: true
    },
    goColor:{
      default: 'success',
      type: String
    },
    goString: {
      default: 'Okay',
      type: String
    }
  },
  data: function (  ){
    return {
      open: false
    }
  }
}
</script>

<style scoped>

</style>