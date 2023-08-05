import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { Injectable, Injector } from '@angular/core';
import { DialogConfig, DIALOG_BACKDROP_CLASS, DIALOG_CONTAINER_CLASS, DIALOG_DATA } from './dialog-config';
import { DialogRef } from './dialog-ref';

export const DIALOG_CSS_CLASSES = {
  container: 'dialog-container',
};

@Injectable({
  providedIn: 'root',
})
export class Dialog {
  constructor(private injector: Injector, private overlay: Overlay) {}

  open<T, D = any, R = any>(component: ComponentType<T>, config?: DialogConfig<D>): DialogRef<R> {
    const overlayRef = this.createOverlay(config);
    const dialogRef = new DialogRef<R>(overlayRef);
    const injector = this.createInjector(dialogRef, config?.data);
    const componentPortal = new ComponentPortal<T>(component, config?.viewContainerRef, injector);
    overlayRef.attach(componentPortal);
    return dialogRef;
  }

  private createInjector<D>(dialogRef: DialogRef, data: D): Injector {
    return Injector.create({
      providers: [
        {
          provide: DIALOG_DATA,
          useValue: data,
        },
        {
          provide: DialogRef,
          useValue: dialogRef,
        },
      ],
    });
  }

  private createOverlay(config: DialogConfig<any>): OverlayRef {
    const overlay = this.overlay.create({
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      ...config,
      panelClass: config.panelClass ? [...config.panelClass, DIALOG_CONTAINER_CLASS] : [DIALOG_CONTAINER_CLASS],
      backdropClass: config.backdropClass ? [...config.backdropClass, DIALOG_BACKDROP_CLASS] : [DIALOG_BACKDROP_CLASS],
    });

    return overlay;
  }
}
