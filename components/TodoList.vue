<script setup lang="ts">
const loading = ref(false)
const newTodo = ref('')

const { user, clear } = useUserSession()
const { data: todos } = await useFetch('/api/todos')

async function addTodo () {
  if (!newTodo.value.trim()) { return }

  loading.value = true

  const todo = await $fetch('/api/todos', {
    method: 'POST',
    body: {
      title: newTodo.value,
      completed: 0
    }
  })

  todos.value!.push(todo)
  newTodo.value = ''
  loading.value = false
}

async function toggleTodo (todo) {
  todo.completed = Number(!todo.completed)
  await useFetch(`/api/todos/${todo.id}`, {
    method: 'PATCH',
    body: {
      completed: todo.completed
    }
  })
}

async function deleteTodo (todo) {
  await useFetch(`/api/todos/${todo.id}`, { method: 'DELETE' })
  todos.value = todos.value!.filter(t => t.id !== todo.id)
}
</script>

<template>
  <div>
    <p class="text-sm mb-4">
      Hello {{ user.login }}!
      <button
        class="underline"
        @click="clear"
      >
        Logout
      </button>
    </p>
    <form
      class="flex gap-2 mb-4"
      @submit.prevent="addTodo"
    >
      <input
        v-model="newTodo"
        type="text"
        :disabled="loading"
        class="w-full px-2 py-1 border"
        placeholder="Make a Nuxt demo"
        autocomplete="off"
      >
      <button
        type="submit"
        class="bg-black hover:bg-gray-800 text-white px-4 py-1"
      >
        Add
      </button>
    </form>
    <ul>
      <li
        v-for="todo of todos"
        :key="todo.id"
        class="flex items-center gap-2 py-2 border-b border-gray-200 divide-y divide-gray-200"
      >
        <span
          class="flex-1"
          :class="[todo.completed ? 'line-through u-text-gray-500' : 'u-text-gray-700']"
        >{{ todo.title }}</span>
        <input
          :checked="Boolean(todo.completed)"
          type="checkbox"
          :name="String(todo.id)"
          @change="toggleTodo(todo)"
        >
        <button
          type="button"
          class="bg-red-200 border-none text-sm rounded px-2"
          @click="deleteTodo(todo)"
        >
          x
        </button>
      </li>
    </ul>
  </div>
</template>

<style lang="postcss">
ul > li:last-child {
  @apply border-b-0;
}
</style>
