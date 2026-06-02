import { Card } from "./components/Card";
import { Header } from "./components/Header/Header";
import { Layout } from "./components/Layout";
import { Login } from "./components/Login/Login";
import { Footer } from "./components/Footer/Footer";
import styled from "styled-components";

function App() {
  return (
    <Layout>
      <Header />
      <Login />
      <Footer />
    </Layout> 
  );
}

export default App;
