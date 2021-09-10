import React, { Component } from "react";
import Link from 'next/link';

class HeaderComponent extends Component {
  render() {
    return (
      <header className="hello-layout-header">
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/about/">
            <a>About</a>
          </Link>
          <Link href="/contact/">
            <a>Contact</a>
          </Link>
        </nav>
      </header>
    );
  }
}
export default HeaderComponent;
