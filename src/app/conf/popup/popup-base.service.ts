import { Injectable, Component, ComponentRef } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { PopupOverlayRef } from '@conf/popup/popup-overlay-ref';
import { PopupBaseConfig } from './popup-base-config';
// import { MicroInteractionService } from '@core/layout/micro-interaction.service';
import { DomUtil } from '@util/dom-util';
import { Subscription } from 'rxjs';
import { LayoutCtrlService } from '@systems/route/layout/layout-ctrl.service';

declare var $: any;

const DEFAULT_CONFIG: PopupBaseConfig = {
  hasBackdrop: true,
  backdropClass: 'dark-backdrop',
  panelClass: 'popup_content'
};

@Injectable()
export class PopupBaseService<C> {

  overlayRef: OverlayRef[];
  componentRef: ComponentRef<C>[];
  subscriptionClosePopup: Subscription;
  constructor(
    protected overlay: Overlay,
    private layoutCtrl: LayoutCtrlService,
    // private microInteraction: MicroInteractionService
  ) {
    this.componentRef = [];
    this.overlayRef = [];
    this.init();
    this.subscriptionClosePopup = this.layoutCtrl.closePopupSubject.subscribe(() => {
      this.closeAllPopup();
    });
  }

  // 提供自類別初始化用
  protected init(): void { }

  public isOpened(): boolean {
    return this.componentRef.length > 0;
  }

  public destroy = () => {
    this.componentRef.pop().destroy();
    this.overlayRef.pop().dispose();
    // this.microInteraction.hideMicroBox(false); // 微交互開啟
    this.layoutCtrl.disableNativeReturn(false); // 啟用實體返回
    // 重設捲動
    if (!DomUtil.isInitialPage()) {
      $('section').each((index, item) => {
        $(item).removeClass('pageCtrlFixOverflow');
      });
      // const sections = document.getElementsByTagName('section');
      // for (let i = 0; i < sections.length; i++) {
      //   sections[i].style.overflowY = 'auto';
      // }
    }
    // 2019/08/26 因IOS鍵盤開啟狀時觸發POPUP畫面會破版增加
    document.documentElement.style.top = '0px';
  }

  private closeAllPopup() {
    const len = this.componentRef.length;
    for (let i = 0; i < len; i++) {
      this.destroy();
    }
  }

  protected createComponent(component: ComponentType<C>, config?: PopupBaseConfig): any {
    // Override default configuration
    if (!config || typeof config != 'object') {
      config = {};
    }
    const dialogConfig = { ...DEFAULT_CONFIG, ...config };
    // Returns an OverlayRef which is a PortalHost
    const localOverlayRef = this.createOverlay(dialogConfig);
    this.overlayRef.push(localOverlayRef);

    // Instantiate remote control
    const dialogRef = new PopupOverlayRef(localOverlayRef);

    // this.overlayRef.backdropClick().subscribe(_ => dialogRef.close());
    // Create ComponentPortal that can be attached to a PortalHost
    const componentPortal = new ComponentPortal(component);

    // Attach ComponentPortal to PortalHost
    const componentRef = localOverlayRef.attach(componentPortal);
    // 2019/08/26 因IOS鍵盤開啟狀時觸發POPUP畫面會破版增加
    document.documentElement.style.top = '0px';
    this.componentRef.push(componentRef);
    // this.microInteraction.hideMicroBox(true); // 微交互隱藏
    this.layoutCtrl.disableNativeReturn(true); // 禁用實體返回
    return componentRef.instance;
  }

  /**
   * 建立Overlay
   * @param config 自定設定
   */
  private createOverlay(config: PopupBaseConfig) {
    const overlayConfig = this.getOverlayConfig(config);
    // 關閉捲動
    $('section').each((index, item) => {
      $(item).addClass('pageCtrlFixOverflow');
    });
    // const sections = document.getElementsByTagName('section');
    // for (let i = 0; i < sections.length; i++) {
    //   sections[i].style.overflowY = 'hidden';
    // }
    return this.overlay.create(overlayConfig);
  }

  /**
   * 依設定轉換為OverlayConfig
   * @param config 自定設定
   */
  private getOverlayConfig(config: PopupBaseConfig): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();


    const strategy = this.overlay
      .position()
      .global()
      .centerHorizontally()   //控制視窗水平置中對齊 justify-content:center; 
      .bottom();              //控制視窗靠下對齊 align-items:flex-end;

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy: strategy
    });

    return overlayConfig;
  }

}
