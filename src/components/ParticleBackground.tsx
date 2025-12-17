import { useCallback, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

interface ParticleBackgroundProps {
  variant?: "hero" | "about" | "subtle";
}

const ParticleBackground = ({ variant = "hero" }: ParticleBackgroundProps) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const getOptions = (): ISourceOptions => {
    const baseOptions: ISourceOptions = {
      fullScreen: false,
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 60,
      particles: {
        color: {
          value: variant === "hero" ? ["#FF6B6B", "#845EC2", "#FFB86C"] : "#845EC2",
        },
        links: {
          color: "#845EC2",
          distance: 150,
          enable: variant === "hero",
          opacity: 0.15,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: true,
          speed: variant === "hero" ? 1.5 : 0.8,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: variant === "hero" ? 60 : variant === "about" ? 40 : 25,
        },
        opacity: {
          value: { min: 0.2, max: 0.5 },
          animation: {
            enable: true,
            speed: 1,
            sync: false,
          },
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 2, max: variant === "hero" ? 6 : 4 },
          animation: {
            enable: true,
            speed: 2,
            sync: false,
          },
        },
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: variant === "hero" ? "grab" : "bubble",
          },
          onClick: {
            enable: true,
            mode: "push",
          },
        },
        modes: {
          grab: {
            distance: 140,
            links: {
              opacity: 0.5,
            },
          },
          bubble: {
            distance: 200,
            size: 8,
            duration: 2,
            opacity: 0.8,
          },
          push: {
            quantity: 2,
          },
        },
      },
      detectRetina: true,
    };

    return baseOptions;
  };

  if (!init) {
    return null;
  }

  return (
    <Particles
      id={`particles-${variant}`}
      className="!absolute !inset-0 !-z-[10]"
      options={getOptions()}
    />
  );
};

export default ParticleBackground;
