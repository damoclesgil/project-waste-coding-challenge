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
  padding: 0.8rem 1rem;
}
</style>
