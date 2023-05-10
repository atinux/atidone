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

const items = [[{
  label: 'Logout',
  icon: 'i-heroicons-arrow-left-on-rectangle',
  click: clear
}]]
</script>

<template>
  <UCard @submit.prevent="addTodo">
    <template #header>
      <h3 class="text-lg font-semibold leading-6 text-gray-900">
        Todo List
      </h3>

      <UDropdown :items="items">
        <UButton color="white" trailing-icon="i-heroicons-chevron-down-20-solid">
          <UAvatar :src="`https://github.com/${user.login}.png`" :alt="user.login" size="3xs" />

          {{ user.login }}
        </UButton>
      </UDropdown>
    </template>

    <div class="flex items-center gap-2">
      <UInput
        v-model="newTodo"
        name="todo"
        :disabled="loading"
        class="flex-1"
        placeholder="Make a Nuxt demo"
        autocomplete="off"
      />

      <UButton type="submit" trailing-icon="i-heroicons-plus-20-solid" label="Add" />
    </div>

    <ul class="divide-y divide-gray-200">
      <li
        v-for="todo of todos"
        :key="todo.id"
        class="flex items-center gap-4 py-2"
      >
        <span class="flex-1 font-medium" :class="[todo.completed ? 'line-through text-gray-500' : 'text-gray-900']">{{ todo.title }}</span>

        <UToggle :model-value="Boolean(todo.completed)" @update:model-value="toggleTodo(todo)" />

        <UButton
          color="red"
          variant="soft"
          size="2xs"
          icon="i-heroicons-x-mark-20-solid"
          @click="deleteTodo(todo)"
        />
      </li>
    </ul>
  </UCard>
</template>