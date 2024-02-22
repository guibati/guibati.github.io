import { Suspense, lazy } from 'react'
import { Route, Routes } from "react-router-dom";
import NavAppBar from './components/NavAppBar';
import Loading from './pages/Loading';
//import Loading from "./pages/Loading";
const LazyHome = lazy(() => import("./pages/HomePage"));

const LazyListPage = lazy(() => import("./components/List"));



export default function App() {

  return (
    <>

      <NavAppBar />
      <Routes>
        <Route path='/'
          element={
            <Suspense fallback={<Loading />}>
              <LazyHome />
            </Suspense>
          }
        />
      
        
        <Route path='/list'
          element={
            <Suspense fallback={<Loading />}>
              <LazyListPage />
            </Suspense>
          }
        />
       

      </Routes>
    </>



  )
}
