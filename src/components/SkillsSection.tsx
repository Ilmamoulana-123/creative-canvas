import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  {
    name: "Adobe Photoshop",
    level: 95,
    icon: "Ps",
    color: "from-[#31A8FF] to-[#001E36]",
  },
  {
    name: "Adobe Illustrator",
    level: 90,
    icon: "Ai",
    color: "from-[#FF9A00] to-[#330000]",
  },
  {
    name: "Canva",
    level: 85,
    icon: "Ca",
    color: "from-[#00C4CC] to-[#7B2D8E]",
  },
  {
    name: "CorelDRAW",
    level: 80,
    icon: "Co",
    color: "from-[#00A858] to-[#004D2C]",
  },
];

const softSkills = [
  { name: "Creativity", icon: "✨" },
  { name: "Attention to Detail", icon: "🎯" },
  { name: "Fast Learner", icon: "🚀" },
  { name: "Team Collaboration", icon: "🤝" },
  { name: "Time Management", icon: "⏰" },
  { name: "Problem Solving", icon: "💡" },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  return (
    <section
      id="skills"
      ref={ref}
      className="relative section-padding overflow-hidden bg-muted/30"
    >
      {/* Background elements */}
      <div className="gradient-blob w-72 h-72 bg-violet/20 top-20 -right-20 animate-blob" />
      <div className="gradient-blob w-64 h-64 bg-coral/20 bottom-0 left-10 animate-blob animation-delay-300" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold tracking-wider uppercase text-sm">
            Expertise
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mt-3">
            My <span className="gradient-text">Skills</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Technical Skills */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h3
              variants={itemVariants}
              className="font-display text-2xl font-semibold mb-8"
            >
              Design Tools
            </motion.h3>
            <div className="space-y-6">
              {skills.map((skill) => (
                <motion.div
                  key={skill.name}
                  variants={itemVariants}
                  className="glass-card-hover p-5 rounded-2xl"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center shadow-lg`}
                    >
                      <span className="text-white font-bold text-lg">
                        {skill.icon}
                      </span>
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">{skill.name}</span>
                        <span className="text-primary font-medium">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : {}}
                          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                          className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Soft Skills */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h3
              variants={itemVariants}
              className="font-display text-2xl font-semibold mb-8"
            >
              Soft Skills
            </motion.h3>
            <div className="grid grid-cols-2 gap-4">
              {softSkills.map((skill) => (
                <motion.div
                  key={skill.name}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="skill-card"
                >
                  <motion.span
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    className="text-4xl"
                  >
                    {skill.icon}
                  </motion.span>
                  <span className="font-medium text-center">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
