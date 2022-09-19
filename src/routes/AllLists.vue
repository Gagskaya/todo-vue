<template>
  <div :class="$style.all_lists" v-if="lists.length">
    <template v-for="list in lists" :key="list.id">
      <MainList :list="list" />
      <div v-if="!list.tasks.length" style="margin-bottom: 15px">
        <p>В этом списке задач нет</p>
      </div>
    </template>
  </div>
  <div :class="$style.all_lists_empty" v-else>Пока списков нет</div>
</template>

<script>
import { ListsActionsTypes } from '@/store/modules/lists/types/actions';

import MainList from '@/components/MainList';

export default {
  name: 'AllLists',
  components: { MainList },
  mounted() {
    this.$store.dispatch(ListsActionsTypes.FETCH_LISTS);
  },
  computed: {
    lists() {
      return this.$store.state.lists.items;
    },
  },
};
</script>

<style lang="scss" module>
.all_lists {
  padding: 60px;
  width: 100%;
  display: flex;
  flex-direction: column;
  &_empty {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
