<template>
  <div :class="$style.main__list">
    <div :class="$style.main__list_title">
      <h3 :style="{ color: list?.color?.hex }">{{ list.name }}</h3>
      <img
        src="@/assets/icons/edit-title.svg"
        alt="delete icon"
        v-if="$route.name === 'SingleList'"
        @click="toggleIsVisibleEditListName"
      />
      <ConfirmModal
        v-if="isVisibleEditListName"
        @handleSubmit="() => handleEditListName(list.id)"
        @handleDecline="handleDeclineEditListName"
        text="Изменить значение"
        type="edit"
        v-model="editedListName"
        :error="editedListNameError"
      />
    </div>
    <div v-if="taskLoadingStatus === 'LOADING'">
      <p :style="{ fontSize: '14px', textAlign: 'center' }">...Загрузка</p>
    </div>
    <div
      :class="$style.main__list_task"
      v-for="task in list.tasks"
      :key="task.id"
      v-else
    >
      <div :class="$style.main__list_task_checkbox">
        <input
          type="checkbox"
          :id="task.id"
          @change="(e) => toggleTaskIsCompleted(task.id, e.target.checked)"
          :checked="task.isCompleted"
        />
        <label :for="task.id">
          <svg
            width="11"
            height="8"
            viewBox="0 0 11 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001"
              stroke="#B3B3B3"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </label>
      </div>
      <div :class="$style.main__list_task_name">{{ task.text }}</div>
      <div :class="$style.main__list_task_edit">
        <img
          src="@/assets/icons/edit-task.svg"
          alt="edit icon"
          v-if="$route.name === 'SingleList'"
          @click="toggleIsVisibleEditTaskText"
        />
        <ConfirmModal
          v-if="isVisibleEditTaskText"
          @handleSubmit="() => handleEditTaskText(task.id)"
          @handleDecline="handleDeclineEditTaskText"
          text="Изменить значение"
          type="edit"
          v-model="editedTaskText"
          :error="editedTaskTextError"
        />
      </div>
      <div :class="$style.main__list_task_delete">
        <img
          src="@/assets/icons/list-delete.svg"
          alt="delete icon"
          @click="toggleIsVisibleDeleteTask"
          v-if="$route.name === 'SingleList'"
        />
      </div>
      <ConfirmModal
        v-if="isVisibleDeleteTask"
        @handleSubmit="() => handleDeleteTask(task.id)"
        @handleDecline="toggleIsVisibleDeleteTask"
        text="Вы действитель хотите удалить задачу?"
      />
    </div>
    <div
      v-if="$route.name === 'SingleList'"
      :class="$style.main__list_add_task"
    >
      <div
        :class="$style.main__list_add_task_open"
        v-if="!isVisibleAddTask"
        @click="toggleIsVisibleAddTask"
      >
        <img
          src="../assets/icons/add-task.svg"
          alt="Иконка добавления задачи"
        />
        <p>Новая задача</p>
      </div>
      <div :class="$style.main__list_add_task_form" v-else>
        <div>
          <input
            v-model="taskText"
            :class="[
              $style.main__list_add_task_form_input,
              !taskText &&
                taskTextError &&
                $style.main__list_add_task_form_input_error,
            ]"
            placeholder="Введите название"
          />
        </div>
        <div :class="$style.main__list_add_task_form_buttons">
          <SubmitButton
            text="Добавить задачу"
            @handleSubmit="handleAddTask"
            style="width: 150px"
          />
          <DeclineButton text="Отмена" @handleDecline="handleDeclineAddTask" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { v4 as uuidv4 } from 'uuid';

import { ModalMutationsTypes } from '@/store/modules/modal/types/mutations';
import { ListsActionsTypes } from '@/store/modules/lists/types/actions';

import SubmitButton from '@/basic/SubmitButton.vue';
import DeclineButton from '@/basic/DeclineButton.vue';
import ConfirmModal from '@/basic/ConfirmModal.vue';

