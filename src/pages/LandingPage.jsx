import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Inject global styles
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --gold: #c9a84c;
      --gold-light: #e8c97a;
      --gold-pale: #f5e9c8;
      --dark: #0d0b08;
      --dark2: #1a1610;
      --dark3: #2a2218;
      --cream: #faf7f0;
      --cream2: #f0ead8;
      --text: #1a1610;
      --muted: #8a7a5e;
      --white: #ffffff;
      --font-display: 'Playfair Display', serif;
      --font-body: 'DM Sans', sans-serif;
    }

    html { scroll-behavior: smooth; }

    body {
      font-family: var(--font-body);
      background: var(--cream);
      color: var(--text);
      overflow-x: hidden;
    }

    /* SCROLLBAR */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--dark); }
    ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 3px; }

    /* CURSOR */
    .cursor-dot {
      width: 8px; height: 8px;
      background: var(--gold);
      border-radius: 50%;
      position: fixed;
      pointer-events: none;
      z-index: 99999;
      transform: translate(-50%, -50%);
      transition: opacity 0.3s;
    }
    .cursor-ring {
      width: 36px; height: 36px;
      border: 1.5px solid var(--gold);
      border-radius: 50%;
      position: fixed;
      pointer-events: none;
      z-index: 99998;
      transform: translate(-50%, -50%);
      transition: transform 0.12s ease, width 0.2s, height 0.2s, opacity 0.3s;
    }

    /* NAV */
    .nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
      padding: 22px 60px;
      display: flex; justify-content: space-between; align-items: center;
      transition: background 0.4s, padding 0.4s, box-shadow 0.4s;
    }
    .nav.scrolled {
      background: rgba(13, 11, 8, 0.92);
      backdrop-filter: blur(20px);
      padding: 14px 60px;
      box-shadow: 0 1px 0 rgba(201,168,76,0.12);
    }
    .nav-logo {
      font-family: var(--font-display);
      font-size: 1.5rem; font-weight: 900;
      color: var(--white);
      letter-spacing: -0.5px;
      text-decoration: none;
      display: flex; align-items: center; gap: 10px;
    }
    .nav-logo span { color: var(--gold); }
    .nav-links { display: flex; align-items: center; gap: 10px; }
    .btn-ghost {
      padding: 10px 22px; font-size: 0.9rem; font-weight: 500;
      font-family: var(--font-body);
      color: rgba(255,255,255,0.75);
      background: transparent; border: none; cursor: pointer;
      border-radius: 8px; transition: color 0.2s;
      letter-spacing: 0.3px;
    }
    .btn-ghost:hover { color: var(--gold); }
    .btn-primary {
      padding: 11px 28px; font-size: 0.9rem; font-weight: 600;
      font-family: var(--font-body);
      color: var(--dark); background: var(--gold);
      border: none; cursor: pointer;
      border-radius: 8px; transition: all 0.25s;
      letter-spacing: 0.3px;
    }
    .btn-primary:hover {
      background: var(--gold-light);
      transform: translateY(-1px);
      box-shadow: 0 8px 20px rgba(201,168,76,0.3);
    }

    /* HERO */
    .hero {
      min-height: 100vh;
      background: var(--dark);
      position: relative; overflow: hidden;
      display: flex; align-items: center; justify-content: center;
      padding: 120px 60px 80px;
    }
    .hero-bg-mesh {
      position: absolute; inset: 0;
      background:
        radial-gradient(ellipse 80% 60% at 70% 40%, rgba(201,168,76,0.08) 0%, transparent 60%),
        radial-gradient(ellipse 50% 50% at 20% 80%, rgba(201,168,76,0.05) 0%, transparent 55%),
        radial-gradient(ellipse 30% 40% at 85% 80%, rgba(201,168,76,0.04) 0%, transparent 50%);
    }
    .hero-grid {
      position: absolute; inset: 0;
      background-image: linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px);
      background-size: 60px 60px;
      mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent);
    }
    .hero-lines {
      position: absolute; inset: 0; overflow: hidden;
    }
    .hero-line {
      position: absolute; left: 0; right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(201,168,76,0.15), transparent);
      animation: lineSweep 8s linear infinite;
    }
    .hero-line:nth-child(1) { top: 25%; animation-delay: 0s; }
    .hero-line:nth-child(2) { top: 55%; animation-delay: 2.5s; }
    .hero-line:nth-child(3) { top: 78%; animation-delay: 5s; }
    @keyframes lineSweep {
      0% { opacity: 0; transform: scaleX(0); transform-origin: left; }
      20% { opacity: 1; transform: scaleX(1); transform-origin: left; }
      80% { opacity: 1; transform: scaleX(1); transform-origin: right; }
      100% { opacity: 0; transform: scaleX(0); transform-origin: right; }
    }

    .hero-inner {
      position: relative; z-index: 2;
      max-width: 1100px; width: 100%;
      display: grid; grid-template-columns: 1fr 1fr; gap: 80px;
      align-items: center;
    }
    .hero-badge {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 6px 14px; border-radius: 30px;
      border: 1px solid rgba(201,168,76,0.3);
      background: rgba(201,168,76,0.06);
      font-size: 0.78rem; font-weight: 600;
      color: var(--gold-light); letter-spacing: 1.5px;
      text-transform: uppercase; margin-bottom: 28px;
    }
    .badge-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: var(--gold);
      animation: pulse 2s ease-in-out infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(1.4); }
    }
    .hero-title {
      font-family: var(--font-display);
      font-size: 4rem; font-weight: 900;
      color: var(--white); line-height: 1.1;
      letter-spacing: -1.5px; margin-bottom: 28px;
    }
    .hero-title em {
      font-style: normal; color: var(--gold);
      position: relative; display: inline-block;
    }
    .hero-title em::after {
      content: '';
      position: absolute; left: 0; bottom: -4px; right: 0; height: 3px;
      background: linear-gradient(90deg, var(--gold), transparent);
      border-radius: 2px;
    }
    .hero-desc {
      font-size: 1.05rem; color: rgba(255,255,255,0.5);
      line-height: 1.75; margin-bottom: 44px;
      font-weight: 300;
    }
    .hero-cta-group { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; }
    .cta-main {
      padding: 16px 36px; font-size: 1rem; font-weight: 600;
      font-family: var(--font-body);
      background: var(--gold); color: var(--dark);
      border: none; border-radius: 10px; cursor: pointer;
      transition: all 0.3s; letter-spacing: 0.3px;
      position: relative; overflow: hidden;
    }
    .cta-main::before {
      content: ''; position: absolute; inset: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.2), transparent);
      opacity: 0; transition: opacity 0.3s;
    }
    .cta-main:hover::before { opacity: 1; }
    .cta-main:hover { transform: translateY(-3px); box-shadow: 0 16px 40px rgba(201,168,76,0.35); }
    .cta-secondary {
      padding: 16px 28px; font-size: 1rem; font-weight: 500;
      font-family: var(--font-body);
      background: transparent; color: rgba(255,255,255,0.6);
      border: 1px solid rgba(255,255,255,0.12); border-radius: 10px; cursor: pointer;
      transition: all 0.3s; letter-spacing: 0.3px;
      display: flex; align-items: center; gap: 8px;
    }
    .cta-secondary:hover { color: var(--white); border-color: rgba(255,255,255,0.3); }

    /* HERO VISUAL */
    .hero-visual {
      position: relative; display: flex; justify-content: center; align-items: center;
    }
    .hero-card-main {
      width: 320px;
      background: linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
      backdrop-filter: blur(20px);
      border: 1px solid rgba(201,168,76,0.2);
      border-radius: 24px; padding: 32px;
      position: relative; z-index: 2;
      animation: floatCard 6s ease-in-out infinite;
    }
    @keyframes floatCard {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-12px); }
    }
    .hero-card-img {
      width: 100%; aspect-ratio: 4/3; border-radius: 14px;
      background: linear-gradient(135deg, #2a2218, #1a1610);
      display: flex; align-items: center; justify-content: center;
      font-size: 5rem; margin-bottom: 20px;
      overflow: hidden; position: relative;
    }
    .hero-card-img::before {
      content: '';
      position: absolute; inset: 0;
      background: radial-gradient(circle at 30% 40%, rgba(201,168,76,0.15), transparent 60%);
    }
    .hero-card-label {
      font-size: 0.75rem; font-weight: 600; letter-spacing: 1.5px;
      text-transform: uppercase; color: var(--gold); margin-bottom: 6px;
    }
    .hero-card-title {
      font-family: var(--font-display);
      font-size: 1.2rem; font-weight: 700; color: var(--white);
      margin-bottom: 14px;
    }
    .hero-card-price {
      font-size: 1.4rem; font-weight: 700; color: var(--gold-light);
      font-family: var(--font-display);
    }
    .hero-card-old {
      font-size: 0.85rem; color: rgba(255,255,255,0.3); text-decoration: line-through; margin-left: 8px;
    }
    .hero-tag {
      position: absolute; top: -16px; right: -16px;
      background: var(--gold); color: var(--dark);
      font-size: 0.75rem; font-weight: 700;
      padding: 8px 14px; border-radius: 30px; letter-spacing: 0.5px;
      box-shadow: 0 8px 20px rgba(201,168,76,0.4);
    }
    .hero-orb {
      position: absolute; border-radius: 50%;
      filter: blur(60px); pointer-events: none;
    }
    .hero-orb-1 { width: 300px; height: 300px; top: -50px; right: -50px;
      background: radial-gradient(circle, rgba(201,168,76,0.1), transparent 70%); }
    .hero-orb-2 { width: 200px; height: 200px; bottom: -30px; left: -30px;
      background: radial-gradient(circle, rgba(201,168,76,0.07), transparent 70%); }
    .hero-stat-badge {
      position: absolute;
      background: var(--dark2); border: 1px solid rgba(201,168,76,0.2);
      border-radius: 14px; padding: 14px 18px;
      animation: floatCard 6s ease-in-out infinite;
    }
    .hero-stat-badge.left { left: -60px; top: 40%; animation-delay: -2s; }
    .hero-stat-badge.bottom { right: -40px; bottom: 10%; animation-delay: -4s; }
    .stat-badge-num {
      font-family: var(--font-display);
      font-size: 1.4rem; font-weight: 900; color: var(--gold);
    }
    .stat-badge-lbl {
      font-size: 0.72rem; color: rgba(255,255,255,0.45); margin-top: 2px;
    }

    /* STATS BAR */
    .stats-bar {
      background: var(--dark2);
      border-top: 1px solid rgba(201,168,76,0.1);
      border-bottom: 1px solid rgba(201,168,76,0.1);
      padding: 40px 60px;
      display: flex; justify-content: center; gap: 0;
    }
    .stats-item {
      flex: 1; max-width: 220px;
      text-align: center; padding: 0 30px;
      position: relative;
    }
    .stats-item:not(:last-child)::after {
      content: ''; position: absolute; right: 0; top: 50%; transform: translateY(-50%);
      width: 1px; height: 50%;
      background: linear-gradient(to bottom, transparent, rgba(201,168,76,0.2), transparent);
    }
    .stats-num {
      font-family: var(--font-display);
      font-size: 2.4rem; font-weight: 900; color: var(--gold);
      line-height: 1;
    }
    .stats-lbl {
      font-size: 0.82rem; color: rgba(255,255,255,0.4); margin-top: 6px;
      font-weight: 500; letter-spacing: 0.5px;
    }

    /* MARQUEE */
    .marquee-bar {
      background: var(--gold); padding: 14px 0; overflow: hidden;
    }
    .marquee-track {
      display: flex; gap: 60px;
      animation: marquee 20s linear infinite;
      white-space: nowrap;
    }
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .marquee-item {
      font-size: 0.82rem; font-weight: 700; letter-spacing: 2px;
      text-transform: uppercase; color: var(--dark);
      display: flex; align-items: center; gap: 14px;
    }
    .marquee-sep { opacity: 0.4; }

    /* SECTION GENERIC */
    .section { padding: 120px 60px; }
    .section-tag {
      display: inline-block;
      font-size: 0.75rem; font-weight: 700; letter-spacing: 2px;
      text-transform: uppercase; color: var(--gold);
      margin-bottom: 16px;
    }
    .section-title {
      font-family: var(--font-display);
      font-size: 2.8rem; font-weight: 900;
      color: var(--dark); line-height: 1.2;
      letter-spacing: -1px; margin-bottom: 16px;
    }
    .section-title.light { color: var(--white); }
    .section-sub {
      font-size: 1rem; color: var(--muted);
      line-height: 1.65; max-width: 480px;
    }
    .section-sub.light { color: rgba(255,255,255,0.45); }

    /* FEATURES SECTION */
    .features-section {
      background: var(--cream); padding: 120px 60px;
    }
    .features-layout {
      max-width: 1200px; margin: 0 auto;
      display: grid; grid-template-columns: 1fr 1.4fr; gap: 80px;
      align-items: start;
    }
    .features-left { position: sticky; top: 120px; }
    .features-right { display: flex; flex-direction: column; gap: 24px; }
    .feature-card {
      background: var(--white);
      border: 1px solid rgba(0,0,0,0.06);
      border-radius: 20px; padding: 32px;
      display: grid; grid-template-columns: auto 1fr; gap: 24px;
      align-items: start;
      transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: default;
    }
    .feature-card:hover {
      border-color: rgba(201,168,76,0.4);
      box-shadow: 0 20px 50px rgba(201,168,76,0.08), 0 0 0 1px rgba(201,168,76,0.1);
      transform: translateX(8px);
    }
    .feature-icon-wrap {
      width: 56px; height: 56px; border-radius: 14px;
      background: linear-gradient(135deg, #fef7e4, #fdebc0);
      display: flex; align-items: center; justify-content: center;
      font-size: 1.6rem; flex-shrink: 0;
    }
    .feature-title {
      font-family: var(--font-display);
      font-size: 1.2rem; font-weight: 700; color: var(--dark);
      margin-bottom: 8px;
    }
    .feature-text { font-size: 0.93rem; color: var(--muted); line-height: 1.6; }

    /* PRODUCT SECTION */
    .products-section {
      background: var(--dark); padding: 120px 60px;
    }
    .products-header {
      max-width: 1200px; margin: 0 auto 60px;
      display: flex; justify-content: space-between; align-items: flex-end;
    }
    .products-grid {
      max-width: 1200px; margin: 0 auto;
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
    }
    .product-card {
      background: var(--dark2);
      border: 1px solid rgba(201,168,76,0.08);
      border-radius: 20px; overflow: hidden;
      transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
    }
    .product-card:hover {
      border-color: rgba(201,168,76,0.3);
      transform: translateY(-10px);
      box-shadow: 0 30px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(201,168,76,0.15);
    }
    .product-img {
      aspect-ratio: 4/3;
      background: var(--dark3);
      display: flex; align-items: center; justify-content: center;
      font-size: 4rem; position: relative; overflow: hidden;
    }
    .product-img::after {
      content: '';
      position: absolute; inset: 0;
      background: linear-gradient(to top, var(--dark2), transparent 50%);
    }
    .product-badge {
      position: absolute; top: 14px; left: 14px;
      background: var(--gold); color: var(--dark);
      font-size: 0.72rem; font-weight: 700; letter-spacing: 0.8px;
      padding: 4px 10px; border-radius: 20px; text-transform: uppercase;
      z-index: 2;
    }
    .product-body { padding: 24px; }
    .product-cat {
      font-size: 0.72rem; font-weight: 600; letter-spacing: 1.5px;
      text-transform: uppercase; color: var(--gold); margin-bottom: 6px;
    }
    .product-name {
      font-family: var(--font-display);
      font-size: 1.15rem; font-weight: 700; color: var(--white);
      margin-bottom: 10px; line-height: 1.3;
    }
    .product-price-row {
      display: flex; align-items: center; justify-content: space-between;
    }
    .product-price {
      font-size: 1.2rem; font-weight: 700; color: var(--gold-light);
      font-family: var(--font-display);
    }
    .product-btn {
      width: 38px; height: 38px; border-radius: 10px;
      background: rgba(201,168,76,0.1); border: 1px solid rgba(201,168,76,0.2);
      color: var(--gold); font-size: 1.1rem;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; transition: all 0.25s;
    }
    .product-card:hover .product-btn {
      background: var(--gold); color: var(--dark);
    }

    /* PROCESS SECTION */
    .process-section {
      background: var(--cream); padding: 120px 60px;
    }
    .process-wrap { max-width: 1000px; margin: 0 auto; }
    .process-steps { display: flex; flex-direction: column; gap: 0; margin-top: 70px; }
    .process-step {
      display: grid; grid-template-columns: 80px 1fr;
      gap: 32px; align-items: start;
      padding-bottom: 48px; position: relative;
    }
    .process-step:not(:last-child)::before {
      content: '';
      position: absolute; left: 39px; top: 70px; bottom: 0; width: 2px;
      background: linear-gradient(to bottom, var(--gold), rgba(201,168,76,0.15));
    }
    .step-num-wrap {
      width: 80px; height: 80px; border-radius: 20px;
      background: var(--dark); border: 1px solid rgba(201,168,76,0.2);
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      gap: 2px; flex-shrink: 0; z-index: 1;
      position: relative;
    }
    .step-num {
      font-family: var(--font-display);
      font-size: 1.4rem; font-weight: 900; color: var(--gold);
    }
    .step-icon { font-size: 1rem; }
    .step-content { padding-top: 16px; }
    .step-title {
      font-family: var(--font-display);
      font-size: 1.4rem; font-weight: 700; color: var(--dark); margin-bottom: 10px;
    }
    .step-text { font-size: 0.95rem; color: var(--muted); line-height: 1.65; }

    /* TESTIMONIAL */
    .testi-section {
      background: var(--dark); padding: 120px 60px;
    }
    .testi-wrap { max-width: 900px; margin: 0 auto; text-align: center; }
    .testi-quote-mark {
      font-family: var(--font-display);
      font-size: 8rem; color: rgba(201,168,76,0.1);
      line-height: 0.7; display: block; margin-bottom: 32px;
    }
    .testi-text {
      font-family: var(--font-display);
      font-size: 1.75rem; font-weight: 400; font-style: italic;
      color: rgba(255,255,255,0.85); line-height: 1.55;
      margin-bottom: 48px;
    }
    .testi-divider {
      width: 60px; height: 2px; background: var(--gold);
      margin: 0 auto 32px;
    }
    .testi-author {
      display: flex; align-items: center; justify-content: center; gap: 16px;
    }
    .testi-avatar {
      width: 52px; height: 52px; border-radius: 50%;
      background: linear-gradient(135deg, var(--gold), var(--gold-light));
      display: flex; align-items: center; justify-content: center;
      font-family: var(--font-display); font-weight: 900; font-size: 1.2rem;
      color: var(--dark);
    }
    .testi-name {
      font-weight: 700; color: var(--white); font-size: 1rem;
    }
    .testi-role { font-size: 0.82rem; color: var(--gold); margin-top: 2px; }

    /* CTA SECTION */
    .cta-section {
      background: var(--cream); padding: 100px 60px;
    }
    .cta-box {
      max-width: 1000px; margin: 0 auto;
      background: var(--dark);
      border-radius: 28px; padding: 70px 80px;
      display: grid; grid-template-columns: 1fr auto;
      gap: 60px; align-items: center;
      position: relative; overflow: hidden;
    }
    .cta-box::before {
      content: '';
      position: absolute; right: -100px; top: -100px;
      width: 400px; height: 400px; border-radius: 50%;
      background: radial-gradient(circle, rgba(201,168,76,0.08), transparent 70%);
    }
    .cta-box-title {
      font-family: var(--font-display);
      font-size: 2.4rem; font-weight: 900; color: var(--white);
      letter-spacing: -0.8px; line-height: 1.2; margin-bottom: 14px;
    }
    .cta-box-sub { font-size: 0.95rem; color: rgba(255,255,255,0.4); line-height: 1.6; }
    .cta-box-btns { display: flex; flex-direction: column; gap: 12px; align-items: flex-end; }
    .btn-cta-gold {
      padding: 16px 36px; font-size: 1rem; font-weight: 600;
      font-family: var(--font-body);
      background: var(--gold); color: var(--dark);
      border: none; border-radius: 10px; cursor: pointer;
      transition: all 0.3s; white-space: nowrap; letter-spacing: 0.3px;
    }
    .btn-cta-gold:hover { background: var(--gold-light); transform: translateY(-2px); box-shadow: 0 12px 30px rgba(201,168,76,0.3); }
    .btn-cta-outline {
      padding: 16px 36px; font-size: 1rem; font-weight: 500;
      font-family: var(--font-body);
      background: transparent; color: rgba(255,255,255,0.5);
      border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; cursor: pointer;
      transition: all 0.3s; white-space: nowrap; letter-spacing: 0.3px;
    }
    .btn-cta-outline:hover { color: var(--white); border-color: rgba(255,255,255,0.25); }

    /* FOOTER */
    .footer {
      background: #090b0e; padding: 80px 60px 36px;
    }
    .footer-top {
      max-width: 1200px; margin: 0 auto;
      display: grid; grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: 60px; padding-bottom: 60px;
      border-bottom: 1px solid rgba(255,255,255,0.06);
    }
    .footer-brand-logo {
      font-family: var(--font-display);
      font-size: 1.5rem; font-weight: 900; color: var(--white);
      display: flex; align-items: center; gap: 8px; margin-bottom: 16px;
    }
    .footer-brand-logo span { color: var(--gold); }
    .footer-brand-desc {
      font-size: 0.9rem; color: rgba(255,255,255,0.3); line-height: 1.7;
      margin-bottom: 24px;
    }
    .footer-social { display: flex; gap: 10px; }
    .social-btn {
      width: 38px; height: 38px; border-radius: 10px;
      border: 1px solid rgba(255,255,255,0.08);
      background: transparent; color: rgba(255,255,255,0.4);
      font-size: 0.9rem;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; transition: all 0.25s;
    }
    .social-btn:hover { border-color: var(--gold); color: var(--gold); }
    .footer-col-label {
      font-size: 0.75rem; font-weight: 700; letter-spacing: 2px;
      text-transform: uppercase; color: var(--white); margin-bottom: 20px;
    }
    .footer-links { list-style: none; display: flex; flex-direction: column; gap: 10px; }
    .footer-links li {
      font-size: 0.88rem; color: rgba(255,255,255,0.35);
      cursor: pointer; transition: color 0.2s;
    }
    .footer-links li:hover { color: var(--gold); }
    .footer-bottom {
      max-width: 1200px; margin: 28px auto 0;
      display: flex; justify-content: space-between; align-items: center;
      font-size: 0.82rem; color: rgba(255,255,255,0.2);
    }
    .footer-bottom-gold { color: var(--gold); opacity: 0.6; }

    /* ANIMATE ON SCROLL */
    .anim-up {
      opacity: 0; transform: translateY(40px);
      transition: opacity 0.7s ease, transform 0.7s ease;
    }
    .anim-up.visible { opacity: 1; transform: translateY(0); }
    .anim-delay-1 { transition-delay: 0.1s; }
    .anim-delay-2 { transition-delay: 0.2s; }
    .anim-delay-3 { transition-delay: 0.3s; }

    @media (max-width: 900px) {
      .hero-inner { grid-template-columns: 1fr; }
      .hero-visual { display: none; }
      .features-layout { grid-template-columns: 1fr; }
      .features-left { position: static; }
      .products-grid { grid-template-columns: 1fr 1fr; }
      .footer-top { grid-template-columns: 1fr 1fr; }
      .cta-box { grid-template-columns: 1fr; padding: 50px 40px; }
      .cta-box-btns { align-items: flex-start; flex-direction: row; flex-wrap: wrap; }
      .hero-title { font-size: 2.8rem; }
    }
    @media (max-width: 600px) {
      .nav { padding: 16px 24px; }
      .section, .features-section, .products-section, .testi-section, .process-section, .cta-section { padding: 80px 24px; }
      .hero { padding: 100px 24px 60px; }
      .hero-title { font-size: 2.2rem; }
      .products-grid { grid-template-columns: 1fr; }
      .stats-bar { padding: 30px 24px; flex-wrap: wrap; gap: 20px; }
    }
  `}</style>
);

// CUSTOM CURSOR
const CustomCursor = () => {
  const dot = useRef(null);
  const ring = useRef(null);
  useEffect(() => {
    let x = 0, y = 0, rx = 0, ry = 0;
    const move = (e) => { x = e.clientX; y = e.clientY; };
    const raf = () => {
      rx += (x - rx) * 0.15; ry += (y - ry) * 0.15;
      if (dot.current) { dot.current.style.left = x + 'px'; dot.current.style.top = y + 'px'; }
      if (ring.current) { ring.current.style.left = rx + 'px'; ring.current.style.top = ry + 'px'; }
      requestAnimationFrame(raf);
    };
    window.addEventListener('mousemove', move);
    raf();
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return (<><div ref={dot} className="cursor-dot" /><div ref={ring} className="cursor-ring" /></>);
};

// ANIM ON SCROLL
const useScrollAnim = () => {
  useEffect(() => {
    const els = document.querySelectorAll('.anim-up');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
};

const products = [
  { emoji: '🛋️', cat: 'Ruang Tamu', name: 'Sofa Premium Minimalis L-Shape', price: 'Rp 8.400.000', badge: 'Terlaris', old: 'Rp 10.000.000' },
  { emoji: '🛏️', cat: 'Kamar Tidur', name: 'Ranjang Kayu Jati King Size', price: 'Rp 12.750.000', badge: null },
  { emoji: '🪑', cat: 'Ruang Makan', name: 'Kursi Makan Set Scandinavian', price: 'Rp 4.200.000', badge: 'Baru' },
];

const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false);
  useScrollAnim();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Simulate navigate for standalone use
  const navigate = useNavigate();

  return (
    <div>
      <GlobalStyles />
      <CustomCursor />

      {/* NAV */}
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <a className="nav-logo" href="#">🛋️ BM<span>Perabot</span></a>
        <div className="nav-links">
          <button className="btn-ghost" onClick={() => navigate('/login')}>Masuk</button>
          <button className="btn-primary" onClick={() => navigate('/register')}>Daftar Sekarang</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg-mesh" />
        <div className="hero-grid" />
        <div className="hero-lines">
          <div className="hero-line" /><div className="hero-line" /><div className="hero-line" />
        </div>

        <div className="hero-inner">
          <div>
            <div className="hero-badge"><div className="badge-dot" /> Smart Framework Project</div>
            <h1 className="hero-title">
              Sistem Informasi<br />
              Pemesanan <em>Perabot</em><br />
              Berbasis Web
            </h1>
            <p className="hero-desc">
              Platform digital terintegrasi untuk pengalaman pemesanan furnitur premium yang efisien, transparan, dan modern — untuk hunian dan perkantoran Anda.
            </p>
            <div className="hero-cta-group">
              <button className="cta-main" onClick={() => navigate('/login')}>
                Mulai Pemesanan →
              </button>
              <button className="cta-secondary" onClick={() => navigate('/register')}>
                <span>Daftar Gratis</span>
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-orb hero-orb-1" />
            <div className="hero-orb hero-orb-2" />

            <div className="hero-stat-badge left">
              <div className="stat-badge-num">500+</div>
              <div className="stat-badge-lbl">Produk Katalog</div>
            </div>

            <div className="hero-card-main">
              <div className="hero-tag">✦ Premium</div>
              <div className="hero-card-img">🛋️</div>
              <div className="hero-card-label">Ruang Tamu</div>
              <div className="hero-card-title">Sofa Minimalis Executive</div>
              <div>
                <span className="hero-card-price">Rp 8.400.000</span>
                <span className="hero-card-old">Rp 10jt</span>
              </div>
            </div>

            <div className="hero-stat-badge bottom">
              <div className="stat-badge-num">24/7</div>
              <div className="stat-badge-lbl">Akses Sistem</div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-bar">
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <React.Fragment key={i}>
              {['Kayu Pilihan Resmi','Pengiriman Profesional','Katalog Interaktif','Invoice Otomatis','Stok Real-time','Garansi Produk','Pembayaran Aman','Support 24 Jam'].map((t, j) => (
                <span key={j} className="marquee-item">
                  <span>✦</span> {t} <span className="marquee-sep">·</span>
                </span>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* STATS */}
      <div className="stats-bar">
        {[
          { num: '100%', lbl: 'Kayu Pilihan Berkualitas' },
          { num: '500+', lbl: 'Produk Dalam Katalog' },
          { num: '<3 Menit', lbl: 'Proses Pemesanan' },
          { num: '24 Jam', lbl: 'Akses Sistem Web' },
        ].map((s, i) => (
          <div key={i} className="stats-item anim-up" style={{ transitionDelay: `${i * 0.1}s` }}>
            <div className="stats-num">{s.num}</div>
            <div className="stats-lbl">{s.lbl}</div>
          </div>
        ))}
      </div>

      {/* FEATURES */}
      <section className="features-section">
        <div className="features-layout">
          <div className="features-left anim-up">
            <div className="section-tag">Keunggulan Sistem</div>
            <h2 className="section-title">Dirancang untuk Efisiensi Penuh</h2>
            <p className="section-sub">Setiap fitur dibangun dengan presisi untuk memangkas proses pengadaan furnitur dari manual menjadi digital end-to-end.</p>
            <div style={{ marginTop: '40px', padding: '28px', background: 'var(--dark)', borderRadius: '18px', border: '1px solid rgba(201,168,76,0.1)' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 900, color: 'var(--gold)', marginBottom: '8px' }}>BM Perabot</div>
              <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>Sistem Informasi Pemesanan · Pekanbaru, Riau · © 2025</div>
            </div>
          </div>

          <div className="features-right">
            {[
              { icon: '📋', title: 'Katalog Produk Interaktif', text: 'Jelajahi koleksi furnitur lengkap dengan detail dimensi, spesifikasi bahan, dan variasi warna secara real-time dari browser Anda.' },
              { icon: '⚡', title: 'Alur Pemesanan Super Cepat', text: 'Dari pilih produk hingga konfirmasi order — sistem otomasi invoice kami merampingkan transaksi konvensional menjadi di bawah 3 menit.' },
              { icon: '📦', title: 'Manajemen Transparan', text: 'Setiap pesanan Anda terhubung langsung dengan backend admin gudang — akurasi stok dan presisi jadwal pengiriman terjamin.' },
              { icon: '🔐', title: 'Keamanan Data Terjaga', text: 'Autentikasi berlapis dan enkripsi data memastikan informasi pribadi serta riwayat transaksi Anda tetap aman sepenuhnya.' },
            ].map((f, i) => (
              <div key={i} className={`feature-card anim-up anim-delay-${i % 3 + 1}`}>
                <div className="feature-icon-wrap">{f.icon}</div>
                <div>
                  <div className="feature-title">{f.title}</div>
                  <div className="feature-text">{f.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="products-section">
        <div className="products-header">
          <div className="anim-up">
            <div className="section-tag">Katalog Pilihan</div>
            <h2 className="section-title light">Koleksi Furnitur Premium</h2>
          </div>
          <button className="btn-ghost anim-up" style={{ color: 'var(--gold)', fontSize: '0.9rem' }} onClick={() => navigate('/login')}>
            Lihat Semua Produk →
          </button>
        </div>

        <div className="products-grid">
          {products.map((p, i) => (
            <div key={i} className={`product-card anim-up anim-delay-${i + 1}`} onClick={() => navigate('/login')}>
              <div className="product-img">
                {p.badge && <div className="product-badge">{p.badge}</div>}
                {p.emoji}
              </div>
              <div className="product-body">
                <div className="product-cat">{p.cat}</div>
                <div className="product-name">{p.name}</div>
                <div className="product-price-row">
                  <div className="product-price">{p.price}</div>
                  <div className="product-btn">+</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="process-section">
        <div className="process-wrap">
          <div className="anim-up" style={{ textAlign: 'center', marginBottom: '16px' }}>
            <div className="section-tag">Alur Sistem</div>
          </div>
          <h2 className="section-title anim-up" style={{ textAlign: 'center' }}>Cara Kerja Pemesanan</h2>
          <p className="section-sub anim-up" style={{ textAlign: 'center', margin: '0 auto' }}>Empat langkah sederhana dari registrasi hingga produk tiba di tangan Anda.</p>

          <div className="process-steps">
            {[
              { num: '01', icon: '👤', title: 'Daftar & Masuk Akun', text: 'Buat akun pelanggan dalam hitungan detik dengan form sederhana, lalu masuk ke portal sistem pemesanan eksklusif BM Perabot.' },
              { num: '02', icon: '🛍️', title: 'Jelajahi & Pilih Produk', text: 'Telusuri katalog interaktif, bandingkan spesifikasi, dan tambahkan furnitur impian Anda ke dalam keranjang pemesanan.' },
              { num: '03', icon: '📝', title: 'Konfirmasi & Invoice', text: 'Review pesanan, isi detail pengiriman, dan terima invoice otomatis yang langsung dikirim ke dashboard akun Anda.' },
              { num: '04', icon: '🚚', title: 'Proses & Pengiriman', text: 'Admin memverifikasi pesanan, menyiapkan unit, dan menjadwalkan pengiriman — Anda dapat memantau status secara real-time.' },
            ].map((s, i) => (
              <div key={i} className={`process-step anim-up anim-delay-${(i % 3) + 1}`}>
                <div className="step-num-wrap">
                  <div className="step-num">{s.num}</div>
                  <div className="step-icon">{s.icon}</div>
                </div>
                <div className="step-content">
                  <div className="step-title">{s.title}</div>
                  <div className="step-text">{s.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="testi-section">
        <div className="testi-wrap anim-up">
          <span className="testi-quote-mark">"</span>
          <p className="testi-text">
            Integrasi web BM Perabot memudahkan instansi kami dalam memesan set meja rapat dan sofa fungsional secara kolektif, tanpa prosedur manual yang rumit sama sekali.
          </p>
          <div className="testi-divider" />
          <div className="testi-author">
            <div className="testi-avatar">H</div>
            <div>
              <div className="testi-name">Hendra Wijaya</div>
              <div className="testi-role">Manajer Operasional · PT. Sukses Mandiri</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BOX */}
      <section className="cta-section">
        <div className="cta-box anim-up">
          <div>
            <h2 className="cta-box-title">Siap Transformasi Digital Pembelian Furnitur?</h2>
            <p className="cta-box-sub">Bergabung sekarang dan rasakan kemudahan pemesanan perabot premium langsung dari genggaman Anda.</p>
          </div>
          <div className="cta-box-btns">
            <button className="btn-cta-gold" onClick={() => navigate('/register')}>Daftar Gratis</button>
            <button className="btn-cta-outline" onClick={() => navigate('/login')}>Masuk Portal</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-top">
          <div>
            <div className="footer-brand-logo">🛋️ BM<span>Perabot</span></div>
            <p className="footer-brand-desc">Platform sistem informasi modern untuk efisiensi digitalisasi pemesanan perabot rumah tangga dan perkantoran wilayah Pekanbaru & sekitarnya.</p>
            <div className="footer-social">
              {['📘','📷','🐦','💼'].map((s,i) => <button key={i} className="social-btn">{s}</button>)}
            </div>
          </div>
          <div>
            <div className="footer-col-label">Sistem</div>
            <ul className="footer-links">
              <li onClick={() => navigate('/login')}>Portal Internal</li>
              <li onClick={() => navigate('/register')}>Pendaftaran</li>
              <li>Dokumentasi</li>
              <li>API Reference</li>
            </ul>
          </div>
          <div>
            <div className="footer-col-label">Layanan</div>
            <ul className="footer-links">
              <li>Katalog Produk</li>
              <li>Pemesanan</li>
              <li>Pengiriman</li>
              <li>Garansi</li>
            </ul>
          </div>
          <div>
            <div className="footer-col-label">Kontak</div>
            <ul className="footer-links">
              <li>📍 Jl. Furnitur No. 123, Pekanbaru</li>
              <li>📞 +62 812-3456-7890</li>
              <li>📧 bm.perabot@gmail.com</li>
              <li>🕐 Senin – Sabtu, 08–17 WIB</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Toko BM Perabot. Hak Cipta Dilindungi.</span>
          <span className="footer-bottom-gold">Proyek Praktikum Pemrograman Framework · Web Developer Specialist</span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;