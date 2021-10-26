import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { RoutingConstants, StoreConstants } from 'src/app/app-constants';
import { EventEmitterService } from 'src/app/services/event-emitter/event-emitter.service';
import { SignOut } from 'src/app/State-manager/action/auth-action';
import { StoreCurrentEditonId } from 'src/app/State-manager/action/edition-action';
import { GetFiltratedEditions } from 'src/app/State-manager/action/store-action';
import { AuthState } from 'src/app/State-manager/state/auth-state';
import { StoreState } from 'src/app/State-manager/state/store-state';


@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})

export class StoreComponent implements OnInit {
  editionProfileRote=RoutingConstants.EditionProfile;
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

  sliderFloor: number | undefined;
  sliderCeil: number | undefined;

  showDefaultSlider: boolean = true;
  sliderValueDefault: number = StoreConstants.DefaultSliderValue;
  sliderHighValueDefault: number = StoreConstants.DefaulSlidertHighValue;

  sliderValueForQuery: number = StoreConstants.DefaultSliderValueForQuery;
  sliderHighValueForQuery: number = StoreConstants.DefaultSliderHighValueForQuery;

  inputValueForQuery: number = StoreConstants.DefaultInputValueForQuery;
  inputHighValueForQuery: number = StoreConstants.DefaultInputHighValueForQuery;

  options: Options = {
    floor: StoreConstants.DefaultSliderFloor,
    ceil: StoreConstants.DefaultSliderCeil,
    disabled: false,
    hideLimitLabels: false,
    hidePointerLabels: true

  };

  constructor(private store: Store, private router: Router, 
    private eventEmitterService: EventEmitterService) {
    this.userQuestionUpdate.pipe(
      debounceTime(StoreConstants.OneSecond),
      distinctUntilChanged())
      .subscribe(() => {
        this.getFiltratedEditions();
        this.showDefaultSlider = true;
        this.setSliderDefaultParams(this.options.floor!, this.options.ceil!);
      });
  }

  ngOnInit(): void {
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

    if(this.eventEmitterService.subsVar == null ) {
      this.eventEmitterService.subsVar = this.eventEmitterService.invokeSignOut.subscribe(()=>{
        this.signOut();
      });
    }
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
      for (var i = 0; i < this.editionTypes.length; i++) {

        if (this.editionTypes[i] === value) {
          this.editionTypes.splice(i, StoreConstants.DelOneElement);
        }
      }
    }
    this.getFiltratedEditions();
    this.showDefaultSlider = true;
    this.setSliderDefaultParams(this.options.floor!, this.options.ceil!);
  }

  sortChange($event: any) {
    var value = $event.target.value;
    if (value === StoreConstants.SortigByPriceAsc) {
      this.isAscending = true;
      this.propertyForSort = StoreConstants.SortingParamsPrice;
      this.getFiltratedEditions();
      return;
    }

    if (value === StoreConstants.SortigByPriceDes) {
      this.isAscending = false;
      this.propertyForSort = StoreConstants.SortingParamsPrice;
      this.getFiltratedEditions();
      return;
    }

    if (value === StoreConstants.SortigByTitleAsc) {
      this.isAscending = true;
      this.propertyForSort = StoreConstants.SortingParamsTitle;
      this.getFiltratedEditions();
      return;
    }

    if (value === StoreConstants.SortigByTitleDes) {
      this.isAscending = false;
      this.propertyForSort = StoreConstants.SortingParamsTitle;
      this.getFiltratedEditions();
      return;
    }
  }

  currencyTypeChange($event: any) {
    var value = $event.target.value;
    if (value === StoreConstants.SortigByCurrencyUsd) {
      this.currency = StoreConstants.UsdNumber;
      this.currencyLable = StoreConstants.UsdLable
      this.getFiltratedEditions()
    }

    if (value === StoreConstants.SortigByCurrencyEur) {
      this.currency = StoreConstants.EurNumber;
      this.currencyLable = StoreConstants.EurLable;
      this.getFiltratedEditions()
    }

    if (value === StoreConstants.SortigByCurrencyGbp) {
      this.currency = StoreConstants.GbpNumber;
      this.currencyLable = StoreConstants.GbpLable;
      this.getFiltratedEditions()
    }

    if (value === StoreConstants.SortigByCurrencyChf) {
      this.currency = StoreConstants.ChfNumber;
      this.currencyLable = StoreConstants.ChfLable;
      this.getFiltratedEditions()
    }

    if (value === StoreConstants.SortigByCurrencyJpy) {
      this.currency = StoreConstants.JpyNumber;
      this.currencyLable = StoreConstants.JpyLable;
      this.getFiltratedEditions()
    }

    if (value === StoreConstants.SortigByCurrencyUah) {
      this.currency = StoreConstants.UahNumber;
      this.currencyLable = StoreConstants.UahLable;
      this.getFiltratedEditions()
    }

    this.showDefaultSlider = true;
    this.setSliderDefaultParams(this.options.floor!, this.options.ceil!);
  }

  makePagination() {
    this.getFiltratedEditions()
  }

  signOut(): void {
    this.store.dispatch(new SignOut())
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