import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { RoutingConstants } from 'src/app/app-constants';
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
  countElementOnPage = 12;
  page = 1;
  fullCounts!: number;
  search!: string;
  isAscending: boolean = true;
  propertyForSort: string = "price";
  currency: string = "1";
  currencyLable: string = "$";
  editionTypes: string[] = ["1", "2", "3"];

  sliderFloor: number | undefined;
  sliderCeil: number | undefined;

  showDefaultSlider: boolean = true;
  sliderValueDefault: number = 0;
  sliderHighValueDefault: number = 0;

  sliderValueForQuery: number = 0;
  sliderHighValueForQuery: number = 0;

  inputValueForQuery: number = 0;
  inputHighValueForQuery: number = 0;

  options: Options = {
    floor: 0,
    ceil: 0,
    disabled: false,
    hideLimitLabels: false,
    hidePointerLabels: true

  };

  constructor(private store: Store, private router: Router, 
    private eventEmitterService: EventEmitterService) {
    this.userQuestionUpdate.pipe(
      debounceTime(1000),
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
      this.sliderFloor = x[0];
      this.sliderCeil = x[1];
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

    if (this.inputHighValueForQuery === 0) {
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
    _currentSliderFlor: number = 0, _currentSliderCeil: number = 0): void {
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
          this.editionTypes.splice(i, 1);
        }
      }
    }
    this.getFiltratedEditions();
    this.showDefaultSlider = true;
    this.setSliderDefaultParams(this.options.floor!, this.options.ceil!);
  }

  sortChange($event: any) {
    var value = $event.target.value;
    if (value === "price asc") {
      this.isAscending = true;
      this.propertyForSort = "price";
      this.getFiltratedEditions();
      return;
    }

    if (value === "price des") {
      this.isAscending = false;
      this.propertyForSort = "price";
      this.getFiltratedEditions();
      return;
    }

    if (value === "title asc") {
      this.isAscending = true;
      this.propertyForSort = "title";
      this.getFiltratedEditions();
      return;
    }

    if (value === "title des") {
      this.isAscending = false;
      this.propertyForSort = "title";
      this.getFiltratedEditions();
      return;
    }
  }

  currencyTypeChange($event: any) {
    var value = $event.target.value;
    if (value === "USD") {
      this.currency = "1";
      this.currencyLable = "$"
      this.getFiltratedEditions()
    }

    if (value === "EUR") {
      this.currency = "2";
      this.currencyLable = "&euro;";
      this.getFiltratedEditions()
    }

    if (value === "GBP") {
      this.currency = "3";
      this.currencyLable = "&pound;";
      this.getFiltratedEditions()
    }

    if (value === "CHF") {
      this.currency = "4";
      this.currencyLable = "&#8355";
      this.getFiltratedEditions()
    }

    if (value === "JPY") {
      this.currency = "5";
      this.currencyLable = "&yen;";
      this.getFiltratedEditions()
    }

    if (value === "UAH") {
      this.currency = "6";
      this.currencyLable = "&#8372;";
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