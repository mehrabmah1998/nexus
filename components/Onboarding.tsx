import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { SectionBackground } from './UIElements';

import Step1Welcome from './onboarding/Step1Welcome';
import Step2Goal from './onboarding/Step2Goal';
import Step3Thinking from './onboarding/Step3Thinking';
import Step4Scaffold from './onboarding/Step4Scaffold';
import Step5Launch from './onboarding/Step5Launch';

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState('');

  // Background color temperature shift based on step
  const getBgColor = () => {
    switch(step) {
      case 1: return 'bg-blue-900/10';
      case 2: return 'bg-indigo-900/10';
      case 3: return 'bg-purple-900/10';
      case 4: return 'bg-fuchsia-900/10';
      case 5: return 'bg-rose-900/10';
      default: return 'bg-blue-900/10';
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#07070a] overflow-hidden selection:bg-white/30 selection:text-white p-6" dir="rtl">
      {/* Backgrounds */}
      <SectionBackground fadeTop={false} fadeBottom={false} />
      
      {/* Color Temperature Overlay */}
      <div className={`absolute inset-0 z-[5] mix-blend-screen transition-colors duration-1000 ease-in-out ${getBgColor()}`} />

      {/* Minimal Progress Line */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/5 z-50">
        <div 
          className="h-full bg-white transition-all duration-1000 ease-out"
          style={{ width: `${(step / 5) * 100}%` }}
        />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {step === 1 && <Step1Welcome key="step1" onNext={() => setStep(2)} />}
          {step === 2 && <Step2Goal key="step2" goal={goal} setGoal={setGoal} onNext={() => setStep(3)} />}
          {step === 3 && <Step3Thinking key="step3" onNext={() => setStep(4)} />}
          {step === 4 && <Step4Scaffold key="step4" onNext={() => setStep(5)} />}
          {step === 5 && <Step5Launch key="step5" onComplete={onComplete} />}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Onboarding;
