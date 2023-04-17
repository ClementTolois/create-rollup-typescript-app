import ora, { Ora } from 'ora';

export default class Spinner {

    private static _spinner: Ora|undefined;

    public static start(message: string): void {
        this._spinner = ora(message).start();
    }

    public static update(message: string): void {
        if (!this._spinner) return;
        this._spinner.text = message;
    }

    public static stop(): void {
        if (this._spinner) {
            this._spinner.stop();
        }
    }
}