import React from "react";
import styles from "./Expandable.module.css";
interface Props {
  title: string;
  expanded?: boolean;
}

interface State {
  isOpen: boolean;
}

export default class ExpandableProperty extends React.Component<Props, State> {
  state = {
    isOpen: !!this.props.expanded,
  };

  render() {
    return (
      <React.Fragment>
        <div
          className={styles.container}
          onClick={() => this.setState({ isOpen: !this.state.isOpen })}
        >
          <span className={styles.toggleButton}>
            {this.state.isOpen ? "-" : "+"}
          </span>
          {!this.state.isOpen ? this.props.title : ""}
        </div>

        {this.state.isOpen ? this.props.children : null}
        {React.Children.count(this.props.children) === 0 && this.state.isOpen
          ? "The list is empty!"
          : null}
      </React.Fragment>
    );
  }
}
