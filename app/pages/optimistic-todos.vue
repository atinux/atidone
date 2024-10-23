<script setup lang="ts">
import { useMutation, useQuery, useQueryCache } from '@pinia/colada'

definePageMeta({
  middleware: 'auth'
})
const newTodo = ref('')

const toast = useToast()
const { user, clear } = useUserSession()
const queryCache = useQueryCache()

// using $fetch directly doesn't avoid the round trip to the server
// when doing SSR
// https://github.com/nuxt/nuxt/issues/24813
const $rfetch = useRequestFetch()
const { data: todos } = useQuery({
  key: ['todos'],
  // NOTE: the cast sometimes avoids an "Excessive depth check" TS error
  query: ({ signal }) => $rfetch('/api/todos', { signal }) as Promise<Todo[]>
})

const { mutate: addTodo } = useMutation({
  mutation: (title: string) => {
    if (!title.trim()) throw new Error('Title is required')

    return $rfetch('/api/todos', {
      method: 'POST',
      body: {
        title,
        completed: 0
      }
    })
  },

  onMutate(title) {
    // let the user enter new todos right away!
    newTodo.value = ''
    const oldTodos = queryCache.getQueryData<Todo[]>(['todos']) || []
    // we use newTodos to check for the cache consistency
    // a better way would be to save the entry time
    // const when = queryCache.getEntries({ key: ['todos'], exact: true }).at(0)?.when
    const newTodos = [
      ...oldTodos,
      {
        title,
        completed: 0,
        // a negative id to differentiate them from the server ones
        id: -Date.now(),
        createdAt: new Date(),
        userId: user.value!.id
      } satisfies Todo
    ]
    queryCache.setQueryData(['todos'], newTodo)

    return { oldTodos, newTodos }
  },

  onSuccess(todo) {
    toast.add({ title: `Todo "${todo.title}" created.` })
  },

  onSettled() {
    // always refetch the todos after a mutation
    queryCache.invalidateQueries({ key: ['todos'] })
  },

  onError(err, _title, { oldTodos, newTodos }) {
    // oldTodos can be undefined if onMutate errors
    // we also want to check if the oldTodos are still in the cache
    // because the cache could have been updated by another query
    if (newTodos != null && newTodos === queryCache.getQueryData(['todos'])) {
      queryCache.setQueryData(['todos'], oldTodos)
    }

    // FIXME: use an actual error guard
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((err as any).data?.data?.issues) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const title = (err as any).data.data.issues
        .map((issue: { message: string }) => issue.message)
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
  mutation: (todo: Todo) =>
    $rfetch(`/api/todos/${todo.id}`, {
      method: 'PATCH',
      body: {
        completed: Number(!todo.completed)
      }
    }),

  onMutate(todo) {
    const oldTodos = queryCache.getQueryData<Todo[]>(['todos']) || []
    const todoIndex = oldTodos.findIndex(t => t.id === todo.id)
    if (todoIndex >= 0) {
      const updatedTodos = oldTodos.toSpliced(todoIndex, 1, {
        ...todo,
        completed: Number(!todo.completed)
      })
      queryCache.setQueryData(['todos'], updatedTodos)
    }

    return { oldTodos }
  },

  onSettled() {
    // always refetch the todos after a mutation
    queryCache.invalidateQueries({ key: ['todos'], exact: true })
  },

  onError(err, todo, { oldTodos }) {
    // oldTodos can be undefined if onMutate errors
    if (oldTodos) {
      queryCache.setQueryData(['todos'], oldTodos)
    }

    console.error(err)
    toast.add({ title: 'Unexpected Error', color: 'red' })
  }
})

const { mutate: deleteTodo } = useMutation({
  mutation: (todo: Todo) => $rfetch(`/api/todos/${todo.id}`, { method: 'DELETE' }),

  async onSuccess(_result, todo) {
    await queryCache.invalidateQueries({ key: ['todos'] })
    toast.add({ title: `Todo "${todo.title}" deleted.` })
  },

  onMutate(todo) {
    const oldTodos = queryCache.getQueryData<Todo[]>(['todos']) || []
    const todoIndex = oldTodos.findIndex(t => t.id === todo.id)
    if (todoIndex >= 0) {
      const updatedTodos = oldTodos.toSpliced(todoIndex, 1)
      queryCache.setQueryData(['todos'], updatedTodos)
    }

    return { oldTodos }
  },

  onSettled() {
    // always refetch the todos after a mutation
    queryCache.invalidateQueries({ key: ['todos'], exact: true })
  },

  onError(err, todo, { oldTodos }) {
    // oldTodos can be undefined if onMutate errors
    if (oldTodos) {
      queryCache.setQueryData(['todos'], oldTodos)
    }

    console.error(err)
    toast.add({ title: 'Unexpected Error', color: 'red' })
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
        v-model="newTodo"
        name="todo"
        class="flex-1"
        placeholder="Make a Nuxt demo"
        autocomplete="off"
        autofocus
        :ui="{ wrapper: 'flex-1' }"
      />

      <UButton
        type="submit"
        icon="i-heroicons-plus-20-solid"
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
          :class="{
            'text-gray-500': todo.completed || todo.id < 0,
            'line-through': todo.completed
          }"
        >{{ todo.title }}</span>

        <UIcon
          v-if="todo.id < 0"
          name="i-heroicons-arrow-path-20-solid"
          class="animate-spin"
        />

        <UToggle
          :model-value="Boolean(todo.completed)"
          :disabled="todo.id < 0"
          @update:model-value="toggleTodo(todo)"
        />

        <UButton
          color="red"
          variant="soft"
          size="2xs"
          icon="i-heroicons-x-mark-20-solid"
          :disabled="todo.id < 0"
          @click="deleteTodo(todo)"
        />
      </li>
    </ul>
  </UCard>
</template>
