import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'imagePreview',
  standalone: true,
})
export class ImagePreviewPipe implements PipeTransform {
  transform(file: File | null): Promise<string | ArrayBuffer | null> {
    if (!file) {
      return Promise.resolve(null)
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
      reader.readAsDataURL(file)
    })
  }
}
