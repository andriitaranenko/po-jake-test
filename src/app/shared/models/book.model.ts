export interface IBook {
  id: number
  title: string
  author: string
  publication: string
  year: number
  description: string
  coverImage: File | null
}

export interface IBookDialogConfig {
  isEdit: boolean
  book?: IBook
}
