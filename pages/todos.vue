<script setup>
definePageMeta({
  middleware: function () {
    const { loggedIn } = useUserSession();
    if (!loggedIn.value) {
      return navigateTo("/");
    }
  },
});
</script>
<template>
  <Container>
    <TodoList />
  </Container>
</template>
