import React,{useState,useEffect} from 'react';import {createRoot} from 'react-dom/client';import App from './App.jsx';import Page from './Pages.jsx';import './index.css';
const get=()=>location.hash.startsWith('#/')?location.hash.slice(2):'';
function Root(){const [r,setR]=useState(get());useEffect(()=>{const f=()=>{setR(get());scrollTo(0,0)};addEventListener('hashchange',f);return()=>removeEventListener('hashchange',f)},[]);return r===''?<App/>:<Page name={r}/>}
createRoot(document.getElementById('root')).render(<Root/>);
