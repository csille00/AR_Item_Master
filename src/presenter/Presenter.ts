export interface View {
}

export interface MessageView extends View {
    displayInfoMessage: (
        message: string,
        duration: number,
        bootstrapClasses?: string
    ) => void;
    clearLastInfoMessage: () => void;
}

export class Presenter<ViewType extends View> {
    private readonly _view: View;

    public constructor(view: View) {
        this._view = view;
    }

    protected get view(): ViewType {
        return this._view as ViewType;
    }

    protected async doFailureReportingOperation(operation: () => Promise<void>, operationDescription: string) {
        try {
            await operation()
        } catch (error) {
            this.view.displayErrorMessage(`Failed to ${operationDescription} because of exception: ${(error as Error).message}`)
            console.log(error)
        }
    }
}
