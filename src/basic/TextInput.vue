<template>
  <input
    placeholder="Введите название"
    :class="[$style.input, error && $style.input_error]"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    modelValue: String,
    error: Boolean,
  },
};
</script>

<style module lang="scss">
.input {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  line-height: 17px;
  background: #ffffff;
  border: 1px solid #efefef;
  border-radius: 4px;
  font-weight: 600;
  opacity: 0.7;
  &_error {
    border-color: rgb(241, 103, 103) !important;
    &::placeholder {
      color: rgb(241, 103, 103);
    }
  }
}
</style>
