import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { RoutingConstants, StoreConstants, TechnicalConstants } from 'src/app/app-constants';
import { Currency, CurrencyLable } from 'src/app/enums/edition/edition-enums';
import { SortingByPriceOrTitleParams } from 'src/app/enums/sorting-enums';
import { StoreCurrentEditonId } from '../../state-manager/action/edition-action';
import { GetFiltratedEditions } from 'src/app/state-manager/action/store-action';

import { AuthState } from 'src/app/state-manager/state/auth-state';
import { StoreState } from 'src/app/state-manager/state/store-state';



@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})

export class StoreComponent implements OnInit {
  editionProfileRote = RoutingConstants.EditionProfile;
  userQuestionUpdate = new Subject<string>();
  isAuthenticated!: boolean;
  auth = this.store.select(AuthState.isAuthenticated).subscribe(res => {
    this.isAuthenticated = res;
  });

  editions$ = this.store.select(StoreState.getEditions)
  countElementOnPage = StoreConstants.DefaultCountElementOnPage;
  page = StoreConstants.FromFirsPage;
  fullCounts!: number;
  search!: string;
  isAscending: boolean = true;
  propertyForSort: string = StoreConstants.DefaultSortingProperty;
  currency: string = StoreConstants.DefaultCurrency;
  currencyLable: string = StoreConstants.DefaultCurrencyLable;
  editionTypes: string[] = StoreConstants.DefaultEditionsType;
  currencys = Currency;
  sortByPriceOrTitle = SortingByPriceOrTitleParams;
  currencysLables = CurrencyLable;

  sliderFloor: number | undefined;
  sliderCeil: number | undefined;

  showDefaultSlider: boolean = true;
  sliderValueDefault: number = StoreConstants.DefaultSliderValue;
  sliderHighValueDefault: number = StoreConstants.DefaulSlidertHighValue;

  sliderValueForQuery: number = StoreConstants.DefaultSliderValueForQuery;
  sliderHighValueForQuery: number = StoreConstants.DefaultSliderHighValueForQuery;

  inputValueForQuery: number = StoreConstants.DefaultInputValueForQuery;
  inputHighValueForQuery: number = StoreConstants.DefaultInputHighValueForQuery;

  useDefaultSortingParams: boolean = true;

  options: Options = {
    floor: StoreConstants.DefaultSliderFloor,
    ceil: StoreConstants.DefaultSliderCeil,
    disabled: false,
    hideLimitLabels: false,
    hidePointerLabels: true

  };

  constructor(private store: Store, private router: Router) { }

  ngOnInit(): void {
    this.userQuestionUpdate.pipe(
      debounceTime(StoreConstants.OneSecond),
      distinctUntilChanged())
      .subscribe(() => {
        this.getFiltratedEditions();
        this.showDefaultSlider = true;
        this.setSliderDefaultParams(this.options.floor!, this.options.ceil!);
      });

    this.getFiltratedEditions();
    this.store.select(StoreState.getTotalPages).subscribe((x: number | null) => {
      this.fullCounts = x! * this.countElementOnPage
    });

    this.store.select(StoreState.getSliderParams).subscribe((x: [number, number]) => {
      this.sliderFloor = x[StoreConstants.SliderFloorPosition];
      this.sliderCeil = x[StoreConstants.SliderCeilPosition];
      if (this.sliderCeil !== undefined && this.sliderFloor !== undefined) {
        this.changeSliderOptions(this.sliderFloor, this.sliderCeil);
        this.setSliderDefaultParams(this.sliderFloor, this.sliderCeil);
      }
    })
  }

  setSliderDefaultParams(sliderFloor: number, sliderCeil: number) {
    this.sliderValueDefault = sliderFloor!;
    this.sliderHighValueDefault = sliderCeil!;
  }

  isPriceInputsValid: boolean = true;
  validatePriceInputs() {
    if (this.inputValueForQuery > this.inputHighValueForQuery) {
      this.isPriceInputsValid = false;
      return;
    }

    if (this.inputValueForQuery < this.options.floor!) {
      this.isPriceInputsValid = false;
      return;
    }

    if (this.inputValueForQuery > this.options.ceil!) {
      this.isPriceInputsValid = false;
      return;
    }

    if (this.inputHighValueForQuery > this.options.ceil!) {
      this.isPriceInputsValid = false;
      return;
    }

    if (this.inputHighValueForQuery === StoreConstants.InputHighValueForQueryNotInstalled) {
      this.isPriceInputsValid = false;
      return;
    }

    this.isPriceInputsValid = true;
  }

