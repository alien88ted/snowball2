      {/* Products & How It Works - Transparent Blended Section */}
      <section
        ref={coffeeTrigger.ref as any}
        className="relative -mt-20 py-24 px-6 overflow-visible"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-4 text-gray-900">
              Live Investment Opportunities
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real businesses, real returns. Start with $100.
            </p>
          </div>

          {/* Product Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {/* Coffee Card */}
            <div className={`group relative transition-all duration-700 ${
              coffeeTrigger.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="relative bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-gray-200/30 hover:bg-white/80 hover:border-blue-200/50 hover:shadow-2xl transition-all">
                {/* Live Badge */}
                <div className="absolute -top-2 -right-2 bg-green-50 border border-green-200 rounded-full px-2 py-1 text-xs font-medium text-green-700 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  Live
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center mb-4 text-2xl">
                  ☕
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">$COFFEE</h3>
                <p className="text-sm text-gray-600 mb-4">Beirut specialty coffee shop with employee ownership model</p>

                {/* Metrics */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">APY</span>
                    <span className="font-semibold text-gray-900">33%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Min Investment</span>
                    <span className="font-semibold text-gray-900">$100</span>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>84% Funded</span>
                    <span>$420K / $500K</span>
                  </div>
                  <div className="h-2 bg-gray-200/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-1000"
                      style={{ width: coffeeTrigger.isVisible ? '84%' : '0%' }}
                    />
                  </div>
                </div>

                {/* CTA */}
                <Link href="/explorer/coffee">
                  <button className="w-full py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                    View Details →
                  </button>
                </Link>
              </div>
            </div>

            {/* Coming Soon Cards */}
            {['Gym', 'Bakery'].map((item, i) => (
              <div key={item} className={`group relative transition-all duration-700 delay-${(i + 1) * 100} ${
                coffeeTrigger.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <div className="relative bg-white/50 backdrop-blur-md rounded-2xl p-6 border border-gray-200/20 opacity-60">
                  {/* Coming Soon Badge */}
                  <div className="absolute -top-2 -right-2 bg-gray-100 border border-gray-200 rounded-full px-2 py-1 text-xs font-medium text-gray-600">
                    Coming Soon
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mb-4 text-2xl opacity-50">
                    {item === 'Gym' ? '💪' : '🥐'}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-700 mb-2">${item.toUpperCase()}</h3>
                  <p className="text-sm text-gray-500 mb-4">Details coming soon...</p>

                  {/* Placeholder Button */}
                  <button className="w-full py-2.5 bg-gray-200 text-gray-500 rounded-lg text-sm font-medium cursor-not-allowed">
                    Notify Me
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* How It Works - Clean Doodles */}
          <div className="relative">
            <h3 className="text-2xl font-serif text-center mb-12 text-gray-900">How It Works</h3>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Choose Investment',
                  description: 'Browse vetted local businesses',
                  doodle: (
                    <svg className="w-full h-24 mb-4" viewBox="0 0 200 100">
                      <circle cx="50" cy="50" r="30" fill="none" stroke="rgb(99, 102, 241)" strokeWidth="2" strokeDasharray="5,5" opacity="0.3"/>
                      <circle cx="100" cy="50" r="30" fill="none" stroke="rgb(168, 85, 247)" strokeWidth="2" strokeDasharray="5,5" opacity="0.3"/>
                      <circle cx="150" cy="50" r="30" fill="none" stroke="rgb(236, 72, 153)" strokeWidth="2" strokeDasharray="5,5" opacity="0.3"/>
                      <path d="M 80 50 L 120 50" stroke="rgb(156, 163, 175)" strokeWidth="1.5" markerEnd="url(#arrow)" opacity="0.5"/>
                      <defs>
                        <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                          <path d="M0,0 L0,6 L9,3 z" fill="rgb(156, 163, 175)" opacity="0.5"/>
                        </marker>
                      </defs>
                    </svg>
                  )
                },
                {
                  step: '02',
                  title: 'Buy Tokens',
                  description: 'Start with as little as $100',
                  doodle: (
                    <svg className="w-full h-24 mb-4" viewBox="0 0 200 100">
                      <rect x="60" y="30" width="80" height="40" rx="8" fill="none" stroke="rgb(34, 197, 94)" strokeWidth="2" strokeDasharray="5,5" opacity="0.3"/>
                      <text x="100" y="55" textAnchor="middle" fill="rgb(34, 197, 94)" fontSize="24" fontWeight="bold" opacity="0.5">$$$</text>
                      <path d="M 100 70 L 100 85" stroke="rgb(156, 163, 175)" strokeWidth="1.5" markerEnd="url(#arrow2)" opacity="0.5"/>
                      <defs>
                        <marker id="arrow2" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto" markerUnits="strokeWidth">
                          <path d="M0,0 L5,5 L10,0" stroke="rgb(156, 163, 175)" strokeWidth="1.5" fill="none" opacity="0.5"/>
                        </marker>
                      </defs>
                    </svg>
                  )
                },
                {
                  step: '03',
                  title: 'Earn Monthly',
                  description: 'Receive profit distributions',
                  doodle: (
                    <svg className="w-full h-24 mb-4" viewBox="0 0 200 100">
                      <path d="M 40 60 Q 100 20, 160 60" fill="none" stroke="rgb(251, 146, 60)" strokeWidth="2" strokeDasharray="5,5" opacity="0.3"/>
                      <circle cx="100" cy="40" r="3" fill="rgb(251, 146, 60)" opacity="0.5"/>
                      <path d="M 100 40 L 100 20 M 95 25 L 100 20 L 105 25" stroke="rgb(251, 146, 60)" strokeWidth="1.5" fill="none" opacity="0.5"/>
                      <text x="100" y="80" textAnchor="middle" fill="rgb(156, 163, 175)" fontSize="12" opacity="0.5">Returns</text>
                    </svg>
                  )
                }
              ].map((item, i) => (
                <div key={i} className={`text-center transition-all duration-700 delay-${i * 200} ${
                  coffeeTrigger.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                  {item.doodle}
                  <div className="text-4xl font-light text-gray-300 mb-2">{item.step}</div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>