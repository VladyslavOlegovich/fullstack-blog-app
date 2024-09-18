import Logo from "../assets/logo-white.svg";

const Footer = () => {
  return (
    <footer>
      <img className="logo" src={Logo} alt="Logo" />
      <span>made with mew</span>
    </footer>
  );
};

export default Footer;
