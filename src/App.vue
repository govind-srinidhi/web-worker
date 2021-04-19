<template lang="pug">
  component(is = "DefaultLayout")
    Home
</template>

<script>
import Home from "./views/home"
import DefaultLayout from "@/layouts/default"

export default {
  name: "WebWorkerSorting",
  components: {
    Home,
    DefaultLayout
  }
}

</script>
