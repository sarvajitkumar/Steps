import React, { Component } from 'react';

class HabitListItemSettingsModal extends Component {
  state = {}

  showSettings = (show) => {
    this.setState({ show });
  }

  componentDidMount() {
    document.body.addEventListener('click', this.showMenu, false);
  }

  componentWillReceiveProps({ show }) {
    this.showSettings(show);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.showMenu, false);
  }

  render() {
    const { x, y, show: menuShow } = this.props;
    const { show = menuShow } = this.state;
    const menuStyle = {
      top: y,
      left: x
    }

    return show ?
      (
        <div className="habit-item-settings" style={menuStyle}>
          test
        </div>
      ) :
      null;
  }
}

export default HabitListItemSettingsModal;

// import './Menu.css';

// class Menu extends Component {
//   state = {}

//   showMenu = (show) => {
//     this.setState({ show });
//   }

//   componentWillReceiveProps({ show }) {
//     this.showMenu(show);
//   }

//   componentDidMount() {
//     document.body.addEventListener('click', this.showMenu, false);
//   }

//   componentWillUnmount() {
//     document.body.removeEventListener('click', this.showMenu, false);
//   }

//   render() {
//     const { x, y, show: menuShow } = this.props;
//     const { show = menuShow } = this.state;
//     const menuStyle = {
//       top: y,
//       left: x
//     };

//     return show ?
//       (
//         <div style={menuStyle} className="menu">
//           {this.props.children}
//         </div>
//       ) :
//       null;
//   }
// }

// export default Menu;