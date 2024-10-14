<script setup lang="ts">
import { useMutation, useQuery, useQueryCache } from '@pinia/colada'

definePageMeta({
  middleware: 'auth'
})
const newTodo = ref('')
const newTodoInput = useTemplateRef('todo-input')

const toast = useToast()
const { user, clear } = useUserSession()
const queryCache = useQueryCache()

// using $fetch directly doesn't avoid the round trip to the server
// when doing SSR
// https://github.com/nuxt/nuxt/issues/24813
const { data: todos } = useQuery({
  key: ['todos'],
  query: () => useRequestFetch()('/api/todos')
})

const { mutate: addTodo, isLoading: loading } = useMutation({
  mutation: (title: string) => {
    if (!title.trim()) throw new Error('Title is required')

    return $fetch('/api/todos', {
      method: 'POST',
      body: {
        title,
        completed: 0
      }
    })
  },

  async onSuccess(todo) {
    await queryCache.invalidateQueries({ key: ['todos'] })
    toast.add({ title: `Todo "${todo.title}" created.` })
    newTodo.value = ''
  },

  onSettled() {
    // nextTick allows the form to get out of its disabled state which is controlled by `loading`. If we don't do this,
    // the input is disabled and cannot be focused
    nextTick(() => {
      if (!newTodoInput.value?.input) {
        console.error('Input not found')
      }
      newTodoInput.value?.input?.focus()
    })
  },

  onError(err) {
    if (err.data?.data?.issues) {
      const title = err.data.data.issues
        .map(issue => issue.message)
        .join('\n')
      toast.add({ title, color: 'red' })
    }
    else {
      console.error(err)
      toast.add({ title: 'Unexpected Error', color: 'red' })
    }
  }
})

const { mutate: toggleTodo } = useMutation({
  mutation: (todo: TodoSelectSchema) =>
    $fetch(`/api/todos/${todo.id}`, {
      method: 'PATCH',
      body: {
        completed: Number(!todo.completed)
      }
    }),

  async onSuccess() {
    await queryCache.invalidateQueries({ key: ['todos'] })
  }
})

const { mutate: deleteTodo } = useMutation({
  mutation: (todo: Todo) =>
    $fetch(`/api/todos/${todo.id}`, { method: 'DELETE' }),

  async onSuccess(_result, todo) {
    await queryCache.invalidateQueries({ key: ['todos'] })
    toast.add({ title: `Todo "${todo.title}" deleted.` })
  }
})

const items = [
  [
    {
      label: 'Logout',
      icon: 'i-heroicons-arrow-left-on-rectangle',
      click: clear
    }
  ]
]
</script>

<template>
  <UCard @submit.prevent="addTodo(newTodo)">
    <template #header>
      <h3 class="text-lg font-semibold leading-6">
        <NuxtLink to="/">
          Todo List
        </NuxtLink>
      </h3>

      <UDropdown
        v-if="user"
        :items="items"
      >
        <UButton
          color="white"
          trailing-icon="i-heroicons-chevron-down-20-solid"
        >
          <UAvatar
            :src="`https://github.com/${user.login}.png`"
            :alt="user.login"
            size="3xs"
          />
          {{ user.login }}
        </UButton>
      </UDropdown>
    </template>

    <div class="flex items-center gap-2">
      <UInput
        ref="todo-input"
        v-model="newTodo"
        name="todo"
        :disabled="loading"
        class="flex-1"
        placeholder="Make a Nuxt demo"
        autocomplete="off"
        autofocus
        :ui="{ wrapper: 'flex-1' }"
      />

      <UButton
        type="submit"
        icon="i-heroicons-plus-20-solid"
        :loading="loading"
        :disabled="newTodo.trim().length === 0"
      />
    </div>

    <ul class="divide-y divide-gray-200 dark:divide-gray-800">
      <li
        v-for="todo of todos"
        :key="todo.id"
        class="flex items-center gap-4 py-2"
      >
        <span
          class="flex-1 font-medium"
          :class="[todo.completed ? 'line-through text-gray-500' : '']"
        >{{ todo.title }}</span>

        <UToggle
          :model-value="Boolean(todo.completed)"
          @update:model-value="toggleTodo(todo)"
        />

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
