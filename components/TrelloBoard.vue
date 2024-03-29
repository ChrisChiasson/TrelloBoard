<template>
  <div class="flex items-start gap-4 overflow-x-auto">
    <draggable
      v-model="columns"
      group="columns"
      :animation="150"
      handle=".drag-handle"
      item-key="id"
      class="flex gap-4 items-start"
    >
      <template #item="{ element: column }: { element: Column }">
        <div class="column bg-gray-200 p-5 rounded min-w-[250px]">
          <header class="font-bold mb-4">
            <DragHandle/>
            <input
              class="title-input bg-transparent focus:bg-white rounded px-1 w-4/5"
              @keyup.enter="($event.target as HTMLInputElement).blur()"
              @keydown.backspace="
                column.title === ''
                  ? (columns = columns.filter((c) => c.id !== column.id))
                  : null
              "
              type="text"
              v-model="column.title"
            />
          </header>
          <draggable
      v-model="column.tasks"
      group="group.value"
      :animation="150"
      handle=".drag-handle"
      item-key="id"
    >
    <template #item="{element: task} : {element: Task}">
      <div>
        <TrelloBoardTask :task="task" @delete="column.tasks = column.tasks.filter(task => task.id !== $event)"/>
      </div>
    </template>
          </draggable>
          <footer>
            <NewTask @add="column.tasks.push($event)"/>
          </footer>
        </div>
      </template>
    </draggable>
    <button
      @click="createColumn"
      class="bg-gray-200 whitespace-nowrap p-2 rounded opacity-50"
    >
      + Add Another Column
    </button>
  </div>
  <pre>
    {{ alt }}
    {{ pull }}
    {{ group }}
    {{ columns }}
  </pre>
</template>

<script setup lang="ts">
import { Task, Column } from '~~/types';
import {nanoid} from 'nanoid';
import draggable from 'vuedraggable';
import { useLocalStorage } from '@vueuse/core';


const alt = useKeyModifier("Control");
const pull = computed(() => alt.value ? 'clone' : true);
const group = computed(() => ({ name: 'tasks', pull: pull.value }));

const columns = useLocalStorage<Column[]>("trelloBoard", [
  {
    id: nanoid(),
    title: 'Backlog',
    tasks: [
    {
        id: nanoid(),
        title: "Create Marketing Landing Page",
        createdAt: new Date()
      },
      {
        id: nanoid(),
        title: "Develop cool new features",
        createdAt: new Date()
      },
      {
        id: nanoid(),
        title: "Fix page nav bug",
        createdAt: new Date()
      },
    ]
  },
  {
    id: nanoid(),
    title: 'Selected for Dev',
    tasks: []
  },
  {
    id: nanoid(),
    title: 'In Progress',
    tasks: []
  },
  {
    id: nanoid(),
    title: 'QA',
    tasks: []
  },
  {
    id: nanoid(),
    title: 'Complete',
    tasks: []
  },

]);

function createColumn () {
  const column: Column = {
    id: nanoid(),
    title: '',
    tasks: []
  }
  columns.value.push(column);
  nextTick(() => (document.querySelector(".column:last-of-type .title-input"
    ) as HTMLImageElement)?.focus())
  
}


</script>