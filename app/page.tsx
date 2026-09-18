import Image from "next/image";
import Game from '@/app/components/game';
import { Card } from '@/app/lib/definitions';

export default function Home() {

  const cards: Card[] = [
    { id: 0, imageURL: '/pig.png', isFlipped: false, isMatched: false },
    { id: 1, imageURL: '/pig.png', isFlipped: false, isMatched: false },
    { id: 2, imageURL: '/cat.png', isFlipped: false, isMatched: false },
    { id: 3, imageURL: '/cat.png', isFlipped: false, isMatched: false },
    { id: 4, imageURL: '/cow.png', isFlipped: false, isMatched: false },
    { id: 5, imageURL: '/cow.png', isFlipped: false, isMatched: false },
    { id: 6, imageURL: '/dog.png', isFlipped: false, isMatched: false },
    { id: 7, imageURL: '/dog.png', isFlipped: false, isMatched: false },
    { id: 8, imageURL: '/horse.png', isFlipped: false, isMatched: false },
    { id: 9, imageURL: '/horse.png', isFlipped: false, isMatched: false },
    { id: 10, imageURL: '/bunny.png', isFlipped: false, isMatched: false },
    { id: 11, imageURL: '/bunny.png', isFlipped: false, isMatched: false }
  ];

  return (
    <Game initialCards={cards}/>
  );
}
