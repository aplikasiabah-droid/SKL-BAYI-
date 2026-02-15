
import React, { useState, useEffect } from 'react';
import { createEmptyBirthData, BirthData } from './types';
import CertificateForm from './components/CertificateForm';
import CertificatePreview from './components/CertificatePreview';

const App: React.FC = () => {
  const [data, setData] = useState<BirthData>(createEmptyBirthData());
  const [savedCertificates, setSavedCertificates] = useState<BirthData[]>([]);
  const [activeTab, setActiveTab] = useState<'form' | 'preview' | 'list'>('form');
  const [resetKey, setResetKey] = useState(0);

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

  useEffect(() => {
    if (savedCertificates.length > 0) {
      localStorage.setItem('skl_database', JSON.stringify(savedCertificates));
    }
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
      setSavedCertificates(prev => prev.map(item => item.id === data.id ? data : item));
      alert("Data berhasil diperbarui!");
    } else {
      const newData = { ...data, id: Date.now().toString() };
      setSavedCertificates(prev => [newData, ...prev]);
      setData(newData);
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
      <header className="no-print bg-white border-b sticky top-0 z-50 px-4 md:px-6 py-3 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-inner">G</div>
          <div className="overflow-hidden">
            <h1 className="text-sm md:text-lg font-bold text-gray-900 leading-tight truncate">SKL Digital</h1>
            <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider font-semibold truncate">UPT PKM Cipanas</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={handlePrint}
            className="px-3 md:px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-sm shadow-md transition-all flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
            <span className="hidden sm:inline">CETAK / PDF</span>
          </button>
        </div>
      </header>

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
        
        <div className={`lg:col-span-3 no-print space-y-4 ${activeTab === 'list' ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white rounded-xl shadow-md overflow-hidden border">
            <div className="bg-orange-50 p-4 border-b flex justify-between items-center">
              <h2 className="font-bold text-orange-800 text-sm flex items-center gap-2">Riwayat Data</h2>
              <button onClick={handleAddNew} className="bg-orange-600 text-white p-1 rounded-full shadow-sm"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg></button>
            </div>
            <div className="max-h-[70vh] overflow-y-auto">
              {savedCertificates.length === 0 ? (
                <div className="p-8 text-center text-gray-400 text-sm italic">Belum ada data.</div>
              ) : (
                <div className="divide-y">
                  {savedCertificates.map((item) => (
                    <div key={item.id} className={`p-3 hover:bg-gray-50 transition-colors group ${data.id === item.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''}`}>
                      <div className="flex justify-between items-start">
                        <div className="cursor-pointer flex-1" onClick={() => handleEdit(item)}>
                          <h3 className="text-xs font-bold text-gray-800 uppercase line-clamp-1">{item.babyName || item.motherName || 'TANPA NAMA'}</h3>
                          <p className="text-[10px] text-gray-500">{item.date || '-'}</p>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleDelete(item.id!)} className="p-1 text-red-600 hover:bg-red-100 rounded"><svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={`lg:col-span-4 no-print ${activeTab === 'form' ? 'block' : 'hidden lg:block'}`}>
          <div className="lg:sticky lg:top-24 space-y-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <span className="bg-blue-600 w-1.5 h-5 rounded-full"></span>
              Isi Data Kelahiran
            </h2>
            <CertificateForm key={`form-${resetKey}`} data={data} onChange={setData} onReset={handleReset} onSave={handleSave} onPrint={handlePrint} />
          </div>
        </div>

        <div className={`lg:col-span-5 print:w-full ${activeTab === 'preview' ? 'block' : 'hidden lg:block'}`}>
          <h2 className="hidden lg:flex text-lg font-bold text-gray-800 mb-4 items-center gap-2 no-print">
            <span className="bg-green-600 w-1.5 h-5 rounded-full"></span>
            Pratinjau Hasil
          </h2>
          <div className="print:p-0 no-print:bg-gray-300 no-print:p-4 no-print:rounded-2xl no-print:shadow-inner no-print:max-h-[85vh] no-print:overflow-y-auto">
            <CertificatePreview data={data} />
          </div>
        </div>

      </main>

      <footer className="no-print bg-white border-t p-4 text-center text-gray-400 text-[10px]">
        <p>&copy; 2024 UPT Puskesmas Cipanas Garut - v3.0 Render Fixed</p>
      </footer>
    </div>
  );
};

export default App;
