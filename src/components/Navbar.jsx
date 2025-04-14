import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [surat, setSurat] = useState([]);

  const getDataFromAPI = () => {
    fetch("https://equran.id/api/v2/surat")
      .then((res) => res.json())
      .then((data) => {
        setSurat(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    getDataFromAPI();
  }, []);

  return (
    <>
      <div className="bg-dark text-white vh-100 p-3 overflow-auto" style={{ fontFamily: "Poppins, sans-serif" }}>
        <h5 className="text-center fw-semibold mb-4" style={{ color: "#FFD700" }}>Qur'an Web</h5>

        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link to="/" className="nav-link text-white">
              <i className="bi bi-house-door me-2 text-warning"></i> Dashboard
            </Link>
          </li>

          <li className="nav-item mb-2">
            <a className="nav-link text-white" data-bs-toggle="collapse" href="#submenu1"
              role="button" aria-expanded="false" aria-controls="submenu1">
              <i className="bi bi-journal-text me-2 text-warning"></i> Surat
            </a>

            <div className="collapse show" id="submenu1">
              <ul className="nav flex-column ms-3">
                {surat.map((surah) => (
                  <li key={surah.nomor} className="nav-item">
                    <Link to={`/surat/${surah.nomor}`} className="nav-link text-white">
                      <i className="bi bi-chevron-right me-1 text-secondary"></i> {surah.nomor}. {surah.namaLatin}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          <li className="nav-item mt-3">
            <Link to="/about" className="nav-link text-white">
              <i className="bi bi-person-vcard me-2 text-warning"></i> About
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
