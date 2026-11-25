"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
const MINUTES = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));
const BUSINESS_NAME = "Clean Comfortable Shoes";

const PHONE_DISPLAY = "081311431886";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

const getTrimmedValue = (formData, key) => {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
};

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);
  const year = new Date().getFullYear();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BUSINESS_NAME,
    url: SITE_URL,
    description:
      "Clean Comfortable Shoes - layanan cuci sepatu profesional, cepat, dan aman.",
    telephone: PHONE_DISPLAY,
    image: `${SITE_URL}/logo.jpeg`,
  };

  useEffect(() => {
    const revealItems = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const name = getTrimmedValue(formData, "nama");
    const menu = getTrimmedValue(formData, "menu");
    const address = getTrimmedValue(formData, "alamat");
    const mapsLink = getTrimmedValue(formData, "maps_link");
    const date = getTrimmedValue(formData, "tanggal");
    const pickupHour = getTrimmedValue(formData, "jam_pengambilan_jam");
    const pickupMinute = getTrimmedValue(formData, "jam_pengambilan_menit");
    const pickupTime = pickupHour && pickupMinute ? `${pickupHour}:${pickupMinute}` : "";

    if (!name || !menu || !address || !mapsLink || !date || !pickupTime) {
      return;
    }

    const message = [
      "Halo Clean Comfortable Shoes, saya ingin melakukan pemesanan cuci sepatu.",
      "",
      `Nama: ${name}`,
      `Menu: ${menu}`,
      `Alamat: ${address}`,
      `Tanggal: ${date}`,
      `Jam pengambilan: ${pickupTime}`,
      `Lokasi Maps: ${mapsLink}`,
      "",
      "Terima kasih.",
    ].join("\n");
    const phone = "6281311431886";

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener");
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <header className="site-header">
        <div className="container nav-wrap">
          <a className="logo" href="#">
            <span className="logo-mark">
              <Image
                src="/logo.jpeg"
                alt="Clean Comfortable Shoes logo"
                width={52}
                height={52}
                className="logo-image"
                sizes="52px"
                priority
              />
            </span>
            <span>{BUSINESS_NAME}</span>
          </a>
          <button
            className="nav-toggle"
            type="button"
            aria-expanded={navOpen}
            aria-controls="primary-nav"
            onClick={() => setNavOpen((open) => !open)}
          >
            Menu
          </button>
          <nav id="primary-nav" className={`nav-links ${navOpen ? "open" : ""}`}>
            <a href="#tentang" onClick={() => setNavOpen(false)}>
              Tentang
            </a>
            <a href="#layanan" onClick={() => setNavOpen(false)}>
              Layanan
            </a>
            <a href="#kontak" onClick={() => setNavOpen(false)}>
              Kontak
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" id="beranda">
          <div className="container hero-grid">
            <div className="hero-copy" data-reveal>
              <p className="eyebrow">Toko cuci sepatu</p>
              <h1>Sepatu bersih, nyaman, dan siap dipakai kapan saja.</h1>
              <p className="lead">
                Clean Comfortable Shoes menyediakan layanan cuci sepatu yang teliti dengan bahan yang aman.
                Kami fokus pada kebersihan, kenyamanan, dan hasil yang rapi.
              </p>
              <div className="hero-actions">
                <a className="btn primary" href="#layanan">
                  Lihat Layanan
                </a>
                <a className="btn ghost" href="#kontak">
                  Hubungi Kami
                </a>
              </div>
            </div>
            <div className="hero-art" aria-hidden="true" data-reveal>
              <div className="hero-card">
                <p className="hero-card-title">Cepat dan Rapi</p>
                <p className="hero-card-desc">Perawatan sepatu dengan standar higienis dan detail.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section about" id="tentang">
          <div className="container about-grid">
            <div data-reveal>
              <h2>Tentang Kami</h2>
              <p>
                Clean Comfortable Shoes adalah layanan cuci sepatu yang mengutamakan kebersihan dan
                kenyamanan. Kami menangani berbagai jenis sepatu dengan pendekatan yang aman dan terukur.
              </p>
            </div>
            <ul className="about-list" data-reveal>
              <li>Proses higienis dengan bahan pilihan.</li>
              <li>Detail finishing yang rapi dan wangi.</li>
              <li>Harga transparan dan layanan ramah.</li>
            </ul>
          </div>
        </section>

        <section className="section services" id="layanan">
          <div className="container">
            <div className="section-head" data-reveal>
              <h2>Menu Layanan</h2>
              <p>Pilih paket yang sesuai dengan kebutuhan sepatu Anda.</p>
            </div>
            <div className="cards">
              <article className="card" data-reveal>
                <div className="card-head">
                  <h3>Fast Clean</h3>
                  <span className="price">Rp 20.000</span>
                </div>
                <p>Solusi cepat untuk membersihkan sepatu agar kembali segar.</p>
              </article>
              <article className="card" data-reveal>
                <div className="card-head">
                  <h3>Deep Clean</h3>
                  <span className="price">Rp 35.000</span>
                </div>
                <p>Pembersihan menyeluruh untuk menjaga material tetap awet.</p>
              </article>
              <article className="card" data-reveal>
                <div className="card-head">
                  <h3>Deep Clean Extreme</h3>
                  <span className="price">Rp 40.000</span>
                </div>
                <p>Perawatan intensif untuk noda membandel dan sepatu yang lama tersimpan.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section contact" id="kontak">
          <div className="container contact-grid" data-reveal>
            <div className="contact-intro">
              <h2>Kontak</h2>
              <p>Isi form pemesanan di bawah untuk langsung terhubung ke WhatsApp kami.</p>
              <div className="contact-info">
                <p>Telepon/WhatsApp</p>
                <strong>{PHONE_DISPLAY}</strong>
              </div>
            </div>
            <div className="contact-card">
              <p className="contact-card-title">Form Pemesanan</p>
              <form className="order-form" id="order-form" onSubmit={handleSubmit}>
                <label className="form-field">
                  <span>Nama lengkap</span>
                  <input
                    type="text"
                    name="nama"
                    placeholder="Masukkan nama lengkap"
                    autoComplete="name"
                    required
                  />
                </label>
                <label className="form-field">
                  <span>Menu yang dipilih</span>
                  <select name="menu" required defaultValue="">
                    <option value="" disabled>
                      Pilih menu layanan
                    </option>
                    <option value="Fast Clean">Fast Clean - Rp 20.000</option>
                    <option value="Deep Clean">Deep Clean - Rp 35.000</option>
                    <option value="Deep Clean Extreme">Deep Clean Extreme - Rp 40.000</option>
                  </select>
                </label>
                <label className="form-field span-2">
                  <span>Alamat</span>
                  <textarea
                    name="alamat"
                    rows="3"
                    placeholder="Masukkan alamat lengkap"
                    required
                  ></textarea>
                </label>
                <label className="form-field span-2">
                  <span>Link Google Maps</span>
                  <input
                    type="url"
                    name="maps_link"
                    placeholder="Tempel link Google Maps"
                    required
                  />
                </label>
                <p className="form-note span-2">
                  Penjemputan di atas 5 km dari lokasi toko dikenakan biaya Rp 15.000 (ditentukan saat WhatsApp).
                </p>
                <label className="form-field">
                  <span>Tanggal Pengambilan Sepatu</span>
                  <input type="date" name="tanggal" required />
                </label>
                <label className="form-field">
                  <span>Jam pengambilan sepatu</span>
                  <div className="time-picker">
                    <select name="jam_pengambilan_jam" required defaultValue="">
                      <option value="" disabled>
                        Jam
                      </option>
                      {HOURS.map((hour) => (
                        <option key={hour} value={hour}>
                          {hour}
                        </option>
                      ))}
                    </select>
                    <span className="time-separator">:</span>
                    <select name="jam_pengambilan_menit" required defaultValue="">
                      <option value="" disabled>
                        Menit
                      </option>
                      {MINUTES.map((minute) => (
                        <option key={minute} value={minute}>
                          {minute}
                        </option>
                      ))}
                    </select>
                  </div>
                </label>
                <button className="btn primary span-2" type="submit">
                  Pesan via WhatsApp
                </button>
                <p className="form-note span-2">Pesan Anda akan otomatis terisi dalam template WhatsApp.</p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>
            Clean Comfortable Shoes &copy; {year}. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
