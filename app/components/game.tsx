'use client'

import { Card as CardType } from '@/app/lib/definitions';
import CardComponent from './card';
import shuffle from 'lodash/shuffle';
import { useState, useEffect } from 'react';

export default function Game({ initialCards }: { initialCards: CardType[]} ) {
	// Keep cards unshuffled for the initial server/client render pass
	const [ cards, setCards ] = useState<CardType[]>(initialCards);
	const [ matchOneId, setMatchOneId ] = useState<number | null>(null);
	const [ disabled, setDisabled ] = useState<boolean>(false);
	const [ winner, setWinner ] = useState<boolean>(false);

	useEffect(() => {
		// Shuffle only after mounting safely on the client
		setCards(shuffle(initialCards));
	}, []);

	const resetGame = () => {
		setCards(shuffle(initialCards));
		setMatchOneId(null);
		setDisabled(false);
		setWinner(false);
	}

	const handleFlip = (id: number) => {

		const currentCard = cards.find((card) => card.id === id);
		if (disabled || currentCard?.isFlipped || currentCard?.isMatched) return;
		
		setCards((prevCards) =>
			prevCards.map((card) => (card.id === id ? { ...card, isFlipped: true } : card))
		);

		if (matchOneId === null) {
			setMatchOneId(id);
		} else {
			// check for match
			const cardOne = cards.find((card) => card.id === matchOneId);
			const cardTwo = cards.find((card) => card.id === id);

			if (!cardOne || !cardTwo) return;
			
			if (cardOne.imageURL === cardTwo.imageURL){
				// MATCH found: Mark them as matched immediately
				setCards((prevCards) => 
					prevCards.map((card) => 
						card.id === matchOneId || card.id === id ? { ...card, isMatched: true } : card)
				);

				// Check for win using the current state values
				// Find all cards that aren't matched yet, ignoring the 2 we just matched
				const remainingUnmatched = cards.filter(
					(card) => !card.isMatched && card.id != matchOneId && card.id != id
				);

				if (remainingUnmatched.length === 0) {
					// No unmatched cards remaining, declare winner
					setWinner(true);
				}
			} else {
				// MISMATCH: Lock the board so user can't spam click other cards
				setDisabled(true);

				setTimeout(() => {
					setCards((prevCards) =>
						prevCards.map((card) => 
							card.id === matchOneId || card.id === id ? { ...card, isFlipped: false } : card)
					);
					// Reset the state and unlock the board after 1 second
					setMatchOneId(null);
					setDisabled(false);
				}, 1000);
				
			}

			setMatchOneId(null);
		}
	};

	return (
		<>
			<div className={`${winner ? "block" : "hidden"} fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm`}>
				<div className="w-full max-w-md rounded-lg p-6 shadow-xl bg-gray-800">
					<h1 className="text-lg font-semibold text-white">Winner!!</h1>
					<p className="mt-2 text-sm text-gray-300">
						You found all of the matches. Would you like to play again?
					</p>
					<div className="mt-4 flex justify-end">
						<button 
							id="play-again" 
							className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
							onClick={() => resetGame()}>Play Again
						</button>
					</div>
				</div>
			</div>
			<div className="grid grid-cols-3 grid-rows-4 sm:grid-cols-4 sm:grid-rows-3 gap-3 max-w-5xl max-h-full aspect-auto">
				{cards.map((card) => (
					<CardComponent 
						key={card.id}
						id={card.id} 
						imageURL={card.imageURL} 
						isFlipped={card.isFlipped} 
						isMatched={card.isMatched}
						onFlip={handleFlip} 
					/>
				))}
			</div>
		</>
	);
}