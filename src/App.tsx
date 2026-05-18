/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import QuoteGenerator from './components/QuoteGenerator';
import Blog from './components/Blog';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <QuoteGenerator />
      <Blog />
      <ContactForm />
    </>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppWidget />
    </div>
  );
}

