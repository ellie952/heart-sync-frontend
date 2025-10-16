import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import SpotifyTokenSuccess from './components/SpotifyTokenSucess/SpotifyTokenSuccess';
import LandingPage from './pages/LandingPage/LandingPage';
import AuthProvider from './contexts/AuthContext';
import SearchUsername from './components/SearchUsername/SearchUsername';
import ViewPlaylistPage from './pages/ViewPlaylistPage/ViewPlaylistPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={<LandingPage />}
          />
          <Route
            path="/dashboard/:userId"
            element={<DashboardPage />}
          />
          <Route
            path="/profile/:userId"
            element={<ProfilePage />}
          />
          <Route
            path="/login"
            element={<LoginPage />}
          />
          <Route
            path="/register"
            element={<RegisterPage />}
          />
          <Route
            path="/generate-playlist"
            element={<GeneratePlaylistPage />}
          />
          <Route
            path="/view-playlist/:playlistId"
            element={<ViewPlaylistPage />}
          />
          <Route
            path="/new-post"
            element={<NewPostPage />}
          />
          <Route
            path="/spotify-connection"
            element={<SpotifyConnectionPage />}
          />
          <Route
            path="/spotify-success"
            element={<SpotifyTokenSuccess />}
          />
          <Route
            path="/search"
            element={<SearchUsername />}
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
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
