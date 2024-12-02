import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import App from './components/App';


document.addEventListener("wheel", function(e){
  if(document.activeElement.type === "number"){
      e.preventDefault();
      document.activeElement.blur();
  }
});

document.addEventListener("keydown", function(e){
  if(document.activeElement.type === "number"){
      const key = e.key;
      if (key === "ArrowDown" || key === "ArrowUp") {
        e.preventDefault();
        document.activeElement.blur();
      }
  }
});

ReactDOM.render(
  /* <React.StrictMode> */
    <App />
    /* </React.StrictMode>*/,
  document.getElementById('root')
);