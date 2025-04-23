import { IoSearchOutline } from "react-icons/io5";
import { LuListFilter } from "react-icons/lu";
import { IoIosAdd } from "react-icons/io";

export default function Mind() {
  return (
    <div id="mind-container" className="main-container">
      <MindSearch />
      <FilterSorts />
      <TreeList />
    </div>
  );
}

function MindSearch() {
  return (
    <div id="mind-header-container" className="">
      <div id="mind-search-container">
        <div>
          <IoSearchOutline />
        </div>
        <input type="text" placeholder="Search Trees..." />
        <button>
          <LuListFilter />
        </button>
      </div>
      <button id="create-tree-btn">
        <IoIosAdd />
      </button>
    </div>
  );
}

function FilterSorts() {
  return (
    <div id="mind-filter-sorts">
      <button className="filter-sort-btn">Trees: All</button>
      <button className="filter-sort-btn">Contains: All</button>
      <button className="filter-sort-btn">Time: All</button>
    </div>
  );
}

function TreeList() {
  return (
    <div id="tree-list">
    </div>
  );
}
