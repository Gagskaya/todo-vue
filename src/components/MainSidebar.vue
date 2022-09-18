<template>
  <div :class="$style.sidebar">
    <div
      :class="[
        $style.sidebar__title,
        $route.name === 'AllLists' ? $style.sidebar__title_active : '',
      ]"
      @click="handleAllListsClick"
    >
      <img src="@/assets/icons/all-lists.svg" alt="all lists icon" />
      <h3>Все списки</h3>
    </div>
    <div :class="$style.sidebar__lists">
      <draggable>
        <transition-group>
          <div v-if="listsLoadingStatus === 'LOADING'">
            <p :style="{ fontSize: '14px', textAlign: 'center' }">
              ...Загрузка
            </p>
          </div>
          <div
            :class="$style.sidebar__list_wrap"
            v-for="list in lists"
            :key="list?.id"
            v-else
          >
            <div
              @click="() => handleListClick(list.id)"
              :class="[
                $style.sidebar__list,
                activeList === list?.id ? $style.sidebar__list_active : '',
              ]"
            >
              <div
                :class="$style.sidebar__list_badge"
                :style="{ background: list?.color?.hex }"
              ></div>
              <div :class="$style.sidebar__list_name">
                {{ list.name }}
              </div>
            </div>
            <div :class="$style.sidebar__list_delete">
              <img
                src="@/assets/icons/list-delete.svg"
                alt="delete icon"
                @click="toggleIsVisibleDeleteList"
              />
            </div>
            <ConfirmModal
              v-if="isVisibleDeleteList"
              @handleSubmit="() => handleSubmitDeleteList(list.id)"
              @handleDecline="toggleIsVisibleDeleteList"
              text="Вы действитель хотите удалить список?"
            />
          </div>
        </transition-group>
      </draggable>
    </div>
    <div :class="$style.sidebar__addlist" @click="toggleIsVisibleAddList">
      <div :class="$style.sidebar__addlist_button">
        <img src="@/assets/icons/add-list.svg" alt="add list icon" />
      </div>
      <div :class="$style.sidebar__addlist_title">Добавить список</div>
    </div>
    <div :class="$style.sidebar__addlist_modal" v-if="isVisibleAddList">
      <input
        placeholder="Название списка"
        v-model="listName"
        :class="[
          $style.sidebar__addlist_modal_list_name,
          !listName &&
            listNameError &&
            $style.sidebar__addlist_modal_list_name_error,
        ]"
        v-on:keyup.enter="addList"
      />
      <div :class="$style.sidebar__addlist_modal_colors">
        <div
          v-for="color in colors"
          :key="color.id"
          :class="[
            $style.sidebar__addlist_modal_color,
            activeColor === color.id
              ? $style.sidebar__addlist_modal_color_active
              : '',
          ]"
          @click="() => setActiveColor(color.id)"
          :style="{ background: color.hex }"
        ></div>
      </div>
      <SubmitButton
        text="Добавить"
        @handleSubmit="handleAddList"
        style="width: 100%"
      />
      <img
        src="@/assets/icons/close-modal.svg"
        alt="close icon"
        :class="$style.sidebar__addlist_modal_close"
        @click="toggleIsVisibleAddList"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';

import { v4 as uuidv4 } from 'uuid';

import { ListsMutationsTypes } from '@/store/modules/lists/types/mutations';
import { ListsActionsTypes } from '../store/modules/lists/types/actions';
import { ModalMutationsTypes } from '../store/modules/modal/types/mutations';
import { ColorsActionsTypes } from '@/store/modules/colors/types/actions';

import ConfirmModal from '@/basic/ConfirmModal.vue';
import SubmitButton from '@/basic/SubmitButton.vue';

