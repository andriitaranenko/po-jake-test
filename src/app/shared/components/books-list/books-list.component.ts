import { trigger, transition, useAnimation } from '@angular/animations'
import { AsyncPipe } from '@angular/common'
import { Component, inject, output, OutputEmitterRef, Signal } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatDialogModule, MatDialog } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'

import { itemEnterAnimation, itemLeaveAnimation, listAnimation } from '../../animations/book.animation'
import { IBook, IBookDialogConfig } from '../../models/book.model'
import { ImagePreviewPipe } from '../../pipes/image.pipe'
import { BookService } from '../../services/book.service'
import { BookDialogComponent } from '../book-dialog/book-dialog.component'

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    ImagePreviewPipe,
    AsyncPipe,
  ],
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.scss',
  animations: [
    trigger('itemAnimation', [
      transition(':enter', [useAnimation(itemEnterAnimation)]),
      transition(':leave', [useAnimation(itemLeaveAnimation)]),
    ]),
    trigger('listAnimation', [transition(':enter', [useAnimation(listAnimation)])]),
  ],
})
export class BooksListComponent {
  private readonly bookService: BookService = inject(BookService)
  private readonly dialogService: MatDialog = inject(MatDialog)

  booksUpdated: OutputEmitterRef<void> = output<void>()

  books: Signal<IBook[]> = this.bookService.books

  openPreviewDialog(book: IBook): void {
    const dialogReference = this.dialogService.open<BookDialogComponent, IBookDialogConfig>(BookDialogComponent, {
      data: {
        isEdit: false,
        book,
      },
      autoFocus: false,
      width: '600px',
    })

    dialogReference.afterClosed().subscribe(() => {
      this.booksUpdated.emit()
    })
  }

  openEditDialog(event: MouseEvent, book: IBook): void {
    event.stopPropagation()
    const dialogReference = this.dialogService.open<BookDialogComponent, IBookDialogConfig>(BookDialogComponent, {
      data: {
        isEdit: true,
        book,
      },
      autoFocus: false,
      width: '600px',
    })

    dialogReference.afterClosed().subscribe(() => {
      dialogReference.afterClosed().subscribe(() => {
        this.booksUpdated.emit()
      })
    })
  }

  deleteBook(event: MouseEvent, bookId: number): void {
    event.stopPropagation()
    this.bookService.deleteBook(bookId)
  }
}
