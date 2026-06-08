import { Header } from "./components/Header/Header";
import { Layout } from "./components/Layout/Layout";
import { Login } from "./Pages/Login/Login";
import { Footer } from "./components/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CriarLogin from "./Pages/CriarLogin/CriarLogin";

function App() {
  return (
    <Router>
      <Layout>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/criar-login" element={<CriarLogin />} />
          {/* Futura rota para esqueci a senha */}
          {/* <Route path="/esqueci-senha" element={<EsqueciSenha />} /> */}
        </Routes>
        <Footer />
      </Layout>
    </Router>
  );
}

export default App;