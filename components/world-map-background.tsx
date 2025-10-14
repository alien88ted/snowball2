"use client"

export function WorldMapBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* World map with proper paths */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 500"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className="[stop-color:hsl(var(--primary))]" stopOpacity="0.6" />
            <stop offset="50%" className="[stop-color:hsl(var(--accent))]" stopOpacity="0.5" />
            <stop offset="100%" className="[stop-color:hsl(var(--primary))]" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="mapFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className="[stop-color:hsl(var(--primary))]" stopOpacity="0.08" />
            <stop offset="50%" className="[stop-color:hsl(var(--accent))]" stopOpacity="0.05" />
            <stop offset="100%" className="[stop-color:hsl(var(--primary))]" stopOpacity="0.08" />
          </linearGradient>
        </defs>

        <g fill="url(#mapFill)" stroke="url(#mapGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* North America */}
          <path d="M 80,80 Q 90,70 100,75 Q 110,80 115,90 Q 120,100 130,105 Q 140,110 145,120 Q 150,130 155,140 Q 160,150 165,155 Q 170,160 170,170 Q 170,180 165,185 Q 160,190 155,195 Q 150,200 145,200 Q 140,200 135,195 Q 130,190 125,185 Q 120,180 115,175 Q 110,170 105,165 Q 100,160 95,155 Q 90,150 85,145 Q 80,140 75,135 Q 70,130 70,120 Q 70,110 75,100 Z" />
          <path d="M 100,60 Q 110,55 120,60 Q 130,65 135,75 Q 140,85 145,90 Q 150,95 155,95 Q 160,95 165,90 Q 170,85 175,80 Q 180,75 185,75 Q 190,75 195,80" />

          {/* South America */}
          <path d="M 165,210 Q 170,220 175,230 Q 180,240 185,250 Q 190,260 190,270 Q 190,280 185,290 Q 180,300 175,305 Q 170,310 165,315 Q 160,320 155,320 Q 150,320 145,315 Q 140,310 138,300 Q 136,290 138,280 Q 140,270 142,260 Q 144,250 148,240 Q 152,230 157,220 Z" />

          {/* Europe */}
          <path d="M 460,90 Q 470,85 480,90 Q 490,95 495,105 Q 500,115 505,120 Q 510,125 515,128 Q 520,131 525,130 Q 530,129 535,125 Q 540,121 545,115 Q 550,109 555,105" />
          <path d="M 480,100 Q 485,110 490,115 Q 495,120 500,122 Q 505,124 510,123 Q 515,122 520,118" />

          {/* Africa */}
          <path d="M 490,150 Q 495,160 500,170 Q 505,180 508,190 Q 511,200 512,210 Q 513,220 512,230 Q 511,240 508,250 Q 505,260 502,268 Q 499,276 495,283 Q 491,290 485,295 Q 479,300 473,298 Q 467,296 462,290 Q 457,284 454,276 Q 451,268 449,258 Q 447,248 447,238 Q 447,228 449,218 Q 451,208 454,198 Q 457,188 462,180 Q 467,172 473,165 Q 479,158 485,155 Z" />

          {/* Asia */}
          <path d="M 550,90 Q 560,85 570,88 Q 580,91 590,97 Q 600,103 610,110 Q 620,117 630,123 Q 640,129 650,133 Q 660,137 670,138 Q 680,139 690,137 Q 700,135 710,130 Q 720,125 728,118 Q 736,111 743,103 Q 750,95 755,88" />
          <path d="M 590,110 Q 595,120 600,128 Q 605,136 610,142 Q 615,148 622,152 Q 629,156 637,157 Q 645,158 653,156 Q 661,154 668,149 Q 675,144 681,137 Q 687,130 691,122" />
          <path d="M 650,140 Q 655,150 658,160 Q 661,170 662,180 Q 663,190 661,200 Q 659,210 655,218 Q 651,226 645,232" />

          {/* India subcontinent */}
          <path d="M 600,160 Q 605,170 608,180 Q 611,190 612,200 Q 613,210 611,220 Q 609,230 605,238 Q 601,246 595,252" />

          {/* Southeast Asia */}
          <path d="M 650,180 Q 655,185 660,188 Q 665,191 670,192 Q 675,193 680,191 Q 685,189 690,185" />
          <path d="M 670,195 Q 673,200 675,205 Q 677,210 678,215" />

          {/* Australia */}
          <path d="M 730,270 Q 740,265 750,268 Q 760,271 768,278 Q 776,285 781,293 Q 786,301 788,310 Q 790,319 788,328 Q 786,337 781,344 Q 776,351 768,355 Q 760,359 750,359 Q 740,359 731,355 Q 722,351 715,344 Q 708,337 704,328 Q 700,319 699,310 Q 698,301 700,292 Q 702,283 707,276 Q 712,269 720,265 Z" />

          {/* Japan */}
          <path d="M 730,100 Q 735,95 740,97 Q 745,99 748,104 Q 751,109 752,115 Q 753,121 751,127 Q 749,133 745,137" />

          {/* Grid lines for effect */}
          <g opacity="0.15" stroke="url(#mapGradient)">
            {Array.from({ length: 20 }).map((_, i) => (
              <line key={`h-${i}`} x1="0" y1={i * 25} x2="1000" y2={i * 25} strokeWidth="0.3" />
            ))}
            {Array.from({ length: 40 }).map((_, i) => (
              <line key={`v-${i}`} x1={i * 25} y1="0" x2={i * 25} y2="500" strokeWidth="0.3" />
            ))}
          </g>
        </g>
      </svg>

      {/* Gentle vignetting for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/10 via-transparent to-background/10" />
    </div>
  )
}
