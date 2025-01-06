import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core'

import { IBook } from '../models/book.model'
import { Books } from '../../data/books'

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private _books: WritableSignal<IBook[]> = signal<IBook[]>(Books)
  public books: Signal<IBook[]> = computed(() => {
    return this._books()
  })

  getAllBooks() {
    this._books.update(() => [...Books])
  }

  getBookById(bookId: number): IBook {
    const bookIndex = this.books().findIndex((book) => book.id === bookId)
    if (bookIndex === -1) {
      throw new Error('No book by such id')
    }

    return this._books()[bookIndex]
  }

  getBooksByTitleOrAuthor(query: string) {
    this._books.update(() => [
      ...Books.filter(
        (book) =>
          book.title.toLowerCase().includes(query.toLowerCase()) ||
          book.author.toLowerCase().includes(query.toLowerCase()),
      ),
    ])
  }

  addBook(newBook: Omit<IBook, 'id'>): void {
    Books.push({ ...newBook, id: Math.floor(Math.random() * 1000) })
    this._books.update(() => [...Books])
  }

  updateBook(bookId: number, updatedBook: IBook): void {
    const bookIndex = Books.findIndex((book) => book.id === bookId)
    if (bookIndex !== -1) {
      Books[bookIndex] = {
        ...updatedBook,
      }
    }
    this._books.update(() => [...Books])
  }

  deleteBook(bookId: number): void {
    const bookIndex = Books.findIndex((book) => book.id === bookId)
    if (bookIndex !== -1) {
      Books.splice(bookIndex, 1)
    }
    this._books.update(() => [...this.books().filter((book) => book.id !== bookId)])
  }
}
