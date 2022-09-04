export interface forgetPassword {
  email: string,
}

export interface login {
  rememberMe: string,
  password: string,
  email: string,
}

export interface Google {
  tokenId: string,
}

export interface resetPassword {
  password: string,
  resetPasswordToken: string,
}

export interface signup {
  password: string,
  name: string,
  email: string,
}
