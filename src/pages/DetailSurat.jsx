import React, { useEffect, useState } from "react";  
import { useParams, Link } from "react-router-dom";  
import parse from "html-react-parser";  
import AudioPlayer from "../components/AudioPlayer";  

const DetailSurat = () => {  
  const { id } = useParams();  
  const [surat, setSurat] = useState(null);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  
  const [currentAudio, setCurrentAudio] = useState(null);  

  const getDetailSurat = async (idSurat) => {  
    try {  
      const res = await fetch(`https://equran.id/api/v2/surat/${idSurat}`);  
      if (!res.ok) throw new Error("Network response was not ok");  
      const data = await res.json();  
      setSurat(data.data);  
    } catch (error) {  
      console.error("Error fetching data:", error);  
      setError(error.message);  
    } finally {  
      setLoading(false);  
    }  
  };  

  useEffect(() => {  
    getDetailSurat(id);  
  }, [id]);  

  if (loading) return <p className="text-center">Loading...</p>;  
  if (error) return <p className="text-danger">{error}</p>;  
  if (!surat) return <p className="text-warning">Surat tidak ditemukan.</p>;  

  return (  
    <>  
      <div className="vh-100 overflow-auto p-3">  
        <h2>  
          {surat.namaLatin} ({surat.nama})  
        </h2>  
        <p>Jumlah Ayat: {surat.jumlahAyat}</p>  
        <p>Arti: {surat.arti}</p>  
        <p>Deskripsi: {parse(surat.deskripsi)}</p>  

        <Link to={`/tafsir/${surat.nomor}`} className="btn btn-info mt-3">  
          Lihat Tafsir Surat  
        </Link>  

        <ul className="list-group">  
          {surat.ayat.map((ayat) => (  
            <li key={ayat.nomorAyat} className="list-group-item mb-3">  
              <div className="d-flex justify-content-between flex-column">  
                <div className="arabic-text mb-2" style={{ fontSize: "1.7rem", textAlign: "right" }}>  
                  {ayat.teksArab}  
                </div>  

                <div className="mb-2">  
                  <em>{ayat.teksIndonesia}</em>  
                </div>  

                <div className="d-flex align-items-center justify-content-between w-100 mt-2">  
                  <span className="badge text-bg-primary rounded-sm p-2 me-2">  
                    {ayat.nomorAyat}  
                  </span>  
                  <AudioPlayer  
                    url={ayat.audio["05"]}  
                    currentAudio={currentAudio}  
                    setCurrentAudio={setCurrentAudio}  
                  />  
                </div>  
              </div>  
            </li>  
          ))}  
        </ul>  
      </div>  
    </>  
  );  
};  

export default DetailSurat;  