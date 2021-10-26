import { StripeElementCSSProperties, StripeElementLocale } from "@stripe/stripe-js";
import { SweetAlertIcon } from "sweetalert2";

export class RoutingConstants {
    public static SignIn: string = "sign-in";   
    public static Store: string = 'store';   
    public static GetUser: string = 'get-user';   
    public static SignUp: string = 'sign-up';   
    public static RegistrationSucces: string = 'registration-success';   
    public static ForgotPassword: string = 'forgot-password';   
    public static SignOut: string = 'sign-out';   
    public static EditionProfile: string = 'edition-profile';   
    public static Cart: string = 'cart';   
    public static Navbar: string = 'navbar';     
}

export class ErrorConstants{
  public static ForgotPasswordFormErrors = {
        'email': [
          { type: 'required', message: 'Email is required' },
          { type: 'email', message: 'Enter a valid email address' }
        ]};

  public static SignInFormErrors = {
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Enter a valid email address' }
    ],

    'password': [
      { type: 'required', message: 'Password is required' }, 
    ]
  };

  public static SignUpFormErrors = {
    'firstName': [
      {type: 'required', message: 'First Name is required'},
      {type: 'minlength', message: 'Min length 2'}
    ],

    'lastName': [
      { type: 'required', message: 'Last Name is required' }
    ],

    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Enter a valid email address' }
    ],

    'password': [
      
      { type: 'minlength', message: 'Min password length 8' },
      { type: 'pattern', message: 'One ore more lowercase characters'},
      { type: 'pattern', message: 'One ore more uppercase characters'},
      { type: 'pattern', message: 'Any symbols " @#$%_!%&* "'},
      { type: 'pattern', message: 'One more digit from 0-9'}
    ],
    'confirmPassword': [
      { type: 'minlength', message: 'Min password length 8' },
    ],
  };

  public static UserProfileFormErrors = {
    'userFirstName': [
      { type: 'required', message: 'First Name is required' },
      { type: 'minlength', message: 'Min length 2' }
    ],

    'userLastName': [
      { type: 'required', message: 'Last Name is required' }
    ],

    'userEmail': [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Enter a valid email address' }
    ],

    'currentPassword': [
      { type: 'required', message: 'Password is required' },
    ],

    'newPassword': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Min password length 8' },
      { type: 'pattern', message: 'One ore more lowercase characters' },
      { type: 'pattern', message: 'One ore more uppercase characters' },
      { type: 'pattern', message: 'Any symbols " @#$%_!%&* "' },
      { type: 'pattern', message: 'One more digit from 0-9' }
    ],
    'confirmPassword': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Min password length 8' },
    ],
  };
}

export class RegExpConstants{
    public static Password:string ="((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%_!%&*]).{8,20})";
}

export class TechnicalConstants{
    public static Password: string = "password";
    public static AccessToken: string = "accessToken";
    public static RefreshToken: string = "refreshToken";
    public static NewPassword: string = "newPassword";
    public static ConfirmPassword: string = "confirmPassword";
    public static CurrentPassword: string = "currentPassword";
    public static PasswordNotMatch: string = "passwordNotMatch";
    public static Email: string = "email";
    public static LastName: string = "lastName";
    public static FirstName: string = "firstName";
    public static UserCart: string = "userCart";
    public static CartItemsCount: string = "cartItemsCount";
    public static CurrentEditonId: string = "currentEditonId";
    public static NumberDefault: number = 0;
    public static PasswordMinLenghts: number = 8;
    public static FirstNameMinLenghts: number = 2;
    public static LastNameMinLenghts: number = 2;
    public static EmptyString: string = "";
}

export class CartConstants{
    public static EmptyCart: number = 0;
    public static FullCart: number = 99;

    public static DialogDelTitle: string ="Are you sure?";
    public static DialogDelTextPaart1: string ="You will remove all ";
    public static DialogDelTextPaart2: string =" from cart";
    public static DialogDelConfirmText: string ="Yes, remove it!";
    public static AddEditionsToCartMsg: string =" copies added to cart";

}

export class PaymentResultConstants{
    public static OrderNumberMsg: string = "Order number: ";
}

export class SweetAlertConstants{
    public static IconQuestion: SweetAlertIcon ="question";
    public static IconSuccess: SweetAlertIcon ="success";
    public static IconError: SweetAlertIcon ="error";
    public static ShowCancelButtonTrue: boolean = true;
    public static ConfirmButtonColorGreen: string ="#378f7b";
    public static CancelButtonColorRed: string ="#d33";    
}

export class EditionProfileConstants{
    public static OneEdition: number = 1;
    public static NoCurrentEditionInCart: number = -1;
}

export class StripeCardOptionsConstants{
    public static IconStyleSolid: "solid" | "default" | undefined = "solid";
    public static BaseIcionColorSoftBlue: string ="#666EE8";
    public static InvalidIcionColorPink: string ="#ffc7ee";
    public static ColorDarkBlue: string ="#31325F";
    public static ColorPink: string ="#ffc7ee";
    public static FontWeight300: number = 300;
    public static FontFamily: string ="Helvetica Neue, Helvetica, sans-serif";
    public static FontSize: string ="18px";
    public static Placeholder: StripeElementCSSProperties | undefined | string ="::placeholder";
    public static CollorGray: string ="#CFD7E0";
}

export class StripeElementsOptionsConstants{
    public static LocaleEn: StripeElementLocale | undefined ="en";
}

export class ActiveModalConstants{
    public static DismissCrossClick: string = "Cross click";
}

