<template>
  <div :class="$style.sidebar">
    <div :class="$style.sidebar_title">
      <img src="@/assets/allLists.svg" alt="all lists icon" />
      <h3>Все задачи</h3>
    </div>
    <div :class="$style.sidebar_lists">
      <draggable>
        <transition-group>
          <div v-if="listsLoadingStatus === 'LOADING'">
            <p :style="{ fontSize: '14px', textAlign: 'center' }">
              ...Загрузка
            </p>
          </div>
          <div
            v-for="list in lists"
            :key="list.id"
            @click="() => handleListClick(list.id)"
            :class="[
              $style.sidebar_list,
              activeList === list.id ? $style.activeList : '',
            ]"
            v-else
          >
            <div
              :class="$style.sidebar_list_badge"
              :style="{ background: list.color.hex }"
            ></div>
            <div :class="$style.sidebar_list_name">
              {{ list.name }}
            </div>
            <div
              :class="$style.sidebar_list_delete"
              @click="() => deletelist(list.id)"
            >
              <img src="@/assets/list-delete.svg" alt="delete icon" />
            </div>
          </div>
        </transition-group>
      </draggable>
    </div>
    <div :class="$style.sidebar_addlist" @click="toggleModal">
      <div :class="$style.sidebar_addlist_button">
        <img src="@/assets/add-list.svg" alt="add list icon" />
      </div>
      <div :class="$style.sidebar_addlist_title">Добавить список</div>
    </div>
    <div :class="$style.sidebar_addlist_modal" v-if="modal">
      <input
        placeholder="Название папки"
        v-model="listInputValue"
        :class="!listInputValue && listInputError ? $style.listInputError : ''"
        v-on:keyup.enter="addlist"
      />
      <div :class="$style.sidebar_addlist_modal_colors">
        <div
          v-for="color in colors"
          :key="color.id"
          :class="[
            $style.sidebar_addlist_modal_color,
            activeColor === color.id && $style.activeColor,
          ]"
          @click="() => setActiveColor(color.id)"
          :style="{ background: color.hex }"
        ></div>
      </div>
      <button @click="addlist">Добавить</button>
      <img
        src="@/assets/close-modal.svg"
        alt="close icon"
        :class="$style.sidebar_addlist_modal_close"
        @click="toggleModal"
      />
    </div>
  </div>
  <p>{{ lists.map((list) => list.tasks.map((task) => task)) }}</p>
</template>

<script lang="ts">
import { ListsMutationsTypes } from '@/store/modules/lists/types/mutations';
import { defineComponent } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';

import { ColorsActionsTypes } from '../store/modules/colors/types/actions';
import { ListsActionsTypes } from '../store/modules/lists/types/actions';
import { ModalMutationsTypes } from '../store/modules/modal/types/mutations';

export default defineComponent({
  name: 'MainSidebar',
  components: {
    draggable: VueDraggableNext,
  },
  data() {
    return {
      activeColor: 1,
      listInputValue: '',
      listInputError: false,
      dragging: false,
      enabled: true,
    };
  },
  computed: {
    lists() {
      return this.$store.state.lists.items;
    },
    list() {
      return this.$store.state.lists.item;
    },
    activeList() {
      return this.$store.state.lists.activeList;
    },
    listsLoadingStatus() {
      return this.$store.state.lists.loadingStatus;
    },
    colors() {
      return this.$store.state.colors.items;
    },
    modal() {
      return this.$store.state.modal.modal;
    },
  },
  mounted() {
    this.$store.dispatch(ListsActionsTypes.FETCH_LISTS);
    this.$store.dispatch(ColorsActionsTypes.FETCH_COLORS);
  },
  methods: {
    toggleModal() {
      this.$store.commit(ModalMutationsTypes.TOGGLE_MODAL, !this.modal);
      this.listInputValue = '';
      this.activeColor = 1;
      this.listInputError = false;
    },
    addlist() {
      if (!this.listInputValue) {
        this.listInputError = true;
        return;
      }
      const newList = {
        name: this.listInputValue,
        colorId: this.activeColor,
      };
      this.$store.dispatch(ListsActionsTypes.FETCH_ADD_LIST, newList);
      this.toggleModal();
    },
    deletelist(listId: number) {
      if (window.confirm('Вы действительно хотите удалить список?')) {
        this.$store.dispatch(ListsActionsTypes.FETCH_DELETE_LIST, listId);
      }
    },
    showTasks(id: number) {
      this.$router.push(`/lists/${id}`);
      this.$store.dispatch(ListsActionsTypes.FETCH_LIST_TASKS_BY_ID, id);
    },
    setlistInputValue(value: string) {
      this.listInputValue = value;
    },
    setActiveColor(colorId: number) {
      this.activeColor = colorId;
    },
    handleListClick(listId: number) {
      this.$store.commit(ListsMutationsTypes.SET_ACTIVE_LIST, listId);
      this.showTasks(listId);
    },
  },
});
</script>

