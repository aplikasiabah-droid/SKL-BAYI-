
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

  const pageStyle = {
    transform: scale < 1 ? `scale(${scale})` : 'none',
    transformOrigin: 'top center',
    width: '210mm',
    minHeight: '297mm',
  };

  const wrapperStyle = {
    height: scale < 1 ? `${297 * scale}mm` : 'auto',
    width: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    overflow: 'hidden',
  };

  const renderValue = (val: any, placeholder: string = '................................') => {
    return val ? val.toString().toUpperCase() : placeholder;
  };

  return (
    <div className="flex flex-col gap-8 print:gap-0 no-print:max-w-4xl no-print:mx-auto" ref={containerRef}>
      
      {/* 1. WEB VIEW PREVIEW (Hanya untuk layar) */}
      <div style={wrapperStyle} className="no-print">
        <div style={pageStyle} className="print-page certificate-bg shadow-xl p-8 md:p-12 relative overflow-hidden flex flex-col text-gray-800 border-gray-300 border bg-white mb-8">
          <FootprintWatermark />
          
          <div className="flex items-center border-b-[3px] border-black pb-5 relative z-10">
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

          <div className="mt-8 text-center relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold underline decoration-2 underline-offset-4">SURAT KETERANGAN LAHIR</h2>
            <p className="text-lg md:text-xl mt-1 font-medium">No: {data.certificateNo || '___________________'}</p>
          </div>

          <div className="mt-8 relative z-10 text-base md:text-lg leading-relaxed">
            <p>Yang bertandatangan di bawah ini, menerangkan bahwa:</p>
            <p className="mt-4">
              Pada hari ini <span className="font-bold border-b border-black px-2">{data.day || '...........'}</span> 
              {" "}tanggal <span className="font-bold border-b border-black px-4">{data.date || '................'}</span> 
              {" "}Pukul <span className="font-bold border-b border-black px-2">{data.time || '..:..'}</span> telah lahir seorang bayi :
            </p>
          </div>

          <div className="mt-6 space-y-3 relative z-10 text-base md:text-lg">
            <div className="flex items-baseline">
              <span className="w-44 font-medium">Jenis Kelamin</span><span className="mr-2">:</span>
              <span className="flex-1">
                <span className={data.gender === Gender.MALE ? 'font-bold underline underline-offset-4' : 'opacity-40'}>Laki–laki</span> / 
                <span className={data.gender === Gender.FEMALE ? 'font-bold underline underline-offset-4 ml-1' : 'ml-1 opacity-40'}>Perempuan</span>
              </span>
            </div>
            <div className="flex items-baseline">
              <span className="w-44 font-medium">Jenis Kelahiran</span><span className="mr-2">:</span>
              <span className="flex-1">
                {Object.values(BirthType).filter(v => v !== '').map((type, idx) => (
                  <span key={type} className={data.birthType === type ? 'font-bold underline underline-offset-4 mr-2' : 'opacity-40 mr-2'}>
                    {type}{idx < Object.values(BirthType).filter(v => v !== '').length - 1 ? '/' : ''}
                  </span>
                ))}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-baseline"><span className="w-44 font-medium">Anak Ke-</span><span className="mr-2">:</span><span className="font-bold border-b border-black flex-1">{data.birthOrder || '...'}</span></div>
              <div className="flex items-baseline"><span className="w-44 font-medium">Usia Gestasi</span><span className="mr-2">:</span><span className="font-bold border-b border-black flex-1">{data.gestationAge || '...'}</span></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-baseline"><span className="w-44 font-medium">Berat Lahir</span><span className="mr-2">:</span><span className="font-bold border-b border-black flex-1">{data.weight || '...'}</span> gram</div>
              <div className="flex items-baseline"><span className="w-44 font-medium">Lingkar Kepala</span><span className="mr-2">:</span><span className="font-bold border-b border-black flex-1">{data.headCircumference || '...'}</span> cm</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-baseline"><span className="w-44 font-medium">Panjang Badan</span><span className="mr-2">:</span><span className="font-bold border-b border-black flex-1">{data.length || '...'}</span> cm</div>
              <div className="flex items-baseline"><span className="w-44 font-medium">Lingkar dada</span><span className="mr-2">:</span><span className="font-bold border-b border-black flex-1">{data.chestCircumference || '...'}</span> cm</div>
            </div>
          </div>

          <div className="mt-8 text-center relative z-10 italic">
            <p>di <span className="font-bold not-italic">UPT PUSKESMAS CIPANAS</span></p>
            <p>Alamat: <span className="font-bold not-italic text-red-600 underline">Jalan Cipanas No. 36 Desa Rancabango</span></p>
            <p className="font-bold not-italic text-red-600 underline">Kec. Tarogong Kaler Kab. Garut</p>
            <p className="mt-4 text-red-600">Diberi nama:</p>
          </div>

          <div className="mt-2 text-center relative z-10">
            <div className="border-[2.5px] border-black p-4 bg-white/60 mx-auto min-h-[50px] flex items-center justify-center font-bold text-xl md:text-2xl uppercase tracking-widest shadow-inner">
              {data.babyName || '................................'}
            </div>
          </div>

          <div className="mt-8 space-y-2 relative z-10 text-sm md:text-lg">
            <p className="text-red-600 font-bold mb-2">Dari orang Tua</p>
            <div className="flex items-baseline"><span className="w-36 text-red-600 font-medium">Nama Ibu</span><span className="mr-2">:</span><span className="flex-1 border-b border-black uppercase font-bold">{renderValue(data.motherName)}</span></div>
            <div className="flex items-baseline"><span className="w-36 text-red-600 font-medium">No. KTP</span><span className="mr-2">:</span><span className="flex-1 border-b border-black">{renderValue(data.motherKtp)}</span></div>
            <div className="flex items-baseline mt-2"><span className="w-36 text-red-600 font-medium">Nama Ayah</span><span className="mr-2">:</span><span className="flex-1 border-b border-black uppercase font-bold">{renderValue(data.fatherName)}</span></div>
            <div className="flex items-baseline"><span className="w-36 text-red-600 font-medium">No. KTP</span><span className="mr-2">:</span><span className="flex-1 border-b border-black">{renderValue(data.fatherKtp)}</span></div>
            <div className="flex items-start"><span className="w-36 text-red-600 font-medium">Alamat</span><span className="mr-2">:</span><span className="flex-1 border-b border-black italic min-h-[3rem] leading-snug">{renderValue(data.address)}</span></div>
          </div>

          <div className="mt-auto pt-10 grid grid-cols-2 relative z-10 text-sm md:text-base leading-tight">
            <div className="flex flex-col">
              <p className="text-red-600">Mengetahui,</p>
              <p className="text-red-600 font-bold">Kepala UPT Puskesmas Cipanas</p>
              <div className="sig-space"></div>
              <p className="font-bold underline decoration-1 underline-offset-4">dr. Arie Andaryani</p>
              <p>NIP. 198301252014122001</p>
            </div>
            <div className="flex flex-col pl-8">
              <p className="text-red-600">Garut, {data.signingDate || '....................'}</p>
              <p className="text-red-600 font-bold">Penolong</p>
              <div className="sig-space"></div>
              <p className="font-bold underline decoration-1 underline-offset-4 uppercase">
                {renderValue(data.assistantName)}
              </p>
              <p>NIP. {data.assistantNip || '....................'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. PRINT VERSION (Dikhususkan untuk Hasil Cetak & PDF) */}
      <div className="hidden print:block w-full">
        
        {/* HALAMAN 1: Konten Surat */}
        <div className="print-page certificate-bg">
          <FootprintWatermark />
          
          <div className="flex items-center border-b-[4px] border-black pb-5 relative z-10">
            <div className="mr-8">
              <GarutLogo />
            </div>
            <div className="flex-1 text-center pr-12">
              <h1 className="text-2xl font-bold uppercase tracking-tight">Pemerintah Kabupaten Garut</h1>
              <h2 className="text-xl font-bold uppercase tracking-wide">Dinas Kesehatan</h2>
              <h3 className="text-3xl font-extrabold uppercase tracking-widest">UPT Puskesmas Cipanas</h3>
              <p className="text-xs mt-1 italic font-medium">Jalan Cipanas No. 36 Desa Rancabango Kecamatan Tarogong Kaler Kabupaten Garut</p>
              <p className="text-xs font-semibold">Telp. 0895-1726-6700 e-mail: pkmcipanas.2016@gmail.com - 44151</p>
            </div>
          </div>

          <div className="mt-12 text-center relative z-10">
            <h2 className="text-3xl font-bold underline decoration-2 underline-offset-8">SURAT KETERANGAN LAHIR</h2>
            <p className="text-xl mt-4 font-medium">No: {data.certificateNo || '___________________'}</p>
          </div>

          <div className="mt-12 relative z-10 text-xl leading-relaxed">
            <p>Yang bertandatangan di bawah ini, menerangkan bahwa:</p>
            <p className="mt-6">
              Pada hari ini <b className="border-b border-black px-4">{data.day || '___________'}</b> tanggal <b className="border-b border-black px-6">{data.date || '________________'}</b> Pukul <b className="border-b border-black px-4">{data.time || '__:__'}</b> telah lahir seorang bayi :
            </p>
          </div>

          <div className="mt-10 space-y-4 relative z-10 text-xl">
            <div className="flex items-baseline"><span className="w-56 font-medium">Jenis Kelamin</span><span className="mr-4">:</span><span className="flex-1"><b>{data.gender || '................'}</b></span></div>
            <div className="flex items-baseline"><span className="w-56 font-medium">Jenis Kelahiran</span><span className="mr-4">:</span><span className="flex-1"><b>{data.birthType || '................'}</b></span></div>
            <div className="grid grid-cols-2">
              <div className="flex items-baseline"><span className="w-56 font-medium">Anak Ke-</span><span className="mr-4">:</span><span className="border-b border-black min-w-[100px]"><b>{data.birthOrder || '...'}</b></span></div>
              <div className="flex items-baseline"><span className="w-56 font-medium">Usia Gestasi</span><span className="mr-4">:</span><span className="border-b border-black min-w-[100px]"><b>{data.gestationAge || '...'}</b></span></div>
            </div>
            <div className="grid grid-cols-2">
              <div className="flex items-baseline"><span className="w-56 font-medium">Berat Lahir</span><span className="mr-4">:</span><span className="border-b border-black min-w-[100px]"><b>{data.weight || '...'}</b></span> gram</div>
              <div className="flex items-baseline"><span className="w-56 font-medium">Lingkar Kepala</span><span className="mr-4">:</span><span className="border-b border-black min-w-[100px]"><b>{data.headCircumference || '...'}</b></span> cm</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="flex items-baseline"><span className="w-56 font-medium">Panjang Badan</span><span className="mr-4">:</span><span className="border-b border-black min-w-[100px]"><b>{data.length || '...'}</b></span> cm</div>
              <div className="flex items-baseline"><span className="w-56 font-medium">Lingkar dada</span><span className="mr-4">:</span><span className="border-b border-black min-w-[100px]"><b>{data.chestCircumference || '...'}</b></span> cm</div>
            </div>
          </div>

          <div className="mt-12 text-center relative z-10 italic text-xl">
            <p>di <span className="font-bold not-italic">UPT PUSKESMAS CIPANAS</span></p>
            <p>Alamat: <span className="font-bold not-italic underline">Jalan Cipanas No. 36 Desa Rancabango</span></p>
            <p className="font-bold not-italic underline">Kec. Tarogong Kaler Kab. Garut</p>
            <p className="mt-6">Diberi nama:</p>
          </div>

          <div className="mt-4 text-center relative z-10">
            <div className="border-[3px] border-black p-8 bg-white/10 mx-auto min-h-[100px] flex items-center justify-center font-bold text-4xl uppercase tracking-widest">
              {data.babyName || '................................'}
            </div>
          </div>

          <div className="mt-10 space-y-4 relative z-10 text-xl">
            <p className="mb-4 font-bold">Dari orang Tua:</p>
            <div className="flex items-baseline"><span className="w-56">Nama Ibu</span><span className="mr-4">:</span><span className="flex-1 border-b border-black h-8 uppercase font-bold">{renderValue(data.motherName)}</span></div>
            <div className="flex items-baseline"><span className="w-56">No. KTP</span><span className="mr-4">:</span><span className="flex-1 border-b border-black h-8">{renderValue(data.motherKtp)}</span></div>
            <div className="flex items-baseline mt-4"><span className="w-56">Nama Ayah</span><span className="mr-4">:</span><span className="flex-1 border-b border-black h-8 uppercase font-bold">{renderValue(data.fatherName)}</span></div>
            <div className="flex items-baseline"><span className="w-56">No. KTP</span><span className="mr-4">:</span><span className="flex-1 border-b border-black h-8">{renderValue(data.fatherKtp)}</span></div>
            <div className="flex items-start"><span className="w-56">Alamat</span><span className="mr-4">:</span><span className="flex-1 border-b border-black min-h-[5rem] italic leading-relaxed">{renderValue(data.address)}</span></div>
          </div>

          <div className="mt-auto grid grid-cols-2 pt-20 relative z-10 text-xl leading-snug">
            <div className="flex flex-col pl-4">
              <p>Mengetahui,</p>
              <p className="font-bold uppercase">Kepala UPT Puskesmas Cipanas</p>
              <div className="h-32"></div>
              <p className="font-bold underline decoration-1 underline-offset-8">dr. Arie Andaryani</p>
              <p>NIP. 198301252014122001</p>
            </div>
            <div className="flex flex-col pl-16">
              <p>Garut, {data.signingDate || '................................'}</p>
              <p className="font-bold uppercase">Penolong</p>
              <div className="h-32"></div>
              <p className="font-bold underline decoration-1 underline-offset-8 uppercase">
                {renderValue(data.assistantName)}
              </p>
              <p>NIP. {data.assistantNip || '........................................'}</p>
            </div>
          </div>
        </div>
        
        {/* HALAMAN 2: Stempel Kaki & Tangan */}
        <div className="print-page certificate-bg">
          <div className="flex flex-col items-center gap-16 mt-16 w-full px-10">
            <div className="w-full">
              <h3 className="text-2xl font-bold border-[3px] border-black bg-gray-100 p-4 text-center mb-0 uppercase tracking-widest">STEMPEL KAKI BAYI</h3>
              <div className="grid grid-cols-2 border-x-[3px] border-b-[3px] border-black min-h-[480px]">
                <div className="border-r-[3px] border-black p-8 flex flex-col items-center justify-between">
                  <p className="text-center font-bold underline text-lg">TELAPAK KAKI KIRI BAYI</p>
                  <div className="flex-1 w-full flex items-center justify-center opacity-10">
                     <svg width="150" height="150" viewBox="0 0 100 100" fill="currentColor"><path d="M30,80 Q35,95 50,90 Q65,85 60,65 Q55,45 40,40 Q25,35 30,80 Z" /></svg>
                  </div>
                </div>
                <div className="p-8 flex flex-col items-center justify-between">
                  <p className="text-center font-bold underline text-lg">TELAPAK KAKI KANAN BAYI</p>
                  <div className="flex-1 w-full flex items-center justify-center opacity-10">
                     <svg width="150" height="150" viewBox="0 0 100 100" fill="currentColor" transform="scale(-1, 1)"><path d="M30,80 Q35,95 50,90 Q65,85 60,65 Q55,45 40,40 Q25,35 30,80 Z" /></svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full mt-12">
              <h3 className="text-2xl font-bold border-[3px] border-black bg-gray-100 p-4 text-center mb-0 uppercase tracking-widest">STEMPEL TANGAN IBU</h3>
              <div className="grid grid-cols-2 border-x-[3px] border-b-[3px] border-black min-h-[400px]">
                <div className="border-r-[3px] border-black p-8 flex flex-col items-center justify-between">
                  <p className="text-center font-bold underline text-lg">JEMPOL KIRI IBU</p>
                  <div className="flex-1 w-full flex items-center justify-center opacity-5">
                     <div className="w-32 h-40 border-2 border-dashed border-gray-400 rounded-full"></div>
                  </div>
                </div>
                <div className="p-8 flex flex-col items-center justify-between">
                  <p className="text-center font-bold underline text-lg">JEMPOL KANAN IBU</p>
                  <div className="flex-1 w-full flex items-center justify-center opacity-5">
                     <div className="w-32 h-40 border-2 border-dashed border-gray-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-auto opacity-10 flex justify-center pb-20">
             <div className="scale-150">
               <GarutLogo />
             </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CertificatePreview;
