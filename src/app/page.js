"use client";

import React, { useEffect, useState } from "react";
import "./App.css";
import Image from "next/image";

const myKey = process.env.GOOGLE_KEY;

export default function Home() {
  const [isTop, setIsTop] = useState(true);
  const [menuActive, setMenuActive] = useState("");

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
    const handleScrollMenu = () => {
      const menuItems = document.querySelectorAll(".menu-item");

      function isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <=
            (window.innerWidth || document.documentElement.clientWidth)
        );
      }

      menuItems.forEach((menuItem) => {
        const sectionId = menuItem.getAttribute("href");
        const section = document.querySelector(sectionId);

        if (sectionId != null && isElementInViewport(section)) {
          if (sectionId === "#home") {
            setMenuActive("home");
          } else if (sectionId === "#sobre") {
            setMenuActive("sobre");
          } else if (sectionId === "#atuação") {
            setMenuActive("atuação");
          } else if (sectionId === "#contato") {
            setMenuActive("contato");
          }
        }
      });
    };

    window.addEventListener("scroll", handleScrollMenu);
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
    <div className="font-thin bg-white">
      <header
        className={`fixed w-full bg-primary text-white py-4 h-24 ${
          isTop ? "" : "shadow-lg"
        }`}
      >
        <nav className="flex justify-between items-center container mx-auto">
          <div className="flex items-center">
            <a href="https://bransaraarquitetura.com" rel="Bransara">
              <Image
                className="m-r-5 hover:scale-110"
                width={37}
                height={80}
                src="/white.png"
                alt="Logo Bransara"
                priority
              />
            </a>
          </div>
          <ul className="flex space-x-4 mb-2 text-secondary">
            <li>
              <a
                href="#home"
                className={`menu-item hover:bg-secondary hover:text-primary font-bold p-6 py-10 w-28
                  ${menuActive === "home" ? "bg-secondary text-primary" : ""}
                `}
              >
                home
              </a>
            </li>
            <li>
              <a
                href="#sobre"
                className={`menu-item hover:bg-secondary hover:text-primary font-bold p-6 py-10 w-28
                  ${menuActive === "sobre" ? "bg-secondary text-primary" : ""}
                `}
              >
                sobre
              </a>
            </li>
            <li>
              <a
                href="#atuação"
                className={`menu-item hover:bg-secondary hover:text-primary font-bold p-6 py-10 w-28
                  ${menuActive === "atuação" ? "bg-secondary text-primary" : ""}
                `}
              >
                atuação
              </a>
            </li>
            <li>
              <a
                href="#contato"
                className={`menu-item hover:bg-secondary hover:text-primary font-bold p-6 py-10 w-28
                  ${menuActive === "contato" ? "bg-secondary text-primary" : ""}
                `}
              >
                contato
              </a>
            </li>
          </ul>
          <div className="flex items-center">
            <div className="ml-4">
              <a
                href="https://api.whatsapp.com/send/?phone=554998157502"
                target="_blank"
                rel="WhatsApp Bransara"
              >
                <Image
                  src="/whatsappFlat.png"
                  alt="WhatsApp"
                  width={32}
                  height={32}
                  className="w-8 h-8 hover:scale-110"
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
          className="sobre h-96 bg-gray-100 flex items-center justify-center"
        >
          <h1>Sobre</h1>
        </section>

        <section
          id="atuação"
          className="atuação h-96 bg-gray-200 flex items-center justify-center"
        >
          <h1>Atuação</h1>
        </section>

        <section
          id="contato"
          className="contato h-96 bg-gray-300 flex items-center justify-center"
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
