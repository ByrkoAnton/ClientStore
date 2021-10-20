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
}

export class RegExpConstants{
    public static Password:string ="((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%_!%&*]).{8,20})";
}

export class TechnicalConstants{
    public static Password: string = "password";
    public static ConfirmPassword: string = "confirmPassword";
    public static PasswordNotMatch: string = "passwordNotMatch";
    public static Email: string = "email";
    public static LastName: string = "lastName";
    public static FirstName: string = "firstName";
}
