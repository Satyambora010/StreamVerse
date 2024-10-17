import { Loader } from 'lucide-react';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Navigate, Route, Routes } from 'react-router-dom';
import HistoryPage from './Components/HistoryPage';
import HomePage from './Components/HomePage';
import LoginPage from './Components/LoginPage';
import OriginalContent from './Components/OriginalContent';
import SearchPage from './Components/SearchPage';
import SignupPage from './Components/SignupPage';
import Subscribe from './Components/Subcsribe';
import WatchPage from './Components/WatchPage';
import { useAuthStore } from './Store/authUser';

function App() {

  const { user, isCheckingAuth, authCheck } = useAuthStore();
  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if(isCheckingAuth){
    return <div className="h-screen">
      <div className='flex justify-center items-center h-full bg-black'>
        <Loader className='animate-spin text-[#B20000] size-10' />
      </div>
      </div>;
  } 

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={user ? <Navigate to={"/"} /> : <LoginPage />} />
        <Route path="/signup" element={user ? <Navigate to={"/"} /> : <SignupPage />} />
        <Route path="/watch/:id" element={user ? <WatchPage /> : <Navigate to={"/login"} />} />
        <Route path="/search" element={user ? <SearchPage /> : <Navigate to={"/login"} />} />
        <Route path="/history" element={user ? <HistoryPage /> : <Navigate to={"/login"} />} />
        <Route path="/original" element={user &&  user.subscription==="premium" ? <OriginalContent /> : <Navigate to={"/subscribe"} />} />
        <Route path="/subscribe" element={<Subscribe />} />
      </Routes>
      <Toaster />
    </>
    
  );
};

export default App;
