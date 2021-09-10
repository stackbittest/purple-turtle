import React from "react"
import HeaderComponent from "../components/header"

export default function LayoutHello({ children }) {
  return (
    <div className="hello-layout-wrapper">
      <HeaderComponent />
      <main className="hello-layout-main">
	    { children }
      </main>
	  <footer className="hello-layout-footer">Footer placeholder</footer>
	</div>
  )
}
