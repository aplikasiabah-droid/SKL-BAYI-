
import React, { useState } from 'react';
import { BirthData, Gender, BirthType } from '../types';
import { parseBirthText } from '../services/geminiService';
import { ASSISTANTS } from '../constants';

interface FormProps {
  data: BirthData;
  onChange: (data: BirthData) => void;
  onReset: () => void;
  onSave: () => void;
  onPrint?: () => void;
}

const CertificateForm: React.FC<FormProps> = ({ data, onChange, onReset, onSave, onPrint }) => {
  const [aiText, setAiText] = useState('');
  const [isParsing, setIsParsing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const handleAssistantSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(e.target.value);
    if (!isNaN(index)) {
      const selected = ASSISTANTS[index];
      onChange({
        ...data,
        assistantName: selected.name,
        assistantNip: selected.nip
      });
    }
  };

  const handleAiFill = async () => {
    if (!aiText.trim()) return;
    setIsParsing(true);
    const parsedData = await parseBirthText(aiText);
    if (parsedData) {
      // Ensure we preserve the ID if we are editing
      onChange({ ...data, ...parsedData });
    }
    setIsParsing(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-5 space-y-5 no-print">
      {/* Primary Actions */}
      <div className="flex gap-2 border-b pb-4">
        <button 
          onClick={onSave}
          className="flex-[2] flex items-center justify-center gap-2 px-3 py-2.5 bg-blue-600 text-white rounded-lg text-[11px] font-bold uppercase hover:bg-blue-700 transition-all shadow-md active:scale-95"
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V4a1 1 0 10-2 0v7.586l-1.293-1.293z" />
            <path d="M5 17a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" />
          </svg>
          SIMPAN
        </button>

        <button 
          onClick={onPrint}
          className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2.5 bg-red-600 text-white rounded-lg text-[11px] font-bold uppercase hover:bg-red-700 transition-all shadow-md active:scale-95"
          type="button"
          title="Download PDF"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
          PDF
        </button>
        
        <button 
          onClick={onReset}
          className="px-3 py-2.5 bg-gray-100 text-gray-500 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all active:scale-95"
          type="button"
          title="Reset Formulir"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* AI Assistance */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-[11px] font-bold text-blue-800 uppercase">✨ Smart Fill AI</label>
          {aiText && (
            <button onClick={() => setAiText('')} className="text-[9px] font-bold text-blue-600 underline">Hapus</button>
          )}
        </div>
        <textarea
          className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-xs bg-white"
          rows={2}
          placeholder="Tempel keterangan kelahiran di sini..."
          value={aiText}
          onChange={(e) => setAiText(e.target.value)}
        />
        <button
          onClick={handleAiFill}
          disabled={isParsing || !aiText.trim()}
          className="mt-2 w-full bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1.5 rounded-md text-[10px] font-bold uppercase transition-colors disabled:opacity-50"
        >
          {isParsing ? '🔄 Sedang Mengolah...' : 'Terjemahkan Teks'}
        </button>
      </div>

      {/* Main Form Fields */}
      <div className="space-y-6">
        <section className="space-y-3">
          <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
             Info Kelahiran
             <div className="flex-1 h-[1px] bg-gray-100"></div>
          </h3>
          
          <div className="grid grid-cols-1 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase">Nomor Surat</label>
              <input name="certificateNo" value={data.certificateNo || ''} onChange={handleInputChange} className="w-full border-b p-1 focus:border-blue-500 outline-none bg-gray-50/50 text-sm" placeholder="445/..." />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase">Hari</label>
                <input name="day" value={data.day || ''} onChange={handleInputChange} className="w-full border-b p-1 focus:border-blue-500 outline-none text-sm" placeholder="Senin" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase">Tanggal</label>
                <input name="date" value={data.date || ''} onChange={handleInputChange} className="w-full border-b p-1 focus:border-blue-500 outline-none text-sm" placeholder="1 Jan 2024" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase">Pukul</label>
                <input name="time" value={data.time || ''} onChange={handleInputChange} className="w-full border-b p-1 focus:border-blue-500 outline-none text-sm" placeholder="08:30" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase">Jenis Kelamin</label>
                <select name="gender" value={data.gender} onChange={handleInputChange} className="w-full border-b p-1 focus:border-blue-500 outline-none bg-transparent text-sm">
                  <option value={Gender.EMPTY}>-- Pilih --</option>
                  <option value={Gender.MALE}>Laki-laki</option>
                  <option value={Gender.FEMALE}>Perempuan</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
               <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase">Tipe Kelahiran</label>
                <select name="birthType" value={data.birthType} onChange={handleInputChange} className="w-full border-b p-1 focus:border-blue-500 outline-none bg-transparent text-sm">
                  <option value={BirthType.EMPTY}>-- Pilih --</option>
                  {Object.values(BirthType).filter(v => v !== '').map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase">Anak Ke-</label>
                <input name="birthOrder" value={data.birthOrder || ''} onChange={handleInputChange} className="w-full border-b p-1 focus:border-blue-500 outline-none text-sm" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase">Berat (g)</label>
                <input name="weight" value={data.weight || ''} onChange={handleInputChange} className="w-full border-b p-1 focus:border-blue-500 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase">Tinggi (cm)</label>
                <input name="length" value={data.length || ''} onChange={handleInputChange} className="w-full border-b p-1 focus:border-blue-500 outline-none text-sm" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-blue-600 uppercase">Nama Lengkap Bayi</label>
              <input name="babyName" value={data.babyName || ''} onChange={handleInputChange} className="w-full border-b p-1 focus:border-blue-500 outline-none text-base font-bold text-blue-900 uppercase" placeholder="NAMA BAYI" />
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
             Data Orang Tua
             <div className="flex-1 h-[1px] bg-gray-100"></div>
          </h3>
          
          <div className="grid grid-cols-1 gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="block text-[10px] font-bold text-gray-500 uppercase">Nama Ibu</label>
                <input name="motherName" value={data.motherName || ''} onChange={handleInputChange} className="w-full border-b p-1 focus:border-blue-500 outline-none font-semibold uppercase text-sm" placeholder="Ibu" />
              </div>
              <div className="col-span-2">
                <label className="block text-[10px] font-bold text-gray-500 uppercase">Nama Ayah</label>
                <input name="fatherName" value={data.fatherName || ''} onChange={handleInputChange} className="w-full border-b p-1 focus:border-blue-500 outline-none font-semibold uppercase text-sm" placeholder="Ayah" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase">Alamat</label>
              <textarea name="address" value={data.address || ''} onChange={handleInputChange} className="w-full border-b p-1 focus:border-blue-500 outline-none text-xs italic" rows={2} placeholder="Alamat KTP..." />
            </div>
          </div>
        </section>

        <section className="space-y-3 pt-4 border-t">
          <div className="flex justify-between items-center">
            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Penolong</h3>
            <select 
              onChange={handleAssistantSelect} 
              className="text-[9px] font-bold p-1 border rounded bg-blue-50 text-blue-700 border-blue-100 outline-none"
              defaultValue=""
            >
              <option value="" disabled>PILIH CEPAT</option>
              {ASSISTANTS.map((a, idx) => (
                <option key={idx} value={idx}>{a.name.split(',')[0]}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase">Tgl Cetak</label>
              <input name="signingDate" value={data.signingDate || ''} onChange={handleInputChange} className="w-full border-b p-1 focus:border-blue-500 outline-none text-sm" placeholder="Garut, ..." />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase">Nama Bidan</label>
              <input name="assistantName" value={data.assistantName || ''} onChange={handleInputChange} className="w-full border-b p-1 focus:border-blue-500 outline-none font-bold text-sm uppercase" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CertificateForm;
