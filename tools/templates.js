function template(strings, ...values) {
  return strings.reduce((result, string, index) => {
    const replaced = string.replace(/\$1/g, values[index]);
    return `${result}${replaced}`;
  }, "");
}

const packagejson = (component) => template`{
    "name": "$1",
    "version": "0.0.0",
    "private": true,
    "main": "./$1.tsx"
  }
  ${component}`;

const componentjs = (component) => template`import React from 'react';
  type Props = {
  }
  function $1({}: Props) {
    return (
      <div>$1</div>
    );
  }
  export default $1;
  ${component}`;

const componentscss = (
  component
) => template`import styled from 'styled-components';
  ${component}`;

const createTemplates = (component) => ({
  componentscript: componentjs(component),
  componentscss: componentscss(component),
  packagejson: packagejson(component),
});

module.exports = {
  createTemplates,
};
