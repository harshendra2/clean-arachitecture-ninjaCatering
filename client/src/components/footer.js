import React from "react";
import "../styles/footer.css";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  const customepackage = () => {
    navigate("/customise/:id");
  };

  return (
    <div className="footerbody">
      <div className="footer-row">
        <img
          className="footerimage"
          src="https://new.caterninja.com/ninjaboxPackage.png"
        />
        <div className="NinjaBox">
          <h2 className="ninjaheadding">Not Happy with the Packages?</h2>
          <h2 className="ninjaheadding2">
            Create Your <span className="ninjaheader2">Own</span>
          </h2>
          <h3>Curate your own flavour of party from variety of cuisines</h3>
          <button className="ninjaboxbtnn" onClick={customepackage}>
            Create Your Own Packages
          </button>
        </div>
      </div>
    </div>
  );
}

export default Footer;
