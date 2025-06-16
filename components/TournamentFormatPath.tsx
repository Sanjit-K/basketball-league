import { motion } from "framer-motion";

const steps = [
  {
    icon: "📋",
    title: "Sign Up",
    description: "Create your team and register before the tournament starts.",
  },
  {
    icon: "📅",
    title: "Get Match Schedule",
    description: "Teams are randomly seeded and bracket is released.",
  },
  {
    icon: "⚔️",
    title: "Compete in Bracket",
    description: "Win and move up. Lose once and drop down to the lower bracket.",
  },
  {
    icon: "🔁",
    title: "Fight Through Elimination",
    description: "Teams get one second chance in the lower bracket. Lose twice and you're out.",
  },
  {
    icon: "🏆",
    title: "Championship Match",
    description: "The winner of the upper and lower brackets face off in the finals.",
  },
];

export default function TournamentFormatPath() {
  return (
    <section className="py-24 bg-gray-900 text-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.h3
          className="text-3xl font-semibold mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Tournament Format
        </motion.h3>

        <div className="flex flex-col gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex items-start gap-4 p-6 rounded-xl bg-gray-800 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg">
                {index + 1}
              </div>
              <div>
                <div className="text-2xl mb-1">{step.icon}</div>
                <h4 className="text-lg font-semibold">{step.title}</h4>
                <p className="text-sm text-gray-300 mt-1">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