<style lang="scss" module>
.sidebar {
  min-width: 200px;
  max-width: 200px;
  background: #e5e5e5;
  border-right: 1px solid #f1f1f1;
  padding: 60px 20px 20px 20px;
  &_title {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 5px;
    &:hover {
      background: rgba(248, 246, 246, 0.5);
      border-radius: 5px;
    }
    h3 {
      margin-left: 9px;
      font-size: 14px;
      line-height: 16px;
    }
  }
  &_lists {
    margin-top: 39px;
  }
  &_list {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 2px;
    &:hover {
      background: rgba(248, 246, 246, 0.5);
    }
    &_badge {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      margin-right: 10px;
    }
    &_name {
      font-size: 14px;

      font-weight: normal;
      max-width: 90px;
      white-space: nowrap;
      overflow: hidden !important;
      text-overflow: ellipsis;
    }
    &_delete {
      margin-left: auto;
      opacity: 0;
      line-height: 0;
      img {
        padding: 5px;
      }
    }
    &:hover {
      .sidebar_list_delete {
        opacity: 0.2;
      }
    }
    .sidebar_list_delete:hover {
      opacity: 0.6;
    }
  }
  &_addlist {
    display: flex;
    align-items: center;
    margin-top: 46px;
    padding: 5px;
    cursor: pointer;
    &_button {
      line-height: 0;
    }
    &_title {
      margin-left: 10px;
      color: #767676;
      font-size: 14px;
      font-weight: 600;
    }
    &_modal {
      min-width: 235px;
      position: relative;
      width: 100%;
      position: relative;
      left: 50px;
      background: #fff;
      box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.05);
      border-radius: 10px;
      width: 100%;
      padding: 18px;
      input {
        width: 100%;
        border: 1px solid #efefef;
        border-radius: 4px;
        padding: 8px 12px;
        font-size: 14px;
        &.error {
          border-color: red;
        }
      }
      &_colors {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 13px 0;
      }
      &_color {
        width: 18px;
        height: 18px;
        background: green;
        border-radius: 50%;
        cursor: pointer;
        &.active {
          border: 2px solid #525252;
          background: grey;
        }
      }
      button {
        background: #4dd599;
        border-radius: 4px;
        width: 100%;
        color: #fff;
        font-size: 14px;
        font-weight: 600;
        padding: 10px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        cursor: pointer;
        &:hover {
          background: #4fb689;
        }
        &:active {
          background: #444444;
        }
      }
      &_close {
        position: absolute;
        top: -7px;
        right: -7px;
        cursor: pointer;
      }
    }
  }
}
.activeColor {
  border: 2px solid #525252;
}
.activeList {
  background: #fff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
  &:hover {
    background: #fff;
  }
}
.listInputError {
  border-color: rgb(241, 103, 103) !important;
  &::placeholder {
    color: rgb(241, 103, 103);
  }
}
</style>
