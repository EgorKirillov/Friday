import { CardType } from '../../features/cards/cardsAPI'

export const getCardFromArray = (cards: CardType[]) => {
  const sum = cards.reduce((acc, card) => acc + (6 - card.grade) ** 3, 0)
  const rand = Math.random() * sum
  const res = cards.reduce(
    (acc: { sum: number; id: number }, card, i) => {
      const newSum = acc.sum + (6 - card.grade) ** 3

      return { sum: newSum, id: newSum < rand ? i : acc.id }
    },
    { sum: 0, id: -1 }
  )

  return cards[res.id + 1]
}
