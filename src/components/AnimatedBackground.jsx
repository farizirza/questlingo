import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-background" />
      {/* Subtle dot pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '30px 30px' }}
      />
      
      {/* Vibrant Orbs */}
      <div
        className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full opacity-[0.2]"
        style={{ background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)' }}
      />
      
      <div
        className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full opacity-[0.2]"
        style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
      />

      <div
        className="absolute top-[40%] left-[60%] w-[30vw] h-[30vw] rounded-full opacity-[0.15]"
        style={{ background: 'radial-gradient(circle, var(--success) 0%, transparent 70%)' }}
      />
    </div>
  );
}
