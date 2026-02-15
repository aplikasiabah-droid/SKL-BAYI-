
import React from 'react';

export const GarutLogo = () => (
  <img 
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Lambang_Kabupaten_Garut.svg/960px-Lambang_Kabupaten_Garut.svg.png" 
    alt="Logo Kabupaten Garut" 
    className="w-[85px] md:w-[100px] h-auto block object-contain"
    style={{ filter: 'drop-shadow(0px 1px 1px rgba(0,0,0,0.1))' }}
  />
);

export const FootprintWatermark = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none overflow-hidden">
    <svg width="600" height="600" viewBox="0 0 200 200" fill="currentColor" className="text-pink-500 transform -rotate-12 translate-x-10">
      <path d="M40,100 Q45,130 60,140 Q75,150 70,120 Q65,90 50,85 Q35,80 40,100 Z" />
      <circle cx="55" cy="70" r="8" />
      <circle cx="70" cy="65" r="7" />
      <circle cx="85" cy="68" r="6" />
      <circle cx="95" cy="75" r="5" />
    </svg>
    <svg width="600" height="600" viewBox="0 0 200 200" fill="currentColor" className="text-blue-500 transform rotate-12 -translate-x-10">
      <path d="M160,100 Q155,130 140,140 Q125,150 130,120 Q135,90 150,85 Q165,80 160,100 Z" />
      <circle cx="145" cy="70" r="8" />
      <circle cx="130" cy="65" r="7" />
      <circle cx="115" cy="68" r="6" />
      <circle cx="105" cy="75" r="5" />
    </svg>
  </div>
);

export const ASSISTANTS = [
  { name: "TITIEK FATHICHA, A.Md.Keb", nip: "197202121992032008" },
  { name: "ENENG CAHYAWATI, S.Tr.Keb.,Bdn.", nip: "197705292007012011" },
  { name: "ENUNG NURHAYATI, A.Md.Keb", nip: "197412282019052002" },
  { name: "NILANDA ASDIANTI, A.Md.Keb", nip: "198602132017042004" },
  { name: "YATI NURHAYATI, A.Md.Keb", nip: "197805192006042007" },
  { name: "LENI MAULANI, A.Md.Keb", nip: "198101162008012005" },
  { name: "INTAN ISMAYATI, A.Md.Keb", nip: "199002132023212001" },
  { name: "RANTI YULIANI, A.Md.Keb", nip: "199007272023212001" },
  { name: "INTHAN SEFTIANY R, A.Md.Keb", nip: "198909042023212007" },
  { name: "DINI NOVIANTI NINGRUM, A.Md.Keb", nip: "198811082023212001" },
  { name: "TINA RATNASARI, A.Md.Keb", nip: "199101232025212046" },
  { name: "ROHMAH ROFIANI, S.Keb.,Bdn.", nip: "198904092025212070" },
];
