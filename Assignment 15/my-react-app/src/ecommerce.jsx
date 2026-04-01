import { useState, useMemo } from "react";

const products = [
  { id: 1, name: "Obsidian Desk Lamp", category: "Lighting", price: 129, rating: 4.8, tag: "New", color: "#1a1a2e", img: "💡" },
  { id: 2, name: "Walnut Writing Desk", category: "Furniture", price: 849, rating: 4.9, tag: "Bestseller", color: "#3d2b1f", img: "🪑" },
  { id: 3, name: "Linen Throw Blanket", category: "Textiles", price: 89, rating: 4.6, tag: null, color: "#c4a882", img: "🛋️" },
  { id: 4, name: "Ceramic Pour-Over Set", category: "Kitchen", price: 64, rating: 4.7, tag: "Sale", color: "#8b9e8f", img: "☕" },
  { id: 5, name: "Brass Floor Mirror", category: "Decor", price: 395, rating: 4.5, tag: null, color: "#b5932a", img: "🪞" },
  { id: 6, name: "Oak Bookshelf", category: "Furniture", price: 590, rating: 4.8, tag: "New", color: "#6b4c3b", img: "📚" },
  { id: 7, name: "Lava Stone Diffuser", category: "Decor", price: 48, rating: 4.4, tag: "Sale", color: "#4a4a5a", img: "🕯️" },
  { id: 8, name: "Merino Wool Cushion", category: "Textiles", price: 72, rating: 4.7, tag: null, color: "#d4c5b0", img: "🧶" },
  { id: 9, name: "Pendant Light Globe", category: "Lighting", price: 210, rating: 4.6, tag: "Bestseller", color: "#2c3e50", img: "🔆" },
  { id: 10, name: "Cast Iron Skillet", category: "Kitchen", price: 95, rating: 4.9, tag: null, color: "#3a3a3a", img: "🍳" },
  { id: 11, name: "Rattan Side Table", category: "Furniture", price: 185, rating: 4.3, tag: "Sale", color: "#a07850", img: "🌿" },
  { id: 12, name: "Geometric Vase Set", category: "Decor", price: 58, rating: 4.5, tag: "New", color: "#7c8a7e", img: "🏺" },
];

const categories = ["All", ...new Set(products.map((p) => p.category))];
const sortOptions = ["Featured", "Price: Low–High", "Price: High–Low", "Top Rated"];

const tagColors = {
  New: { bg: "#e8f5e9", color: "#2e7d32" },
  Bestseller: { bg: "#fff3e0", color: "#e65100" },
  Sale: { bg: "#fce4ec", color: "#c62828" },
};

