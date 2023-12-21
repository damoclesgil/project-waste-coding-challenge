import { mount } from "@vue/test-utils";
import Table from "./index.vue";
import { products, columnsTitle } from "../ProductList/mockedProducts";

describe("Table.vue", () => {
  beforeEach(() => {
    jest.spyOn(console, "warn").mockImplementation(() => {});
  });

  it("renders a table with the correct number of rows and columns", () => {
    const data = [...products];
    const fields = [...columnsTitle];

    const wrapper = mount(Table, {
      props: { fields, data },
    });

    expect(wrapper.findAll("thead th").length).toBe(fields.length);
    expect(wrapper.findAll("tbody tr").length).toBe(data.length);
    expect(wrapper.findAll("tbody td").length).toBe(data.length * fields.length);
  });
  it("set cells correctly", () => {
    const data = [...products];
    const fields = [...columnsTitle];

    const wrapper = mount(Table, {
      props: { fields, data },
    });

    let cells = wrapper.componentVM.handleCells(fields);
    let expectedResult = [
      "itemCode",
      "product",
      "package",
      "availableUnits",
      "category",
      "lastUpdated"
    ];
    expect(cells).toEqual(expectedResult);
  });
});
