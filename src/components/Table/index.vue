<template>
  <div>
    <div class="content">
      <div class="bg-white">
        <h2>Inventory</h2>
        <div class="wrapper-input">
          <input
            type="search"
            class="input-search"
            v-model="searchQuery"
            @input="onChange"
            placeholder="Search by “Item code”, “Product”, or “Category”"
            aria-label="Recipient's search product"
          />
          <span class="search-icon" @click="onChange">
            <SearchIcon />
          </span>
        </div>
        <div v-if="filteredList.length">
          <table>
            <thead>
              <tr>
                <th v-for="field in fields" :key="field">
                  {{ field }}
                  <button @click="sortValue(field)" v-if="showSortIcon(field)">
                    <SortIcon :color-asc="colorAsc" :color-desc="colorDesc" />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, indexItem) in filteredList" :key="indexItem">
                <td
                  v-for="(cell, indexCell) in handleCells(fields)"
                  :key="cell"
                  :class="`${fields[indexCell] === 'Product' && 'text-green'}`"
                >
                  <template v-if="fields[indexCell] === 'Last updated'">
                    <p>{{ formatDate(item[cell]) }}</p>
                    <p>{{ formatTime(item[cell]) }}</p>
                  </template>
                  <template v-else>{{ item[cell] }}</template>
                </td>
                <td>
                  <div class="wrapper-input-cell">
                    <span>Qty</span>
                    <input
                      :value="tableData[indexItem].quantity"
                      @input="onChangeValue($event, indexItem)"
                      name="quantity"
                      placeholder="quantity"
                    />
                    <!-- type="number" -->
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-else>
          <p>
            The search with these parameters
            <strong>{{ searchQuery }}</strong> was not found!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, computed } from "vue";
import camelize from "../../utils/camelize";
import formatPrice from "../../utils/format-price";
import { formatDate, formatTime } from "../../utils/format-date";

import { debounce } from "throttle-debounce";
import SortIcon from "../Icons/SortIcon.vue";
import SearchIcon from "../Icons/SearchIcon.vue";

export default {
  name: "TableComponent",
  components: {
    SortIcon,
    SearchIcon,
  },
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
    const tableData = ref([...props.data]);
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
      tableData.value = sortBy(key, sortStatus.value[currentSort.value]);
    };

    const handleHeaders = (headers) => {
      if (headers === "Edit available quantity") {
        return "quantity";
      }
      return camelize(headers);
    };

    const handleCells = (fields) => {
      return fields
        .map((field) => handleHeaders(field))
        .filter((field) => field !== "quantity");
    };

    const handleSearch = debounce(800, (searching) => {
      if (searching) {
        onSearch(searching.trim());
      }
    });

    const onSearch = (searchParam) => {
      // if existis an api request with a interval of 800 milliseconds.
      return searchParam;
    };

    const onChange = () => {
      handleSearch(searchQuery.value);
    };

    const filteredList = computed(() => {
      if (searchQuery.value) {
        return tableData.value.filter((item) => {
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
            item.quantity
              .toLowerCase()
              .indexOf(searchQuery.value.toLowerCase()) != -1 ||
            item.category
              .toLowerCase()
              .indexOf(searchQuery.value.toLowerCase()) != -1
          );
        });
      }
      return tableData.value;
    });

    const colorAsc = computed(() => {
      if (currentSort.value === 1 && currentSort.value !== 0) return "#2D3748";
      if (currentSort.value === 2 && currentSort.value !== 0) return "#E7E8EA";
      return "#E7E8EA";
    });
    const colorDesc = computed(() => {
      if (currentSort.value === 1 && currentSort.value !== 0) return "#E7E8EA";
      if (currentSort.value === 2 && currentSort.value !== 0) return "#2D3748";
      return "#E7E8EA";
    });

    const showSortIcon = (field) => {
      if (
        field === "Product" ||
        field === "Package" ||
        field === "Available units" ||
        field === "Last updated"
      ) {
        return true;
      }
      return false;
    };

    const onChangeValue = (e, index) => {
      tableData.value[index].quantity = e.target.value;
      tableData.value[index].availableUnits = formatPrice(e.target.value);
    };

    return {
      searchQuery,
      filteredList,
      onChange,
      tableData,
      handleSearch,
      onChangeValue,
      sortValue,
      colorAsc,
      colorDesc,
      showSortIcon,
      handleCells,
      formatDate,
      formatTime,
    };
  },
};
</script>
<style scoped>
.content {
  display: flex;
  flex-direction: column;
}
.bg-white {
  text-align: left;
  padding: 1.5rem;
  background-color: #fff;
  h2 {
    margin-bottom: 1rem;
    font-weight: bold;
    font-size: 22px;
  }
}

.wrapper-input {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
}
.wrapper-input-cell {
  display: flex;
  justify-content: start;

  span {
    background-color: #f9f9f9;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    border: 1px solid #5e5e5e;
    padding: 0.3rem 0.6rem;
    height: 30px;
  }
  input {
    width: 100%;
    max-width: 120px;
    padding: 0.6rem 0.8rem;
    height: 30px;
    border: 1px solid #5e5e5e;
    border-left: none;
    outline: 0;
  }
}
.input-search {
  width: 100%;
  max-width: 330px;
  padding: 0.6rem 0.8rem;
  margin-bottom: 1rem;
  height: 40px;
  border: 1px solid #5e5e5e;
  border-right: none;
  outline: 0;
}
.input-search:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 0.3rem #eaeaea inset;
  filter: none;
}
.search-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  border: 1px solid #5e5e5e;
  padding: 0 0.4rem;
  height: 40px;
}

button {
  padding: 0;
  border: 0;
  background-color: transparent;
  cursor: pointer;
}

table {
  width: 100%;
  border-collapse: collapse;
}
th {
  background-color: #f8f8f8;
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
</style>
