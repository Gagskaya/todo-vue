<template>
  <button :class="$style.submit_button" @click="$emit('handleSubmit')">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'SubmitButton',
  props: {
    text: {
      type: String,
      default: 'Да',
    },
  },
};
</script>

<style module lang="scss">
.submit_button {
  margin-right: 5px;
  font-size: 14px;
  background: #4dd599;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  padding: 6px 16px;

  &:hover {
    background: #02b756;
  }
  &:active {
    background: #027a38;
  }
}
</style>
