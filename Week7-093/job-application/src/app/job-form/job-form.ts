import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-job-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './job-form.html',
  styleUrl: './job-form.css'
})
export class JobFormComponent {

  jobForm: FormGroup;

  constructor(private fb: FormBuilder) {

    this.jobForm = this.fb.group({

      name: ['', Validators.required],

      email: ['', [
        Validators.required,
        Validators.email
      ]],

      phone: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
      ]],

      position: ['', Validators.required],

      qualification: ['', Validators.required],

      experience: ['', Validators.required],

      skills: ['', Validators.required]

    });

  }

  onSubmit() {

    if (this.jobForm.valid) {

      console.log(this.jobForm.value);

      alert('Application submitted successfully!');

    } else {

      this.jobForm.markAllAsTouched();

    }

  }

}