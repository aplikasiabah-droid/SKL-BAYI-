
import React, { useState, useEffect } from 'react';
import { createEmptyBirthData, BirthData } from './types';
import CertificateForm from './components/CertificateForm';
import CertificatePreview from './components/CertificatePreview';

const App: React.FC = () => {
  const [data, setData] = useState<BirthData>(createEmptyBirthData());
  const [savedCertificates, setSavedCertificates] = useState<BirthData[]>([]);
  const [activeTab, setActiveTab] = useState<'form' | 'preview' | 'list'>('form');
  const [resetKey, setResetKey] = useState(0);

  // Load data from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('skl_database');
    if (stored) {
      try {
        setSavedCertificates(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to load local storage", e);
      }
    }
  }, []);

  // Save to localStorage whenever savedCertificates changes
  useEffect(() => {
    localStorage.setItem('skl_database', JSON.stringify(savedCertificates));
  }, [savedCertificates]);

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    if (window.confirm('Hapus semua data yang sedang diisi dan buat formulir baru?')) {
      setData(createEmptyBirthData());
      setResetKey(prev => prev + 1);
    }
  };

  const handleSave = () => {
    if (!data.babyName && !data.motherName) {
      alert("Minimal isi Nama Bayi atau Nama Ibu sebelum menyimpan.");
      return;
    }

    if (data.id) {
      // Update existing
      setSavedCertificates(prev => prev.map(item => item.id === data.id ? data : item));
      alert("Data berhasil diperbarui!");
    } else {
      // Create new
      const newData = { ...data, id: Date.now().toString() };
      setSavedCertificates(prev => [newData, ...prev]);
      setData(newData); // Set the current data to the one with ID
      alert("Data berhasil disimpan ke riwayat!");
    }
  };

  const handleEdit = (item: BirthData) => {
    setData({ ...item });
    setResetKey(prev => prev + 1);
    setActiveTab('form');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Hapus data ini secara permanen dari riwayat?')) {
      setSavedCertificates(prev => prev.filter(item => item.id !== id));
      if (data.id === id) {
        setData(createEmptyBirthData());
        setResetKey(prev => prev + 1);
      }
    }
  };

  const handleAddNew = () => {
    setData(createEmptyBirthData());
    setResetKey(prev => prev + 1);
    setActiveTab('form');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header Bar */}
      <header className="no-print bg-white border-b sticky top-0 z-50 px-4 md:px-6 py-3 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-inner">G</div>
          <div className="overflow-hidden">
            <h1 className="text-sm md:text-lg font-bold text-gray-900 leading-tight truncate">SKL Digital</h1>
            <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider font-semibold truncate">UPT PKM Cipanas</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          {/* Tombol PDF Aktif */}
          <button 
            onClick={handlePrint}
            className="px-3 md:px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-sm shadow-md transition-all flex items-center gap-2"
            title="Simpan sebagai PDF"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <span className="hidden sm:inline">PDF</span>
          </button>

          <button 
            onClick={handlePrint}
            className="px-3 md:px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-sm shadow-md transition-all flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
            </svg>
            <span className="hidden sm:inline">Cetak</span>
          </button>
        </div>
      </header>

      {/* Mobile Navigation Tab */}
      <div className="lg:hidden no-print flex border-b bg-white sticky top-[57px] z-40 shadow-sm">
        <button 
          onClick={() => setActiveTab('form')}
          className={`flex-1 py-3 text-[11px] font-bold border-b-2 transition-colors ${activeTab === 'form' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400'}`}
        >
          📝 FORM
        </button>
        <button 
          onClick={() => setActiveTab('preview')}
          className={`flex-1 py-3 text-[11px] font-bold border-b-2 transition-colors ${activeTab === 'preview' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-400'}`}
        >
          👁️ PRATINJAU
        </button>
        <button 
          onClick={() => setActiveTab('list')}
          className={`flex-1 py-3 text-[11px] font-bold border-b-2 transition-colors ${activeTab === 'list' ? 'border-orange-600 text-orange-600' : 'border-transparent text-gray-400'}`}
        >
          📋 RIWAYAT ({savedCertificates.length})
        </button>
      </div>

      <main className="flex-1 container mx-auto p-3 md:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 print:block">
        
        {/* LEFT: History List (Desktop) */}
        <div className={`lg:col-span-3 no-print space-y-4 ${activeTab === 'list' ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white rounded-xl shadow-md overflow-hidden border">
            <div className="bg-orange-50 p-4 border-b flex justify-between items-center">
              <h2 className="font-bold text-orange-800 text-sm flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                </svg>
                Daftar Riwayat
              </h2>
              <button 
                onClick={handleAddNew}
                className="bg-orange-600 text-white p-1 rounded-full hover:bg-orange-700 shadow-sm transition-transform active:scale-90"
                title="Tambah Baru"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="max-h-[70vh] overflow-y-auto">
              {savedCertificates.length === 0 ? (
                <div className="p-8 text-center text-gray-400">
                  <p className="text-sm italic">Belum ada data tersimpan.</p>
                </div>
              ) : (
                <div className="divide-y">
                  {savedCertificates.map((item) => (
                    <div 
                      key={item.id} 
                      className={`p-3 hover:bg-gray-50 transition-colors group ${data.id === item.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''}`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <div className="cursor-pointer flex-1" onClick={() => handleEdit(item)}>
                          <h3 className="text-xs font-bold text-gray-800 uppercase line-clamp-1">
                            {item.babyName || item.motherName || 'TANPA NAMA'}
                          </h3>
                          <p className="text-[10px] text-gray-500">{item.date || 'Tgl tdk diisi'}</p>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => handleEdit(item)}
                            className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                            title="Edit"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.707.707-2.828-2.828.707-.707zM11.36 6.036l-8.192 8.192a1 1 0 00-.233.34l-1.17 3.51a1 1 0 001.225 1.225l3.51-1.17a1 1 0 00.34-.233l8.192-8.192-2.828-2.828z" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => handleDelete(item.id!)}
                            className="p-1 text-red-600 hover:bg-red-100 rounded"
                            title="Hapus"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CENTER: Form Section */}
        <div className={`lg:col-span-4 no-print ${activeTab === 'form' ? 'block' : 'hidden lg:block'}`}>
          <div className="lg:sticky lg:top-24 space-y-4">
            <div className="flex justify-between items-end px-1">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <span className="bg-blue-600 w-1.5 h-5 rounded-full inline-block"></span>
                {data.id ? 'Edit Data' : 'Data Baru'}
              </h2>
              {data.id && (
                <button 
                  onClick={handleAddNew}
                  className="text-[10px] font-bold text-blue-600 underline"
                >
                  BUAT BARU
                </button>
              )}
            </div>
            <CertificateForm 
              key={`form-${resetKey}`} 
              data={data} 
              onChange={setData} 
              onReset={handleReset} 
              onSave={handleSave}
              onPrint={handlePrint}
            />
          </div>
        </div>

        {/* RIGHT: Preview Section */}
        <div className={`lg:col-span-5 xl:col-span-5 print:w-full ${activeTab === 'preview' ? 'block' : 'hidden lg:block'}`}>
          <h2 className="hidden lg:flex text-lg font-bold text-gray-800 mb-4 items-center gap-2 no-print">
            <span className="bg-green-600 w-1.5 h-5 rounded-full inline-block"></span>
            Pratinjau Cetak
          </h2>
          <div className="print:m-0 no-print:bg-gray-200 no-print:p-4 md:no-print:p-6 no-print:rounded-2xl no-print:shadow-inner no-print:max-h-[85vh] no-print:overflow-y-auto">
            <CertificatePreview data={data} />
          </div>
        </div>

      </main>

      <footer className="no-print bg-white border-t p-4 text-center text-gray-400 text-[10px]">
        <p>&copy; 2024 UPT Puskesmas Cipanas Garut - v2.6 PDF Support Active</p>
      </footer>
    </div>
  );
};

export default App;