export default defineComponent({
  name: 'MainSidebar',
  components: {
    SubmitButton,
    draggable: VueDraggableNext,
    ConfirmModal,
  },
  data() {
    return {
      activeColor: '00973046-b504-4c74-92f0-eb6ebfd1319a',
      listName: '',
      listNameError: false,
      dragging: false,
      enabled: true,
    };
  },
  mounted() {
    this.$store.dispatch(ListsActionsTypes.FETCH_LISTS);
    this.$store.dispatch(ColorsActionsTypes.FETCH_COLORS);
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
    isVisibleAddList() {
      return this.$store.state.modal.isVisibleAddList;
    },
    isVisibleDeleteList() {
      return this.$store.state.modal.isVisibleDeleteList;
    },
  },

  methods: {
    handleAddList() {
      if (!this.listName) {
        this.listNameError = true;
        return;
      }
      const color = this.colors.find((color) => color.id === this.activeColor);
      const newList = {
        id: uuidv4(),
        name: this.listName,
        colorId: this.activeColor,
        color,
        tasks: [],
      };

      this.$store.dispatch(ListsActionsTypes.FETCH_ADD_LIST, newList);
      this.toggleIsVisibleAddList();
    },
    toggleIsVisibleAddList() {
      this.listName = '';
      this.activeColor = '00973046-b504-4c74-92f0-eb6ebfd1319a';
      this.listNameError = false;

      this.$store.commit(
        ModalMutationsTypes.TOGGLE_IS_VISIBLE_ADD_LIST,
        !this.isVisibleAddList
      );
    },
    handleSubmitDeleteList(listId: string) {
      this.$router.push('/');

      this.$store.commit(ListsMutationsTypes.SET_ACTIVE_LIST, null);
      this.$store.dispatch(ListsActionsTypes.FETCH_DELETE_LIST, listId);
      this.toggleIsVisibleDeleteList();
    },
    toggleIsVisibleDeleteList() {
      this.$store.commit(
        ModalMutationsTypes.TOGGLE_IS_VISIBLE_DELETE_LIST,
        !this.isVisibleDeleteList
      );
    },
    setActiveColor(colorId: string) {
      this.activeColor = colorId;
    },
    handleAllListsClick() {
      this.$router.push('/');

      this.$store.commit(ListsMutationsTypes.SET_ACTIVE_LIST, null);
    },
    handleListClick(listId: string) {
      if (listId !== this.$route.params.id) {
        this.$store.commit(
          ModalMutationsTypes.TOGGLE_IS_VISIBLE_ADD_TASK,
          false
        );
      }
      this.$router.push(`/lists/${listId}`);

      this.$store.commit(ListsMutationsTypes.SET_ACTIVE_LIST, listId);
      this.$store.dispatch(ListsActionsTypes.FETCH_LIST_TASKS_BY_ID, listId);
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
  &__title {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 5px;
    padding: 8px 12px;
    border-radius: 4px;
    &:hover {
      background: rgba(248, 246, 246, 0.5);
      border-radius: 5px;
    }
    h3 {
      margin-left: 9px;
      font-size: 14px;
      line-height: 16px;
    }
    &_active {
      background: #fff;
      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);

      &:hover {
        background: #fff;
      }
    }
  }
  &__lists {
    margin-top: 39px;
  }
  &__list {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 2px;
    &_wrap {
      position: relative;
      &:hover {
        .sidebar__list_delete {
          opacity: 0.2;
        }
      }
      .sidebar__list_delete:hover {
        opacity: 0.6;
      }
    }
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
    &_active {
      background: #fff;
      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
      &:hover {
        background: #fff;
      }
    }
    &_delete {
      opacity: 0;
      line-height: 0;
      position: absolute;
      top: 5px;
      cursor: pointer;
      right: 5px;
      img {
        padding: 5px;
      }
    }
  }
  &__addlist {
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
      z-index: 99999;

      left: 50px;
      background: #fff;
      box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.05);
      border-radius: 10px;
      width: 100%;
      padding: 18px;

      &_list_name {
        width: 100%;
        border: 1px solid #efefef;
        border-radius: 4px;
        padding: 8px 12px;
        font-size: 14px;
        &_error {
          border-color: rgb(241, 103, 103) !important;
          &::placeholder {
            color: rgb(241, 103, 103);
          }
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
        &_active {
          border: 2px solid #525252;
          background: grey;
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
</style>
