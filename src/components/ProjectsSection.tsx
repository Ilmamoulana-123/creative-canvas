import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, X } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Brand Identity Suite",
    category: "Branding",
    description: "Complete brand identity design including logo, color palette, and brand guidelines.",
    color: "from-coral to-coral-dark",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "Social Media Campaign",
    category: "Social Media",
    description: "Engaging social media graphics for a lifestyle brand launch.",
    color: "from-violet to-violet-dark",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Modern Logo Design",
    category: "Logos",
    description: "Minimalist logo design for a tech startup.",
    color: "from-coral-light to-violet-light",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    title: "Restaurant Branding",
    category: "Branding",
    description: "Full branding package for an upscale restaurant.",
    color: "from-violet-dark to-coral",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop",
  },
  {
    id: 5,
    title: "Event Promotion",
    category: "Social Media",
    description: "Dynamic promotional graphics for music festival.",
    color: "from-coral to-violet",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop",
  },
  {
    id: 6,
    title: "Corporate Identity",
    category: "Logos",
    description: "Professional logo and stationery design for consulting firm.",
    color: "from-violet-light to-coral-light",
    image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=600&h=400&fit=crop",
  },
];

const categories = ["All", "Logos", "Social Media", "Branding"];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
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
      id="projects"
      ref={ref}
      className="relative section-padding overflow-hidden"
    >
      {/* Background elements */}
      <div className="gradient-blob w-96 h-96 bg-coral/15 -top-20 left-1/4 animate-blob" />
      <div className="gradient-blob w-80 h-80 bg-violet/15 bottom-0 right-0 animate-blob animation-delay-400" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-semibold tracking-wider uppercase text-sm">
            My Work
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mt-3">
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-gradient-primary text-white shadow-glow"
                  : "glass-card hover:bg-card"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              layoutId={`project-${project.id}`}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer"
            >
              <div className="glass-card-hover rounded-2xl overflow-hidden">
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute bottom-4 left-4 right-4"
                  >
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${project.color}`}
                    >
                      {project.category}
                    </span>
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {project.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            layoutId={`project-${selectedProject.id}`}
            className="glass-card rounded-3xl overflow-hidden max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-64 md:h-80 object-cover"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 glass-card rounded-full hover:bg-card transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-8">
              <span
                className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium text-white bg-gradient-to-r ${selectedProject.color} mb-4`}
              >
                {selectedProject.category}
              </span>
              <h3 className="font-display text-3xl font-bold mb-4">
                {selectedProject.title}
              </h3>
              <p className="text-muted-foreground text-lg mb-6">
                {selectedProject.description}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary inline-flex items-center gap-2"
              >
                View Full Project <ExternalLink size={18} />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default ProjectsSection;