export class StoreConstants{
    public static DefaultCountElementOnPage: number = 12;
    public static FromFirsPage: number = 1;
    public static DefaultSortingProperty: string = "price";
    public static DefaultCurrency: string = "1";
    public static DefaultCurrencyLable: string = "$";
    public static DefaultEditionsType: string[] = ["1", "2", "3"];
    public static DefaultSliderValue: number = 0;
    public static DefaulSlidertHighValue: number = 0;
    public static DefaultSliderValueForQuery: number = 0;
    public static DefaultSliderHighValueForQuery: number = 0;
    public static DefaultInputValueForQuery: number = 0;
    public static DefaultInputHighValueForQuery: number = 0;
    public static DefaultSliderFloor: number | undefined = 0;
    public static DefaultSliderCeil: number | undefined = 0;
    public static OneSecond: number = 1000;
    public static SliderFloorPosition: number = 0;
    public static SliderCeilPosition: number = 1;
    public static InputHighValueForQueryNotInstalled: number = 0;
    public static DefaultSliderFloorForGetMethod: number = 0;
    public static DefaultSliderCeilForGetMethod: number = 0;
    public static DelOneElement: number = 1;
    public static SortigByPriceAsc: string = "price asc";
    public static SortigByPriceDes: string = "price des";
    public static SortigByTitleAsc: string = "title asc";
    public static SortigByTitleDes: string = "title des";

    public static SortingParamsPrice: string = "price";
    public static SortingParamsTitle: string = "title";

    public static SortigByCurrencyUsd: string = "USD";
    public static UsdNumber: string = "1";
    public static UsdLable: string = "$";

    public static SortigByCurrencyEur: string = "EUR";
    public static EurNumber: string = "2";
    public static EurLable: string = "&euro;";

    public static SortigByCurrencyGbp: string = "GBP";
    public static GbpNumber: string = "3";
    public static GbpLable: string = "&pound;";

    public static SortigByCurrencyChf: string = "CHF";
    public static ChfNumber: string = "4";
    public static ChfLable: string = "&#8355";

    public static SortigByCurrencyJpy: string = "JPY";
    public static JpyNumber: string = "5";
    public static JpyLable: string = "&yen;";
    
    public static SortigByCurrencyUah: string = "UAH";
    public static UahNumber: string = "5";
    public static UahLable: string = "&#8372;";
      
}

export class UserProfileConstants{
    public static FormUserEmail: string = "userEmail";
    public static FormUserName: string = "userFirstName";
    public static FormUserLastName: string = "userLastName";
}

export class InterseptorsConstants{
    public static AccessToken: string = "accessToken";
    public static RefreshToken: string = "refreshToken";
    public static Bearer: string = "Bearer";
    
    public static Error401: number = 401;
    public static Error403: number = 403;
}

export class AuthServiceConstants{
    public static SignInControlerRoute: string = "https://localhost:5001/api/Account/signIn";
    public static SignUpControlerRoute: string = "https://localhost:5001/api/Account/signUp";
    public static ForgotPasswordControlerRoute: string = "https://localhost:5001/api/User/ForgotPassword";
    public static UpdateTokensControlerRoute: string = "https://localhost:5001/api/Account/updateTokens";
}

export class EditionServiceConstants{
    public static EditionGetByIdControlerRoute: string = "https://localhost:5001/api/PrintingEdition/GetById";
}

export class PaymentServiceConstants{
    public static PayControlerRoute: string = "https://localhost:5001/api/Payment/Pay";
}

export class StoreServiceConstants{
    public static GetEditionsControlerRoute: string = "https://localhost:5001/api/PrintingEdition/GetEditions";
}

export class UserServiceConstants{
    public static GetUserByIdControlerRoute: string = "https://localhost:5001/api/User/GetUserById";
    public static UserUpdateControlerRoute: string = "https://localhost:5001/api/User/UserUpdate";
    public static ChangePasswordControlerRoute: string = "https://localhost:5001/api/User/ChangePassword";
}

export class ActionConstants{
    public static AuthSignIn: string = "[Auth] SignIn";
    public static AuthForgotPassword: string = "[Auth] ForgotPassword";
    public static AuthSignUp: string = "[Auth] SignUp";
    public static AuthSignOut: string = "[Auth] SignOut";
    public static AuthRestoreTokens: string = "[Auth] RestoreTokens";
    public static AuthUpdateTokens: string = "[Auth] UpdateTokens";

    public static CartItemsInCartCount: string = "[Cart] ItemsInCartCount";
    public static CartStoreCart: string = "[Cart] Cart";
    public static CartClearCart: string = "[ClearCart] ClearCart";

    public static EditionGet: string = "[Edition] Edition";
    public static EditionStoreCurrent: string = "[Edition] Edition";
    public static EditionStoreCurrentId: string = "[Edition] CurrentEditonId";

    public static PaymentPay: string = "[Pay] Pay";

    public static StoreGetEditions: string = "[Store] FiltratedEdition";

    public static UserGet: string = "[User] UserData";
    public static UserUpdate: string = "[User] UserUpdate";
    public static UserChangePassword: string = "[User] ChangePassword";
}

export class StateConstants{
    public static Auth: string = "auth";
    public static AuthNameRegister: string = "register";
    public static AuthNameGetTokens: string = "gettokens";
    public static AuthNameSignOut: string = "signout";
    public static AuthSignUpSuccesMsg: string = "Successful registration";
    public static AuthSignUpConfirmEmailMsg: string = "Check your email and confirm it";
    public static AuthSendPasworgMsg: string = "New password has been sent to email";

    public static CartSatateName: string = "Cart";
    public static CartDefaultEditionQty: number = 0;

    public static EditionStateName: string = "CurrentEdition";

    public static PaymentStateName: string = "OrderDetails";

    public static StoreStateName: string = "Store";
    public static StoreDefaultSliderFloor: number | null = 0;
    public static StoreDefaultSliderCeil: number | null = 0;

    public static UserStateName: string = "UserData";



}
