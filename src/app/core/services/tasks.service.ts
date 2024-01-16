import { Injectable } from '@angular/core';
import { COLLECTIONS, ERRORS_MESSAGES } from '../config';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { Subject } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root',
})
export class TasksService {
	private db = firebase.firestore();
	private COLLECTION_NAME = COLLECTIONS.TASKS;

	constructor(private auth: AuthService) {}

	public set(data: any, id?: string) {
		data['user_id'] = this.auth?.user?.uid;
		const docId = id || Date.now().toString();
		return new Promise<string>(async (resolve, reject) => {
			try {
				await this.db
					.collection(this.COLLECTION_NAME)
					.doc(docId)
					.set(data);
				resolve('Tarea guardada exitosamente.');
			} catch (error: any) {
				console.log(error);
				if (typeof error === 'string') return reject(error);
				reject(ERRORS_MESSAGES['unexpected-error']);
			}
		});
	}

	public delete(id: string) {
		return new Promise<void>(async (resolve, reject) => {
			try {
				await this.db.collection(this.COLLECTION_NAME).doc(id).delete();
				resolve();
			} catch (error: any) {
				console.log(error);
				if(typeof error === 'string') return reject(error);
				reject(ERRORS_MESSAGES['unexpected-error']);
			}
		})
	}

	public getAll() {
		const subject = new Subject();
		this.auth.$user.subscribe((user) =>{
			if(!user) return subject.next([]);
			this.db
				.collection(this.COLLECTION_NAME)
				.where('user_id', '==', user?.uid)
				.onSnapshot((data) => {
					const body = data.docs.map((doc) => {
						return {
							...doc.data(),
							id: doc.id,
						};
					});
					subject.next(body);
				});
		})
		return subject.asObservable();
	}
}