'use client';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

const SwipableCard = ({ images }) => {
  const [currentCards, setCurrentCards] = useState(images.map((img, index) => ({
    ...img,
    uniqueId: index
  })));

  const handleCardRemove = (card, direction) => {
    // You can add any additional logic here when a card is removed
    console.log(`Card removed: ${direction}`);
  };

  const Card = ({ card, index, totalCards }) => {
    const x = useMotionValue(0);
    const rotateRaw = useTransform(x, [-150, 150], [-15, 15]);
    const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
    const isFront = index === totalCards - 1;

    const rotate = useTransform(() => {
      const offset = isFront ? 0 : ((index % 2) ? 6 : -6);
      return `${rotateRaw.get() + offset}deg`;
    });

    const handleDragEnd = () => {
      if (Math.abs(x.get()) > 50) {
        const direction = x.get() > 0 ? 'right' : 'left';
        const targetX = direction === 'right' ? 150 : -150;
        
        Promise.all([
          animate(x, targetX, {
            duration: 0.15,
            ease: "easeOut"
          }),
          animate(opacity, 0, {
            duration: 0.15,
            ease: "easeOut"
          })
        ]).then(() => {
          setCurrentCards((prevCards) => prevCards.filter((c) => c.uniqueId !== card.uniqueId));
          handleCardRemove(card, direction);
        });
      } else {
        animate(x, 0, { 
          duration: 0.15,
          ease: "easeOut"
        });
        animate(opacity, 1, {
          duration: 0.15,
          ease: "easeOut"
        });
      }
    };

    return (
      <motion.div
        className="absolute w-full h-full"
        style={{
          x,
          rotate,
          opacity,
          zIndex: index + 1,
        }}
        animate={{
          scale: isFront ? 1 : 0.98 - (totalCards - index - 1) * 0.02,
        }}
        drag={isFront ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        dragElastic={0.7}
        dragMomentum={false}
      >
        <div className="relative h-full w-full rounded-lg overflow-hidden shadow-lg">
          <Image
            src={card.src}
            alt={card.alt}
            fill
            className="object-cover"
          />
        </div>
      </motion.div>
    );
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative h-64 w-full">
        {currentCards.map((card, index) => (
          <Card
            key={card.uniqueId}
            card={card}
            index={index}
            totalCards={currentCards.length}
          />
        ))}
      </div>
      <motion.div
        className="flex items-center gap-2 text-gray-500"
        animate={{
          x: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
        <span className="text-sm">Swipe to explore</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default SwipableCard; 