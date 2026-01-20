import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Twitter } from "lucide-react";

const contactInfo = [
  {
    icon: <Mail className="w-6 h-6" />,
    label: "Email",
    value: "him.arya0701@gmail.com",
    link: "mailto:him.arya0701@gmail.com",
  },
  {
    icon: <Linkedin className="w-6 h-6" />,
    label: "LinkedIn",
    value: "himanshu-arya",
    link: "https://linkedin.com/in/himanshu-arya-33663319b/",
  },
  {
    icon: <Github className="w-6 h-6" />,
    label: "GitHub",
    value: "himanshu-1432",
    link: "https://github.com/himanshu-1432",
  },
//   {
//     icon: <Twitter className="w-6 h-6" />,
//     label: "Twitter",
//     value: "@himanshu_dev",
//     link: "https://twitter.com/himanshu_dev",
//   },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

export default function Contact() {
  return (
    <section id="contact" className="w-full py-20 px-6 sm:px-12 lg:px-20">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16 max-w-6xl mx-auto"
      >
        <h2 className="text-5xl sm:text-6xl font-bold mb-4">
          Get In <span className="text-purple-400">Touch</span>
        </h2>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-4">
          I'm always interested in hearing about new projects and opportunities.
          Feel free to reach out!
        </p>
        <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
      </motion.div>

      {/* Contact Info Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-6xl mx-auto"
      >
        {contactInfo.map((info, index) => (
          <motion.a
            key={`${info.label}-${index}`}
            href={info.link}
            target={info.link.startsWith("mailto") ? undefined : "_blank"}
            rel={info.link.startsWith("mailto") ? undefined : "noopener noreferrer"}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="group"
          >
            <div className="relative">
              {/* Glow background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Card */}
              <div className="relative bg-white/5 border border-white/10 hover:border-purple-400/50 rounded-xl p-6 backdrop-blur-md transition-all duration-300">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg text-white mt-1">
                    {info.icon}
                  </div>

                  {/* Content */}
                  <div>
                    <p className="text-gray-400 text-base font-semibold">
                      {info.label}
                    </p>
                    <p className="text-white font-bold mt-1 text-lg">{info.value}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.a>
        ))}
      </motion.div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        viewport={{ once: true }}
        className="text-center max-w-6xl mx-auto"
      >
        <motion.a
          href="mailto:him.arya0701@gmail.com"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg rounded-lg hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] transition-all duration-300"
        >
          Send Me an Email
        </motion.a>
      </motion.div>

      {/* Divider */}
      <div className="my-12 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        viewport={{ once: true }}
        className="text-center max-w-6xl mx-auto"
      >
        <p className="text-gray-500 text-base">
          © 2024 Himanshu Arya. All rights reserved. | Built with React, TypeScript & Tailwind CSS
        </p>
      </motion.div>
    </section>
  );
}
