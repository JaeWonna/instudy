const Footer = () => {
    const fixedBottomStyle = {
        position: 'fixed',
  bottom: '0',
  left: '0',
  width: '100%',
  backgroundColor: 'white',
  color: '#fff',
  padding: '20px',
  textAlign: 'center',
    }
    return (
        <div className="fixed-bottom" style={fixedBottomStyle}>
      This element is fixed to the bottom of the screen.
    </div>
    );
};

export default Footer;