import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from './layouts/AdminLayout'
import PejabatLayout from './layouts/PejabatLayout'
import AdminDashboard from './pages/admin/Dashboard'
import SuratKeluar from './pages/admin/SuratKeluar'
import AddLetter from './pages/admin/AddLetter'
import SignLetter from './pages/admin/SignLetter'
import PejabatDashboard from './pages/pejabat/Dashboard'
import ReviewLetter from './pages/pejabat/ReviewLetter'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root ke admin dashboard */}
        <Route path="/" element={<Navigate to="/admin" replace />} />

        {/* Admin Routes - dengan AdminLayout (sidebar + navbar) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="surat-keluar" element={<SuratKeluar />} />
          <Route path="add-letter" element={<AddLetter />} />
          <Route path="sign-letter" element={<SignLetter />} />
        </Route>

        {/* Pejabat Routes - dengan PejabatLayout */}
        <Route path="/pejabat" element={<PejabatLayout />}>
          <Route index element={<PejabatDashboard />} />
          <Route path="review-letter/:id" element={<ReviewLetter />} />
        </Route>

        {/* 404 Page - redirect ke admin */}
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App