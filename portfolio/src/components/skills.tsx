import { motion } from "framer-motion";
import { Code2, Database, Cloud, Zap } from "lucide-react";

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
  color: string;
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: <Code2 className="w-6 h-6" />,
    skills: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Backend",
    icon: <Database className="w-6 h-6" />,
    skills: ["Node.js", "Express.js", "PostgreSQL", "MongoDB", "REST APIs"],
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Cloud & DevOps",
    icon: <Cloud className="w-6 h-6" />,
    skills: ["AWS", "Docker", "CI/CD", "Git", "Linux"],
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Tools & Others",
    icon: <Zap className="w-6 h-6" />,
    skills: ["OpenAI API", "GraphQL", "Testing", "Debugging", "Agile"],
    color: "from-green-500 to-emerald-500",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function Skills() {
  return (
    <section id="skills" className="w-full py-20 px-6 sm:px-12 lg:px-20">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16 max-w-6xl mx-auto"
      >
        <h2 className="text-5xl sm:text-6xl font-bold mb-4">
          Technical <span className="text-purple-400">Skills</span>
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
      </motion.div>

      {/* Skills Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
      >
        {skillCategories.map((category) => (
          <motion.div key={category.title} variants={itemVariants}>
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative group h-full"
            >
              {/* Glow background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.color} rounded-xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
              ></div>

              {/* Card */}
              <div className="relative h-full bg-white/5 border border-white/10 hover:border-white/30 rounded-xl p-6 backdrop-blur-md transition-all duration-300 flex flex-col">
                {/* Icon */}
                <div
                  className={`p-3 rounded-lg mb-4 w-fit bg-gradient-to-br ${category.color} text-white`}
                >
                  {category.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-4">
                  {category.title}
                </h3>

                {/* Skills */}
                <div className="space-y-2 flex-1">
                  {category.skills.map((skill) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-2"
                    >
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${category.color}`}></div>
                      <span className="text-gray-300 text-base">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
