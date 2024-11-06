<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
const newTodo = ref('')
const newTodoInput = useTemplateRef('new-todo')

const toast = useToast()
const queryCache = useQueryCache()

const { data: todos } = useQuery({
  key: ['todos'],
  // NOTE: the cast sometimes avoids an "Excessive depth check" TS error
  // using $fetch directly doesn't avoid the round trip to the server
  // when doing SSR
  // https://github.com/nuxt/nuxt/issues/24813
  query: () => useRequestFetch()('/api/todos') as Promise<Todo[]>
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
  },

  onSettled() {
    newTodo.value = ''
    // the first nextTick allows loading to become false and re enable the input
    // the second nextTick allows the input to be rendered again so it can be focused
    // a better solution would be to use a custom `v-focus` directive or a more elaborated focus management solution
    nextTick()
      .then(() => nextTick())
      .then(() => {
        newTodoInput.value?.input?.focus()
      })
  },

  onError(err) {
    if (isNuxtZodError(err)) {
      const title = err.data?.data.issues
        .map(issue => issue.message)
        .join('\n')
      if (title) {
        toast.add({ title, color: 'red' })
      }
    }
    else {
      console.error(err)
      toast.add({ title: 'Unexpected Error', color: 'red' })
    }
  }
})

const { mutate: toggleTodo } = useMutation({
  mutation: (todo: Todo) =>
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
</script>

<template>
  <form
    class="flex flex-col gap-4"
    @submit.prevent="addTodo(newTodo)"
  >
    <div class="flex items-center gap-2">
      <UInput
        ref="new-todo"
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
  </form>
</template>
