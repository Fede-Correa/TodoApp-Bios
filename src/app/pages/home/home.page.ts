import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { TasksService } from 'src/app/core/services/tasks.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
	public formulario = new FormGroup({
		title: new FormControl('', [Validators.required]),
		description: new FormControl('', [Validators.required]),
		date: new FormControl('', [Validators.required]),
    	number: new FormControl('', [Validators.required])
	});
	public isModalOpen = false;
	public currentItem: any;
	public isLoading = false;
	public message = '';
	public isToastOpen = false;
	public tasks: any[] = [];

	constructor(
		private authUser: AuthService,
		private router: Router,
		private tasksService: TasksService,
	) {}

	ngOnInit() {
		this.tasksService.getAll().subscribe((data: any) => {
			this.tasks = data;
		});
	}

	public async onSubmit() {
		if (this.formulario.invalid) return;
		this.isLoading = true;
		try {
			const message = await this.tasksService.set(
				this.formulario.value,
				this.currentItem?.id,
			);
			this.message = message;
			this.setModalState(false);
			this.currentItem = null;
			this.formulario.reset();
		} catch (message: any) {
			this.message = message;
		} finally {
			this.setOpen(true);
			this.isLoading = false;
		}
	}

	public editTask(data: any) {
		this.currentItem = data;
		this.formulario.patchValue(data);
		this.setModalState(true);
	}

	

	public setModalState(isOpen: boolean) {
		this.isModalOpen = isOpen;
	}



	public async signOut() {
		try {
			await this.authUser.signOut();
			this.router.navigateByUrl('/login');
		} catch (error) {
			console.log(error);
		}
	}

	public setOpen(state: boolean) {
		this.isToastOpen = state;
	}
}