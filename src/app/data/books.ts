import { IBook } from '../shared/models/book.model'

export const Books: IBook[] = [
  {
    id: Math.floor(Math.random() * 1000),
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    publication: 'Little, Brown and Company',
    year: 1951,
    description: 'A novel about teenage rebellion and alienation told through the perspective of Holden Caulfield.',
    coverImage: null,
  },
  {
    id: Math.floor(Math.random() * 1000),
    title: 'Brave New World',
    author: 'Aldous Huxley',
    publication: 'Chatto & Windus',
    year: 1932,
    description:
      'A dystopian science fiction novel exploring a technologically advanced society controlled by conditioning.',
    coverImage: null,
  },
  {
    id: Math.floor(Math.random() * 1000),
    title: 'Brave New World',
    author: 'Aldous Huxley',
    publication: 'Chatto & Windus',
    year: 1932,
    description:
      'A dystopian science fiction novel exploring a technologically advanced society controlled by conditioning.',
    coverImage: null,
  },
  {
    id: Math.floor(Math.random() * 1000),
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    publication: 'George Allen & Unwin',
    year: 1937,
    description: "A fantasy novel about Bilbo Baggins' quest to reclaim treasure guarded by a dragon.",
    coverImage: null,
  },
  {
    id: Math.floor(Math.random() * 1000),
    title: '1984',
    author: 'George Orwell',
    publication: 'Secker & Warburg',
    year: 1949,
    description: 'A dystopian novel that delves into the dangers of totalitarianism and extreme surveillance.',
    coverImage: null,
  },
  {
    id: Math.floor(Math.random() * 1000),
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    publication: 'J.B. Lippincott & Co.',
    year: 1960,
    description: 'A novel that explores the racial injustice and loss of innocence in the Deep South.',
    coverImage: null,
  },
]
