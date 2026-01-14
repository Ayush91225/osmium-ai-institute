interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
}

export default function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  const steps = [
    { number: 1, label: 'Type' },
    { number: 2, label: 'Info' },
    { number: 3, label: 'Signatory' },
    { number: 4, label: 'Setup' }
  ]

  return (
    <div className="step-indicator">
      {steps.map((step) => (
        <div 
          key={step.number}
          className={`step ${
            step.number < currentStep ? 'completed' : 
            step.number === currentStep ? 'active' : ''
          }`}
        >
          <div className="step-number">{step.number}</div>
          <span>{step.label}</span>
        </div>
      ))}
    </div>
  )
}