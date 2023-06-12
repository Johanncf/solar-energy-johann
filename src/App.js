import './App.css';

import { MsalAuthenticationTemplate } from "@azure/msal-react";

import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Template from './components/Template';
import Dash from './pages/Dashboard';
import Geracoes from './pages/Geracoes';
import Unidades from './pages/Unidades';
import CadastroUnidade from './pages/CadastroUnidade'

const LoadingComponent = () => 
  <p>Authentication in progress...</p>;

const ErrorComponent = ({error}) => 
  <p>An error ocurred: {error}</p>;


function App() {
  const { pathname } = useLocation()

  return (
    <MsalAuthenticationTemplate
      interactionType='redirect'
      authenticationRequest={{scopes: ['openid']}}
      loadingComponent={LoadingComponent}
      errorComponent={ErrorComponent}>

      <Template page={pathname}>
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Dash />} />
          <Route path='/unidades' element={<Unidades />} />
          <Route path='/unidades/cadastro' element={<CadastroUnidade action="Cadastro"/>} />
          <Route path='/unidades/edicao/:id' element={<CadastroUnidade action="Edição"/>} />
          <Route path='/geracoes' element={<Geracoes />} />
        </Routes>
      </Template>
    </MsalAuthenticationTemplate>
  );
}

export default App;
