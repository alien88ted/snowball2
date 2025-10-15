"use client"

import { motion } from "framer-motion"
import { Users, Building, Banknote, TrendingDown } from "lucide-react"

export function WhyThisMatters() {
  return (
    <section className="py-20 bg-gradient-to-b from-card/20 to-background">
      <div className="max-w-[1000px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          {/* The Problem */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              The Problem With Local Business Today
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mt-8 text-left">
              <div className="p-6 rounded-xl bg-red-50 border border-red-200">
                <Building className="w-8 h-8 text-red-600 mb-3" />
                <h3 className="font-bold mb-2">For Business Owners</h3>
                <p className="text-muted-foreground">
                  Bank loans require collateral. VCs want 51% control.
                  Most businesses never get funded.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-orange-50 border border-orange-200">
                <TrendingDown className="w-8 h-8 text-orange-600 mb-3" />
                <h3 className="font-bold mb-2">For Communities</h3>
                <p className="text-muted-foreground">
                  Your favorite places close. Chains replace local shops.
                  Communities lose their character.
                </p>
              </div>
            </div>
          </div>

          {/* The Solution */}
          <div className="relative">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">
                Community Ownership Changes Everything
              </h3>

              <div className="grid md:grid-cols-3 gap-6 text-left mt-8">
                <div>
                  <Banknote className="w-6 h-6 text-green-600 mb-2" />
                  <p className="font-semibold mb-1">Businesses Get Funded</p>
                  <p className="text-sm text-muted-foreground">
                    Raise from customers who believe in them
                  </p>
                </div>
                <div>
                  <Users className="w-6 h-6 text-blue-600 mb-2" />
                  <p className="font-semibold mb-1">Communities Invest</p>
                  <p className="text-sm text-muted-foreground">
                    Own the places you love, earn when they succeed
                  </p>
                </div>
                <div>
                  <Building className="w-6 h-6 text-purple-600 mb-2" />
                  <p className="font-semibold mb-1">Local Thrives</p>
                  <p className="text-sm text-muted-foreground">
                    Money stays local, character preserved
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* The Impact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center p-6 rounded-xl bg-green-50 border border-green-200"
          >
            <p className="text-lg font-semibold text-green-800">
              "Imagine if every dollar you spent at your local coffee shop
              <span className="block text-2xl mt-2">made you a part owner."</span>
            </p>
            <p className="text-green-700 mt-3">
              That's the future we're building.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}