  changeSliderOptions(sliderFloor: number, sliderCeil: number) {
    const newOptions: Options = Object.assign({}, this.options);
    newOptions.floor = sliderFloor;
    newOptions.ceil = sliderCeil;
    this.options = newOptions;
  }

  isInputsValid: boolean = false;


  changeSlider() {
    var editionCollectionSise;
    this.store.select(StoreState.getEditions).subscribe(res => { editionCollectionSise = res?.length });
    if (editionCollectionSise != undefined && editionCollectionSise > 1) {
      this.sliderValueForQuery = this.options.floor!;
      this.sliderHighValueForQuery = this.options.ceil!;
      this.inputValueForQuery = this.sliderValueForQuery;
      this.inputHighValueForQuery = this.sliderHighValueForQuery;
      this.showDefaultSlider = false;
      this.useDefaultSortingParams = false;
    }
  }

  getFiltratedEditions(_minPrice: number | null = null, _maxPrice: number | null = null,
    _currentSliderFlor: number = StoreConstants.DefaultSliderFloorForGetMethod,
    _currentSliderCeil: number = StoreConstants.DefaultSliderCeilForGetMethod): void {
    this.store.dispatch(new GetFiltratedEditions({
      currentPage: this.page,
      pageSize: this.countElementOnPage,
      propertyForSort: this.propertyForSort,
      isAscending: this.isAscending,
      currency: this.currency,
      title: this.search,
      editionType: this.editionTypes,
      minPrice: _minPrice,
      maxPrice: _maxPrice,
      currentSliderFlor: _currentSliderFlor,
      currentSliderCeil: _currentSliderCeil
    }))
  }

  makePriceInputsSameAsSlider() {
    this.inputValueForQuery = this.sliderValueForQuery;
    this.inputHighValueForQuery = this.sliderHighValueForQuery;
  }

  priceChangeBySlider() {
    this.getFiltratedEditions(this.sliderValueForQuery, this.sliderHighValueForQuery,
      this.options.floor, this.options.ceil);

  }

  priceChangeByInput() {
    this.getFiltratedEditions(this.inputValueForQuery, this.inputHighValueForQuery,
      this.options.floor, this.options.ceil);
    this.sliderValueForQuery = this.inputValueForQuery;
    this.sliderHighValueForQuery = this.inputHighValueForQuery;

  }

  editionTypeChange($event: any) {

    var value = $event.target.value;
    var isChecked = $event.target.checked;
    if (isChecked) {
      this.editionTypes.push(value);
    }

    if (!isChecked) {
      this.editionTypes = this.editionTypes.filter(element => element !== value);
    }
    this.getFiltratedEditions();
    this.showDefaultSlider = true;
    this.setSliderDefaultParams(this.options.floor!, this.options.ceil!);
  }

  sortChange($event: any) {

    var value = $event.target.value;
    var splitedValue = value.split(TechnicalConstants.StringSpace)
    this.isAscending = splitedValue[StoreConstants.SortingDirectionPosition] === StoreConstants.SortingAsc;
    this.propertyForSort = splitedValue[StoreConstants.SortingPropertyPosition];

    if (this.useDefaultSortingParams) {
      this.useDefaultSortingParams = false;
      this.changeSlider();
      this.getFiltratedEditions();
      return;
    }

    this.getFiltratedEditions(this.inputValueForQuery, this.inputHighValueForQuery,
      this.options.floor, this.options.ceil);
    return;
  }

  currencyTypeChange($event: any) {
    var value = $event.target.value;
    this.currency = value
    this.currencyLable = this.currencysLables[value]
    this.getFiltratedEditions()

    this.showDefaultSlider = true;
    this.setSliderDefaultParams(this.options.floor!, this.options.ceil!);
  }

  makePagination() {
    this.getFiltratedEditions()
  }

  sroreCurrentEditionId(editionId: number | null) {
    if (editionId != null) {
      this.store.dispatch(new StoreCurrentEditonId({
        Id: editionId
      }))
      this.router.navigateByUrl(this.editionProfileRote);
    }
  }
}