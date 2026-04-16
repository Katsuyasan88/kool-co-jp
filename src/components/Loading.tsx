import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="relative">
        {/* Animated Rings */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
          className="w-20 h-20 border-[3px] border-primary/20 border-t-primary rounded-full"
        />
        
        {/* Pulsing Logo or Icon in middle */}
        <motion.div
           initial={{ scale: 0.8, opacity: 0.5 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{
             duration: 1,
             repeat: Infinity,
             repeatType: "reverse"
           }}
           className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-8 h-8 bg-secondary rounded-lg shadow-lg rotate-45" />
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-xs font-bold tracking-[0.2em] text-primary uppercase whitespace-nowrap"
        >
          Loading...
        </motion.p>
      </div>
    </div>
  );
};

export default Loading;
