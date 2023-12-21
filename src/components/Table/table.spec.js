import { mount } from "@vue/test-utils";
import Table from "./index.vue";

describe("Table.vue", () => {
  it("renders a table with the correct number of rows and columns", () => {
    const headers = ["Header 1", "Header 2"];
    const rows = [
      ["Row 1, Cell 1", "Row 1, Cell 2"],
      ["Row 2, Cell 1", "Row 2, Cell 2"],
    ];
    const wrapper = mount(Table, {
      props: { headers, rows },
    });

    expect(wrapper.findAll("thead th").length).toBe(headers.length);
    expect(wrapper.findAll("tbody tr").length).toBe(rows.length);
    expect(wrapper.findAll("tbody td").length).toBe(
      rows.length * headers.length
    );
  });
});
