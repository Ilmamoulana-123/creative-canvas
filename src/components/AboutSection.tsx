import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ParticleBackground from "./ParticleBackground";
import { Sparkles, Palette, Lightbulb } from "lucide-react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Sparkles,
      title: "Creative Vision",
      description: "Transforming ideas into visually stunning realities",
    },
    {
      icon: Palette,
      title: "Brand Identity",
      description: "Building memorable and cohesive brand experiences",
    },
    {
      icon: Lightbulb,
      title: "Innovative Solutions",
      description: "Pushing boundaries with fresh design approaches",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
      },
    }),
  };

  const aboutText =
    "I'm a passionate graphic designer with a keen eye for detail and a love for creating visual stories that captivate and inspire. With expertise in logo design, social media graphics, and comprehensive brand identity development, I help businesses establish a strong visual presence that resonates with their audience.";

  const words = aboutText.split(" ");

  return (
    <section
      id="about"
      ref={ref}
      className="relative section-padding overflow-hidden bg-muted/30"
    >
      {/* Gradient blobs */}
      <div className="gradient-blob w-80 h-80 bg-violet/20 top-0 right-0 animate-blob" />
      <div className="gradient-blob w-64 h-64 bg-coral/20 bottom-20 -left-20 animate-blob animation-delay-300" />

      <ParticleBackground variant="about" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.span className="text-primary font-semibold tracking-wider uppercase text-sm">
              About Me
            </motion.span>
            <motion.h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mt-3">
              Bringing Ideas to{" "}
              <span className="gradient-text">Life</span>
            </motion.h2>
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text Content */}
            <motion.div variants={itemVariants}>
              <div className="glass-card p-8 md:p-10 rounded-3xl">
                <p className="text-lg md:text-xl leading-relaxed text-foreground/80">
                  {words.map((word, i) => (
                    <motion.span
                      key={i}
                      custom={i}
                      variants={wordVariants}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      className="inline-block mr-2"
                    >
                      {word}
                    </motion.span>
                  ))}
                </p>

                <motion.div
                  variants={itemVariants}
                  className="mt-8 flex flex-wrap gap-3"
                >
                  {["Logos", "Branding", "Social Media", "Print Design"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </motion.div>
              </div>
            </motion.div>

            {/* Feature Cards */}
            <motion.div
              variants={containerVariants}
              className="grid gap-6"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="glass-card-hover p-6 rounded-2xl flex items-start gap-5"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="p-4 rounded-xl bg-gradient-primary"
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="font-display font-semibold text-xl mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
