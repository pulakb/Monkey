import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormControlName, FormBuilder, Validators } from '@angular/forms';

import { Workout } from '../../../shared/services/workouts/workouts.service';

@Component({
    selector: 'workout-form',
    styleUrls: ['workout-form.component.scss'],
    template: `
        <div class="workout-form">
            <form [formGroup]="form">
                <div class="workout-form__name">
                    <label>
                        <h3>Workout Name</h3>
                        <input
                            type="text"
                            [placeholder]="placeholder"
                            formControlName="name">
                        <div class="error" *ngIf="required">
                            Workout is required
                        </div>
                    </label>
                    <label>
                        <h3>Type</h3>
                        <workout-type 
                            formControlName="type">
                        </workout-type>
                    </label>
                </div>
                
                <div class="workout-form__details">
                    <div *ngIf="form.get('type').value === 'strength'">
                        <div 
                            class="workout-form__fields"
                            formGroupName="strength">
                            <label>
                                <h3>Reps</h3>
                                <input type="number" formControlName="reps">
                            </label>
                            <label>
                                <h3>Sets</h3>
                                <input type="number" formControlName="sets">
                            </label>
                            <label>
                                <h3>Weight <span>(kg)</span></h3>
                                <input type="number" formControlName="weight">
                            </label>                                                        
                        </div>
                    </div>
                    <div *ngIf="form.get('type').value === 'endurance'">
                        <div 
                            class="workout-form__fields"
                            formGroupName="endurance">
                            <label>
                                <h3>Distance</h3>
                                <input type="number" formControlName="distance">
                            </label>
                            <label>
                                <h3>Duration</h3>
                                <input type="number" formControlName="duration">
                            </label>                                                       
                        </div>
                    </div>
                </div>





                
                     <div class="workout-form__submit">
                        <div>
                            <button
                                type="button"
                                class="button"
                                *ngIf = "!exists"
                                (click)="createWorkout()">
                                Create Workout
                            </button>
                            <button
                                type="button"
                                class="button"
                                *ngIf = "exists"
                                (click)="updateWorkout()">
                                Save
                            </button>                            
                            <a
                                class="button button--cancel"
                                [routerLink]="['../']">
                                Cancel
                            </a>
                        </div>

                        <div class="workout-form__delete" *ngIf="exists">
                            <div *ngIf="toggled">
                                <p>Delete item?</p>
                                <button
                                    class="confirm"
                                    type="button"
                                    (click)="removeWorkout()">
                                    Yes
                                </button>
                                <button
                                    class="cancel"
                                    type="button"
                                    (click)="toggle()">
                                    No
                                </button>
                            </div>
                
                            <button class="button button--delete" type="button" (click)="toggle()">
                                Delete
                            </button>
                        </div>


                    </div>

                
            </form>
        </div>
    `
})
export class WorkoutFormComponent implements OnInit, OnDestroy, OnChanges {

    toggled = false;
    exists = false;

    @Input()
    workout: Workout;

    @Output()
    create = new EventEmitter<Workout>();

    @Output()
    update = new EventEmitter<Workout>();

    @Output()
    remove = new EventEmitter<Workout>();

    form = this.fb.group({
        name: ['', Validators.required],
        type: 'strength',
        strength: this.fb.group({
            reps: 0,
            sets: 0,
            weight: 0
        }),
        endurance: this.fb.group({
            distance: 0,
            duration: 0
        })        
    });

    constructor(
        private fb: FormBuilder
    ) {}

    get placeholder() {
        return `e.g. ${this.form.get('type').value === 'strength' ? 'Benchpress' : 'Treadmill'}`;
    }

/*     get ingredients() {
        return this.form.get('ingredients') as FormArray;
    } */

    get required() {
        return (
            this.form.get('name').hasError('required') &&
            this.form.get('name').touched
        )
    }

    ngOnInit() {

    }

    ngOnDestroy() {

    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.workout && this.workout.name) {
            // existing
            this.exists = true;

            const value = this.workout;
            this.form.patchValue(value);
        }
    }

    createWorkout() {
        if (this.form.valid) {
            this.create.emit(this.form.value);
        }
    }

    updateWorkout() {
        if (this.form.valid) {
            this.update.emit(this.form.value);
        }
    }    

    removeWorkout() {
        if (this.form.valid) {
            this.remove.emit(this.form.value);
        }
    }    

    toggle() {
        this.toggled = !this.toggled;
    }
}