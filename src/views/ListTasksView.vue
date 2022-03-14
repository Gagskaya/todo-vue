<template>
  <div>Tasks</div>
  <p>{{ list.tasks }}</p>
</template>

<script lang="ts">
import { ListsActionsTypes } from '@/store/modules/lists/types/actions';
import { ListsMutationsTypes } from '@/store/modules/lists/types/mutations';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TasksView',
  computed: {
    list() {
      return this.$store.state.lists.item;
    },
  },
  data() {
    return {
      id: this.$route.params.id,
    };
  },
  mounted() {
    this.$store.dispatch(ListsActionsTypes.FETCH_LIST_TASKS_BY_ID, this.id);
    this.$store.commit(ListsMutationsTypes.SET_ACTIVE_LIST, Number(this.id));
  },
});
</script>

<style lang="scss" module></style>
