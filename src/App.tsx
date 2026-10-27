import { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Float, OrbitControls } from '@react-three/drei'
import { ArrowDown, ArrowUpRight, Menu, Pause, Play, RotateCcw, X } from 'lucide-react'
import type { Group } from 'three'
import './App.css'

const works = [
  ['ORBIT', 'Eksplorasi identitas', '01'],
  ['FORMA', 'Eksplorasi digital', '02'],
  ['PLAY', 'Eksperimen kreatif', '03'],
]

function Sculpture({ color, playing, resetKey }: { color: string; playing: boolean; resetKey: number }) {
  const group = useRef<Group>(null)
  useFrame((_, delta) => {
    if (playing && group.current) group.current.rotation.y += Math.min(delta, 0.05) * 0.25
  })

  return (
    <group key={resetKey} ref={group} rotation={[0.25, 0.1, -0.2]}>
      <Float speed={playing ? 1.7 : 0} floatIntensity={0.35} rotationIntensity={0.2}>
        <mesh castShadow rotation={[0.55, 0.3, 0.1]}>
          <torusKnotGeometry args={[1.08, 0.34, 180, 32, 2, 3]} />
          <meshPhysicalMaterial color={color} metalness={0.48} roughness={0.22} clearcoat={1} />
        </mesh>
        <mesh rotation={[1.15, 0.2, -0.5]}>
          <torusGeometry args={[2.02, 0.025, 16, 160]} />
          <meshStandardMaterial color="#a8ada8" metalness={0.9} roughness={0.25} />
        </mesh>
        <mesh position={[1.9, 0.65, 0.3]} castShadow>
          <sphereGeometry args={[0.22, 32, 32]} />
          <meshStandardMaterial color="#edf1e6" metalness={0.7} roughness={0.16} />
        </mesh>
        <mesh position={[-1.4, -1.3, 0.4]} rotation={[0.4, 0.4, 0.4]}>
          <octahedronGeometry args={[0.27]} />
          <meshStandardMaterial color="#b2c698" metalness={0.4} roughness={0.3} />
        </mesh>
      </Float>
    </group>
  )
}

function App() {
  const [color, setColor] = useState('#ef6249')
  const [playing, setPlaying] = useState(true)
  const [resetKey, setResetKey] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="header">
        <a className="wordmark" href="#home">wann<sup>®</sup></a>
        <nav className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Navigasi utama">
          <a href="#about" onClick={() => setMenuOpen(false)}>Tentang <ArrowUpRight size={14} /></a>
          <a href="#work" onClick={() => setMenuOpen(false)}>Eksplorasi <ArrowUpRight size={14} /></a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Kontak <ArrowUpRight size={14} /></a>
        </nav>
        <span className="header-note"><i /> Personal space, endless possibilities.</span>
        <button className="menu-button" aria-label={menuOpen ? 'Tutup navigasi' : 'Buka navigasi'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="grid" aria-hidden="true" />
          <div className="canvas-wrap">
            <Suspense fallback={<div className="scene-loading">Memuat objek 3D...</div>}>
              <Canvas shadows camera={{ position: [0, 0.4, 7.8], fov: 38 }} dpr={[1, 1.75]}>
                <ambientLight intensity={1.4} />
                <directionalLight position={[3, 5, 4]} intensity={4} castShadow />
                <pointLight position={[-4, 1, 2]} intensity={20} color="#d5f4ff" />
                <pointLight position={[1, -3, -2]} intensity={12} color="#ffa78d" />
                <Sculpture color={color} playing={playing} resetKey={resetKey} />
                <ContactShadows position={[0, -2.4, 0]} opacity={0.2} scale={12} blur={2.8} far={5} />
                <OrbitControls key={resetKey} enableZoom={false} enablePan={false} />
              </Canvas>
            </Suspense>
          </div>
          <div className="hero-copy">
            <p className="eyebrow">✳ SEBUAH RUANG PERSONAL</p>
            <h1>Halo, saya<br /><strong>Wann<span>.</span></strong></h1>
            <p className="intro">Rasa ingin tahu, ide baru, dan sedikit perspektif berbeda. Selamat datang di ruang digital saya.</p>
            <a className="cta" href="#work">Jelajahi dunia saya <ArrowUpRight size={18} /></a>
          </div>
          <div className="object-label"><span>OBJECT — 001</span><span>Different by nature.</span></div>
          <div className="scene-controls" aria-label="Pengaturan objek 3D">
            {['#ef6249', '#9db886', '#7e9ebd'].map((swatch, index) => <button key={swatch} className={color === swatch ? 'swatch selected' : 'swatch'} style={{ backgroundColor: swatch }} aria-label={`Warna ${['coral', 'hijau', 'biru'][index]}`} title={`Warna ${['coral', 'hijau', 'biru'][index]}`} aria-pressed={color === swatch} onClick={() => setColor(swatch)} />)}
            <i />
            <button aria-label={playing ? 'Jeda animasi' : 'Putar animasi'} onClick={() => setPlaying(!playing)}>{playing ? <Pause size={15} /> : <Play size={15} />}</button>
            <button aria-label="Reset sudut objek" onClick={() => setResetKey(resetKey + 1)}><RotateCcw size={15} /></button>
          </div>
          <div className="hero-bottom"><a href="#about"><ArrowDown size={15} /> Kenali lebih dekat</a><span>IDE. EKSPLORASI. KONEKSI.</span><span>SCROLL TO DISCOVER</span></div>
        </section>

        <section className="about section" id="about">
          <div className="section-label"><span>01 / TENTANG SAYA</span><b>+</b></div>
          <div className="about-content">
            <h2>Selalu penasaran.<br /><span>Selalu bereksplorasi.</span></h2>
            <div><p>Saya Wann. Saya percaya setiap ide punya kemungkinan untuk menjadi sesuatu yang menarik.</p><p>Ruang ini menjadi tempat untuk berbagi cerita, menampilkan eksplorasi, dan bertemu dengan perspektif baru.</p><div className="tags"><span>Desain</span><span>Teknologi</span><span>Kreativitas</span></div></div>
          </div>
        </section>

        <section className="work section" id="work">
          <div className="section-label"><span>02 / RUANG EKSPLORASI</span><span>CONCEPT COLLECTION</span></div>
          <div className="work-heading"><h2>Ide yang mengambil bentuk<span>.</span></h2><p>Konsep contoh, bukan proyek klien.</p></div>
          <div className="work-grid">{works.map(([name, type, number], index) => <article className={`work-card visual-${index}`} key={name}><div className="visual"><span className="visual-name">{name}</span><span className="visual-number">{number} / EXPERIMENT</span><ArrowUpRight className="open-icon" size={21} /></div><div className="work-caption"><h3>{name[0] + name.slice(1).toLowerCase()}</h3><span>{type}</span></div></article>)}</div>
        </section>

        <section className="contact section" id="contact">
          <div className="section-label"><span>03 / MARI TERHUBUNG</span><b>+</b></div>
          <div className="contact-row"><h2>Ide menarik dimulai<br />dari sebuah <span>halo.</span></h2><ArrowUpRight size={90} strokeWidth={1} /></div>
          <p>Kontak personal akan segera hadir.</p>
        </section>
      </main>
      <footer><a className="wordmark" href="#home">wann<sup>®</sup></a><span>Ruang personal Wann © 2026</span><a href="#home">Kembali ke atas <ArrowUpRight size={15} /></a></footer>
    </>
  )
}

export default App
