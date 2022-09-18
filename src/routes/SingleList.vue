<template>
  <div :class="$style.single_list">
    <MainList :list="list" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { ListsActionsTypes } from '@/store/modules/lists/types/actions';
import { ListsMutationsTypes } from '@/store/modules/lists/types/mutations';

import MainList from '@/components/MainList.vue';

export default defineComponent({
  name: 'SingleList',
  components: { MainList },
  data() {
    return {
      id: this.$route.params.id,
    };
  },
  mounted() {
    this.$store.dispatch(ListsActionsTypes.FETCH_LIST_TASKS_BY_ID, this.id);
    this.$store.commit(ListsMutationsTypes.SET_ACTIVE_LIST, this.id);
  },
  computed: {
    list() {
      return this.$store.state.lists.item;
    },
  },
});
</script>

<style lang="scss" module>
.single_list {
  padding: 60px;
  width: 100%;
}
</style>
