import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string[];
  skills: string[];
  isActive?: boolean;
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Unisys",
    period: "July,2023 - Present",
    description: [
      "Developed 15+ reusable React components (forms, tables, layout wrappers) using JavaScript and SCSS modules, improving UI consistency across 10+ application screens.",

      "Migrated frontend authentication from Keycloak to Azure Active Directory using @azure/msal-react, handling token acquisition, protected routes, and role-based session management.",

      "Integrated backend APIs using Axios with centralized request and response interceptors for consistent error handling and secure token attachment.",

      "Refactored legacy useEffect-based data fetching into custom reusable hooks, reducing duplicated logic and simplifying state management.",

      "Implemented route-based code splitting using React.lazy, reducing initial JavaScript bundle size by 25–30% and improving First Contentful Paint by 20–25%.",

      "Improved application performance by increasing Lighthouse scores from the low 60s to the mid-80s and reducing time to interactive on key routes.",

      
      "Implemented a centralized AWS WorkSpaces patching system using Systems Manager (SSM) to perform remote patch rollouts without manual intervention.",

      "Developed a QuickSight access management service using Lambda and API Gateway, enabling secure on-prem access through Route 53, ACM, and VPC endpoints.",

    ],
    skills: ["React", "Javascript", "AWS", "Node.js", "PostgreSQL"],
    isActive: true,
  },
  {
    id: 2,
    title: "Software Engineering Intern",
    company: "Unisys",
    period: "Jan,2023 - June,2023",
    description: [
      "Built and maintained 8+ Node.js REST APIs using a controller–service architecture to support authentication, user data retrieval, and UI workflows.",

      "Created reusable Terraform modules to standardize infrastructure provisioning and reduce environment setup time.",
      "Used Redux Toolkit to manage complex cross-component UI state such as filters, UI flags, and role-based behavior, improving predictability and reducing boilerplate.",
    ],
    skills: ["React","Redux", "Node.js", "AWS","Terraform"],
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
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Experience() {
  return (
    <section id="experience" className="w-full py-20 px-6 sm:px-12 lg:px-20">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16 max-w-6xl mx-auto"
      >
        <h2 className="text-5xl sm:text-6xl font-bold mb-4">
          Work <span className="text-purple-400">Experience</span>
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
      </motion.div>

      {/* Timeline */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative max-w-6xl mx-auto"
      >
        {/* Vertical Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 via-pink-500 to-transparent opacity-30"></div>

        {/* Experience Items */}
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              variants={itemVariants}
              className={`flex gap-8 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
            >
              {/* Content Card */}
              <div className="w-full md:w-1/2">
                <motion.div
                  whileHover={{
                    y: -5,
                    boxShadow: "0 20px 60px rgba(168, 85, 247, 0.3)",
                  }}
                  className="relative group"
                >
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Card Content */}
                  <div className="relative bg-white/5 border border-white/10 hover:border-purple-400/50 rounded-2xl p-6 backdrop-blur-md transition-all duration-300">
                    {/* Active Badge */}
                    {exp.isActive && (
                      <div className="absolute -top-3 -right-3">
                        <span className="inline-block bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                          Current
                        </span>
                      </div>
                    )}

                    {/* Header */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 bg-purple-500/20 rounded-lg">
                        <Briefcase className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">
                          {exp.title}
                        </h3>
                        <p className="text-purple-400 font-semibold text-lg">
                          {exp.company}
                        </p>
                      </div>
                    </div>

                    {/* Period */}
                    <p className="text-gray-400 text-base mb-4 font-mono">
                      {exp.period}
                    </p>

                    {/* Description */}
                    <ul className="space-y-2 mb-4">
                      {exp.description.map((desc, i) => (
                        <li
                          key={i}
                          className="text-gray-300 text-base flex gap-2"
                        >
                          <span className="text-purple-400 mt-0.5">▸</span>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, i) => (
                        <motion.span
                          key={i}
                          whileHover={{ scale: 1.05 }}
                          className="text-sm bg-purple-500/30 text-purple-200 px-3 py-1 rounded-full border border-purple-400/30 hover:border-purple-400 transition-colors"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Timeline Dot */}
              <div className="hidden md:flex items-center justify-center w-full md:w-0">
                <motion.div
                  animate={exp.isActive ? { scale: [1, 1.2, 1] } : {}}
                  transition={
                    exp.isActive ? { duration: 2, repeat: Infinity } : {}
                  }
                  className={`w-4 h-4 rounded-full border-4 ${
                    exp.isActive
                      ? "bg-purple-500 border-purple-300"
                      : "bg-gray-700 border-purple-500"
                  }`}
                ></motion.div>
              </div>

              {/* Spacer */}
              <div className="w-full md:w-1/2"></div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
