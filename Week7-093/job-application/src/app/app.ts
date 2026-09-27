import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './app.html',
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      padding: 40px 20px;
      background: #f3f4f6;
      font-family: Arial, sans-serif;
    }

    .form-box {
      max-width: 700px;
      margin: 0 auto;
      background: #fff;
      padding: 24px;
      border-radius: 16px;
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
    }

    h2 {
      margin: 0 0 20px;
      text-align: center;
      color: #111827;
    }

    form {
      display: grid;
      gap: 16px;
    }

    .row {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
    }

    label {
      display: block;
      margin-bottom: 6px;
      font-weight: 600;
      color: #374151;
    }

    input, select, textarea {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      font-size: 14px;
      box-sizing: border-box;
    }

    textarea {
      min-height: 110px;
      resize: vertical;
    }

    button {
      padding: 12px;
      border: none;
      border-radius: 10px;
      background: #2563eb;
      color: white;
      font-weight: 600;
      cursor: pointer;
    }

    .error {
      color: #dc2626;
      font-size: 12px;
      margin: 5px 0 0;
    }

    @media (max-width: 600px) {
      .row {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class App {
  jobForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    position: ['', Validators.required],
    qualification: ['', Validators.required],
    experience: ['', Validators.required],
    skills: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    if (this.jobForm.valid) {
      console.log(this.jobForm.value);
      alert('Application submitted successfully!');
      this.jobForm.reset();
      return;
    }

    this.jobForm.markAllAsTouched();
  }
}