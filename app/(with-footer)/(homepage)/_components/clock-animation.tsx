const ClockAnimation = () => {
  return (
    <div className="relative size-[220px] mx-auto flex items-center justify-center">
      {/* Outer ring */}
      <div
        className="absolute inset-0 rounded-full 
        bg-gradient-to-br from-gray-200 to-gray-300
        dark:from-gray-700 dark:to-gray-800
        shadow-inner
        animate-[clock-breathe_3s_ease-in-out_infinite]"
      />

      {/* Middle ring */}
      <div
        className="absolute size-[190px] rounded-full
        bg-gradient-to-br from-gray-300 to-gray-400
        dark:from-gray-600 dark:to-gray-700
        shadow-inner
        animate-[clock-breathe_3s_ease-in-out_infinite_0.15s]"
      />

      {/* Inner face */}
      <div
        className="relative size-[150px] rounded-full
        bg-gradient-to-br from-gray-100 to-gray-300
        dark:from-gray-500 dark:to-gray-600
        shadow-[inset_0_2px_6px_rgba(0,0,0,0.15)]
        flex items-center justify-center"
      >
        {/* Center pin */}
        <div className="absolute size-2 rounded-full bg-gray-600 dark:bg-gray-900 z-20" />

        {/* Minute hand */}
        <div
          className="absolute bottom-1/2 w-[3px] h-[38%]
          bg-gray-500 dark:bg-gray-900
          origin-bottom rounded-full
          animate-[spin_8s_linear_infinite]"
        />

        {/* Second hand */}
        <div
          className="absolute bottom-1/2 w-[2px] h-[46%]
          bg-gray-700 dark:bg-black
          origin-bottom rounded-full
          animate-[spin_1.2s_linear_infinite]"
        />

        {/* Skeleton content */}
        <div className="flex flex-col items-center gap-3 opacity-60">
          <div className="size-7 rounded-md bg-gray-400 dark:bg-gray-700" />
          <div className="h-3 w-20 rounded bg-gray-400 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  );
};

export default ClockAnimation;
