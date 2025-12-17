import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, CheckCircle, Loader2, Mail, User, MessageSquare } from "lucide-react";
import { toast } from "sonner";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Open mail client
    const mailtoLink = `mailto:hello@designer.com?subject=Portfolio Inquiry from ${formData.name}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("Message sent successfully!");

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
    },
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative section-padding overflow-hidden bg-muted/30"
    >
      {/* Background elements */}
      <div className="gradient-blob w-80 h-80 bg-coral/20 top-0 right-0 animate-blob" />
      <div className="gradient-blob w-64 h-64 bg-violet/20 bottom-20 left-0 animate-blob animation-delay-300" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">
              Get In Touch
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mt-3">
              Let's <span className="gradient-text">Connect</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
              Have a project in mind? I'd love to hear from you. Send me a
              message and let's create something amazing together.
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="glass-card p-8 md:p-12 rounded-3xl"
          >
            <div className="space-y-6">
              {/* Name Field */}
              <motion.div
                className="relative"
                whileTap={{ scale: 0.995 }}
              >
                <motion.div
                  animate={{
                    scale: focusedField === "name" ? 1.02 : 1,
                  }}
                  className="relative"
                >
                  <User
                    className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                      focusedField === "name"
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="input-glass pl-14"
                  />
                </motion.div>
              </motion.div>

              {/* Email Field */}
              <motion.div
                className="relative"
                whileTap={{ scale: 0.995 }}
              >
                <motion.div
                  animate={{
                    scale: focusedField === "email" ? 1.02 : 1,
                  }}
                  className="relative"
                >
                  <Mail
                    className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                      focusedField === "email"
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                    size={20}
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="input-glass pl-14"
                  />
                </motion.div>
              </motion.div>

              {/* Message Field */}
              <motion.div
                className="relative"
                whileTap={{ scale: 0.995 }}
              >
                <motion.div
                  animate={{
                    scale: focusedField === "message" ? 1.02 : 1,
                  }}
                  className="relative"
                >
                  <MessageSquare
                    className={`absolute left-5 top-5 transition-colors duration-300 ${
                      focusedField === "message"
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                    size={20}
                  />
                  <textarea
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows={5}
                    className="input-glass pl-14 resize-none"
                  />
                </motion.div>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full btn-primary flex items-center justify-center gap-3 ${
                  isSubmitted ? "bg-green-500" : ""
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Sending...
                  </>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle size={20} />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
