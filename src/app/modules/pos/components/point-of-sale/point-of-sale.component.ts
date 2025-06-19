import { DOCUMENT, formatDate } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Inject,
  ViewChild,
} from '@angular/core';

import { Product } from '../../../../core/models/Products/product.model';
import { ToastAlert } from '../../../../shared/alert/toast.alert';
import { CommonUtil } from '../../../../shared/utils/CommonUtil';
import { ledger } from '../../../../core/models/ledger.model';
import { SalesChild } from '../../../../core/models/Sales/SalesChild.model';
import { NumberUtil } from '../../../../shared/utils/numberUtil';
import { Settings } from '../../../../core/models/settings/settings.model';
import { PriceType } from '../../../../shared/enums/priceType.enums';
import { IStockSummaryData } from '../../../../core/models/Reports/stockSummaryData.model';
import { SettingsModule } from '../../../../shared/enums/settingsModule.enum';
import { Sales } from '../../../../core/models/Sales/sales.model';
import { BehaviorSubject, finalize, forkJoin } from 'rxjs';
import { ServicePriceSettingsService } from '../../../../core/services/service-price-settings.service';
import { OnlineApp } from '../../../../core/models/onlineApp.model';
import {
  servicePriceSetting,
  ServicePriceSettingFilterDTO,
  servicePriceSettingsChild,
} from '../../../../core/models/servicePriceSetting.model copy';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ServicePriceSettingPopupComponent } from '../../../../shared/modals/service-price-setting-popup/service-price-setting-popup.component';
import { GridCartService } from '../../../../core/services/grid-cart.service';
import { SettingsService } from '../../../../core/services/settings.service';
import { EmployeeService } from '../../../../core/services/employee.service';
import { StockSummaryReportService } from '../../../../core/services/stock-summary-report.service';
@Component({
  selector: 'app-point-of-sale',
  standalone: false,
  templateUrl: './point-of-sale.component.html',
  styleUrl: './point-of-sale.component.scss',
})
export class PointOfSaleComponent {
  @ViewChild('fullscreenElement') fullscreenElement!: ElementRef;
  @ViewChild('categoryWithChild') categoryWithChild!: ElementRef;
  @ViewChild('categorySection') categorySection!: ElementRef;
  @ViewChild('productsContainer') productsContainer!: ElementRef;
  @ViewChild('productfiltertb') private barcode!: ElementRef;
  @ViewChild('salesitems') private salesitemsTable!: ElementRef;
  private modalOpenSubject = new BehaviorSubject<boolean>(false);
  customerSelected: ledger = new ledger();
  servicePriceSetting?: servicePriceSetting;
  allSettings: Settings[] = [];
  taxSettings = {
    enableTax: false,
  };
  appDetails?: OnlineApp;
  product: Product | null = null;
  selectedProduct: Product | null = null;
  productsTosale: SalesChild[] = [];
  stockSummaryReport: IStockSummaryData[] = [];
  editIndex: number = 0;
  invoice: Sales = new Sales();
  kotProducts: SalesChild[] = [];
  elem: any;
  isFullScreen: boolean = false;
  isMobileView: boolean = window.innerWidth <= 600;
  QuantityheaderText: string = 'Quantity';
  selectedTab: number = 0;
  selectedTheme: string = 'DayTheme';
  customerName: string = '';
  mobileNumber: string = '';
  stockLocation: string = '';
  salesMan: any = null;
  isPanelOpen = false;
  withoutCustandPro: boolean = false;
  private submissionInProgress = false;
  categoryActive = false;
  posSettings: any = {};
  dayId = '';
  isGRN = false;
  isTableandArea: boolean = false;
  cancelProduct: boolean = false;
  kotPrinterName = '';
  currentLoggedCompany = null;
  private isPopupOpen: boolean = false;
  salesSaved = false;
  today = new Date();
  isProductLoading = false;
  isCategoryLoading = false;
  printData = null;
  shiftId = '';
  kotNo: any;
  isCashActive = true;
  OrderTypeClicked: boolean = false;
  isCardActive = true;
  isBankTrfActive = true;
  isCreditActive = true;
  splitdata: any;
  error: any = [];
  lastAddedItem = {};
  totalCost = 0;
  totalProfit = 0;
  lastInvoiceSummary = null;
  disableLargeBtn = false;
  disableMedBtn = false;
  disableSmallBtn = false;
  private isSaving = false;
  isSalesReturn = false;
  supplierTrn = '';
  isDisablePrint = true;
  printKOTData: any = null;
  newBarcode: any;
  popupType = '';
  popupTtitle = 'List';
  isPurchase = false;
  hundredthAmt = 0;
  priceFromBarcode: boolean = false;
  isbarcodethirteenDigit = false;
  isLoading = false;
  newDate: string = formatDate(new Date(), 'yyyy-MM-dd', 'en');

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private gridCartService: GridCartService,
    private changeDetectorRef: ChangeDetectorRef,
    private modalService: NgbModal,
    private settingService: SettingsService,
    private employeeService: EmployeeService,
    private stockSummaryService: StockSummaryReportService,
    private servicePriceSettingService: ServicePriceSettingsService
  ) {
    this.gridCartService.selectedProducts$.subscribe(products =>{
       this.productsTosale = products;
    })
  }

  ngAfterViewInit(): void {
    this.elem = this.fullscreenElement.nativeElement;
    this.openFullscreen();
  }

  async ngOnInit() {
    document.addEventListener('fullscreenchange', () => {
      this.isFullScreen = !!document.fullscreenElement;
    });
    this.isMobileView = window.innerWidth <= 600;
    this.updateHeaderText();
    this.elem = document.documentElement;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isMobileView = window.innerWidth <= 600;
    this.updateHeaderText();
  }

  openFullscreen() {
    const elem = this.fullscreenElement.nativeElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().then(() => {
        this.isFullScreen = true;
      });
    } else {
      alert('Fullscreen is not supported in this browser.');
    }
  }

  closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen().then(() => {
        this.isFullScreen = false;
      });
    } else {
      alert('Fullscreen API is not supported in this browser.');
    }
  }

  logout() {}

  toggleTheme() {
    this.withoutCustandPro = !this.withoutCustandPro;
  }

  onTabChange(index: number) {
    this.selectedTab = index;
  }

  updateHeaderText(): void {
    if (window.innerWidth <= 600) {
      this.QuantityheaderText = 'Qty';
    } else {
      this.QuantityheaderText = 'Quantity';
    }
  }

  togglePanel(): void {
    this.isPanelOpen = !this.isPanelOpen;
  }

  selectTheme(themeId: string): void {
    this.selectedTheme = themeId;
  }

  applyChanges(): void {
    this.togglePanel();
  }

  resetToDefault(): void {
    this.selectedTheme = 'DayTheme';
  }

  changeTheme(event: Event): void {
    const selectedTheme = (event.target as HTMLSelectElement).value;
    this.selectedTheme = selectedTheme;
  }

  scrollCategory(offset: number) {
    this.categoryWithChild?.nativeElement?.scrollBy({
      left: offset,
      behavior: 'auto',
    });
  }

  scrollCategoryVertical(offset: number) {
    this.categorySection?.nativeElement?.scrollBy({
      top: offset,
      behavior: 'auto',
    });
  }

  scrollProducts(offset: number) {
    this.productsContainer?.nativeElement?.scrollBy({
      top: offset,
      behavior: 'auto',
    });
  }

  currentCategoryIds: string[] = [];

  onCategorySelected(event: { node: any; parentNodes: any[] }) {
    // Handle any additional logic when category is selected
  }

  onProductsRequested(ids: string[]) {
    this.currentCategoryIds = ids;
  }

  onProductSelected(product: any) {
    this.addproductTosales(product);
    this.gridCartService.updateSelectedProducts(this.productsTosale);
  }

  addproductTosales(
    product: any,
    isAdd = true,
    qty = 1,
    isDefaultItem = false
  ): void {
    if (this.posSettings['enableServicePricePopup'] && !this.isPopupOpen) {
      this.filterItems(product);
    }
    if (!this.salesSaved) {
      this.lastInvoiceSummary = null;
      this.disableLargeBtn = false;
      this.disableMedBtn = false;
      this.disableSmallBtn = false;
      if (product) {
        this.selectedProduct = product;
        if (product.retailPrice <= 0) {
          ToastAlert.warning('Price is not configured for this item');
          return;
        }
        qty = this.setWeigingPriceAndQty(product, qty);
        const productAvailable = this.productsTosale.find(
          (option) => option.productName?.toString() == product.productName
        );
        const productTosale: SalesChild = new SalesChild();
        if (productAvailable && !product.weighingPrice && !isDefaultItem) {
          this.updateProductAvailable(
            productAvailable,
            product,
            qty,
            isAdd,
            PriceType.Small
          );
        } else {
          this.addNewProductToSale(productTosale, product, qty);
        }
        this.costCalculation();
        this.lastAddedItem = this.productsTosale[this.editIndex];
        this.scrollToBottomItemDiv();
        if (this.productsTosale.length && this.productsTosale.length == 1) {
          this.lastInvoiceSummary = null;
        }
      }
      if (this.barcode?.nativeElement.value)
        this.barcode.nativeElement.value = '';
    } else {
      // this.frmReset();
      this.salesSaved = false;
      this.addproductTosales(product, isAdd, qty, isDefaultItem);
    }
  }

  costCalculation() {
    this.totalCost = this.productsTosale.reduce(
      (sum, item) => sum + item.totalCost,
      0
    );
    this.totalCost = Number(this.totalCost.toFixed(2));
    this.profitCalculation();
  }

  profitCalculation() {
    const totalProfit = this.productsTosale.reduce(
      (sum, item) => sum + item.grossProfit * item.qty,
      0
    );
    this.totalProfit = Number(totalProfit.toFixed(2));
    this.disableSmallBtn = false;
    this.disableMedBtn = false;
    this.disableLargeBtn = false;
  }
  scrollToBottomItemDiv(): void {
    this.changeDetectorRef.detectChanges();
    try {
      this.salesitemsTable.nativeElement.scrollTop =
        this.salesitemsTable.nativeElement.scrollHeight;
    } catch (err) {}
  }

  private addNewProductToSale(
    productTosale: SalesChild,
    product: any,
    qty: number,
    priceType?: PriceType
  ): void {
    this.updateTimeStamp(productTosale);
    productTosale.Product = product._id;
    productTosale.Barcode = product.barcode;
    productTosale.productName = product.productName;
    productTosale.ItemCode = product.productCode;
    productTosale.qty = qty;
    productTosale.focQty = 0;
    productTosale.totalQtyWithFoc = qty;
    let retailPrice = product.retailPrice;
    if (this.priceFromBarcode) {
      productTosale.price = retailPrice;
    } else {
      retailPrice = this.getPrice(product);
      productTosale.price = retailPrice;
      const offerPrice =
        product.offerPrice &&
        this.isCurrentDateInRange(product.offerStartDate, product.offerEndDate)
          ? product.offerPrice
          : 0;
      productTosale.isOfferPrice = retailPrice === offerPrice;
    }
    this.priceFromBarcode = false;
    productTosale.discPercentage = product.offerPrice
      ? 0
      : this.setGlobalDiscountPercentage(product);
    productTosale.discount =
      NumberUtil.RoundNumber(
        (productTosale.discPercentage / 100) * productTosale.price
      ) || 0;
    productTosale.costWithTax = product.costWithTax;
    productTosale.taxCode = product?.taxCode;
    productTosale.tax =
      (this.isPurchase && this.supplierTrn.length) ||
      this.taxSettings['enableTax']
        ? product.taxPercentage
        : 0;
    productTosale.totalCost =
      (this.taxSettings['enableTax'] && this.enableGPTax) ||
      (this.supplierTrn.length && this.isPurchase)
        ? NumberUtil.RoundNumber(product.costWithTax * productTosale.qty)
        : NumberUtil.RoundNumber(product.baseCost * productTosale.qty);
    productTosale.baseCost = product.baseCost;
    productTosale.unit =
      product.uom?._id ??
      product.uom ??
      product.unit?._id ??
      product.unit ??
      null;
    productTosale.pcsinunit = product.packingQty ? product.packingQty : 0;
    productTosale.priceType = priceType ? priceType : PriceType.Small;
    this.setPriceandTaxAmount(retailPrice, productTosale);
    this.calculateItem(productTosale, product.weighingPrice);
    productTosale.currentStock = this.getPdtCurrntStk(productTosale);
    if (
      (productTosale.currentStock <= 0 && product.blockNegetiveSale) ||
      (productTosale.currentStock <= 0 &&
        this.posSettings['blockNegativeSales'])
    ) {
      const errorData = {
        prdId: product._id,
        type: 'currentStk',
        errorMessage: `Current Stock of ${this.product?.productName} is zero`,
      };
      const isExist = this.error?.find(
        (err: any) =>
          err.prdId === errorData.prdId && err.type == errorData.type
      );
      if (!isExist) this.error.push(errorData);
      return;
    }
    if (this.isTableandArea) this.kotProducts.push(productTosale);
    this.productsTosale.push(productTosale);
    this.editIndex = this.productsTosale.indexOf(productTosale);
  }

  private getPdtCurrntStk(saleProd: SalesChild): any {
    const currentProduct = this.stockSummaryReport.find(
      (product) => product.productId == saleProd.Product
    );
    return currentProduct ? currentProduct?.clsQty : 0;
  }
  setPriceandTaxAmount(retailPrice: number, salesChild: SalesChild) {
    salesChild.price = retailPrice;
    salesChild.netUnitRate = retailPrice - salesChild.discount;
  }

  public get enableGPTax(): any {
    const enableGPTax = this.allSettings.find(
      (o) => o.keyword === 'EnableGPTax' && o.module == SettingsModule.POS
    )?.settingsValue;
    return enableGPTax;
  }

  public get isTaxInclusive(): any {
    const isinclusive = this.allSettings.find(
      (o) => o.keyword === 'priceInclusiveTax' && o.module == SettingsModule.POS
    )?.settingsValue;
    return (isinclusive || 'false') == 'false' ? false : true;
  }

  percentageCalculator(item: any): number {
    let taxAmt = (item.tax / 100) * item.netUnitRate;
    if (this.isTaxInclusive) {
      this.hundredthAmt = 100 + item.tax;
      item.amtWithoutTax = NumberUtil.RoundNumber(
        (item.netUnitRate / this.hundredthAmt) * 100
      );
      taxAmt = item.netUnitRate - item.amtWithoutTax;
    } else {
      item.amtWithoutTax = item.netUnitRate;
    }
    return NumberUtil.RoundNumber(taxAmt);
  }

  setGlobalDiscountPercentage(product: Product) {
    const currentDate = new Date(
      this.today.getTime() - this.today.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split('T')[0];
    const isGlobalDiscperc =
      this.posSettings['EnableGlobalDisc'] &&
      this.posSettings['GlobalDiscPerc'];
    const isValidDiscDate =
      this.posSettings['AllowDiscOpenDate'] ||
      this.posSettings['GlobalDiscToDate'] >= currentDate;
    const discPerc = isGlobalDiscperc
      ? isValidDiscDate
        ? +this.posSettings['GlobalDiscPerc']
        : product.discountPercentage
      : product.discountPercentage;
    return !discPerc ? 0 : discPerc;
  }

    public get totalQty(): number {
    if (this.productsTosale?.length == 0) {
      return 0;
    }
    const total = this.productsTosale.map((i) => i.qty).reduce((a, b) => +a + +b);
    return NumberUtil.RoundNumber(total);
  }

   public get totalDisc(): number {
    if (this.productsTosale?.length == 0) {
      return 0;
    }
    const total = this.productsTosale.map((i) => i.discount).reduce((a, b) => +a + +b);
    return NumberUtil.RoundNumber(total);
  }

  public get totalPrice(): number {
    if (this.productsTosale?.length === 0) {
      return 0;
    }
    const total = this.productsTosale
      .map((i) => {
        let priceWithDiscount = i.totalTaxExclusive;

        if (i.discount > 0) {
          priceWithDiscount = (i.unitRateWithTax + i.discount) * i.qty;
        }

        return priceWithDiscount;
      })
      .reduce((a, b) => +a + +b, 0);

    return NumberUtil.RoundNumber(total);
  }

  calculateItem(item: SalesChild, weighingPrice: number) {
    if (item == null) {
      return;
    }
    item.totalQtyWithFoc = item.qty;
    item.taxAmount = this.percentageCalculator(item);
    item.unitRateWithTax = NumberUtil.RoundNumber(
      item.amtWithoutTax + item.taxAmount
    );
    item.totalTax = NumberUtil.RoundNumber(
      item.totalQtyWithFoc * item.taxAmount
    );
    item.totalTaxExclusive = NumberUtil.RoundNumber(
      item.totalQtyWithFoc * item.amtWithoutTax
    );
    item.totalWithTax = weighingPrice
      ? weighingPrice > 0
        ? weighingPrice
        : NumberUtil.RoundNumber(item.unitRateWithTax * item.totalQtyWithFoc)
      : NumberUtil.RoundNumber(item.unitRateWithTax * item.totalQtyWithFoc);
    item.totalCost =
      (this.taxSettings['enableTax'] && this.enableGPTax) ||
      (this.taxSettings['enableTax'] && this.isPurchase)
        ? NumberUtil.RoundNumber(item.costWithTax * item.qty)
        : NumberUtil.RoundNumber(item.baseCost * item.qty);
    this.getProfit(item);
    item.totalgrossProfit = NumberUtil.RoundNumber(item.grossProfit * item.qty);
    this.costCalculation();
  }

  getProfit(product: SalesChild): void {
    if (!product) {
      console.error('Product is undefined or null');
      return;
    }

    const salesRate =
      this.taxSettings['enableTax'] && this.enableGPTax
        ? product.unitRateWithTax ?? 0
        : product.price ?? 0;

    const costRate =
      this.taxSettings['enableTax'] && this.enableGPTax
        ? product.costWithTax ?? 0
        : product.baseCost ?? 0;

    const profit = salesRate - costRate;

    product.grossProfit = NumberUtil.RoundNumber(profit);
  }

  updateTimeStamp(item: SalesChild) {
    item.timestamp = Date.now();
  }

  private updateKOTProducts(
    productAvailable: any,
    product: any,
    qty: number,
    isAdd: boolean,
    priceType: PriceType
  ): void {
    this.updateTimeStamp(productAvailable);
    const isnotIncQty = priceType
      ? !this.posSettings['addAsNextLine'] &&
        productAvailable.priceType != priceType
      : false;
    productAvailable.qty =
      this.isPurchase || isnotIncQty
        ? productAvailable.qty
        : productAvailable.qty + qty * (isAdd ? 1 : -1);
    productAvailable.tax =
      (this.isPurchase && this.supplierTrn.length) ||
      this.taxSettings['enableTax']
        ? product.taxPercentage
        : 0;
    productAvailable.focQty = 0;
    productAvailable.baseCost = product.baseCost;
    productAvailable.costWithTax = product.costWithTax;
    productAvailable.priceType = priceType ? priceType : PriceType.Small;
    productAvailable.totalCost =
      (this.taxSettings['enableTax'] && this.enableGPTax) ||
      (this.supplierTrn.length && this.isPurchase)
        ? NumberUtil.RoundNumber(product.costWithTax * productAvailable.qty)
        : NumberUtil.RoundNumber(product.baseCost * productAvailable.qty);
    productAvailable.totalQtyWithFoc = productAvailable.qty;
    productAvailable.baseCost = product.baseCost;
    const retailPrice = this.getPrice(product);
    productAvailable.baseCost = product.baseCost;
    this.setPriceandTaxAmount(retailPrice, productAvailable);
    productAvailable.discount = NumberUtil.RoundNumber(
      (productAvailable.discPercentage / 100) * productAvailable.price
    );
    this.calculateItem(productAvailable, product.weighingPrice);
    productAvailable.currentStock = this.getPdtCurrntStk(productAvailable);
  }

  private updateProductAvailable(
    productAvailable: SalesChild,
    product: any,
    qty: number,
    isAdd: boolean,
    priceType: PriceType
  ): void {
    if (this.isTableandArea) {
      const productAvail = this.kotProducts.find(
        (product) => product.Product === productAvailable.Product
      );
      if (productAvail) {
        this.updateKOTProducts(
          productAvail,
          product,
          qty,
          isAdd,
          priceType as PriceType
        );
      } else {
        this.addKOTProducts(product, qty, priceType);
      }
    }

    this.updateTimeStamp(productAvailable);
    const isnotIncQty = priceType
      ? !this.posSettings['addAsNextLine'] &&
        productAvailable.priceType != priceType
      : false;
    productAvailable.qty =
      this.isPurchase || isnotIncQty
        ? productAvailable.qty
        : productAvailable.qty + qty * (isAdd ? 1 : -1);
    productAvailable.tax =
      (this.isPurchase && this.supplierTrn.length) ||
      this.taxSettings['enableTax']
        ? product.taxPercentage
        : 0;
    productAvailable.focQty = 0;
    productAvailable.baseCost = product.baseCost;
    productAvailable.costWithTax = product.costWithTax;
    productAvailable.priceType = priceType ? priceType : PriceType.Small;
    productAvailable.service = product.service ?? null;
    productAvailable.serviceName = product.serviceName ?? null;
    productAvailable.Addon = product.Addon ?? null;
    productAvailable.AddonName = product.AddonName ?? null;
    productAvailable.deliveryType = product.deliveryType ?? null;
    productAvailable.servicePriceType = product.servicePriceType ?? null;
    productAvailable.totalCost =
      (this.taxSettings['enableTax'] && this.enableGPTax) ||
      (this.supplierTrn.length && this.isPurchase)
        ? NumberUtil.RoundNumber(product.costWithTax * productAvailable.qty)
        : NumberUtil.RoundNumber(product.baseCost * productAvailable.qty);
    productAvailable.totalQtyWithFoc = productAvailable.qty;
    productAvailable.baseCost = product.baseCost;
    const retailPrice = this.getPrice(product);
    productAvailable.baseCost = product.baseCost;
    this.setPriceandTaxAmount(retailPrice, productAvailable);
    productAvailable.discount = NumberUtil.RoundNumber(
      (productAvailable.discPercentage / 100) * productAvailable.price
    );
    this.calculateItem(productAvailable, product.weighingPrice);
    productAvailable.currentStock = this.getPdtCurrntStk(productAvailable);
    if (
      (productAvailable.currentStock <= 0 && product.blockNegetiveSale) ||
      (productAvailable.currentStock <= 0 &&
        this.posSettings['blockNegativeSales'])
    ) {
      const errorData = {
        prdId: product._id,
        type: 'currentStk',
        errorMessage: `Current Stock of ${this.product?.productName} is zero`,
      };
      const isExist = this.error?.find(
        (err: any) =>
          err.prdId === errorData.prdId && err.type == errorData.type
      );
      if (!isExist) this.error.push(errorData);
      this.onItemRemove(this.productsTosale.indexOf(productAvailable));
      return;
    }
    setTimeout(() => {
      this.editIndex = this.productsTosale.indexOf(productAvailable);
    }, 100);
  }

  onItemRemove(index?: number): void {
      const targetIndex = index !== undefined ? index : this.editIndex;
    
      if (targetIndex !== undefined && this.productsTosale?.length > 0) {
        if (this.cancelProduct) {
          const cancelledProduct = this.productsTosale.splice(targetIndex, 1)[0];
          this.invoice.cancelledProducts.push(cancelledProduct);
          const newIndex = Math.min(targetIndex, this.productsTosale.length - 1);
          this.editIndex = newIndex;
        } else {
          this.productsTosale.splice(targetIndex, 1);
          const newIndex = Math.min(targetIndex, this.productsTosale.length - 1);
          this.editIndex = newIndex;
        }
      } else {
        // this.frmReset();
      }
      this.calculateItem(this.productsTosale[this.editIndex], 0);
    }

  private addKOTProducts(
    product: any,
    qty: number,
    priceType: PriceType
  ): void {
    const productTosale = new SalesChild();
    this.updateTimeStamp(productTosale);
    productTosale.Product = product._id;
    productTosale.Barcode = product.barcode;
    productTosale.productName = product.productName;
    productTosale.ItemCode = product.productCode;
    productTosale.qty = qty;
    productTosale.focQty = 0;
    productTosale.totalQtyWithFoc = qty;
    const retailPrice = this.getPrice(product);
    productTosale.price = retailPrice;
    productTosale.discPercentage = product.offerPrice
      ? 0
      : this.setGlobalDiscountPercentage(product);
    productTosale.discount =
      NumberUtil.RoundNumber(
        (productTosale.discPercentage / 100) * productTosale.price
      ) || 0;
    productTosale.costWithTax = product.costWithTax;
    productTosale.taxCode = product.taxCode;
    productTosale.tax =
      (this.isPurchase && this.supplierTrn.length) ||
      this.taxSettings['enableTax']
        ? product.taxPercentage
        : 0;
    productTosale.totalCost =
      (this.taxSettings['enableTax'] && this.enableGPTax) ||
      (this.supplierTrn.length && this.isPurchase)
        ? NumberUtil.RoundNumber(product.costWithTax * productTosale.qty)
        : NumberUtil.RoundNumber(product.baseCost * productTosale.qty);
    productTosale.baseCost = product.baseCost;
    productTosale.unit = product.uom._id
      ? product.uom._id
      : product.uom
      ? product.uom
      : product.unit?._id
      ? product.unit?._id
      : product.unit;
    productTosale.pcsinunit = product.packingQty ? product.packingQty : 0;
    productTosale.priceType = priceType ? priceType : PriceType.Small;
    this.setPriceandTaxAmount(retailPrice, productTosale);
    this.calculateItem(productTosale, product.weighingPrice);
    productTosale.currentStock = this.getPdtCurrntStk(productTosale);
    this.kotProducts.push(productTosale);
  }

  private setWeigingPriceAndQty(product: Product, qty: number): number {
    let prdQty = 0;
    if (this.isbarcodethirteenDigit && product.weighingQuantity == 0) {
      const prdAmt = product.weighingPrice;
      prdQty = this.posSettings['allowPOSQtythreeDecimals']
        ? +(prdAmt / product.retailPrice).toFixed(3)
        : +(prdAmt / product.retailPrice).toFixed(2);
    } else {
      prdQty = product.weighingQuantity > 0 ? product.weighingQuantity : qty;
      product.retailPrice = product.weighingPrice
        ? this.posSettings['getPriceFromMaster']
          ? product.retailPrice
          : product.weighingPrice > 0
          ? NumberUtil.RoundNumber(product.weighingPrice / prdQty)
          : product.retailPrice
        : product.retailPrice;
    }
    return prdQty;
  }

  filterItems(product: any) {
    if (this.isPopupOpen) return;

    this.isPopupOpen = true;
    const filter: ServicePriceSettingFilterDTO = {};

    if (this.customerSelected) {
      filter.customer = this.customerSelected._id;
    }

    if (this.salesMan) {
      filter.salesman = this.salesMan
        ? this.salesMan?.employeeId
          ? this.salesMan.employeeId
          : this.salesMan._id
        : null;
    }

    if (product) {
      filter.Product = product._id;
    }

    this.getServicePriceSetting(filter).subscribe(
      (resData) => {
        this.servicePriceSetting = resData;
        const service = this.filterServicePriceSettingsByProduct(product._id);
        if (service.length > 0) {
          this.SelectProductServicePrice(service, product);
        } else {
          this.isPopupOpen = false;
        }
      },
      () => {
        this.isPopupOpen = false;
      }
    );
  }

  SelectProductServicePrice(
    service: servicePriceSettingsChild[],
    product: any
  ): void {
    this.modalOpenSubject.next(true);
    const modalRef = this.modalService.open(ServicePriceSettingPopupComponent, {
      size: 'xl',
      centered: true,
      backdrop: true,
      keyboard: false,
    });

    modalRef.componentInstance.services = service;
    modalRef.componentInstance.dineIn = this.posSettings['AllowButtonDineIn'];

    modalRef.result
      .then((value) => {
        if (value) {
          product.service = value.service;
          product.serviceName = value.serviceName;
          product.Addon = value.productAddon;
          product.AddonName = value.productAddonName;
          product.retailPrice = value.priceValue;
          product.deliveryType = value.deliveryType;
          product.servicePriceType = value.priceType;
          this.addproductTosales(product, true, 0, false);
        }
        this.isPopupOpen = false;
      })
      .catch(() => {
        this.isPopupOpen = false;
      });
  }

  filterServicePriceSettingsByProduct(productId: string): any[] {
    if (!this.servicePriceSetting || !this.servicePriceSetting.priceSettings) {
      return [];
    }
    if (
      this.servicePriceSetting.Product &&
      this.servicePriceSetting.Product._id.toString() === productId.toString()
    ) {
      return this.servicePriceSetting.priceSettings;
    }

    return this.servicePriceSetting.priceSettings.filter(
      (setting) => setting.product._id.toString() === productId.toString()
    );
  }

  getServicePriceSetting(filter: ServicePriceSettingFilterDTO) {
    this.isLoading = true;
    return this.servicePriceSettingService
      .getPriceSetting(filter)
      .pipe(finalize(() => (this.isLoading = false)));
  }

  private getPrice(product: Product): number {
    const appPrice = product?.onlinePrices?.find(
      (app) => app.app === this.appDetails?._id
    );

    if (!appPrice && this.appDetails) {
      const errorData = {
        prdId: product._id,
        type: 'online-app',
        errorMessage: `${this.appDetails?.appName} price is not set for ${product.productName}`,
      };
      const isExist = this.error?.find(
        (err: any) =>
          err.prdId === errorData.prdId && err.type === errorData.type
      );
      if (!isExist) this.error.push(errorData);
    }

    let offerPrice = 0;

    const currentDate = new Date(this.today.toISOString());
    const offerStartDate = product.offerStartDate
      ? new Date(product.offerStartDate)
      : null;
    const offerEndDate = product.offerEndDate
      ? new Date(product.offerEndDate)
      : null;

    if (product.offerPrice && offerStartDate && offerEndDate) {
      const adjustedOfferEndDate = new Date(offerEndDate);
      adjustedOfferEndDate.setDate(adjustedOfferEndDate.getDate() + 1);
      adjustedOfferEndDate.setMilliseconds(
        adjustedOfferEndDate.getMilliseconds() - 1
      );

      if (
        currentDate >= offerStartDate &&
        currentDate <= adjustedOfferEndDate
      ) {
        offerPrice = product.offerPrice;
      }
    }

    if (appPrice?.price !== undefined) {
      return +appPrice.price;
    }
    if (offerPrice > 0) {
      return offerPrice;
    }
    return +product.retailPrice;
  }

  async findAllSettings() {
    await this.getEmployeeLocation();
    this.allSettings = [];
    this.isLoading = true;
    const posSettings$ = this.settingService.findAll('POS');
    const salesSettings$ = this.settingService.findAll('Sales');
    const printsSettings$ = this.settingService.findAll('Print');
    const kotsSettings$ = this.settingService.findAll('Kot');
    const purchasesSettings$ = this.settingService.findAll('Purchase');

    forkJoin([
      posSettings$,
      salesSettings$,
      printsSettings$,
      kotsSettings$,
      purchasesSettings$,
    ]).subscribe(([posRes, salesRes, printsRes, kotsRes, purchasesRes]) => {
      this.allSettings.push(
        ...posRes,
        ...salesRes,
        ...printsRes,
        ...kotsRes,
        ...purchasesRes
      );
      // this.posSettingsSet();
      // this.getAllCustomers();
      if (this.allowCurrentStock) this.getAllCurrentStk();
      this.isLoading = false;
    });
  }

  getAllCurrentStk(): void {
    const pagination = {
      limit: 10000,
      pageNumber: 1,
      companyId: CommonUtil.getCurrentCompany(),
      locationId: this.stockLocation,
    };
    this.stockSummaryService.fetchStockSummaryReport(pagination).subscribe({
      next: (result) => {
        this.stockSummaryReport = result.data;
      },
      error: (error) => {
        this.stockSummaryReport = [];
      },
    });
  }

  getEmployeeLocation(): Promise<void> {
    return new Promise((resolve, reject) => {
      const currentUser = CommonUtil.getCurrentUserDetail();
      const employeeId = currentUser?.user?.employeeId;

      if (!employeeId) {
        resolve();
        return;
      }
      this.employeeService.findOne(employeeId).subscribe(
        (employee) => {
          this.stockLocation = employee?.location || '';
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }


   
  


  

  public get allowCurrentStock(): any {
    const isCurrentStk = this.allSettings.find(
      (o) => o.keyword === 'AllowCurrentStk' && o.module == SettingsModule.POS
    )?.settingsValue;
    return isCurrentStk ? isCurrentStk : false;
  }

  onItemSelect(index: any) {
    this.editIndex = this.editIndex == index ? null : index;
  }

  private isCurrentDateInRange(
    offerStartDate: Date,
    offerEndDate: Date
  ): boolean {
    const currentDate = new Date(this.today.toISOString());
    const startDate = new Date(offerStartDate);
    const endDate = new Date(offerEndDate);

    endDate.setDate(endDate.getDate() + 1);
    endDate.setMilliseconds(endDate.getMilliseconds() - 1);

    return currentDate >= startDate && currentDate <= endDate;
  }

  handleProductClick(product: any) {
    this.addproductTosales(product);
  }


  
}
