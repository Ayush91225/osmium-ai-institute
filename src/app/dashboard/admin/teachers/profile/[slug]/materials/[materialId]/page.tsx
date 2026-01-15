'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'
import DashboardLayout from '@/components/dashboard/shared/DashboardLayout'
import StatusChip from '@/components/dashboard/admin/StatusChip'

export default function MaterialDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { isDarkMode } = useDarkMode()
  const [mounted, setMounted] = useState(false)

  const teacherId = params.slug as string
  const materialId = params.materialId as string

  const material = {
    id: materialId,
    title: 'Wave Motion and Sound - Complete Notes',
    subject: 'Physics',
    chapter: 'Chapter 5',
    generatedBy: 'Osmium AI',
    generatedDate: '2024-01-20',
    classes: ['Grade 11A', 'Grade 11B'],
    stats: {
      views: 156,
      downloads: 89
    },
    content: `# Wave Motion and Sound

## Introduction
Wave motion is a fundamental concept in physics that describes the transfer of energy through a medium without the permanent displacement of the medium itself. This chapter explores various types of waves and their properties.

## 1. Wave Motion Fundamentals

### What is a Wave?
A wave is a disturbance that travels through space and matter, transferring energy from one place to another. Waves can be classified based on:
- Direction of particle motion
- Medium requirement
- Energy transfer mechanism

### Key Characteristics
- **Wavelength (λ)**: Distance between consecutive crests or troughs
- **Frequency (f)**: Number of oscillations per unit time
- **Amplitude (A)**: Maximum displacement from equilibrium
- **Period (T)**: Time for one complete oscillation
- **Wave Speed (v)**: v = fλ

## 2. Types of Waves

### Transverse Waves
Particles oscillate perpendicular to wave direction.
- Examples: Light waves, electromagnetic waves, waves on strings
- Can be polarized
- Require rigid medium (except EM waves)

### Longitudinal Waves
Particles oscillate parallel to wave direction.
- Examples: Sound waves, seismic P-waves
- Consist of compressions and rarefactions
- Can travel through all states of matter

## 3. Wave Properties

### Reflection
When a wave encounters a boundary, it bounces back. The angle of incidence equals the angle of reflection.

### Refraction
Change in wave direction when entering a different medium due to speed change.

### Diffraction
Bending of waves around obstacles or through openings.

### Interference
- **Constructive**: Waves combine to increase amplitude
- **Destructive**: Waves combine to decrease amplitude

### Superposition Principle
When two or more waves overlap, the resultant displacement is the sum of individual displacements.

## 4. Sound Waves

### Nature of Sound
- Longitudinal mechanical wave
- Requires medium for propagation
- Speed depends on medium properties:
  - Air (20°C): ~343 m/s
  - Water: ~1480 m/s
  - Steel: ~5000 m/s

### Sound Characteristics
- **Pitch**: Related to frequency (high frequency = high pitch)
- **Loudness**: Related to amplitude and intensity
- **Quality/Timbre**: Determined by harmonics and overtones

### Intensity and Decibel Scale
Intensity (I) = Power/Area
Sound Level (β) = 10 log₁₀(I/I₀) dB
where I₀ = 10⁻¹² W/m² (threshold of hearing)

## 5. Doppler Effect

### Concept
Apparent change in frequency due to relative motion between source and observer.

### Formula
f' = f × (v ± v₀)/(v ∓ vₛ)

Where:
- f' = observed frequency
- f = source frequency
- v = wave speed
- v₀ = observer velocity
- vₛ = source velocity

### Sign Convention
- Observer moving toward source: + in numerator
- Source moving toward observer: - in denominator

### Applications
- Radar speed detection
- Astronomical red/blue shift
- Medical ultrasound imaging
- Weather forecasting

## 6. Standing Waves

### Formation
Created by interference of two waves traveling in opposite directions with same frequency and amplitude.

### Characteristics
- **Nodes**: Points of zero displacement
- **Antinodes**: Points of maximum displacement
- Energy is not transferred

### In Strings (Both Ends Fixed)
λₙ = 2L/n, where n = 1, 2, 3...
fₙ = nv/2L = nf₁

### In Pipes
**Open Pipe**: Both ends open
λₙ = 2L/n
fₙ = nv/2L (all harmonics present)

**Closed Pipe**: One end closed
λₙ = 4L/n (n = 1, 3, 5...)
fₙ = nv/4L (only odd harmonics)

## 7. Resonance

### Definition
Phenomenon where a system oscillates with maximum amplitude at specific frequencies (natural frequencies).

### Examples
- Musical instruments
- Tacoma Narrows Bridge collapse
- Microwave ovens
- MRI machines

## Important Formulas Summary

1. Wave speed: v = fλ
2. Wave equation: y = A sin(kx - ωt + φ)
3. Wave number: k = 2π/λ
4. Angular frequency: ω = 2πf
5. Sound intensity: I = P/4πr²
6. Doppler effect: f' = f(v ± v₀)/(v ∓ vₛ)
7. Beat frequency: fbeat = |f₁ - f₂|

## Practice Problems

### Problem 1
A wave has frequency 500 Hz and wavelength 0.68 m. Calculate its speed.

**Solution:**
v = fλ = 500 × 0.68 = 340 m/s

### Problem 2
A car horn (frequency 400 Hz) approaches you at 30 m/s. What frequency do you hear? (Speed of sound = 340 m/s)

**Solution:**
f' = f × v/(v - vₛ) = 400 × 340/(340 - 30) = 438.7 Hz

### Problem 3
A string of length 0.5 m produces its fundamental frequency at 200 Hz. What is the wave speed?

**Solution:**
For fundamental: λ = 2L = 1 m
v = fλ = 200 × 1 = 200 m/s

## Key Takeaways

✓ Waves transfer energy without permanent matter displacement
✓ Transverse and longitudinal waves have distinct characteristics
✓ Sound requires a medium and travels at different speeds in different materials
✓ Doppler effect explains frequency shifts due to relative motion
✓ Standing waves form at specific resonant frequencies
✓ Understanding wave properties is crucial for many applications

## Additional Resources
- Experiment with wave simulations
- Practice more numerical problems
- Explore real-world applications
- Review related concepts: oscillations, energy transfer

---

*Generated by Osmium AI • Last updated: January 20, 2024*`
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-4">
        <nav className="flex items-center gap-1.5 text-xs">
          <button onClick={() => router.push('/dashboard/admin/teachers')} className={`hover:underline ${isDarkMode ? 'text-zinc-500' : 'text-gray-400'}`}>Teachers</button>
          <i className={`ph ph-caret-right ${isDarkMode ? 'text-zinc-600' : 'text-gray-400'}`} />
          <button onClick={() => router.push(`/dashboard/admin/teachers/profile/${teacherId}`)} className={`hover:underline ${isDarkMode ? 'text-zinc-500' : 'text-gray-400'}`}>Profile</button>
          <i className={`ph ph-caret-right ${isDarkMode ? 'text-zinc-600' : 'text-gray-400'}`} />
          <span className={`font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>Study Material</span>
        </nav>

        <div className={`p-5 rounded-xl border ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white/80 border-gray-200/60'}`}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <StatusChip status={material.subject} variant="info" />
                <StatusChip status={material.chapter} variant="default" />
                <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${isDarkMode ? 'bg-[#8C7B65]/20 text-[#8C7B65]' : 'bg-[#8C7B65]/10 text-[#8C7B65]'}`}>
                  <i className="ph ph-sparkle" />
                  {material.generatedBy}
                </div>
              </div>
              <h1 className={`text-xl font-bold mb-1 ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>{material.title}</h1>
              <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Generated: {new Date(material.generatedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
            <div className="flex gap-2">
              <button className={`px-4 py-2 rounded-xl text-sm font-medium ${isDarkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>
                <i className="ph ph-share-network mr-2" />
                Share
              </button>
              <button className="px-4 py-2 rounded-xl text-sm font-medium bg-[#8C7B65] hover:bg-[#7A6B58] text-white">
                <i className="ph ph-download-simple mr-2" />
                Download PDF
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className={`p-3 rounded-lg text-center ${isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50'}`}>
              <i className={`ph-eye text-lg mb-1 block ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`} />
              <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>Views</p>
              <p className={`text-sm font-bold ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>{material.stats.views}</p>
            </div>
            <div className={`p-3 rounded-lg text-center ${isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-50'}`}>
              <i className={`ph-download-simple text-lg mb-1 block ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`} />
              <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>Downloads</p>
              <p className={`text-sm font-bold ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>{material.stats.downloads}</p>
            </div>
          </div>
        </div>

        <div className={`p-8 rounded-xl border ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white/80 border-gray-200/60'}`}>
          <div className={`prose prose-sm max-w-none ${isDarkMode ? 'prose-invert' : ''}`} style={{
            '--tw-prose-body': isDarkMode ? '#a1a1aa' : '#4b5563',
            '--tw-prose-headings': isDarkMode ? '#e4e4e7' : '#111827',
            '--tw-prose-bold': isDarkMode ? '#e4e4e7' : '#111827',
            '--tw-prose-code': isDarkMode ? '#e4e4e7' : '#111827',
          } as any}>
            <div className={`whitespace-pre-wrap leading-relaxed ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
              {material.content}
            </div>
          </div>
        </div>

        <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800/40' : 'bg-white/80 border-gray-200/60'}`}>
          <h3 className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>Shared With</h3>
          <div className="flex flex-wrap gap-2">
            {material.classes.map((cls, i) => (
              <div key={i} className={`px-3 py-1.5 rounded-lg text-sm ${isDarkMode ? 'bg-zinc-800/30 text-zinc-300' : 'bg-gray-50 text-gray-700'}`}>
                {cls}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