export default function ProductListing() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Featured");
  const [priceMax, setPriceMax] = useState(900);
  const [search, setSearch] = useState("");
  const [wishlist, setWishlist] = useState(new Set());
  const [cartCount, setCartCount] = useState(0);
  const [addedId, setAddedId] = useState(null);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const matchCat = activeCategory === "All" || p.category === activeCategory;
      const matchPrice = p.price <= priceMax;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchPrice && matchSearch;
    });
    if (sortBy === "Price: Low–High") list = [...list].sort((a, b) => a.price - b.price);
    else if (sortBy === "Price: High–Low") list = [...list].sort((a, b) => b.price - a.price);
    else if (sortBy === "Top Rated") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [activeCategory, sortBy, priceMax, search]);

  const toggleWishlist = (id) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const addToCart = (id) => {
    setCartCount((c) => c + 1);
    setAddedId(id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <div style={styles.root}>
      <style>{css}</style>

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.logo}>
            <span style={styles.logoMark}>◆</span>
            <span style={styles.logoText}>MAISON</span>
          </div>
          <div style={styles.searchWrap}>
            <span style={styles.searchIcon}>⌕</span>
            <input
              style={styles.searchInput}
              placeholder="Search products…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div style={styles.cartBadgeWrap}>
            <button style={styles.cartBtn}>
              <span style={styles.cartIcon}>🛍</span>
              <span style={{ ...styles.cartCount, ...(cartCount > 0 ? styles.cartCountVisible : {}) }}>
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero strip */}
      <div style={styles.hero}>
        <span style={styles.heroEyebrow}>Spring Collection 2026</span>
        <h1 style={styles.heroTitle}>Curated Living</h1>
        <p style={styles.heroSub}>Objects for a considered home</p>
      </div>

      {/* Body */}
      <div style={styles.body}>
        {/* Sidebar */}
        <aside style={styles.sidebar}>
          <div style={styles.sideSection}>
            <p style={styles.sideLabel}>CATEGORIES</p>
            {categories.map((cat) => (
              <button
                key={cat}
                style={{
                  ...styles.catBtn,
                  ...(activeCategory === cat ? styles.catBtnActive : {}),
                }}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
                <span style={styles.catCount}>
                  {cat === "All" ? products.length : products.filter((p) => p.category === cat).length}
                </span>
              </button>
            ))}
          </div>

          <div style={styles.sideSection}>
            <p style={styles.sideLabel}>PRICE RANGE</p>
            <div style={styles.priceDisplay}>
              <span>$0</span>
              <span style={styles.priceMax}>${priceMax}</span>
            </div>
            <input
              type="range"
              min={40}
              max={900}
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              style={styles.slider}
              className="price-slider"
            />
          </div>

          <div style={styles.sideSection}>
            <p style={styles.sideLabel}>SORT BY</p>
            {sortOptions.map((opt) => (
              <button
                key={opt}
                style={{
                  ...styles.sortBtn,
                  ...(sortBy === opt ? styles.sortBtnActive : {}),
                }}
                onClick={() => setSortBy(opt)}
              >
                {sortBy === opt && <span style={styles.sortDot}>●</span>}
                {opt}
              </button>
            ))}
          </div>
        </aside>

        {/* Grid */}
        <main style={styles.main}>
          <div style={styles.gridHeader}>
            <p style={styles.resultCount}>
              <span style={styles.resultNum}>{filtered.length}</span> products
            </p>
          </div>

          {filtered.length === 0 ? (
            <div style={styles.empty}>
              <span style={styles.emptyIcon}>◇</span>
              <p>No products match your filters.</p>
            </div>
          ) : (
            <div style={styles.grid}>
              {filtered.map((p, i) => (
                <div
                  key={p.id}
                  className="product-card"
                  style={{ ...styles.card, animationDelay: `${i * 60}ms` }}
                >
                  {/* Image zone */}
                  <div style={{ ...styles.cardImg, background: p.color + "22" }}>
                    <span style={styles.cardEmoji}>{p.img}</span>
                    {p.tag && (
                      <span style={{ ...styles.tag, background: tagColors[p.tag].bg, color: tagColors[p.tag].color }}>
                        {p.tag}
                      </span>
                    )}
                    <button
                      style={{ ...styles.wishBtn, ...(wishlist.has(p.id) ? styles.wishBtnActive : {}) }}
                      onClick={() => toggleWishlist(p.id)}
                      className="wish-btn"
                    >
                      {wishlist.has(p.id) ? "♥" : "♡"}
                    </button>
                  </div>

                  {/* Info */}
                  <div style={styles.cardBody}>
                    <p style={styles.cardCat}>{p.category}</p>
                    <h3 style={styles.cardName}>{p.name}</h3>
                    <div style={styles.cardMeta}>
                      <span style={styles.cardRating}>★ {p.rating}</span>
                      <span style={styles.cardPrice}>${p.price}</span>
                    </div>
                    <button
                      style={{
                        ...styles.addBtn,
                        ...(addedId === p.id ? styles.addBtnDone : {}),
                      }}
                      onClick={() => addToCart(p.id)}
                      className="add-btn"
                    >
                      {addedId === p.id ? "✓ Added" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

const styles = {
  root: {
    fontFamily: "'Cormorant Garamond', 'Georgia', serif",
    background: "#faf9f7",
    minHeight: "100vh",
    color: "#1c1c1c",
  },
  header: {
    position: "sticky",
    top: 0,
    background: "#faf9f7",
    borderBottom: "1px solid #e8e4de",
    zIndex: 100,
  },
  headerInner: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 32px",
    height: 64,
    display: "flex",
    alignItems: "center",
    gap: 24,
  },
  logo: { display: "flex", alignItems: "center", gap: 8, marginRight: "auto" },
  logoMark: { fontSize: 12, color: "#8b7355" },
  logoText: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: "0.25em",
    color: "#1c1c1c",
  },
  searchWrap: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "#f2ede6",
    borderRadius: 2,
    padding: "6px 14px",
    flex: "0 0 260px",
  },
  searchIcon: { fontSize: 18, color: "#9e9085", lineHeight: 1 },
  searchInput: {
    border: "none",
    background: "transparent",
    outline: "none",
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 15,
    color: "#1c1c1c",
    width: "100%",
  },
  cartBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    position: "relative",
    padding: 4,
    display: "flex",
    alignItems: "center",
  },
  cartIcon: { fontSize: 22 },
  cartBadgeWrap: { position: "relative" },
  cartCount: {
    position: "absolute",
    top: -4,
    right: -4,
    background: "#8b7355",
    color: "#fff",
    borderRadius: "50%",
    width: 18,
    height: 18,
    fontSize: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "sans-serif",
    fontWeight: 700,
    opacity: 0,
    transform: "scale(0.5)",
    transition: "all 0.2s",
  },
  cartCountVisible: { opacity: 1, transform: "scale(1)" },
  hero: {
    background: "#1c1c1c",
    color: "#faf9f7",
    textAlign: "center",
    padding: "56px 32px 52px",
  },
  heroEyebrow: {
    fontFamily: "sans-serif",
    fontSize: 11,
    letterSpacing: "0.2em",
    color: "#8b7355",
    textTransform: "uppercase",
    display: "block",
    marginBottom: 12,
  },
  heroTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(48px, 7vw, 88px)",
    fontWeight: 300,
    letterSpacing: "-0.02em",
    margin: "0 0 12px",
    lineHeight: 1,
  },
  heroSub: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 20,
    fontStyle: "italic",
    color: "#aaa",
    margin: 0,
  },
  body: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "40px 32px",
    display: "flex",
    gap: 48,
    alignItems: "flex-start",
  },
  sidebar: { flex: "0 0 200px", position: "sticky", top: 80 },
  sideSection: { marginBottom: 36 },
  sideLabel: {
    fontFamily: "sans-serif",
    fontSize: 10,
    letterSpacing: "0.18em",
    color: "#9e9085",
    margin: "0 0 14px",
  },
  catBtn: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    background: "none",
    border: "none",
    textAlign: "left",
    padding: "7px 0",
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 16,
    color: "#6b6056",
    cursor: "pointer",
    borderBottom: "1px solid transparent",
    transition: "color 0.15s",
  },
  catBtnActive: { color: "#1c1c1c", fontWeight: 700, borderBottomColor: "#8b7355" },
  catCount: { fontFamily: "sans-serif", fontSize: 11, color: "#bbb" },
  priceDisplay: {
    display: "flex",
    justifyContent: "space-between",
    fontFamily: "sans-serif",
    fontSize: 12,
    color: "#9e9085",
    marginBottom: 8,
  },
  priceMax: { color: "#1c1c1c", fontWeight: 600 },
  slider: { width: "100%", accentColor: "#8b7355", cursor: "pointer" },
  sortBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    width: "100%",
    background: "none",
    border: "none",
    textAlign: "left",
    padding: "7px 0",
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 16,
    color: "#6b6056",
    cursor: "pointer",
    transition: "color 0.15s",
  },
  sortBtnActive: { color: "#1c1c1c", fontWeight: 700 },
  sortDot: { fontSize: 8, color: "#8b7355" },
  main: { flex: 1 },
  gridHeader: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: 24,
    borderBottom: "1px solid #e8e4de",
    paddingBottom: 16,
  },
  resultCount: { fontFamily: "sans-serif", fontSize: 12, color: "#9e9085", margin: 0 },
  resultNum: { color: "#1c1c1c", fontWeight: 600 },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: 28,
  },
  card: {
    background: "#fff",
    borderRadius: 3,
    overflow: "hidden",
    border: "1px solid #ede9e3",
    display: "flex",
    flexDirection: "column",
    animation: "fadeUp 0.45s ease both",
    transition: "box-shadow 0.2s, transform 0.2s",
  },
  cardImg: {
    position: "relative",
    height: 180,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardEmoji: { fontSize: 56 },
  tag: {
    position: "absolute",
    top: 10,
    left: 10,
    padding: "3px 8px",
    borderRadius: 2,
    fontSize: 10,
    fontFamily: "sans-serif",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  wishBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    background: "rgba(255,255,255,0.9)",
    border: "none",
    borderRadius: "50%",
    width: 32,
    height: 32,
    fontSize: 16,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#bbb",
    transition: "color 0.2s, transform 0.2s",
  },
  wishBtnActive: { color: "#c62828" },
  cardBody: {
    padding: "16px 18px 18px",
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  cardCat: {
    fontFamily: "sans-serif",
    fontSize: 10,
    letterSpacing: "0.15em",
    color: "#9e9085",
    textTransform: "uppercase",
    margin: "0 0 6px",
  },
  cardName: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 19,
    fontWeight: 600,
    margin: "0 0 12px",
    lineHeight: 1.2,
    flex: 1,
  },
  cardMeta: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  cardRating: { fontFamily: "sans-serif", fontSize: 12, color: "#8b7355", fontWeight: 600 },
  cardPrice: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 20,
    fontWeight: 700,
    color: "#1c1c1c",
  },
  addBtn: {
    background: "#1c1c1c",
    color: "#faf9f7",
    border: "none",
    padding: "10px 0",
    fontFamily: "sans-serif",
    fontSize: 11,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    cursor: "pointer",
    borderRadius: 2,
    transition: "background 0.2s",
  },
  addBtnDone: { background: "#2e7d32" },
  empty: {
    textAlign: "center",
    padding: "80px 0",
    color: "#9e9085",
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 20,
    fontStyle: "italic",
  },
  emptyIcon: { display: "block", fontSize: 40, marginBottom: 16, opacity: 0.3 },
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap');
  * { box-sizing: border-box; }
  body { margin: 0; }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .product-card:hover {
    box-shadow: 0 8px 32px rgba(0,0,0,0.10);
    transform: translateY(-3px);
  }
  .wish-btn:hover { transform: scale(1.15); color: #c62828 !important; }
  .add-btn:hover { background: #3d3530 !important; }
  .price-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 14px; height: 14px;
    border-radius: 50%;
    background: #8b7355;
    cursor: pointer;
  }
`;