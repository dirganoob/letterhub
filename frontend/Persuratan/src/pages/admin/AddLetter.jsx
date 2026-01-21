import { useState } from 'react'
import { FileText, Upload, Save } from 'lucide-react'

function AddLetter() {
  const [formData, setFormData] = useState({
    nomorSurat: '',
    kepada: '',
    hariTanggal: '',
    picDanNomorPic: '',
    waktu: '',
    namaPenandatangan: '',
    tempat: '',
    jabatan: '',
    tembusan: '',
    departemen: '',
    judulLampiran: '',
    fileLampiran: null,
    isiSurat: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFormData(prev => ({
      ...prev,
      fileLampiran: file
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form Data:', formData)
    // Nanti ini akan kirim ke backend
    alert('Surat berhasil ditambahkan!')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-3 rounded-lg">
            <FileText className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Add Letter</h1>
            <p className="text-gray-600 text-sm">Tambah surat keluar baru</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Admin 1</span>
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
            A1
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-48 bg-white shadow-lg p-4">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-primary flex items-center gap-2">
            <span className="text-secondary">Letter</span>Hub
          </h2>
        </div>
        
        <nav className="space-y-2">
          <a href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700">
            <FileText size={20} />
            <span>Dashboard</span>
          </a>
          <a href="/admin/surat-keluar" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700">
            <FileText size={20} />
            <span>Surat Keluar</span>
          </a>
          <a href="/admin/add-letter" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary text-white">
            <FileText size={20} />
            <span>Add Letter</span>
          </a>
          <a href="/admin/sign-letter" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700">
            <FileText size={20} />
            <span>Sign Letter</span>
          </a>
        </nav>
      </div>

      {/* Form Content - dengan margin left untuk sidebar */}
      <div className="ml-52">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8">
          <div className="grid grid-cols-2 gap-6">
            {/* Column 1 */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nomor Surat
                </label>
                <input
                  type="text"
                  name="nomorSurat"
                  value={formData.nomorSurat}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg border-0 focus:ring-2 focus:ring-primary outline-none"
                  placeholder="Masukkan nomor surat"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Hari / Tanggal
                </label>
                <input
                  type="date"
                  name="hariTanggal"
                  value={formData.hariTanggal}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg border-0 focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Waktu
                </label>
                <input
                  type="time"
                  name="waktu"
                  value={formData.waktu}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg border-0 focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tempat
                </label>
                <input
                  type="text"
                  name="tempat"
                  value={formData.tempat}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg border-0 focus:ring-2 focus:ring-primary outline-none"
                  placeholder="Masukkan tempat"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tembusan (CC)
                </label>
                <input
                  type="text"
                  name="tembusan"
                  value={formData.tembusan}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg border-0 focus:ring-2 focus:ring-primary outline-none"
                  placeholder="Masukkan tembusan"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Judul Lampiran
                </label>
                <input
                  type="text"
                  name="judulLampiran"
                  value={formData.judulLampiran}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg border-0 focus:ring-2 focus:ring-primary outline-none"
                  placeholder="Masukkan judul lampiran"
                />
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Kepada
                </label>
                <input
                  type="text"
                  name="kepada"
                  value={formData.kepada}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg border-0 focus:ring-2 focus:ring-primary outline-none"
                  placeholder="Masukkan penerima surat"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  PIC dan Nomor PIC
                </label>
                <input
                  type="text"
                  name="picDanNomorPic"
                  value={formData.picDanNomorPic}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg border-0 focus:ring-2 focus:ring-primary outline-none"
                  placeholder="Nama PIC dan nomor"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nama Penandatangan
                </label>
                <input
                  type="text"
                  name="namaPenandatangan"
                  value={formData.namaPenandatangan}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg border-0 focus:ring-2 focus:ring-primary outline-none"
                  placeholder="Masukkan nama penandatangan"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Jabatan
                </label>
                <input
                  type="text"
                  name="jabatan"
                  value={formData.jabatan}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg border-0 focus:ring-2 focus:ring-primary outline-none"
                  placeholder="Masukkan jabatan"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Departemen
                </label>
                <input
                  type="text"
                  name="departemen"
                  value={formData.departemen}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg border-0 focus:ring-2 focus:ring-primary outline-none"
                  placeholder="Masukkan departemen"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  File Lampiran
                </label>
                <div className="relative">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                    accept=".jpg,.jpeg,.png"
                  />
                  <label
                    htmlFor="file-upload"
                    className="w-full px-4 py-3 bg-gray-100 rounded-lg border-0 flex items-center justify-between cursor-pointer hover:bg-gray-200"
                  >
                    <span className="text-gray-500">
                      {formData.fileLampiran ? formData.fileLampiran.name : 'Upload File Here (jpg or png)'}
                    </span>
                    <Upload size={20} className="text-gray-500" />
                  </label>
                </div>
              </div>
            </div>

            {/* Full Width - Isi Surat */}
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Isi Surat
              </label>
              <textarea
                name="isiSurat"
                value={formData.isiSurat}
                onChange={handleInputChange}
                rows="8"
                className="w-full px-4 py-3 bg-gray-100 rounded-lg border-0 focus:ring-2 focus:ring-primary outline-none resize-none"
                placeholder="Masukkan isi surat..."
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
            >
              <Save size={20} />
              Simpan Surat
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddLetter