export function getReactJSXCodeTemplate(featureName: string): string {
  const template = `import React from "react";
  
import styles from "./${featureName}.module.scss";

const ${featureName} = (props) => {
    return (<div></div>);
}`;

  return template;
}
