import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const steps = [
  {
    title: 'Step 1 — Take a Quick Assessment',
    description: 'Answer a short, clinically-validated questionnaire like PHQ-9 or GAD-7 to check your current mental well-being.',
  },
  {
    title: 'Step 2 — Get Your Personalized Report',
    description: 'Receive a clear and empathetic summary of your results, with an explanation of what they mean.',
  },
  {
    title: 'Step 3 — Follow Evalwell Guidance',
    description: 'Get recommended self-care activities, professional resources, and tools to help you improve and track your progress.',
  },
];

export default function ProgressWorks() {
  return (
    <section className="land py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          How Does It Work?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white/10 rounded-xl shadow-lg p-6 flex flex-col items-center  text-center"
            >
              <CheckCircleIcon className="w-12 h-12 text-[#d294fc] mb-4" />
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-500 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}