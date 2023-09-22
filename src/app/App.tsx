import React, { useEffect, useState } from 'react';
import AppRouter from './Router';
import { Preloader } from '../components/shared/Preloader/Preloader';
import { useAppDispatch } from '../store/hooks';
import { getUsersThunk } from '../store/slices/usersSlice';

const App = () => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    dispatch(getUsersThunk()).then(() => setLoading(false))
  }, [dispatch])

  if (loading) {
    return <Preloader/>
  }

  return (
    <div className="app-container">
      <AppRouter/>
    </div>
  );
}

export default App