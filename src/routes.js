import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Book from './pages/Book';

export default function Routes() {
  return (
    // garantir roteamento correto
    <BrowserRouter>
      {/* garantir que não vai mais de uma rota aberta ao mesmo tempo */}
      <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/book" component={Book}/>
      </Switch>
    </BrowserRouter>
  );
}