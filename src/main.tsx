import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import DashboardPage from './pages/DashboardPage/DashboardPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import NewPostPage from './pages/NewPostPage/NewPostPage';
import NavBar from './components/NavBar/NavBar';
import PasswordResetForm from './components/PasswordResetForm/PasswordResetForm';
import MainSettings from './components/MainSettings/MainSettings';
import EditProfileForm from './components/EditProfileForm/EditProfileForm';
import DeleteProfileForm from './components/DeleteProfileForm/DeleteProfileForm';
import GeneratePlaylistPage from './pages/GeneratePlaylistPage/GeneratePlaylistPage';
import SpotifyConnectionPage from './pages/SpotifyConnection/SpotifyConnection';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NavBar />
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<DashboardPage />}
        />
        <Route
          path="/register"
          element={<RegisterPage />}
        />
        <Route
          path="/login"
          element={<LoginPage />}
        />
        <Route
          path="/profile"
          element={<ProfilePage />}
        />
        <Route
          path="/settings"
          element={<SettingsPage />}
          children={
            <>
              <Route index={true} element={<MainSettings />} />
              <Route path="edit-profile" element={<EditProfileForm />} />
              <Route path="password-reset" element={<PasswordResetForm />} />
              <Route path="delete-profile" element={<DeleteProfileForm />} />
            </>
          }
        />
         <Route
          path="/generate-playlist"
          element={<GeneratePlaylistPage />}
        />
        <Route
          path="/new-post"
          element={<NewPostPage />}
        />
        <Route
          path="/spotify-connection"
          element={<SpotifyConnectionPage />}
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
