import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';

@Injectable({
	providedIn: 'root',
})
export class MessagingService {
	private messaging = firebase?.messaging?.isSupported()
		? firebase.messaging()
		: null;

	private _token: string | null = null;

	constructor() {
		this.requestPermission();
		this.getMessages();
	}

	public get token(): string {
		if (this._token) return this._token;
		const data = localStorage.getItem('messaging_token') || '';
		const token = JSON.parse(data);
		return token || null;
	}

	public set token(value: string) {
		this._token = value;
		const _data = JSON.stringify(value);
		localStorage.setItem('messaging_token', _data);
	}

	public async requestPermission() {
        console.log('pidiendo permisos');
		if (!this.messaging) return;
		const token = await this.messaging.getToken();
		this.token = token;
        console.log(token);
		return token;
	}

	public deleteToken() {
		if (!this.messaging) return;
				this.messaging.deleteToken();
	}

	private getMessages() {
		if (!this.messaging) return;
		this.messaging.onMessage(({ notification }) => {
            console.log(notification);
			new Notification(notification.title, notification);
		});
	}
}