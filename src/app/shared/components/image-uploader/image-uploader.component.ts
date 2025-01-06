import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
  imports: [MatButtonModule, MatIconModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageUploaderComponent),
      multi: true,
    },
  ],
  standalone: true,
})
export class ImageUploaderComponent implements ControlValueAccessor {
  previewUrl: string | ArrayBuffer | null = null;
  private file: File | null = null;
  private onChange: (file: File | null) => void = () => {};
  private onTouched: () => void = () => {};

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] || null;
    this.file = file;
    this.onChange(this.file);
    this.onTouched();

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      this.previewUrl = null;
    }
  }

  clearImage(): void {
    this.file = null;
    this.previewUrl = null;
    this.onChange(this.file);
  }

  // ControlValueAccessor methods
  writeValue(file: File | null): void {
    this.file = file;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      this.previewUrl = null;
    }
  }

  registerOnChange(fn: (file: File | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Optionally handle the disabled state if needed
  }
}
