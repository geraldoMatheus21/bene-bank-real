import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { Layout } from '../components/Layout/Layout';
import { Home } from '../Pages/Home/Home';
import { Login } from '../Pages/Login/Login';
import CriarLogin from '../Pages/CriarLogin/CriarLogin';
import { EsqueciSenha } from '../Pages/EsqueciSenha/EsqueciSenha';
import { ContaCriada } from '../Pages/CriarLogin/ContaCriada';
import { Dashboard } from '../Pages/DashBoard/Dashboard';
import { ProtectedRoute } from '../components/ProtectedRoute/ProtectedRoute';
import { Simulador } from '../Pages/Simulador/Simulador';
import { Analise } from '../Pages/Analise/Analise';



export const AppRouter = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/criar-login" element={<CriarLogin />} />
            <Route path="/esqueci-senha" element={<EsqueciSenha />} />
            <Route path="/conta-criada" element={<ContaCriada />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
            <Route
                path="/simulador" element={<ProtectedRoute><Simulador /></ProtectedRoute>} />
            <Route path="/analise" element={<ProtectedRoute><Analise /></ProtectedRoute>} />
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
};