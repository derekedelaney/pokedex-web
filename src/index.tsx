import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import {PokemonDetail} from "./components";
import {Header} from "./components/header/Header";

const client = new ApolloClient({
  uri: "https://beta.pokeapi.co/graphql/v1beta",
  cache: new InMemoryCache()
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>
  },
  {
    path: 'pokemon/:id',
    element: <PokemonDetail/>,
    loader: async ({params}) => {
      return fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
    },
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Header/>
      <RouterProvider router={router}/>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
