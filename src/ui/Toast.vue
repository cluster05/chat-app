<template>
  <div class="toast-layout" v-if="this.toast.message">
    <div class="toast" :class="getToastClass">{{ this.toast.message }}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      toast: "getToast",
    }),
    getToastClass() {
      return `toast-${this.toast.type}`;
    },
  },
};
</script>

<style>
.toast-layout {
  @apply w-full mt-10 absolute top-0 left-0 z-20 flex justify-center;
}
.toast {
  @apply p-3  border rounded-md shadow-md;
}
.toast-default {
  @apply bg-white text-gray-600;
}
.toast-success {
  @apply bg-green-400 text-green-100;
}
.toast-error {
  @apply bg-red-400 text-red-100;
}
.toast-info {
  @apply bg-blue-400 text-blue-100;
}
.toast-warning {
  @apply bg-yellow-400 text-yellow-100;
}
</style>
