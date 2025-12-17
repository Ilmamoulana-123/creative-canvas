import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative section-padding overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-coral/10 via-violet/10 to-coral/10 animate-gradient-shift" />
      
      {/* Floating gradient blobs */}
      <div className="gradient-blob w-96 h-96 bg-coral/30 -top-20 -left-20 animate-blob" />
      <div className="gradient-blob w-80 h-80 bg-violet/30 -bottom-20 -right-20 animate-blob animation-delay-200" />
      <div className="gradient-blob w-64 h-64 bg-coral-light/30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-blob animation-delay-400" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="glass-card p-12 md:p-16 rounded-3xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6"
          >
            <Sparkles size={18} />
            <span className="font-medium text-sm">Let's Collaborate</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Let's Create Something{" "}
            <span className="gradient-text">Amazing</span> Together
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Ready to elevate your brand with stunning designs? I'm here to bring
            your vision to life with creativity and precision.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary inline-flex items-center justify-center gap-2 animate-pulse-glow"
            >
              Hire Me <ArrowRight size={20} />
            </motion.a>
            <motion.a
              href="/resume.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-outline inline-flex items-center justify-center gap-2"
            >
              Download Resume
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
