import { motion } from "framer-motion";

const steps = [
  {
    icon: "👥",
    title: "Make a Team",
    description: "Play a game. Ask your opponent to create a DIH team if they don’t have one.",
  },
  {
    icon: "📝",
    title: "Log Your Game",
    description: "Record the match details to keep your wins official.",
  },
  {
    icon: "📈",
    title: "Climb the Leaderboard",
    description: "Collect wins over the 6-week season to reach the top.",
  },
  {
    icon: "🏆",
    title: "Final Tournament",
    description: "Top 6 teams battle it out to crown the champion.",
  },
  {
    icon: "💰",
    title: "Win Prizes",
    description: "Winners take home a cash prize.",
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
          How It Works
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
