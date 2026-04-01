import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <h2>My Portfolio</h2>
      <ul style={styles.ul}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: { display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#f4f4f4' },
  ul: { display: 'flex', listStyle: 'none', gap: '20px' }
};

export default Navbar;