import { Component, OnInit, Signal, inject } from '@angular/core'
import { ReactiveFormsModule, FormControl } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatDialogModule, MatDialog } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { debounceTime, tap, filter, distinctUntilChanged } from 'rxjs'

import { BookDialogComponent } from '../../shared/components/book-dialog/book-dialog.component'
import { BooksListComponent } from '../../shared/components/books-list/books-list.component'
import { BookService } from '../../shared/services/book.service'
import { IBook, IBookDialogConfig } from '../../shared/models/book.model'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    BooksListComponent,
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  animations: [],
})
export default class HomePage implements OnInit {
  private readonly bookService: BookService = inject(BookService)
  private readonly dialogService: MatDialog = inject(MatDialog)

  books: Signal<IBook[]> = this.bookService.books
  searchControl: FormControl<string | null> = new FormControl<string>('')

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap((query) => (query === '' ? this.resetSearch() : false)),
        filter((query) => query !== null && query.length >= 3),
      )
      .subscribe((query) => {
        this.bookService.getBooksByTitleOrAuthor(query!)
      })
  }

  resetSearch(event?: Event): void {
    event?.preventDefault()
    this.searchControl.setValue('')
    this.bookService.getAllBooks()
  }

  openCreateDialog(): void {
    const dialogReference = this.dialogService.open<BookDialogComponent, IBookDialogConfig>(BookDialogComponent, {
      data: {
        isEdit: true,
      },
      autoFocus: false,
      width: '600px',
    })

    dialogReference.afterClosed().subscribe(() => {
      this.resetSearch()
    })
  }
}
