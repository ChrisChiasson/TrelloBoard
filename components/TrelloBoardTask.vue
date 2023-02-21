<template>
  <div
    :title="task?.createdAt?.toLocaleDateString?.()"
    class="task bg-white p-2 mb-2 rounded-md shadow-sd max-w-[250px] flex"
    @focus="focused = true"
    @blur="focused = false"
    tabindex="0"
    >
    <DragHandle class="mr-2"/>{{ task.title }}

  </div>
</template>

<script setup lang="ts">
import { ID, Task } from '@/types';

const emit = defineEmits<{
  (e: "delete", payload: ID): void;
}>();

const props = defineProps<{
  task: Task;
}>();

const focused = ref(false);
onKeyStroke("Backspace", () => {
  if (focused.value) {
    emit("delete", props.task.id);
  }
});
</script>

<style>
.sortable-drag .task {
  transform: rotate(5deg);
}

.sortable-ghost .task {
  position: relative;
}

.sortable-ghost .task::after {
  content: "";
  @apply absolute top-0 bottom-0 left-0 right-0 bg-slate-300 rounded;
}

.task:focus,
.task:focus-visible {
  @apply outline-gray-400 !important;
  outline: gray auto 1px;
}
</style>