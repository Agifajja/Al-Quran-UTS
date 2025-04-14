import React, { useEffect, useState } from 'react';  
import { useParams } from 'react-router-dom';  

const TafsirSurat = () => {  
  const { nomor } = useParams();  
  const [tafsir, setTafsir] = useState(null);  
  const [loading, setLoading] = useState(true);  

  useEffect(() => {  
    const fetchTafsir = async () => {  
      try {  
        const response = await fetch(`https://equran.id/api/v2/tafsir/${nomor}`);  
        const data = await response.json();  
        setTafsir(data);  
      } catch (error) {  
        console.error("Error fetching tafsir:", error);  
      } finally {  
        setLoading(false);  
      }  
    };  

    fetchTafsir();  
  }, [nomor]);  

  if (loading) return <p>Loading...</p>;  
  if (!tafsir) return <p>Tafsir tidak ditemukan.</p>;  

  return (  
    <div>  
      <h1>{tafsir.surah}</h1>  
      <p>{tafsir.translation}</p>  
      {tafsir.details.map((detail, index) => (  
        <div key={index}>  
          <h3>{detail.author}</h3>  
          <p>{detail.interpretation}</p>  
        </div>  
      ))}  
    </div>  
  );  
};  

export default TafsirSurat;  