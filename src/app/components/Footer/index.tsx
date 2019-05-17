import * as React from 'react';
import './style.css';

class Footer extends React.Component<{}, {}> {
  render () {
    return (
      <footer className="tl-footer">
        ©{new Date().getFullYear()} 林启恩纪念中学
      </footer>
    );
  }
}

export default Footer;