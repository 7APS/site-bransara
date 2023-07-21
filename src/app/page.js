"use client";

import React, { useEffect, useState } from "react";
import "./App.css";

const myKey =
  process.env.GOOGLE_KEY;

export default function Home() {
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const animateWords = () => {
      const word1 = document.querySelector(".banner-word-1");
      const word2 = document.querySelector(".banner-word-2");

      // const yPosition1 = window.innerHeight / 2 - 40;
      // const xPosition2 = window.innerWidth - 40;

      // word1.style.transform = `translateY(-20px)`;
      word1.style.opacity = 1;
      // word2.style.transform = `translateX(${xPosition2}px)`;
      word2.style.opacity = 1;

      setTimeout(() => {
        word1.classList.add("animate-slide-down");
        word2.classList.add("animate-slide-in");
      }, 100);
    };

    animateWords();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.pageYOffset === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Carregar o mapa do Google Maps
    const loadMap = () => {
      const googleMapsScript = document.createElement("script");
      googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${myKey}&callback=initMap`;
      googleMapsScript.async = true;
      googleMapsScript.defer = true;
      window.initMap = initMap;
      document.head.appendChild(googleMapsScript);
    };

    // Inicializar o mapa e adicionar o marcador
    const initMap = () => {
      const mapOptions = {
        center: { lat: -27.8288, lng: -50.3381 },
        zoom: 12,
      };
      const map = new window.google.maps.Map(
        document.getElementById("map"),
        mapOptions
      );
      const marker = new window.google.maps.Marker({
        position: { lat: -27.8288, lng: -50.3381 },
        map,
        title: "Localização de Lages",
      });
    };

    loadMap();
  }, []);

  return (
    <div className="font-thin">
      <header
        className={`fixed w-full bg-gray-800 text-white py-4 ${
          isTop ? "" : "shadow-lg"
        }`}
      >
        <nav className="flex justify-between items-center container mx-auto h-24">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">Bransara</h1>
          </div>
          <ul className="flex space-x-4">
            <li>
              <a href="#home">home</a>
            </li>
            <li>
              <a href="#sobre">sobre</a>
            </li>
            <li>
              <a href="#atuação">atuação</a>
            </li>
            <li>
              <a href="#contato">contato</a>
            </li>
            {/* <li>
              <a href="#map">localização</a>
            </li> */}
          </ul>
          <div className="flex items-center">
            <div className="ml-4">
              <a
                href="https://web.whatsapp.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/whatsappFlat.png"
                  alt="WhatsApp"
                  className="w-8 h-8"
                />
              </a>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <section
          id="home"
          className="h-screen flex items-center justify-center"
        >
          <div className="bg-gray-300 p-10 rounded-lg">
            <h1 className="banner-word-1 text-5xl text-blue-500 opacity-0 pt-5">
              Bransara
            </h1>
            <h1 className="banner-word-2 text-5xl text-red-500 opacity-0 pr-5">
              Arquitetura
            </h1>
          </div>
        </section>

        <section
          id="sobre"
          className="h-96 bg-gray-100 flex items-center justify-center"
        >
          <h1>Sobre</h1>
        </section>

        <section
          id="atuação"
          className="h-96 bg-gray-200 flex items-center justify-center"
        >
          <h1>Atuação</h1>
        </section>

        <section
          id="contato"
          className="h-96 bg-gray-300 flex items-center justify-center"
        >
          <h1>Contato</h1>
        </section>

        <section className="w-full h-96" id="map" />

        <section
          id="footer"
          className="h-96 bg-gray-100 flex items-center justify-center"
        >
          extra footer
        </section>

        <footer
          className={`fixed bottom-0 w-full bg-gray-800 text-white py-2 transition-opacity duration-500 ${
            isTop ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="container mx-auto text-center">
            <p>Footer</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
