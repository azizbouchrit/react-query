import { QueryClient, QueryClientProvider} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import "./App.css";
import Test1 from "./prev/Test1";
import Test2 from "./prev/Test2";
import DependentQueriesPage from './react-query/DependentQueries.page';
import DynamicParallelPage from './react-query/DynamicParallel.page';
import  HomePage  from './react-query/Home.page'
import InfiniteQueriesPage from './react-query/InfiniteQueries.Page';
import PaginatedQueriesPage from './react-query/PaginatedQueries.page';
import ParallelQueriesPage from './react-query/ParallelQueriesPage';
import RQSuperHeroPage from './react-query/RQSuperHero.page';
import RQSuperherosPage from './react-query/RQSuperheros.page';
import SuperHerosPage from './react-query/SuperHeroes.page';


function App() {

  const querClient = new QueryClient()
  
return (
  <QueryClientProvider client={querClient} >

  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/super-heroes'>Traditional Super Heroes</Link>
          </li>
          <li>
            <Link to='/rq-super-heroes'>RQ Super Heroes</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path='/rq-infinite' element={<InfiniteQueriesPage  />} />
        <Route path='/rq-paginated' element={<PaginatedQueriesPage  />} />
        <Route path='/rq-dependent' element={<DependentQueriesPage email="aziz@ytest.com" />} />
        <Route path='/super-heroes' element={<SuperHerosPage />} />
        <Route path='/rq-super-heroes/:heroId' element={<RQSuperHeroPage />} />
        <Route path='/rq-super-heroes' element={<RQSuperherosPage />} />
        <Route path='/rq-parallel-dynamic' element={<DynamicParallelPage heroIds={[1,3]} />} />
        <Route path='/rq-parallel' element={<ParallelQueriesPage />} />
        <Route path='/' element={<HomePage />} />
      </Routes>
    </div>
  </Router>
  <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
  </QueryClientProvider>

)
}

export default App;
