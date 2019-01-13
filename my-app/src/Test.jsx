import React, {Component} from "react";
import {Button, Classes, MenuItem} from "@blueprintjs/core";
import {MultiSelect} from "@blueprintjs/labs";
import "@blueprintjs/labs/dist/blueprint-labs.css";

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
      item: {title: "San Francisco", key: 1}
    };

    this.items = [
      {title: "San Francisco", key: 1},
      {title: "Boston", key: 2},
      {title: "New York", key: 3},
      {title: "Los Angeles", key: 4},
      {title: "Washington DC", key: 5},
      {title: "Las Vegas", key: 6},
      {title: "Salt Lake City", key: 7}
    ];
  }

  isItemSelected = item => this.state.selectedItems.findIndex(c => c.key === item.key) > -1;
  
  renderItem = ({handleClick, isActive, item}) => 
    <MenuItem
      className={isActive ? Classes.ACTIVE : ""}
      iconName={this.isItemSelected(item) ? "tick" : "blank"}
      label={""}
      key={item.key}
      onClick={handleClick}
      text={`${item.title}`}
      shouldDismissPopover={false}
    />;

  filterItem = (query, item) => `${item.title.toLowerCase()}`.indexOf(query.toLowerCase()) >= 0;

  getSelectedItemIndex = item => this.state.selectedItems.findIndex(d => d.key === item.key)

  selectItem = item => {
    const newSelectedItems = [...this.state.selectedItems, item];
    this.setState({selectedItems: newSelectedItems});
  }

  deselectItem = item => {
    const itemIndex = this.getSelectedItemIndex(item);
    const newSelectedItems = this.state.selectedItems.filter((d, i) => i !== itemIndex);
    this.setState({selectedItems: newSelectedItems});
  }

  handleItemSelect = item => {
    if (this.getSelectedItemIndex(item) < 0) {
      this.selectItem(item);
    }
    else {
      this.deselectItem(item);
    }
  }

  deleteTag = (d, index) => {
    const selectedItems = this.state.selectedItems.filter((item, i) => i !== index);
    this.setState({selectedItems});
  }

  renderTag = item => <span>{item.title}</span>;

  render() {
    const buttonText = this.state.item.title;
    return (
      <div>
        <MultiSelect 
          items={this.items}
          itemPredicate={this.filterItem}
          itemRenderer={this.renderItem}
          noResults={<MenuItem disabled text="No results." />}
          onItemSelect={this.handleItemSelect}
          tagInputProps={{onRemove: this.deleteTag, placeholder: "Add a cancer type", inputProps: {placeholder: "Add a cancer type"}}}
          tagRenderer={this.renderTag}
          selectedItems={this.state.selectedItems}
          resetOnClose={true}
          resetOnSelect={true}>
          <Button text={buttonText} rightIcon="caret-down" />
        </MultiSelect>
      </div>
    );
  }
}
