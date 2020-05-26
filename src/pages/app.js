import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { defaultTheme, GlobalStyle } from 'esducad-ui/dist/utils';
import { Home, NotFound } from 'pages';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Seo } from 'utils';

const CustomStyle = createGlobalStyle`
  body{
    font-family: 'Zilla Slab Highlight', cursive;
    background-color:#42E6A4;
    line-height:1.2;
  }
`;

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <CustomStyle />
      <Seo />
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
