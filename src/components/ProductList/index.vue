<template>
  <div class="wrapper">
    <TableComponent :data="products" :fields="columnsTitle" />
  </div>
</template>

<script>
import { products, columnsTitle } from "./mockedProducts";
import TableComponent from "../Table/index.vue";

export default {
  name: "ProductList",
  components: {
    TableComponent,
  },
  setup() {
    return {
      products,
      columnsTitle,
    };
  },
};
</script>

<style scoped>
.wrapper {
  background-color: #f8f8f8;
  padding: 0.5rem 1rem;
}
</style>
