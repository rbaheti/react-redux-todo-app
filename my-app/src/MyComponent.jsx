import React, { Component } from 'react';
import { Classes, Button, MenuItem } from "@blueprintjs/core";
import { MultiSelect } from "@blueprintjs/labs";
// import "@blueprintjs/labs/dist/blueprint-labs.css";

export default class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
      item: {title: "San Francisco", key: 1}
    };

    this.items = [
      { title: "San Francisco", key: 1 },
      { title: "Boston", key: 2 },
      { title: "New York", key: 3 },
      { title: "Los Angeles", key: 4 },
      { title: "Washington DC", key: 5 },
      { title: "Las Vegas", key: 6 },
      { title: "Salt Lake City", key: 7 }
    ];
  }

  renderItem = (item, { handleClick, modifiers, query }) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    return (
      <MenuItem
        // className={modifiers.active ? Classes.ACTIVE : ""}
        active={modifiers.active}
        disabled={modifiers.disabled}
        label={''}
        key={item.key}
        onClick={handleClick}
        text={item.title}
      />
    );
  }

  filterItem = (query, item) => {
    return (`${item.title.toLowerCase()}`.indexOf(query.toLowerCase()) >= 0);
  };

  incrementCounter = () => {
    console.log("clicked.");
  }

  getSelectedItemIndex = (item) => {
      return this.state.selectedItems.findIndex(d => d.key === item.key);
  }

  selectItem = (item) => {
      const newSelectedItems = [...this.state.selectedItems, item];
      this.setState({selectedItems : newSelectedItems});
  }

  deselectItem = (item) => {
    const itemIndex = this.getSelectedItemIndex(item);
    const newSelectedItems = this.state.selectedItems.filter((d, i) => i !== itemIndex);
    this.setState({selectedItems : newSelectedItems});
  }

  handleItemSelect = (item) => {
    if (this.getSelectedItemIndex(item) < 0) {
      this.selectItem(item);
    } else {
      this.deselectItem(item);
    }
  }

  renderTag = item => {
      return <span className={`city`}>{item.title}</span>;
  }

  render() {
    const buttonText = this.state.item.title;
    console.log("selectedItems: ", this.state.selectedItems);
    return (
      <div>
        <MultiSelect 
          items={this.items}
          itemPredicate={this.filterItem}
          itemRenderer={this.renderItem}
          noResults={<MenuItem disabled={true} text="No results." />}
          onItemSelect={this.handleItemSelect}
          tagRenderer={this.renderTag}
          selectedItems={this.state.selectedItems}>
          <Button text={buttonText} rightIcon="caret-down" />
        </MultiSelect>
      </div>
    );
  }
}