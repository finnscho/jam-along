<template>
  <div style="height: 300px; border: 1px solid blue;">
    <!-- add any elements you would like to drag & resize-->
    <vue-draggable-resizable :parent="true" style="border: 1px solid black;">
      <img src="../assets/logo.png" />
      <p>
        You can drag, you can resize, but you cannot move me outside the parent.
      </p>
    </vue-draggable-resizable>
  </div>
</template>

<script>
import Vue from 'vue';
import VueDraggableResizable from 'vue-draggable-resizable';

Vue.component('vue-draggable-resizable', VueDraggableResizable);
export default {};
</script>

<style scoped></style>
