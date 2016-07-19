import style from './index';

const className = style.register `
  color: black;
  background-color: white;
  @media (min-width: 567px) {
    color: grey;
  }
`;

style.include `
  body {
    background-color: cyan;
    display: flex;
    flex-flow: row;
    &:hover {
      flex-flow: column;
    }
    &.selected {
      h1, h2, h3 {
        color: pink;
      }
      display: none;
    }
  }
`;

console.log(className);
console.log(style.getCSS());

const context = style.context();

context.register `
  color: white;
`;

console.log(context.getCSS());
