import React from "react";
import TopGlobalComponent from "../../components/TopGlobal/TopGlobal";
import Navbar from "../../components/NavBar/NavBar"; // Importar el Navbar

const TopGlobalPage = () => {
  return (
    <div>
      <Navbar />
      <div>
        <TopGlobalComponent />
      </div>
    </div>
  );
};

export default TopGlobalPage;
