"use client";

import * as React from "react";
import { useRef, useState, useEffect } from "react";
import { createGlobe } from "cobe";

type WorldProps = {
  data: {
    order: number;
    startLat: number;
    startLng: number;
    endLat: number;
    endLng: number;
    arcAlt: number;
    color: string;
  }[];
  globeConfig: {
    pointSize: number;
    globeColor: string;
    showAtmosphere: boolean;
    atmosphereColor: string;
    atmosphereAltitude: number;
    emissive: string;
    emissiveIntensity: number;
    shininess: number;
    polygonColor: string;
    ambientLight: string;
    directionalLeftLight: string;
    directionalTopLight: string;
    pointLight: string;
    arcTime: number;
    arcLength: number;
    rings: number;
    maxRings: number;
    initialPosition: { lat: number; lng: number };
    autoRotate: boolean;
    autoRotateSpeed: number;
  };
};

export function World({ data, globeConfig }: WorldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pointerInteracting, setPointerInteracting] = useState<number | null>(
    null
  );
  const pointerInteractionMovement = useRef(0);
  const { initialPosition, autoRotate, autoRotateSpeed } = globeConfig;
  const [{ width, height }, setSize] = useState({ width: 0, height: 0 });

  const updateCanvasSize = () => {
    if (canvasRef.current && canvasRef.current.parentElement) {
      const { width, height } = canvasRef.current.parentElement.getBoundingClientRect();
      setSize({ width, height });
    }
  };

  useEffect(() => {
    let rotationSpeed = 0;
    if (autoRotate) {
      rotationSpeed = autoRotateSpeed;
    }

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    let phi = initialPosition.lat * (Math.PI / 180);
    let theta = -(initialPosition.lng * (Math.PI / 180));

    const apiKey = "";
    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 2,
      width: width * 2,
      height: height * 2,
      phi,
      theta,
      dark: 1,
      diffuse: 1.2,
      scale: 1,
      mapSamples: 16000,
      mapBrightness: 1.5,
      baseColor: [0.1, 0.1, 0.1],
      markerColor: [1, 0.5, 0.1],
      glowColor: [0.1, 0.1, 0.1],
      markers: [],
      background: [0.1, 0.1, 0.1, 0],
      opacity: 0.7,
      onRender: (state) => {
        // This prevents rotation while dragging
        if (!pointerInteracting) {
          // Rotate the globe when the pointer isn't interacting with the globe
          theta += 0.001 * rotationSpeed;
        } else {
          // Use the pointer interaction movement to rotate the globe
          const deltaTheta = pointerInteractionMovement.current / 200;
          theta += deltaTheta;
          pointerInteractionMovement.current *= 0.9; // Decay the movement
        }
        state.phi = phi;
        state.theta = theta;
        state.width = width * 2;
        state.height = height * 2;
      },
    });

    return () => {
      globe.destroy();
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [
    pointerInteracting,
    width,
    height,
    initialPosition.lat,
    initialPosition.lng,
    autoRotate,
    autoRotateSpeed,
  ]);

  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        aspectRatio: "1",
        margin: "0 auto",
        maxWidth: "1000px",
      }}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteractionMovement.current = 0;
          setPointerInteracting(e.clientX);
        }}
        onPointerUp={() => {
          setPointerInteracting(null);
        }}
        onPointerOut={() => {
          setPointerInteracting(null);
        }}
        onMouseMove={(e) => {
          if (pointerInteracting !== null) {
            const delta = e.clientX - pointerInteracting;
            pointerInteractionMovement.current = delta;
            setPointerInteracting(e.clientX);
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting;
            pointerInteractionMovement.current = delta;
            setPointerInteracting(e.touches[0].clientX);
          }
        }}
        style={{
          width: "100%",
          height: "100%",
          contain: "layout paint size",
          display: "block",
          touchAction: "none",
        }}
      />
    </div>
  );
} 