
import React, { useEffect, useRef, useState } from 'react';
import { BirthData, Gender, BirthType } from '../types';
import { GarutLogo, FootprintWatermark } from '../constants';

interface PreviewProps {
  data: BirthData;
}

const CertificatePreview: React.FC<PreviewProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const parent = containerRef.current.parentElement;
      if (window.innerWidth < 1024 && parent) {
        const parentWidth = parent.offsetWidth;
        const targetWidth = 794; 
        const padding = 20;
        const newScale = (parentWidth - padding) / targetWidth;
        setScale(Math.min(newScale, 1));
      } else {
        setScale(1);
      }
    };

    window.addEventListener('resize', handleResize);
    const timer = setTimeout(handleResize, 100);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  const renderValue = (val: any, placeholder: string = '................................') => {
    return val ? val.toString().toUpperCase() : placeholder;
  };

  const webPageStyle = {
    transform: scale < 1 ? `scale(${scale})` : 'none',
    transformOrigin: 'top center',
    width: '210mm',
    minHeight: '297mm',
  };

  return (
    <div className="flex flex-col gap-8 print:gap-0 no-print:max-w-4xl no-print:mx-auto" ref={containerRef}>
      
      {/* 1. WEB PREVIEW (Hanya untuk tampilan layar) */}
      <div className="no-print flex flex-col items-center w-full">
        <div style={webPageStyle} className="certificate-bg shadow-xl p-8 md:p-12 relative overflow-hidden flex flex-col text-gray-800 border-gray-300 border bg-white mb-8">
          <FootprintWatermark />
          
          <div className="flex items-center border-b-[3px] border-black pb-4 relative z-10">
            <div className="mr-6 shrink-0">
              <GarutLogo />
            </div>
            <div className="flex-1 text-center pr-10">
              <h1 className="text-xl md:text-2xl font-bold uppercase leading-tight">Pemerintah Kabupaten Garut</h1>
              <h2 className="text-lg md:text-xl font-bold uppercase">Dinas Kesehatan</h2>
              <h3 className="text-2xl md:text-3xl font-extrabold uppercase">UPT Puskesmas Cipanas</h3>
              <p className="text-[10px] md:text-[11px] mt-1 italic font-medium">Jalan Cipanas No. 36 Desa Rancabango Kecamatan Tarogong Kaler Kabupaten Garut</p>
              <p className="text-[10px] md:text-[11px] font-semibold">Telp. 0895-1726-6700 e-mail: pkmcipanas.2016@gmail.com - 44151</p>
            </div>
          </div>

          <div className="mt-6 text-center relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold underline decoration-2 underline-offset-4">SURAT KETERANGAN LAHIR</h2>
            <p className="text-lg md:text-xl mt-1 font-medium">No: {data.certificateNo || '___________________'}</p>
          </div>

          <div className="mt-6 relative z-10 text-base md:text-lg leading-relaxed">
            <p>Yang bertandatangan di bawah ini, menerangkan bahwa:</p>
            <p className="mt-4">
              Pada hari ini <span className="font-bold border-b border-black px-2">{data.day || '...........'}</span> 
              {" "}tanggal <span className="font-bold border-b border-black px-4">{data.date || '................'}</span> 
              {" "}Pukul <span className="font-bold border-b border-black px-2">{data.time || '..:..'}</span> telah lahir seorang bayi :
            </p>
          </div>

          <div className="mt-5 space-y-2 relative z-10 text-base md:text-lg">
            <div className="flex items-baseline"><span className="w-44 font-medium">Jenis Kelamin</span><span className="mr-2">:</span><span className="flex-1 font-bold">{renderValue(data.gender)}</span></div>
            <div className="flex items-baseline"><span className="w-44 font-medium">Jenis Kelahiran</span><span className="mr-2">:</span><span className="flex-1 font-bold">{renderValue(data.birthType)}</span></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-baseline"><span className="w-44 font-medium">Anak Ke-</span><span className="mr-2">:</span><span className="font-bold border-b border-black flex-1">{data.birthOrder || '...'}</span></div>
              <div className="flex items-baseline"><span className="w-44 font-medium">Usia Gestasi</span><span className="mr-2">:</span><span className="font-bold border-b border-black flex-1">{data.gestationAge || '...'}</span></div>
            </div>
          </div>

          <div className="mt-6 text-center relative z-10 italic">
            <p className="mt-2 text-red-600 font-bold not-italic">Diberi nama:</p>
            <div className="border-[2.5px] border-black p-4 bg-white/60 mx-auto mt-2 min-h-[50px] flex items-center justify-center font-bold text-xl md:text-2xl uppercase tracking-widest shadow-inner">
              {data.babyName || '................................'}
            </div>
          </div>

          <div className="mt-6 space-y-2 relative z-10 text-sm md:text-lg">
            <p className="text-red-600 font-bold">Dari orang Tua:</p>
            <div className="flex items-baseline"><span className="w-36 text-red-600 font-medium">Nama Ibu</span><span className="mr-2">:</span><span className="flex-1 border-b border-black uppercase font-bold">{renderValue(data.motherName)}</span></div>
            <div className="flex items-baseline"><span className="w-36 text-red-600 font-medium">Nama Ayah</span><span className="mr-2">:</span><span className="flex-1 border-b border-black uppercase font-bold">{renderValue(data.fatherName)}</span></div>
            <div className="flex items-start"><span className="w-36 text-red-600 font-medium">Alamat</span><span className="mr-2">:</span><span className="flex-1 border-b border-black italic min-h-[2.5rem] leading-snug">{renderValue(data.address)}</span></div>
          </div>

          <div className="mt-auto pt-8 grid grid-cols-2 relative z-10 text-sm md:text-base leading-tight">
            <div className="flex flex-col">
              <p className="text-red-600 font-bold">Kepala UPT Puskesmas Cipanas</p>
              <div className="h-20"></div>
              <p className="font-bold underline">dr. Arie Andaryani</p>
              <p>NIP. 198301252014122001</p>
            </div>
            <div className="flex flex-col pl-8">
              <p className="text-red-600">Garut, {data.signingDate || '....................'}</p>
              <p className="text-red-600 font-bold">Penolong</p>
              <div className="h-20"></div>
              <p className="font-bold underline uppercase">{renderValue(data.assistantName)}</p>
              <p>NIP. {data.assistantNip || '....................'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. PRINT VERSION (Hasil Cetak PDF Presisi A4 - 2 Lembar) */}
      <div className="hidden print:block w-full">
        
        {/* LEMBAR 1: DATA DAN TANDA TANGAN */}
        {/* Menggunakan padding lebih kecil dan font-size standar agar muat sempurna */}
        <div className="print-page certificate-bg">
          <FootprintWatermark />
          
          <div className="flex items-center border-b-[3px] border-black pb-3 relative z-10">
            <div className="mr-6">
              <GarutLogo />
            </div>
            <div className="flex-1 text-center pr-10">
              <h1 className="text-xl font-bold uppercase tracking-tight">Pemerintah Kabupaten Garut</h1>
              <h2 className="text-lg font-bold uppercase tracking-wide">Dinas Kesehatan</h2>
              <h3 className="text-2xl font-extrabold uppercase tracking-widest">UPT Puskesmas Cipanas</h3>
              <p className="text-[10px] mt-0.5 italic font-medium">Jalan Cipanas No. 36 Desa Rancabango Kecamatan Tarogong Kaler Kabupaten Garut</p>
              <p className="text-[10px] font-semibold">Telp. 0895-1726-6700 e-mail: pkmcipanas.2016@gmail.com - 44151</p>
            </div>
          </div>

          <div className="mt-6 text-center relative z-10">
            <h2 className="text-xl font-bold underline decoration-2 underline-offset-4">SURAT KETERANGAN LAHIR</h2>
            <p className="text-lg mt-2 font-medium">No: {data.certificateNo || '___________________'}</p>
          </div>

          <div className="mt-6 relative z-10 text-lg leading-relaxed">
            <p>Yang bertandatangan di bawah ini, menerangkan bahwa:</p>
            <p className="mt-3">
              Pada hari ini <b className="border-b border-black px-3">{data.day || '___________'}</b> tanggal <b className="border-b border-black px-4">{data.date || '________________'}</b> Pukul <b className="border-b border-black px-3">{data.time || '__:__'}</b> telah lahir seorang bayi :
            </p>
          </div>

          <div className="mt-6 space-y-2.5 relative z-10 text-lg">
            <div className="flex items-baseline"><span className="w-48 font-medium">Jenis Kelamin</span><span className="mr-3">:</span><span className="flex-1"><b>{renderValue(data.gender)}</b></span></div>
            <div className="flex items-baseline"><span className="w-48 font-medium">Jenis Kelahiran</span><span className="mr-3">:</span><span className="flex-1"><b>{renderValue(data.birthType)}</b></span></div>
            
            <div className="grid grid-cols-2">
              <div className="flex items-baseline"><span className="w-48 font-medium">Anak Ke-</span><span className="mr-3">:</span><span className="border-b border-black min-w-[80px]"><b>{data.birthOrder || '...'}</b></span></div>
              <div className="flex items-baseline"><span className="w-48 font-medium">Usia Gestasi</span><span className="mr-3">:</span><span className="border-b border-black min-w-[80px]"><b>{data.gestationAge || '...'}</b></span></div>
            </div>
            
            <div className="grid grid-cols-2">
              <div className="flex items-baseline"><span className="w-48 font-medium">Berat Lahir</span><span className="mr-3">:</span><span className="border-b border-black min-w-[80px]"><b>{data.weight || '...'}</b></span> gram</div>
              <div className="flex items-baseline"><span className="w-48 font-medium">Panjang Badan</span><span className="mr-3">:</span><span className="border-b border-black min-w-[80px]"><b>{data.length || '...'}</b></span> cm</div>
            </div>
          </div>

          <div className="mt-6 text-center relative z-10 text-lg italic">
            <p className="font-bold not-italic">Diberi nama:</p>
            <div className="border-[2px] border-black p-4 bg-white/5 mx-auto mt-1.5 min-h-[60px] flex items-center justify-center font-bold text-2xl uppercase tracking-widest">
              {data.babyName || '................................'}
            </div>
          </div>

          <div className="mt-6 space-y-2.5 relative z-10 text-lg">
            <p className="font-bold">Dari orang Tua:</p>
            <div className="flex items-baseline"><span className="w-48">Nama Ibu</span><span className="mr-3">:</span><span className="flex-1 border-b border-black h-7 uppercase font-bold">{renderValue(data.motherName)}</span></div>
            <div className="flex items-baseline"><span className="w-48">Nama Ayah</span><span className="mr-3">:</span><span className="flex-1 border-b border-black h-7 uppercase font-bold">{renderValue(data.fatherName)}</span></div>
            <div className="flex items-start"><span className="w-48">Alamat</span><span className="mr-3">:</span><span className="flex-1 border-b border-black min-h-[3.5rem] italic leading-snug">{renderValue(data.address)}</span></div>
          </div>

          {/* Bagian Tanda Tangan: Diposisikan secara tetap agar tidak terpotong */}
          <div className="mt-auto grid grid-cols-2 pt-10 relative z-10 text-lg leading-snug">
            <div className="flex flex-col">
              <p>Mengetahui,</p>
              <p className="font-bold uppercase">Kepala UPT Puskesmas Cipanas</p>
              <div className="h-24"></div>
              <p className="font-bold underline decoration-1 underline-offset-4">dr. Arie Andaryani</p>
              <p className="text-base">NIP. 198301252014122001</p>
            </div>
            <div className="flex flex-col pl-12">
              <p>Garut, {data.signingDate || '................................'}</p>
              <p className="font-bold uppercase">Penolong</p>
              <div className="h-24"></div>
              <p className="font-bold underline decoration-1 underline-offset-4 uppercase">{renderValue(data.assistantName)}</p>
              <p className="text-base">NIP. {data.assistantNip || '........................................'}</p>
            </div>
          </div>
        </div>
        
        {/* LEMBAR 2: AREA STEMPEL */}
        <div className="print-page certificate-bg">
          <div className="flex flex-col items-center gap-10 mt-10 w-full px-10 flex-1">
            <div className="w-full">
              <h3 className="text-xl font-bold border-[2px] border-black bg-white/50 p-3 text-center mb-0 uppercase tracking-widest">STEMPEL KAKI BAYI</h3>
              <div className="grid grid-cols-2 border-x-[2px] border-b-[2px] border-black min-h-[420px]">
                <div className="border-r-[2px] border-black p-8 flex flex-col items-center">
                  <p className="text-center font-bold underline text-lg mb-8">TELAPAK KAKI KIRI BAYI</p>
                  <div className="flex-1 w-full border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center bg-white/30">
                    <span className="text-gray-300 font-bold uppercase tracking-widest text-xs">Area Cap Kaki</span>
                  </div>
                </div>
                <div className="p-8 flex flex-col items-center">
                  <p className="text-center font-bold underline text-lg mb-8">TELAPAK KAKI KANAN BAYI</p>
                  <div className="flex-1 w-full border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center bg-white/30">
                    <span className="text-gray-300 font-bold uppercase tracking-widest text-xs">Area Cap Kaki</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full">
              <h3 className="text-xl font-bold border-[2px] border-black bg-white/50 p-3 text-center mb-0 uppercase tracking-widest">STEMPEL TANGAN IBU</h3>
              <div className="grid grid-cols-2 border-x-[2px] border-b-[2px] border-black min-h-[320px]">
                <div className="border-r-[2px] border-black p-8 flex flex-col items-center">
                  <p className="text-center font-bold underline text-lg mb-6">JEMPOL KIRI IBU</p>
                  <div className="w-32 h-40 border-2 border-dashed border-gray-300 rounded-[50px] flex items-center justify-center bg-white/30">
                    <span className="text-gray-300 text-[10px] font-bold text-center p-2 uppercase">Jempol Kiri</span>
                  </div>
                </div>
                <div className="p-8 flex flex-col items-center">
                  <p className="text-center font-bold underline text-lg mb-6">JEMPOL KANAN IBU</p>
                  <div className="w-32 h-40 border-2 border-dashed border-gray-300 rounded-[50px] flex items-center justify-center bg-white/30">
                    <span className="text-gray-300 text-[10px] font-bold text-center p-2 uppercase">Jempol Kanan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-auto opacity-10 flex justify-center pb-14">
             <div className="scale-110">
               <GarutLogo />
             </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CertificatePreview;
