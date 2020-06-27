import { Injectable } from '@angular/core';
import { Stock } from './stocks.model';
import { LocalStorageService } from './local-storage.service';
import { AlertService } from './alert.service';
import { CurrencyPipe } from '@angular/common';
import { User, Item } from './User';
import { StocksComponent } from '../stocks/stocks.component';

const defaultBalance: number = 10000;

@Injectable()
export class AccountService {
  private _balance: number = defaultBalance;
  private _cost: number = 0;
  private _value: number = 0;
  private _stocks: Stock[] = [];

  constructor(private localStorageService: LocalStorageService,
    private alertService: AlertService,
    private currencyPipe: CurrencyPipe) {}

  get balance(): number { return this._balance; }
  get cost(): number { return this._cost; }
  get value(): number { return this._value; }
  get stocks(): Stock[] { return this._stocks; }

  purchase(stock: Stock): void {
    stock = Object.assign({}, stock);
    if (stock.price < this.balance) {
      this._balance = this.debit(stock.price, this.balance);
      stock.cost = stock.price;
      this._cost = this.credit(stock.price, this.cost);
      stock.change = 0;
      this._stocks.push(stock);
      this.calculateValue();
      this.cacheValues();
      this.alertService.alert(`You buy ${stock.symbol} for ` + this.currencyPipe.transform(stock.price, 'USD', true, '.2'), 'success');
    } else {
      this.alertService.alert(`You don't have enough money to buy ${stock.symbol}`, 'danger');
    }
  }

  sell(index: number): void {
    let stock = this.stocks[index];
    if (stock) {
      this._balance = this.credit(stock.price, this.balance);
      this._stocks.splice(index, 1);
      this._cost = this.debit(stock.cost, this.cost);
      this.calculateValue();
      this.cacheValues();
      this.alertService.alert(`You sold ${stock.symbol} for ` + this.currencyPipe.transform(stock.price, 'USD', true, '.2'), 'success');
    } else {
      this.alertService.alert(`You don't have ${stock.symbol} stock.`, 'danger');
    }
  }

  init() {
    this._stocks = this.localStorageService.get('stocks', []);
    this._balance = this.localStorageService.get('balance', defaultBalance);
    this._cost = this.localStorageService.get('cost', 0);
  }

  reset() {
    this._stocks = [];
    this._balance = defaultBalance;
    this._value = this._cost = 0;
    this.cacheValues();
  }


  loadUser(user: User){
    this._balance = user.balance;
    this._value = this._cost = user.cost;
    this._stocks = this.mapStocks(user.stocks);
    this.cacheValues();
  }

  private mapStocks(items: Item[]): Stock[] {
  
    let stocksArray: Stock[] = [];

    items.map((item) => {
      var stock: Stock = {symbol: item.symbol,
        name: item.name,
        price: item.price,
        change: item.changes,
        cost: item.cost
      }
      stocksArray.push(stock);
    });

    return stocksArray;
  }

  // TODO
  mapItems(): Item [] {
    let itemsArray: Item[] = [];

    this.stocks.map((stock) => {
      var item: Item = {symbol: stock.symbol,
        name: stock.name,
        price: stock.price,
        changes: stock.change,
        cost: stock.cost
      }
      console.log(item);
      itemsArray.push(item);
    
    });

    return itemsArray;
  }

  calculateValue() {
    this._value = this._stocks
      .map(stock => stock.price)
      .reduce((a, b) => {return a + b}, 0);
  }

  private cacheValues() {
    this.localStorageService.set('stocks', this.stocks);
    this.localStorageService.set('balance', this.balance);
    this.localStorageService.set('cost', this.cost);
  }

  private debit(amount: number, balance: number): number {
    return (balance * 100 - amount * 100) / 100;
  }

  private credit(amount: number, balance: number): number {
    return (balance * 100 + amount * 100) / 100;
  }
}
