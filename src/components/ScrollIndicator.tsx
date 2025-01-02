import { useEffect, useRef } from 'react';

export const ScrollIndicator = () => {
  const indicatorRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const ballsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const container = indicatorRef.current;
    const progress = progressRef.current;
    
    if (!container || !progress || sections.length === 0) return;

    // Create balls for each section
    sections.forEach((_, index) => {
      const ball = document.createElement('div');
      ball.className = 'w-3 h-3 bg-purple-300 rounded-full transition-all duration-300 cursor-pointer hover:scale-125';
      ball.style.position = 'absolute';
      ball.style.right = '0';
      ball.addEventListener('click', () => {
        sections[index].scrollIntoView({ behavior: 'smooth' });
      });
      container.appendChild(ball);
      ballsRef.current.push(ball);
    });

    // Update balls position
    const updateBallsPosition = () => {
      const containerHeight = container.clientHeight;
      const spacing = containerHeight / (sections.length - 1);
      
      ballsRef.current.forEach((ball, index) => {
        ball.style.top = `${spacing * index}px`;
      });
    };

    // Handle scroll
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;

      // Update progress bar
      progress.style.height = `${scrollPercent * 100}%`;

      // Update balls
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const ball = ballsRef.current[index];

        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          ball.classList.add('scale-150', 'bg-purple-500');
        } else {
          ball.classList.remove('scale-150', 'bg-purple-500');
        }
      });
    };

    // Initial setup
    updateBallsPosition();
    handleScroll();

    // Event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateBallsPosition);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateBallsPosition);
      ballsRef.current.forEach(ball => ball.remove());
      ballsRef.current = [];
    };
  }, []);

  return (
    <div 
      ref={indicatorRef}
      className="fixed right-8 top-1/2 -translate-y-1/2 h-64 w-6 z-50"
    >
      <div className="absolute right-[11px] h-full w-0.5 bg-purple-300/20" />
      <div 
        ref={progressRef}
        className="absolute right-[11px] w-0.5 bg-purple-500 transition-all duration-300"
        style={{ height: '0%' }}
      />
    </div>
  );
};
