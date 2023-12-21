<template>
  <div>
    <div>
      <input
        type="search"
        class="input-search"
        v-model="searchQuery"
        @input="onChange"
        placeholder="Search by “Item code”, “Product”, or “Category”"
        aria-label="Recipient's search product"
      />
    </div>
    <table>
      <thead>
        <tr>
          <!-- loop through each value of the fields to get the table header -->
          <th v-for="field in fields" :key="field" @click="sortValue(field)">
            {{ field }}
            <i class="bi bi-sort-alpha-down" aria-label="Sort Icon"></i>
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- Loop through the list get the each student data -->
        <tr v-for="(item, indexItem) in filteredList" :key="indexItem">
          <!-- <td v-for="field in fields" :key="field">{{ item[field] }}</td> -->
          <td>{{ item.itemCode }}</td>
          <td class="text-green">{{ item.product }}</td>
          <td>{{ item.package }}</td>
          <td>{{ item.availableUnits }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.lastUpdated }}</td>
          <td>
            <input v-model="datax[indexItem].quantity" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { ref, computed } from "vue";
import { camelize } from "../../utils/camelize";
import { debounce } from "throttle-debounce";

export default {
  name: "TableComponent",
  props: {
    //
    data: {
      type: Array,
    },
    fields: {
      type: Array,
    },
  },
  setup(props) {
    const searchQuery = ref(null);
    const datax = ref([...props.data]);
    const currentSort = ref(0);
    const sortStatus = ref([null, "asc", "desc"]);

    const sortBy = (currentSortKey = "name", currentSortType = "desc") => {
      function compare(a, b) {
        if (a[currentSortKey] < b[currentSortKey])
          return currentSortType === "desc" ? 1 : -1;
        if (a[currentSortKey] > b[currentSortKey])
          return currentSortType === "desc" ? -1 : 1;
        return 0;
      }
      return currentSortType !== null
        ? [...props.data].sort(compare)
        : [...props.data];
    };

    const sortValue = (col) => {
      let key = handleHeaders(col);
      currentSort.value = currentSort.value !== 2 ? currentSort.value + 1 : 0;
      datax.value = sortBy(key, sortStatus.value[currentSort.value]);
    };

    const handleHeaders = (headers) => {
      if (headers === "Edit available quantity") {
        return "quantity";
      }
      return camelize(headers);
    };

    const handleSearch = debounce(800, (searching) => {
      onSearch(searching.trim());
    });

    const onSearch = (searchParam) => {
      // if existis an api request with a interval of 800 milliseconds.
      console.info(searchParam);
    };

    const onChange = () => {
      handleSearch(searchQuery.value);
    };

    const filteredList = computed(() => {
      if (searchQuery.value) {
        return datax.value.filter((item) => {
          return (
            item.product
              .toLowerCase()
              .indexOf(searchQuery.value.toLowerCase()) != -1 ||
            item.itemCode
              .toLowerCase()
              .indexOf(searchQuery.value.toLowerCase()) != -1 ||
            item.package
              .toLowerCase()
              .indexOf(searchQuery.value.toLowerCase()) != -1 ||
            item.category
              .toLowerCase()
              .indexOf(searchQuery.value.toLowerCase()) != -1
          );
        });
      }
      return datax.value;
    });

    return {
      searchQuery,
      filteredList,
      onChange,
      datax,
      handleSearch,
      sortValue,
    };
  },
};
</script>
<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #000;
  padding: 8px;
  text-align: left;
}
.text-green {
  color: green;
  font-weight: 400;
}
.input-search {
  width: 100%;
  max-width: 330px;
  padding: 0.6rem 0.8rem;
  margin-bottom: 1rem;
}
</style>
