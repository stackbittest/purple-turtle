import React from "react";
import sectionComponentTypeList from "../components/indexSectionComponents.js";
import styles from './advancedPage.module.css'

export default function AdvancedPage(props) {
  const sections = props.meta.sections;
  const SectionComponents = sections.map((section, index) => {
    let sectionType = section.type.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join('');
    let Component = sectionComponentTypeList[sectionType];
    return <Component section={section} />;
  });
  return (
    <div data-sb-object-id={ props.originalfilepath }>
      <h1>An advanced page called {props.hello}</h1>
      <div className={styles.testingcss}>{SectionComponents}</div>
    </div>
  );
}
