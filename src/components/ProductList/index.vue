<template>
  <div class="hello">
    <TableComponent :data="products" :fields="columnsTitle" />
    <!-- <div v-for="(product, indexProduct) in products" :key="indexProduct">
      {{ product }}
    </div> -->
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

<style scoped></style>
