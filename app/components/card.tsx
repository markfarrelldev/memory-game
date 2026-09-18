'use client';

import Image from "next/image";

interface CardProps {
	id: number;
	imageURL: string;
	isFlipped: boolean;
	isMatched: boolean;
	onFlip: (id: number) => void;
}

export default function Card({
	id,
	imageURL,
	isFlipped,
	isMatched,
	onFlip
}: CardProps) {

	return (
		<div className="aspect-square bg-blue-500 hover:bg-blue-400 rounded-lg flex items-center justify-center">
			<button className="border-none bg-transparent p-0 cursor-pointer h-full w-full" onClick={() => onFlip(id)}>
				<Image 
					src={imageURL} 
					width={1000} 
					height={1000} 
					className={isFlipped || isMatched ? "block" : "invisible"} 
					alt="memory game image" 
				/>
			</button>
		</div>
	);
}