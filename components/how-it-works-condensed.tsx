"use client"

import { motion } from "framer-motion"
import { Store, Wallet, Coffee } from "lucide-react"

export function HowItWorksCondensed() {
  const steps = [
    {
      icon: Store,
      title: "Business Launches",
      description: "Coffee shop needs $100K to open. Creates tokens, sets profit share."
    },
    {
      icon: Wallet,
      title: "Community Invests",
      description: "You buy tokens. Money goes directly to building the business."
    },
    {
      icon: Coffee,
      title: "Everyone Earns",
      description: "Business opens. Profits shared quarterly. Customers earn tokens."
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-background to-card/20">
      <div className="max-w-[1000px] mx-auto px-6">
        {/* Simple Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How Community Ownership Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Three simple steps to owning your local businesses
          </p>
        </motion.div>

        {/* Streamlined Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-12 left-[16.66%] right-[16.66%] h-0.5 bg-border" />

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative text-center"
                >
                  {/* Icon */}
                  <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-10 h-10 text-primary" />
                  </div>

                  {/* Step Number */}
                  <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Real Example */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-6 rounded-2xl bg-card border border-primary/10"
        >
          <div className="text-center">
            <p className="text-lg font-semibold mb-2">Real Example:</p>
            <p className="text-muted-foreground">
              Invest $1,000 → Get 1,000 tokens → Coffee shop makes $300K profit/year →
              <span className="text-primary font-bold"> You earn $1,000/year (33% profit share)</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}