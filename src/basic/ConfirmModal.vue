<template>
  <transition name="modal">
    <div :class="$style.confirm_modal">
      <p :class="$style.confirm_modal__text">{{ text }}</p>
      <input
        v-if="type === 'edit'"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :class="[
          $style.confirm_modal__input,
          !modelValue && error && $style.confirm_modal__input_error,
        ]"
        placeholder="Введите название"
      />
      <div :class="$style.confirm_modal__buttons">
        <SubmitButton text="Да" @click="$emit('handleSubmit')" />
        <DeclineButton text="Нет" @click="$emit('handleDecline')" />
      </div>
    </div>
  </transition>
</template>

<script>
import SubmitButton from '@/basic/SubmitButton';
import DeclineButton from '@/basic/DeclineButton';

export default {
  name: 'ConfirmModal',
  components: { DeclineButton, SubmitButton },
  props: {
    text: String,
    modelValue: String,
    type: String,
    error: Boolean,
  },
};
</script>

<style module lang="scss">
.confirm_modal {
  position: fixed;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  top: 40px;
  left: 42%;
  width: 400px;
  height: 150px;
  background: #fff;
  box-shadow: 0px 6px 10px rgb(0 0 0 / 5%);
  border-radius: 10px;
  padding: 20px;
  &__text {
    font-size: 14px;
  }
  &__input {
    font-size: 14px;
    padding: 5px 10px;
    &_error {
      border-color: rgb(241, 103, 103) !important;
      &::placeholder {
        color: rgb(241, 103, 103);
      }
    }
  }
  &__buttons {
    text-align: right;
  }
}
</style>
