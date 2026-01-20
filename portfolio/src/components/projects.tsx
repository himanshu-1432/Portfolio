import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  status?: "completed" | "in-progress";
}

const projects: Project[] = [
  {
    id: 1,
    title: "AI Portfolio Assistant",
    description:
      "An interactive CLI-based AI assistant integrated into a portfolio. Features real-time streaming responses, RAG-based context retrieval, and a stunning glassmorphic UI.",
    image: "/projects/ai-portfolio.png",
    tags: ["React", "TypeAI", "OpenAI", "Express.js", "Framer Motion"],
    liveUrl: "#",
    githubUrl: "#",
    status: "completed",
  },
  {
    id: 2,
    title: "E-Commerce Dashboard",
    description:
      "Full-stack e-commerce platform with real-time inventory management, payment integration, and admin analytics dashboard.",
    image: "/projects/ecommerce.png",
    tags: ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
    liveUrl: "#",
    githubUrl: "#",
    status: "in-progress",
  },
  {
    id: 3,
    title: "Task Management App",
    description:
      "Collaborative task management tool with real-time updates, team workspaces, and productivity analytics.",
    image: "/projects/task-app.png",
    tags: ["React", "Firebase", "Tailwind CSS", "Vite"],
    liveUrl: "#",
    githubUrl: "#",
    status: "in-progress",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function Projects() {
  return (
    <section id="projects" className="w-full py-20 px-6 sm:px-12 lg:px-20">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16 max-w-6xl mx-auto"
      >
        <h2 className="text-5xl sm:text-6xl font-bold mb-4">
          Featured <span className="text-purple-400">Projects</span>
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
      >
        {projects.map((project) => (
          <motion.div key={project.id} variants={itemVariants}>
            <motion.div
              whileHover={{ y: -10 }}
              className="relative group h-full overflow-hidden rounded-2xl"
            >
              {/* Background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

              {/* Card */}
              <div className="relative h-full bg-white/5 border border-white/10 hover:border-purple-400/50 rounded-2xl overflow-hidden backdrop-blur-md transition-all duration-300 flex flex-col">
                {/* Image placeholder */}
                <div className="relative w-full h-48 bg-gradient-to-br from-purple-600/20 to-pink-600/20 overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">{project.title}</span>
                  </div>

                  {/* Hover overlay with links */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center gap-4"
                  >
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-purple-500 hover:bg-purple-600 rounded-full transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-pink-500 hover:bg-pink-600 rounded-full transition-colors"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                  </motion.div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col">
                  {/* Status Badge */}
                  {project.status && (
                    <div className="mb-2">
                      <span
                        className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${
                          project.status === "completed"
                            ? "bg-green-500/20 text-green-300 border border-green-500/50"
                            : "bg-blue-500/20 text-blue-300 border border-blue-500/50"
                        }`}
                      >
                        {project.status === "completed" ? "✓ Completed" : "⚙ In Progress"}
                      </span>
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 text-base mb-4 flex-1">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-sm bg-purple-500/30 text-purple-200 px-2 py-1 rounded border border-purple-400/30 hover:border-purple-400 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
