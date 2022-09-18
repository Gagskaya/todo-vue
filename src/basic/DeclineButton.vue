<template>
  <button :class="$style.decline_button" @click="$emit('handleDecline')">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'DeclineButton',
  props: {
    text: {
      type: String,
      default: 'Нет',
    },
  },
};
</script>

<style module lang="scss">
.decline_button {
  color: #9c9c9c;
  font-size: 14px;
  border: none;
  background: #f4f6f8;
  border-radius: 4px;
  cursor: pointer;
  padding: 6px 16px;

  &:hover {
    background: #efeeee;
  }
  &:active {
    background: #9b9b9b;
    color: #fff;
  }
}
</style>
