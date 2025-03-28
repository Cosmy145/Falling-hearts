import { useState, useEffect } from 'react';
 
type FallingItem = {
 id: number;
 type: 'heart' | 'rose';
 x: number;
 y: number;
 speed: number;
};

const HeartsAndRosesFalling = () => {
 const [fallingItems, setFallingItems] = useState<FallingItem[]>([]);

 useEffect(() => {
 const createFallingItem = () => {
 const type = Math.random() > 0.5 ? 'heart' : 'rose';
 const x = Math.random() * window.innerWidth;
 const speed = 2 + Math.random() * 3;
 const id = Date.now() + Math.random();

 setFallingItems((prevItems) => [
 ...prevItems,
 { id, type, x, y: 0, speed },
 ]);
 };

 const intervalId = setInterval(createFallingItem, 200);

 return () => clearInterval(intervalId);
 }, []);

 useEffect(() => {
 const animateFallingItems = () => {
 setFallingItems((prevItems) =>
 prevItems.map((item) => {
 const newY = item.y + item.speed;
 if (newY > window.innerHeight) {
 return { ...item, y: 0, x: Math.random() * window.innerWidth };
 }
 return { ...item, y: newY };
 })
 );
 };

 const animationFrameId = requestAnimationFrame(function animate() {
 animateFallingItems();
 requestAnimationFrame(animate);
 });

 return () => cancelAnimationFrame(animationFrameId);
 }, []);

 return (
 <div className="relative h-screen w-screen bg-red-100 overflow-hidden">
 {/* Big Heart */}
 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500 text-[15rem]">
 🫀
 </div>

 {/* Falling Items */}
 {fallingItems.map((item) => (
 <div
 key={item.id}
 className="absolute"
 style={{
 left: `${item.x}px`,
 top: `${item.y}px`,
 fontSize: '2rem',
 }}
 >
 {item.type === 'heart' ? '❤️' : '🌹'}
 </div>
 ))}
 </div>
 );
};

export default HeartsAndRosesFalling;