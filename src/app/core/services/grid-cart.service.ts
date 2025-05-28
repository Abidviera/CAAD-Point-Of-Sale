import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastAlert } from '../../shared/alert/toast.alert';
import { NumberUtil } from '../../shared/utils/numberUtil';
import { Settings } from '../models/settings/settings.model';
import { SalesChild } from '../models/Sales/SalesChild.model';
import { SettingsModule } from '../../shared/enums/settingsModule.enum';

@Injectable({
  providedIn: 'root',
})
export class GridCartService {
  private selectedProductsSource = new BehaviorSubject<any[]>([]);
  selectedProducts$ = this.selectedProductsSource.asObservable();
  private editIndexSource = new BehaviorSubject<number | null>(null);
  editIndex$ = this.editIndexSource.asObservable();

  updateSelectedProducts(products: any[]) {
    this.selectedProductsSource.next(products);
  }

  setEditIndex(index: number | null) {
    this.editIndexSource.next(index);
  }

  updateQuantity(index: number, isAdd: boolean) {
    const currentProducts = this.selectedProductsSource.getValue();
    if (index >= 0 && index < currentProducts.length) {
      const currentItem = currentProducts[index];
      const currentQty = currentItem.qty;

      if (currentQty == 1 && !isAdd) {
        ToastAlert.error('The minimum quantity for this product is 1');
        return false;
      }

      currentItem.qty = currentQty + (isAdd ? 1 : -1);
      this.selectedProductsSource.next([...currentProducts]);
      this.calculateItem(currentItem, 0);
      return true;
    }
    return false;
  }

  taxSettings: any = {};
  allSettings: Settings[];
  isPurchase = false;
  productsTosale: SalesChild[] = [];
  totalCost = 0;
  totalProfit = 0;
  disableLargeBtn = false;
  disableMedBtn = false;
  disableSmallBtn = false;
  calculateItem(item: SalesChild, weighingPrice: number) {
    if (item == null) {
      return;
    }
    item.totalQtyWithFoc = item.qty;
    // item.taxAmount = this.percentageCalculator(item);
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

  costCalculation() {
    this.totalCost = this.productsTosale.reduce(
      (sum, item) => sum + item.totalCost,
      0
    );
    this.totalCost = Number(this.totalCost.toFixed(2));
    this.profitCalculation();
  }

  getProfit(product: SalesChild) {
    const salesRate =
      this.taxSettings['enableTax'] && this.enableGPTax
        ? product.unitRateWithTax
        : product.price;
    const costRate =
      this.taxSettings['enableTax'] && this.enableGPTax
        ? product.costWithTax
        : product.baseCost;
    const profit = salesRate - costRate;
    product.grossProfit = NumberUtil.RoundNumber(profit);
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

  public get enableGPTax(): any {
    const enableGPTax = this.allSettings.find(
      (o) => o.keyword === 'EnableGPTax' && o.module == SettingsModule.POS
    )?.settingsValue;
    return enableGPTax;
  }



 
}