export default defineComponent({
  name: 'MainList',
  components: { DeclineButton, SubmitButton, ConfirmModal },
  props: ['list'],
  data() {
    return {
      isVisibleModal: false,
      taskText: '',
      editedListName: '',
      editedListNameError: false,
      editedTaskText: '',
      editedTaskTextError: false,
      taskTextError: false,
    };
  },
  computed: {
    taskLoadingStatus() {
      return this.$store.state.lists.taskLoadingStatus;
    },
    isVisibleAddTask() {
      return this.$store.state.modal.isVisibleAddTask;
    },
    isVisibleDeleteTask() {
      return this.$store.state.modal.isVisibleDeleteTask;
    },
    isVisibleEditListName() {
      return this.$store.state.modal.isVisibleEditListName;
    },
    isVisibleEditTaskText() {
      return this.$store.state.modal.isVisibleEditTaskText;
    },
  },
  methods: {
    handleAddTask() {
      if (!this.taskText) {
        this.taskTextError = true;
        return;
      }

      const task = {
        id: uuidv4(),
        text: this.taskText,
        listId: this.list.id,
        isCompleted: false,
      };

      this.$store.dispatch(ListsActionsTypes.FETCH_ADD_TASK_TO_LIST, task);
      this.$store.dispatch(ListsActionsTypes.FETCH_LISTS);

      this.taskText = '';
      this.taskTextError = false;
      this.toggleIsVisibleAddTask();
    },
    handleDeclineAddTask() {
      this.toggleIsVisibleAddTask();
      this.taskText = '';
      this.taskTextError = false;
    },
    handleEditListName(listId: string) {
      if (!this.editedListName) {
        this.editedListNameError = true;
        return;
      }

      this.$store.dispatch(ListsActionsTypes.FETCH_EDIT_LIST_NAME, {
        listId,
        newName: this.editedListName,
      });

      this.toggleIsVisibleEditListName();
      this.taskText = '';
      this.taskTextError = false;
    },
    handleDeclineEditListName() {
      this.toggleIsVisibleEditListName();
      this.editedListName = '';
      this.editedListNameError = false;
    },
    handleEditTaskText(taskId: string) {
      if (!this.editedTaskText) {
        this.editedTaskTextError = true;
        return;
      }

      this.$store.dispatch(ListsActionsTypes.FETCH_EDIT_TASK_TEXT, {
        taskId,
        newText: this.editedTaskText,
      });

      this.toggleIsVisibleEditTaskText();
      this.editedTaskText = '';
      this.editedTaskTextError = false;
    },
    handleDeclineEditTaskText() {
      this.toggleIsVisibleEditTaskText();
      this.editedTaskText = '';
      this.editedTaskTextError = false;
    },
    toggleTaskIsCompleted(taskId: string, isCompleted: boolean) {
      this.$store.dispatch(ListsActionsTypes.FETCH_TOGGLE_TASK_IS_COMPLETED, {
        isCompleted,
        taskId,
      });
    },

    toggleIsVisibleAddTask() {
      this.$store.commit(
        ModalMutationsTypes.TOGGLE_IS_VISIBLE_ADD_TASK,
        !this.isVisibleAddTask
      );
    },
    toggleIsVisibleEditListName() {
      this.$store.commit(
        ModalMutationsTypes.TOGGLE_IS_VISIBLE_EDIT_LIST_NAME,
        !this.isVisibleEditListName
      );
    },
    toggleIsVisibleEditTaskText() {
      this.$store.commit(
        ModalMutationsTypes.TOGGLE_IS_VISIBLE_EDIT_TASK_TEXT,
        !this.isVisibleEditTaskText
      );
    },
    handleDeleteTask(taskId: string) {
      this.$store.dispatch(
        ListsActionsTypes.FETCH_DELETE_TASK_FROM_LIST,
        taskId
      );
      this.toggleIsVisibleDeleteTask();
    },
    toggleIsVisibleDeleteTask() {
      this.$store.commit(
        ModalMutationsTypes.TOGGLE_IS_VISIBLE_DELETE_TASK,
        !this.isVisibleDeleteTask
      );
    },
  },
});
</script>

<style lang="scss" module>
.main {
  &__list {
    &_title {
      display: flex;
      font-size: 32px;
      padding-bottom: 20px;
      margin-bottom: 31px;
      border-bottom: 1px solid #f2f2f2;
      img {
        margin-left: 15px;
        cursor: pointer;
        opacity: 0.4;
        &:hover {
          opacity: 1;
        }
      }
    }
    &_task {
      display: flex;
      &_checkbox {
        margin-right: 15px;
        margin-bottom: 15px;

        input[type='checkbox'] {
          transition: 0.15s ease-in-out;
          display: none;

          &:checked + label {
            background: #4dd599;
            border-color: #4dd599;

            svg {
              opacity: 1;

              path {
                stroke: #fff;
              }
            }
          }
        }
        label {
          position: relative;
          top: 1px;
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 2px solid #e8e8e8;
          border-radius: 50px;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: 0.3s ease-in-out;

          svg {
            opacity: 0;
          }
          &:hover {
            background: #f2f2f2;
            border-color: #f2f2f2;

            svg {
              opacity: 1;
              path {
                stroke: #b3b3b3;
              }
            }
          }
        }
      }
      &_delete {
        margin-left: 5px;
        img {
          cursor: pointer;
          opacity: 0.4;
          &:hover {
            opacity: 1;
          }
        }
      }
      &_edit {
        img {
          opacity: 0.4;
          margin-left: 10px;
          &:hover {
            cursor: pointer;
            opacity: 1;
          }
        }
      }
    }
    &_add_task {
      margin-top: 15px;
      &_open {
        display: flex;
        align-items: center;
        &:hover {
          cursor: pointer;
        }
      }
      &_form {
        &_input {
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
        &_buttons {
          display: flex;
          margin-top: 15px;
        }
        &_submit {
          margin-right: 10px;
          cursor: pointer;
          padding: 8px 15px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          font-size: 14px;
          background: #4dd599;
          border: none;
          border-radius: 4px;
        }
        &_decline {
          margin-right: 10px;
          padding: 8px 15px;
          cursor: pointer;

          display: flex;
          justify-content: center;
          align-items: center;
          color: #9c9c9c;
          font-size: 14px;
          border: none;
          background: #f4f6f8;
          border-radius: 4px;
        }
      }

      img {
        margin-right: 20px;
      }
      p {
        color: #b4b4b4;
      }
    }
  }
}
</style>
